# MOIRISE Module 6 — PLAY Engine & Play Lab

**Status:** IMPLEMENTATION IN PROGRESS
**Date:** 2026-09-28

## Goal

Turn PLAY into a single simple door behind which MOIRISE can host a very large and evolving universe of experiences. The Player does not browse a catalogue: the SYSTEM selects one experience according to the Player's tastes when known, current SYSTEM evolution, dimensions, history, recent play and session context.

The depth of the catalogue is intentionally invisible to the Player. The architecture must be able to grow to a very large number of experiences without changing the simple product shell.

## Product decisions

### One visible PLAY door

The Player sees one primary PLAY action.

The Player must not see:
- a giant games catalogue;
- a list of all available games;
- a fixed inventory count;
- a "top games" ranking;
- fake popularity metrics;
- a mandatory game browser.

The selected experience may be named and briefly explained before launch, but PLAY remains one decision: enter the experience chosen by the SYSTEM.

### No fixed 40-game catalogue

The former canonical 40-game inventory is retired and must not be treated as a product constraint.

Moirise will not promise a fixed number of games.

Experience selection and future experience creation are product decisions based on:
- usefulness to the Player journey;
- solo fun;
- replayability;
- distinctive mechanics;
- SYSTEM integration;
- shareable moments;
- mobile/web performance;
- accessibility;
- market evidence;
- actual Player behavior once data exists.

The current Play Lab experiences are prototypes and may be replaced when evidence shows a better direction.

### Player-specific evolution

The same PLAY button can lead to different experiences for different Players.

The selection may consider:
- declared tastes/preferences when those signals exist;
- SYSTEM level;
- SYSTEM dimensions;
- recent experiences;
- previous results;
- session length/context;
- discovery/novelty needs;
- future validated behavioral signals.

Selection must evolve as the Player evolves.

A Player must never be permanently classified by a single early choice.

## Architecture

Authenticated PLAY shell
→ server-side selection context
→ deterministic selection engine
→ typed experience definition
→ server-owned play session
→ client interaction
→ server validation
→ idempotent SYSTEM progression
→ result/Moment context
→ next selection influenced by real history

The client never authoritatively assigns XP, score, progression, or session outcome.

## Experience families

The engine supports:
- Pulse — short skill loops;
- Drift — compact exploration;
- Forge — creation;
- Duel — asynchronous challenges;
- Quest — progression experiences;
- World — selective 3D experiences.

Families are an extensibility mechanism, not a menu that must be exposed to Players.

## Current Play Lab

The repository currently validates the engine with:
- Echo Trace
- Signal Bloom
- Shadow Courier

These are implementation prototypes, not a permanent catalogue. Additional experiences must be introduced only when they improve the product.

## Adaptive selection

Initial selection is deterministic and explainable.

Signals include:
- level gating;
- dimension affinity;
- recent-game avoidance/cooldown;
- session-duration fit;
- discovery/novelty;
- preference signals when available.

Do not claim machine learning before the system has sufficient real data.

The selector must have deterministic tie-breaking.

## Security and persistence

Every run gets a server-owned session and challenge.

The client submits only player actions needed for validation.

The server:
- owns the challenge seed/session;
- validates the action log;
- enforces expiry;
- records the result;
- awards progression through the existing SYSTEM RPC;
- uses an idempotency key based on Player + experience + attempt.

Direct client calls must not be able to invent arbitrary experience IDs/challenges that are outside the active experience registry.

## Results and Moments

A completed experience can produce a Moment candidate such as:
- personal best;
- precision;
- discovery;
- unusual route;
- challenge result.

The result route is private until the dedicated Moments/social-sharing module exposes it publicly.

No fabricated engagement is permitted.

## Performance

- Mobile-first;
- target 390x844 without horizontal overflow;
- small 2D games use browser-native DOM/SVG/Canvas where appropriate;
- lazy-load game experiences;
- do not load the complete experience universe into the main shell;
- 3D/WebGL is selective and isolated.

## UX constraints

PLAY must feel like a door, not a dashboard.

The Player should think:
"PLAY" → "the SYSTEM chose something for me" → "I play" → "my SYSTEM changed."

A Player may learn more through the experience, but discovery must remain progressive.

## Definition of done

Module 6 is complete only when:

1. PLAY is an authenticated real destination.
2. The visible PLAY surface contains one primary PLAY action and no catalogue grid.
3. Selection is server-side, deterministic, explainable and Player-specific.
4. Selection uses real SYSTEM state and recent history.
5. At least three experiments are playable end-to-end.
6. Game sessions and challenges are server-owned.
7. Invalid or replayed results cannot award duplicate progression.
8. Direct access without authentication is blocked.
9. Result state is recoverable by direct URL for the owning Player.
10. Mobile and desktop layouts work.
11. Typecheck passes.
12. Unit tests pass.
13. Production build passes.
14. Browser QA covers launch, play, completion, replay, refresh, back navigation, mobile viewport and direct route access.
15. Documentation records the final decisions and verification evidence.
