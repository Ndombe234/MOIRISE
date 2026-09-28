# MOIRISE — New Conversation Handoff

Use this file as the continuity checkpoint when a new conversation starts.

## Canonical source of truth

- Repository: `Ndombe234/MOIRISE`
- Canonical plan: `docs/MORISE_MASTER_PLAN_V3.md`
- AI architecture: `docs/MORISE_AI_MECHANICS_MAP.md`
- Adaptive social: `docs/MORISE_ADAPTIVE_SOCIAL_SYSTEM.md`
- Navigation: `docs/MORISE_NAVIGATION_SPEC.md`
- Current status: `docs/MODULE_STATUS_V2.md`
- Execution template: `docs/MODULE_EXECUTION_TEMPLATE.md`

## Current position

**MODULE 6 — PLAY — FINAL QA**

Do not move to Module 7 implementation until the Module 6 QA gate is closed.

## Product doctrine

MORISE is a general-purpose social platform. The SYSTEM is the central intelligent interaction layer connecting PLAYER, WORLD, SOCIAL, PLAY, GUILDS, games, creation and recommendations. Every relevant feature supports SOLO and COLLECTIVE use cases when appropriate.

The SYSTEM is designed to evolve toward a true conversational AI experience: context + memory + specialized mechanics + orchestration + tools + controlled learning.

## AI requirements

- AI is multi-mechanic, not a chatbot pasted onto the site.
- Personal adaptation can learn from permitted user feedback and behavior from V1.
- Global learning is validated and protected against manipulation/data poisoning.
- Private information is never exposed through hidden inference.
- Translation is a V1 SYSTEM capability and is browser/on-device first, with caching and controlled fallbacks.
- The system must function even when an external AI provider is unavailable for core product workflows.

## Adaptive social requirement

MORISE is not niche-locked. If people with different profiles repeatedly interact around a shared topic, the SYSTEM may detect a non-sensitive affinity signal and propose a GUILD. It must ask for appropriate user confirmation; it must not silently create a persistent group.

## Game requirement

The existing game interface is not a finished programmed game. Preserve it. Every future game is built A→Z using market research, concept, design, prototype, SOLO/COLLECTIVE, content, infrastructure, security, balancing, QA, production and iteration.

## Execution rule

For every module:

**PLAN → CURRENT MARKET RESEARCH → DESIGN → IMPLEMENT → SECURITY/AUTH TEST → MOBILE TEST → PRODUCTION TEST → DOCUMENT → NEXT MODULE**

When repository evidence conflicts with remembered conversation history, inspect the repository and update the canonical documentation rather than guessing.
