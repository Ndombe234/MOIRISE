# M06 — PLAY — CONCEPTION TECHNIQUE APPROFONDIE

## 1. Boundary
M06 owns the single PLAY surface, play session lifecycle, experience launch boundary, saves, result submission and Moment creation trigger. M09 owns runtime; M07 owns discovery/ranking.

## 2. One-door design
Primary UI contract:
PLAY NOW.
The surface can show one recommended experience and concise context, with secondary alternatives only when useful. No giant catalogue on the primary surface.

## 3. Experience Definition
GameDefinition:
id; version; family; engine; summary; unlock policy; runtime ref; capability requirements; input mapping; performance budget; share policy.

## 4. Session
start:
authenticated actor → M07 selection → allowlist check → server seed/config → PlaySession create → launch.
Session carries playerId, gameVersion, seed, expiry, status, attempt id.

## 5. Runtime boundary
M06 mounts an approved M09 runtime package. Runtime is sandboxed and never gets production database credentials.

## 6. Result
Client observations/actions are untrusted.
submit → session owner check → attempt state → deterministic validator → result proof → M05 progression event.
One attempt = one progression effect.

## 7. Saves
Save = session/version + schema version + serialized state + checksum + updatedAt.
Resume requires ownership and compatible schema.
Incompatible save returns recoverable “old version” state rather than silent corruption.

## 8. Moment
Moment is created only from a validated interesting result:
personal best, rare discovery, creation, challenge result, quest completion.
Moment projection strips private state.

## 9. Share
Share token references a published result/experience. It cannot mutate the source session.

## 10. Mobile
Control mapping must support touch. Reduced-motion policy must be respected. 390x844 is baseline.

## 11. Errors
Runtime crash → contained fallback → Play shell.
Provider unavailable → experience remains playable when package is local.
Save failure → retry/recover without duplicate progression.
Duplicate completion → original result.

## 12. AI
M15/M07 can select, adapt and explain. AI never directly writes score/XP.

## 13. Tests
Session ownership, expiry, tampered score, duplicate result, save schema, share privacy, runtime crash, mobile, reload, anonymous access.

## 14. DONE
Play remains useful alone, loads quickly, has truthful states and protects result/progression integrity.

## 15. Concrete APIs
getRecommendedExperience(playerContext)
startPlaySession(experienceId)
savePlaySession(sessionId,state)
resumePlaySession(saveId)
submitPlayResult(sessionId,attemptPayload)
createMoment(resultId)
createShareToken(momentId)

## 16. Result validation
Validator receives server session seed/config plus client observation.
It checks:
attempt belongs to session;
session active/not expired;
action log size and schema;
impossible transitions;
score bounds;
completion state;
idempotency.

## 17. Experience families
Pulse = short skill.
Drift = micro exploration.
Forge = creation mini-experience.
Duel = asynchronous challenge.
Quest = progression.
World = heavier 3D where justified.

## 18. Runtime recovery
If engine throws, M06 marks runtime failure, stores safe diagnostics, returns to Play shell and preserves any valid previous save.
If save writes twice, version/checksum resolves last authoritative state.

## 19. Acceptance
A Player can launch one experience with one clear action; a failed optional provider never makes the whole Play page blank.
