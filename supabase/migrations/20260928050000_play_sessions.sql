create table if not exists public.play_sessions (
  session_id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  game_id text not null,
  seed bigint not null,
  challenge jsonb not null,
  status text not null default 'active',
  started_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '10 minutes'),
  completed_at timestamptz null,
  constraint play_sessions_status_check check (status in ('active','completed','expired'))
);

create index if not exists play_sessions_player_started_idx
  on public.play_sessions(player_id, started_at desc);

alter table public.play_sessions enable row level security;

drop policy if exists "play_sessions_owner_select" on public.play_sessions;
create policy "play_sessions_owner_select"
on public.play_sessions for select to authenticated
using (player_id = (select auth.uid()));

revoke insert, update, delete on public.play_sessions from authenticated, anon;

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
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if char_length(game_id_value) < 1 or char_length(game_id_value) > 100 then raise exception 'invalid game'; end if;
  insert into public.play_sessions(player_id, game_id, seed, challenge)
  values(auth.uid(), game_id_value, seed_value, challenge_value)
  returning * into new_session;
  return jsonb_build_object(
    'session_id', new_session.session_id,
    'game_id', new_session.game_id,
    'seed', new_session.seed,
    'challenge', new_session.challenge,
    'expires_at', new_session.expires_at
  );
end;
$$;

revoke all on function public.create_play_session(text, bigint, jsonb) from public, anon;
grant execute on function public.create_play_session(text, bigint, jsonb) to authenticated;

create or replace function public.close_play_session(
  session_id_value uuid
) returns text
language plpgsql
set search_path = public
as $$
declare
  current_status text;
  owner_id uuid;
begin
  select status, player_id into current_status, owner_id
  from public.play_sessions where session_id = session_id_value for update;
  if owner_id is null then raise exception 'play session not found'; end if;
  if owner_id <> auth.uid() then raise exception 'not authorized'; end if;
  if current_status = 'completed' then return 'completed'; end if;
  if current_status = 'expired' or now() > (select expires_at from public.play_sessions where session_id = session_id_value) then
    update public.play_sessions set status = 'expired' where session_id = session_id_value;
    return 'expired';
  end if;
  update public.play_sessions set status = 'completed', completed_at = now() where session_id = session_id_value;
  return 'closed';
end;
$$;

revoke all on function public.close_play_session(uuid) from public, anon;
grant execute on function public.close_play_session(uuid) to authenticated;