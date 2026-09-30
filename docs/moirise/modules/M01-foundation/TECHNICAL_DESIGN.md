# M01 — FOUNDATION — CONCEPTION TECHNIQUE DÉTAILLÉE

## 0. Statut

Document technique canonique du M01. `PLAN.md` définit le comportement fonctionnel ; ce document définit les contrats techniques nécessaires pour l'implémentation, l'intégration et la validation.

## 1. Responsabilité

M01 fournit le socle invisible de MOIRISE : bootstrap, configuration, session boundary, routing, design system, états de récupération, événements, capability contracts, AI Gateway boundary, stockage abstrait, feature flags, observabilité, santé et sécurité primitive.

M01 ne possède aucune logique métier de réseau social, jeu, monde, récompense ou apprentissage. Il doit pouvoir démarrer sans qu'un provider IA soit disponible.

## 2. Architecture

```text
App Shell
├─ Config
├─ Session Boundary
├─ Router
├─ Layout / Design System
├─ Error Boundary
├─ Loading / Empty / Degraded States
├─ Event Bus
├─ Capability Registry
├─ AI Gateway
├─ Provider Contract
├─ Storage Abstraction
├─ Feature Flags
├─ Observability
├─ Security Boundary
└─ Health State
```

Règle : M01 peut être importé par les modules, mais M01 ne doit pas importer leur logique métier.

## 3. Bootstrap

```text
PROCESS START
→ LOAD STATIC CONFIG
→ VALIDATE CONFIG
→ INITIALIZE ERROR REPORTING
→ INITIALIZE FEATURE FLAGS
→ INITIALIZE STORAGE ADAPTER
→ RESTORE SESSION IF POSSIBLE
→ INITIALIZE ROUTER
→ REGISTER CORE EVENTS
→ REGISTER CAPABILITY DESCRIPTORS
→ INITIALIZE HEALTH STATE
→ MOUNT APP SHELL
→ RESOLVE ROUTE
→ READY
```

Une dépendance optionnelle indisponible produit `READY_DEGRADED`. Une panne du shell produit une erreur récupérable et diagnostiquable.

## 4. Configuration

Le contrat `AppConfig` sépare environnement, configuration publique, feature flags, timeouts, capacités et paramètres non secrets. Les clés privées, service-role keys et secrets provider ne doivent jamais être compilés dans le bundle client.

Validation au démarrage : types, valeurs autorisées, présence des paramètres obligatoires et compatibilité de version. Une configuration invalide produit `CONFIG_INVALID` et empêche seulement les parties dépendantes de démarrer lorsque cela est possible.

## 5. Routing

Le router connaît les portes de haut niveau : SYSTEM, PLAYER, SOCIAL, WORLD, PLAY et CREATE. Une capability interne ne crée pas automatiquement une route.

Les messages privés, groupes, collections, événements et outils secondaires peuvent utiliser des sous-vues, drawers, dialogs ou sous-routes. La complexité interne ne doit pas devenir une multiplication de boutons.

Deep-link et route inconnue doivent avoir des comportements testés. Une route inconnue ne doit pas produire un écran blanc.

## 6. Design System

Primitives partagées : Button, Card, Dialog, Drawer, Input, Avatar, Badge, Progress, Toast, Skeleton, ErrorState, EmptyState.

Chaque primitive doit définir API, états, accessibilité, responsive behavior et tests critiques. Un module ne recrée pas une primitive déjà canonique sans raison documentée.

## 7. États de récupération

Tout écran critique doit pouvoir représenter : `loading`, `ready`, `empty`, `error`, `degraded` et, lorsque pertinent, `offline`.

Une erreur technique doit être transformée en état UI exploitable. Le détail technique reste dans l'observabilité.

## 8. Event Bus

Contrat minimal :

```ts
interface SystemEventEnvelope<TPayload> {
  eventId: string;
  eventType: string;
  schemaVersion: number;
  occurredAt: string;
  moduleId: string;
  actorId?: string;
  requestId: string;
  payload: TPayload;
}
```

Le bus découple les réactions ; il ne remplace pas les données canoniques. Exemples : `PLAYER_CREATED`, `POST_CREATED`, `MESSAGE_SENT`, `GROUP_CREATED`, `GAME_STARTED`, `GAME_COMPLETED`, `AI_REQUESTED`, `AI_COMPLETED`, `MEDIA_CREATED`, `REWARD_GRANTED`.

## 9. Idempotence

Toute opération pouvant être répétée doit avoir une stratégie d'idempotence. Conceptuellement :

```text
requestId + operationId
→ idempotency key
→ first execution commits
→ duplicate execution returns prior result
```

Cette règle s'applique notamment aux rewards, publications, créations de groupes, créations de jeux, jobs IA et tâches distribuées.

## 10. Capability Registry

Contrat minimal :

```ts
interface CapabilityDefinition {
  id: string;
  version: string;
  inputSchema: string;
  outputSchema: string;
  policyClass: string;
  executionTargets: string[];
  resourceClass: string;
  validatorId: string;
  enabled: boolean;
}
```

M01 publie les contrats ; M15 possède l'orchestration et la sélection des capacités.

## 11. AI Gateway

Aucune UI ne doit appeler directement un provider.

```text
UI / MODULE
→ AI Gateway
→ typed AI request
→ M15 orchestration
→ capability
→ resource/provider selection
→ result
→ validation
→ module
```

Le Gateway est une frontière technique, pas un cerveau parallèle.

## 12. Provider Contract

M01 définit le contrat partagé. M15 utilise le registre réel.

Un provider doit exposer au minimum : id, adapterVersion, capabilities, executionMode, authMode, health, quota metadata, provenance policy et schemas supportés.

Une URL seule ne constitue jamais une intégration validée. Il faut vérifier endpoint, auth, capacité, quotas, licence/provenance, sécurité et compatibilité du contrat.

## 13. Storage Abstraction

Les composants UI ne doivent pas multiplier les accès directs à la base. Les repositories/services encapsulent les opérations autorisées.

```ts
interface Repository<T, TQuery> {
  get(query: TQuery): Promise<T | null>;
  list(query: TQuery): Promise<T[]>;
  create(input: unknown): Promise<T>;
  update(id: string, input: unknown): Promise<T>;
}
```

Cette abstraction ne remplace jamais les RLS et permissions serveur.

## 14. Feature Flags

États : `disabled`, `internal`, `beta`, `enabled`, `deprecated`.

Chaque flag possède un propriétaire, une raison, une date/condition de retrait lorsque pertinent et un comportement de fallback. Une capability expérimentale doit pouvoir être désactivée sans casser le shell.

## 15. Observabilité

Les traces techniques utilisent au minimum requestId, traceId, moduleId, operation, latency, outcome, error class, capabilityId et executionTarget.

Ne pas journaliser inutilement secrets, tokens, contenu privé intégral ou données sensibles.

## 16. Health

États : `UNKNOWN`, `HEALTHY`, `DEGRADED`, `UNAVAILABLE`.

Une dépendance facultative indisponible ne doit pas rendre indisponible l'ensemble de MOIRISE. Les composants dépendants doivent recevoir un état déterministe et un fallback lorsqu'il existe.

## 17. Sécurité

M01 impose :

- secrets hors client ;
- validation des entrées ;
- autorisation critique côté serveur ;
- absence d'exécution arbitraire depuis une entrée utilisateur ;
- isolation des capacités sensibles ;
- aucun service-role dans le bundle ;
- aucun endpoint provider arbitraire fourni par le client ;
- aucun worker considéré comme autorité métier ;
- logs minimisés.

## 18. Performance

Le shell doit utiliser lazy routes et lazy capabilities. Aucun appel IA n'est nécessaire au boot. La mémoire complète, les médias lourds et les engines de jeu ne doivent pas être chargés par défaut.

## 19. Responsive

Une logique métier unique doit servir mobile, tablette et desktop. Les tests doivent couvrir au minimum petits écrans mobiles, tablette et desktop large. Les primitives ne doivent pas dépendre d'une résolution particulière.

## 20. Erreurs typées

Exemples :

`CONFIG_INVALID`
`SESSION_RESTORE_FAILED`
`ROUTE_NOT_FOUND`
`CAPABILITY_UNAVAILABLE`
`PROVIDER_UNAVAILABLE`
`STORAGE_UNAVAILABLE`
`UNAUTHORIZED`
`VALIDATION_FAILED`
`INTERNAL_ERROR`

L'interface traduit ces états en messages utilisateur compréhensibles ; les détails de diagnostic restent dans les traces.

## 21. Tests unitaires

- configuration valide/invalide ;
- résolution de route ;
- route inconnue ;
- Event Bus et schemaVersion ;
- idempotence ;
- Capability Registry ;
- feature flags ;
- mapping d'erreurs ;
- health transitions ;
- AI Gateway contract ;
- primitives UI critiques.

## 22. Tests d'intégration

Cas minimal :

```text
boot → config → session → router → shell
```

Cas de dégradation :

```text
module
→ AI Gateway
→ capability request
→ provider unavailable
→ fallback/degraded
→ UI récupérable
```

Cas de sécurité :

```text
client input
→ validation
→ authorization
→ permitted action OR rejection
```

## 23. Tests de non-régression

Une nouvelle capability ou un nouveau module ne doit pas :
- casser le boot ;
- créer une route implicite ;
- appeler directement un provider depuis l'UI ;
- exposer un secret ;
- contourner une permission ;
- produire un écran blanc ;
- rendre M01 dépendant d'un module métier.

## 24. Critères d'acceptation

M01 est terminé uniquement si le shell démarre sans providers IA, les portes principales sont montables, les états de récupération sont testés, Event Bus et Capability Registry sont testés, AI Gateway est sécurisé, les secrets sont absents du bundle, les feature flags fonctionnent, le responsive critique est vérifié et le build/tests passent.

## 25. Non-responsabilités

M01 ne décide pas du contenu à recommander, des groupes à créer, des récompenses, du jeu à générer, du provider métier à choisir, de l'apprentissage IA ou de l'évolution du monde. Ces responsabilités appartiennent aux modules canoniques et à M15 selon leurs contrats.
