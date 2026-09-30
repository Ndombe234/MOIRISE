# M06 — PLAY — CONCEPTION TECHNIQUE

## Runtime boundary
Published GameVersion → manifest verification → sandbox runtime → session state → result submission → server validation.

## Session
GameSession records game/version/player, start, pause, resume, attempt and expiry. Save records schema version and checksum. Resume requires compatible schema.

## Result integrity
Client gameplay signals are untrusted. Competitive/reward-bearing results validate session/attempt identity, allowed ranges, timing and duplicate submission. Only validated events may reach progression/collection.

## 2D/3D
Engines lazy-loaded. A 3D package does not load a 3D stack into the initial Play shell. Runtime crash returns to Play recovery UI.

## Quiz
Attempt references question-set version; submission is validated against the canonical version and cannot be replayed to consume a reward twice.

## Tests
Start/pause/resume/save/load, result forgery, duplicate submit, bad manifest, low-end device, mobile controls, network reconnect and provider-down operation.
