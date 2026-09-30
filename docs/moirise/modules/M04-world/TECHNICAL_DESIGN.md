# M04 — WORLD — CONCEPTION TECHNIQUE DÉTAILLÉE

## 0. Boundary
Être la surface d'entrée principale vers la profondeur de MOIRISE : une expérience simple qui permet de comprendre quoi faire maintenant sans exposer toutes les capacités internes.

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
WorldContext; DoorDefinition; ContextCard; Detour; WorldSurfaceState; DiscoveryRef.

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
### 1. Home World
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 2. Discover entry
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 3. Play entry
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 4. Create entry
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 5. Communities entry
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 6. Activities entry
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 7. Events entry
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 8. Context cards
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 9. Detours
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 10. World loading states
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 11. Solo-first orientation
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 12. Shareable discovery
Pipeline :
receive → authenticate → authorize → validate → load minimal context → guard state → mutate/queue → persist authoritative state → emit event → invalidate safe caches → return result.

Idempotency :
si la commande peut être rejouée, une clé sémantique doit empêcher les effets multiples.

Failure :
validation → no mutation;
forbidden → no mutation;
conflict → authoritative reload;
dependency failure → retry/degrade only when safe.

### 13. SYSTEM handoff
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
BOOTING → READY; READY → CONTEXTUAL_SUGGESTION → READY; unavailable dependency → DEGRADED.

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
AI selects contextual presentation while M04 remains presentation owner and M13/M07 own filtering/ranking rules.

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
only authorized data; no fake popularity; no fabricated people/activity.
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
OWNER = M04
INPUTS = authenticated Player/context + typed payload
FEATURES = Home World, Discover entry, Play entry, Create entry, Communities entry, Activities entry, Events entry, Context cards, Detours, World loading states, Solo-first orientation, Shareable discovery, SYSTEM handoff
FLOWS = Landing : Player context → compute relevant doors → render a small set of actions. | Detour : recent action + eligible novelty → optional contextual suggestion → accept/dismiss. | World-to-Play : intent → M06/M07 without exposing engine internals. | World-to-Create : intent → M08/M15 capability path. | World-to-Community : existing group or M11 candidate proposal.
STATES = BOOTING → READY; READY → CONTEXTUAL_SUGGESTION → READY; unavailable dependency → DEGRADED.
ENTITIES = WorldContext; DoorDefinition; ContextCard; Detour; WorldSurfaceState; DiscoveryRef.
AI = AI selects contextual presentation while M04 remains presentation owner and M13/M07 own filtering/ranking rules.
SECURITY = only authorized data; no fake popularity; no fabricated people/activity.
ACCEPTANCE = first-time user understands main options, no wall of buttons, no fake content, mobile-first, deep links recover.

If a critical behavior is not defined in this sheet or an authoritative transversal contract, the implementation agent must not invent it.

## 21. Detailed cross-module handoff
Any emitted event may be consumed by M05/M06/M07/M10/M12/M13/M14/M15 according to ownership. Consumers react; they do not mutate this module's database.

## 22. Completion proof
A module is not DONE because the page renders. DONE requires code, state, persistence, authorization, events, error recovery, tests, browser evidence, mobile evidence and security evidence.