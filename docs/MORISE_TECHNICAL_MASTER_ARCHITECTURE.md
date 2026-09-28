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


# 30. DETAILED IMPLEMENTATION CONTRACT — MODULES 1→15

Cette partie rend la conception technique concrète. Elle décrit, pour chaque module, les responsabilités logicielles, les données, les services, les flux, les états, les permissions, les dépendances, les fallbacks et la validation attendue. Elle ne crée pas de nouvelle fonctionnalité produit au-delà du Master Plan.

---

## MODULE 1 — FOUNDATION — CONTRACT D'IMPLÉMENTATION

### Entrées
- configuration runtime;
- session d'authentification;
- requêtes de route;
- environnement navigateur;
- configuration des fournisseurs;
- configuration des capacités.

### Sorties
- identité authentifiée;
- contexte runtime;
- profil minimum;
- registre de capacités disponible;
- registre de dépendances;
- erreurs normalisées.

### Services obligatoires
1. Auth service
2. Session service
3. Profile bootstrap service
4. Runtime config service
5. Storage adapter
6. Capability registry
7. Dependency registry
8. Error service
9. Health service
10. Telemetry service

### Flux critique
1. L'application démarre.
2. Runtime config est validé.
3. Session est restaurée.
4. L'utilisateur courant est identifié.
5. Le profil applicatif est vérifié ou créé de façon idempotente.
6. Les capacités et dépendances sont chargées.
7. Les routes protégées sont déterminées.
8. Le SYSTEM reçoit le contexte de base.

### Erreurs
- configuration absente;
- session invalide;
- bootstrap interrompu;
- DB indisponible;
- stockage indisponible.

### Fallback
Une panne d'une dépendance non critique ne doit pas empêcher l'affichage de la shell applicative.

### Tests de contrat
- double bootstrap;
- refresh pendant bootstrap;
- double tab;
- session expirée;
- RLS;
- configuration manquante;
- route privée sans session.

---

## MODULE 2 — PLAYER — CONTRACT D'IMPLÉMENTATION

### Entrées
- identité;
- préférences explicites;
- langue;
- fuseau horaire;
- choix d'accessibilité;
- préférences de confidentialité;
- contexte appareil.

### Sorties
- Player Context;
- visibilité du profil;
- règles de confidentialité;
- profil appareil;
- préférences de présentation SYSTEM.

### Services
- PlayerService
- PreferencesService
- PrivacyService
- DeviceCapabilityService
- BlockService
- ReportService

### Player Context
Le contexte transmis au SYSTEM doit distinguer:
- données publiques;
- préférences;
- données privées;
- signaux de gameplay autorisés;
- capacité appareil.

Aucune fusion implicite avec un profil psychologique.

### États de profil
- ACTIVE
- RESTRICTED
- SUSPENDED
- DELETED_PENDING
- DELETED

### Validation
Tout changement sensible est validé côté serveur.

---

## MODULE 3 — SOCIAL + PRIVATE MESSAGING — CONTRACT D'IMPLÉMENTATION

### Entrées
- texte;
- pièces jointes;
- destinataires;
- conversation;
- droits de visibilité;
- langue source.

### Sorties
- post;
- message;
- notification;
- traduction dérivée;
- statut delivered/read;
- événement social.

### Pipeline message
1. Autoriser l'expéditeur.
2. Vérifier l'appartenance à la conversation.
3. Valider le contenu et les pièces jointes.
4. Persister le message original.
5. Émettre MessageCreated.
6. Déclencher les notifications autorisées.
7. Traduire seulement si nécessaire.
8. Mettre en cache la traduction.
9. Ne jamais remplacer l'original.

### Traduction
La traduction est un service secondaire. Le chat ne dépend pas de la disponibilité du moteur de traduction.

### Privacy boundary
Avant un appel fournisseur:
- conversation autorisée;
- contenu autorisé;
- route locale/browser disponible;
- provider compatible avec la classe de confidentialité.

### Tests
- message non autorisé;
- membre supprimé;
- message dupliqué;
- traduction hors ligne;
- traduction échouée;
- original conservé;
- accès aux pièces jointes;
- blocage.

---

## MODULE 4 — WORLD — CONTRACT D'IMPLÉMENTATION

### Entités
- World;
- Zone;
- Location;
- WorldObject;
- Character;
- Rule;
- WorldEvent;
- Discovery;
- WorldMemory.

### State model
Toute mutation suit:
1. lecture de la version courante;
2. évaluation de la règle;
3. vérification de la permission;
4. calcul de la transition;
5. contrôle de conflit;
6. écriture;
7. émission de l'événement;
8. mise à jour de World Memory si applicable.

### Conflit
Si la version du client ne correspond plus à la version serveur, la mutation doit être rejetée ou recalculée avec une politique explicite.

### Hidden discovery
Une découverte ne doit jamais dépendre uniquement d'un booléen frontend.

### Living Object
Le moteur d'évolution doit conserver:
- version de définition;
- version de règle;
- état avant;
- événement déclencheur;
- état après.

### Tests
- concurrence;
- rollback;
- replay;
- mauvaise version;
- découverte répétée;
- évolution d'objet.

---

## MODULE 5 — SYSTEM / PROGRESSION — CONTRACT D'IMPLÉMENTATION

### Entités
- XP event;
- Level;
- Title;
- Achievement;
- Capability Unlock;
- System Presentation Preference.

### XP
Les opérations accordant de l'XP ne doivent pas accepter un montant arbitraire envoyé par le client.

Le serveur reçoit un événement source puis applique une règle versionnée.

### Titles
Un titre possède:
- identifiant;
- visibilité;
- condition;
- version de condition;
- provenance;
- date d'obtention.

### Progression
Les états calculés doivent être reproductibles à partir des événements validés.

### SYSTEM presentation
Le style SYSTEM est une préférence de présentation explicite et modifiable. Il ne doit pas devenir une inférence sensible.

### Tests
- double attribution;
- score/XP falsifié;
- changement de règle;
- titre secret;
- récupération de progression;
- affichage mobile.

---

## MODULE 6 — PLAY / FINAL QA — CONTRACT D'IMPLÉMENTATION

### Objet
Clore le socle PLAY avant tout lancement du Module 7.

### Play Session
Une session possède:
- session id;
- player id;
- experience id;
- experience version;
- engine version si applicable;
- state version;
- created at;
- last activity;
- completion state.

### Action
Chaque action possède:
- action id;
- session id;
- sequence number;
- input;
- timestamp client;
- timestamp serveur;
- state version attendue;
- résultat de validation.

### Anti-duplicate
Le serveur doit reconnaître un action id déjà traité.

### Anti-tamper
Les données d'autorité ne viennent jamais uniquement du client.

### États UI
- loading;
- ready;
- empty;
- unavailable;
- failed;
- retry;
- completed.

### Gate
Le Module 6 n'est fermé que lorsque chaque état est testé et qu'aucune interaction critique ne conduit à un écran blanc.

---

## MODULE 7 — GAME DISCOVERY ENGINE — CONTRACT D'IMPLÉMENTATION

### But technique
Fournir un catalogue de jeux/expériences filtré par compatibilité et contexte.

### Index logique
Un item de découverte contient:
- expérience;
- version;
- tags;
- format;
- difficulté;
- capacités requises;
- capacités optionnelles;
- statut de publication;
- langue;
- accessibilité;
- contexte solo/collectif.

### Pipeline
1. récupérer contexte Player autorisé;
2. filtrer contenu interdit/incompatible;
3. filtrer capacités indisponibles;
4. appliquer préférences explicites;
5. diversifier;
6. construire le résultat;
7. enregistrer un feedback non sensible.

### Règle
Un jeu nécessitant une infrastructure absente peut être caché, marqué futur ou remplacé par une alternative. Il ne doit jamais apparaître comme exécutable alors qu'il ne l'est pas.

### Tests
- cold start;
- langue;
- faible population;
- provider absent;
- expérience désactivée;
- duplication.

---

## MODULE 8 — GAME A→Z FACTORY — CONTRACT D'IMPLÉMENTATION

### Entrées
- intention;
- Game Spec;
- format 2D/3D/hybride;
- niveau de qualité;
- contraintes.

### Sorties
- project artifact;
- source version;
- runtime package;
- test report;
- validation report;
- provenance.

### Game Spec
Doit contenir:
- core loop;
- objectifs;
- règles;
- entités;
- scènes;
- contrôles;
- conditions de victoire/défaite;
- persistance;
- accessibilité;
- audio;
- réseau si demandé.

### Build pipeline
1. création de spec;
2. analyse des dépendances;
3. génération;
4. build;
5. test statique;
6. test runtime;
7. réparation;
8. rebuild;
9. validation;
10. version.

### Repair loop
Une erreur doit retourner un diagnostic structuré au système de réparation, pas simplement un message texte.

### États
- DRAFT;
- BUILDING;
- TESTING;
- REPAIR_REQUIRED;
- VALIDATING;
- READY;
- FAILED;
- ARCHIVED.

---

## MODULE 9 — SHARED GAME ENGINE — CONTRACT D'IMPLÉMENTATION

### Objectif
Fournir une API stable commune aux jeux.

### Interfaces
- Scene;
- Entity;
- Input;
- Physics;
- Animation;
- Camera;
- Audio;
- UI;
- Rules;
- Save/Load;
- Replay;
- Network;
- Validation.

### Compatibilité
Chaque projet connaît:
- engine version;
- content schema version;
- project version.

### Replay
Un replay doit être basé sur des événements validés et versionnés.

### Migration
Une nouvelle version du moteur ne doit pas casser silencieusement un jeu existant.

---

## MODULE 10 — SOCIAL GAMING — CONTRACT D'IMPLÉMENTATION

### Modes
- synchronous;
- asynchronous;
- cooperative;
- competitive;
- ghost;
- challenge;
- relay.

### Session authority
Le serveur possède la vérité sur:
- participants;
- state;
- score;
- result;
- rewards.

### Action sequence
Une action de jeu possède un numéro de séquence.

Une séquence inattendue déclenche une validation supplémentaire ou un rejet.

### Ghost
Un ghost est une trace/replay d'un résultat réel. Il ne doit pas être présenté comme une personne en ligne si ce n'est pas le cas.

### Low-population mode
Le système doit pouvoir convertir un défi temps réel impossible en:
- asynchrone;
- ghost;
- solo;
- AI-controlled test participant lorsque cela est explicitement représenté.

---

## MODULE 11 — COMMUNITIES — CONTRACT D'IMPLÉMENTATION

### Community data
- Community;
- membership;
- community role;
- channel;
- post;
- rules;
- moderation actions.

### Authorization
Un membre n'hérite pas des permissions d'une autre communauté.

### Moderation
Actions:
- warn;
- hide;
- restrict;
- suspend;
- remove.

Chaque action génère un audit event.

### AI moderation
L'IA produit éventuellement un candidate action. Une politique déterministe et un rôle autorisé décident de l'effet sensible.

### Community privacy
Les groupes privés ne doivent pas être indexés comme espaces publics.

---

## MODULE 12 — EVENTS — CONTRACT D'IMPLÉMENTATION

### Event definition
Un événement possède:
- id;
- version;
- start;
- end;
- stages;
- eligibility;
- rules;
- reward rules;
- visibility;
- participation mode.

### Stage
Chaque stage possède:
- entry condition;
- start/end;
- rule version;
- completion condition;
- next state.

### Scheduling
Le serveur est la source temporelle.

### Failure
Si une tâche planifiée échoue, elle doit pouvoir être rejouée de façon idempotente.

### Tests
- timezone;
- stage transition;
- duplicate execution;
- event end;
- late join;
- cancellation;
- low population.

---

## MODULE 13 — ADAPTIVE WORLD — CONTRACT D'IMPLÉMENTATION

### Evolution proposal
Une évolution suit:
1. observation;
2. hypothèse;
3. proposal;
4. policy check;
5. isolated experiment;
6. evaluation;
7. adoption/rejection.

### World Agent
Chaque agent a:
- role;
- objective;
- tools;
- permissions;
- data scope;
- memory scope;
- expiration;
- evaluator.

### Guardrails
Un agent cannot:
- grant own permission;
- read unrelated private data;
- modify authentication;
- perform unapproved economic actions;
- publish persistent communities;
- make irreversible high-impact actions.

### Convergence
Only compatible, authorized signals can enter cross-player convergence.

---

## MODULE 14 — COLLECTION / REWARD ECONOMY — CONTRACT D'IMPLÉMENTATION

### Reward types
- progression;
- collectible;
- cosmetic;
- access;
- creator capability;
- event reward.

### Ledger
Any value-bearing state change must create an auditable ledger entry.

### Anti-duplication
Reward issuance uses:
- source event;
- reward rule version;
- idempotency key.

### Creator eligibility
Eligibility engine evaluates:
- qualified activity;
- real participation;
- quality;
- rights;
- fraud risk;
- account standing.

### Threshold alert
High threshold reached:
1. validate;
2. deduplicate alert;
3. persist alert;
4. notify OWNER;
5. never auto-pay solely from alert.

### Ads
Banner slots are content-safe:
- responsive;
- isolated;
- provider-neutral;
- disable-able;
- no forced navigation.

---

## MODULE 15 — META SYSTEM / MORISE AI LAB — CONTRACT D'IMPLÉMENTATION

### Responsibilities
- orchestration learning;
- evaluation;
- benchmark;
- experiment management;
- controlled evolution;
- world memory;
- Convergence;
- MORISE DNA;
- Missions From Reality;
- provider evaluation.

### Learning candidate
Must preserve:
- original intent;
- context;
- tool chain;
- parameters;
- result;
- error;
- correction;
- evaluation;
- confidence;
- version.

### Experiment lifecycle
1. hypothesis;
2. isolated config;
3. test dataset / scenario;
4. execution;
5. benchmark;
6. comparison;
7. decision;
8. audit.

### Production safety
No direct self-rewrite.

Any code/model/policy change requires the project's normal change-control and deployment path.

---

# 31. CROSS-MODULE MEMORY VAULT — TECHNICAL CONTRACT

## Storage
Binary media lives in object storage. Relational records store references and metadata.

## Supported objects
- photo;
- video;
- audio;
- text;
- creation;
- Moment;
- Memory Card.

## Lifecycle
~~~text
SELECT
→ VALIDATE
→ UPLOAD
→ PERSIST METADATA
→ INDEX
→ READY
→ OPTIONAL ORGANIZE
→ OPTIONAL SHARE
→ OPTIONAL EXPORT
→ DELETE
~~~

## Privacy

Private by default.

The following are separate permissions:

- STORE;
- ANALYZE;
- SHARE;
- TRAIN.

No automatic promotion between them.

## Failure
A failed upload is never shown as completed.

---

# 32. CROSS-MODULE CREATIVE GATEWAY

## Engines
- Image;
- Music/Audio;
- Video.

## Execution routes
- deterministic;
- Browser;
- Local;
- Self-hosted;
- Optional Cloud;
- Optional API.

## Job contract
Required fields:
- job id;
- capability;
- engine;
- requester;
- provider;
- version;
- inputs;
- rights;
- privacy;
- outputs;
- validation;
- failure.

## Provider switch
Changing provider must not require rewriting module-level code.

---

# 33. CROSS-MODULE I18N

Twenty canonical locales:

fr, en, hi, es, de, it, pt, ar, ja, ko, ru, tr, id, th, vi, pl, nl, ro, bn, ur

Locale resolution:

~~~text
EXPLICIT
→ SAVED
→ DEVICE
→ SUPPORTED
→ ENGLISH
~~~

All user-generated source content remains recoverable.

---

# 34. CROSS-MODULE CAPABILITY CONTROL

## Registry record

~~~text
capability_id
status
required_dependencies
optional_dependencies
providers
fallbacks
risk_class
privacy_class
owner_policy
health
~~~

## Resolution

~~~text
CAPABILITY REQUEST
→ policy
→ dependency
→ provider health
→ device support
→ provider selection
→ execute
→ validate
~~~

## Temporary disable

Any future infrastructure can remain:

- disabled;
- pending;
- maintenance.

Examples:
- video;
- music;
- local AI;
- advanced image;
- external translation;
- heavy simulation.

This is a policy state, not a separate PLAYER-facing technical system.

---

# 35. DEVICE PROFILES

## Low-memory phone
Prefer:
- deterministic mechanics;
- cached content;
- lightweight images;
- no heavy local model;
- reduced effects.

## Standard phone
Allow:
- selected WebGPU/WASM;
- richer interactions.

## High-end phone/tablet
Allow:
- higher media quality;
- heavier browser models where validated.

## PC / GPU
Allow:
- large local AI;
- image;
- music;
- video;
- factory builds;
- advanced simulation.

The same PLAYER experience remains logically consistent across device classes.

---

# 36. MASTER TEST MATRIX

Every module receives:

- unit tests;
- integration tests;
- authorization tests;
- negative-path tests;
- mobile checks;
- persistence checks;
- fallback checks.

Critical groups:

### Foundation / Player / Social
Auth, RLS, privacy, messaging, translation.

### World / Progression / Play
State integrity, XP integrity, tamper rejection, replay.

### Discovery / Factory / Shared Engine
Compatibility, generation, build, repair, replay.

### Social Gaming / Communities / Events
Concurrency, roles, scheduling, reconnect.

### Adaptive World / Economy / Meta
Agents, evolution, ledger, anti-fraud, benchmarks, self-evolution guardrails.

---

# 37. PRODUCTION VERIFICATION SEQUENCE

~~~text
TYPECHECK
→ LINT/FORMAT
→ UNIT
→ INTEGRATION
→ BUILD
→ E2E
→ SECURITY
→ REAL BROWSER
→ MOBILE
→ ERROR/EMPTY/LOADING
→ PROVIDER FALLBACK
→ REGRESSION
→ PRODUCTION SMOKE
~~~

A successful build alone is never sufficient.

---

# 38. IMPLEMENTATION ORDER

Functional module order remains:

~~~text
1 → 2 → 3 → 4 → 5 → 6
→ 7 → 8 → 9
→ 10 → 11 → 12
→ 13 → 14
→ 15
~~~

Current position:

**MODULE 6 — PLAY / FINAL QA**

The existence of a future technical section does not authorize implementing it early.

---

# 39. HANDOFF CONTRACT FOR OTHER AI AGENTS

Before making code changes an AI agent must:

1. read the Master Plan;
2. read this specification;
3. identify the current module;
4. inspect actual repository files;
5. inspect current tests/configuration;
6. preserve existing contracts;
7. determine dependencies;
8. implement only the approved scope;
9. test affected behavior;
10. run browser/mobile verification when applicable;
11. report failures honestly;
12. update technical documentation if the interface changed;
13. never invent infrastructure;
14. never assume future local hardware exists.

---

# 40. SOURCE OF TRUTH

Functional truth:

`docs/MORISE_MASTER_PLAN_V3.md`

Technical implementation truth:

`docs/MORISE_TECHNICAL_MASTER_ARCHITECTURE.md`

If a technical detail conflicts with product requirements, the conflict must be surfaced explicitly.

**CURRENT POSITION: MODULE 6 — PLAY / FINAL QA.**
