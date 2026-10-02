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

# D100 — SPÉCIFICATION COMPORTEMENTALE
## Module comprehension
For every cross-module request, M15 resolves the relevant ModuleManifests, identifies owners, loads only required context, compiles requirements, constructs a TaskGraph and selects execution targets.
## Context minimization
Every task declares inputRefs, privacyClass and scope. Unused context is excluded. Private conversation context cannot become global memory through summarization alone.
## Planning
Planner rejects cycles, impossible dependencies, unavailable capabilities and resource-over-budget graphs before execution.
## Validation
Every provider/agent result is candidate state until validators pass. INCONCLUSIVE never becomes VALID by assumption.
## Owner commit
M15 emits proposals/results; the owner commits durable state. M15 receives the committed event and may learn from the validated outcome.
## AI Lab
Candidate patch → isolated workspace → baseline tests → candidate tests → benchmark → security/policy → canary → monitor → promote/reject → rollback.
## Media/game/social
Image/video/music generation, game fabrication and social intelligence use the same request/policy/validation/memory backbone.

# D110 — CROSS-LOOP INTEGRATION GOVERNANCE
M15 est l'orchestrateur des transitions et l'owner de l'intelligence, mais jamais l'owner des états métier distants.

Pour tout cross-loop request, M15 doit produire : owners source/destination, context scopes minimaux, capability versions, DAG, validators, policy, fallback et output contract avant exécution.

M15 peut proposer une ranking hypothesis, creator intervention, community formation, event bridge ou game transition. La décision durable retourne toujours au module owner.

Toute amélioration autonome du comportement cross-loop suit : observation → hypothèse → candidate → sandbox → tests → benchmark → security/policy → canary → product validation → promote/reject → monitor/rollback.

Référence : `docs/moirise/transversal/PRODUCT_LOOP_GOVERNANCE.md`.
