-- MORISE Module 2 — SYSTEM bootstrap hardening
-- SYSTEM state is created by the Player insert trigger. The client never needs
-- a direct initialization RPC; progression remains controlled by the event RPC.

create or replace function public.ensure_system_profile(target_player_id uuid)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  dimension_name text;
begin
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

create or replace function public.initialize_system_after_player_insert()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  perform public.ensure_system_profile(new.id);
  return new;
end;
$$;

drop trigger if exists players_initialize_system_after_insert on public.players;
create trigger players_initialize_system_after_insert
after insert on public.players
for each row
execute function public.initialize_system_after_player_insert();

do $$
declare
  existing_player_id uuid;
begin
  for existing_player_id in select id from public.players loop
    perform public.ensure_system_profile(existing_player_id);
  end loop;
end;
$$;

revoke execute on function public.ensure_system_profile(uuid) from public, anon, authenticated;
revoke execute on function public.initialize_system_after_player_insert() from public, anon, authenticated;
grant execute on function public.record_system_progress_event(uuid, text, text, integer, text, text, text, jsonb) to authenticated;
