create table if not exists public.play_game_runs (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  game_id text not null,
  game_version integer not null,
  seed text not null,
  client_run_id text not null,
  status text not null,
  score integer null,
  duration_ms integer null,
  metadata jsonb not null default '{}'::jsonb,
  idempotency_key text not null,
  started_at timestamptz not null default now(),
  completed_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint play_game_runs_game_id_length check (char_length(game_id) between 1 and 80),
  constraint play_game_runs_version_positive check (game_version > 0),
  constraint play_game_runs_client_run_id_length check (char_length(client_run_id) between 1 and 120),
  constraint play_game_runs_status_check check (status in ('active','completed','abandoned')),
  constraint play_game_runs_score_check check (score is null or score between 0 and 100000),
  constraint play_game_runs_duration_check check (duration_ms is null or duration_ms between 0 and 900000),
  constraint play_game_runs_metadata_object check (jsonb_typeof(metadata) = 'object'),
  constraint play_game_runs_completed_consistency check (
    (status = 'active' and score is null and duration_ms is null and completed_at is null)
    or
    (status in ('completed','abandoned') and score is not null and duration_ms is not null and completed_at is not null)
  ),
  constraint play_game_runs_unique_idempotency unique (player_id, idempotency_key)
);

create index if not exists play_game_runs_player_created_idx on public.play_game_runs(player_id, created_at desc);
create index if not exists play_game_runs_game_created_idx on public.play_game_runs(game_id, created_at desc);

create or replace function public.play_game_runs_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists play_game_runs_updated_at on public.play_game_runs;
create trigger play_game_runs_updated_at
before update on public.play_game_runs
for each row execute function public.play_game_runs_updated_at();

alter table public.play_game_runs enable row level security;

drop policy if exists "play_runs_select_owner" on public.play_game_runs;
create policy "play_runs_select_owner" on public.play_game_runs
for select to authenticated
using (player_id = (select auth.uid()));

drop policy if exists "play_runs_insert_owner" on public.play_game_runs;
create policy "play_runs_insert_owner" on public.play_game_runs
for insert to authenticated
with check (player_id = (select auth.uid()));

drop policy if exists "play_runs_update_owner" on public.play_game_runs;
create policy "play_runs_update_owner" on public.play_game_runs
for update to authenticated
using (player_id = (select auth.uid()))
with check (player_id = (select auth.uid()));

revoke all on public.play_game_runs from anon;
grant select, insert, update on public.play_game_runs to authenticated;
