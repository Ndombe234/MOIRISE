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
security definer
set search_path = pg_catalog, public
as $$
declare
  inserted_attempt_id uuid;
  awarded_xp integer := 0;
  event_result jsonb;
  generated_share_token text;
begin
  if auth.uid() is null then
    raise exception 'authentication required';
  end if;

  if not exists (
    select 1 from public.play_game_catalog
    where game_id = game_id_value and active = true
  ) then
    raise exception 'unknown or inactive game';
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
    attempt_id, player_id, game_id, status, score, duration_ms, signals, moment_candidate, share_token
  )
  values (
    attempt_id_value, auth.uid(), game_id_value, status_value, score_value, duration_ms_value,
    signals_value, moment_candidate_value, generated_share_token
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
    'awarded_xp', awarded_xp,
    'share_token', generated_share_token
  );
end;
$$;