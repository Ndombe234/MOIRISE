# MORISE Adaptive Arcade

## Product direction

MORISE should feel like a place users want to tell someone about: "viens voir ce que ce site fait." Games are therefore not a separate casino-like catalog. They are short, replayable experiences inside the Player journey.

## One button, many experiences

The Player sees one primary action: **PLAY**.

The backend selects an appropriate experience from a registry using Player state. The UI does not expose a giant game catalog by default.

A Player can still discover the individual experiences through their progression, achievements, world events, and sharing.

## Experience families

The initial registry is designed around small, original mechanics rather than clones:

### 1. Pulse Run — 2D
A one-minute reaction/run challenge. The Player learns a simple rule, improves a personal best, and can challenge a friend with the resulting share card.

### 2. Memory Forge — 2D
A short pattern-memory puzzle. Difficulty adapts from observed performance rather than an arbitrary global level.

### 3. Orbit Break — 2D
A timing game where the Player changes an orbit at precise moments. Sessions are intentionally short and replayable.

### 4. Rift Walker — 3D candidate
A lightweight spatial exploration prototype. It should only ship as 3D if performance and interaction quality justify the extra complexity.

### 5. World Echo — social/asynchronous
A Player leaves a small challenge or creation that another Player can discover later. It is designed to create natural reasons to share without requiring simultaneous multiplayer.

## Adaptive selection

The selection engine considers only product-relevant state such as:

- recent activity categories
- completed experiences
- demonstrated difficulty band
- novelty/repetition balance
- current progression milestones
- optional explicit interests

It must not infer sensitive traits.

The system should balance:

- familiar experiences that feel satisfying
- new experiences that create discovery
- appropriate difficulty
- occasional surprises

## Progression connection

Playing should feed the existing MORISE progression system through explicit, explainable events:

`PLAY -> RESULT -> XP/PROGRESS EVENT -> PLAYER EVOLUTION -> NEW POSSIBILITY`

Progression should unlock possibilities, not trap the Player behind grind walls.

Examples:

- repeated puzzle mastery unlocks a harder variant
- exploration unlocks a new world route
- creating a challenge unlocks creator tools
- sharing a genuine achievement produces a shareable Moment

## Shareable Moments

The share action should be attached to meaningful outcomes rather than interrupting every session.

A Moment can be:

- personal best
- unusual achievement
- new unlock
- rare discovery
- challenge result
- creation worth showing

A share card should communicate what happened in seconds and provide a clear MORISE entry point.

Never fabricate scarcity, fake social counts, or fake achievements.

## Market-informed principles

Current market signals point toward short-form interactive experiences, user-generated content, social discovery, and stronger control over recommendations. MORISE should combine those patterns without becoming a copy of an existing platform.

The differentiator is the combination:

**one simple PLAY door + adaptive experiences + Player evolution + emergent social discovery + shareable Moments.**

## Technical architecture

Use a game registry so new games can be added without changing the primary PLAY navigation contract.

Conceptually:

```text
PLAY
  |
  v
Adaptive Selector
  |
  +--> Pulse Run
  +--> Memory Forge
  +--> Orbit Break
  +--> Rift Walker (when justified)
  +--> World Echo
```

Each experience declares:

- id
- mode (2D/3D/social)
- estimated session duration
- supported devices
- difficulty range
- progression events
- shareable result types

## Quality bar

A game is not added merely because it works technically. It must be understandable quickly, fun alone, performant on common mobile hardware, and capable of producing a genuine "you have to see this" moment.
