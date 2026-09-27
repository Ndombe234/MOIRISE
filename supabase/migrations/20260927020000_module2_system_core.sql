-- MORISE Module 2 — SYSTEM Core
-- The SYSTEM is source-of-truth for Player progression. Clients may read
-- their own state through RLS but may only mutate progression through the RPC.

create table if not exists public.system_profiles (
  player_id uuid primary key references public.players(id) on delete cascade,
  level integer not null default 1 check (level >= 1),
  total_xp bigint not null default 0 check (total_xp >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.system_dimensions (
  player_id uuid not null references public.players(id) on delete cascade,
  dimension_key text not null check (dimension_key in (
    'exploration', 'creation', 'knowledge', 'social',
    'community', 'play', 'contribution'
  )),
  xp bigint not null default 0 check (xp >= 0),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (player_id, dimension_key)
);

create table if not exists public.system_progression_events (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  event_type text not null,
  dimension_key text check (dimension_key is null or dimension_key in (
    'exploration', 'creation', 'knowledge', 'social',
    'community', 'play', 'contribution'
  )),
  xp_delta integer not null check (xp_delta >= 0 and xp_delta <= 10000),
  idempotency_key text not null,
  source_type text not null,
  source_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  unique (player_id, idempotency_key)
);

create unique index if not exists system_identity_completion_once_idx
  on public.system_progression_events (player_id)
  where event_type = 'player_identity_completed';

create table if not exists public.system_memories (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  memory_key text not null,
  title text not null,
  description text not null,
  source_event_id uuid references public.system_progression_events(id) on delete set null,
  importance smallint not null default 1 check (importance between 1 and 5),
  created_at timestamptz not null default timezone('utc', now()),
  unique (player_id, memory_key)
);

create index if not exists system_progression_events_player_created_idx
  on public.system_progression_events (player_id, created_at desc);

create index if not exists system_memories_player_created_idx
  on public.system_memories (player_id, created_at desc);

create or replace function public.system_level_threshold(target_level integer)
returns bigint
language sql
immutable
strict
as $$
  select case
    when target_level = 1 then 0::bigint
    else floor(100 * power(target_level - 1, 1.65))::bigint
  end;
$$;

create or replace function public.system_level_for_xp(total_xp_value bigint)
returns integer
language plpgsql
immutable
strict
as $$
declare
  result_level integer := 1;
begin
  if total_xp_value < 0 then
    raise exception 'total XP cannot be negative';
  end if;

  while public.system_level_threshold(result_level + 1) <= total_xp_value loop
    result_level := result_level + 1;
  end loop;

  return result_level;
end;
$$;

create or replace function public.system_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists system_profiles_updated_at on public.system_profiles;
create trigger system_profiles_updated_at
before update on public.system_profiles
for each row execute function public.system_touch_updated_at();

drop trigger if exists system_dimensions_updated_at on public.system_dimensions;
create trigger system_dimensions_updated_at
before update on public.system_dimensions
for each row execute function public.system_touch_updated_at();

create or replace function public.ensure_system_profile(target_player_id uuid)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  dimension_name text;
begin
  if auth.uid() is null or auth.uid() <> target_player_id then
    raise exception 'not authorized';
  end if;

  if not exists (select 1 from public.players where id = target_player_id) then
    raise exception 'player not found';
  end if;

  insert into public.system_profiles (player_id)
  values (target_player_id)
  on conflict (player_id) do nothing;

  foreach dimension_name in array array[
    'exploration', 'creation', 'knowledge', 'social',
    'community', 'play', 'contribution'
  ] loop
    insert into public.system_dimensions (player_id, dimension_key)
    values (target_player_id, dimension_name)
    on conflict (player_id, dimension_key) do nothing;
  end loop;

  insert into public.system_memories (
    player_id, memory_key, title, description, importance
  )
  values (
    target_player_id,
    'system_initialized_v1',
    'SYSTEM initialized',
    'Your personal SYSTEM is ready. Your path will form through real activity.',
    1
  )
  on conflict (player_id, memory_key) do nothing;
end;
$$;

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
  player_is_onboarded boolean;
begin
  if auth.uid() is null or auth.uid() <> target_player_id then
    raise exception 'not authorized';
  end if;

  if event_type_value <> 'player_identity_completed' then
    raise exception 'unsupported Module 2 progression event';
  end if;

  if dimension_key_value is not null then
    raise exception 'identity completion cannot assign a dimension in Module 2';
  end if;

  if xp_delta_value <> 25 then
    raise exception 'identity completion reward must be 25 XP';
  end if;

  if source_type_value <> 'player' then
    raise exception 'identity completion source must be player';
  end if;

  if idempotency_key_value is null or length(trim(idempotency_key_value)) = 0 then
    raise exception 'idempotency key is required';
  end if;

  select onboarding_completed into player_is_onboarded
  from public.players
  where id = target_player_id;

  if not found then
    raise exception 'player not found';
  end if;

  if player_is_onboarded is not true then
    raise exception 'player identity is not complete';
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
      and (idempotency_key = idempotency_key_value or event_type = 'player_identity_completed')
    order by created_at asc
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

alter table public.system_profiles enable row level security;
alter table public.system_dimensions enable row level security;
alter table public.system_progression_events enable row level security;
alter table public.system_memories enable row level security;

drop policy if exists system_profiles_select_own on public.system_profiles;
create policy system_profiles_select_own on public.system_profiles for select to authenticated using (auth.uid() = player_id);
drop policy if exists system_dimensions_select_own on public.system_dimensions;
create policy system_dimensions_select_own on public.system_dimensions for select to authenticated using (auth.uid() = player_id);
drop policy if exists system_progression_events_select_own on public.system_progression_events;
create policy system_progression_events_select_own on public.system_progression_events for select to authenticated using (auth.uid() = player_id);
drop policy if exists system_memories_select_own on public.system_memories;
create policy system_memories_select_own on public.system_memories for select to authenticated using (auth.uid() = player_id);

revoke all on table public.system_profiles from anon, authenticated;
revoke all on table public.system_dimensions from anon, authenticated;
revoke all on table public.system_progression_events from anon, authenticated;
revoke all on table public.system_memories from anon, authenticated;
grant select on public.system_profiles to authenticated;
grant select on public.system_dimensions to authenticated;
grant select on public.system_progression_events to authenticated;
grant select on public.system_memories to authenticated;

revoke execute on function public.ensure_system_profile(uuid) from public, anon, authenticated;
revoke execute on function public.record_system_progress_event(uuid, text, text, integer, text, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.ensure_system_profile(uuid) to authenticated;
grant execute on function public.record_system_progress_event(uuid, text, text, integer, text, text, text, jsonb) to authenticated;
