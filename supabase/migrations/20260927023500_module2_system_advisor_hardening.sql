-- MORISE Module 2 — SYSTEM database advisor hardening

create or replace function public.system_level_threshold(target_level integer)
returns bigint
language sql
immutable
strict
set search_path = pg_catalog, public
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
set search_path = pg_catalog, public
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
set search_path = pg_catalog, public
as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

drop policy if exists system_profiles_select_own on public.system_profiles;
create policy system_profiles_select_own
on public.system_profiles for select to authenticated
using ((select auth.uid()) = player_id);

drop policy if exists system_dimensions_select_own on public.system_dimensions;
create policy system_dimensions_select_own
on public.system_dimensions for select to authenticated
using ((select auth.uid()) = player_id);

drop policy if exists system_progression_events_select_own on public.system_progression_events;
create policy system_progression_events_select_own
on public.system_progression_events for select to authenticated
using ((select auth.uid()) = player_id);

drop policy if exists system_memories_select_own on public.system_memories;
create policy system_memories_select_own
on public.system_memories for select to authenticated
using ((select auth.uid()) = player_id);

create index if not exists system_memories_source_event_idx
  on public.system_memories (source_event_id);
