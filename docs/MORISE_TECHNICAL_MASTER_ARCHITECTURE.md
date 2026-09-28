# MORISE — CONCEPTION TECHNIQUE MAÎTRE 1→15

**Date:** 2026-09-29  
**Statut:** architecture technique canonique d’implémentation  
**Source fonctionnelle:** `docs/MORISE_MASTER_PLAN_V3.md`  
**Point de travail:** **MODULE 6 — PLAY / FINAL QA**

> Ce document complète le Master Plan. Il ne le remplace pas. Les modules 1→15 restent la structure fonctionnelle; les services IA, Memory Vault, traduction, médias, économie, sécurité et infrastructure sont des briques transversales orchestrées par le SYSTEM.

## 0. Règle architecturale absolue

`PEU DE PORTES UTILISATEUR → SYSTEM IA ORCHESTRE → CAPACITÉS INTERNES → EXPÉRIENCE CONTEXTUELLE`

Une capacité n’est jamais confondue avec son fournisseur. Une capacité peut être exécutée par navigateur, WebAssembly/WebGPU, ordinateur local, serveur, cloud ou API. Si aucun chemin n’est disponible, elle passe en `PENDING_DEPENDENCY`/`UNAVAILABLE` sans casser MORISE.

Le PLAYER demande un résultat. Le SYSTEM choisit le chemin technique autorisé. Le compte OWNER/Superadmin conserve le contrôle de la politique, des rôles, des fournisseurs, des seuils, des permissions et des activations.

---

# 1. MODULE 1 — FOUNDATION

**Mission:** fondation web, identité, configuration, navigation minimale, sécurité, observabilité, internationalisation et système de capacités.

**Sous-systèmes:** bootstrap, runtime config, routing, auth/session, database, storage, capability registry, dependency registry, feature flags, error boundary, telemetry, i18n, security policy.

**Contrats:** `AppBoot`, `SessionContext`, `Capability`, `Dependency`, `FeatureState`, `AuditEvent`, `LocaleContext`.

**Invariants:** aucun secret client; dépendance optionnelle non bloquante; langue indisponible → anglais; erreur récupérable; OWNER identifié avant administration.

**Tests:** boot sans services optionnels, session expirée, fallback anglais, réseau indisponible, configuration manquante, mobile.

---

# 2. MODULE 2 — PLAYER

**Mission:** identité, profil, progression, préférences et contexte autorisé du PLAYER.

**Sous-systèmes:** profile, preferences, progression, achievements/titles, history, privacy settings, device capability profile, personal-memory references.

**Données:** `profiles`, `player_progress`, `player_preferences`, `player_titles`, `player_events`, `privacy_preferences`.

**IA:** uniquement signaux autorisés et non sensibles nécessaires à l’expérience; aucun profilage psychologique caché.

**Tests:** création/modification profil, permissions, progression idempotente, récupération session, export/suppression selon politique.

---

# 3. MODULE 3 — SOCIAL

**Mission:** feed, posts, réactions, commentaires, conversations privées et partage contrôlé.

**Sous-systèmes:** social graph, feed, posts, comments/reactions, private messaging, translation, sharing permissions, moderation hooks, notifications.

**Traduction privée:** `message → permission → langue → cache → moteur local/browser → fallback autorisé → rendu`. Le contenu privé ne part jamais vers un fournisseur non autorisé.

**Tests:** RLS, conversation privée, blocage, traduction, révocation, rate-limit et partage.

---

# 4. MODULE 4 — WORLD

**Mission:** monde persistant/réactif, mémoire du monde, objets vivants, agents, anomalies et évolution.

**Sous-systèmes:** world state, world memory, Living Objects, World Agents, environment rules, anomaly engine, evolution engine, convergence, snapshots/versioning.

**Flux:** `PLAYER EVENT → RULE → WORLD STATE → VALIDATION → WORLD MEMORY → FUTURE EXPERIENCE`.

Chaque modification importante possède provenance et version. Les événements privés ne deviennent jamais automatiquement publics.

---

# 5. MODULE 5 — SYSTEM / PROGRESSION

**Mission:** couche intelligente qui comprend le contexte, révèle progressivement les possibilités et coordonne la progression.

**Sous-systèmes:** intent resolver, context resolver, progression rules, title/unlock engine, recommendation engine, AI orchestration, contextual UI, alert planner, deterministic decision layer.

**Pipeline:** `INTENT → CONTEXT → POLICY → CAPABILITY → DEPENDENCY → DECISION → ACTION → VALIDATION → EVENT`.

Pas de bouton technique pour chaque capacité interne.

---

# 6. MODULE 6 — PLAY / FINAL QA

**Mission:** exécution des expériences jouables et point actuel du projet.

**Sous-systèmes:** experience runtime, game session, input, state machine, challenge engine, scoring, deterministic randomness, replay/event log, adaptive difficulty, result validation, First Contact, MORISE Moment, Relay/Living Stories.

**First Contact:** environ 120 secondes: action → conséquence → découverte → possibilité → réaction SYSTEM.

**Play contract:** `createSession()`, `loadExperience()`, `acceptInput()`, `validateAction()`, `applyRule()`, `persistEvent()`, `renderReaction()`, `finishOrContinue()`.

**Final QA:** aucun écran blanc; parcours principaux; mobile; réseau dégradé; reprise après interruption; dépendances absentes isolées; progression fiable.

---

# 7. MODULE 7 — GAME DISCOVERY ENGINE

**Mission:** découvrir, sélectionner, composer et recommander des expériences.

**Pipeline:** `DISCOVERY REQUEST → CANDIDATES → POLICY FILTER → CAPABILITY CHECK → RANKING → EXPERIENCE PLAN → PLAY`.

**Entrées:** contexte de session, catalogue d’expériences, historique autorisé, objectifs explicites, monde et disponibilité des capacités.

**Règle:** aucune fausse personnalisation. Chaque recommandation doit avoir une cause traçable. Sans IA, sélection déterministe équilibrée.

---

# 8. MODULE 8 — GAME A→Z FACTORY

**Mission:** créer une expérience complète à partir d’une spécification.

**Pipeline:** `IDEA → SPEC → RULES → CONTENT → SCENE → LOGIC → ASSETS → VALIDATION → VERSION → PUBLISH/PRIVATE`.

**Création:** puzzle, aventure, narratif, 2D, 3D, musique, interaction et remix.

**Validation:** règles cohérentes, ressources présentes, permissions, sécurité, performance et absence de données privées involontaires.

**Versioning:** une publication est immuable; une modification produit une nouvelle version.

---

# 9. MODULE 9 — SHARED GAME ENGINE

**Mission:** moteur commun réutilisable par toutes les expériences.

**Composants:** entity system, scene graph, input abstraction, interaction/collision, rule execution, timers, deterministic seed, save/checkpoint, replay events, audio hooks, rendering adapter, multiplayer-ready events.

Le contenu dépend d’interfaces stables et non d’un renderer spécifique.

**Performance:** progressive enhancement; chemin léger pour appareils faibles, rendu avancé si supporté.

---

# 10. MODULE 10 — SOCIAL GAMING

**Mission:** co-play, défis asynchrones, objectifs partagés, équipes et récompenses collectives.

**Architecture:** serveur autoritaire pour résultats, propriété, récompenses et classements; client pour interaction/rendu.

**Anti-abus:** idempotency keys, rate limits, détection d’événements dupliqués, validation serveur et journalisation.

---

# 11. MODULE 11 — COMMUNITIES

**Mission:** guildes, groupes, communautés et collaboration.

**Sous-systèmes:** community, membership, roles, permissions, community feed, events, moderation, collective progression, community memory.

**Hiérarchie:** OWNER global → ADMIN → MODERATOR → rôles communautaires → PLAYER. Une permission communautaire ne dépasse jamais la politique globale.

Les découvertes collectives utilisent uniquement des signaux autorisés, validés et non sensibles.

---

# 12. MODULE 12 — EVENTS

**Mission:** événements temporaires, saisons, expériences collectives et événements émergents.

**Cycle:** `TEMPLATE → CONFIG → ELIGIBILITY → LIVE → PARTICIPATION → VALIDATION → RESULT → ARCHIVE`.

**Types:** système, communautaire, individuel, saisonnier, émergent, création PLAYER, mondial.

Les horaires sont stockés sans ambiguïté; le serveur reste l’autorité sur l’état actif.

---

# 13. MODULE 13 — ADAPTIVE WORLD

**Mission:** faire évoluer MORISE à partir d’événements réels et validés.

**Sous-systèmes:** World Memory, Evolution Engine, Living Objects, Convergence, emergent missions, adaptive encounters, World Agents, state snapshots.

**Boucle:** `ACTION → VALIDATION → WORLD SIGNAL → RULE EVALUATION → WORLD CHANGE → CONSEQUENCE`.

L’IA ne réécrit pas silencieusement l’historique. Les transitions sont versionnées et auditées.

---

# 14. MODULE 14 — COLLECTION / REWARD ECONOMY

**Mission:** collections, titres, objets, récompenses et économie interne.

**Sous-systèmes:** collection registry, rarity rules, reward ledger, titles, achievements, creator milestones, anti-fraud, economy policy, advertising/affiliate adapters.

Les récompenses importantes sont idempotentes et vérifiables. Les probabilités de rareté sont versionnées.

**Seuils OWNER:** lorsqu’un ou plusieurs PLAYERS atteignent un seuil configuré, un événement d’alerte OWNER est créé. Un seuil ne signifie pas automatiquement revenu financier.

**Monétisation:** bannières discrètes, affiliation, sponsoring ou futurs adapters; aucun fournisseur publicitaire hard-codé dans le cœur.

---

# 15. MODULE 15 — META SYSTEM + AI LAB

**Mission:** laboratoire des capacités futures, expérimentation contrôlée, évaluation, apprentissage orchestré et évolution du SYSTEM.

**Sous-systèmes:** AI Orchestrator, capability registry, provider registry, experiment registry, evaluation, benchmark, model/prompt versioning, learning candidates, rollout gates, rollback, research sandbox.

**Learning loop:** `OBSERVATION → DATASET AUTORISÉ → CANDIDATE → OFFLINE EVALUATION → SAFETY/POLICY CHECK → CANARY → METRICS → APPROVE/ROLLBACK`.

Aucun signal utilisateur ne modifie silencieusement la production.

---

# 16. BRIQUES TRANSVERSALES

## AI Orchestrator
Unifie les capacités 1→15. Sélectionne Browser AI, local, cloud ou API selon politique, appareil, confidentialité, coût et disponibilité.

## Memory Vault
Stockage privé des photos, vidéos, audio, textes, créations et MORISE Moments.

Conceptuellement: `memory_items`, `memory_collections`, `memory_collection_items`, `memory_moments`.

Privé par défaut; partage explicite; export/suppression contrôlés; analyse IA uniquement dans le contexte autorisé.

## Media abstraction
Image, musique, audio et vidéo sont des capacités, pas des dépendances obligatoires. Chaque capacité possède adapters, état de santé et fallback.

## Translation abstraction
20 langues: `fr,en,hi,es,de,it,pt,ar,ja,ko,ru,tr,id,th,vi,pl,nl,ro,bn,ur`. Fallback UI anglais. Cache avant nouveau calcul.

## Infrastructure abstraction
Browser/WebAssembly/WebGPU, ordinateur local, serveur, cloud et API sont interchangeables derrière des adapters. Cloudflare AI et l’ordinateur local restent optionnels tant qu’ils ne sont pas configurés.

## Feature states
`PLANNED → PENDING_DEPENDENCY → AVAILABLE → CONFIGURED → AUTHORIZED → ENABLED → EXECUTING → DEGRADED/ERROR`.

## OWNER/Superadmin
Le compte déjà créé est le compte OWNER/Superadmin principal. Il contrôle rôles, administrateurs, modérateurs, capacités, fournisseurs, maintenance, seuils, économie, sécurité et audit.

---

# 17. CONTRATS COMMUNS

```ts
interface Capability {
  id: string;
  version: string;
  status: CapabilityStatus;
  requiredDependencies: string[];
  optionalDependencies: string[];
  providers: string[];
  fallbacks: string[];
  privacyClass: string;
}

interface CapabilityRequest<T> {
  capabilityId: string;
  actorId: string;
  input: T;
  contextId?: string;
  idempotencyKey?: string;
}

interface CapabilityResult<T> {
  status: 'success' | 'pending' | 'degraded' | 'unavailable' | 'error';
  data?: T;
  provider?: string;
  fallbackUsed?: string;
  eventId?: string;
  reason?: string;
}
```

---

# 18. PERSISTENCE

Séparer conceptuellement: auth/identité, PLAYER, social, world, game, communities, events, collections/rewards, memories, provider/dependency state et audit.

Les données utilisateur utilisent des politiques d’accès strictes/RLS. Les médias lourds utilisent un stockage objet approprié plutôt que des blobs relationnels arbitraires.

---

# 19. ADMIN CONTROL PLANE

Le panneau Superadmin expose des contrôles de niveau politique: état global, capacités, dépendances, santé providers, rôles, seuils, événements, économie, publicité, sécurité, audit et maintenance.

Exemple:

```text
VIDEO_GENERATION
status: PENDING_DEPENDENCY
reason: aucun provider autorisé
fallback: WEB_COMPOSITION
```

Le PLAYER ne voit pas cette complexité.

---

# 20. SÉCURITÉ

Auth; autorisation serveur; RLS; validation entrée/sortie; rate limits; idempotence; audit des actions sensibles; secrets uniquement côté serveur/environnement sécurisé; séparation public/privé; permissions média vérifiées à l’accès; aucune suppression silencieuse; aucune utilisation publicitaire implicite des médias privés.

---

# 21. OBSERVABILITÉ

Chaque opération importante peut produire: `capability → provider → reason → latency → result → fallback → event`.

Les logs évitent le contenu des conversations privées et médias personnels.

---

# 22. TESTS

Chaque module doit avoir tests unitaires, intégration, permissions, récupération d’erreur, E2E, responsive/mobile lorsque pertinent, dépendance absente et régression.

Le FINAL QA du Module 6 vérifie également les interfaces avec les modules 1→15, même si certains modules futurs restent désactivés.

---

# 23. MATRICE D’ACTIVATION

| Module | Sans IA externe | Sans Cloudflare AI | Infrastructure future possible | Fallback |
|---|---|---|---|---|
| 1 Foundation | Oui | Oui | Non | Oui |
| 2 Player | Oui | Oui | Oui | Oui |
| 3 Social | Oui | Oui | Traduction/IA | Oui |
| 4 World | Oui | Oui | IA/agents | Oui |
| 5 System | Partiel | Oui | IA avancée | Oui |
| 6 Play | Oui pour déterministe | Oui | IA générative | Oui |
| 7 Discovery | Oui règles | Oui | IA ranking | Oui |
| 8 Factory | Oui templates | Oui | modèles créatifs | Oui |
| 9 Shared Engine | Oui | Oui | GPU | Oui |
| 10 Social Gaming | Oui | Oui | temps réel | Oui |
| 11 Communities | Oui | Oui | IA modération | Oui |
| 12 Events | Oui | Oui | IA génération | Oui |
| 13 Adaptive World | Oui règles | Oui | IA/agents | Oui |
| 14 Economy | Oui | Oui | régies/affiliation | Oui |
| 15 AI Lab | Oui évaluation | Oui | providers IA | Oui |

---

# 24. ORDRE D’IMPLÉMENTATION

Le Master Plan reste au **Module 6**. Une architecture 1→15 ne signifie pas activation simultanée.

`1 → 2 → 3 → 4 → 5 → 6`

puis:

`7/8/9 → 10/11/12 → 13/14 → 15`

Une infrastructure n’est ajoutée que lorsqu’elle est réellement nécessaire. Une solution locale/déterministe est préférée lorsqu’elle satisfait le besoin sans introduire une dépendance inutile.

---

# 25. CRITÈRE PRODUCTION

Une fonctionnalité est prête lorsque son contrat, état, dépendances, permissions, fallback, persistance, gestion d’erreur, tests, comportement mobile, activation/désactivation, observabilité et protection des données sont vérifiés.

**RÉFÉRENCE:** `docs/MORISE_MASTER_PLAN_V3.md` reste la source de vérité fonctionnelle. Ce document décrit comment construire et connecter les 15 modules.

**POSITION ACTUELLE: MODULE 6 — PLAY / FINAL QA.**
