create table if not exists public.social_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.players(id) on delete cascade,
  body text not null,
  media_url text null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint social_posts_body_length check (char_length(btrim(body)) between 1 and 5000),
  constraint social_posts_media_url_length check (media_url is null or char_length(media_url) <= 2048)
);

create index if not exists social_posts_created_at_idx on public.social_posts(created_at desc);
create index if not exists social_posts_author_created_at_idx on public.social_posts(author_id, created_at desc);

create table if not exists public.social_follows (
  follower_id uuid not null references public.players(id) on delete cascade,
  following_id uuid not null references public.players(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  constraint social_follows_no_self check (follower_id <> following_id)
);

create index if not exists social_follows_following_idx on public.social_follows(following_id, follower_id);

create table if not exists public.social_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.social_posts(id) on delete cascade,
  author_id uuid not null references public.players(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint social_comments_body_length check (char_length(btrim(body)) between 1 and 2000)
);

create index if not exists social_comments_post_created_at_idx on public.social_comments(post_id, created_at asc);

create table if not exists public.social_reactions (
  post_id uuid not null references public.social_posts(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  reaction_type text not null default 'like',
  created_at timestamptz not null default now(),
  primary key (post_id, player_id),
  constraint social_reactions_type check (reaction_type in ('like', 'love', 'laugh', 'wow', 'support'))
);

create index if not exists social_reactions_post_idx on public.social_reactions(post_id);

create or replace function public.social_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists social_posts_updated_at on public.social_posts;
create trigger social_posts_updated_at
before update on public.social_posts
for each row execute function public.social_updated_at();

drop trigger if exists social_comments_updated_at on public.social_comments;
create trigger social_comments_updated_at
before update on public.social_comments
for each row execute function public.social_updated_at();

alter table public.social_posts enable row level security;
alter table public.social_follows enable row level security;
alter table public.social_comments enable row level security;
alter table public.social_reactions enable row level security;

drop policy if exists "social_posts_select_authenticated" on public.social_posts;
create policy "social_posts_select_authenticated" on public.social_posts
for select to authenticated
using (published = true or author_id = (select auth.uid()));

drop policy if exists "social_posts_insert_owner" on public.social_posts;
create policy "social_posts_insert_owner" on public.social_posts
for insert to authenticated
with check (author_id = (select auth.uid()));

drop policy if exists "social_posts_update_owner" on public.social_posts;
create policy "social_posts_update_owner" on public.social_posts
for update to authenticated
using (author_id = (select auth.uid()))
with check (author_id = (select auth.uid()));

drop policy if exists "social_posts_delete_owner" on public.social_posts;
create policy "social_posts_delete_owner" on public.social_posts
for delete to authenticated
using (author_id = (select auth.uid()));

drop policy if exists "social_follows_select_authenticated" on public.social_follows;
create policy "social_follows_select_authenticated" on public.social_follows
for select to authenticated
using (true);

drop policy if exists "social_follows_insert_owner" on public.social_follows;
create policy "social_follows_insert_owner" on public.social_follows
for insert to authenticated
with check (follower_id = (select auth.uid()) and follower_id <> following_id);

drop policy if exists "social_follows_delete_owner" on public.social_follows;
create policy "social_follows_delete_owner" on public.social_follows
for delete to authenticated
using (follower_id = (select auth.uid()));

drop policy if exists "social_comments_select_authenticated" on public.social_comments;
create policy "social_comments_select_authenticated" on public.social_comments
for select to authenticated
using (true);

drop policy if exists "social_comments_insert_owner" on public.social_comments;
create policy "social_comments_insert_owner" on public.social_comments
for insert to authenticated
with check (author_id = (select auth.uid()));

drop policy if exists "social_comments_update_owner" on public.social_comments;
create policy "social_comments_update_owner" on public.social_comments
for update to authenticated
using (author_id = (select auth.uid()))
with check (author_id = (select auth.uid()));

drop policy if exists "social_comments_delete_owner" on public.social_comments;
create policy "social_comments_delete_owner" on public.social_comments
for delete to authenticated
using (author_id = (select auth.uid()));

drop policy if exists "social_reactions_select_authenticated" on public.social_reactions;
create policy "social_reactions_select_authenticated" on public.social_reactions
for select to authenticated
using (true);

drop policy if exists "social_reactions_insert_owner" on public.social_reactions;
create policy "social_reactions_insert_owner" on public.social_reactions
for insert to authenticated
with check (player_id = (select auth.uid()));

drop policy if exists "social_reactions_update_owner" on public.social_reactions;
create policy "social_reactions_update_owner" on public.social_reactions
for update to authenticated
using (player_id = (select auth.uid()))
with check (player_id = (select auth.uid()));

drop policy if exists "social_reactions_delete_owner" on public.social_reactions;
create policy "social_reactions_delete_owner" on public.social_reactions
for delete to authenticated
using (player_id = (select auth.uid()));

drop policy if exists "players_select_authenticated_social" on public.players;
create policy "players_select_authenticated_social" on public.players
for select to authenticated
using (true);
