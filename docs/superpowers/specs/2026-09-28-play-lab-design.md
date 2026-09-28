# MORISE PLAY LAB — Design Specification

**Date:** 2026-09-28
**Status:** IMPLEMENTING / canonical 40-game inventory intentionally preserved

## Purpose

Turn the single PLAY surface into a real MORISE experience layer: fast, original, replayable games that work alone, can generate shareable Moments, and can later feed meaningful SYSTEM progression.

The visible promise is extremely simple:

**PLAY NOW**

The depth sits behind it.

## Market findings

The 2026 games market remains large and global. Newzoo forecasts $213.9B in 2026 revenue and 3.70B players, while also noting that future growth depends increasingly on retaining existing audiences as player penetration matures. Mobile remains the largest platform at $121.1B. This supports lightweight browser-first experiences that can be replayed frequently rather than requiring a heavyweight client.

Current Roblox product changes are particularly relevant to MORISE: Roblox is adjusting discovery to serve shorter-form play for younger users while supporting deeper return play for older users, and is putting more emphasis on longer-term retention rather than only short-term monetization. MORISE should apply the underlying product lesson without copying Roblox: PLAY should understand both the user's available time and their depth of engagement.

Recent research reviewed for this module also supports personalization, community co-creation and emotionally legible game design as useful engagement levers. MORISE will use personalization carefully: the SYSTEM can adapt which experiences are surfaced, but it must not label or rank the human.

## Anti-copy rule

MORISE games must begin from a mechanic or combination that is not a reskin of a famous existing title.

Every game proposal must answer:
1. What is the core mechanic?
2. What is the MORISE-specific twist?
3. What behavior does it test?
4. What makes the result worth sharing?
5. Could the user describe it to a friend in one sentence?
6. What existing mechanic is it deliberately not copying?

A generic clone fails this gate.

## First Play Lab experiments

These three are experimental prototypes, not a replacement for the canonical 40-game inventory. The canonical inventory was not found in the currently indexed project/library files, so this module does not redefine or silently replace it.

### SHIFT//MEMORY

A 4x4 spatial memory challenge.

The board shows a short sequence of cells. Before input begins, MORISE rotates or mirrors the board. The Player must reproduce the transformed sequence.

Why it is different:
- ordinary memory is not enough;
- the Player must combine memory with spatial transformation;
- every run can use a different transformation;
- the Moment can show the transformation and the final pattern.

Core signals:
- memory
- spatial reasoning
- precision

### GHOST//ORBIT

A timing challenge built around an orbiting marker.

The challenge first records a hidden timing pattern. The Player then attempts to hit moving gates. The game evaluates the timing relative to the orbital cycle, not merely whether the click happened at a fixed point.

The resulting run can become a Ghost challenge: another Player receives the same orbit pattern and tries to beat it asynchronously.

Core signals:
- timing
- consistency
- precision

### FRACTURE//RULE

A rapid visual deduction game.

Each round displays a compact field governed by a hidden MORISE rule. Most elements obey the rule; one breaks it. The Player has to identify the fracture. Rules mutate between rounds.

The game is deliberately about discovering a relation, not memorizing trivia.

Core signals:
- curiosity
- pattern recognition
- strategy

## Session security

Game results are not accepted as trusted client scores.

Flow:
START SESSION -> server challenge -> client play -> server validation -> result -> SYSTEM event -> Moment

The server owns the challenge seed and validates the submitted action log against it.

A completion is idempotent by session identifier.

## Progression

Games never grant progression merely because a button was clicked.

A validated completion may create one progression event with:
- source_type = game
- source_id = game slug
- deterministic idempotency key based on session
- bounded XP
- metadata describing the result

The XP contract remains deliberately modest while Play Lab is experimental.

## Sharing / Moments

A validated result can produce a compact Moment payload containing:
- game slug
- score
- result phrase
- timestamp
- optional transformation/rule summary

The first Play Lab surface provides a direct share action. Later the common Moment system will persist these objects and make them discoverable.

## UX

PLAY opens with:
- one primary recommended experience;
- two alternative unlocked experiences;
- a short explanation of why an experience is surfaced;
- no giant catalogue;
- no fake player counts;
- no fake leaderboards.

Each game has:
- immediate first interaction;
- visible progress;
- replay;
- result;
- share.

## Performance

The initial experiences must:
- run with DOM/CSS/Canvas primitives only;
- avoid heavyweight 3D libraries;
- start quickly on mobile;
- avoid horizontal overflow;
- be playable with keyboard where practical;
- respect reduced-motion preferences.

3D remains reserved for later World experiments where spatial interaction genuinely justifies the payload.

## Canonical inventory rule

The final MORISE product will contain exactly 40 canonical games and 20 major non-game features. This module does not alter those counts.

Until the canonical inventory source is recovered and attached to the project, Play Lab prototypes are tracked as experiments rather than being numbered as canonical games.

## Exit criteria for Play Lab

- PLAY is a real authenticated route.
- Three original prototypes are playable.
- Each has deterministic challenge generation.
- Results are validated server-side.
- Double-submit/idempotency is safe.
- SYSTEM progression is generated only from validated results.
- Share actions produce a useful direct link/message.
- Tests cover validators and malicious inputs.
- Production build and CI pass.
- Real browser QA passes on desktop and 390x844 mobile.