
# MORISE AI — CONCEPTION TECHNIQUE EXHAUSTIVE — RECONSTRUCTION À ZÉRO

## 0. Objet et règle d'implémentation

Ce document est la source de vérité technique de MORISE AI. Il doit permettre à une IA développeuse de prendre une capability et de l'assembler sans deviner.

Règle obligatoire : France → Paris → rue → bâtiment → appartement → porte.

Pour chaque mécanisme, la spécification descend jusqu'à :
ACTOR → TRIGGER → PRECONDITIONS → INPUTS EXACTS → ORDRE → BRANCHES → OUTPUT → STATE MUTATION → EVENTS → ERRORS → RECOVERY → SECURITY → OBSERVABILITY → TESTS → DONE.

Le PLAN MAÎTRE dit ce que MORISE AI est. Ce document dit comment le construire. Ils ne doivent pas recopier le même niveau de détail.

---

# 1. PUZZLE À 3 PIÈCES

## 1.1 PIÈCE A — CERVEAU

~~~text
HTTP / MODULE ACTION
  ↓
REQUEST GATE
  ↓
ACTOR RESOLVER
  ↓
DATA CLASSIFIER
  ↓
CONTEXT ENGINE
  ↓
INTENT COMPILER
  ↓
REQUIREMENTS COMPILER
  ↓
REASONING
  ↓
PLANNER
  ↓
POLICY ENGINE
~~~

Rôle : comprendre, structurer et décider ce qui est autorisé avant toute exécution.

## 1.2 PIÈCE B — MAINS

~~~text
CAPABILITY REGISTRY
  ↓
TOOL REGISTRY
  ↓
RESOURCE ROUTER
  ↓
PROVIDER / WORKER ADAPTER
  ↓
SANDBOX
  ↓
TASK EXECUTOR
~~~

Rôle : produire réellement le résultat demandé sans laisser le modèle accéder directement à la production.

## 1.3 PIÈCE C — PREUVE ET MÉMOIRE

~~~text
VALIDATION
  ↓
OWNER COMMIT
  ↓
EVENT
  ↓
MEMORY / EXPERIENCE
  ↓
EVALUATION
  ↓
EVOLUTION LAB
  ↓
ROLLBACK
~~~

Rôle : décider si le résultat est valide, durable, mémorisable et éventuellement transformable en amélioration.

Les trois pièces constituent une seule MORISE AI.

---

# 2. STACK DU REPOSITORY

Le package actuel du projet contient :
- Next.js 16.3.6
- React 19.3.0
- TypeScript 7.0.2
- Node >=22
- @supabase/supabase-js 2.117.1
- @supabase/ssr 0.12.7
- Vitest 5.0.2

Commandes de qualité :

~~~bash
npm run typecheck
npm test
npm run build
npm run lint
~~~

Choix technique :
- TypeScript ;
- fetch HTTP natif ;
- AbortController ;
- Web Crypto ;
- Supabase ;
- Vitest ;
- Route Handlers Next.js ;
- adapters provider isolés ;
- aucun SDK provider obligatoire.

Une dépendance spécialisée ne doit être ajoutée que si elle apporte une fonction réelle que le code natif ne couvre pas suffisamment.

---

# 3. ARBORESCENCE DU CODE

~~~text
lib/
  ai/
    core/
      types.ts
      constants.ts
      request-gate.ts
      actor.ts
      classifier.ts
      context.ts
      intent.ts
      requirements.ts
      reasoning.ts
      planner.ts
      policy.ts
      orchestrator.ts

    capabilities/
      types.ts
      registry.ts
      catalog.ts
      compatibility.ts

    tools/
      types.ts
      registry.ts
      executor.ts
      permissions.ts

    providers/
      types.ts
      router.ts
      health.ts
      normalize.ts
      pollinations.ts
      puter.ts
      openrouter.ts
      gemini.ts
      huggingface.ts
      aihorde.ts
      kilo.ts

    workers/
      types.ts
      registry.ts
      scheduler.ts
      lease.ts
      sandbox.ts

    validation/
      types.ts
      schema.ts
      policy.ts
      security.ts
      runtime.ts
      behavior.ts
      artifact.ts
      result.ts
      engine.ts

    memory/
      types.ts
      store.ts
      retrieval.ts
      retention.ts
      learning.ts

    evolution/
      types.ts
      candidate.ts
      benchmark.ts
      promotion.ts
      rollback.ts

    creative/
      artifact.ts
      generation.ts

    games/
      specification.ts
      factory.ts

    observability/
      events.ts
      trace.ts
      metrics.ts

app/
  api/
    ai/
      route.ts
      tasks/
        [taskId]/
          route.ts
      providers/
        health/
          route.ts
      capabilities/
        route.ts
~~~

Règle : les modules métier utilisent les use-cases MORISE AI et ne connaissent pas les URLs providers.

---

# 4. TYPES FONDAMENTAUX

## 4.1 DataClass

~~~ts
export type DataClass =
  | "PUBLIC"
  | "PLAYER_PRIVATE"
  | "SENSITIVE"
  | "AI_CONTEXT"
  | "AI_MEMORY"
  | "SECRET"
  | "AUDIT_ONLY";
~~~

## 4.2 AutonomyLevel

~~~ts
export type AutonomyLevel = "A0" | "A1" | "A2" | "A3" | "A4";
~~~

## 4.3 ExecutionTarget

~~~ts
export type ExecutionTarget =
  | "LOCAL"
  | "TRUSTED_WORKER"
  | "COMMUNITY_WORKER"
  | "PROVIDER";
~~~

## 4.4 AIRequest

~~~ts
export interface AIRequest {
  requestId: string;
  traceId: string;
  actorId: string;
  sourceModule: string;
  intentText: string;
  inputRefs: string[];
  constraints: Constraint[];
  sensitivity: DataClass;
  requestedAutonomy: AutonomyLevel;
  budget: ResourceBudget;
  deadlineAt?: string;
  locale?: string;
  parentTaskId?: string;
  createdAt: string;
}
~~~

Le navigateur ne peut définir ni actorId autoritatif, ni permission, ni provider URL, ni secret.

---

# 5. REQUEST GATE

## 5.1 Déclencheurs

- POST /api/ai ;
- commande SYSTEM ;
- tâche interne autorisée ;
- événement métier qui déclenche une capability.

## 5.2 Ordre obligatoire

~~~text
1. contrôler méthode HTTP
2. contrôler taille de body
3. récupérer session serveur
4. dériver actorId
5. résoudre sourceModule
6. appliquer rate limit
7. parser le schema
8. classifier les données
9. appliquer privacy gate
10. créer requestId
11. créer traceId
12. persister si workflow long
13. créer ContextSnapshot
14. compiler intent
~~~

Une requête longue doit être persistée avant d'être exécutée.

## 5.3 États

~~~text
RECEIVED
→ AUTHENTICATED
→ GATED
→ CONTEXT_READY
→ PLANNING
→ QUEUED
→ RUNNING
→ VALIDATING
→ COMMITTED
→ COMPLETED
~~~

Branches terminales :
~~~text
REJECTED
CANCELLED
FAILED
EXPIRED
~~~

## 5.4 Route HTTP

~~~ts
export async function POST(req: Request) {
  const body = await req.json();

  const session = await getServerSession();
  if (!session?.user?.id) {
    return Response.json(
      { error: "UNAUTHENTICATED" },
      { status: 401 }
    );
  }

  const request = parseAIRequest(body, session.user.id);

  const gate = await requestGate(request);

  if (!gate.allowed) {
    return Response.json(
      { error: gate.code },
      { status: gate.httpStatus }
    );
  }

  const result = await aiOrchestrator.run(gate.request);

  return Response.json(result);
}
~~~

La route ne connaît aucun provider.

---

# 6. ACTOR RESOLVER

## Entrée
Session Supabase côté serveur.

## Règle
~~~text
actorId = session.user.id
~~~

Le body peut contenir une valeur différente : elle n'est jamais utilisée comme autorité.

## Test

Cas :
- utilisateur A connecté ;
- body actorId = utilisateur B ;
- résultat attendu = opération exécutée comme A ou rejetée selon policy ;
- jamais comme B.

---

# 7. DATA CLASSIFIER

## Algorithme

~~~text
SOURCE
→ OWNER
→ SENSITIVITY
→ DESTINATION
→ ALLOW / BLOCK
~~~

Exemples :

| Source | DataClass | External provider par défaut |
|---|---|---|
| prompt public | PUBLIC | possible |
| profil privé autorisé | PLAYER_PRIVATE | policy |
| DM | SENSITIVE | block par défaut |
| API key | SECRET | jamais |
| audit | AUDIT_ONLY | jamais |
| contexte calculé | AI_CONTEXT | policy |
| mémoire validée | AI_MEMORY | policy |

Une donnée SECRET ne peut jamais être déclassée.

---

# 8. CONTEXT ENGINE

## 8.1 Scopes

~~~text
SESSION
PLAYER
MODULE
ENTITY
TASK
CONVERSATION
MEMORY
GAME
CREATION
~~~

## 8.2 Algorithme

~~~text
INTENT
→ scopes nécessaires
→ charger refs
→ ownership/visibility
→ blocks/mutes
→ privacy filter
→ minimisation
→ relevance
→ provenance
→ taille
→ hash
→ expiry
→ ContextSnapshot
~~~

## 8.3 Contrat

~~~ts
export interface ContextSnapshot {
  snapshotId: string;
  requestId: string;
  entries: ContextEntry[];
  omittedCategories: string[];
  sourceRefs: string[];
  privacyClass: DataClass;
  contextHash: string;
  createdAt: string;
  expiresAt: string;
}
~~~

Le snapshot est immuable.

Nouvelle donnée importante :
~~~text
Snapshot v1 → Snapshot v2
~~~
et jamais :
~~~text
Snapshot v1 ← modification silencieuse
~~~

---

# 9. INTENT COMPILER

## 9.1 Sortie

~~~ts
export interface IntentSpec {
  goal: string;
  entities: string[];
  constraints: Constraint[];
  expectedOutput: string;
  sideEffects: string[];
  requiredCapabilities: string[];
  ambiguityScore: number;
  assumptions: string[];
  unresolvedQuestions: string[];
  privacyClass: DataClass;
  requestedAutonomy: AutonomyLevel;
  clarificationRequired: boolean;
}
~~~

## 9.2 Décisions

Question sans mutation :
~~~text
A0
~~~

Proposition :
~~~text
A1
~~~

Action avec effet limité :
~~~text
A2
~~~

Graphe borné :
~~~text
A3
~~~

Workflow long borné :
~~~text
A4
~~~

Ambiguïté irréversible :
~~~text
CLARIFY
~~~

Privacy interdite :
~~~text
DENY
~~~

---

# 10. REQUIREMENTS COMPILER

Le compiler transforme une intention en contraintes exécutables sans choisir de provider.

## Exemple

Entrée :
~~~text
Crée un petit jeu 3D de chasse partageable.
~~~

Sortie :

~~~json
{
  "platform": "browser",
  "rendering": "3D",
  "genre": "hunt",
  "coreLoop": ["find", "approach", "hunt", "result"],
  "targetSessionSeconds": 90,
  "shareable": true,
  "visualOriginalityRequired": true,
  "controls": ["keyboard", "touch"],
  "mobilePerformanceRequired": true,
  "sandboxRequired": true,
  "ownerModule": "M08",
  "runtimeModule": "M09"
}
~~~

Aucun provider n'est sélectionné ici.

---

# 11. REASONING ENGINE

Le reasoning peut utiliser :
- règles ;
- algorithmes locaux ;
- retrieval ;
- expérience validée ;
- provider externe.

Contrat :

~~~ts
export interface ReasoningResult {
  interpretation: string;
  assumptions: string[];
  candidatePlans: unknown[];
  unresolvedQuestions: string[];
  confidence: number;
  evidenceRefs: string[];
}
~~~

Le reasoning est une fonction de décision logique, pas une permission.

Interdit :
- mutation Supabase métier directe ;
- attribution de récompense ;
- changement de rôle ;
- publication d'un jeu ;
- modification d'un event ;
- accès secret.

---

# 12. PLANNER ET DAG

## 12.1 TaskNode

~~~ts
export interface TaskNode {
  taskId: string;
  graphId: string;
  nodeKey: string;

  capabilityId: string;
  capabilityVersion: string;

  dependencyIds: string[];

  inputRefs: string[];
  outputRefs: string[];

  resourceProfile: string;
  trustRequirement: string;

  timeoutMs: number;
  retryPolicy: string;

  idempotencyKey: string;
  validatorId: string;

  attempt: number;
  state: TaskState;
}
~~~

## 12.2 Vérifications avant exécution

~~~text
1. unique nodeKey
2. dependencies existantes
3. aucune dépendance interdite
4. topological sort
5. cycle detection
6. capability version active
7. validator existe
8. resources disponibles
9. privacy destination
10. idempotency key
~~~

Cycle :
~~~text
GRAPH_INVALID
~~~

Aucune exécution.

## 12.3 Exemple GameFactory

~~~text
T01 Requirements
↓
T02 GameSpecification
├── T03 Gameplay
├── T04 UI
├── T05 Assets
├── T06 Audio
└── T07 Tests
↓
T08 Build
↓
T09 Static validation
↓
T10 Simulation
↓
T11 Behavior tests
↓
T12 Package
↓
T13 Preview
↓
T14 Publish gate
~~~

---

# 13. POLICY ENGINE

## Input

~~~ts
{
  actor,
  sourceModule,
  action,
  dataClass,
  autonomy,
  destination,
  resourceBudget,
  executionTarget,
  confirmation
}
~~~

## Ordre

~~~text
identity
→ action existence
→ owner policy
→ safety
→ privacy
→ destination
→ quota
→ autonomy
→ confirmation
→ execution
~~~

## Output

~~~ts
type PolicyDecision =
  | "ALLOW"
  | "ALLOW_WITH_CONFIRMATION"
  | "DENY"
  | "DEGRADE";
~~~

Une sortie de modèle ne peut pas transformer DENY en ALLOW.

---

# 14. CAPABILITY REGISTRY

~~~ts
export interface CapabilityDefinition {
  id: string;
  version: string;

  inputSchema: unknown;
  outputSchema: unknown;

  policyClass: string;
  allowedTargets: ExecutionTarget[];

  validatorId: string;
  resourceClass: string;

  timeoutMs: number;
  maxConcurrency: number;
  maxPayloadBytes: number;

  health:
    | "HEALTHY"
    | "DEGRADED"
    | "DOWN"
    | "UNVERIFIED";
}
~~~

Versioning :
- contrat inchangé et compatible = minor/patch ;
- rupture = nouvelle major ;
- version déjà utilisée en production jamais modifiée silencieusement.

---

# 15. TOOL REGISTRY

~~~ts
export interface ToolDefinition {
  actionId: string;
  ownerModule: string;
  inputSchema: unknown;
  permission: string;

  confirmationMode: "NONE" | "REQUIRED";

  sideEffectClass:
    | "READ"
    | "LOCAL_WRITE"
    | "REMOTE_WRITE"
    | "IRREVERSIBLE";

  rateLimitPolicy: string;
  validatorId?: string;

  auditLevel:
    | "LOW"
    | "HIGH"
    | "CRITICAL";
}
~~~

Jamais de :
~~~text
execute_anything
fetch_any_url
write_any_file
run_any_code
~~~

À la place :
~~~text
get_profile
get_world_memory
generate_image
create_game_spec
validate_game
save_memory
~~~

---

# 16. PROVIDER ADAPTER CANONIQUE

~~~ts
export interface ProviderAdapter {
  id: string;

  supports(
    capability: string,
    modality?: string
  ): boolean;

  health(
    signal?: AbortSignal
  ): Promise<ProviderHealth>;

  execute(
    request: CanonicalProviderRequest,
    signal: AbortSignal
  ): Promise<CanonicalProviderResponse>;

  cancel?(
    executionId: string
  ): Promise<void>;
}
~~~

Flux :

~~~text
Canonical Request
→ provider mapping
→ provider HTTP
→ provider response
→ validation
→ canonical normalization
~~~

---

# 17. PROVIDER ROUTER

## 17.1 Hard filters

Éliminer avant scoring :
- capability incompatible ;
- privacy incompatible ;
- trust insuffisant ;
- CPU/RAM/GPU incompatibles ;
- réseau absent ;
- quota insuffisant ;
- deadline impossible ;
- health insuffisante ;
- provider UNVERIFIED.

## 17.2 Soft score

~~~text
health
+ latency
+ capacity
+ reliability
+ cost
+ fairness
~~~

Le score ne peut pas annuler un hard rejection.

---

# 18. POLLINATIONS

Documentation officielle :
https://gen.pollinations.ai/docs

La documentation actuelle décrit une API OpenAI-compatible et des capacités texte, image, vidéo, audio et embeddings.

Variables :
~~~text
POLLINATIONS_BASE_URL=https://gen.pollinations.ai
POLLINATIONS_API_KEY=<secret>
~~~

## 18.1 Chat

~~~text
POST https://gen.pollinations.ai/v1/chat/completions
~~~

Exemple :

~~~ts
const response = await fetch(
  "https://gen.pollinations.ai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.POLLINATIONS_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      stream: false
    }),
    signal
  }
);
~~~

## 18.2 Image

~~~text
https://gen.pollinations.ai/image/{URL_ENCODED_PROMPT}?model={model}
~~~

## 18.3 Audio

~~~text
https://gen.pollinations.ai/audio/{URL_ENCODED_PROMPT}
~~~

## 18.4 Embeddings

~~~text
POST https://gen.pollinations.ai/v1/embeddings
~~~

## 18.5 Model catalog

~~~text
GET https://gen.pollinations.ai/v1/models
~~~

Avant activation :
- modèle trouvé ;
- capability trouvée ;
- quota/limits lus ;
- schema de réponse validé ;
- health probe réussie.

---

# 19. OPENROUTER

Documentation :
https://openrouter.ai/developers

Base :
~~~text
https://openrouter.ai/api/v1
~~~

Variable :
~~~text
OPENROUTER_API_KEY=<secret>
~~~

## Chat

~~~text
POST https://openrouter.ai/api/v1/chat/completions
~~~

## Responses

~~~text
POST https://openrouter.ai/api/v1/responses
~~~

## Models

~~~text
GET https://openrouter.ai/api/v1/models
~~~

Code :

~~~ts
const response = await fetch(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization:
        "Bearer " + process.env.OPENROUTER_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      stream: false
    }),
    signal
  }
);
~~~

OpenRouter reste un provider/router externe. MORISE garde son propre Intent, Planner, Policy et Validation.

---

# 20. GEMINI

Documentation :
https://ai.google.dev/gemini-api/docs/interactions-overview

Google recommande actuellement Interactions API pour les nouveaux workflows agentiques et maintient generateContent.

Variable :
~~~text
GEMINI_API_KEY=<secret>
~~~

## Interactions

~~~text
POST https://generativelanguage.googleapis.com/v1beta/interactions
~~~

Stable :
~~~text
POST https://generativelanguage.googleapis.com/v1/interactions
~~~

## generateContent

~~~text
POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
~~~

Code REST generateContent :

~~~ts
const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/"
    + encodeURIComponent(model)
    + ":generateContent",
  {
    method: "POST",
    headers: {
      "x-goog-api-key": process.env.GEMINI_API_KEY!,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }),
    signal
  }
);
~~~

Pour un agent moderne, MORISE doit préférer Interactions lorsque le contrat de capability l'autorise.

---

# 21. HUGGING FACE INFERENCE PROVIDERS

Documentation :
https://huggingface.co/docs/inference-providers

Base OpenAI-compatible :
~~~text
https://router.huggingface.co/v1
~~~

Variable :
~~~text
HF_TOKEN=<secret>
~~~

Chat :
~~~text
POST https://router.huggingface.co/v1/chat/completions
~~~

Code :

~~~ts
const response = await fetch(
  "https://router.huggingface.co/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.HF_TOKEN,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages
    }),
    signal
  }
);
~~~

Le endpoint OpenAI-compatible documenté est actuellement destiné au chat completion ; les autres modalités doivent utiliser les interfaces/tasks Hugging Face correspondants au lieu de supposer la même route.

---

# 22. PUTER.JS

Documentation :
https://docs.puter.com/AI/chat/

CDN :
https://js.puter.com/v2/

NPM :
~~~text
@heyputer/puter.js
~~~

Installation :
~~~bash
npm install @heyputer/puter.js
~~~

Exemple client :
~~~html
<script src="https://js.puter.com/v2/"></script>
~~~

~~~ts
const result = await puter.ai.chat(
  "Hello",
  {
    model: "gpt-5.6-luna",
    stream: false
  }
);
~~~

Puter propose également image, speech, vidéo et d'autres capacités via son AI API.

Règles MORISE :
- client-side seulement lorsque la privacy destination est autorisée ;
- aucun secret MORISE ;
- aucun message privé non autorisé ;
- aucune mutation métier directe ;
- réponse serveur validée avant état critique.

---

# 23. AI HORDE

Documentation :
https://aihorde.net/api/

Base :
~~~text
https://aihorde.net/api
~~~

Swagger courant :
~~~text
https://aihorde.net/api/swagger.json
~~~

AI Horde est traité comme provider asynchrone si la capability choisie l'exige.

Flux :
~~~text
SUBMIT
→ REMOTE TASK ID
→ POLL STATUS
→ FETCH RESULT
→ VALIDATE
→ CANONICAL RESULT
~~~

Aucune route non présente dans le Swagger courant ne doit être codée.

Avant activation :
1. schema ;
2. auth ;
3. privacy ;
4. timeout ;
5. polling ;
6. cancellation ;
7. validation.

---

# 24. KILO AI GATEWAY

Documentation :
https://kilo.ai/docs/gateway

Base :
~~~text
https://api.kilo.ai/api/gateway
~~~

Variable :
~~~text
KILO_API_KEY=<secret>
~~~

Chat :
~~~text
POST https://api.kilo.ai/api/gateway/chat/completions
~~~

Models :
~~~text
GET https://api.kilo.ai/api/gateway/models
~~~

Code :

~~~ts
const response = await fetch(
  "https://api.kilo.ai/api/gateway/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.KILO_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      stream: false
    }),
    signal
  }
);
~~~

Le catalogue Kilo utilise un identifiant provider/model et la gateway est OpenAI-compatible.

---

# 25. PROVIDERS HISTORIQUES NON ACTIVÉS

Candidats historiques :
- LLM7 ;
- Vireonix ;
- Murakumo ;
- Quillly ;
- Cehpoint AI ;
- OVHcloud AI Endpoints ;
- DeepSeek direct ;
- nouveaux providers trouvés ensuite.

Règle : aucun endpoint ne doit être inventé.

Un provider passe de UNVERIFIED à ACTIVATED seulement après :
1. documentation officielle ;
2. endpoint exact ;
3. auth mode ;
4. schema request ;
5. schema response ;
6. privacy/terms ;
7. health probe ;
8. adapter contract test.

---

# 26. SECRET MANAGEMENT

Variables :

~~~text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY

POLLINATIONS_API_KEY
OPENROUTER_API_KEY
GEMINI_API_KEY
HF_TOKEN
KILO_API_KEY
~~~

Jamais :
~~~text
commit
GitHub source
client JS
NEXT_PUBLIC_SECRET_KEY
log d'erreur
analytics event
prompt
~~~

Les secrets sont lus uniquement dans le runtime serveur ou dans un environnement sécurisé du worker explicitement autorisé.

---

# 27. PROMPT COMPILER

Entrées dans cet ordre :

~~~text
SYSTEM POLICY
→ CAPABILITY CONTRACT
→ TOOL ALLOWLIST
→ APPROVED CONTEXT
→ USER INTENT
→ OUTPUT SCHEMA
~~~

Le contenu externe est une donnée non fiable.

Le modèle ne peut pas modifier :
- policy ;
- permissions ;
- tool definitions ;
- secret names/values ;
- owner authority.

---

# 28. STRUCTURED OUTPUT

Pipeline :

~~~text
provider response
→ parse
→ schema validation
→ semantic validation
→ policy validation
→ canonical normalization
~~~

Si parse/schema échoue :
- correction bornée ;
- nouvelle validation ;
- sinon INVALID_OUTPUT.

---

# 29. VALIDATION ENGINE

Validators :
~~~text
SCHEMA
POLICY
SECURITY
STATIC
TYPE
RUNTIME
BEHAVIOR
CONTENT
ARTIFACT
RESULT_INTEGRITY
~~~

Status :
~~~text
VALID
INVALID
DEGRADED
INCONCLUSIVE
~~~

INCONCLUSIVE n'est jamais automatiquement accepté.

---

# 30. RESULT INTEGRITY

Contrat :

~~~ts
export interface ValidatedResult {
  taskId: string;
  inputHash: string;
  outputHash: string;
  validatorId: string;
  validatorVersion: string;
  executionTarget: string;
  provenance: string[];
  status:
    | "VALID"
    | "INVALID"
    | "DEGRADED"
    | "INCONCLUSIVE";
  createdAt: string;
}
~~~

Un résultat tardif d'un task annulé est rejeté sauf mécanisme de reconciliation explicitement déclaré.

---

# 31. TOOL EXECUTION

Pipeline :

~~~text
MODEL REQUEST
→ resolve actionId
→ registry lookup
→ input schema
→ permission
→ privacy
→ confirmation
→ allowlisted function
→ result validator
→ tool result
~~~

Le modèle envoie un nom d'outil. Il ne choisit jamais un chemin de fichier système ou une URL arbitraire.

---

# 32. WORKER REGISTRY

Worker fields :

~~~text
workerId
ownerId
trustClass
capabilityManifest
softwareVersion
resourceProfile
health
consent
revokedAt
lastHeartbeat
~~~

Trusted Worker = machine explicitement autorisée.

Community Worker = opt-in.

---

# 33. COMMUNITY WORKER LIMITS

Par défaut :
~~~text
CPU <= 1 logical core
RAM <= 512 MiB
GPU = false
persistent storage = false
network = bounded
~~~

Interdit :
~~~text
Supabase service role
admin credentials
production secrets
raw private messages
unrestricted filesystem
~~~

---

# 34. LEASE SYSTEM

Contrat :

~~~ts
{
  taskId,
  leaseId,
  workerId,
  issuedAt,
  expiresAt,
  heartbeatAt
}
~~~

Expiration :
~~~text
lease expired
→ mark attempt stale
→ worker health decrement
→ requeue only if idempotent
→ otherwise reconciliation
~~~

Worker révoqué = aucune nouvelle lease et aucun renouvellement.

---

# 35. SANDBOX

Controls :
- CPU ;
- RAM ;
- disk ;
- filesystem ;
- outbound network ;
- process count ;
- time limit ;
- runtime ;
- syscall restrictions lorsque disponibles.

Tout code généré est considéré comme non fiable.

---

# 36. IDEMPOTENCE

Exemples :

Jeu :
~~~text
projectId + nodeKey + inputHash + capabilityVersion
~~~

Play result :
~~~text
sessionId + attemptId
~~~

Message :
~~~text
conversationId + clientMessageId
~~~

Même clé :
~~~text
return authoritative prior result
~~~

---

# 37. MEMORY SERVICE

~~~ts
export interface MemoryEntry {
  memoryId: string;
  scope: string;
  ownerId: string;

  sourceRef: string;
  dataClass: string;
  sensitivity: string;

  consentBasis?: string;

  confidence: number;
  utility: number;

  provenance: string[];

  createdAt: string;
  expiresAt?: string;
  deletePolicy: string;
}
~~~

Écriture autorisée :
- explicit remember ;
- état projet validé ;
- adaptation personnelle permise ;
- expérience mesurée ;
- expérience système approuvée.

Écriture interdite :
- secrets ;
- DM bruts comme mémoire globale ;
- hallucinations non validées ;
- sortie provider non vérifiée.

---

# 38. MEMORY RETRIEVAL

~~~text
query
→ scope
→ permission
→ data class
→ relevance
→ utility
→ freshness
→ provenance
→ context budget
→ ContextSnapshot
~~~

Une mémoire bloquée doit être supprimée avant le prompt compiler.

---

# 39. LEARNING

~~~text
OBSERVATION
→ NORMALIZATION
→ PATTERN
→ HYPOTHESIS
→ OFFLINE EVALUATION
→ POLICY
→ CANARY
→ PROMOTION / REJECTION
~~~

Evidence possibles :
- qualité création ;
- correction utilisateur ;
- completion d'un jeu ;
- validation traduction ;
- succès workflow ;
- résultat Convergence ;
- qualité recommandation.

Un simple compteur de clics n'est jamais suffisant à lui seul pour prouver une amélioration.

---

# 40. SELF-CORRECTION

~~~text
FAILURE
→ CLASSIFY
→ ROOT CAUSE HYPOTHESIS
→ MINIMAL CORRECTION
→ SANDBOX
→ TARGETED TEST
→ REGRESSION
→ BENCHMARK
→ ACCEPT / REJECT
~~~

Limits :
~~~text
maxDepth
maxDuration
maxAttempts
maxArtifacts
maxMutationScope
maxResourceCost
~~~

Même erreur en alternance :
~~~text
OSCILLATION_DETECTED
~~~

---

# 41. AI LAB

Autorisé :
- candidate branch ;
- tests ;
- fixtures ;
- approved datasets ;
- sandbox ;
- benchmarks ;
- candidate artifacts.

Interdit :
- production secret ;
- service role ;
- admin ;
- deployment direct ;
- paiement ;
- compte financier ;
- machine utilisateur non autorisée.

---

# 42. CODE EVOLUTION

~~~text
candidate workspace
→ static scan
→ dependency allowlist
→ typecheck
→ build
→ unit tests
→ integration tests
→ security tests
→ behavior tests
→ resource benchmark
→ baseline comparison
→ canary
→ monitor
→ promote
→ rollback
~~~

Condition de promotion :

~~~text
quality >= baseline requirement
AND security regression = none critical
AND policy regression = none
AND resource limits = pass
AND canary = pass
~~~

---

# 43. CREATIVE AI

Artifact contract :
~~~ts
{
  type,
  brief,
  quality,
  dimensions,
  duration,
  format,
  originalityPolicy,
  safetyClass,
  sourceRefs,
  destination
}
~~~

Pipeline :
~~~text
intent
→ requirements
→ originality/safety policy
→ router
→ provider
→ artifact storage
→ hash
→ provenance
→ validation
→ ArtifactRef
→ owner publication
~~~

Texte, image, vidéo, audio, musique et voice partagent le même pipeline de contrôle, mais conservent leurs validators spécialisés.

---

# 44. GAME CREATOR AI

~~~text
Player request
→ GameRequirements
→ GameSpecification
→ TaskGraph
→ M08 factory
→ M09 runtime
→ M06 PlaySession
→ validated result
→ M05/M14 consumers
~~~

M15 ne remplace pas M08/M09/M06.

---

# 45. LIVING OBJECTS / CONVERGENCE / WORLD MEMORY

M15 peut créer une proposition technique ou candidate.

La mutation durable appartient au module owner.

Chaque transformation conserve :
~~~text
owner
attribution
version
parent
branch
contributors
permissions
source refs
~~~

Convergence :
~~~text
authorized trajectories
→ candidate similarity
→ privacy filter
→ sensitive-attribute exclusion
→ anti-manipulation
→ confidence
→ proposal
~~~

World Memory :
~~~text
claim
+ source refs
+ validation evidence
+ confidence
+ attribution
+ scope
+ retention
+ correction path
~~~

---

# 46. TRANSLATION

Source canonical.

Cache key :
~~~text
sha256(sourceText) + targetLocale + policyVersion
~~~

No-translate :
~~~text
@handles
IDs
URLs
code
file paths
protected terms
brand IDs
game IDs
~~~

Pipeline :
~~~text
local/on-device
→ cache
→ client provider if permitted
→ server provider
→ graceful source-language fallback
~~~

---

# 47. OBSERVABILITY

Trace fields :

~~~text
requestId
traceId
module
capability
action
taskId
graphId
executionTarget
providerOrWorker
latency
resourceClass
policyDecision
validatorStatus
retryCount
errorClass
~~~

Ne pas enregistrer les conversations privées en clair dans les logs d'analytics généraux.

---

# 48. SUPABASE PERSISTENCE

Tables proposées :

~~~text
ai_requests
ai_context_snapshots
ai_task_graphs
ai_tasks
ai_task_attempts
ai_artifacts
ai_provider_health
ai_worker_registry
ai_worker_leases
ai_validation_reports
ai_memory_entries
ai_evaluation_runs
ai_improvement_candidates
~~~

Chaque table doit définir :
- primary key ;
- owner relation si nécessaire ;
- status ;
- created_at ;
- updated_at ;
- version ;
- retention metadata ;
- audit reference lorsque nécessaire.

RLS est obligatoire pour toute donnée exposée à des utilisateurs.

---

# 49. ROUTES HTTP

## POST /api/ai
- auth ;
- gate ;
- planning ;
- short execution ou graph creation.

Réponses :
~~~text
200 COMPLETED
202 ACCEPTED
400 INVALID
401 UNAUTHENTICATED
403 DENIED
409 CONFLICT
429 RATE_LIMITED
500 INTERNAL
503 DEGRADED
~~~

## GET /api/ai/tasks/:taskId
Projection autorisée du task.

Jamais :
- secret ;
- prompt interne complet ;
- raw private context ;
- admin diagnostic.

## GET /api/ai/providers/health
Admin/system scope seulement.

## GET /api/ai/capabilities
Retourne les capabilities publiées et leurs versions publiques.

---

# 50. PROVIDER HEALTH

Chaque adapter doit implémenter :

~~~ts
health(signal?: AbortSignal)
~~~

Check :
~~~text
timeout
→ HTTP status
→ response schema
→ latency
→ quota signal si disponible
→ normalize health
~~~

States :
~~~text
HEALTHY
DEGRADED
DOWN
UNVERIFIED
POLICY_BLOCKED
~~~

UNVERIFIED/POLICY_BLOCKED = no dispatch.

---

# 51. FALLBACK STRATEGY

Texte/reasoning :
~~~text
local
→ cache
→ trusted worker
→ Hugging Face / OpenRouter / Gemini / Pollinations
→ Kilo / autre provider vérifié
→ degraded
~~~

Image :
~~~text
cache/local transform
→ Pollinations
→ task-specific Hugging Face
→ Puter client si privacy compatible
→ degraded
~~~

Le choix est capability-first, privacy-first, policy-first.

---

# 52. ERROR RECOVERY MATRIX

| Error | Recovery |
|---|---|
| UNAUTHENTICATED | reject |
| INVALID_SCHEMA | reject |
| POLICY_DENIED | reject |
| PROVIDER_TIMEOUT | retry bounded / fallback |
| PROVIDER_5XX | health decrement / fallback |
| MALFORMED_OUTPUT | reject / bounded repair |
| VALIDATION_INVALID | correction / reject |
| WORKER_LOST | requeue if idempotent |
| LEASE_EXPIRED | reconcile / requeue |
| DB_CONFLICT | idempotent retry |
| GRAPH_INVALID | stop graph |
| OSCILLATION_DETECTED | stop correction |
| QUOTA_EXCEEDED | fallback / degraded |
| PRIVACY_BLOCKED | no same-policy bypass |
| UNVERIFIED_PROVIDER | no dispatch |

---

# 53. SECURITY TESTS

Obligatoires :
- forged actorId ;
- IDOR ;
- prompt injection ;
- tool injection ;
- secret leakage ;
- SSRF ;
- arbitrary URL fetch ;
- arbitrary code execution ;
- privilege escalation ;
- provider spoofing ;
- malicious dependency ;
- untrusted artifact ;
- result replay ;
- duplicate execution ;
- lease reuse after expiry.

---

# 54. TEST MATRIX

## Unit
Intent, requirements, policy, registry, scoring, idempotence, validators, memory filtering.

## Integration
Supabase, task transitions, provider adapters, memory retrieval, worker lease, artifact validation.

## Provider contract
Pour chaque provider :
- health ;
- request mapping ;
- response mapping ;
- 4xx ;
- 5xx ;
- timeout ;
- rate limit ;
- malformed response ;
- cancellation.

## E2E
~~~text
POST /api/ai
→ persist
→ plan
→ route
→ execute
→ validate
→ result
~~~

## Browser
- mobile ;
- desktop ;
- refresh ;
- deep link ;
- loading ;
- degraded ;
- network loss ;
- long task.

---

# 55. CODE D'UNE NOUVELLE CAPABILITY

Ordre exact :

~~~text
1. CapabilityDefinition
2. input/output schema
3. implementation/adapter
4. resource profile
5. policy
6. validator
7. test suite
8. observability
9. version
10. feature flag
11. canary
12. production
~~~

Ne pas coder seulement la logique principale. Toute capability doit arriver avec son contrôle.

---

# 56. CODE D'UN NOUVEAU PROVIDER

Ordre exact :

~~~text
1. documentation officielle
2. endpoint
3. auth mode
4. capability map
5. request schema
6. response schema
7. privacy contract
8. adapter class
9. health check
10. normalization
11. timeout
12. error mapping
13. test
14. router registration
15. canary
16. production
~~~

---

# 57. GARDES CONTRE LES DOUBLONS

Il n'existe qu'un :
- Request Gate ;
- Context Engine ;
- Intent Compiler ;
- Requirements Compiler ;
- Policy Engine ;
- Capability Registry ;
- Tool Registry ;
- Provider Router ;
- Validation Engine ;
- Memory Service ;
- Evolution pipeline.

Aucun module ne doit recréer localement une version concurrente de l'un de ces mécanismes.

Si une feature a besoin d'une règle AI commune :
~~~text
call central service
~~~
et non :
~~~text
copy central logic
~~~

---

# 58. SÉPARATION MASTER PLAN / TECHNICAL DESIGN

AI_MASTER_PLAN.md :
- mission ;
- architecture ;
- règles générales ;
- capability families ;
- provider catalogue ;
- ownership ;
- invariants ;
- DONE global.

AI_TECHNICAL_DESIGN.md :
- types ;
- files ;
- algorithms ;
- state machines ;
- endpoint code ;
- provider adapters ;
- database ;
- errors ;
- tests ;
- implementation order.

Un mécanisme détaillé ne doit pas être copié dans les deux fichiers.

---

# 59. ORDRE D'ASSEMBLAGE POUR L'IA DÉVELOPPEUSE

~~~text
STEP 1  core/types.ts
STEP 2  request-gate.ts
STEP 3  actor.ts
STEP 4  classifier.ts
STEP 5  context.ts
STEP 6  intent.ts
STEP 7  requirements.ts
STEP 8  reasoning.ts
STEP 9  planner.ts
STEP 10 policy.ts
STEP 11 capabilities
STEP 12 tools
STEP 13 providers/types.ts
STEP 14 provider adapters
STEP 15 router
STEP 16 validation
STEP 17 tasks/workers
STEP 18 memory
STEP 19 evolution
STEP 20 API routes
STEP 21 Supabase migrations
STEP 22 unit tests
STEP 23 provider contract tests
STEP 24 integration tests
STEP 25 E2E
STEP 26 security tests
STEP 27 canary
STEP 28 production
~~~

Une étape ne doit pas être considérée terminée si son contrat, test et observability manquent.

---

# 60. DEFINITION OF DONE

MORISE AI est techniquement complète lorsque :
1. Piece A produit des plans indépendants des providers ;
2. Piece B n'exécute que des tools/capabilities allowlistés ;
3. Piece C valide avant tout effet durable ;
4. chaque provider est isolé par adapter ;
5. aucun secret n'est exposé au navigateur ;
6. chaque task critique est idempotente ;
7. chaque résultat critique est traçable ;
8. chaque mémoire possède scope/owner/retention ;
9. chaque correction est bornée ;
10. chaque évolution possède baseline/benchmark/canary/rollback ;
11. chaque provider activé a une source officielle, URL, auth, health et test ;
12. aucune seconde instance d'un mécanisme central n'existe.
