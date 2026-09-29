# MORISE — EXACT IMPLEMENTATION SPECIFICATION V1

**Purpose:** compléter `MORISE_IMPLEMENTATION_CONTRACTS.md` avec le niveau directement exploitable par une IA d'implémentation.

**Current gate:** MODULE 6 — PLAY / FINAL QA.

**Important:** ce fichier est un contrat technique cible. Avant toute migration SQL réelle, l'agent doit comparer le schéma existant, les migrations déjà présentes et les politiques RLS réelles. Aucun `DROP`, remplacement destructif ou réinitialisation de données n'est autorisé par ce document.

---

# 1. CONVENTIONS SQL EXACTES

## 1.1 Types

- Identifiants métier: `uuid`.
- Dates/instants: `timestamptz`.
- Compteurs non négatifs: `bigint` avec `CHECK`.
- États finis: `text` + `CHECK` tant qu'aucun enum PostgreSQL existant n'est imposé par le dépôt.
- Données extensibles: `jsonb`.
- Texte utilisateur: `text`.
- Taille média: `bigint` en octets.
- Version: `integer` ou `bigint` selon le compteur.

## 1.2 Règle FK

Toute référence vers un utilisateur doit utiliser `auth.users(id)` directement ou `profiles(id)` lorsque la couche applicative est nécessaire.

## 1.3 Règle d'idempotence

Toute mutation qui peut être rejouée doit avoir un identifiant idempotent unique dans son périmètre.

Exemples:

```sql
idempotency_key text not null
unique(player_id, idempotency_key)
```

## 1.4 Règle temporelle

Le stockage utilise UTC (`timestamptz`). La conversion locale est une responsabilité de présentation.

---

# 2. RLS — POLICIES CIBLES EXACTES

> Les noms doivent être réconciliés avec les tables réelles avant exécution.

## 2.1 Helper role

```sql
create or replace function public.has_role(required_role text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.player_roles pr
    join public.roles r on r.id = pr.role_id
    where pr.player_id = auth.uid()
      and r.code = required_role
  );
$$;
```

La fonction doit être protégée contre l'exécution non autorisée selon les conventions Supabase du dépôt.

## 2.2 Profiles

```sql
alter table public.profiles enable row level security;

create policy profiles_select_public
on public.profiles
for select
using (
  status = 'active'
);

create policy profiles_update_self
on public.profiles
for update
using (id = auth.uid())
with check (id = auth.uid());
```

Les champs sensibles qui ne doivent pas être publics doivent être séparés dans une table privée plutôt que simplement masqués par l'UI.

## 2.3 Player preferences

```sql
alter table public.player_preferences enable row level security;

create policy player_preferences_select_self
on public.player_preferences
for select
using (player_id = auth.uid());

create policy player_preferences_insert_self
on public.player_preferences
for insert
with check (player_id = auth.uid());

create policy player_preferences_update_self
on public.player_preferences
for update
using (player_id = auth.uid())
with check (player_id = auth.uid());
```

## 2.4 Private conversations

```sql
alter table public.conversation_members enable row level security;

create policy conversation_members_self
on public.conversation_members
for select
using (player_id = auth.uid());
```

Pour `messages`, la policy doit vérifier l'existence du membre actif:

```sql
alter table public.messages enable row level security;

create policy messages_member_select
on public.messages
for select
using (
  exists (
    select 1
    from public.conversation_members cm
    where cm.conversation_id = messages.conversation_id
      and cm.player_id = auth.uid()
      and cm.left_at is null
  )
);
```

L'insert doit également vérifier que `sender_id = auth.uid()` et que l'expéditeur est membre actif.

## 2.5 Memory Vault

```sql
alter table public.memory_items enable row level security;

create policy memory_items_owner_select
on public.memory_items
for select
using (owner_id = auth.uid());

create policy memory_items_owner_insert
on public.memory_items
for insert
with check (owner_id = auth.uid());

create policy memory_items_owner_update
on public.memory_items
for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy memory_items_owner_delete
on public.memory_items
for delete
using (owner_id = auth.uid());
```

Une future policy de partage doit être explicitement ajoutée; `visibility='public'` ne suffit pas à lui seul pour autoriser l'accès au stockage privé.

## 2.6 OWNER/RBAC

Le client ne reçoit jamais une policy permettant à un PLAYER de modifier `player_roles` directement.

Les mutations de rôles passent par une action serveur contrôlée:

```text
requester -> authorizeRoleMutation -> validateTarget -> writeRole -> audit -> event
```

---

# 3. INTERFACES TYPESCRIPT EXACTES

## 3.1 IDs

```ts
export type UUID = string;
export type ISODateTime = string;
export type LocaleCode =
  | 'fr' | 'en' | 'hi' | 'es' | 'de' | 'it' | 'pt' | 'ar' | 'ja' | 'ko'
  | 'ru' | 'tr' | 'id' | 'th' | 'vi' | 'pl' | 'nl' | 'ro' | 'bn' | 'ur';

export type RoleCode = 'owner' | 'admin' | 'moderator' | 'player';
```

## 3.2 Capability

```ts
export type CapabilityStatus =
  | 'planned'
  | 'implemented'
  | 'pending_dependency'
  | 'available'
  | 'configured'
  | 'authorized'
  | 'enabled'
  | 'executing'
  | 'validating'
  | 'completed'
  | 'failed'
  | 'canceled'
  | 'degraded'
  | 'maintenance'
  | 'disabled'
  | 'unavailable';

export interface CapabilityDescriptor {
  id: string;
  status: CapabilityStatus;
  requiredDependencies: string[];
  optionalDependencies: string[];
  providers: string[];
  fallbackCapabilities: string[];
  privacyClass: 'public' | 'private' | 'sensitive';
  riskClass: 'low' | 'medium' | 'high';
  version: string;
}
```

## 3.3 Orchestrator

```ts
export interface SystemIntent {
  id: UUID;
  actorId?: UUID;
  capability?: string;
  action: string;
  locale: LocaleCode;
  context: Record<string, unknown>;
  correlationId: UUID;
}

export interface OrchestrationPlan {
  intentId: UUID;
  capability: string;
  providerId: string;
  steps: OrchestrationStep[];
  fallbackProviderIds: string[];
  policyVersion: string;
}

export interface OrchestrationStep {
  id: string;
  action: string;
  providerId: string;
  timeoutMs: number;
  retryable: boolean;
}

export interface OrchestrationResult<T = unknown> {
  requestId: UUID;
  state: 'completed' | 'failed' | 'unavailable' | 'degraded' | 'canceled';
  value?: T;
  providerId?: string;
  validation: ValidationResult;
  error?: SystemError;
}

export interface ValidationResult {
  state: 'pass' | 'partial' | 'fail';
  checks: string[];
  validatorVersion: string;
}

export interface SystemError {
  code: string;
  safeMessage: string;
  retryable: boolean;
  correlationId: UUID;
}
```

## 3.4 Provider

```ts
export interface ProviderContext {
  requestId: UUID;
  actorId?: UUID;
  capability: string;
  locale: LocaleCode;
  privacyClass: 'public' | 'private' | 'sensitive';
  timeoutMs: number;
  signal?: AbortSignal;
}

export interface ProviderHealth {
  providerId: string;
  state: 'healthy' | 'degraded' | 'down' | 'unknown';
  checkedAt: ISODateTime;
  latencyMs?: number;
  message?: string;
}

export interface ProviderAdapter<TInput, TOutput> {
  readonly id: string;
  readonly capabilities: readonly string[];
  health(ctx: ProviderContext): Promise<ProviderHealth>;
  execute(input: TInput, ctx: ProviderContext): Promise<TOutput>;
  cancel?(requestId: UUID): Promise<void>;
}
```

## 3.5 Translation

```ts
export interface TranslationRequest {
  text: string;
  sourceLocale: LocaleCode;
  targetLocale: LocaleCode;
  context?: string;
  privacyClass: 'public' | 'private' | 'sensitive';
}

export interface TranslationResult {
  translatedText: string;
  sourceLocale: LocaleCode;
  targetLocale: LocaleCode;
  providerId: string;
  engineVersion: string;
  validation: ValidationResult;
}

export interface TranslationService {
  translate(
    request: TranslationRequest,
    ctx: ProviderContext,
  ): Promise<OrchestrationResult<TranslationResult>>;
}
```

## 3.6 Memory

```ts
export interface MemoryItem {
  id: UUID;
  ownerId: UUID;
  mediaType: 'photo' | 'video' | 'audio' | 'text' | 'creation';
  storageBucket: string;
  storagePath: string;
  title?: string;
  description?: string;
  capturedAt?: ISODateTime;
  visibility: 'private' | 'shared' | 'public';
  status: 'uploading' | 'processing' | 'ready' | 'failed' | 'deleted';
}

export interface MemoryVaultService {
  createUploadSession(input: CreateMemoryUpload): Promise<UploadSession>;
  finalizeUpload(input: FinalizeMemoryUpload): Promise<MemoryItem>;
  getMemory(id: UUID): Promise<MemoryItem>;
  deleteMemory(id: UUID): Promise<void>;
}
```

## 3.7 RBAC

```ts
export interface RoleService {
  listRoles(actorId: UUID): Promise<RoleCode[]>;
  grantRole(input: GrantRoleInput): Promise<void>;
  revokeRole(input: RevokeRoleInput): Promise<void>;
}

export interface GrantRoleInput {
  actorId: UUID;
  targetPlayerId: UUID;
  role: Exclude<RoleCode, 'owner'>;
  reason: string;
}

export interface RevokeRoleInput extends GrantRoleInput {}
```

---

# 4. ÉVÉNEMENTS EXACTS

Tous les événements utilisent un envelope commun:

```ts
export interface DomainEvent<T> {
  id: UUID;
  type: string;
  schemaVersion: number;
  aggregateType: string;
  aggregateId: UUID;
  actorId?: UUID;
  correlationId: UUID;
  causationId?: UUID;
  occurredAt: ISODateTime;
  payload: T;
}
```

## Foundation

```text
AUTH_SESSION_STARTED
AUTH_SESSION_ENDED
PLAYER_BOOTSTRAPPED
PROFILE_UPDATED
DEVICE_REGISTERED
```

## Social

```text
POST_CREATED
POST_UPDATED
POST_DELETED
COMMENT_CREATED
REACTION_CREATED
REACTION_REMOVED
CONVERSATION_CREATED
CONVERSATION_MEMBER_ADDED
CONVERSATION_MEMBER_REMOVED
MESSAGE_CREATED
MESSAGE_READ
MESSAGE_REVOKED
TRANSLATION_REQUESTED
TRANSLATION_COMPLETED
TRANSLATION_FAILED
NOTIFICATION_CREATED
```

## World

```text
WORLD_CREATED
WORLD_UPDATED
WORLD_STATE_CHANGED
WORLD_OBJECT_CHANGED
CHARACTER_STATE_CHANGED
WORLD_DISCOVERY_CREATED
WORLD_MEMORY_CREATED
```

## Progression

```text
XP_AWARDED
LEVEL_CHANGED
TITLE_UNLOCKED
ACHIEVEMENT_UNLOCKED
CAPABILITY_UNLOCKED
```

## Play

```text
PLAY_SESSION_CREATED
PLAY_ACTION_ACCEPTED
PLAY_ACTION_REJECTED
PLAY_SESSION_COMPLETED
PLAY_SESSION_ABANDONED
```

## Discovery / Factory

```text
DISCOVERY_REQUESTED
DISCOVERY_COMPLETED
GAME_SPEC_CREATED
GAME_BUILD_STARTED
GAME_BUILD_FAILED
GAME_TEST_STARTED
GAME_TEST_FAILED
GAME_REPAIR_REQUESTED
GAME_BUILD_VALIDATED
GAME_PUBLISHED
```

## Social Gaming

```text
GAME_INVITE_CREATED
GAME_SESSION_JOINED
GAME_SESSION_LEFT
GAME_ACTION_ACCEPTED
GAME_RESULT_VALIDATED
GAME_REPLAY_CREATED
```

## Communities

```text
COMMUNITY_CREATED
COMMUNITY_MEMBER_JOINED
COMMUNITY_MEMBER_REMOVED
COMMUNITY_ROLE_GRANTED
COMMUNITY_ROLE_REVOKED
MODERATION_ACTION_CREATED
```

## Events

```text
EVENT_CREATED
EVENT_SCHEDULED
EVENT_STARTED
EVENT_STAGE_STARTED
EVENT_STAGE_COMPLETED
EVENT_FINALIZED
EVENT_CANCELED
EVENT_REWARD_ISSUED
```

## Adaptive World / Meta

```text
WORLD_AGENT_CREATED
WORLD_AGENT_ACTION_PROPOSED
WORLD_AGENT_ACTION_REJECTED
WORLD_AGENT_ACTION_EXECUTED
WORLD_EVOLUTION_PROPOSED
WORLD_EVOLUTION_ACCEPTED
WORLD_EVOLUTION_REJECTED
LEARNING_CANDIDATE_CREATED
LEARNING_CANDIDATE_EVALUATED
EXPERIMENT_STARTED
EXPERIMENT_COMPLETED
BENCHMARK_COMPLETED
```

## Economy / Memory / Media

```text
MEMORY_UPLOAD_STARTED
MEMORY_UPLOAD_COMPLETED
MEMORY_UPLOAD_FAILED
MEMORY_SHARED
MEMORY_DELETED
MEDIA_JOB_CREATED
MEDIA_JOB_STARTED
MEDIA_JOB_COMPLETED
MEDIA_JOB_FAILED
REWARD_GRANTED
LEDGER_ENTRY_CREATED
CREATOR_THRESHOLD_REACHED
AD_IMPRESSION_RECORDED
AD_CLICK_RECORDED
```

---

# 5. ENDPOINTS / ACTIONS EXACTS

MORISE doit préférer des actions métier plutôt que des endpoints CRUD génériques pour les mutations sensibles.

## Auth

```text
POST /api/auth/bootstrap
POST /api/auth/signout
GET  /api/session
```

## Player

```text
GET   /api/player/me
PATCH /api/player/me
GET   /api/player/preferences
PATCH /api/player/preferences
GET   /api/player/privacy
PATCH /api/player/privacy
POST  /api/player/device
```

## Social

```text
GET  /api/feed
POST /api/posts
PATCH /api/posts/:id
DELETE /api/posts/:id
POST /api/posts/:id/comments
POST /api/posts/:id/reactions
```

## Messaging

```text
POST /api/conversations
GET  /api/conversations
GET  /api/conversations/:id/messages
POST /api/conversations/:id/messages
POST /api/messages/:id/translate
POST /api/messages/:id/read
POST /api/messages/:id/revoke
```

## Memory

```text
POST /api/memory/upload-session
POST /api/memory/:id/finalize
GET  /api/memory
GET  /api/memory/:id
DELETE /api/memory/:id
POST /api/memory/:id/share
```

## Play

```text
POST /api/play/sessions
POST /api/play/sessions/:id/actions
GET  /api/play/sessions/:id
POST /api/play/sessions/:id/complete
POST /api/play/sessions/:id/abandon
```

## Discovery

```text
POST /api/discovery/query
POST /api/discovery/:id/feedback
```

## Creation

```text
POST /api/games/specs
POST /api/games/builds
GET  /api/games/builds/:id
POST /api/games/builds/:id/cancel
POST /api/games/builds/:id/retry
```

## Communities

```text
POST /api/communities
GET  /api/communities
POST /api/communities/:id/join
POST /api/communities/:id/leave
POST /api/communities/:id/roles
DELETE /api/communities/:id/members/:playerId
```

## Events

```text
POST /api/events
PATCH /api/events/:id
POST /api/events/:id/publish
POST /api/events/:id/join
POST /api/events/:id/cancel
```

## OWNER / Superadmin

```text
GET  /api/admin/overview
GET  /api/admin/capabilities
PATCH /api/admin/capabilities/:id
GET  /api/admin/dependencies
GET  /api/admin/providers
PATCH /api/admin/providers/:id
GET  /api/admin/users
POST /api/admin/users/:id/roles
DELETE /api/admin/users/:id/roles/:role
GET  /api/admin/audit
POST /api/admin/maintenance
```

Chaque action admin doit refaire l'autorisation côté serveur. L'existence d'une route dans le frontend n'accorde aucun privilège.

---

# 6. CONTRATS PROVIDER EXACTS

## 6.1 ImageProvider

```ts
export interface ImageGenerationInput {
  prompt: string;
  negativePrompt?: string;
  width: number;
  height: number;
  seed?: number;
  style?: string;
}

export interface ImageGenerationOutput {
  assetId: UUID;
  mimeType: string;
  width: number;
  height: number;
  providerId: string;
  modelVersion: string;
}
```

## 6.2 MusicProvider

```ts
export interface MusicGenerationInput {
  prompt: string;
  durationSeconds: number;
  instrumental: boolean;
  format: 'wav' | 'mp3' | 'ogg';
}

export interface MusicGenerationOutput {
  assetId: UUID;
  durationSeconds: number;
  format: string;
  providerId: string;
  modelVersion: string;
}
```

## 6.3 VideoProvider

```ts
export interface VideoGenerationInput {
  prompt: string;
  durationSeconds: number;
  width: number;
  height: number;
  fps: number;
  sourceAssetIds?: UUID[];
}

export interface VideoGenerationOutput {
  assetId: UUID;
  durationSeconds: number;
  width: number;
  height: number;
  fps: number;
  providerId: string;
  modelVersion: string;
}
```

## 6.4 SpeechProvider

```ts
export interface SpeechToTextInput {
  assetId: UUID;
  language?: LocaleCode;
}

export interface SpeechToTextOutput {
  text: string;
  locale: LocaleCode;
  segments: Array<{ startMs: number; endMs: number; text: string }>;
}
```

## 6.5 Provider fallback

```text
request
→ local/browser if valid
→ configured local node
→ self-hosted
→ optional cloud
→ optional external API
→ unavailable
```

No provider is mandatory for the core social experience.

---

# 7. CAPABILITY → PROVIDER ROUTING

| Capability | Primary | Fallback 1 | Fallback 2 | If unavailable |
|---|---|---|---|---|
| Text rules | MORISE | Browser | Local | deterministic response |
| Translation | Browser/local | self-hosted | optional API | original language |
| Image | Browser/local | self-hosted | optional cloud/API | capability disabled |
| Music | Local | self-hosted | optional cloud/API | capability disabled |
| Video | Local PC | self-hosted | optional cloud/API | capability disabled |
| Speech | Browser/local | self-hosted | optional API | text input |
| Game build | Local PC | self-hosted | optional cloud | queue/unavailable |

The router returns a structured unavailable/degraded result, never a fake success.

---

# 8. FILE / SERVICE / TEST MATRIX

## Module 1

```text
src/core/auth/AuthService.ts                 -> AuthService              -> tests/unit/auth/AuthService.test.ts
src/core/session/SessionService.ts           -> SessionService           -> tests/unit/session/SessionService.test.ts
src/system/capability/CapabilityRegistry.ts  -> CapabilityRegistry       -> tests/unit/system/CapabilityRegistry.test.ts
src/system/dependency/DependencyRegistry.ts  -> DependencyRegistry       -> tests/unit/system/DependencyRegistry.test.ts
src/infrastructure/supabase/client.ts        -> SupabaseClient           -> tests/integration/supabase/bootstrap.test.ts
```

## Module 2

```text
src/modules/player/PlayerService.ts          -> PlayerService             -> tests/unit/player/PlayerService.test.ts
src/modules/player/PrivacyService.ts         -> PrivacyService            -> tests/unit/player/PrivacyService.test.ts
src/modules/player/DeviceService.ts          -> DeviceCapabilityService   -> tests/unit/player/DeviceService.test.ts
```

## Module 3

```text
src/modules/social/PostService.ts            -> PostService               -> tests/unit/social/PostService.test.ts
src/modules/social/MessageService.ts         -> MessageService            -> tests/unit/social/MessageService.test.ts
src/modules/social/TranslationService.ts     -> TranslationService        -> tests/unit/social/TranslationService.test.ts
src/modules/social/ConversationPolicy.ts     -> ConversationPolicy        -> tests/unit/social/ConversationPolicy.test.ts
```

## Module 4

```text
src/modules/world/WorldService.ts            -> WorldService               -> tests/unit/world/WorldService.test.ts
src/modules/world/WorldStateMachine.ts        -> WorldStateMachine          -> tests/unit/world/WorldStateMachine.test.ts
src/modules/world/DiscoveryService.ts         -> DiscoveryService            -> tests/unit/world/DiscoveryService.test.ts
```

## Module 5

```text
src/modules/progression/XpService.ts         -> XpService                  -> tests/unit/progression/XpService.test.ts
src/modules/progression/TitleService.ts      -> TitleService               -> tests/unit/progression/TitleService.test.ts
src/modules/progression/AchievementService.ts -> AchievementService        -> tests/unit/progression/AchievementService.test.ts
```

## Module 6

```text
src/modules/play/PlaySessionService.ts       -> PlaySessionService          -> tests/integration/play/PlaySessionService.test.ts
src/modules/play/PlayActionService.ts        -> PlayActionService           -> tests/integration/play/PlayActionService.test.ts
src/modules/play/PlayValidation.ts            -> PlayValidation              -> tests/unit/play/PlayValidation.test.ts
```

## Module 7

```text
src/modules/discovery/DiscoveryEngine.ts     -> DiscoveryEngine             -> tests/unit/discovery/DiscoveryEngine.test.ts
src/modules/discovery/Eligibility.ts         -> EligibilityService          -> tests/unit/discovery/Eligibility.test.ts
```

## Module 8

```text
src/modules/game-factory/GameSpecService.ts  -> GameSpecService             -> tests/unit/game-factory/GameSpecService.test.ts
src/modules/game-factory/BuildService.ts     -> BuildService                -> tests/integration/game-factory/BuildService.test.ts
src/modules/game-factory/RepairLoop.ts       -> RepairLoop                  -> tests/unit/game-factory/RepairLoop.test.ts
```

## Module 9

```text
src/modules/game-engine/SceneSystem.ts       -> SceneSystem                 -> tests/unit/game-engine/SceneSystem.test.ts
src/modules/game-engine/ReplaySystem.ts      -> ReplaySystem                -> tests/unit/game-engine/ReplaySystem.test.ts
src/modules/game-engine/StateSerializer.ts   -> StateSerializer             -> tests/unit/game-engine/StateSerializer.test.ts
```

## Module 10

```text
src/modules/social-gaming/GameSessionService.ts -> GameSessionService       -> tests/integration/social-gaming/GameSessionService.test.ts
src/modules/social-gaming/ActionAuthority.ts    -> ActionAuthority          -> tests/unit/social-gaming/ActionAuthority.test.ts
src/modules/social-gaming/ReplayService.ts      -> ReplayService             -> tests/unit/social-gaming/ReplayService.test.ts
```

## Module 11

```text
src/modules/communities/CommunityService.ts -> CommunityService             -> tests/unit/communities/CommunityService.test.ts
src/modules/communities/RoleService.ts      -> CommunityRoleService         -> tests/unit/communities/RoleService.test.ts
src/modules/communities/ModerationService.ts -> ModerationService            -> tests/integration/communities/ModerationService.test.ts
```

## Module 12

```text
src/modules/events/EventService.ts          -> EventService                 -> tests/unit/events/EventService.test.ts
src/modules/events/EventScheduler.ts        -> EventScheduler               -> tests/integration/events/EventScheduler.test.ts
src/modules/events/EventRewardService.ts    -> EventRewardService           -> tests/unit/events/EventRewardService.test.ts
```

## Module 13

```text
src/modules/adaptive-world/AgentService.ts  -> WorldAgentService             -> tests/unit/adaptive-world/AgentService.test.ts
src/modules/adaptive-world/EvolutionService.ts -> EvolutionService            -> tests/unit/adaptive-world/EvolutionService.test.ts
src/modules/adaptive-world/Convergence.ts   -> ConvergenceService             -> tests/unit/adaptive-world/Convergence.test.ts
```

## Module 14

```text
src/modules/economy/RewardService.ts        -> RewardService                 -> tests/unit/economy/RewardService.test.ts
src/modules/economy/LedgerService.ts        -> LedgerService                 -> tests/integration/economy/LedgerService.test.ts
src/modules/economy/CreatorEligibility.ts   -> CreatorEligibilityService     -> tests/unit/economy/CreatorEligibility.test.ts
```

## Module 15

```text
src/modules/meta/BenchmarkService.ts        -> BenchmarkService              -> tests/unit/meta/BenchmarkService.test.ts
src/modules/meta/LearningService.ts         -> LearningService               -> tests/unit/meta/LearningService.test.ts
src/modules/meta/ExperimentService.ts       -> ExperimentService             -> tests/integration/meta/ExperimentService.test.ts
src/modules/meta/EvolutionGuard.ts          -> EvolutionGuard                -> tests/unit/meta/EvolutionGuard.test.ts
```

**Important:** ces chemins sont la structure cible. Si le dépôt possède déjà une convention différente, l'agent doit adapter les chemins sans changer les responsabilités ni les contrats.

---

# 9. ADMIN / SUPERADMIN — CONTRAT EXACT

## Permissions minimales

```text
admin.view_dashboard
admin.view_users
admin.manage_users
admin.grant_admin
admin.revoke_admin
admin.grant_moderator
admin.revoke_moderator
admin.view_audit
admin.manage_capabilities
admin.manage_providers
admin.manage_dependencies
admin.enter_maintenance
admin.manage_ads
admin.manage_economy_policy
```

`owner` possède ces permissions par défaut selon la policy de déploiement.

Un `admin` ne peut pas devenir `owner`.

Un `moderator` ne peut pas modifier les rôles globaux.

## Role mutation flow

```text
OWNER
→ request role change
→ server authorization
→ target validation
→ database transaction
→ audit event
→ ROLE_GRANTED / ROLE_REVOKED
→ notification
```

## Audit

Chaque mutation sensible conserve:

```text
actor_id
actor_role
action
target_type
target_id
reason
before_state
after_state
correlation_id
created_at
```

---

# 10. FEATURE FLAG / CAPABILITY CONTROL

Le panneau OWNER doit permettre de désactiver temporairement une capacité sans modifier le code.

Exemples:

```text
video_generation = disabled
music_generation = pending_dependency
advanced_image = maintenance
local_game_factory = available
external_translation = disabled
```

Le PLAYER ne voit pas les détails techniques. Le SYSTEM choisit automatiquement un fallback ou affiche une impossibilité propre.

---

# 11. JOB CONTRACT

```ts
export interface AsyncJob {
  id: UUID;
  type: string;
  actorId?: UUID;
  status: 'requested' | 'queued' | 'running' | 'validating' | 'completed' | 'failed' | 'canceled' | 'unavailable';
  attempts: number;
  maxAttempts: number;
  idempotencyKey: string;
  correlationId: UUID;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  errorCode?: string;
  createdAt: ISODateTime;
  startedAt?: ISODateTime;
  completedAt?: ISODateTime;
}
```

Retry policy:

```text
retryable provider/network error -> retry
validation error -> no blind retry
permission error -> no retry
user cancellation -> canceled
missing dependency -> unavailable
```

---

# 12. ERROR CONTRACT

Toutes les couches convertissent leurs erreurs vers un modèle commun.

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
  | 'MEDIA_TOO_LARGE'
  | 'UNSUPPORTED_DEVICE'
  | 'AI_VALIDATION_FAILED'
  | 'INTERNAL_ERROR';
```

L'UI ne reçoit jamais de secret, stack trace serveur ou token fournisseur.

---

# 13. I18N EXACTE

Canonical fallback:

```text
en
```

Resolution:

```text
explicit user locale
→ profile locale
→ browser locale
→ language family mapping
→ en
```

La traduction ne doit pas écraser le texte source.

Les clés de traduction sont versionnées.

Exemple:

```ts
export interface I18nService {
  resolveLocale(input?: string): LocaleCode;
  t(key: string, locale: LocaleCode, params?: Record<string, string | number>): string;
}
```

---

# 14. MEMORY VAULT — ANALYSE / PARTAGE / TRAINING

Quatre permissions indépendantes:

```text
STORE
ANALYZE
SHARE
TRAIN
```

Le stockage d'une photo ne donne pas automatiquement le droit de l'analyser.

L'analyse ne donne pas le droit de la partager.

Le partage ne donne pas le droit de l'utiliser pour entraîner un modèle.

Une politique `TRAIN` doit être explicitement définie et compatible avec les droits applicables avant toute utilisation d'un média à cette fin.

---

# 15. DEFINITION OF DONE TECHNIQUE

Un contrat est considéré implémentable lorsque:

1. son modèle de données est défini;
2. ses permissions sont définies;
3. ses événements sont nommés;
4. ses actions/endpoints sont définis;
5. ses interfaces TypeScript sont définies;
6. ses providers sont abstraits;
7. ses fallbacks sont définis;
8. ses erreurs sont définies;
9. son idempotence est définie;
10. ses fichiers cibles sont identifiés;
11. ses tests sont identifiés;
12. son comportement en infrastructure absente est défini.

Un module n'est toutefois **pas considéré implémenté** tant que le code et les tests correspondants n'existent pas et n'ont pas été vérifiés.

---

# 16. CURRENT EXECUTION GATE

```text
MODULE 1  FOUNDATION             [CONTRACT]
MODULE 2  PLAYER                 [CONTRACT]
MODULE 3  SOCIAL                 [CONTRACT]
MODULE 4  WORLD                  [CONTRACT]
MODULE 5  SYSTEM/PROGRESSION    [CONTRACT]
MODULE 6  PLAY / FINAL QA       [CURRENT GATE]
MODULE 7  DISCOVERY              [DESIGNED]
MODULE 8  GAME FACTORY           [DESIGNED]
MODULE 9  SHARED ENGINE          [DESIGNED]
MODULE 10 SOCIAL GAMING          [DESIGNED]
MODULE 11 COMMUNITIES            [DESIGNED]
MODULE 12 EVENTS                 [DESIGNED]
MODULE 13 ADAPTIVE WORLD         [DESIGNED]
MODULE 14 ECONOMY                [DESIGNED]
MODULE 15 META / AI LAB          [DESIGNED]
```

**Aucune section future n'autorise à sauter la validation du Module 6.**

---

# 17. IMPLEMENTATION RULE FOR OTHER AI

Avant toute modification de code:

```text
READ MASTER PLAN
→ READ TECHNICAL MASTER
→ READ IMPLEMENTATION CONTRACTS
→ READ THIS EXACT SPEC
→ INSPECT ACTUAL REPOSITORY
→ INSPECT EXISTING SCHEMA
→ IDENTIFY CURRENT MODULE
→ WRITE/UPDATE TEST FIRST WHEN PRACTICAL
→ IMPLEMENT MINIMAL SLICE
→ VERIFY
→ ONLY THEN CONTINUE
```

L'IA doit signaler toute divergence entre le dépôt réel et cette spécification avant d'appliquer une migration destructive ou de modifier une API existante.
