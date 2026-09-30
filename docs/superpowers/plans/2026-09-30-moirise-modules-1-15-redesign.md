# MOIRISE Modules 1-15 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create the authoritative technical design for all 15 MOIRISE modules as separate, self-contained specifications, rebuilt from zero.

**Architecture:** The 15 modules are user-facing/product domains built on a shared Core and MORISE AI orchestration layer. Each module has its own contract, UI, data, events, AI behavior, provider/capability usage, security, performance, tests, failure states, and "do not modify" boundary. The separate AI architecture is documented after the module set.

**Tech Stack:** Next.js 16, React 19, TypeScript, Supabase/Postgres, Supabase Edge Functions, Vitest, ESLint.

**Spec:** `docs/MORISE_MASTER_REDESIGN_V4.md` and the existing canonical architecture documents under `docs/`.

## Global Constraints

- Modules 1-6 are treated as deleted and must be fully reconstructed.
- No module may expose secrets to the browser.
- Modules call capabilities through the MORISE AI Gateway / Capability Registry, never directly through a specific AI provider.
- Heavy functionality is lazy-loaded.
- New internal capabilities do not automatically create new navigation tabs.
- Every module must define loading, empty, error, unavailable, offline/degraded, mobile and regression behavior.
- Every module must be independently testable.
- Real browser validation is required before a module can be accepted.
- Provider failures must degrade gracefully and never cause a blank screen.
- PostHog is an observation/analytics layer, not MORISE memory or brain.
- External providers are interchangeable dependencies; MORISE's interfaces must not be provider-specific.
- Current Supabase secret names are documented exactly as observed and their values remain secret.

## Module file set

- `docs/moirise/modules/M01_FOUNDATION.md`
- `docs/moirise/modules/M02_PLAYER.md`
- `docs/moirise/modules/M03_SOCIAL.md`
- `docs/moirise/modules/M04_WORLD.md`
- `docs/moirise/modules/M05_SYSTEM.md`
- `docs/moirise/modules/M06_PLAY.md`
- `docs/moirise/modules/M07_DISCOVERY.md`
- `docs/moirise/modules/M08_GAME_FACTORY.md`
- `docs/moirise/modules/M09_GAME_ENGINE.md`
- `docs/moirise/modules/M10_SOCIAL_GAMING.md`
- `docs/moirise/modules/M11_COMMUNITIES.md`
- `docs/moirise/modules/M12_EVENTS.md`
- `docs/moirise/modules/M13_ADAPTIVE_WORLD.md`
- `docs/moirise/modules/M14_COLLECTION.md`
- `docs/moirise/modules/M15_META_AI_LAB.md`

## Common structure required in every module file

1. Purpose and scope
2. User experience and entry points
3. UI layout and responsive behavior
4. Exact user actions/buttons
5. MORISE dialogue/behavior
6. Data model and persistence
7. Events
8. AI capabilities
9. Provider usage
10. Secrets
11. Security/RLS/permissions
12. Performance/lazy loading/cache
13. Loading/empty/error/unavailable/offline states
14. File/component/service boundaries
15. Test strategy
16. Acceptance criteria
17. Dependencies
18. Do-not-modify boundaries
19. Handoff notes for a new AI

## Review focus

- A module must remain usable when every optional AI provider is unavailable.
- An AI response must never have direct unrestricted write access to application state.
- A large module specification must not imply loading all of its code or context at runtime.
- Shared contracts must be stable and provider-neutral.
- Private user data, private messages and unpublished creations must never leak through analytics, moments, sharing, or learning flows.

## Execution order

1. Write the 15 module specifications.
2. Self-review terminology, module boundaries, dependency direction, secret names and provider-neutral interfaces.
3. Update the module index/status to state that all 15 modules are being rebuilt from zero.
4. After the module set is reviewed, write the standalone MORISE AI technical design as separate AI-engine documents.
5. Only then produce implementation plans for code work.
