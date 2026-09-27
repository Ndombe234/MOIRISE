create table if not exists public.players (
  id uuid primary key references auth.users (id) on delete cascade,
  handle text,
  display_name text not null default 'Player',
  avatar_url text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint players_handle_format
    check (handle is null or handle ~ '^[a-z0-9_]{3,24}$'),
  constraint players_display_name_length
    check (char_length(trim(display_name)) between 1 and 50)
);

create unique index if not exists players_handle_ci_key
  on public.players (lower(handle))
  where handle is not null;

alter table public.players enable row level security;

grant select, insert, update on public.players to authenticated;
revoke all on public.players from anon;

drop policy if exists "players_select_own" on public.players;
create policy "players_select_own"
  on public.players
  for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "players_insert_own" on public.players;
create policy "players_insert_own"
  on public.players
  for insert
  to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "players_update_own" on public.players;
create policy "players_update_own"
  on public.players
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create index if not exists players_updated_at_idx
  on public.players (updated_at desc);
