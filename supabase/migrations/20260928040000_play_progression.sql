create table if not exists public.play_attempts (
  attempt_id uuid primary key,
  player_id uuid not null references public.players(id) on delete cascade,
  game_id text not null,
  status text not null,
  score integer not null,
  duration_ms integer not null,
  signals jsonb not null default '{}'::jsonb,
  moment_candidate jsonb null,
  created_at timestamptz not null default now(),
  constraint play_attempts_status_check check (status in ('completed', 'abandoned', 'failed')),
  constraint play_attempts_score_check check (score between 0 and 1000),
  constraint play_attempts_duration_check check (duration_ms between 250 and 1200000),
  constraint play_attempts_game_id_check check (char_length(game_id) between 1 and 100)
);

create index if not exists play_attempts_player_created_idx
  on public.play_attempts(player_id, created_at desc);

alter table public.play_attempts enable row level security;

drop policy if exists "play_attempts_select_owner" on public.play_attempts;
create policy "play_attempts_select_owner"
on public.play_attempts
for select
to authenticated
using (player_id = (select auth.uid()));

revoke insert, update, delete on public.play_attempts from authenticated, anon;

create or replace function public.record_play_completion(
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
set search_path = public
as $$
declare
  inserted_attempt_id uuid;
  awarded_xp integer := 0;
  event_result jsonb;
begin
  if auth.uid() is null then
    raise exception 'authentication required';
  end if;

  if char_length(game_id_value) < 1 or char_length(game_id_value) > 100 then
    raise exception 'invalid game';
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

  insert into public.play_attempts (
    attempt_id, player_id, game_id, status, score, duration_ms, signals, moment_candidate
  )
  values (
    attempt_id_value, auth.uid(), game_id_value, status_value, score_value, duration_ms_value, signals_value, moment_candidate_value
  )
  on conflict (attempt_id) do nothing
  returning attempt_id into inserted_attempt_id;

  if inserted_attempt_id is null then
    return jsonb_build_object('status', 'duplicate', 'attempt_id', attempt_id_value);
  end if;

  if status_value = 'completed' then
    awarded_xp := greatest(1, least(20, floor(score_value / 50)));
    select public.record_system_progress_event(
      auth.uid(),
      'play_completed',
      'play',
      awarded_xp,
      concat(auth.uid()::text, ':', game_id_value, ':', attempt_id_value::text),
      'game',
      game_id_value,
      jsonb_build_object(
        'score', score_value,
        'duration_ms', duration_ms_value,
        'attempt_id', attempt_id_value
      )
    ) into event_result;
  end if;

  return jsonb_build_object(
    'status', 'recorded',
    'attempt_id', attempt_id_value,
    'awarded_xp', awarded_xp
  );
end;
$$;

revoke all on function public.record_play_completion(text, uuid, text, integer, integer, jsonb, jsonb) from public, anon;
grant execute on function public.record_play_completion(text, uuid, text, integer, integer, jsonb, jsonb) to authenticated;