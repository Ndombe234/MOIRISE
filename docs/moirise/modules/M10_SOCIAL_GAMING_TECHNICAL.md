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