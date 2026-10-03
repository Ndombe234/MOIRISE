# M15 — META SYSTEM + MORISE AI LAB — PLAN D’IMPLÉMENTATION

## 0. Autorité documentaire

Ce document décrit uniquement le comportement propre au module M15 :
- rôle du Meta System ;
- rôle du MORISE AI Lab ;
- interfaces M15 avec les autres modules ;
- responsabilités de M15 ;
- limites d'autorité ;
- états métier M15 ;
- résultats attendus.

La fabrication interne du cerveau IA est décrite une seule fois dans :
- docs/moirise/ai/AI_MASTER_PLAN.md
- docs/moirise/ai/AI_TECHNICAL_DESIGN.md

Ne pas recopier ici Request Gate, Context Engine, Provider Router, Memory Service, Validation Engine ou Evolution Engine.

## 1. Mission M15

M15 fournit le système d'orchestration qui permet à MORISE AI d'être utilisée par les autres modules.

M15 coordonne :
- demandes AI ;
- capabilities ;
- outils autorisés ;
- exécution ;
- validation ;
- expérience ;
- AI Lab.

M15 ne remplace pas les owners métier.

## 2. Entrées M15

M15 reçoit :
- requête AI ;
- événement système ;
- demande d'un module ;
- proposition d'évolution ;
- demande de création ;
- demande de traduction ;
- demande d'analyse ;
- demande de génération créative.

Chaque entrée doit être conforme aux contrats centraux de l'AI Technical Design.

## 3. Sorties M15

M15 peut retourner :
- réponse AI ;
- proposition ;
- artifact ref ;
- task reference ;
- validation result ;
- event proposal ;
- improvement candidate ;
- degraded state.

Une sortie ne devient un état métier durable qu'après le commit de son module owner.

## 4. Frontières M15

M15 ne devient jamais propriétaire :
- de l'identité M01 ;
- du profil/état Player M02 ;
- des DMs M03 ;
- des règles de progression M05 ;
- de l'exécution des PlaySessions M06 ;
- des communautés M11 ;
- des événements M12 ;
- des changements globaux du World M13 ;
- des récompenses/ledger M14.

## 5. SYSTEM

Les fonctions internes de M15 sont présentées au Player à travers le SYSTEM contextuel.

Le Player n'a pas besoin d'un onglet distinct pour chaque capability interne.

Le SYSTEM doit supprimer les interventions non critiques lorsque le Player :
- écrit ;
- lit ;
- joue ;
- crée ;
- réalise une action nécessitant de la concentration.

## 6. AI Lab

Le AI Lab permet :
- d'examiner une limitation ;
- de formuler une candidate d'amélioration ;
- de produire un patch candidat ;
- de lancer les tests ;
- de comparer au baseline ;
- de proposer un canary ;
- d'autoriser ou rejeter selon les règles centrales.

Le AI Lab ne possède pas :
- secrets production ;
- admin ;
- service role ;
- comptes financiers ;
- pouvoir de promotion sans la chaîne centrale.

## 7. Capabilities consommées par M15

M15 consomme le catalogue central :
- text ;
- reasoning ;
- vision ;
- image ;
- video ;
- audio ;
- music ;
- TTS ;
- STT ;
- translation ;
- search ;
- embedding ;
- moderation ;
- code ;
- game;
- recommendation ;
- evolution.

La définition et la fabrication de ces capabilities ne sont pas redéfinies ici.

## 8. Interaction avec les modules

### M02 Player
M15 peut exploiter les données autorisées mais ne modifie pas directement l'identité Player.

### M03 Social
M15 peut assister traduction, rédaction, découverte et modération selon policy. Les messages privés ne deviennent pas mémoire globale par défaut.

### M05 System
M15 fournit intelligence et propositions. M05 reste owner de progression, XP, titres et état SYSTEM métier.

### M08 Game Factory
M15 produit requirements/spec/task graph. M08 reste owner de la fabrication.

### M09 Game Engine
M15 décrit ou génère les besoins. M09 reste owner du runtime.

### M11 Communities
M15 peut proposer des affinités/convergences. M11 reste owner du membership.

### M12 Events
M15 peut proposer contenu/personnalisation. M12 reste owner de l'état événementiel.

### M14 Economy
M15 peut analyser ou proposer des ajustements. M14 reste owner du ledger et des récompenses.

## 9. Living Objects / Convergence / Missions / World Memory

M15 peut détecter, proposer et orchestrer.

Les lifecycles durables restent chez les owners définis par l'architecture.

Les données provenant de sources privées doivent respecter les contrats de destination et de confidentialité centraux.

## 10. DONE M15

M15 est fonctionnel lorsque :
- les demandes AI peuvent entrer par le contrat central ;
- les modules peuvent appeler les capabilities sans connaître les providers ;
- les résultats sont validés avant mutation ;
- le AI Lab peut produire une candidate isolée ;
- les frontières M01–M14 sont respectées ;
- aucune logique AI concurrente n'est recréée dans M15.

## AI-INTÉGRATION M15 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M15 est le seul cerveau MORISE AI et l'owner de l'AI Lab. Il connaît les modules via leurs contrats, manifests cognitifs, capabilities, scopes, dependencies, validators et authority boundaries. Cette connaissance permet à M15 de comprendre où intervenir et où s'arrêter. Elle ne transforme jamais M15 en owner des tables M01–M14. M15 possède Request Gate, Context Engine, Intent Compiler, Requirements Compiler, Reasoning, Planner, Policy, Capability/Tool Registry, Provider Router, Resource Planner, Validation, Memory, Experience, Evaluation et Evolution. AI Lab reste isolé de production secrets/admin/service-role. Evolution = limitation → gap → root cause → candidate → sandbox → tests → benchmark → security/policy → canary → promotion/rejection → monitor → rollback. DONE exige un seul cerveau et aucun router concurrent.

## GAME PLATFORM — RÔLE M15

M15 orchestre la fabrication et l'évolution des jeux mais ne possède pas la fabrication métier de M08 ni l'exécution M09.

Pour une demande de jeu, M15 doit :
1. comprendre l'intention ;
2. compiler GameRequirements ;
3. choisir 2D/3D selon les contraintes et la valeur réelle ;
4. résoudre les capabilities disponibles ;
5. construire le TaskGraph ;
6. planifier ressources et workers ;
7. sélectionner les templates/components compatibles ;
8. coordonner génération, build, tests et validation ;
9. analyser les échecs ;
10. produire une correction bornée ;
11. recommencer dans le budget autorisé ;
12. remettre à M08/M09/M06 les contrats validés.

M15 peut utiliser Codex comme agent de fabrication assistée lorsque cet outil est autorisé. Codex reste un worker/agent dans un workspace candidat. M15 conserve l'orchestration, la policy et la validation des handoffs.

M15 doit privilégier la réutilisation des fondations de la Game Platform avant de demander une nouvelle implémentation.

## GAME FABRICATION MEMORY — RÔLE M15

M15 utilise la mémoire centrale pour rendre la Game Factory cumulative : chaque fabrication validée peut améliorer les suivantes.

Cycle :
retrieve → apply → fabricate → validate → observe → learn candidate → benchmark/policy → promote/reject → retrieve on next task.

M15 doit distinguer :
- ce que MORISE sait déjà ;
- ce qui a seulement été tenté ;
- ce qui a échoué ;
- ce qui a été validé ;
- ce qui est devenu un pattern réutilisable.

Codex peut enrichir l'expérience, mais sa présence ou absence ne doit pas supprimer le savoir accumulé.

M15 ne transforme jamais une sortie de provider/agent en connaissance vraie sans evidence et validation.

## CREATIVE MEDIA INTELLIGENCE — M15

M15 is the sole AI orchestrator for user-authorized creative media analysis and generation. It does not own social publication.

For user media:
`permission → provenance → modality analysis → semantic profile → originality transformation → creative brief → capability routing → generation → validation → artifact candidate → owner commit`.

### Semantic analysis
For images, video and audio, M15 may derive broad non-expressive features such as subjects, scene structure, colors, lighting, motion, pacing, mood, genre hints and audio characteristics. It must keep protected expressive elements and source ownership classification separate from generic concepts.

### Creative transformation
M15 must never use “replace a word/character/pitch slightly” as a copyright-avoidance strategy. For third-party material it must produce a materially new brief or use an authorized remix/catalog path. For user-owned/authorized material it may perform transformations allowed by the permission class.

### Originality state
`VALID`, `INCONCLUSIVE`, `REJECTED`. INCONCLUSIVE cannot become public publication automatically.

### Artifact provenance
Every generated artifact carries sourceRefs, permission state, generation capability/version, transformation class, validation state and owner commit reference.

### Media types
The same orchestration handles IMAGE_GENERATION, VIDEO_GENERATION, MUSIC_GENERATION and AUDIO_GENERATION. A provider is selected only after privacy/capability/resource/health hard filters.

## SOCIAL VIRALITY INTELLIGENCE — M15

M15 may propose:
- personalized discovery;
- creative transformations;
- Story sequences;
- Reel concepts;
- share opportunities;
- challenge concepts;
- community proposals;
- creator insights;
- content recaps.

M15 may not fabricate popularity, social proof, users, engagement or scarcity.

A share opportunity must have a source event, audience policy, cooldown and privacy class. M15 proposes; M03 publishes; M07 ranks; M11 owns community state.

## COLD START / FIRST SESSION

M15 should optimize the first session as a sequence of meaningful experiences instead of a wall of buttons: discover → interact → create → play → connect → optionally share. The sequence adapts to actual user actions and remains functional without AI using deterministic fallback paths.

## VIRALITY SAFETY

The goal is sustainable sharing, not compulsive manipulation. M15 must respect mute, not-interested, block, privacy and notification controls. No hidden sensitive inference may be exposed as a recommendation reason.

# D10 — M15 META SYSTEM + MORISE AI LAB — EXPANSION COMPORTEMENTALE
## Single brain
M15 remains the sole MORISE AI orchestration authority. Modules expose manifests; M15 reads capabilities/dependencies/validators/authority boundaries and decides how to coordinate.
## Module cognition
For each request: load relevant manifests → identify owner → compile requirements → construct bounded graph → execute capabilities → validate → hand off to owner → record experience.
## Media
Vision/video/audio/music analysis and generation use the same central pipeline. Provider outputs are untrusted until validated.
## Social intelligence
M15 can propose discovery, creative prompts, translation, summaries, remix concepts, community candidates and game concepts, but it never owns social mutations.
## AI Lab
Limit → gap → candidate → isolated workspace → tests → benchmark → security/policy → canary → promote/reject → monitor → rollback.
## Game Factory memory
Successful game patterns, failures and repair recipes become retrievable knowledge only after validation. Codex is an interchangeable agent, not the knowledge owner.
## Viral optimization
M15 can optimize user value and content quality, but not through dark patterns, fake scarcity, fake popularity or hidden manipulation.
## DONE
All modules can call capabilities through one brain; all mutations return to owners; media and game creation survive provider changes.

# D100K — M15 Meta System / MORISE AI Lab — FORMAL VERIFICATION

Owner: M15. Scope: AI brain, routing, workers, memory, validation, evolution. Dependencies: all contract surfaces. Invariant: AI/provider outputs are untrusted until validated and committed by the module owner.

Canonical transition: ACTOR → INTENT → PRECONDITIONS → CONTEXT/POLICY → INPUTS → AUTHORITY → GUARDS → STATE → OUTPUT → VALIDATION → COMMIT → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

Forbidden: hidden owner transfer, unauthorized mutation, silent privacy expansion, stale overwrite, duplicate authoritative mutation, or treating an unverified proposal as fact.

Proof must cover nominal, empty/no-data, failure, degraded/unavailable, replay, concurrency where relevant, refresh/reopen, permissions, mobile and desktop, and the module-specific invariant.

Impact path: M15 → consumers → contracts/events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.


# RECOVERED AI / CREATOR / EXECUTION FUSION — 2026-10-03

## First-session orchestration
M15 may orchestrate First Contact through the existing capability registry, but M05 owns SYSTEM/progression presentation and module owners own durable state. First-session behavior remains functional without AI.

## MORISE Moment / Relay / Living Stories
M15 may detect Moment candidates from permitted signals; generate artifact and narrative proposals; propose Relay transformations; generate Living Story representations; and evaluate candidate quality/provenance. M03 and the relevant domain owner perform authoritative commit.

## Creation Runtime + Creation Tools
Preserved tool families include code generation/inspection/modification/refactoring; 2D/3D scene/world construction; assets/characters/animation/materials/lighting/camera; input/collision/physics/rules/state; UI/HUD/audio; persistence/networking/multiplayer adapters; build/execute/test/diagnose/correct/optimize; performance profiling. Tools are permissioned, versioned, observable and sandboxed.

## World Agents
M15 may orchestrate scoped World Agents for playtest, opponent/teammate simulation, exploration, event facilitation, validation and balancing. Agent observations are evidence candidates only; agents never become a second unrestricted AI authority.

## On-device / zero-API execution
M15 may route eligible tasks to local/browser/on-device execution, cache, trusted worker, optional community worker, approved provider, then degraded fallback. Device capability detection, memory/CPU budgets, local model lifecycle and UX safeguards are mandatory. External providers remain optional instruments.

## Collective Intelligence
M15 preserves the Collective Intelligence Engine mechanisms: Resonance; Proof of Discovery; Collective Lab; Knowledge Conflicts; Skill Transfer; Adaptive Roles; World Simulations; Contribution Intelligence. M15 orchestrates these capabilities but does not replace M13, M11, M12, M05 or M14 domain ownership.

## Creator Economy
M15 may orchestrate creator eligibility analysis, staged eligibility, contribution-chain analysis, economic capability proposals, fraud/anomaly analysis and owner/admin alerts. M14 and domain owners remain authoritative for economic/reward mutation and publication.

## Operational control
Owner/Admin Control Center behavior is constrained by M01 security and explicit administrative policy. M15 may provide analysis and alerts but cannot become an unrestricted superuser.



# HISTORICAL FUSION — M15 AI LAB — PLAN

M15 absorbe les anciens plans AI d'orchestration, context/reasoning, capability routing, memory/learning, evolution, resource scheduling, workers distribués, actions/tools et orchestration créative.

## M15 doit évoluer avec le code

Une limite observée peut déclencher une candidate d'amélioration. Les candidates peuvent concerner les algorithmes, skills, planners, parsers, retrieval, optimisations, validators ou composants de fabrication. Elles passent obligatoirement par sandbox, tests, benchmark, policy, canary et rollback.

## M15 doit évoluer avec les ressources

Le Resource Engine détecte les capacités disponibles des runtimes/workers. Une augmentation réelle de CPU/RAM/GPU/VRAM ou l'ajout d'un worker augmente l'espace d'exécution disponible sans modifier le contrat de capability.

M15 ne suppose jamais que la puissance est infinie et ne traite jamais plusieurs machines comme une seule RAM physique.

## Worker control plane

M15 possède :
- registry logique ;
- scheduler ;
- lease/retry ;
- health/heartbeat ;
- trust state ;
- resource selection ;
- task routing ;
- validation de résultats.

Le worker lui-même reste un runtime séparé. M15 ne lui délègue pas son autorité.

## Provider relationship

Les providers accélèrent ou étendent des capabilities mais ne définissent ni la mémoire, ni la policy, ni l'autorité, ni l'identité de MORISE.

## AI Lab progression

OBSERVE → DIAGNOSE → HYPOTHESIZE → FABRICATE → TEST → BENCHMARK → VALIDATE → CANARY → PROMOTE → MONITOR → ROLLBACK.

Le succès d'une évolution doit être mesurable ; l'augmentation du volume de code n'est jamais une preuve suffisante.

