# M06 — PLAY — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
PLAY n'est pas « une page qui lance un jeu ». La chaîne exacte est : expérience sélectionnée → version publiée → compatibilité → session serveur → runtime → tentative → validation → résultat autoritatif → progression/récompense éventuelle → partage.

## 1. Owner
M06 possède l'expérience de jeu côté produit, les PlaySession, la coordination des résultats et la reprise. M07 choisit les candidats. M09 fournit le runtime. M05/M14 décident respectivement progression et économie.

## 2. Sélection
**Acteur :** Player.
**Déclencheur :** ouverture de PLAY.
**Préconditions :** catalogue lisible.
**Séquence :** demander candidates à M07 → filtrer visibilité, publication, device et runtime → afficher preview → n'appeler le runtime qu'après Start.
Aucun rendu de carte de jeu ne doit démarrer une session.
**Échec :** M07 absent → fallback catalogue déterministe; aucun jeu inventé pour remplir la page.

## 3. Launch
**Acteur :** Player.
**Déclencheur :** tap Start.
**Préconditions :** gameVersion immutable publiée, Player autorisé, runtime compatible.
**Séquence :**
1. vérifier activeVersion ;
2. vérifier policy ;
3. créer commandId ;
4. créer PlaySession côté serveur ;
5. allouer runtime ;
6. transmettre manifest minimal ;
7. marquer STARTING ;
8. seulement ensuite lancer ACTIVE.
**Mutation :** PlaySession.
**Retry :** même commandId retourne la même session ou son état.
**Échec :** allocation runtime échouée → session ABORTED/preview conservée.

## 4. Runtime attempt
Le client/runtime fournit des actions et des snapshots, jamais la décision de récompense.
**Sandbox :** filesystem limité, réseau limité, pas de secrets production, CPU/RAM/temps bornés.
Les snapshots sont versionnés et checksummés lorsqu'ils sont persistés.
Crash → dernier snapshot valide ou RESTART, jamais un score inventé.

## 5. Résultat
**Trigger :** finish, timeout ou quit.
**Validation exacte :**
- session appartient au Player ;
- session ACTIVE ;
- gameVersion/rulesVersion correspondent ;
- transitions autorisées ;
- score dans bounds ;
- completion rule satisfaite ;
- attempt non déjà consommée.
Puis créer AuthoritativeResult une seule fois.
Un résultat INCONCLUSIVE n'appelle pas M05/M14 comme s'il était valide.

## 6. Sauvegarde / reprise
Save = schemaVersion + payload bounded + checksum + updatedAt.
Au Resume : session ownership → checksum → schema compatibility → migration connue uniquement → reprise.
Schema inconnu = INCOMPATIBLE et proposition de restart, pas lecture arbitraire.

## 7. Partage
Après résultat validé : result → privacy projection → M03 ShareToken.
Tap Share n'entraîne jamais une publication publique automatique d'une session privée.

## 8. États
DISCOVERED → PREVIEWED → STARTING → ACTIVE → FINISHED/ABORTED.
Save : VALID → STALE/INCOMPATIBLE.
Result : PENDING → VALID / INCONCLUSIVE.

## 9. Données
ExperienceRef, PlaySession, RuntimeSnapshot, SaveRecord, AttemptEvidence, AuthoritativeResult, MomentRef.

## 10. Security
Toutes les décisions de score/récompense sont serveur-authoritative. Toute tentative d'envoyer un score hors bounds ou un sessionId d'un autre Player est rejetée.

## 11. Tests
Launch double tap; expired session; runtime crash; malicious result; score overflow; replay same result; save corruption; mobile; desktop; offline/degraded network; share privacy revoked.

## AI-INTÉGRATION M06 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M06 est l'autorité produit des PlaySession, du lancement/reprise et de l'admission du résultat autoritatif. M15 peut assister le jeu mais ne décide jamais du score ou de la récompense.

### B. AI cases
Aide contextuelle, adaptive content autorisé, génération de variantes de contenu déjà prévues par la GameSpecification, analyse de session et suggestions post-partie.

### C. Contexte
Player/session/gameVersion/rulesVersion/runtimeCapabilities et seulement les snapshots autorisés. Aucun accès aux secrets ou aux tables économiques.

### D. Résultat
Runtime evidence → M06 validator → VALID/INVALID/INCONCLUSIVE → AuthoritativeResult. Une sortie AI ne peut pas devenir un score valide sans passer cette chaîne.

### E. Fallback
Le jeu doit continuer sans IA lorsqu'un contenu adaptatif n'est pas critique. Sinon UNAVAILABLE explicite, jamais résultat inventé.

### F. DONE
Tests couvrent runtime AI down, résultat falsifié par AI/client, version mismatch, retry et reprise.

## GAME PLATFORM — INTÉGRATION M06 / PLAY

M06 ne fabrique pas le moteur des jeux. Il transforme un GameBuild validé en expérience jouable dans MOIRISE.

Flux obligatoire : GameBuild VALIDATED → vérifier publication/version/device compatibility → créer PlaySession → demander RuntimeRef à M09 → démarrer → collecter evidence → valider résultat → produire AuthoritativeResult → handoff M05/M14/M10 selon contrats → partage via M03.

M06 consomme le RuntimeManifest produit/validé par M09. Il ne choisit pas arbitrairement l'engine ou la sandbox. Une incompatibilité device déclenche uniquement le fallback défini ou UNAVAILABLE.

La grande porte PLAY reste stable pour l'utilisateur. Les détails 2D/3D sont internes à l'expérience.

DONE : un jeu fabriqué par M08 et validé par M09 peut être lancé, repris, terminé et partagé sans recopier la logique de session dans chaque jeu.

# D10 — M06 PLAY — EXPANSION COMPORTEMENTALE
## Play entry points
PLAY may start from catalog, post, Reel, Story, DM, group, event, World or challenge. The entry always resolves to a validated GameBuild reference.
## Session
OPEN_GAME → DEVICE_CHECK → LOAD_MANIFEST → START → PLAY → RESULT → VALIDATE → COMMIT → SHARE/REMATCH/HANDOFF.
## Social result loop
A result may generate a compact share card, challenge invitation or group rematch. It never falsifies scores or rankings.
## Media-to-game
M15 may transform an authorized media concept into a game requirement; M08 builds; M09 runs; M06 launches and validates result.
## Viral protection
Sharing a game must not bypass content/safety/publication checks. Failed builds are never exposed as playable links.
## DONE
2D/3D build, result integrity, resume/retry, social entry, network loss, mobile controls and desktop controls all work with real states.

# D100K — M06 Play — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M06. Scope: PlaySession, launch/resume, result admission. Dependencies: M01,M02,M05,M09. Primary invariant: client/runtime never becomes result authority.
For every capability: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
Authorization failure, invalid schema, incompatible version, ownership violation, idempotency conflict or critical dependency failure must produce zero unauthorized authoritative mutation.

## 3. AI boundary
M15 may propose or analyze only through capability contracts. M06 remains authoritative for PlaySession, launch/resume, result admission.

## 4. Proof obligations
SUCCESS + NO-DATA + ERROR + DEGRADED/UNAVAILABLE + REFRESH/REOPEN + DESKTOP + MOBILE + PERMISSION DENIAL + RETRY/REPLAY where applicable.

## 5. Impact obligation
M06 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. UNKNOWN impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
Owner authority cannot be bypassed; duplicate commands cannot duplicate authoritative mutation; stale versions cannot silently overwrite current state; projections remain rebuildable; privacy survives handoffs; VERIFIED requires applicable evidence.

## 7. Completion
This D100K section defines what must be provable. It does not claim implementation completion.


# RECOVERED PLAY / MOMENT / SOCIAL CHALLENGE FUSION — 2026-10-03

## Result-driven Moments
A validated Play result may become a Moment candidate or shareable result card when it is genuinely meaningful. The result remains authoritative in M06; M03 controls social publication and M05/M14 control progression/reward ownership.

## Proof of Impossible
Play may expose a beat-my-result or proof challenge based on a real score, time, puzzle solution or other validated outcome. A recipient must be challenged against the actual source result; no fabricated record is permitted.

## Async challenge families
Preserved Play-compatible patterns include Duel, beat-my-score, beat-my-time, solve-my-puzzle, survive-my-rules and remix-my-world where the authoritative owner contracts permit them. Real-time multiplayer is not required when asynchronous play provides the intended value.


# D100K — HISTORICAL CONTRACT RESTORATION — M06 PLAY

## Restored contracts
`PlayEntry={gameId,title,mode:'2d'|'3d',status:'ready'|'processing'|'unavailable',packageVersion,thumbnailRef?}`
`PlaySession={id,gameId,playerId,startedAt,endedAt?,status:'active'|'completed'|'aborted'}`

Canonical launch sequence:
`select → authorization/eligibility → package metadata → integrity/version check → preload → M09 mount → create session → play → result/save → unmount → history`.

Dynamic difficulty is permitted only when bounded by GameSpecification/rules; it cannot rewrite authoritative scoring rules. Runtime memory must be released after the session whenever technically possible.

## D100K proof
Unauthorized launch, missing/invalid package, version mismatch, runtime unavailable, duplicate result, dynamic difficulty bounds, save failure, cleanup/unmount, reconnect, worker loss and mobile/desktop Play.



# D100K — RESTORED EXPERIENCE FAMILIES / CONSEQUENCE BRANCHING

PLAY remains one primary entry surface. Historical experience families are retained as content patterns behind it:
- Pulse: short skill/reaction/memory/rhythm challenges;
- Drift: small exploration micro-worlds;
- Forge: creation-oriented experiences;
- Duel: asynchronous challenges;
- Quest: progression-linked short missions;
- World: larger spatial experiences when justified.

The Player does not need to browse a directory. The selector can choose a real available experience or continuation according to Player state, context, device and time budget.

Evolving puzzles may expose multiple valid solution paths. Consequence branches are versioned from real Player choices; no false branch state is presented.

D100K: missing package, unavailable mode, branch replay, invalid solution, unsupported 3D device, async challenge continuation, share handoff and clean recovery.



# D100K — EXPLICIT PLAY RESOURCE RESTORATION

Leaving a PlaySession triggers engine unmount and release of media/resources whenever possible. Dynamic difficulty remains subordinate to declared game rules and cannot change authoritative scoring.

D100K: resource release evidence, difficulty-rule validation and leak/reconnect checks.

