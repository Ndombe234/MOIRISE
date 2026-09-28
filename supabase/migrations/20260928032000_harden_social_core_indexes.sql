drop policy if exists "players_select_own" on public.players;
create index if not exists social_comments_author_idx on public.social_comments(author_id);
create index if not exists social_reactions_player_idx on public.social_reactions(player_id);
