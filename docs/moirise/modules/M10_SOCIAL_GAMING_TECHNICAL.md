# M10 — SOCIAL GAMING — TECHNICAL DESIGN

## Boundary
M10 connects validated game sessions to social identity: scores, challenges, sharing, leaderboards and cooperative participation. M09 remains the runtime authority.

## Data
`game_sessions`, `game_scores`, `game_challenges`, `game_shares`, `game_participants`, `leaderboard_snapshots`.

## Types
```ts
interface ScoreSubmission { gameId:string; sessionId:string; playerId:string; score:number; stats:Record<string,number>; clientNonce:string; }
interface Challenge { id:string; gameId:string; creatorId:string; targetId?:string; rulesHash:string; expiresAt:string; }
interface LeaderboardEntry { playerId:string; score:number; rank:number; seasonId:string; }
```

## Trust
Client score data is untrusted. Server validates session existence, game package version, scoring rules, timing and duplicate nonce. Suspicious results are quarantined/reviewed rather than silently promoted.

## Sharing
Sharing creates a social reference to a game/result, not a copy of private session data. Privacy settings and block relationships are evaluated server-side.

## Challenges
Challenge creation is idempotent, expires deterministically and cannot target blocked/ineligible users. Participation is permission-checked.

## AI boundary
AI may explain results, generate challenge text or recommend a game/challenge through capabilities. It cannot directly mutate scores, ranks or participant permissions.

## UI
Contextual surfaces appear after a game, in profile and messages, and inside Play. No new permanent navigation door.

## Tests
score forgery, duplicate submission, challenge expiry, privacy, block rules, leaderboard pagination, offline retry, concurrent submissions and mobile result sharing.

## Done gate
Only validated results influence rankings and social actions remain recoverable and privacy-safe.