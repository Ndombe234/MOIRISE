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
    if dimension_key_value <> 'play' or xp_delta_value < 1 or xp_delta_value > 20 or source_type_value <> 'game' then
      raise exception 'invalid play progression event';
    end if;
    if source_id_value is null or length(trim(source_id_value)) = 0 then
      raise exception 'play completion requires a source id';
    end if;
    if idempotency_key_value is null or length(trim(idempotency_key_value)) = 0 then
      raise exception 'idempotency key is required';
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

revoke execute on function public.record_system_progress_event(uuid, text, text, integer, text, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.record_system_progress_event(uuid, text, text, integer, text, text, text, jsonb) to authenticated;
