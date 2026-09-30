# MOIRISE — CONSOLIDATED DESIGN INDEX

## Purpose
This file is the reconciliation layer between the historical MOIRISE documentation and the current canonical architecture. It does not replace module contracts or AI specialist contracts. It identifies the single authoritative location for each concern and defines how an implementation agent must read the repository as one coherent puzzle.

## Authority order
1. `MASTER_REBUILD_V2.md` — product scope and module order.
2. `BUILD_ORDER.md` — implementation gates and canonical module files.
3. `modules/Mxx_*.md` — authoritative module behavior and implementation contracts.
4. `ai/00_MASTER_AI.md` — AI architecture.
5. `ai/01_*` through `ai/13_*` — one specialist contract per AI concern.
6. This file — reconciliation, coverage and cross-document interpretation.
7. Existing source code — evidence only; if code contradicts a canonical contract, stop and reconcile before modifying behavior.

## Documentation depth rule
A sentence such as “the AI creates suspense” is not an implementation requirement. The detailed requirement must define trigger, context, timing, state, decision policy, permitted actions, user-visible result, alternative branches, persistence, notification policy, failure behavior, privacy boundary, telemetry and acceptance tests.

A sentence such as “game creation is supported” must resolve into the complete flow: intent → GameSpecification → planning → asset/code/audio tasks → resource routing → sandbox build → simulation → validation → preview → package → runtime → save/share → recovery.

## User journey canonical behavior
### First session
The system must provide a useful first action quickly, keep permanent navigation sparse, and reveal capabilities progressively. During approximately the first two minutes, behavior is state-driven rather than a fixed timer script. The Context Engine observes only authorized signals and selects a suitable discovery, social, play or creation action. If a genuine continuation exists, the system may establish a future objective such as a next-day continuation. It must never fabricate scarcity, rewards, events or urgency.

### Return behavior
A return invitation is created only from a real pending continuation, event, social response, saved creation, challenge or other user-relevant state. The user can dismiss it. Notification frequency is governed centrally; modules do not invent their own notification policy.

### Captivation principle
MOIRISE optimizes for value, curiosity, discovery, creation and social connection, not coercion. No dark pattern, fake notification, false rarity, forced loop or obstruction of exit is permitted.

## Capability coverage
The canonical AI capability registry covers text, reasoning, vision, image, video, music/audio, speech, translation, search, moderation, embeddings, code and game creation. Product modules request capability IDs and never choose providers directly.

## Distributed execution coverage
The distributed path is `AI Orchestrator → Policy → Resource Router → Scheduler → Worker Registry → Sandbox → Result → Validator`. Trusted workers are operator-controlled. Community workers are explicit opt-in, isolated, and quota-limited. The starting community policy is 1 logical CPU and 512 MB RAM, with GPU/storage disabled by default unless a later policy explicitly enables them.

## Game coverage
2D and 3D games are first-class. Creation and execution remain separate. A finished game package must be runnable without the provider that generated it. The runtime is the authoritative execution environment; provider APIs are creation tools/adapters.

## Feature preservation checklist
The consolidated architecture explicitly preserves: Player identity; SYSTEM interface; social feed; private messaging; communities; discovery; anime/manga/otaku content discovery where enabled; quizzes; 2D games; 3D games; AI game creation; image/video/audio/music creation; progression; titles; rewards/collection; gacha/roulette mechanics where enabled; events; adaptive world behavior; translation; moderation; analytics; administration; distributed workers; provider adapters; and AI-assisted creation.

## Cross-module ownership
- Identity and profile: M02.
- Social posts, reactions and private messaging: M03.
- World/contextual universe state: M04.
- SYSTEM presentation, progression rules and system-level interaction: M05.
- General play surface and game entry: M06.
- Discovery and recommendation surfaces: M07.
- AI game creation: M08.
- Game execution/runtime: M09.
- Multiplayer/social gaming: M10.
- Communities/clans/groups: M11.
- Events and scheduled activities: M12.
- Adaptive world behavior: M13.
- Collection, rewards and progression-linked inventory: M14.
- Meta AI experimentation/lab: M15.

## Anti-duplication rule
If a module needs a rule owned by another module, it references the owner and defines only its local integration. It must not copy the rule. Provider endpoints belong only to the provider registry. Worker security belongs only to worker contracts. AI capability/action identifiers belong only to AI contracts. Shared UI primitives belong to M01.

## Reconciliation procedure
For every future change:
1. Identify the owning contract.
2. Search for conflicting historical wording.
3. Decide whether the historical wording is obsolete, compatible or missing from the canonical contract.
4. Update the canonical owner.
5. Replace dependent duplicates with references.
6. Update dependency/acceptance tests.
7. Do not code until the conflict is resolved.

## Puzzle interpretation rule
An implementation agent must be able to answer, before coding: what owns this behavior, what data enters it, what state it starts in, what state it can reach, which service performs the mutation, which permission allows it, which event records it, what happens on failure, what happens if the provider/worker is unavailable, what the user sees, how mobile differs, how the result is tested, and where the canonical contract lives. If any answer is missing, the design is incomplete.
