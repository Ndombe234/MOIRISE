# MORISE V4 — UI/UX RESET — MODULES 1→6

Date: 2026-09-29
Status: ACTIVE DESIGN CONTRACT

## Objective

Rebuild the presentation layer of Modules 1–6 around the canonical MORISE concept without destroying the existing backend contracts, data model, authentication, or progression logic.

The reset is intentionally **calm futuristic** rather than high-neon cyberpunk. The interface must feel premium, curious and alive without producing visual fatigue.

## Product rule

`FEW USER-FACING DOORS → MORISE AI ORCHESTRATES INTERNAL CAPABILITIES → CONTEXTUAL EXPERIENCE`

The PLAYER should not feel that they are navigating a catalogue of features. The SYSTEM should understand the current context and surface the next meaningful possibility.

## Palette — Calm System

Primary background: `#0A1020` — deep blue-black

Secondary background: `#10182A` — soft navy surface

Elevated surface: `#172238` — calm blue slate

Primary text: `#F3F6FB` — soft white

Secondary text: `#AAB6C9` — readable blue-gray

Muted text: `#71809A`

Primary accent: `#72C9E8` — soft cyan, never full-screen neon

Secondary accent: `#9D98E8` — muted lavender

Warm accent: `#F0B98B` — restrained peach/gold for meaningful rewards

Positive: `#7DD3A8`

Warning: `#E8C27C`

Danger: `#E58F9B`

Borders: white at 7–12% opacity

### Color rules

- Never use saturated cyan/purple/red simultaneously in one panel.
- No continuous glow animation.
- No text-shadow glow on normal body text.
- Accent glow is reserved for focus, active state and rare SYSTEM events.
- Large surfaces remain neutral navy.
- Warm accent is used sparingly for rewards and meaningful discoveries.
- Accessibility contrast takes priority over visual effects.

## Typography

Primary: system UI / Inter-compatible sans-serif.

Headings: compact, strong, low tracking.

Technical labels: uppercase with restrained letter spacing.

No decorative display font for body content.

## Motion

Default transition: 160–220ms.

Allowed:
- subtle surface elevation;
- progress transitions;
- one-time SYSTEM reveal;
- gentle loading shimmer.

Avoid:
- permanent scanning lines;
- pulsing every card;
- infinite rotating rings;
- excessive parallax;
- screen-wide flashes.

Respect `prefers-reduced-motion`.

## Navigation

Primary doors remain:

1. SYSTEM
2. PLAYER
3. WORLD
4. SOCIAL
5. PLAY

Secondary capabilities remain contextual and may be exposed through an existing menu or SYSTEM recommendation. They do not become permanent top-level doors.

## Module 1 — Foundation

Visible experience:
- quiet authentication;
- English fallback by default;
- immediate locale detection;
- no technical terminology;
- no fake activity;
- no fake community counts.

The first screen should feel like entering a living product, not an administration console.

## Module 2 — Player

The Player is an identity, not a statistics spreadsheet.

Show:
- identity;
- current state;
- meaningful progression;
- recent genuine moments;
- privacy state;
- the next useful SYSTEM suggestion.

Do not lead with arbitrary scores.

## Module 3 — Social

Social is contextual.

The system may suggest:
- a conversation;
- a relevant community;
- a shared Moment;
- a collaborative experience.

Private messages remain private and the original language is never replaced by an automatic translation.

## Module 4 — World

World is presented as a place that reacts to actions, not as a directory of six buttons.

The primary action is a contextual SYSTEM recommendation. Discovery, activities, communities, events and creation can be surfaced by the SYSTEM when useful.

## Module 5 — System / Progression

The SYSTEM is the orchestration layer.

It should answer visually:
- what just happened;
- what changed;
- what is available now;
- what could happen next.

It should not constantly spam SYSTEM messages.

## Module 6 — Play / Final QA

The first play experience must be the canonical First Contact path when appropriate.

Target:
`PLAYER ACTION → CONSEQUENCE → DISCOVERY → NEW POSSIBILITY`

The screen should contain one clear primary action and a small number of contextual alternatives.

Low-memory devices must receive the same logical experience with reduced visual/media cost.

## Internationalization

Default display language: `en`.

Supported locales:

`en, fr, hi, es, de, it, pt, ar, ja, ko, ru, tr, id, th, vi, pl, nl, ro, bn, ur`

Fallback:

`explicit → saved → device → supported → en`

## Infrastructure availability

Video, music, image, external translation, local AI and other future capabilities are resolved through the capability registry.

If unavailable:
- hide when irrelevant;
- offer a valid fallback when possible;
- show a calm unavailable state when necessary.

Never show a broken provider button.

## Visual QA gates

Every Module 1–6 screen must be checked for:

- mobile width 320–430px;
- desktop 1280px+;
- keyboard focus;
- reduced motion;
- readable contrast;
- loading;
- empty state;
- error state;
- offline/temporary dependency failure;
- no horizontal overflow;
- no fake data;
- no blank screen after navigation.

## Definition of this reset

This reset changes the presentation and interaction model. Existing backend/service contracts are preserved unless a later technical contract explicitly changes them.

The objective is not to make MORISE look more futuristic. The objective is to make MORISE **feel intelligent, calm, curious and responsive to the PLAYER**.
