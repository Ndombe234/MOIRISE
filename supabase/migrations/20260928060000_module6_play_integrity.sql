-- Module 6 PLAY integrity: one visible PLAY entry, server-owned sessions,
-- registry-backed experience allowlisting, progression integrity, and a server-only reward boundary.

create schema if not exists private;

create table if not exists public.play_game_catalog (
  game_id text primary key,
  game_version integer not null default 1 check (game_version > 0),
  active boolean not null default true,
  required_level integer not null default 1 check (required_level > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint play_game_catalog_game_id_check check (char_length(game_id) between 1 and 100)
);

alter table public.play_game_catalog enable row level security;
revoke all on public.play_game_catalog from public, anon, authenticated;

insert into public.play_game_catalog (game_id, game_version, active, required_level)
values
  ('echo-trace', 1, true, 1),
  ('signal-bloom', 1, true, 1),
  ('shadow-courier', 1, true, 1)
on conflict (game_id) do update
set game_version = excluded.game_version,
    active = excluded.active,
    required_level = excluded.required_level,
    updated_at = now();

create or replace function private.can_start_play_game(
  target_game_id text,
  target_player_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.play_game_catalog c
    left join public.system_profiles s on s.player_id = target_player_id
    where c.game_id = target_game_id
      and c.active = true
      and c.required_level <= coalesce(s.level, 1)
  );
$$;

revoke all on function private.can_start_play_game(text, uuid) from public, anon, authenticated;
grant execute on function private.can_start_play_game(text, uuid) to authenticated;

alter table public.play_sessions
  alter column challenge set default '{}'::jsonb;

create or replace function public.create_play_session(
  game_id_value text,
  seed_value bigint,
  challenge_value jsonb
) returns jsonb
language plpgsql
set search_path = public
as $$
declare
  new_session public.play_sessions;
  generated_seed bigint;
begin
  if auth.uid() is null then
    raise exception 'authentication required';
  end if;

  if char_length(game_id_value) < 1 or char_length(game_id_value) > 100 then
    raise exception 'invalid game';
  end if;

  if not private.can_start_play_game(game_id_value, auth.uid()) then
    raise exception 'unknown, inactive, or locked PLAY experience';
  end if;

  generated_seed := floor(random() * 2147483646)::bigint + 1;

  insert into public.play_sessions(player_id, game_id, seed, challenge)
  values (auth.uid(), game_id_value, generated_seed, '{}'::jsonb)
  returning * into new_session;

  return jsonb_build_object(
    'session_id', new_session.session_id,
    'game_id', new_session.game_id,
    'seed', new_session.seed,
    'expires_at', new_session.expires_at
  );
end;
$$;

revoke all on function public.create_play_session(text, bigint, jsonb) from public, anon;
grant execute on function public.create_play_session(text, bigint, jsonb) to authenticated;

alter table public.play_attempts add column if not exists share_token text;
revoke insert, update, delete on public.play_attempts from public, anon, authenticated;
grant select on public.play_attempts to authenticated;

-- Legacy public completion RPC remains only for compatibility with existing database history.
-- Clients must not be allowed to call it directly.
revoke all on function public.record_play_completion(text, uuid, text, integer, integer, jsonb, jsonb)
  from public, anon, authenticated;

create or replace function public.record_system_progress_event_internal(
  target_player_id uuid,
  event_type_value text,
  dimension_key_value text,
  xp_delta_value integer,
  idempotency_key_value text,
  source_type_value text,
  source_id_value text default null,
  metadata_value jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  existing_event public.system_progression_events%rowtype;
  inserted_event public.system_progression_events%rowtype;
  resulting_total_xp bigint;
  resulting_level integer;
  referenced_attempt public.play_attempts%rowtype;
  referenced_attempt_id uuid;
  expected_xp integer;
begin
  if event_type_value <> 'play_completed'
     or dimension_key_value <> 'play'
     or source_type_value <> 'game'
     or source_id_value is null then
    raise exception 'invalid internal PLAY progression event';
  end if;

  if metadata_value is null or jsonb_typeof(metadata_value) <> 'object'
     or not (metadata_value ? 'attempt_id') then
    raise exception 'play completion metadata is required';
  end if;

  begin
    referenced_attempt_id := (metadata_value->>'attempt_id')::uuid;
  exception when invalid_text_representation then
    raise exception 'invalid play attempt id';
  end;

  select * into referenced_attempt
  from public.play_attempts
  where attempt_id = referenced_attempt_id
  for update;

  if not found
     or referenced_attempt.player_id <> target_player_id
     or referenced_attempt.game_id <> source_id_value
     or referenced_attempt.status <> 'completed' then
    raise exception 'play attempt is not valid';
  end if;

  expected_xp := greatest(1, least(20, floor(referenced_attempt.score / 50)));

  if xp_delta_value <> expected_xp then
    raise exception 'play progression reward does not match attempt';
  end if;

  if idempotency_key_value is null or length(trim(idempotency_key_value)) = 0 then
    raise exception 'idempotency key is required';
  end if;

  perform public.ensure_system_profile(target_player_id);

  select * into existing_event
  from public.system_progression_events
  where player_id = target_player_id
    and idempotency_key = idempotency_key_value
  for update;

  if found then
    select total_xp into resulting_total_xp
    from public.system_profiles
    where player_id = target_player_id;

    return jsonb_build_object(
      'duplicate', true,
      'event_id', existing_event.id,
      'total_xp', resulting_total_xp,
      'level', public.system_level_for_xp(resulting_total_xp)
    );
  end if;

  insert into public.system_progression_events (
    player_id, event_type, dimension_key, xp_delta,
    idempotency_key, source_type, source_id, metadata
  )
  values (
    target_player_id, event_type_value, dimension_key_value, xp_delta_value,
    idempotency_key_value, source_type_value, source_id_value,
    coalesce(metadata_value, '{}'::jsonb)
  )
  returning * into inserted_event;

  update public.system_profiles
  set total_xp = total_xp + xp_delta_value
  where player_id = target_player_id
  returning total_xp into resulting_total_xp;

  resulting_level := public.system_level_for_xp(resulting_total_xp);

  update public.system_profiles
  set level = resulting_level
  where player_id = target_player_id;

  return jsonb_build_object(
    'duplicate', false,
    'event_id', inserted_event.id,
    'total_xp', resulting_total_xp,
    'level', resulting_level
  );
exception
  when unique_violation then
    select * into existing_event
    from public.system_progression_events
    where player_id = target_player_id
      and idempotency_key = idempotency_key_value
    limit 1;

    if existing_event.id is null then
      raise;
    end if;

    select total_xp into resulting_total_xp
    from public.system_profiles
    where player_id = target_player_id;

    return jsonb_build_object(
      'duplicate', true,
      'event_id', existing_event.id,
      'total_xp', resulting_total_xp,
      'level', public.system_level_for_xp(resulting_total_xp)
    );
end;
$$;

revoke all on function public.record_system_progress_event_internal(uuid, text, text, integer, text, text, text, jsonb)
  from public, anon, authenticated;
grant execute on function public.record_system_progress_event_internal(uuid, text, text, integer, text, text, text, jsonb)
  to service_role;

create or replace function public.record_play_completion_internal(
  player_id_value uuid,
  game_id_value text,
  attempt_id_value uuid,
  status_value text,
  score_value integer,
  duration_ms_value integer,
  signals_value jsonb default '{}'::jsonb,
  moment_candidate_value jsonb default null
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  play_session public.play_sessions%rowtype;
  inserted_attempt_id uuid;
  awarded_xp integer := 0;
  generated_share_token text;
  event_result jsonb;
begin
  select * into play_session
  from public.play_sessions
  where session_id = attempt_id_value
    and player_id = player_id_value
  for update;

  if not found then
    raise exception 'play session not found';
  end if;

  if play_session.game_id <> game_id_value then
    raise exception 'play session/game mismatch';
  end if;

  if play_session.status <> 'active' then
    return jsonb_build_object('status', 'duplicate', 'attempt_id', attempt_id_value);
  end if;

  if now() > play_session.expires_at then
    update public.play_sessions
    set status = 'expired'
    where session_id = attempt_id_value;

    raise exception 'play session expired';
  end if;

  if not exists (
    select 1 from public.play_game_catalog
    where game_id = game_id_value and active = true
  ) then
    raise exception 'unknown or inactive game';
  end if;

  if status_value not in ('completed', 'abandoned', 'failed') then
    raise exception 'invalid status';
  end if;

  if score_value < 0 or score_value > 1000 then
    raise exception 'invalid score';
  end if;

  if duration_ms_value < 250 or duration_ms_value > 1200000 then
    raise exception 'invalid duration';
  end if;

  if jsonb_typeof(signals_value) <> 'object' then
    raise exception 'invalid signals';
  end if;

  if moment_candidate_value is not null and jsonb_typeof(moment_candidate_value) <> 'object' then
    raise exception 'invalid moment';
  end if;

  if moment_candidate_value is not null then
    generated_share_token := encode(extensions.gen_random_bytes(18), 'hex');
  end if;

  insert into public.play_attempts (
    attempt_id, player_id, game_id, status, score, duration_ms,
    signals, moment_candidate, share_token
  )
  values (
    attempt_id_value, player_id_value, game_id_value, status_value, score_value, duration_ms_value,
    signals_value, moment_candidate_value, generated_share_token
  )
  on conflict (attempt_id) do nothing
  returning attempt_id into inserted_attempt_id;

  if inserted_attempt_id is null then
    return jsonb_build_object('status', 'duplicate', 'attempt_id', attempt_id_value);
  end if;

  if status_value = 'completed' then
    awarded_xp := greatest(1, least(20, floor(score_value / 50)));

    select public.record_system_progress_event_internal(
      player_id_value,
      'play_completed',
      'play',
      awarded_xp,
      concat(player_id_value::text, ':', game_id_value, ':', attempt_id_value::text),
      'game',
      game_id_value,
      jsonb_build_object(
        'score', score_value,
        'duration_ms', duration_ms_value,
        'attempt_id', attempt_id_value
      )
    ) into event_result;
  end if;

  update public.play_sessions
  set status = 'completed',
      completed_at = now()
  where session_id = attempt_id_value;

  return jsonb_build_object(
    'status', 'recorded',
    'attempt_id', attempt_id_value,
    'awarded_xp', awarded_xp,
    'share_token', generated_share_token
  );
end;
$$;

revoke all on function public.record_play_completion_internal(uuid, text, uuid, text, integer, integer, jsonb, jsonb)
  from public, anon, authenticated;
grant execute on function public.record_play_completion_internal(uuid, text, uuid, text, integer, integer, jsonb, jsonb)
  to service_role;

-- Preserve the authenticated SYSTEM progression boundary used by Player onboarding.
create or replace function public.record_system_progress_event(
  target_player_id uuid,
  event_type_value text,
  dimension_key_value text,
  xp_delta_value integer,
  idempotency_key_value text,
  source_type_value text,
  source_id_value text default null,
  metadata_value jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  existing_event public.system_progression_events%rowtype;
  inserted_event public.system_progression_events%rowtype;
  resulting_total_xp bigint;
  resulting_level integer;
begin
  if auth.uid() is null or auth.uid() <> target_player_id then
    raise exception 'not authorized';
  end if;

  if event_type_value = 'player_identity_completed' then
    if dimension_key_value is not null or xp_delta_value <> 25 or source_type_value <> 'player' then
      raise exception 'invalid identity progression event';
    end if;
    if source_id_value is not null then
      raise exception 'identity completion cannot specify a source id';
    end if;
    if idempotency_key_value is null or length(trim(idempotency_key_value)) = 0 then
      raise exception 'idempotency key is required';
    end if;
    if not exists (
      select 1 from public.players
      where id = target_player_id
        and onboarding_completed is true
    ) then
      raise exception 'player identity is not complete';
    end if;
    perform public.ensure_system_profile(target_player_id);
  elsif event_type_value = 'play_completed' then
    -- Defense in depth: authenticated callers may only refer to a real completed
    -- attempt that they own. The PLAY app itself uses the service-only RPC above.
    if dimension_key_value <> 'play' or source_type_value <> 'game' or source_id_value is null then
      raise exception 'invalid play progression event';
    end if;
    if metadata_value is null or jsonb_typeof(metadata_value) <> 'object' or not (metadata_value ? 'attempt_id') then
      raise exception 'play completion metadata is required';
    end if;
    perform public.ensure_system_profile(target_player_id);
  else
    raise exception 'unsupported SYSTEM progression event';
  end if;

  select * into existing_event
  from public.system_progression_events
  where player_id = target_player_id
    and idempotency_key = idempotency_key_value
  for update;

  if found then
    select total_xp into resulting_total_xp
    from public.system_profiles
    where player_id = target_player_id;

    return jsonb_build_object(
      'duplicate', true,
      'event_id', existing_event.id,
      'total_xp', resulting_total_xp,
      'level', public.system_level_for_xp(resulting_total_xp)
    );
  end if;

  insert into public.system_progression_events (
    player_id, event_type, dimension_key, xp_delta,
    idempotency_key, source_type, source_id, metadata
  )
  values (
    target_player_id, event_type_value, dimension_key_value, xp_delta_value,
    idempotency_key_value, source_type_value, source_id_value,
    coalesce(metadata_value, '{}'::jsonb)
  )
  returning * into inserted_event;

  update public.system_profiles
  set total_xp = total_xp + xp_delta_value
  where player_id = target_player_id
  returning total_xp into resulting_total_xp;

  resulting_level := public.system_level_for_xp(resulting_total_xp);

  update public.system_profiles
  set level = resulting_level
  where player_id = target_player_id;

  if event_type_value = 'player_identity_completed' then
    insert into public.system_memories (
      player_id, memory_key, title, description, source_event_id, importance
    )
    values (
      target_player_id,
      'player_identity_completed_v1',
      'Player identity completed',
      'Your Player identity is established. Your SYSTEM can now evolve from real activity.',
      inserted_event.id,
      2
    )
    on conflict (player_id, memory_key) do nothing;
  end if;

  return jsonb_build_object(
    'duplicate', false,
    'event_id', inserted_event.id,
    'total_xp', resulting_total_xp,
    'level', resulting_level
  );
exception
  when unique_violation then
    select * into existing_event
    from public.system_progression_events
    where player_id = target_player_id
      and idempotency_key = idempotency_key_value
    limit 1;

    if existing_event.id is null then
      raise;
    end if;

    select total_xp into resulting_total_xp
    from public.system_profiles
    where player_id = target_player_id;

    return jsonb_build_object(
      'duplicate', true,
      'event_id', existing_event.id,
      'total_xp', resulting_total_xp,
      'level', public.system_level_for_xp(resulting_total_xp)
    );
end;
$$;

revoke execute on function public.record_system_progress_event(uuid, text, text, integer, text, text, text, jsonb)
  from public, anon, authenticated;
grant execute on function public.record_system_progress_event(uuid, text, text, integer, text, text, text, jsonb)
  to authenticated;
