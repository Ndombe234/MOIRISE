# MOIRISE — New Conversation Handoff

Use this file as the first continuity checkpoint when a new ChatGPT conversation starts.

## Current baseline

- Repository: `Ndombe234/MOIRISE`
- Current module: **Module 6 — PLAY**
- Module 6 state: **INTEGRATED / FINAL QA**
- Next module: **Module 7 — Game Discovery Engine**
- Do not skip the Module 6 final QA gate.

## Read first

1. `docs/MOIRISE_MASTER_PLAN.md`
2. `docs/MODULE_STATUS.md`
3. `docs/GAME_MARKET_RESEARCH_PROTOCOL.md`

## Product doctrine

MOIRISE is an Otaku social platform where the SYSTEM is the central interaction layer connecting PLAYER, WORLD, SOCIAL and PLAY. Every relevant feature must support both SOLO and COLLECTIVE use cases.

## Module 6 continuity

The PLAY engine / Play Lab and play-session/result-validation infrastructure already exist. There is also a game experience in the product interface, but that game is **not yet a fully programmed finished game**. Preserve it; do not assume it is complete and do not replace it without a documented reason.

The final QA must verify:

- SYSTEM / PLAYER / WORLD / SOCIAL / PLAY navigation;
- WORLD: Discover, Play, Create, Communities, Activities, Events;
- SOCIAL: World, Following;
- authenticated PLAY;
- session lifecycle;
- result validation and tamper rejection;
- duplicate protection;
- progression integration;
- mobile layout;
- loading/error/empty states;
- no blank-screen navigation failures;
- production Render smoke test.

## Future game rule

Never start by coding a requested game blindly. First perform current market research using `GAME_MARKET_RESEARCH_PROTOCOL.md`: demand signals, comparable games, player feedback, platform trends, risks, differentiation, technical feasibility, and solo/collective quality. Do not invent market numbers. Prototype before full implementation.

## Execution rule

For each module: **PLAN → current-market research → design → implementation → authenticated/unauthenticated testing where relevant → mobile testing → production verification → documentation update → next module.**

When this file and the repository disagree with remembered conversation history, inspect the repository and update the documentation rather than guessing.
