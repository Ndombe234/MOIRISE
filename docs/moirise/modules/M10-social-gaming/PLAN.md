# M10 — SOCIAL GAMING — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Un défi n'est pas juste un bouton. La chaîne exacte est : résultat validé → règle de défi immutable → cible/visibilité → invitation → tentative indépendante → validation → comparaison → rematch éventuel.

## 1. Owner
M10 possède l'état des challenges et comparaisons. M06 possède les sessions de jeu; M11 possède membership des communautés; M05/M14 consomment les résultats validés.

## 2. Create Challenge
Acteur Player. Déclencheur Share/Challenge depuis un résultat validé.
Préconditions : resultId valide; source partageable; target policy.
Étapes : vérifier résultat → copier uniquement les paramètres nécessaires de rulesVersion → définir target/visibility/expiry → créer Challenge immutable → créer invite/ref.
Source privée jamais exposée par la challenge card.

## 3. Async Attempt
Le destinataire ouvre → vérifier que Challenge est ACTIVE et qu'il n'est ni expiré ni interdit par block/privacy → créer ChallengeAttempt → demander une nouvelle PlaySession à M06 → associer result au challenge après validation.
L'ancienne tentative n'est jamais modifiée.

## 4. Comparison
Comparer seulement AuthoritativeResults. Utiliser la même rulesVersion/tie rule pour tous. Le client reçoit une ComparisonProjection, jamais une victoire calculée localement considérée comme officielle.

## 5. Rematch
Rematch crée un nouveau Challenge avec une nouvelle session. L'ancien challenge et son résultat restent immuables. Rate limits évitent une création infinie.

## 6. Community Challenge
M10 reçoit une demande depuis M11 mais revalide membership/permissions au moment de l'action. La communauté ne devient pas source de vérité de membership.

## 7. Abuse controls
Avant création, accept, attempt ou rematch : block/mute check, rate limit, expiry, dedupe, result integrity. Abuse flags peuvent créer un hook vers la modération, pas une punition autonome.

## 8. États
Challenge DRAFT → ACTIVE → COMPLETED/EXPIRED/CANCELLED.
Attempt PENDING → ACTIVE → VALID/INCONCLUSIVE.
Comparison READY seulement si les inputs autoritatifs sont valides.

## 9. Tests / DONE
Duplicate challenge, blocked target, expired challenge, concurrent rematch, invalid score, private result sharing, community membership revoked, mobile/desktop, network loss and idempotent retry.

## AI-INTÉGRATION M10 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M10 possède les interactions sociales autour du jeu partagé : participants, party, coordination et règles sociales de la session.

### B. AI cases
Suggestion d'équipe, coordination, matchmaking assistance, suggestion d'activité et synthèse de session.

### C. Context
Participant IDs nécessaires, rôle/permission, game/session state autorisé, préférences explicitement consenties. Pas de lecture libre des DMs ou communautés.

### D. Authority
AI proposal → M10 policy → participant checks → commit. M15 ne peut pas ajouter/supprimer un participant ni modifier un rôle sans use-case M10 autorisé.

### E. DONE
Les suggestions sont réversibles, explicables et n'exposent aucun participant privé non nécessaire.

## GAME PLATFORM — INTÉGRATION M10 / JEUX SOCIAUX

M10 permet à un jeu fabriqué par M08 et exécuté par M09 d'utiliser une couche sociale commune.

GameSpecification peut déclarer des hooks : party, invite, challenge, shared score, spectator ou cooperative objective.

Le jeu produit des événements de gameplay validables. M10 possède l'état social partagé et vérifie membership, permissions et privacy.

M15 peut proposer composition d'équipe, matchmaking assistance, résumé ou événement social. La proposition devient active seulement après validation M10.

Un jeu sans hook social reste un jeu solo. Aucun social layer n'est ajouté artificiellement.

# D10 — M10 SOCIAL GAMING — EXPANSION COMPORTEMENTALE
## Social game objects
Challenge, rematch, party, co-op invite, spectator projection, team, result card and game-linked conversation.
## Loop
PLAY → RESULT → SOCIAL_ACTION → INVITE/SHARE/REMATCH → NEW_SESSION.
## Boundaries
M10 owns social hooks; M06 owns play session; M11 owns membership; M14 owns rewards.
## Media integration
A validated Reel/Story/photo can include a game launch action. A game result can produce a media card only from authoritative result data.
## Anti-spam
Invite dedupe, recipient controls, mute, frequency caps and block enforcement.
## Viral loops
Challenge links should make the next action obvious and reversible: play, join group, rematch or share result.
## DONE
Friend/group challenge, privacy, block, duplicate invite, build removal and mobile/desktop behavior tested.

# D100K — M10 Social Gaming — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M10. Scope: challenges, rematch, social game events. Dependencies: M03,M06,M11,M12. Primary invariant: social state cannot falsify game results.
Capability transition: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
No authoritative mutation on failed auth/policy/schema/version/ownership/idempotency guards or unavailable critical dependency.

## 3. AI and cross-module boundary
M15 may propose/analyze but cannot mutate M10 private authority. Consumers use defined contracts/events/projections only.

## 4. Proof obligations
Nominal, empty/no-data, error, unavailable/degraded, retry/replay, refresh/reopen, permission denial, concurrency where relevant, desktop and mobile, plus adversarial cases specific to M10.

## 5. Impact obligation
M10 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.

## 6. Formal properties
Authority is unique; duplicate commands are idempotent; stale versions do not overwrite; projections remain rebuildable; privacy follows the object; VERIFIED requires fresh applicable evidence.

## 7. Completion
This section defines proof requirements, not implementation completion.


# D100K — HISTORICAL CONTRACT RESTORATION — M10 SOCIAL GAMING

## Restored contracts
`Challenge={id,gameId,creatorId,targetId?,rulesHash,expiresAt}`
`ScoreSubmission={gameId,sessionId,playerId,score,stats:Record<string,number>,clientNonce}`
`LeaderboardEntry={playerId,score,rank,seasonId}`

Server validates session, package version, scoring-rules hash, timing bounds, identity and nonce before accepting a score. Invalid/suspicious results are rejected or quarantined. Leaderboards use deterministic ordering, stable tie-breakers, pagination and explicit season/rules versions.

Spectator mode is optional when a game declares it. AI matchmaking/recommendation is advisory; deterministic fallback is mandatory.

## D100K proof
Forged score, duplicate submission, stale rulesHash, expired challenge, block/privacy restriction, season rollover, tie handling, spectator permission, AI outage and public/private share separation.



# D100K — RESTORED ASYNC / SHARE LOOP

Social gaming remains solo-first. A Player can publish a challenge result, invite asynchronously, collaborate, rematch or contribute to a community goal without simultaneous presence.

Sharing communicates something the Player actually did or created rather than advertising MORISE. A dead friend list must not make PLAY appear empty; available public/community activities can provide truthful alternatives.

D100K: stale target, expired challenge, private result leakage, duplicate participation, blocked recipient, empty friend list, async retry and public share reconstruction.



# D100K — EXPLICIT SPECTATOR / SOCIAL VALIDATION RESTORATION

Spectator behavior is available only when the GameSpecification/RuntimeManifest declares it. Social invitations/share operations resolve current block, privacy and eligibility rules before producing any public action.

D100K: unauthorized spectator, blocked invite, private result leak and stale eligibility.

