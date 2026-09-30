# REFERENCE ONLY — HISTORICAL PRODUCT NOTE

This file is preserved for product context and ideas. It is **not** an implementation authority. For current scope, implementation order and technical decisions, use docs/moirise/MASTER_REBUILD_V2.md, docs/moirise/BUILD_ORDER.md and the single canonical module files under docs/moirise/modules/.

---

# MORISE Game Universe — Product Design

## Core idea

MORISE can contain many small 2D and 3D experiences behind a single **PLAY** button. The Player does not browse a giant game catalogue first. The MORISE progression engine selects or unlocks experiences according to the Player's current evolution, interests, history, and context.

The button is simple; the world behind it is deep.

## Player loop

`PLAY → experience → meaningful result → progression → new possibility → optional share → discover`

Sharing must come from something worth showing, not from forced referral mechanics.

## Experience families

### 1. Pulse — 30–90 second skill games
Fast reaction, memory, rhythm, timing, pattern and precision challenges. Designed for instant replay and easy sharing of a personal result.

### 2. Drift — exploration micro-worlds
Small 2D or lightweight 3D spaces containing secrets, paths and environmental puzzles. The Player can discover something that another person may not have seen.

### 3. Forge — creation games
The Player builds a small object, scene, badge, challenge or visual artifact. A creation becomes a shareable MORISE object rather than merely a score.

### 4. Duel — asynchronous challenges
A Player can challenge another person to beat a specific result. No requirement for both players to be online simultaneously.

### 5. Quest — progression experiences
Short missions generated from the Player's current progression. Completing one can reveal a new activity, game, community route or collectible.

### 6. World — larger 3D experiences
Reserved for concepts that genuinely benefit from spatial interaction. These should be introduced progressively rather than forcing every Player into a heavy 3D client.

## One-button orchestration

The PLAY surface should present one primary action:

**PLAY NOW**

The system can then select:
- a currently unlocked experience;
- a first-time discovery;
- a continuation of an unfinished quest;
- a challenge relevant to recent activity;
- a short experience when the Player has little time;
- a deeper experience when the Player is actively exploring.

The UI may explain the reason in one line, e.g. `A new challenge appeared because you explored rhythm activities.`

## Progression model

Progression should not simply mean XP and levels. The Player can develop multiple dimensions such as:

- curiosity
- creation
- precision
- exploration
- collaboration
- consistency
- strategy

These are system signals, not public personality judgments. They should unlock possibilities, not rank the human being.

A Player who mostly explores may receive more exploration experiences. A Player who creates may unlock Forge variations. A Player who plays alone should still have a rich path.

## Shareable moments

MORISE should generate a **Moment** when an experience produces something naturally interesting:

- a surprising discovery
- a rare collectible
- a personal best
- an unusual combination
- a created artifact
- a challenge result
- a completed quest
- a hidden route discovered

A Moment can become a compact share card/deep link that lets another person enter MORISE at the relevant experience rather than merely seeing an advertisement.

Example social message:

> "Bro, I found this weird game on MORISE. Try to beat my 42."

The recipient should be able to open the shared experience immediately, even if they do not yet have an account, subject to the authentication rules of that experience.

## Why this structure

The market direction motivating this design is a convergence of short-form discovery, UGC/creation, social competition, community participation and increasingly personalized recommendations. MORISE should combine those behaviors without becoming a feed clone.

## 2D / 3D technical strategy

Start with lightweight experiences that can load quickly. 2D should be the default for many micro-games. 3D should be used selectively for exploration or experiences where spatial interaction is the point.

A shared game-shell contract should allow future experiences to plug into the same PLAY surface:

`GameDefinition → unlock condition → launch → result → progression event → Moment`

The Player should never need to understand this architecture.

## Guardrails

- No pay-to-win mechanics in the core progression.
- No artificial scarcity designed only to pressure sharing.
- No spammy referral rewards.
- No fake social activity.
- No public ranking of human worth or personality.
- No copying recognizable third-party characters, worlds or protected interfaces.
- Games must remain optional; MORISE's discovery and community paths remain useful without playing.

## Rollout

1. Build the shared PLAY shell.
2. Launch several tiny 2D experiences to validate the loop.
3. Add asynchronous challenge and Moments.
4. Add creation experiences.
5. Add selective 3D experiments.
6. Let real usage determine which experience families deserve deeper investment.
