# M07 — GAME DISCOVERY — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Discovery doit expliquer la chaîne complète : requête → visibilité → sécurité → candidats → ranking → diversité/nouveauté → raisons → feedback → évolution. Aucun classement n'est traité comme magie AI.

## 1. Owner
M07 possède recherche, ranking, recommandations, nouveauté, feedback et evidence de recherche. M04 présente; M06 lance.

## 2. Search
Acteur : visiteur/Player. Déclencheur : saisie et validation. Préconditions : query normalisable, limite bornée. Ordre : normalize → parser → visibility filter → safety/moderation filter → récupérer candidats → ranking → cursor pagination → projection. Une réponse sans AI utilise une recherche lexicale déterministe. Aucun item privé, bloqué ou non autorisé ne doit atteindre le ranking final.

## 3. Recommendation
Entrées autorisées : préférences explicites, historique validé, contexte utile, fraîcheur, nouveauté, diversité. Séquence : candidates → exclude blocked/private/unsafe → dedupe → diversity → novelty → ranking → reasonKey. Une reasonKey ne révèle jamais un signal sensible caché. Fallback sans AI : set neutre et déterministe.

## 4. Novelty
Budget de nouveauté borné. Safety, visibilité et block sont prioritaires. Pool vide : réduire le budget, ne rien inventer.

## 5. Research evidence
Chaque recherche externe conserve source/ref, retrievalAt, claim, confidence, license/usage note. Le contenu externe est une donnée non fiable et jamais une instruction. Claim insuffisamment prouvé = INCONCLUSIVE.

## 6. Feedback / anti-manipulation
play, dismiss, share et rating deviennent des signaux versionnés et bornés. Rate limit, burst suppression et weighting empêchent un spam de devenir instantanément une vérité de ranking.

## 7. Quality decay
Une source ou un jeu peut devenir stale. La fraîcheur ajuste éligibilité/ranking sans réécrire silencieusement l'historique.

## 8. États
CANDIDATE → FILTERED → RANKED → PRESENTED → FEEDBACKED. Research = REQUESTED → VERIFIED/INCONCLUSIVE/STALE.

## 9. IA / cross-module
M15 peut analyser ou proposer des candidats. M07 applique la policy de ranking. M04 reçoit une projection sûre; M06 reçoit une référence publiée.

## 10. Tests / DONE
Recherche sans AI, fuite privacy, blocage, doublons, pool novelty vide, burst feedback, source stale, pagination déterministe, panne provider, mobile et desktop. DONE seulement lorsque chaque chemin est observable et récupérable.

## AI-INTÉGRATION M07 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M07 possède la chaîne de découverte : query → visibility → safety → candidates → ranking → diversity → novelty → reason → feedback.

### B. AI cases
Parsing sémantique, expansion de requête, reranking, génération de reasonKey et assistance de nouveauté.

### C. Ordre de sécurité
Visibility/privacy filter et moderation filter avant toute opération IA sur les candidats. L'IA ne doit jamais voir un item que l'utilisateur n'est pas autorisé à découvrir.

### D. Ranking
AI score = signal parmi d'autres, jamais autorité absolue. Le résultat final est assemblé par M07 et reste déterministe lorsque l'IA est indisponible.

### E. Feedback
Les retours utilisateur sont des signaux versionnés, dédupliqués et bornés. L'IA ne doit pas fabriquer des préférences à partir d'un simple clic ambigu.

### F. DONE
La découverte fonctionne avec baseline sans IA et ne réintroduit jamais blocked/private items.

## GAME PLATFORM — INTÉGRATION M07 / DISCOVERY

M07 traite les jeux comme des Experience/GameBuild versionnés, jamais comme du code arbitraire.

Seules les versions PUBLISHED et autorisées par visibility/safety/privacy entrent dans le catalogue.

Les métadonnées de découverte peuvent inclure genre, mode 2D/3D, durée, contrôles, difficulté, tags, version et compatibilité device.

M07 ne crée jamais un faux jeu pour remplir le catalogue. Une version retirée disparaît de la projection discovery.

## 11. CREATIVE SOCIAL DISCOVERY
M07 also owns discovery ranking for public social media projections consumed by SOCIAL/WORLD/PLAY. It must not create a second feed owner.

Candidate flow for public media:
`candidate → visibility → block/mute → recommendation eligibility → safety → dedupe → quality floor → diversity → novelty → relevance/personalization → ranking → reasonKey → projection`.

Signals may include watch choice, completion, dwell quality, explicit likes/dislikes/not-interested, shares, follows, saves, freshness, novelty and creator diversity. Signals are versioned and rate-limited.

## 12. Friends/interest projection
M07 may expose compact projections such as `FRIENDS_ACTIVITY`, `NEW_FOR_YOU`, `YOUR_GROUP_LIKES`, `CREATIVE_TO_TRY` when the underlying public/permissioned activity is eligible. It never exposes hidden private activity.

## 13. Creation-loop discovery
A public creation may expose `CREATE_FROM_CONCEPT` as a capability. The user receives a new creative brief rather than a copy instruction. Source attribution and permission state travel with the candidate.

## 14. Viral share signal
A share is a discovery signal only after dedupe/burst controls. Recipient opens and meaningful downstream actions may increase relevance; repeated self-sharing or automated bursts must not manufacture ranking.

## 15. Tests
Public Reel discovery, Story discovery within lifetime, expired Story exclusion, friend activity privacy, not-interested suppression, originality-inconclusive candidate handling, share burst suppression, creator diversity, cold-start discovery and fallback without AI.

# D10 — M07 GAME DISCOVERY — EXPANSION COMPORTEMENTALE
## Discovery universe
M07 ranks games and also provides transferable discovery primitives to public media only when the owner contract delegates that projection. It never invents catalogue entries.
## Candidate pipeline
REQUEST → NORMALIZE → VISIBILITY → SAFETY → COMPATIBILITY → DEDUPE → DIVERSITY → NOVELTY → RANKING → REASON → PROJECTION.
## Social context
Friend activity, group interest, recently played and creator affinity are bounded signals. No sensitive inference.
## Viral hooks
“Play because…”, “friend played”, “created for your group”, “new for you” and “remix this concept” are reason keys tied to factual evidence.
## Cold-start
First-session ranking mixes explicit interests, diverse real popular content, novelty and short games; no fake personalization.
## DONE
Ranking works without AI and remains safe when AI scores disappear or stale data exists.

# D100K — M07 Game Discovery — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M07. Scope: candidate discovery, ranking, recommendations. Dependencies: M01,M02,M03,M06,M13. Primary invariant: ranking is explainable and no fake engagement signals.
For every capability: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
Authorization failure, invalid schema, incompatible version, ownership violation, idempotency conflict or critical dependency failure must produce zero unauthorized authoritative mutation.

## 3. AI boundary
M15 may propose or analyze only through capability contracts. M07 remains authoritative for candidate discovery, ranking, recommendations.

## 4. Proof obligations
SUCCESS + NO-DATA + ERROR + DEGRADED/UNAVAILABLE + REFRESH/REOPEN + DESKTOP + MOBILE + PERMISSION DENIAL + RETRY/REPLAY where applicable.

## 5. Impact obligation
M07 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. UNKNOWN impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
Owner authority cannot be bypassed; duplicate commands cannot duplicate authoritative mutation; stale versions cannot silently overwrite current state; projections remain rebuildable; privacy survives handoffs; VERIFIED requires applicable evidence.

## 7. Completion
This D100K section defines what must be provable. It does not claim implementation completion.


## AI FABRICATION CONTEXT CONTRACT — ANTI-AMBIGUITY AND PROOF GATE

This document is an authoritative fabrication input for **M07-game-discovery** within its declared ownership. It is not a prompt substitute and it must never be interpreted in isolation. A fabrication agent MUST read the complete paired PLAN + TECHNICAL_DESIGN, the applicable transversal contracts, dependency rules, definition of done, and the current repository state before changing code.

### Controlled context before fabrication

The agent MUST establish a concrete context record containing: current branch/commit; exact in-scope files and symbols; existing behavior; missing behavior; files that may be modified; files that are forbidden; direct and transitive dependencies; relevant database/schema/event/API contracts; acceptance criteria; required tests; browser/mobile checks; security/privacy constraints; and evidence required for DONE. Ambiguity MUST be resolved from repository evidence or canonical documents. The agent MUST NOT silently invent a route, field, event, authority, provider, state, interface, or fallback because a detail was omitted from a short task description.

The repository state MUST be classified explicitly as **EXISTS**, **MISSING**, **TO_MODIFY**, **FORBIDDEN**, or **AFFECTED_DEPENDENCY**. Legacy behavior is not current authority unless the canonical documentation explicitly adopts it.

### Separation of understanding and fabrication

The required sequence is: **READ → MODEL CURRENT STATE → CHECK DEPENDENCIES → PLAN → FABRICATE → TEST → VERIFY → INTEGRATE → RECHECK REGRESSION → LOCK**. A successful code generation step is not evidence of correctness. A worker handoff is never proof of integration. The coordinator MUST inspect the integrated commit and re-run the relevant checks.

### Error-reduction contract

The objective is to minimize avoidable implementation errors by reducing what the agent must guess. Quality is measured from observed evidence rather than a guaranteed percentage. Track first-pass task success, correction count, integration defects, regressions, test failures, and browser failures separately. A target such as 80% first-pass success or a 10–20% error envelope may be used as an engineering KPI, but it is never treated as a guarantee or as permission to skip verification.

### Evidence gate

For behavior owned by this document, DONE requires the applicable chain: **code exists → type/build checks → focused tests → contract/integration tests → route/runtime accessibility → desktop/mobile browser verification where relevant → error/reload/permission cases → dependency regression check → fresh evidence recorded**. Anything not freshly demonstrated is **UNVERIFIED**, not implicitly successful.

### Conflict rule

If documentation, repository state, or dependencies disagree, the agent MUST stop the affected fabrication path, identify the conflicting authority, and escalate to the coordinator rather than selecting an undocumented interpretation. This contract strengthens traceability; it does not create a second business or AI authority.
