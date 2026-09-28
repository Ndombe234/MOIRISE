# MORISE — IMPLEMENTATION CONTRACTS

**Version:** 1.0.0 — 2026-09-29
**Functional source:** `docs/MORISE_MASTER_PLAN_V3.md`
**Technical source:** `docs/MORISE_TECHNICAL_MASTER_ARCHITECTURE.md`
**Current gate:** MODULE 6 — PLAY / FINAL QA

> This is an implementation contract, not permission to skip Module 6. SQL is a target schema: before applying migrations, inspect the real repository/Supabase schema and reconcile existing tables. Never destructively replace production data.

# 1. DATABASE RULES

PostgreSQL/Supabase. UUID PKs use `gen_random_uuid()`. All instants use `timestamptz`. `jsonb` is reserved for extensible metadata, provider payloads and state snapshots; critical business fields stay typed. User records reference `auth.users(id)`. No provider secret/API key is stored in normal tables.

```sql
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
```

# 2. FOUNDATION / OWNER / RBAC — EXACT TARGET SQL

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  display_name text,
  avatar_url text,
  bio text,
  locale text not null default 'en',
  timezone text not null default 'UTC',
  xp bigint not null default 0 check (xp >= 0),
  level integer not null default 1 check (level >= 1),
  status text not null default 'active' check (status in ('active','restricted','suspended','deleted_pending','deleted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index profiles_locale_idx on public.profiles(locale);
create index profiles_status_idx on public.profiles(status);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code in ('owner','admin','moderator','player')),
  label text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.player_roles (
  player_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  granted_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key(player_id, role_id)
);
create index player_roles_role_idx on public.player_roles(role_id);

create table if not exists public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  primary key(role_id, permission_id)
);
create index role_permissions_permission_idx on public.role_permissions(permission_id);
```

**OWNER rule:** the account already created by the user is the initial OWNER/Superadmin. The actual `auth.users.id` must be resolved during bootstrap; never invent or hard-code an email. OWNER can appoint/revoke administrators and moderators according to policy. Client input can never self-assign a role.

# 3. PLAYER — EXACT TARGET SQL

```sql
create table if not exists public.player_preferences (
  player_id uuid primary key references public.profiles(id) on delete cascade,
  locale text not null default 'en',
  theme text not null default 'dark',
  reduced_motion boolean not null default false,
  autoplay_media boolean not null default false,
  notifications_enabled boolean not null default true,
  system_hud_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.player_devices (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.profiles(id) on delete cascade,
  device_class text not null,
  ram_class text,
  webgpu boolean not null default false,
  wasm boolean not null default true,
  webcodecs boolean not null default false,
  browser_family text,
  capabilities jsonb not null default '{}'::jsonb,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index player_devices_player_idx on public.player_devices(player_id);
create index player_devices_last_seen_idx on public.player_devices(last_seen_at desc);

create table if not exists public.privacy_preferences (
  player_id uuid primary key references public.profiles(id) on delete cascade,
  profile_visibility text not null default 'public',
  allow_ai_analysis boolean not null default false,
  allow_memory_analysis boolean not null default false,
  allow_personalization boolean not null default true,
  allow_analytics boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

RLS: owner reads/updates own preferences/device/privacy rows. Public profile reads are limited to active public data.

# 4. SOCIAL / PRIVATE MESSAGING — EXACT TARGET SQL

```sql
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  visibility text not null default 'public' check (visibility in ('public','followers','private','community')),
  community_id uuid,
  status text not null default 'published' check (status in ('draft','published','hidden','deleted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index posts_author_created_idx on public.posts(author_id, created_at desc);
create index posts_visibility_created_idx on public.posts(visibility, created_at desc);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('private','group')),
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  player_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','member')),
  joined_at timestamptz not null default now(),
  left_at timestamptz,
  primary key(conversation_id, player_id)
);
create index conversation_members_player_idx on public.conversation_members(player_id);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete restrict,
  body text not null,
  source_locale text not null default 'en',
  status text not null default 'sent' check (status in ('sent','delivered','read','revoked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index messages_conversation_created_idx on public.messages(conversation_id, created_at desc);
create index messages_sender_created_idx on public.messages(sender_id, created_at desc);

create table if not exists public.message_translations (
  message_id uuid not null references public.messages(id) on delete cascade,
  target_locale text not null,
  translated_body text not null,
  provider_id text,
  engine_version text,
  validation_state text not null default 'pending' check (validation_state in ('pending','valid','invalid')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key(message_id,target_locale)
);
```

Private-message RLS: only active conversation members may read messages or derived translations. Sender/member checks are server-side plus RLS. Translation failure never blocks the original message.

# 5. WORLD / PROGRESSION — EXACT TARGET SQL

```sql
create table if not exists public.worlds (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  slug text not null unique,
  name text not null,
  visibility text not null default 'private' check (visibility in ('private','community','public')),
  version integer not null default 1 check(version >= 1),
  state jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index worlds_owner_idx on public.worlds(owner_id);
create index worlds_visibility_idx on public.worlds(visibility);

create table if not exists public.world_events (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references public.worlds(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  state_before jsonb,
  state_after jsonb,
  world_version integer not null,
  created_at timestamptz not null default now()
);
create index world_events_world_created_idx on public.world_events(world_id,created_at desc);
create index world_events_actor_created_idx on public.world_events(actor_id,created_at desc);

create table if not exists public.xp_events (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.profiles(id) on delete cascade,
  source_event_id uuid,
  amount bigint not null,
  reason text not null,
  rule_version text not null,
  idempotency_key text not null unique,
  created_at timestamptz not null default now()
);
create index xp_events_player_created_idx on public.xp_events(player_id,created_at desc);

create table if not exists public.titles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name_key text not null,
  rule_version text not null,
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.player_titles (
  player_id uuid not null references public.profiles(id) on delete cascade,
  title_id uuid not null references public.titles(id) on delete cascade,
  source_event_id uuid,
  earned_at timestamptz not null default now(),
  primary key(player_id,title_id)
);
```

XP/rewards are server-authoritative. Client cannot submit an arbitrary XP amount as a trusted mutation.

# 6. PLAY / GAME — EXACT TARGET SQL

```sql
create table if not exists public.game_experiences (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.profiles(id) on delete set null,
  slug text not null unique,
  title text not null,
  description text,
  mode text not null default 'solo',
  visibility text not null default 'private',
  status text not null default 'draft',
  current_version integer not null default 1,
  required_capabilities jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index game_experiences_creator_idx on public.game_experiences(creator_id);
create index game_experiences_status_idx on public.game_experiences(status);

create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.game_experiences(id) on delete restrict,
  player_id uuid not null references public.profiles(id) on delete cascade,
  experience_version integer not null,
  engine_version text not null,
  state_version bigint not null default 0,
  state jsonb not null default '{}'::jsonb,
  status text not null default 'active' check(status in ('active','paused','completed','abandoned','failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index game_sessions_player_created_idx on public.game_sessions(player_id,created_at desc);
create index game_sessions_experience_idx on public.game_sessions(experience_id,created_at desc);

create table if not exists public.game_actions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.game_sessions(id) on delete cascade,
  player_id uuid not null references public.profiles(id) on delete cascade,
  sequence_no bigint not null,
  idempotency_key text not null,
  action_type text not null,
  input jsonb not null default '{}'::jsonb,
  expected_state_version bigint not null,
  accepted boolean not null,
  rejection_code text,
  created_at timestamptz not null default now(),
  unique(session_id,sequence_no),
  unique(session_id,idempotency_key)
);
create index game_actions_session_created_idx on public.game_actions(session_id,created_at);
```

# 7. COMMUNITIES / EVENTS — EXACT TARGET SQL

```sql
create table if not exists public.communities (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete restrict,
  slug text not null unique,
  name text not null,
  description text,
  visibility text not null default 'public',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index communities_owner_idx on public.communities(owner_id);

create table if not exists public.community_members (
  community_id uuid not null references public.communities(id) on delete cascade,
  player_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member',
  status text not null default 'active',
  joined_at timestamptz not null default now(),
  primary key(community_id,player_id)
);
create index community_members_player_idx on public.community_members(player_id);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.profiles(id) on delete set null,
  community_id uuid references public.communities(id) on delete set null,
  code text not null unique,
  title text not null,
  description text,
  status text not null default 'draft',
  start_at timestamptz,
  end_at timestamptz,
  rule_version text not null,
  reward_rule_version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check(end_at is null or start_at is null or end_at > start_at)
);
create index events_status_start_idx on public.events(status,start_at);
```

# 8. MEMORY VAULT — PHOTOS/VIDEOS AS REAL PRIVATE MEMORIES

```sql
create table if not exists public.memory_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  media_type text not null check(media_type in ('photo','video','audio','text','creation')),
  storage_bucket text not null,
  storage_path text not null,
  title text,
  description text,
  captured_at timestamptz,
  visibility text not null default 'private',
  checksum text,
  size_bytes bigint,
  mime_type text,
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'uploading',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_id,storage_bucket,storage_path)
);
create index memory_items_owner_created_idx on public.memory_items(owner_id,created_at desc);
create index memory_items_owner_type_idx on public.memory_items(owner_id,media_type);
create index memory_items_captured_idx on public.memory_items(captured_at desc);

create table if not exists public.memory_collections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text,
  visibility text not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index memory_collections_owner_idx on public.memory_collections(owner_id);

create table if not exists public.memory_collection_items (
  collection_id uuid not null references public.memory_collections(id) on delete cascade,
  memory_item_id uuid not null references public.memory_items(id) on delete cascade,
  position integer not null default 0,
  added_at timestamptz not null default now(),
  primary key(collection_id,memory_item_id)
);

create table if not exists public.memory_shares (
  id uuid primary key default gen_random_uuid(),
  memory_item_id uuid not null references public.memory_items(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  target_player_id uuid references public.profiles(id) on delete cascade,
  target_community_id uuid references public.communities(id) on delete cascade,
  permission text not null check(permission in ('view','download')),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  check((target_player_id is not null) <> (target_community_id is not null))
);
create index memory_shares_item_idx on public.memory_shares(memory_item_id);
create index memory_shares_target_player_idx on public.memory_shares(target_player_id);
```

**Invariant:** STORE ≠ ANALYZE ≠ SHARE ≠ TRAIN. Private media is never silently sent to an external model.

# 9. CAPABILITIES / PROVIDERS / DEPENDENCIES / JOBS

```sql
create table if not exists public.capability_registry (
  id text primary key,
  version text not null,
  status text not null,
  privacy_class text not null default 'public',
  risk_class text not null default 'low',
  required_dependencies jsonb not null default '[]'::jsonb,
  optional_dependencies jsonb not null default '[]'::jsonb,
  fallback_capabilities jsonb not null default '[]'::jsonb,
  owner_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.dependency_registry (
  id text primary key,
  kind text not null,
  status text not null,
  required boolean not null default false,
  configuration_state text not null default 'missing',
  health_state text not null default 'unknown',
  metadata jsonb not null default '{}'::jsonb,
  checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index dependency_status_idx on public.dependency_registry(status);
create index dependency_health_idx on public.dependency_registry(health_state);

create table if not exists public.provider_registry (
  id text primary key,
  capability_id text not null references public.capability_registry(id) on delete cascade,
  kind text not null,
  enabled boolean not null default false,
  priority integer not null default 100,
  privacy_class text not null default 'public',
  configuration_state text not null default 'missing',
  health_state text not null default 'unknown',
  version text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index provider_registry_capability_idx on public.provider_registry(capability_id,enabled,priority);

create table if not exists public.async_jobs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  capability_id text references public.capability_registry(id) on delete set null,
  provider_id text references public.provider_registry(id) on delete set null,
  status text not null default 'requested',
  idempotency_key text not null unique,
  input_reference jsonb not null default '{}'::jsonb,
  output_reference jsonb,
  error_code text,
  attempts integer not null default 0 check(attempts >= 0),
  created_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);
create index async_jobs_status_created_idx on public.async_jobs(status,created_at);
create index async_jobs_capability_status_idx on public.async_jobs(capability_id,status);
```

# 10. ECONOMY / AUDIT

```sql
create table if not exists public.reward_definitions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  reward_type text not null,
  rule_version text not null,
  metadata jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.economy_ledger (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.profiles(id) on delete cascade,
  source_event_id uuid,
  asset_type text not null,
  amount numeric(30,10) not null,
  direction text not null check(direction in ('credit','debit')),
  rule_version text not null,
  idempotency_key text not null unique,
  status text not null default 'posted',
  created_at timestamptz not null default now()
);
create index economy_ledger_player_created_idx on public.economy_ledger(player_id,created_at desc);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id text,
  result text not null,
  correlation_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_events_actor_created_idx on public.audit_events(actor_id,created_at desc);
create index audit_events_resource_idx on public.audit_events(resource_type,resource_id,created_at desc);
```

# 11. RLS CONTRACT

```sql
create or replace function public.is_owner(uid uuid default auth.uid())
returns boolean language sql stable security definer set search_path=public
as $$
select exists(select 1 from public.player_roles pr join public.roles r on r.id=pr.role_id where pr.player_id=uid and r.code='owner');
$$;

create or replace function public.is_admin_or_owner(uid uuid default auth.uid())
returns boolean language sql stable security definer set search_path=public
as $$
select exists(select 1 from public.player_roles pr join public.roles r on r.id=pr.role_id where pr.player_id=uid and r.code in ('owner','admin'));
$$;
```

RLS rules:

```text
profiles: public active read; self update; server-controlled sensitive fields
player_preferences: owner only
player_devices: owner only
privacy_preferences: owner only
posts: public only when visibility permits; author controls own mutation
conversations: active member only
messages: active member only
message_translations: same visibility as parent message
worlds: owner/authorized public visibility
world_events: owner/authorized world visibility
xp_events: self read; server write
player_titles: self read; server grant
memory_items: owner OR explicit memory_share
memory_collections: owner
memory_shares: owner; recipient only when share permits
capability/dependency/provider registry: admin/owner read; owner/admin write by permission
async_jobs: owner of job or authorized admin
reward/economy ledger: player read; server write
admin/audit: owner/admin according to exact permission; append-only server path
```

Never trust a client-supplied role field. Sensitive role/capability changes are server-authorized and audited.

# 12. TYPESCRIPT CORE CONTRACTS

```ts
export type LocaleCode='fr'|'en'|'hi'|'es'|'de'|'it'|'pt'|'ar'|'ja'|'ko'|'ru'|'tr'|'id'|'th'|'vi'|'pl'|'nl'|'ro'|'bn'|'ur';
export type CapabilityStatus='planned'|'pending_dependency'|'available'|'configured'|'authorized'|'enabled'|'executing'|'degraded'|'maintenance'|'disabled'|'unavailable';
export type JobStatus='requested'|'queued'|'running'|'validating'|'completed'|'failed'|'canceled'|'unavailable';

export interface CapabilityDefinition {
  id:string; version:string; status:CapabilityStatus;
  privacyClass:'public'|'private'|'sensitive';
  riskClass:'low'|'medium'|'high';
  requiredDependencies:string[]; optionalDependencies:string[];
  providerIds:string[]; fallbackCapabilityIds:string[];
}
export interface CapabilityRequest<T>{
  requestId:string; correlationId:string; idempotencyKey?:string;
  capabilityId:string; actorId:string; input:T; locale:LocaleCode;
  privacyClass:'public'|'private'|'sensitive';
}
export interface CapabilityResult<T>{
  requestId:string; status:'success'|'pending'|'degraded'|'unavailable'|'error';
  output?:T; providerId?:string; fallbackUsed?:string; eventId?:string;
  errorCode?:string; retryable?:boolean;
}
export interface ProviderHealth { state:'healthy'|'degraded'|'offline'|'unknown'; checkedAt:string; latencyMs?:number; reason?:string; }
export interface ProviderContext { providerId:string; capabilityId:string; privacyClass:string; signal?:AbortSignal; }
export interface ProviderAdapter<I,O>{
  readonly id:string; readonly capabilityId:string;
  health():Promise<ProviderHealth>;
  canHandle(input:I,context:ProviderContext):Promise<boolean>;
  execute(input:I,context:ProviderContext):Promise<O>;
  cancel?(requestId:string):Promise<void>;
}
export interface SystemIntent { id:string; actorId:string; text:string; locale:LocaleCode; context:Record<string,unknown>; createdAt:string; }
export interface SystemPlanStep { capabilityId:string; providerPreference?:string[]; fallbackCapabilityIds:string[]; }
export interface SystemPlan { intentId:string; steps:SystemPlanStep[]; requiresApproval:boolean; }
export interface DomainEvent<T=unknown>{ id:string; type:string; version:number; aggregateType:string; aggregateId:string; actorId?:string; correlationId:string; causationId?:string; payload:T; occurredAt:string; }
```

# 13. EXACT SERVICE INTERFACES

```ts
export interface AuthService { getSession():Promise<SessionContext|null>; signIn(input:SignInInput):Promise<SessionContext>; signOut():Promise<void>; refresh():Promise<SessionContext|null>; }
export interface PlayerService { getById(id:string):Promise<PlayerProfile>; update(id:string,input:UpdatePlayerInput):Promise<PlayerProfile>; }
export interface MessagingService { createConversation(input:CreateConversationInput):Promise<Conversation>; sendMessage(input:SendMessageInput):Promise<Message>; listMessages(conversationId:string,cursor?:string):Promise<MessagePage>; markRead(conversationId:string,messageId:string):Promise<void>; }
export interface TranslationService { translate(input:TranslationInput):Promise<TranslationResult>; }
export interface PlayService { createSession(input:CreatePlaySessionInput):Promise<PlaySession>; acceptAction(input:PlayActionInput):Promise<PlayActionResult>; finishSession(sessionId:string):Promise<PlayResult>; }
export interface DiscoveryService { discover(input:DiscoveryInput):Promise<DiscoveryResult>; }
export interface GameFactoryService { createSpec(input:CreateGameSpecInput):Promise<GameSpec>; build(input:GameBuildInput):Promise<AsyncJobReference>; validate(gameId:string,version:number):Promise<ValidationReport>; }
export interface MemoryVaultService { createUpload(input:MemoryUploadInput):Promise<UploadSession>; finalizeUpload(input:FinalizeMemoryUploadInput):Promise<MemoryItem>; share(input:ShareMemoryInput):Promise<MemoryShare>; delete(ownerId:string,memoryId:string):Promise<void>; }
export interface AdminService { listCapabilities():Promise<CapabilityDefinition[]>; setCapabilityState(input:SetCapabilityStateInput):Promise<CapabilityDefinition>; assignRole(input:AssignRoleInput):Promise<void>; revokeRole(input:RevokeRoleInput):Promise<void>; listAuditEvents(input?:AuditQuery):Promise<AuditPage>; }
```

# 14. EXACT EVENT CATALOG

```text
auth.session.created
auth.session.expired
player.created
player.updated
player.role.granted
player.role.revoked
player.preferences.updated
player.device.updated
social.post.created
social.post.updated
social.post.deleted
social.message.sent
social.message.read
social.message.revoked
social.translation.requested
social.translation.completed
social.translation.failed
world.created
world.state.changed
world.object.changed
world.discovery.unlocked
world.agent.action.proposed
world.agent.action.validated
system.intent.created
system.plan.created
system.capability.selected
system.capability.fallback
play.session.created
play.action.accepted
play.action.rejected
play.session.completed
play.result.validated
game.discovery.requested
game.experience.selected
game.build.requested
game.build.completed
game.build.failed
game.validation.completed
game.session.created
game.action.accepted
game.result.created
community.created
community.member.joined
community.member.left
community.role.changed
community.moderation.action
community.post.created
event.created
event.started
event.stage.started
event.participation.recorded
event.completed
adaptive.proposal.created
adaptive.proposal.accepted
adaptive.proposal.rejected
adaptive.world.changed
reward.issued
reward.rejected
ledger.credit.posted
ledger.debit.posted
creator.threshold.reached
ad.impression.recorded
memory.upload.requested
memory.upload.completed
memory.shared
memory.deleted
media.job.created
media.job.completed
media.job.failed
provider.health.changed
capability.state.changed
ai.learning.candidate.created
ai.experiment.started
ai.experiment.completed
ai.experiment.rejected
admin.configuration.changed
audit.event.created
```

# 15. EVENT PAYLOADS

```ts
export interface PlayActionAcceptedPayload { sessionId:string; actionId:string; sequenceNo:number; actionType:string; stateVersionBefore:number; stateVersionAfter:number; }
export interface MessageSentPayload { messageId:string; conversationId:string; senderId:string; sourceLocale:LocaleCode; hasAttachment:boolean; }
export interface MemorySharedPayload { memoryId:string; ownerId:string; targetType:'player'|'community'; permission:'view'|'download'; expiresAt?:string; }
export interface CapabilityStateChangedPayload { capabilityId:string; previous:CapabilityStatus; next:CapabilityStatus; reason:string; changedBy:string; }
```

# 16. ENDPOINT / SERVER-ACTION CONTRACT

These are logical actions; if the current stack uses Supabase RPC, Server Actions or another transport, preserve the contract while adapting transport.

```text
GET  /api/session
POST /api/auth/sign-in
POST /api/auth/sign-out
POST /api/auth/refresh
GET  /api/player/me
PATCH /api/player/me
GET/PATCH /api/player/preferences
GET/POST /api/player/devices
GET/POST /api/feed
POST/PATCH/DELETE /api/posts/:id
GET/POST /api/conversations
GET/POST /api/conversations/:id/messages
POST /api/conversations/:id/read
POST /api/translate
POST /api/play/sessions
POST /api/play/sessions/:id/actions
POST /api/play/sessions/:id/finish
POST /api/discovery
POST /api/games/spec
POST /api/games/build
POST /api/games/:id/validate
GET /api/games/:id
POST /api/memory/upload-session
POST /api/memory/finalize
GET /api/memory
POST /api/memory/:id/share
DELETE /api/memory/:id
GET /api/admin/capabilities
PATCH /api/admin/capabilities/:id
GET/PATCH /api/admin/providers/:id
GET /api/admin/dependencies
GET /api/admin/audit
POST /api/admin/roles/grant
POST /api/admin/roles/revoke
```

Every mutating sensitive action: auth → permission → validation → idempotency → transaction → event → audit.

# 17. PROVIDER CONTRACTS

```ts
export interface TextProvider extends ProviderAdapter<TextGenerationInput,TextGenerationOutput> { stream?(input:TextGenerationInput,context:ProviderContext):AsyncIterable<string>; }
export interface TranslationProvider extends ProviderAdapter<TranslationInput,TranslationResult> {}
export interface ImageProvider extends ProviderAdapter<ImageGenerationInput,ImageGenerationOutput> {}
export interface MusicProvider extends ProviderAdapter<MusicGenerationInput,MusicGenerationOutput> {}
export interface VideoProvider extends ProviderAdapter<VideoGenerationInput,VideoGenerationOutput> {}
export interface BrowserAIProvider { id:string; supports(capabilityId:string):Promise<boolean>; execute<I,O>(request:CapabilityRequest<I>):Promise<O>; }
export interface LocalExecutionProvider { id:string; handshake():Promise<LocalNodeInfo>; health():Promise<ProviderHealth>; execute(request:LocalExecutionRequest):Promise<LocalExecutionResult>; cancel(jobId:string):Promise<void>; }
```

Provider lifecycle:

```text
REQUESTED → POLICY_CHECK → CAPABILITY_CHECK → PROVIDER_SELECTION → QUEUED → EXECUTING → VALIDATING → READY
                                                                                              ↘ FAILED/UNAVAILABLE
```

Provider order is policy-driven: deterministic → browser/on-device → local PC → self-hosted → approved cloud → approved API → unavailable. No provider is hard-coded into a feature.

Cloudflare AI is an optional adapter. The site must work with it disabled.

# 18. ADMIN CONTROL INTERFACES

```ts
export interface AdminCapabilityController {
  getState(capabilityId:string):Promise<CapabilityDefinition>;
  enable(capabilityId:string,reason:string):Promise<void>;
  disable(capabilityId:string,reason:string):Promise<void>;
  setMaintenance(capabilityId:string,reason:string):Promise<void>;
}
export interface RoleController {
  grant(playerId:string,role:'admin'|'moderator',reason:string):Promise<void>;
  revoke(playerId:string,role:'admin'|'moderator',reason:string):Promise<void>;
}
```

The OWNER/Superadmin can control administrators, moderators, capabilities, providers, dependencies, media, translation, Memory Vault policy, communities, events, economy, ads, security and audit. The AI coordinates; it does not override authorization.

# 19. I18N CONTRACT

Exactly 20 UI languages are planned:

`fr en hi es de it pt ar ja ko ru tr id th vi pl nl ro bn ur`

Resolution:

```text
explicit player locale → saved locale → browser locale → supported locale → en
```

English is the default display fallback. User-generated source text remains immutable; translations are derived/cacheable artifacts.

# 20. MEMORY + MEDIA CONTRACT

Photos/videos uploaded by a PLAYER become persistent private Memory Vault items when storage succeeds. The lifecycle is:

```text
SELECT → VALIDATE → UPLOAD → METADATA → INDEX → READY → optional ORGANIZE → optional SHARE → DELETE
```

Image/music/video are capabilities. If infrastructure is missing, Superadmin may set the capability to `disabled`, `maintenance` or `pending_dependency`. This must not break the rest of the site.

# 21. IDEMPOTENCY

Required for: message send, play action, reward issue, ledger post, creator threshold alert, media job creation, game build request, event finalization, role mutation and memory sharing.

Repeated key = same logical operation, not a second side effect.

# 22. FILE → SERVICE → TEST MATRIX

| Module | Target file | Service | Required test |
|---|---|---|---|
| 1 | `src/core/auth/AuthService.ts` | AuthService | auth lifecycle/RLS |
| 1 | `src/core/bootstrap/bootstrap.ts` | BootstrapService | cold boot/retry |
| 1 | `src/core/capabilities/CapabilityRegistry.ts` | CapabilityRegistry | state transitions |
| 1 | `src/core/dependencies/DependencyRegistry.ts` | DependencyRegistry | missing dependency |
| 2 | `src/modules/player/PlayerService.ts` | PlayerService | ownership/privacy |
| 2 | `src/modules/player/DeviceCapabilityService.ts` | DeviceService | 2GB/PC fallback |
| 3 | `src/modules/social/MessagingService.ts` | MessagingService | private chat |
| 3 | `src/modules/social/TranslationService.ts` | TranslationService | 20 locales/fallback |
| 4 | `src/modules/world/WorldService.ts` | WorldService | state/replay |
| 4 | `src/modules/world/WorldEventService.ts` | WorldEventService | provenance |
| 5 | `src/system/SystemOrchestrator.ts` | SystemOrchestrator | provider routing |
| 5 | `src/modules/progression/ProgressionService.ts` | ProgressionService | XP idempotence |
| 6 | `src/modules/play/PlayService.ts` | PlayService | action validation |
| 6 | `src/modules/play/PlaySessionRepository.ts` | PlaySessionRepository | reconnect |
| 7 | `src/modules/discovery/DiscoveryService.ts` | DiscoveryService | cold start/fallback |
| 8 | `src/modules/game-factory/GameFactoryService.ts` | GameFactoryService | build/repair |
| 8 | `src/modules/game-factory/BuildValidator.ts` | BuildValidator | artifact validation |
| 9 | `src/modules/game-engine/Engine.ts` | SharedGameEngine | deterministic replay |
| 9 | `src/modules/game-engine/StateStore.ts` | StateStore | snapshot/restore |
| 10 | `src/modules/social-gaming/SocialGameService.ts` | SocialGameService | concurrency/tamper |
| 11 | `src/modules/communities/CommunityService.ts` | CommunityService | RBAC |
| 11 | `src/modules/communities/ModerationService.ts` | ModerationService | audit |
| 12 | `src/modules/events/EventService.ts` | EventService | lifecycle/timezone |
| 13 | `src/modules/adaptive-world/EvolutionService.ts` | EvolutionService | rollback |
| 13 | `src/modules/adaptive-world/WorldAgentService.ts` | WorldAgentService | permission boundary |
| 14 | `src/modules/economy/RewardService.ts` | RewardService | duplicate rewards |
| 14 | `src/modules/economy/LedgerService.ts` | LedgerService | ledger integrity |
| 14 | `src/modules/economy/CreatorThresholdService.ts` | CreatorThresholdService | threshold |
| 15 | `src/modules/meta/EvaluationService.ts` | EvaluationService | benchmark |
| 15 | `src/modules/meta/ExperimentService.ts` | ExperimentService | isolation/rollback |
| 15 | `src/modules/meta/LearningCandidateService.ts` | LearningCandidateService | candidate validation |
| Cross | `src/media/ProviderRouter.ts` | ProviderRouter | provider fallback |
| Cross | `src/memory/MemoryVaultService.ts` | MemoryVaultService | private media |
| Cross | `src/i18n/LocaleResolver.ts` | LocaleResolver | English fallback |
| Cross | `src/admin/AdminService.ts` | AdminService | OWNER/RBAC |

# 23. TEST FILE MATRIX

```text
tests/unit/core/auth.test.ts
tests/unit/core/capability-registry.test.ts
tests/unit/core/dependency-registry.test.ts
tests/unit/player/privacy.test.ts
tests/unit/social/translation.test.ts
tests/unit/world/state-transition.test.ts
tests/unit/progression/xp-idempotence.test.ts
tests/unit/play/action-validation.test.ts
tests/unit/discovery/cold-start.test.ts
tests/unit/game-factory/build-validation.test.ts
tests/unit/game-engine/replay.test.ts
tests/unit/social-gaming/concurrency.test.ts
tests/unit/communities/rbac.test.ts
tests/unit/events/lifecycle.test.ts
tests/unit/adaptive-world/agent-permissions.test.ts
tests/unit/economy/ledger.test.ts
tests/unit/meta/evaluation.test.ts
tests/unit/memory/privacy.test.ts
tests/integration/supabase/rls.test.ts
tests/integration/social/private-messages.test.ts
tests/integration/memory/storage.test.ts
tests/integration/admin/owner-controls.test.ts
tests/integration/provider/fallback.test.ts
tests/e2e/auth.spec.ts
tests/e2e/player.spec.ts
tests/e2e/social.spec.ts
tests/e2e/play.spec.ts
tests/e2e/admin.spec.ts
tests/e2e/memory-vault.spec.ts
tests/e2e/i18n.spec.ts
tests/e2e/disabled-capability.spec.ts
```

# 24. MIGRATION ORDER

```text
001_extensions_and_helpers.sql
002_profiles_and_rbac.sql
003_player_preferences.sql
004_social.sql
005_world.sql
006_progression.sql
007_games_and_play.sql
008_communities.sql
009_events.sql
010_memory_vault.sql
011_capabilities_dependencies_providers.sql
012_async_jobs.sql
013_rewards_economy.sql
014_audit.sql
015_rls_policies.sql
016_functions_and_triggers.sql
017_seed_roles_and_permissions.sql
018_owner_bootstrap.sql
```

Before running any migration, inspect the existing schema and generate a reconciliation plan. Never blindly create duplicate tables or overwrite existing data.

# 25. FINAL IMPLEMENTATION GATE

An AI implementing MORISE must first inspect the actual repository tree, package/build configuration, existing Supabase migrations/schema, auth/RLS, existing services and tests. Then map this contract to real files, create safe migrations, implement one module at a time, test before claiming completion, run browser/mobile verification, and verify that missing video/music/local/cloud dependencies do not cause blank screens or unrelated failures.

**Current project gate remains MODULE 6 — PLAY / FINAL QA.**
