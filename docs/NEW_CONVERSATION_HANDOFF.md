# MOIRISE — New Conversation Handoff

Use this file as the continuity checkpoint when a new conversation starts.

## Canonical source of truth

- Repository: `Ndombe234/MOIRISE`
- Canonical plan: `docs/MORISE_MASTER_PLAN_V3.md`
- AI architecture: `docs/MORISE_AI_MECHANICS_MAP.md`
- Adaptive social: `docs/MORISE_ADAPTIVE_SOCIAL_SYSTEM.md`
- Navigation: `docs/MORISE_NAVIGATION_SPEC.md`
- Current status: `docs/MODULE_STATUS.md`
- Execution template: `docs/MODULE_EXECUTION_TEMPLATE.md`

## Current position

**MODULE 6 — PLAY — FINAL QA**

Do not move to Module 7 implementation until the Module 6 QA gate is closed.

## Product doctrine

MORISE is a general-purpose social platform. The SYSTEM is the central intelligent interaction layer connecting PLAYER, WORLD, SOCIAL, PLAY, GUILDS, games, creation and recommendations. Every relevant feature supports SOLO and COLLECTIVE use cases when appropriate.

## MORISE-only AI mission

The AI we build is specifically for MORISE. Its purpose is to operate, understand, assist, personalize and evolve **within MORISE only**: PLAYER, WORLD, SOCIAL, PLAY, games, GUILDS, activities, events, creator tools, translation, recommendations, moderation, progression and internal SYSTEM operations.

The AI may experiment with and improve MORISE-specific code, models, algorithms, prompts, ranking strategies and other mechanisms in an isolated MORISE AI Lab. It must not be designed as a general autonomous agent for unrelated external systems.

The AI Lab can scale from one capable computer to additional machines/GPU resources as available. More compute enables larger experiments but does not by itself prove improvement. MORISE-specific benchmarks must measure candidate versions.

Self-modification is therefore allowed as an **internal MORISE engineering capability**: the AI can generate, test, compare and retain candidate improvements inside its isolated Lab. Production-critical systems remain protected by authorization, security, testing, deployment and rollback boundaries.

## AI requirements

- AI is multi-mechanic, not a chatbot pasted onto the site.
- Personal adaptation can learn from permitted user feedback and behavior from V1.
- Global learning is validated and protected against manipulation/data poisoning.
- Private information is never exposed through hidden inference.
- Translation is a V1 SYSTEM capability and is browser/on-device first, with caching and controlled fallbacks.
- Core MORISE workflows must remain usable if an external AI provider is unavailable.

## Adaptive social requirement

MORISE is not niche-locked. If people with different profiles repeatedly interact around a shared topic, the SYSTEM may detect a non-sensitive affinity signal and propose a GUILD. It must ask for appropriate user confirmation; it must not silently create a persistent group.

## Game requirement

The existing game interface is not a finished programmed game. Preserve it. Every future game is built A→Z using market research, concept, design, prototype, SOLO/COLLECTIVE, content, infrastructure, security, balancing, QA, production and iteration.

## Execution rule

For every module:

**PLAN → CURRENT MARKET RESEARCH → DESIGN → IMPLEMENT → SECURITY/AUTH TEST → MOBILE TEST → PRODUCTION TEST → DOCUMENT → NEXT MODULE**

When repository evidence conflicts with remembered conversation history, inspect the repository and update the canonical documentation rather than guessing.
