# M05 — SYSTEM / PROGRESSION / EVOLUTION — CONCEPTION TECHNIQUE APPROFONDIE

## 1. Boundary
M05 owns visible SYSTEM interaction, deterministic progression projections, mission presentation, titles/achievements presentation, Trace and contextual Evolution Engine surfaces. M15 owns AI orchestration and learning mechanics.

## 2. SYSTEM command model
SystemCommand = { commandId, capabilityId, contextRef, requestedAt, sourceSurface }.
Execution route:
SYSTEM surface → M01 gateway → owner module/M15 capability → result → SYSTEM feedback.

SYSTEM never executes a mutation merely because it displays it.

## 3. Progression ledger
XP is an append-only-ish ledger of validated grants.
Each transaction:
playerId;
sourceEventId;
amount;
ruleVersion;
idempotencyKey;
createdAt.
Level is a projection, not a client input.

## 4. Titles
TitleDefinition includes titleId, grammar/rule version, unlock condition and presentation metadata.
UnlockedTitle references playerId + deterministic title identity + evidence.
The design supports a large combinatorial title space without precreating one million rows.

## 5. Achievements
Achievement criteria are versioned. Completion proof references validated source events.
Repeated events cannot grant the same achievement twice.

## 6. Missions
Mission lifecycle:
AVAILABLE → ACCEPTED → ACTIVE → COMPLETED/FAILED/EXPIRED.
Eligibility is server-side.
Missions may originate from standard content or M15 Missions From Reality candidates after policy validation.

## 7. Trace
Trace records meaningful actions, discoveries, creation milestones and validated progression. It is not a raw activity dump.
Trace entries have privacy, retention and utility.

## 8. Evolution Engine hooks
Evolution Engine reads permitted Trace signals and returns candidates:
Hidden Possibility;
Detour;
Unexplored Path;
Fun & Surprise;
contextual challenge;
Living Object transformation proposal.

M05 applies frequency/suppression rules before display.

## 9. Fun & Surprise
Eligibility checks:
recent surprise;
quiet state;
focus state;
cooldown;
real triggering condition;
risk policy.
Surprises cannot create fake events or alter critical data.

## 10. MORISE DNA presentation
M05 can show demonstrated capability progress and unlocks. It does not collect sensitive traits.

## 11. SYSTEM visual behavior
HUD can use an original holographic progression grammar inspired by the feeling of a personal game SYSTEM, but must not copy protected character art, story, UI text or assets.
The system should stay calm, not spam “SYSTEM” labels.

## 12. Notifications interaction
M05 emits candidate reasons; M12/M14-style notification ownership determines delivery. Return prompts require a real future state.

## 13. Security
AI cannot directly mutate XP/title/reward. Owner module + server validation is required.

## 14. Tests
XP idempotency; title identity; achievement proof; mission eligibility; surprise suppression; focus suppression; real-continuation check; mobile SYSTEM navigation; no fake event.

## 15. DONE
SYSTEM feels alive while remaining truthful, bounded, recoverable and deterministic where progression is critical.