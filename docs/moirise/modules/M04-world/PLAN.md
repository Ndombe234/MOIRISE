# M04 — WORLD — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Décrire une fonction comme « elle existe en France » n'est pas suffisant : la documentation doit pouvoir descendre jusqu'à Paris, la rue, le bâtiment, l'appartement et la porte. Dans MOIRISE cela signifie acteur → déclencheur → préconditions → entrées → étapes → mutation → projection → événement → erreur → reprise → sécurité → tests.

## 1. Owner
M04 possède la surface WORLD, sa contextualisation et ses handoffs. M04 ne devient pas propriétaire des données métier de PLAY, SOCIAL, COMMUNITIES ou EVENTS.

## 2. Home World
**Acteur :** visiteur ou Player.  
**Déclencheur :** ouverture de Home ou retour d'un autre écran.
**Préconditions :** shell READY; contexte minimal disponible.
**Entrées :** session context, locale, viewport, états réels récents autorisés.
**Séquence :** charger contexte minimal → vérifier privacy → sélectionner les 5–6 portes principales → sélectionner seulement les cartes éligibles → rendre LOADING puis READY.
**Mutation :** uniquement impression/dismissal lorsque cela est nécessaire; aucune mutation métier d'une autre feature.
**Projection :** SYSTEM, PLAYER, SOCIAL, WORLD, PLAY, CREATE, plus des cartes contextuelles.
**Échec :** une dépendance optionnelle absente donne DEGRADED; aucune donnée fictive n'est créée.
**Sécurité :** aucun faux compteur, faux utilisateur, fausse récompense ou contenu inventé.
**Tests :** premier passage, session absente, session expirée, aucune carte, source optionnelle indisponible, mobile, desktop.

## 3. Context Cards
**Acteur :** Player.
**Déclencheur :** un événement réel rend une action potentiellement pertinente.
**Préconditions :** source réelle; cooldown absent; player non occupé par une tâche qui doit rester prioritaire.
**Séquence :** récupérer source → vérifier visibilité → calculer pertinence → générer reasonKey → définir expiration/cooldown → afficher → enregistrer dismissal ou action.
**Mutation :** ContextCard + état d'exposition.
**Projection :** une action compréhensible avec raison courte.
**Échec :** source supprimée → carte retirée; player dismiss → suppression temporaire.
**Sécurité :** reasonKey ne doit pas révéler une donnée privée.

## 4. Detours
Un Detour est une possibilité facultative, pas une obligation.
**Suppression obligatoire pendant :** saisie de texte, lecture, partie, création, paiement ou autre tâche où une intervention interrompt l'intention; seuls les cas réellement critiques peuvent contourner cette règle.
**Étapes :** détecter contexte → vérifier signal réel → cooldown → choisir une action → présenter → retour à l'activité.
**Interdit :** faux compte à rebours, fausse rareté, « reviens demain » sans futur Event réel.

## 5. Handoffs
Lorsqu'un Player touche PLAY, CREATE, SOCIAL, PLAYER ou SYSTEM :
1. M04 crée un IntentEnvelope ;
2. il contient originModule, actorRef, intentType, targetRef éventuel, sourceEventRef et UI context minimal ;
3. la destination revalide l'autorisation ;
4. la destination possède la mutation.
M04 ne peut pas écrire directement les tables privées de la destination.

## 6. Solo-first orientation
Première visite :
1. afficher une explication minimale ;
2. donner une action réalisable seul ;
3. présenter ensuite des possibilités sociales sans les rendre obligatoires ;
4. enregistrer l'étape d'orientation ;
5. reprendre au même point en cas de retour.
Aucune progression artificielle n'est accordée pour simplement regarder une carte.

## 7. Shareable Discovery
Le partage suit : source → privacy projection → share token scoped → expiration → projection publique.
Si la source devient privée, le token est révoqué. Une carte publique ne doit jamais contenir une donnée qui n'était visible qu'en privé.

## 8. États
BOOTING → READY.  
READY → CONTEXTUALIZING → READY.  
READY → DEGRADED si dépendance optionnelle indisponible.
Une erreur de rendu ne doit pas supprimer la navigation de secours.

## 9. Données
WorldContext, DoorDefinition, ContextCard, Detour, WorldSurfaceState, IntentEnvelope, ShareToken.

## 10. IA
M15 peut proposer la présentation contextuelle. M04 contrôle l'expérience et applique les suppressions. M15 ne peut pas inventer de futur, d'utilisateur ou de récompense.

## 11. Tests et DONE
Vérifier deep links, refresh, mobile/desktop, suppression pendant typing/reading/playing/creating, absence de faux contenu, handoff refusé, token révoqué, dépendance optionnelle indisponible.

## AI-INTÉGRATION M04 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M04 est le contexte visible de MOIRISE : portes principales, cartes et détours. MORISE AI fournit l'intelligence de contextualisation mais M04 contrôle l'expérience et les suppressions.

### B. AI responsibilities
Classer des actions contextuelles, produire une reasonKey, proposer une carte, détecter une opportunité réelle, contextualiser l'ordre d'affichage et suggérer un handoff.

### C. Context
WorldContext = état courant + viewport + session + signaux réels autorisés + état d'activité. Les signaux sensibles sont minimisés.

### D. Suppressions
Typing, reading, playing, creating et autres tâches prioritaires suppriment les détours non critiques. L'IA ne doit pas réintroduire une carte rejetée par la policy.

### E. Handoff
M04 construit IntentEnvelope. La destination revalide toujours actor/permission/target. M15 ne possède pas la mutation destination.

### F. Interdits
Fausse rareté, faux utilisateur, faux compte à rebours, événement futur inventé, récompense inventée, exposition de signaux privés dans une card publique.

### G. Fallback
AI down = sélection World déterministe et suppression par règles. Le shell reste utilisable.

### H. DONE
Les cards AI sont explicables, suppressibles, bornées par cooldown et privacy et leurs handoffs passent par destination owner.

# D10 — M04 WORLD — EXPANSION COMPORTEMENTALE
## World as projection
WORLD presents safe projections from events, communities, creations, discoveries and adaptive signals. It does not own source mutations.
## Exploration
ENTER → CONTEXT → DISCOVER → INTERACT → HANDOFF. Every handoff references an owner capability.
## Social world
Public media, games, events and community activity may appear as World objects when visibility/safety allow it. Private content never becomes a world object accidentally.
## Adaptive surfaces
M13 may propose changes; M04 applies only validated projections. World novelty must be bounded.
## Viral discovery
World can expose “why this is here” explanation keys, related creations, playable actions or community context without fabricating popularity.
## DONE
World deep-link, empty real state, safe projections, deletion propagation, blocked item filtering, adaptive update fallback and mobile/desktop verified.

# D100K — M04 World — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M04. Scope: world surfaces, contextual handoffs, adaptive presentation. Dependencies: M01,M02,M03,M05,M07,M13.
Primary invariant: World is projection/orchestration surface, not owner of others' state.

For every capability of M04, the canonical state transition is:
ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

No capability is complete if an implementation decision remains inferable from prose alone.

## 2. Forbidden states
A transition must have zero mutation when:
- authorization fails;
- input/schema validation fails;
- required version is incompatible;
- target is outside owner scope;
- idempotency conflict occurs;
- a required authoritative dependency is unavailable.

## 3. AI boundary
AI/M15 may propose, classify, summarize or generate candidates only within the capability contract. M04 remains the owner of its authoritative state. AI output without validated evidence is non-authoritative.

## 4. Proof obligations
Each user-visible capability must prove:
SUCCESS + EMPTY/NO-DATA + ERROR + UNAVAILABLE/DEGRADED where applicable + REFRESH/REOPEN + MOBILE + DESKTOP + PERMISSION DENIAL + RETRY/REPLAY behavior.

## 5. Change-impact obligation
A change to a M04 contract requires traversal:
M04 → direct consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience scenarios.
Unknown impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
- owner authority cannot be bypassed;
- duplicate commands do not duplicate authoritative mutation;
- stale versions do not silently overwrite newer state;
- projections can be rebuilt from authoritative state;
- privacy/visibility constraints survive every handoff;
- VERIFIED cannot be emitted without applicable evidence.

## 7. Completion
D100K means the feature definition is machine-checkable. It does not mean the code is already fabricated.


# RECOVERED WORLD / EXPERIENCE ECONOMY FUSION — 2026-10-03

## Personal evolving world
M04 preserves the World-facing projection of a real personal world state: environments, objects, characters, narrative fragments, music identity, visual identity, unlocked interaction patterns, Living Objects and contextual discoveries. Durable state remains owned by its canonical module; M04 presents only authorized projections and handoffs.

## Asynchronous traces and discovery
The World may expose a validated trace left by another Player, a discovery broadcast, a Living Museum item, a hidden area or an unexplored path when visibility and permissions allow. Encountering a trace never grants access to private data.

## Return-after-absence
When an eligible real state changed during the Player's absence, World may present the concrete consequence on return. It must never fabricate activity, messages, scarcity or social proof.

## Continuation
A World projection after First Contact can point to a real next possibility: changed world state, discovered path, playable experience, mission, object evolution or collective opportunity. The handoff is contextual and reversible.
