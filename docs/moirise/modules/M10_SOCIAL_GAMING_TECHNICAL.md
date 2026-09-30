# M10 — SOCIAL GAMING — TECHNICAL CONTRACT

## Boundary
M10 connects games with social identity: scores, challenges, sharing, leaderboards and cooperative sessions. It never owns the game runtime.

## Data
`game_sessions`, `game_scores`, `game_challenges`, `game_shares`, `game_participants`.

## Types
```ts
interface ScoreSubmission { gameId:string; sessionId:string; score:number; stats:Record<string,number>; clientNonce:string; }
interface Challenge { id:string; gameId:string; creatorId:string; targetId?:string; rules:unknown; expiresAt:string; }
```

## Trust
Scores are validated server-side against session metadata and game-defined scoring rules. Client scores are untrusted. Suspicious submissions are marked for review, never silently promoted.

## UI
Sharing is contextual from game results. Challenges and co-play are contextual surfaces inside Play, profile and messages rather than new global navigation doors.

## AI boundary
AI may summarize results or suggest challenges through typed capabilities, but cannot directly mutate scores or rankings.

## Tests
score validation, duplicate submission, expired challenge, participant permissions, sharing privacy, offline retry and leaderboard pagination.

## Done gate
Players can play, submit validated results, challenge/share with others and recover from network interruptions.