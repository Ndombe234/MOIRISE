# MOIRISE Module 10 — SOCIAL GAMING

## 1. Purpose

Relier les jeux aux interactions sociales : coop, défis, scores, compétitions, partage, parties collectives.

## 2. UX

Afficher l'activité sociale dans le contexte du jeu sans transformer PLAY en réseau social complet.

## 3. Modes

- solo ;
- duo ;
- groupe ;
- compétition ;
- coop ;
- spectateur lorsque le jeu le permet.

## 4. MORISE

Elle peut :
- proposer un partenaire ;
- expliquer les règles ;
- préparer un défi ;
- résumer une session.

Elle ne choisit pas arbitrairement un adversaire pour un joueur sans règle/permission.

## 5. Data

game_groups
game_sessions_social
game_invites
game_scores
game_challenges

## 6. Events

MATCH_CREATED
PLAYER_JOINED
PLAYER_LEFT
CHALLENGE_CREATED
CHALLENGE_COMPLETED
SOCIAL_RESULT_SHARED

## 7. AI

RECOMMENDATION
MATCHMAKING
MODERATION
TRANSLATION
GAME_ASSISTANCE

## 8. Security

- membership checks ;
- anti-cheat ;
- score validation ;
- invite permissions ;
- private lobby isolation.

## 9. Performance

Realtime uniquement là où nécessaire.
Ne pas maintenir des subscriptions sur toutes les communautés et parties du système.

## 10. Tests

- invite ;
- join/leave ;
- score ;
- tampered result ;
- disconnect ;
- reconnect ;
- moderation unavailable ;
- mobile.

## 11. Acceptance

Les expériences collectives fonctionnent sans dépendre d'un provider IA.

## 12. Do not modify

Ne pas construire ici la gestion générale des communautés.


---

# M10 — SOCIAL GAMING — COMPLETE TECHNICAL CONTRACT

## Responsibility
M10 connects validated game sessions to social identity: scores, challenges, sharing, leaderboards and cooperative participation. M09 is runtime authority; M03 is social messaging/feed authority.

## Data
`game_sessions`, `game_scores`, `game_challenges`, `game_shares`, `game_participants`, `leaderboard_snapshots`.

## Types
```ts
interface ScoreSubmission { gameId:string; sessionId:string; playerId:string; score:number; stats:Record<string,number>; clientNonce:string; }
interface Challenge { id:string; gameId:string; creatorId:string; targetId?:string; rulesHash:string; expiresAt:string; }
interface LeaderboardEntry { playerId:string; score:number; rank:number; seasonId:string; }
```

## Score validation
Client scores are untrusted. Server validates session, package version, scoring rules hash, timing bounds, player identity and nonce. Invalid/suspicious results are rejected or quarantined.

## Challenge lifecycle
`created → accepted/declined → active → completed/expired/cancelled`. Every transition is authorized and idempotent. Blocked/ineligible targets cannot be invited.

## Sharing
Share references point to public game/result data. Never duplicate private session data into a public post. M03 privacy and block rules remain authoritative for social publication.

## Leaderboards
Use deterministic ordering and stable tie-breakers. Recompute or update from validated scores only. Paginate large boards. Season/rules versions are explicit.

## AI boundary
AI may explain results, propose challenge wording or recommend games/challenges. It cannot mutate scores, ranks, permissions or challenge state directly.

## UI
Results appear after play, on profiles, messages and Play. Do not create a permanent navigation door.

## Tests
Score forgery; duplicate submission; race conditions; challenge expiry; privacy; blocks; leaderboard pagination/ties; offline retry; concurrent submissions; share authorization; mobile result sharing.

## Done gate
Only validated results influence rankings and every social gaming action is recoverable and permission-safe.



## 17. Canonical implementation runbook

1. Bind social-gaming records to an authoritative GameSession from M09.
2. Validate score submissions against game/package/session/rules version.
3. Add nonce/idempotency protection for every score or challenge completion.
4. Resolve block/privacy/ineligibility rules before invites or sharing.
5. Store leaderboard snapshots separately from raw submissions for efficient reads.
6. Support disconnect/reconnect without creating duplicate participation.
7. Keep social sharing as a reference to an authorized result, not a dump of private session state.
8. Make matchmaking opt-in and policy-based.
9. Keep AI matchmaking/recommendation optional; deterministic fallback must exist.
10. Test forged score, duplicate score, expired challenge, blocked participant, reconnect and mobile sharing.

### Canonical server contracts
createGameInvite, joinGameGroup, leaveGameGroup, submitValidatedScore, createChallenge, completeChallenge, getLeaderboard.

### Completion proof
Only validated gameplay results can affect social scores, rankings or challenges.

## 21. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.