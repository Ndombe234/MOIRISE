# MORISE — IMPLEMENTATION SPEC V1

**Status:** canonical implementation detail
**Current functional module:** MODULE 6 — PLAY / FINAL QA
**Repository:** Ndombe234/MOIRISE
**Functional source:** `docs/MORISE_MASTER_PLAN_V3.md`
**Architecture source:** `docs/MORISE_TECHNICAL_MASTER_ARCHITECTURE.md`

> Ce document descend d'un niveau supplémentaire par rapport à la conception technique maître. Il définit les contrats de code, SQL, sécurité, événements, actions, providers et tests. Il ne doit pas être interprété comme l'activation immédiate des Modules 7→15.

---

# 1. RÈGLES D'IMPLÉMENTATION

1. PostgreSQL/Supabase est la source de vérité transactionnelle pour les données applicatives.
2. Les médias binaires sont stockés dans Storage; PostgreSQL conserve les références et métadonnées.
3. `auth.users` reste la source d'identité; `profiles.id = auth.users.id`.
4. Toute mutation sensible est autorisée côté serveur/RLS.
5. Le client ne choisit jamais directement un provider privilégié.
6. Une capacité optionnelle peut être `DISABLED`, `PENDING_DEPENDENCY`, `MAINTENANCE` ou `UNAVAILABLE` sans casser le reste du produit.
7. Toute mutation idempotente accepte une clé d'idempotence.
8. Les événements métier sont persistés avant d'être consommés par des traitements secondaires lorsque la transaction l'exige.
9. Les traductions sont dérivées; le texte source reste intact.
10. STORE, ANALYZE, SHARE et TRAIN sont quatre permissions distinctes pour les Memories.
11. Le rôle global OWNER/Superadmin est distinct des rôles ADMIN/MODERATOR.
12. Aucun compteur utilisateur, résultat, présence ou revenu ne doit être fabriqué.
13. Les futurs providers ne doivent pas imposer leur SDK aux modules métier.
14. Les contrats ci-dessous sont des contrats cibles; avant migration, vérifier les migrations existantes afin d'éviter tout doublon.

---

# 2. SQL — EXTENSIONS ET TYPES

```sql
create extension if not exists pgcrypto;
create extension if not exists citext;

create type public.app_role as enum ('OWNER','ADMIN','MODERATOR','PLAYER');
create type public.visibility as enum ('PRIVATE','AUTHORIZED','PUBLIC');
create type public.capability_status as enum (
  'PLANNED','IMPLEMENTED','PENDING_DEPENDENCY','AVAILABLE','CONFIGURED',
  'AUTHORIZED','ENABLED','EXECUTING','VALIDATING','COMPLETED','FAILED',
  'CANCELED','DEGRADED','MAINTENANCE','DISABLED','UNAVAILABLE'
);
create type public.job_status as enum ('REQUESTED','QUEUED','RUNNING','VALIDATING','COMPLETED','FAILED','CANCELED','UNAVAILABLE');
create type public.message_status as enum ('DRAFT','SENT','DELIVERED','READ','REVOKED');
create type public.membership_status as enum ('INVITED','PENDING','ACTIVE','SUSPENDED','REMOVED');
create type public.event_status as enum ('DRAFT','SCHEDULED','ACTIVE','FINALIZING','COMPLETED','ARCHIVED','CANCELED');
create type public.memory_type as enum ('PHOTO','VIDEO','AUDIO','TEXT','CREATION','MOMENT','CARD');
create type public.memory_status as enum ('UPLOADING','READY','PROCESSING','FAILED','DELETED');
create type public.reward_status as enum ('PENDING','GRANTED','REVOKED');
create type public.ledger_direction as enum ('CREDIT','DEBIT');
```

---

# 3. SQL — FOUNDATION / AUTHORIZATION

## 3.1 profiles

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username citext unique,
  display_name text,
  avatar_url text,
  bio text,
  locale text not null default 'en',
  timezone text not null default 'UTC',
  role public.app_role not null default 'PLAYER',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_locale_check check (locale in ('fr','en','hi','es','de','it','pt','ar','ja','ko','ru','tr','id','th','vi','pl','nl','ro','bn','ur'))
);
create index profiles_role_idx on public.profiles(role);
create index profiles_active_idx on public.profiles(is_active) where is_active = true;
```

## 3.2 player_preferences

```sql
create table public.player_preferences (
  player_id uuid primary key references public.profiles(id) on delete cascade,
  theme text not null default 'system',
  presentation_style text not null default 'default',
  reduced_motion boolean not null default false,
  notifications_enabled boolean not null default true,
  content_language text not null default 'en',
  updated_at timestamptz not null default now()
);
create index player_preferences_language_idx on public.player_preferences(content_language);
```

## 3.3 player_privacy_settings

```sql
create table public.player_privacy_settings (
  player_id uuid primary key references public.profiles(id) on delete cascade,
  profile_visibility public.visibility not null default 'PUBLIC',
  memory_default_visibility public.visibility not null default 'PRIVATE',
  allow_ai_analysis boolean not null default false,
  allow_personalization boolean not null default true,
  allow_community_discovery boolean not null default true,
  updated_at timestamptz not null default now()
);
```

## 3.4 player_devices

```sql
create table public.player_devices (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.profiles(id) on delete cascade,
  device_class text not null,
  ram_class text,
  gpu_available boolean not null default false,
  webgpu_supported boolean not null default false,
  wasm_supported boolean not null default true,
  webcodecs_supported boolean not null default false,
  network_class text,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index player_devices_player_idx on public.player_devices(player_id);
create index player_devices_last_seen_idx on public.player_devices(last_seen_at desc);
```

## 3.5 player_roles

```sql
create table public.player_roles (
  player_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null,
  granted_by uuid references public.profiles(id),
  granted_at timestamptz not null default now(),
  primary key (player_id, role)
);
create index player_roles_role_idx on public.player_roles(role);
```

## 3.6 audit_events

```sql
create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  target_type text,
  target_id uuid,
  correlation_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_events_actor_idx on public.audit_events(actor_id, created_at desc);
create index audit_events_target_idx on public.audit_events(target_type, target_id, created_at desc);
create index audit_events_action_idx on public.audit_events(action, created_at desc);
```

---

# 4. SQL — SOCIAL / PRIVATE CHAT

## 4.1 posts

```sql
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  visibility public.visibility not null default 'PUBLIC',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index posts_author_created_idx on public.posts(author_id, created_at desc);
create index posts_public_created_idx on public.posts(created_at desc) where visibility = 'PUBLIC' and deleted_at is null;
```

## 4.2 comments

```sql
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index comments_post_created_idx on public.comments(post_id, created_at);
create index comments_author_idx on public.comments(author_id);
```

## 4.3 reactions

```sql
create table public.reactions (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.profiles(id) on delete cascade,
  target_type text not null,
  target_id uuid not null,
  reaction_type text not null,
  created_at timestamptz not null default now(),
  unique(actor_id, target_type, target_id, reaction_type)
);
create index reactions_target_idx on public.reactions(target_type, target_id);
```

## 4.4 conversations

```sql
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.profiles(id),
  is_group boolean not null default false,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 4.5 conversation_members

```sql
create table public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  player_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  left_at timestamptz,
  primary key(conversation_id, player_id)
);
create index conversation_members_player_idx on public.conversation_members(player_id, joined_at desc);
```

## 4.6 messages

```sql
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text not null,
  source_locale text not null default 'en',
  status public.message_status not null default 'SENT',
  client_idempotency_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(sender_id, client_idempotency_key)
);
create index messages_conversation_created_idx on public.messages(conversation_id, created_at desc);
create index messages_sender_idx on public.messages(sender_id, created_at desc);
```

## 4.7 message_translations

```sql
create table public.message_translations (
  message_id uuid not null references public.messages(id) on delete cascade,
  target_locale text not null,
  translated_body text not null,
  provider_id text,
  engine_version text,
  created_at timestamptz not null default now(),
  primary key(message_id, target_locale)
);
create index message_translations_locale_idx on public.message_translations(target_locale);
```

## 4.8 notifications

```sql
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index notifications_player_created_idx on public.notifications(player_id, created_at desc);
create index notifications_unread_idx on public.notifications(player_id, created_at desc) where read_at is null;
```

---

# 5. SQL — WORLD / PROGRESSION / PLAY

## 5.1 worlds

```sql
create table public.worlds (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  version integer not null default 1,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index worlds_status_idx on public.worlds(status);
```

## 5.2 world_objects

```sql
create table public.world_objects (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references public.worlds(id) on delete cascade,
  object_type text not null,
  definition jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_at timestamptz not null default now()
);
create index world_objects_world_idx on public.world_objects(world_id);
create index world_objects_type_idx on public.world_objects(object_type);
```

## 5.3 world_object_state

```sql
create table public.world_object_state (
  object_id uuid primary key references public.world_objects(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  state_version bigint not null default 1,
  updated_at timestamptz not null default now()
);
```

## 5.4 world_events

```sql
create table public.world_events (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references public.worlds(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  source_event_id uuid,
  created_at timestamptz not null default now()
);
create index world_events_world_created_idx on public.world_events(world_id, created_at desc);
create index world_events_actor_created_idx on public.world_events(actor_id, created_at desc);
```

## 5.5 xp_events

```sql
create table public.xp_events (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.profiles(id) on delete cascade,
  source_event_id uuid,
  amount integer not null,
  reason text not null,
  rule_version text not null,
  created_at timestamptz not null default now(),
  unique(player_id, source_event_id, reason)
);
create index xp_events_player_created_idx on public.xp_events(player_id, created_at desc);
```

## 5.6 player_progress

```sql
create table public.player_progress (
  player_id uuid primary key references public.profiles(id) on delete cascade,
  xp bigint not null default 0,
  level integer not null default 1,
  rank_code text not null default 'F',
  updated_at timestamptz not null default now(),
  constraint player_progress_xp_check check (xp >= 0),
  constraint player_progress_level_check check (level >= 1)
);
```

## 5.7 titles

```sql
create table public.titles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  display_key text not null,
  rule_version text not null,
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
```

## 5.8 player_titles

```sql
create table public.player_titles (
  player_id uuid not null references public.profiles(id) on delete cascade,
  title_id uuid not null references public.titles(id) on delete cascade,
  source_event_id uuid,
  granted_at timestamptz not null default now(),
  primary key(player_id, title_id)
);
create index player_titles_player_idx on public.player_titles(player_id, granted_at desc);
```

## 5.9 play_sessions

```sql
create table public.play_sessions (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.profiles(id) on delete cascade,
  experience_id uuid,
  experience_version integer,
  engine_version text,
  state_version bigint not null default 1,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  last_activity_at timestamptz not null default now(),
  finished_at timestamptz
);
create index play_sessions_player_created_idx on public.play_sessions(player_id, created_at desc);
create index play_sessions_status_idx on public.play_sessions(status, last_activity_at desc);
```

## 5.10 play_actions

```sql
create table public.play_actions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.play_sessions(id) on delete cascade,
  sequence_no bigint not null,
  action_type text not null,
  input jsonb not null default '{}'::jsonb,
  expected_state_version bigint,
  validation_status text not null default 'PENDING',
  result jsonb,
  created_at timestamptz not null default now(),
  unique(session_id, sequence_no)
);
create index play_actions_session_created_idx on public.play_actions(session_id, created_at);
```

---

# 6. SQL — GAMES / COMMUNITIES / EVENTS

## 6.1 game_experiences

```sql
create table public.game_experiences (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.profiles(id),
  slug text not null unique,
  title_key text not null,
  status text not null default 'DRAFT',
  solo_supported boolean not null default true,
  multiplayer_supported boolean not null default false,
  required_capabilities text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index game_experiences_status_idx on public.game_experiences(status);
create index game_experiences_creator_idx on public.game_experiences(creator_id);
```

## 6.2 game_experience_versions

```sql
create table public.game_experience_versions (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.game_experiences(id) on delete cascade,
  version integer not null,
  engine_version text not null,
  manifest jsonb not null default '{}'::jsonb,
  source_reference text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  unique(experience_id, version)
);
```

## 6.3 communities

```sql
create table public.communities (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id),
  name text not null,
  description text,
  visibility public.visibility not null default 'PUBLIC',
  created_at timestamptz not null default now()
);
create index communities_owner_idx on public.communities(owner_id);
```

## 6.4 community_members

```sql
create table public.community_members (
  community_id uuid not null references public.communities(id) on delete cascade,
  player_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'MEMBER',
  status public.membership_status not null default 'ACTIVE',
  joined_at timestamptz not null default now(),
  primary key(community_id, player_id)
);
create index community_members_player_idx on public.community_members(player_id);
create index community_members_role_idx on public.community_members(community_id, role);
```

## 6.5 events

```sql
create table public.events (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.profiles(id),
  title_key text not null,
  description_key text,
  status public.event_status not null default 'DRAFT',
  starts_at timestamptz,
  ends_at timestamptz,
  eligibility jsonb not null default '{}'::jsonb,
  rules jsonb not null default '{}'::jsonb,
  reward_policy jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_time_check check (ends_at is null or starts_at is null or ends_at > starts_at)
);
create index events_status_time_idx on public.events(status, starts_at);
```

## 6.6 event_participants

```sql
create table public.event_participants (
  event_id uuid not null references public.events(id) on delete cascade,
  player_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  result jsonb,
  primary key(event_id, player_id)
);
create index event_participants_player_idx on public.event_participants(player_id, joined_at desc);
```

---

# 7. SQL — MEMORY VAULT

## 7.1 memory_items

```sql
create table public.memory_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  memory_type public.memory_type not null,
  storage_bucket text,
  storage_path text,
  mime_type text,
  size_bytes bigint,
  checksum text,
  title text,
  description text,
  captured_at timestamptz,
  visibility public.visibility not null default 'PRIVATE',
  allow_ai_analysis boolean not null default false,
  allow_sharing boolean not null default false,
  status public.memory_status not null default 'UPLOADING',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index memory_items_owner_created_idx on public.memory_items(owner_id, created_at desc);
create index memory_items_owner_type_idx on public.memory_items(owner_id, memory_type);
create index memory_items_status_idx on public.memory_items(status);
```

## 7.2 memory_collections

```sql
create table public.memory_collections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  visibility public.visibility not null default 'PRIVATE',
  created_at timestamptz not null default now()
);
create index memory_collections_owner_idx on public.memory_collections(owner_id);
```

## 7.3 memory_collection_items

```sql
create table public.memory_collection_items (
  collection_id uuid not null references public.memory_collections(id) on delete cascade,
  memory_id uuid not null references public.memory_items(id) on delete cascade,
  position integer not null default 0,
  primary key(collection_id, memory_id)
);
create index memory_collection_items_memory_idx on public.memory_collection_items(memory_id);
```

## 7.4 memory_shares

```sql
create table public.memory_shares (
  memory_id uuid not null references public.memory_items(id) on delete cascade,
  shared_with_player_id uuid not null references public.profiles(id) on delete cascade,
  permission text not null default 'VIEW',
  created_at timestamptz not null default now(),
  primary key(memory_id, shared_with_player_id)
);
```

---

# 8. SQL — CAPABILITY / PROVIDER / JOBS

## 8.1 capability_registry

```sql
create table public.capability_registry (
  id text primary key,
  version text not null,
  status public.capability_status not null default 'PLANNED',
  required_dependencies text[] not null default '{}',
  optional_dependencies text[] not null default '{}',
  provider_ids text[] not null default '{}',
  fallback_ids text[] not null default '{}',
  privacy_class text not null default 'PUBLIC',
  owner_policy jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create index capability_registry_status_idx on public.capability_registry(status);
```

## 8.2 provider_registry

```sql
create table public.provider_registry (
  id text primary key,
  capability_id text not null references public.capability_registry(id) on delete cascade,
  provider_type text not null,
  enabled boolean not null default false,
  configured boolean not null default false,
  authorized boolean not null default false,
  endpoint_reference text,
  config_public jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create index provider_registry_capability_idx on public.provider_registry(capability_id);
create index provider_registry_enabled_idx on public.provider_registry(enabled) where enabled = true;
```

## 8.3 provider_health

```sql
create table public.provider_health (
  provider_id text primary key references public.provider_registry(id) on delete cascade,
  health_status text not null default 'UNKNOWN',
  latency_ms integer,
  last_check_at timestamptz,
  last_error_code text,
  metadata jsonb not null default '{}'::jsonb
);
```

## 8.4 async_jobs

```sql
create table public.async_jobs (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references public.profiles(id),
  capability_id text references public.capability_registry(id),
  provider_id text references public.provider_registry(id),
  status public.job_status not null default 'REQUESTED',
  idempotency_key text,
  input_reference jsonb not null default '{}'::jsonb,
  output_reference jsonb,
  error_code text,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz,
  unique(requester_id, idempotency_key)
);
create index async_jobs_status_created_idx on public.async_jobs(status, created_at);
create index async_jobs_requester_idx on public.async_jobs(requester_id, created_at desc);
```

---

# 9. SQL — ECONOMY / REWARDS

## 9.1 reward_definitions

```sql
create table public.reward_definitions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  reward_type text not null,
  payload jsonb not null default '{}'::jsonb,
  rule_version text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
```

## 9.2 player_rewards

```sql
create table public.player_rewards (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.profiles(id) on delete cascade,
  reward_definition_id uuid not null references public.reward_definitions(id),
  source_event_id uuid,
  status public.reward_status not null default 'PENDING',
  created_at timestamptz not null default now(),
  unique(player_id, reward_definition_id, source_event_id)
);
create index player_rewards_player_idx on public.player_rewards(player_id, created_at desc);
```

## 9.3 economy_ledger

```sql
create table public.economy_ledger (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.profiles(id) on delete cascade,
  asset_type text not null,
  amount numeric(20,6) not null,
  direction public.ledger_direction not null,
  source_event_id uuid,
  reason text not null,
  created_at timestamptz not null default now()
);
create index economy_ledger_player_created_idx on public.economy_ledger(player_id, created_at desc);
create index economy_ledger_source_idx on public.economy_ledger(source_event_id);
```

---

# 10. RLS — POLICIES EXACTES DE BASE

> Les policies suivantes sont les modèles de sécurité cibles. Les noms doivent être conservés stables après migration.

## 10.1 helper: current role

```sql
create or replace function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role from public.profiles where id = auth.uid()),
    'PLAYER'::public.app_role
  );
$$;
```

## 10.2 profiles

```sql
alter table public.profiles enable row level security;

create policy profiles_select_public
on public.profiles for select
using (is_active = true or id = auth.uid() or public.current_app_role() in ('OWNER','ADMIN','MODERATOR'));

create policy profiles_update_self
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy profiles_admin_update
on public.profiles for update
using (public.current_app_role() in ('OWNER','ADMIN'))
with check (public.current_app_role() in ('OWNER','ADMIN'));
```

## 10.3 player-private tables

```sql
alter table public.player_preferences enable row level security;
create policy player_preferences_self on public.player_preferences
for all using (player_id = auth.uid()) with check (player_id = auth.uid());

alter table public.player_privacy_settings enable row level security;
create policy player_privacy_self on public.player_privacy_settings
for all using (player_id = auth.uid()) with check (player_id = auth.uid());

alter table public.player_devices enable row level security;
create policy player_devices_self on public.player_devices
for all using (player_id = auth.uid()) with check (player_id = auth.uid());
```

## 10.4 messages

```sql
alter table public.messages enable row level security;

create policy messages_members_select
on public.messages for select
using (
  exists (
    select 1 from public.conversation_members cm
    where cm.conversation_id = messages.conversation_id
      and cm.player_id = auth.uid()
      and cm.left_at is null
  )
);

create policy messages_members_insert
on public.messages for insert
with check (
  sender_id = auth.uid()
  and exists (
    select 1 from public.conversation_members cm
    where cm.conversation_id = messages.conversation_id
      and cm.player_id = auth.uid()
      and cm.left_at is null
  )
);

create policy messages_sender_update
on public.messages for update
using (sender_id = auth.uid())
with check (sender_id = auth.uid());
```

## 10.5 memory_items

```sql
alter table public.memory_items enable row level security;

create policy memory_owner_select
on public.memory_items for select
using (
  owner_id = auth.uid()
  or exists (
    select 1 from public.memory_shares ms
    where ms.memory_id = memory_items.id
      and ms.shared_with_player_id = auth.uid()
  )
  or (visibility = 'PUBLIC' and status = 'READY')
);

create policy memory_owner_insert
on public.memory_items for insert
with check (owner_id = auth.uid());

create policy memory_owner_update
on public.memory_items for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

auto policy memory_owner_delete
on public.memory_items for delete
using (owner_id = auth.uid());
```

**Correction obligatoire avant migration:** `auto policy` n'est pas du SQL PostgreSQL. Le nom réel doit être créé ainsi:

```sql
create policy memory_owner_delete
on public.memory_items for delete
using (owner_id = auth.uid());
```

## 10.6 audit

```sql
alter table public.audit_events enable row level security;
create policy audit_owner_read
on public.audit_events for select
using (public.current_app_role() = 'OWNER');
```

## 10.7 capability/provider administration

```sql
alter table public.capability_registry enable row level security;
create policy capability_public_read
on public.capability_registry for select
using (true);
create policy capability_owner_write
on public.capability_registry for all
using (public.current_app_role() = 'OWNER')
with check (public.current_app_role() = 'OWNER');

alter table public.provider_registry enable row level security;
create policy provider_owner_all
on public.provider_registry for all
using (public.current_app_role() = 'OWNER')
with check (public.current_app_role() = 'OWNER');
```

**Principe:** les secrets provider ne sont jamais stockés dans ces colonnes publiques; ils restent dans les secrets/env du runtime.

---

# 11. TYPES TYPESCRIPT — CORE

```ts
export type Locale =
  | 'fr' | 'en' | 'hi' | 'es' | 'de' | 'it' | 'pt' | 'ar' | 'ja'
  | 'ko' | 'ru' | 'tr' | 'id' | 'th' | 'vi' | 'pl' | 'nl' | 'ro' | 'bn' | 'ur';

export type AppRole = 'OWNER' | 'ADMIN' | 'MODERATOR' | 'PLAYER';

export type CapabilityStatus =
  | 'PLANNED' | 'IMPLEMENTED' | 'PENDING_DEPENDENCY' | 'AVAILABLE'
  | 'CONFIGURED' | 'AUTHORIZED' | 'ENABLED' | 'EXECUTING' | 'VALIDATING'
  | 'COMPLETED' | 'FAILED' | 'CANCELED' | 'DEGRADED' | 'MAINTENANCE'
  | 'DISABLED' | 'UNAVAILABLE';

export interface CapabilityDefinition {
  id: string;
  version: string;
  status: CapabilityStatus;
  requiredDependencies: string[];
  optionalDependencies: string[];
  providerIds: string[];
  fallbackIds: string[];
  privacyClass: 'PUBLIC' | 'PRIVATE' | 'SENSITIVE';
}

export interface CapabilityRequest<TInput = unknown> {
  requestId: string;
  capabilityId: string;
  actorId: string;
  input: TInput;
  contextId?: string;
  idempotencyKey?: string;
  locale?: Locale;
}

export interface CapabilityResult<TOutput = unknown> {
  requestId: string;
  status: 'SUCCESS' | 'PENDING' | 'DEGRADED' | 'UNAVAILABLE' | 'ERROR';
  output?: TOutput;
  providerId?: string;
  fallbackId?: string;
  eventId?: string;
  errorCode?: string;
}
```

---

# 12. TYPESCRIPT — PLAYER / SOCIAL

```ts
export interface PlayerContext {
  playerId: string;
  locale: Locale;
  timezone: string;
  role: AppRole;
  device: DeviceCapabilities;
  preferences: PlayerPreferences;
  privacy: PrivacySettings;
}

export interface DeviceCapabilities {
  deviceClass: 'LOW_MEMORY_MOBILE' | 'STANDARD_MOBILE' | 'HIGH_END_MOBILE' | 'TABLET' | 'PC_NO_GPU' | 'PC_GPU' | 'WORKSTATION';
  ramClass?: string;
  gpuAvailable: boolean;
  webgpuSupported: boolean;
  wasmSupported: boolean;
  webcodecsSupported: boolean;
}

export interface PlayerPreferences {
  presentationStyle: string;
  reducedMotion: boolean;
  notificationsEnabled: boolean;
  contentLanguage: Locale;
}

export interface PrivacySettings {
  profileVisibility: 'PRIVATE' | 'AUTHORIZED' | 'PUBLIC';
  memoryDefaultVisibility: 'PRIVATE' | 'AUTHORIZED' | 'PUBLIC';
  allowAiAnalysis: boolean;
  allowPersonalization: boolean;
}

export interface SendMessageInput {
  conversationId: string;
  body: string;
  sourceLocale: Locale;
  idempotencyKey: string;
}

export interface TranslationRequest {
  text: string;
  sourceLocale: Locale;
  targetLocale: Locale;
  privacyClass: 'PUBLIC' | 'PRIVATE' | 'SENSITIVE';
  context: 'UI' | 'MESSAGE' | 'POST' | 'CREATION';
}
```

---

# 13. TYPESCRIPT — PLAY / GAMES

```ts
export interface PlaySession {
  id: string;
  playerId: string;
  experienceId: string;
  experienceVersion: number;
  engineVersion?: string;
  stateVersion: number;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ABANDONED';
}

export interface PlayAction {
  actionId: string;
  sessionId: string;
  sequenceNo: number;
  actionType: string;
  input: Record<string, unknown>;
  expectedStateVersion?: number;
}

export interface ActionValidationResult {
  accepted: boolean;
  stateVersion: number;
  result?: Record<string, unknown>;
  rejectionCode?: string;
}

export interface GameSpec {
  title: string;
  coreLoop: string;
  objectives: string[];
  rules: string[];
  entities: string[];
  scenes: string[];
  controls: string[];
  persistence: 'NONE' | 'CHECKPOINT' | 'FULL';
  multiplayer: boolean;
  target: 'BROWSER' | 'LOCAL' | 'SHARED';
}
```

---

# 14. TYPESCRIPT — MEMORY / MEDIA

```ts
export interface MemoryItem {
  id: string;
  ownerId: string;
  type: 'PHOTO' | 'VIDEO' | 'AUDIO' | 'TEXT' | 'CREATION' | 'MOMENT' | 'CARD';
  storageBucket?: string;
  storagePath?: string;
  mimeType?: string;
  sizeBytes?: number;
  visibility: 'PRIVATE' | 'AUTHORIZED' | 'PUBLIC';
  allowAiAnalysis: boolean;
  allowSharing: boolean;
  status: 'UPLOADING' | 'READY' | 'PROCESSING' | 'FAILED' | 'DELETED';
}

export interface MediaJobRequest {
  capabilityId: 'IMAGE_GENERATION' | 'MUSIC_GENERATION' | 'VIDEO_GENERATION' | 'AUDIO_GENERATION';
  actorId: string;
  input: Record<string, unknown>;
  privacyClass: 'PUBLIC' | 'PRIVATE' | 'SENSITIVE';
  rightsDeclaration?: string;
}
```

---

# 15. TYPESCRIPT — PROVIDER CONTRACTS

```ts
export interface ProviderContext {
  requestId: string;
  actorId: string;
  privacyClass: 'PUBLIC' | 'PRIVATE' | 'SENSITIVE';
  locale?: Locale;
  signal?: AbortSignal;
}

export interface ProviderHealth {
  providerId: string;
  status: 'HEALTHY' | 'DEGRADED' | 'UNAVAILABLE' | 'UNKNOWN';
  latencyMs?: number;
  checkedAt: string;
  errorCode?: string;
}

export interface CapabilityProvider<TInput = unknown, TOutput = unknown> {
  readonly id: string;
  readonly capabilityId: string;
  readonly version: string;
  canHandle(input: TInput, context: ProviderContext): Promise<boolean>;
  health(context: ProviderContext): Promise<ProviderHealth>;
  execute(input: TInput, context: ProviderContext): Promise<TOutput>;
  cancel?(requestId: string): Promise<void>;
}
```

## 15.1 Translation provider

```ts
export interface TranslationProvider extends CapabilityProvider<TranslationRequest, { text: string; sourceLocale: Locale; targetLocale: Locale }> {}
```

## 15.2 Image provider

```ts
export interface ImageProvider extends CapabilityProvider<{
  prompt: string;
  width: number;
  height: number;
  seed?: number;
}, { assetReference: string; mimeType: string }> {}
```

## 15.3 Music provider

```ts
export interface MusicProvider extends CapabilityProvider<{
  prompt: string;
  durationSeconds: number;
  format: 'WAV' | 'OGG' | 'MP3';
}, { assetReference: string; durationSeconds: number }> {}
```

## 15.4 Video provider

```ts
export interface VideoProvider extends CapabilityProvider<{
  prompt: string;
  durationSeconds: number;
  width: number;
  height: number;
  fps: number;
}, { assetReference: string; durationSeconds: number }> {}
```

## 15.5 Browser provider

```ts
export interface BrowserLocalProvider<TIn, TOut> extends CapabilityProvider<TIn, TOut> {
  readonly execution: 'BROWSER';
}
```

## 15.6 Local computer provider

```ts
export interface LocalNodeProvider<TIn, TOut> extends CapabilityProvider<TIn, TOut> {
  readonly execution: 'LOCAL_NODE';
  ping(): Promise<boolean>;
}
```

---

# 16. PROVIDER ROUTER EXACT CONTRACT

```ts
export interface ProviderRouter {
  resolve<TIn, TOut>(
    capabilityId: string,
    input: TIn,
    context: ProviderContext
  ): Promise<CapabilityProvider<TIn, TOut>>;
}
```

Resolution order is policy-driven but defaults to:

```text
MORISE DETERMINISTIC
→ BROWSER
→ LOCAL_NODE
→ SELF_HOSTED
→ CLOUD
→ EXTERNAL_API
→ UNAVAILABLE
```

A provider is eligible only when:

```text
registered
AND configured
AND authorized
AND enabled
AND healthy
AND compatible with privacy
AND compatible with device/input
```

---

# 17. EVENTS — EXACT EVENT NAMES

```ts
export const EVENTS = {
  PLAYER_CREATED: 'player.created',
  PLAYER_UPDATED: 'player.updated',
  PLAYER_ROLE_GRANTED: 'player.role_granted',
  PLAYER_ROLE_REVOKED: 'player.role_revoked',
  POST_CREATED: 'social.post_created',
  COMMENT_CREATED: 'social.comment_created',
  REACTION_CREATED: 'social.reaction_created',
  CONVERSATION_CREATED: 'social.conversation_created',
  MESSAGE_CREATED: 'social.message_created',
  MESSAGE_TRANSLATION_READY: 'social.message_translation_ready',
  MEMORY_CREATED: 'memory.created',
  MEMORY_READY: 'memory.ready',
  MEMORY_SHARED: 'memory.shared',
  MEMORY_DELETED: 'memory.deleted',
  PLAY_SESSION_CREATED: 'play.session_created',
  PLAY_ACTION_ACCEPTED: 'play.action_accepted',
  PLAY_ACTION_REJECTED: 'play.action_rejected',
  PLAY_COMPLETED: 'play.completed',
  XP_GRANTED: 'progression.xp_granted',
  TITLE_GRANTED: 'progression.title_granted',
  WORLD_CHANGED: 'world.changed',
  WORLD_DISCOVERY: 'world.discovery',
  GAME_CREATED: 'game.created',
  GAME_VERSION_PUBLISHED: 'game.version_published',
  GAME_SESSION_CREATED: 'game.session_created',
  GAME_RESULT_VALIDATED: 'game.result_validated',
  COMMUNITY_CREATED: 'community.created',
  COMMUNITY_MEMBER_JOINED: 'community.member_joined',
  COMMUNITY_MEMBER_REMOVED: 'community.member_removed',
  EVENT_CREATED: 'event.created',
  EVENT_STARTED: 'event.started',
  EVENT_COMPLETED: 'event.completed',
  CAPABILITY_CHANGED: 'system.capability_changed',
  PROVIDER_CHANGED: 'system.provider_changed',
  PROVIDER_HEALTH_CHANGED: 'system.provider_health_changed',
  JOB_CREATED: 'system.job_created',
  JOB_COMPLETED: 'system.job_completed',
  JOB_FAILED: 'system.job_failed',
  REWARD_GRANTED: 'economy.reward_granted',
  LEDGER_ENTRY_CREATED: 'economy.ledger_entry_created',
  CREATOR_THRESHOLD_REACHED: 'economy.creator_threshold_reached',
  ADMIN_ACTION: 'security.admin_action',
} as const;
```

## Event envelope

```ts
export interface DomainEvent<TPayload> {
  id: string;
  type: string;
  aggregateType: string;
  aggregateId: string;
  actorId?: string;
  correlationId: string;
  causationId?: string;
  occurredAt: string;
  schemaVersion: number;
  payload: TPayload;
}
```

---

# 18. ENDPOINTS / ACTIONS

MORISE peut utiliser des Server Actions/RPC/functions plutôt que REST classique. Les noms logiques restent stables.

## Auth

```text
POST /auth/sign-up
POST /auth/sign-in
POST /auth/sign-out
GET  /auth/session
POST /auth/reset-password
```

## Player

```text
GET   /player/me
PATCH /player/me
GET   /player/me/preferences
PATCH /player/me/preferences
GET   /player/me/privacy
PATCH /player/me/privacy
POST  /player/me/devices
```

## Social

```text
GET   /feed
POST  /posts
GET   /posts/:id
POST  /posts/:id/comments
POST  /reactions
GET   /conversations
POST  /conversations
GET   /conversations/:id/messages
POST  /conversations/:id/messages
POST  /messages/:id/translate
POST  /messages/:id/read
```

## Play

```text
POST /play/sessions
GET  /play/sessions/:id
POST /play/sessions/:id/actions
POST /play/sessions/:id/finish
POST /play/sessions/:id/resume
```

## Discovery

```text
GET  /discovery
POST /discovery/feedback
```

## Creation

```text
POST /games/spec
POST /games/build
GET  /games/build/:jobId
POST /games/build/:jobId/cancel
POST /games/:id/publish
```

## Memory

```text
POST /memories/upload-intent
POST /memories/:id/complete
GET  /memories
GET  /memories/:id
PATCH /memories/:id
DELETE /memories/:id
POST /memories/:id/share
DELETE /memories/:id/share/:playerId
```

## Admin / OWNER

```text
GET   /admin/overview
GET   /admin/capabilities
PATCH /admin/capabilities/:id
GET   /admin/providers
PATCH /admin/providers/:id
GET   /admin/users
PATCH /admin/users/:id/role
GET   /admin/audit
GET   /admin/jobs
POST  /admin/jobs/:id/retry
POST  /admin/jobs/:id/cancel
```

Chaque endpoint sensible doit refaire l'autorisation côté serveur; masquer un bouton n'est jamais une protection.

---

# 19. ACTIONS SERVER / RPC

Actions préférées pour les mutations atomiques:

```text
create_player_profile
send_message
mark_message_read
grant_role
revoke_role
create_play_session
apply_play_action
finish_play_session
grant_xp
grant_reward
create_memory
complete_memory_upload
share_memory
set_capability_state
set_provider_state
create_async_job
claim_async_job
complete_async_job
fail_async_job
```

Les actions de rôle et de capacité doivent être OWNER-gated.

---

# 20. ADMIN / OWNER ROLE FLOW

```text
OWNER
  ↓ grant
ADMIN / MODERATOR
  ↓ community policy
community role
```

L'IA peut recommander une promotion, mais ne peut pas s'auto-attribuer ou attribuer silencieusement un rôle global.

### Grant role

Entrée:

```ts
interface GrantRoleInput {
  targetPlayerId: string;
  role: 'ADMIN' | 'MODERATOR';
  reason: string;
  idempotencyKey: string;
}
```

Règles:

```text
actor == OWNER
AND target active
AND role allowed
AND idempotency not previously consumed
→ update role + audit + event
```

---

# 21. MATRICE MODULE → FICHIER → SERVICE → TEST

Les chemins ci-dessous sont les chemins cibles. L'implémentation doit adapter les noms aux fichiers réellement présents dans le dépôt sans créer deux implémentations concurrentes.

| Module | Fichier cible | Service | Tests minimum |
|---|---|---|---|
| 1 Foundation | `src/core/bootstrap/appBoot.ts` | `AppBootService` | `tests/unit/core/appBoot.test.ts` |
| 1 Foundation | `src/system/capabilities/registry.ts` | `CapabilityRegistryService` | `tests/unit/system/capabilityRegistry.test.ts` |
| 1 Foundation | `src/system/dependencies/registry.ts` | `DependencyRegistryService` | `tests/unit/system/dependencyRegistry.test.ts` |
| 1 Foundation | `src/core/auth/session.ts` | `SessionService` | `tests/integration/auth/session.test.ts` |
| 2 Player | `src/modules/player/player.service.ts` | `PlayerService` | `tests/unit/player/player.service.test.ts` |
| 2 Player | `src/modules/player/privacy.service.ts` | `PrivacyService` | `tests/security/player/privacy.test.ts` |
| 2 Player | `src/modules/player/device.service.ts` | `DeviceCapabilityService` | `tests/unit/player/device.service.test.ts` |
| 3 Social | `src/modules/social/post.service.ts` | `PostService` | `tests/integration/social/posts.test.ts` |
| 3 Social | `src/modules/social/message.service.ts` | `MessageService` | `tests/security/social/messages-rsl.test.ts` |
| 3 Social | `src/i18n/translation.service.ts` | `TranslationService` | `tests/unit/i18n/translation.test.ts` |
| 4 World | `src/modules/world/world.service.ts` | `WorldService` | `tests/integration/world/state.test.ts` |
| 4 World | `src/modules/world/object.service.ts` | `LivingObjectService` | `tests/unit/world/living-object.test.ts` |
| 5 System | `src/system/orchestrator/orchestrator.ts` | `SystemOrchestrator` | `tests/unit/system/orchestrator.test.ts` |
| 5 System | `src/modules/progression/progression.service.ts` | `ProgressionService` | `tests/security/progression/xp.test.ts` |
| 6 Play | `src/modules/play/session.service.ts` | `PlaySessionService` | `tests/integration/play/session.test.ts` |
| 6 Play | `src/modules/play/action.service.ts` | `PlayActionService` | `tests/security/play/action-validation.test.ts` |
| 6 Play | `src/modules/play/result.service.ts` | `PlayResultService` | `tests/integration/play/result.test.ts` |
| 7 Discovery | `src/modules/discovery/discovery.service.ts` | `DiscoveryService` | `tests/unit/discovery/discovery.test.ts` |
| 7 Discovery | `src/modules/discovery/ranking.ts` | `DiscoveryRankingService` | `tests/unit/discovery/ranking.test.ts` |
| 8 Factory | `src/modules/game-factory/spec.service.ts` | `GameSpecService` | `tests/unit/game-factory/spec.test.ts` |
| 8 Factory | `src/modules/game-factory/build.service.ts` | `GameBuildService` | `tests/integration/game-factory/build.test.ts` |
| 8 Factory | `src/modules/game-factory/repair.service.ts` | `GameRepairService` | `tests/integration/game-factory/repair.test.ts` |
| 9 Engine | `src/modules/game-engine/runtime.ts` | `GameRuntime` | `tests/unit/game-engine/runtime.test.ts` |
| 9 Engine | `src/modules/game-engine/replay.ts` | `ReplayService` | `tests/unit/game-engine/replay.test.ts` |
| 10 Social Gaming | `src/modules/social-gaming/session.service.ts` | `SocialGameSessionService` | `tests/integration/social-gaming/session.test.ts` |
| 10 Social Gaming | `src/modules/social-gaming/result.service.ts` | `SocialGameResultService` | `tests/security/social-gaming/result.test.ts` |
| 11 Communities | `src/modules/communities/community.service.ts` | `CommunityService` | `tests/integration/communities/community.test.ts` |
| 11 Communities | `src/modules/communities/moderation.service.ts` | `ModerationService` | `tests/security/communities/moderation.test.ts` |
| 12 Events | `src/modules/events/event.service.ts` | `EventService` | `tests/integration/events/event.test.ts` |
| 12 Events | `src/modules/events/scheduler.ts` | `EventScheduler` | `tests/unit/events/scheduler.test.ts` |
| 13 Adaptive | `src/modules/adaptive-world/evolution.service.ts` | `EvolutionService` | `tests/security/adaptive/evolution.test.ts` |
| 13 Adaptive | `src/modules/adaptive-world/agent.service.ts` | `WorldAgentService` | `tests/security/adaptive/agent-permissions.test.ts` |
| 14 Economy | `src/modules/economy/reward.service.ts` | `RewardService` | `tests/security/economy/reward-idempotency.test.ts` |
| 14 Economy | `src/modules/economy/ledger.service.ts` | `EconomyLedgerService` | `tests/integration/economy/ledger.test.ts` |
| 14 Economy | `src/modules/economy/creator-threshold.service.ts` | `CreatorThresholdService` | `tests/integration/economy/threshold.test.ts` |
| 15 Meta | `src/modules/meta/learning.service.ts` | `LearningService` | `tests/unit/meta/learning.test.ts` |
| 15 Meta | `src/modules/meta/benchmark.service.ts` | `BenchmarkService` | `tests/integration/meta/benchmark.test.ts` |
| 15 Meta | `src/modules/meta/evolution.service.ts` | `MetaEvolutionService` | `tests/security/meta/evolution-gate.test.ts` |
| Cross-cutting | `src/media/provider-router.ts` | `ProviderRouter` | `tests/unit/providers/router.test.ts` |
| Cross-cutting | `src/memory-vault/memory.service.ts` | `MemoryService` | `tests/security/memory/privacy.test.ts` |
| Cross-cutting | `src/admin/admin.service.ts` | `AdminService` | `tests/security/admin/roles.test.ts` |

---

# 22. PROVIDER MATRIX

| Capability | Primary path | Secondary path | Final fallback |
|---|---|---|---|
| UI text | MORISE deterministic | Browser/local model | English/static copy |
| Translation | Browser/local | configured server/cloud | original source text |
| Image | Browser/light generation | Local PC | unavailable/placeholder state |
| Music | Browser/audio composition | Local PC | unavailable |
| Video | Browser composition | Local PC/server | unavailable |
| Speech-to-text | Browser/local | configured server | disabled |
| Game generation | deterministic templates | local PC | manual/private draft |
| Advanced AI | local | optional cloud/API | deterministic rules |

No row makes Cloudflare AI mandatory.

---

# 23. LOCAL COMPUTER CONTRACT

The local computer is an optional execution node.

```ts
export interface LocalExecutionNode {
  id: string;
  version: string;
  capabilities: string[];
  online: boolean;
  execute<TIn, TOut>(request: {
    capabilityId: string;
    input: TIn;
    requestId: string;
  }): Promise<TOut>;
  cancel(requestId: string): Promise<void>;
  health(): Promise<ProviderHealth>;
}
```

The browser talks to the MORISE control plane. The local node must not receive arbitrary database credentials. Authentication is scoped to execution requests.

---

# 24. MEDIA / MEMORY RIGHTS CONTRACT

```ts
export interface MediaRights {
  store: boolean;
  analyze: boolean;
  share: boolean;
  train: boolean;
}
```

Default for a private Memory:

```text
store=true
analyze=false
share=false
train=false
```

No UI shortcut may silently set `train=true`.

---

# 25. I18N CONTRACT

```ts
export const SUPPORTED_LOCALES: Locale[] = [
  'fr','en','hi','es','de','it','pt','ar','ja','ko',
  'ru','tr','id','th','vi','pl','nl','ro','bn','ur'
];

export const DEFAULT_LOCALE: Locale = 'en';

export function resolveLocale(
  explicit?: Locale,
  saved?: Locale,
  device?: string
): Locale {
  const candidates = [explicit, saved, device];
  for (const value of candidates) {
    if (value && SUPPORTED_LOCALES.includes(value as Locale)) return value as Locale;
  }
  return DEFAULT_LOCALE;
}
```

---

# 26. CAPABILITY STATE MACHINE

```text
PLANNED
  ↓
IMPLEMENTED
  ↓
PENDING_DEPENDENCY ──→ AVAILABLE
  ↓                         ↓
DISABLED ←──────────── CONFIGURED
                           ↓
                       AUTHORIZED
                           ↓
                         ENABLED
                           ↓
                       EXECUTING
                           ↓
                       VALIDATING
                           ↓
                 COMPLETED / DEGRADED / FAILED
```

OWNER can deliberately place an optional capability in `DISABLED` or `MAINTENANCE`.

---

# 27. ERROR CONTRACT

```ts
export type ErrorCode =
  | 'AUTH_REQUIRED'
  | 'FORBIDDEN'
  | 'VALIDATION_FAILED'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'DEPENDENCY_UNAVAILABLE'
  | 'PROVIDER_UNAVAILABLE'
  | 'CAPABILITY_DISABLED'
  | 'CAPABILITY_MAINTENANCE'
  | 'STORAGE_FAILED'
  | 'QUEUE_FAILED'
  | 'AI_VALIDATION_FAILED'
  | 'INTERNAL_ERROR';

export interface AppError {
  code: ErrorCode;
  message: string;
  retryable: boolean;
  correlationId: string;
}
```

---

# 28. IDEMPOTENCY CONTRACT

All of these require idempotency:

- send message;
- create play session when retried;
- apply reward;
- grant XP from one source event;
- upload completion;
- share memory;
- grant role;
- provider job creation;
- event participation;
- economy ledger mutation.

```ts
export interface IdempotencyContext {
  key: string;
  actorId: string;
  operation: string;
  requestHash: string;
}
```

A reused key with a different request hash must produce `CONFLICT`.

---

# 29. SECURITY TEST MATRIX

| Surface | Required negative test |
|---|---|
| Profile | user reads another private profile fields |
| Messages | non-member reads conversation |
| Memory | non-owner accesses private media |
| Admin | PLAYER grants ADMIN |
| Moderator | MODERATOR grants global ADMIN |
| XP | client submits arbitrary XP |
| Rewards | same source event pays twice |
| Play | action uses stale state version |
| Game result | client submits forged final score |
| Provider | disabled provider executed |
| Local node | arbitrary DB credential requested |
| Translation | sensitive text sent to unauthorized provider |
| Events | duplicate scheduler execution |
| Economy | duplicate ledger entry |
| Meta AI | experiment directly changes production |

---

# 30. DEFINITION OF DONE — TECHNICAL

Un module n'est techniquement terminé que lorsque:

```text
SQL / schema
+ RLS
+ TypeScript contract
+ service implementation
+ event definitions
+ action/endpoint contract
+ provider adapter where applicable
+ fallback
+ unit tests
+ integration tests
+ security tests
+ E2E
+ browser verification
+ mobile verification
+ observability
+ documentation
```

est vérifié pour son périmètre.

---

# 31. CURRENT IMPLEMENTATION GATE

**MODULE 6 — PLAY / FINAL QA** reste le module courant.

Les contrats Modules 7→15 sont documentés pour empêcher les futures IA de réinventer l'architecture, mais ils ne doivent pas être activés prématurément.

Avant de commencer le Module 7:

1. vérifier les migrations réellement présentes;
2. aligner les noms de tables sans doublons;
3. vérifier RLS dans une base de staging;
4. exécuter les tests Module 6;
5. vérifier le parcours navigateur complet;
6. vérifier le parcours mobile;
7. vérifier les états loading/error/empty;
8. vérifier les dépendances optionnelles désactivées;
9. documenter les écarts entre ce contrat cible et le code réel.

**FIN DU CONTRAT D'IMPLÉMENTATION V1.**
