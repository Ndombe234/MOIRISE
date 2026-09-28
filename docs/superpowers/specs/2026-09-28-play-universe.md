# MORISE Play Universe — Design

**Status:** APPROVED DIRECTION / IMPLEMENTATION IN PROGRESS
**Date:** 2026-09-28

## Objective

Create MORISE's PLAY layer as a real entertainment system rather than a generic game catalogue.

The user should see one simple action:
**PLAY**

Behind it, MORISE can select an experience based on the Player's current progression, context, history, and unlocked content.

The first implementation must prove the loop with lightweight 2D browser games while preserving a clean contract for future 3D experiences.

## Market conclusions

The 2026 market is large and increasingly mature. Newzoo forecasts $213.9B in global games revenue and 3.7B players in 2026. Mobile remains the largest platform by revenue, but downloads are not the only growth lever. Discovery and long-term audience value are becoming more important as the market matures.

Roblox is investing heavily in discovery and now exposes gameplay videos directly in discovery surfaces. Its creator ecosystem is also emphasizing long-term player value rather than only first-session clicks.

Research reviewed for MORISE also points toward:
- personalization;
- community co-creation;
- asynchronous competition;
- solo-friendly social loops;
- strong first-seconds communication of the core experience.

MORISE should use those signals without cloning their implementations.

## Product thesis

MORISE games should be **mechanic-first, social-ready, and SYSTEM-aware**.

A good MORISE game has:
1. a single unusual mechanic;
2. a result in under a few minutes;
3. a meaningful skill curve;
4. an optional asynchronous challenge;
5. a shareable Moment;
6. a progression consequence;
7. a path that remains valuable when played alone.

The game must be enjoyable before social features are added.

## Originality gate

A game cannot enter the MORISE catalog merely because it is technically new.

Before promotion from prototype to canonical catalog, the design must answer:
- What is the one mechanic?
- Which familiar genre expectations does it intentionally break?
- What existing games were reviewed?
- What is different from those references?
- Why is the mechanic fun after the novelty wears off?
- What produces the shareable Moment?
- Can the game remain understandable in a short gameplay clip?

A prototype that fails the originality gate stays a prototype.

## Initial prototype slate

These are **experimental prototypes**, not the canonical 40-game inventory.

### Prototype A — ECHO GRID

A tiny spatial routing game where the Player's actions are echoed several turns later.

The Player is not only solving the board in the present. They are planning around their own delayed past actions.

Core mechanic:
- move a signal;
- rotate a relay;
- trigger a pulse;
- after a short delay, the previous action sequence is replayed.

The challenge comes from cooperating with the future consequences of the Player's own earlier decisions.

Shareable Moment:
- the final route and the number of avoided collisions;
- the Player can challenge another user to beat the same seed.

### Prototype B — SHADOW FORGE

A micro creation/strategy game.

The Player programs a tiny shadow companion with a short sequence of actions. The world then executes the sequence. The Player gets a limited number of edits to improve the result.

Core mechanic:
- create a short behavior sequence;
- observe the result;
- spend limited edits;
- replay.

Shareable Moment:
- the Player's compact behavior recipe;
- another Player can attempt the same scenario.

### Prototype C — RULEFALL

A reaction/logic game where the arena's rule changes after correct decisions.

The Player must infer the current rule from the environment and adapt, rather than memorizing a fixed solution.

Core mechanic:
- the world changes one rule at a time;
- the rule is observable but not explained in a sentence;
- success requires recognizing the change rather than reacting faster alone.

Shareable Moment:
- final rule chain;
- score;
- unusual survival path.

## Shared Game Contract

Every game implements:

GameDefinition -> unlock condition -> launch -> play -> result -> progression event -> Moment

Required definition fields:

- id
- name
- family
- version
- mode (2d or 3d)
- estimatedDurationSeconds
- solo
- shareable
- unlock
- buildLaunch
- createMoment

The engine owns lifecycle and progression dispatch. Individual games own their internal mechanics.

## Play engine

The engine provides:
- game selection;
- session seed generation;
- session status;
- score/result normalization;
- restart;
- completion;
- abandonment;
- retry-safe persistence;
- shareable Moment generation.

The UI should not calculate SYSTEM XP rules.

## Progression

Game completion creates a real SYSTEM event in the play dimension.

The event must be:
- server-authorized;
- idempotent;
- tied to the game run;
- safe against double-clicks;
- safe against refresh/retry;
- safe against two browser tabs.

The first implementation uses small XP values and reserves richer balancing for later telemetry.

## Persistence

Introduce a game-run table storing:
- player;
- game;
- seed;
- status;
- score;
- duration;
- result metadata;
- idempotency key;
- timestamps.

Only the owning Player can read their runs.

## Sharing

A Moment is represented by a stable deep link to the game and its challenge payload.

The recipient should be able to enter the relevant game path without requiring the sender and recipient to be online together.

No forced referral reward is used.

## 2D / 3D strategy

2D is the default for early MORISE games because it allows faster load, broader device coverage, easier mobile QA, and shorter iteration loops.

3D is reserved for experiences where spatial interaction is genuinely the core mechanic.

The engine must not couple game definitions to a rendering library so future 3D games can use a separate adapter.

## Anti-patterns

Do not ship:
- reskinned Flappy Bird-like games;
- generic endless runners;
- generic match-three;
- generic trivia clones;
- fake multiplayer;
- artificial referral spam;
- pay-to-win progression;
- fake leaderboards;
- fabricated activity;
- mechanics that require a large active population.

## Canonical inventory protection

The known MORISE product direction references exactly 40 games.

The canonical 40-game list is not currently present in the accessible repository/library sources. This module therefore must not silently replace or reinterpret that inventory.

Prototype games remain explicitly separate until the canonical inventory source is recovered and reconciled.

## Success criteria

- PLAY has one simple primary entry.
- The engine can select an unlocked prototype.
- At least three experimental 2D games use the shared contract.
- A game run can start, complete, abandon, and restart.
- Results persist idempotently.
- Completion can create a SYSTEM play progression event.
- Moments have deep links.
- No horizontal overflow at 390x844.
- Unit tests cover lifecycle, seeds, idempotency, validation, and scoring.
- Production build and CI pass.
- Browser QA covers normal play, refresh, back/forward, rapid input, completion, retry, and mobile.
