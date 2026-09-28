# MOIRISE Module 6 — Single PLAY Entry Decision

**Status:** APPROVED + IMPLEMENTED ON FEATURE BRANCH  
**Date:** 2026-09-28

## Product decision

PLAY must present **one simple entry point** to the Player.

The Player must not be shown a catalogue, grid, list, ranking, or inventory of games. The internal experience catalogue may grow extremely large — conceptually millions of experiences — without making the interface more complex.

The visible interaction is:

`PLAY → SYSTEM selection → assigned experience`

## Selection principle

The selected experience is determined by the Player's current state and evolution, including available SYSTEM dimensions, level, recent experiences, and session context.

Initial selection remains deterministic and rule-based. It must not claim to use machine learning before there is sufficient behavioural data and an explicit ML architecture.

Future preference/taste signals may be added through the Player onboarding and subsequent behaviour, but the current implementation must use only data that actually exists in the repository and database.

## UX rules

- One primary PLAY action.
- Do not expose all available games to the Player.
- Do not expose a fixed "40 games" catalogue.
- Do not show fake popularity, rankings, population, or engagement counts.
- The selected experience may be named and explained after the SYSTEM has chosen it.
- The Player can launch the selected experience with the single `PLAY` action.
- The result route may expose the outcome and a shareable URL.
- The Player can return to PLAY and receive a selection based on the current state.

## Catalogue rule

The previous canonical "40-game" requirement is retired as a Module 6 implementation constraint. The project does not need to maintain a fixed game count.

Experiences are selected for product value, solo fun, replayability, SYSTEM integration, shareability, performance, accessibility, and the ability to create different Player journeys.

No future game should be added merely to increase a game count.

## Evolution loop

```text
Player
  ↓
SYSTEM state + behaviour signals
  ↓
PLAY selector
  ↓
one selected experience
  ↓
result
  ↓
server validation
  ↓
SYSTEM progression
  ↓
new Player state
  ↓
next PLAY selection
```

## Verification requirements

Every Module 6 change must be tested both technically and as a normal user flow:

- authenticated entry;
- one-tap/one-action PLAY launch;
- selected experience loads;
- game can complete;
- restart works;
- refresh is coherent;
- browser back works;
- direct game access respects authentication;
- result route is recoverable;
- rapid repeat submission does not duplicate progression;
- 390px mobile layout has no horizontal overflow;
- desktop layout remains usable;
- no catalogue of games is exposed.

This decision supersedes any earlier Module 6 wording that instructed the UI to expose a fixed game inventory.
