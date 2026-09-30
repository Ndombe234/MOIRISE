# M05 — SYSTEM / PROGRESSION / EVOLUTION — CONCEPTION TECHNIQUE DÉTAILLÉE

## 0. Boundary
Construire l'expérience SYSTEM visible et la coordination progression/mission/evolution : HUD, commandes contextuelles, XP, niveaux, titres, achievements, missions, Trace, Fun & Surprise, MORISE DNA presentation and bounded Evolution Engine hooks.

## 1. Architecture en couches
~~~text
UI / route / trigger
→ command/query facade
→ authentication
→ authorization/policy
→ input validator
→ domain service/state machine
→ repository or durable task
→ event publisher
→ observability
→ result
~~~

## 2. Canonical command envelope
~~~ts
type Command = {
  commandId: string;
  actorId: string;          // server derived
  requestId: string;
  idempotencyKey?: string;
  schemaVersion: number;
  payload: unknown;
};
~~~

## 3. Canonical result envelope
~~~ts
type Result<T> = {
  ok: boolean;
  data?: T;
  error?: AppError;
  traceId: string;
  version?: string;
};
~~~

## 4. Domain entities
SystemContext; SystemCommand; XPTransaction; ProgressionProjection; Level; TitleDefinition; UnlockedTitle; Achievement; Mission; MissionProgress; TraceEntry; SurpriseCandidate; DNAProjection.

Chaque entité persistée possède :
- primary key ;
- owner/tenant reference ;
- current state ;
- createdAt/updatedAt ;
- version ;
- business uniqueness ;
- indexes ;
- privacy class ;
- retention/deletion path.

## 5. Commands
### 1. SYSTEM HUD
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 2. Primary commands
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 3. Contextual suggestions
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 4. SYSTEM history
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 5. SYSTEM memory surface
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 6. XP
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 7. Levels
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 8. Ranks
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 9. Titles
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 10. Achievements
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 11. Missions
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 12. Progression history
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 13. Trace
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 14. Living World hooks
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 15. Hidden Possibilities
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 16. Unexplored Paths
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 17. Evolving Identity
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 18. MORISE Double presentation
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 19. Fun & Surprise
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 20. Context suppression
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 21. SYSTEM milestones
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

## 6. State machine
SYSTEM IDLE→CONTEXTUALIZING→READY; mission AVAILABLE→ACTIVE→COMPLETED/FAILED; title LOCKED→UNLOCKED→EQUIPPED.

Les transitions sont codées dans des guards dédiées et testables. Le client ne peut pas promouvoir un état critique.

## 7. Queries
Les queries utilisent :
privacy filter → bounded projection → cursor pagination → optional cache → response normalization.

Une query ne doit pas révéler l'existence d'une ressource interdite lorsque cela constituerait une fuite.

## 8. UI state machine
~~~text
IDLE → LOADING → SUCCESS
               ↘ EMPTY
               ↘ ERROR
               ↘ UNAVAILABLE
               ↘ DEGRADED
~~~

Une erreur de composant ne remplace jamais tout le shell par une page blanche.

## 9. Events
Le module publie ses propres événements avec :
eventId, eventType, schemaVersion, moduleId, actorId?, requestId?, occurredAt, safe metadata.

Le payload complet privé reste hors du bus général sauf contrat explicite.

## 10. AI integration
M15 proposes/contextualizes. M05 owns visible presentation and progression state. Evolution Engine cannot fabricate future states.

Pattern :
~~~text
module
→ M15 capability
→ policy/context
→ resource/provider route
→ execution
→ validation
→ module-specific validation
→ commit
~~~

## 11. Security
client never grants XP/title/reward; deterministic server-side entitlement; AI cannot alter economy directly; no sensitive DNA inference.
Threat model:
identity spoofing;
privilege escalation;
replay;
cross-player read;
injection;
resource exhaustion;
cache leakage;
untrusted AI output;
untrusted generated code.

## 12. Persistence
Tables/collections doivent être protégées par ownership/RLS ou policy équivalente. Les contraintes critiques sont imposées par la base lorsque possible.

## 13. Cache
Key = module + entity + version + privacy scope.
Invalidate on owner events.
Never share sensitive cache across players.

## 14. Async/recovery
Long task:
created → queued → leased → running → validating → completed.
Loss:
lease expiry → recover/requeue if idempotent.
Cancelled task cannot be revived by late result.

## 15. Performance
Bound query sizes, page lists, lazy-load heavy engines/media, batch events, backpressure AI jobs, avoid blocking normal navigation on long work.

## 16. Tests
### Unit
guards, validators, deterministic logic, entitlement rules.
### Integration
auth + database + events + RLS/policy + idempotency.
### Contract
AI capability/provider/worker events where applicable.
### Browser
every visible action, loading/error/empty, back navigation, reload.
### Mobile
390x844 minimum target plus desktop.
### Resilience
timeout, duplicate, reconnect, provider outage, worker loss, concurrency.
### Security
unauthorized read/write, replay, injection and data leakage.

## 17. Failure matrix
| Failure | Required behavior |
|---|---|
| invalid input | reject, no mutation |
| session expired | AUTH_REQUIRED |
| forbidden | FORBIDDEN, no sensitive detail |
| conflict | CONFLICT + authoritative reload |
| provider unavailable | fallback/degraded |
| worker unavailable | retry/requeue when safe |
| duplicate | return original proof |
| corrupted artifact | reject/preserve previous stable |
| quota exceeded | queued/degraded, never silent charge |
| cache stale | source-of-truth refresh |

## 18. AI-specific tests
The module must verify that AI cannot:
- change owner;
- grant itself permission;
- bypass M13 safety;
- write arbitrary production data;
- choose an unregistered provider;
- expose private content;
- bypass reward validation.

## 19. Implementation handoff
1. Inspect current code/migrations.
2. Map reusable code.
3. Compare against Plan.
4. Freeze types/contracts.
5. Implement persistence/policy.
6. Implement state machine.
7. Implement events/observability.
8. Implement UI.
9. Add AI capability calls.
10. Add tests.
11. Browser and mobile test.
12. Record DONE evidence.

## 20. Puzzle sheet
OWNER = M05
INPUTS = authenticated Player/context + typed payload
FEATURES = SYSTEM HUD, Primary commands, Contextual suggestions, SYSTEM history, SYSTEM memory surface, XP, Levels, Ranks, Titles, Achievements, Missions, Progression history, Trace, Living World hooks, Hidden Possibilities, Unexplored Paths, Evolving Identity, MORISE Double presentation, Fun & Surprise, Context suppression, SYSTEM milestones
FLOWS = Context display : M15 context candidate → policy → SYSTEM surface → action route. | Progression : validated event → deterministic entitlement → XP ledger → projection → title/achievement checks. | Mission : candidate → eligibility → offer → start → progress → completion → validated reward. | Fun & Surprise : eligible state → frequency/suppression → surprise candidate → presentation → reaction learning. | Evolution : permitted signal → Evolution Engine → contextual possibility → optional action → feedback.
STATES = SYSTEM IDLE→CONTEXTUALIZING→READY; mission AVAILABLE→ACTIVE→COMPLETED/FAILED; title LOCKED→UNLOCKED→EQUIPPED.
ENTITIES = SystemContext; SystemCommand; XPTransaction; ProgressionProjection; Level; TitleDefinition; UnlockedTitle; Achievement; Mission; MissionProgress; TraceEntry; SurpriseCandidate; DNAProjection.
AI = M15 proposes/contextualizes. M05 owns visible presentation and progression state. Evolution Engine cannot fabricate future states.
SECURITY = client never grants XP/title/reward; deterministic server-side entitlement; AI cannot alter economy directly; no sensitive DNA inference.
ACCEPTANCE = coherent SYSTEM, progression integrity, contextual suppression, no spam, titles and achievements explainable, recovery tested.

If a critical behavior is not defined in this sheet or an authoritative transversal contract, the implementation agent must not invent it.

## 21. Detailed cross-module handoff
Any emitted event may be consumed by M05/M06/M07/M10/M12/M13/M14/M15 according to ownership. Consumers react; they do not mutate this module's database.

## 22. Completion proof
A module is not DONE because the page renders. DONE requires code, state, persistence, authorization, events, error recovery, tests, browser evidence, mobile evidence and security evidence.