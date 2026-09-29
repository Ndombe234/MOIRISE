# MORISE — Modules 1→6 Rebuild V2

## Decision

Modules 1→6 are being visually and interactionally rebuilt around the current MORISE concept. This is a rebuild of the experience layer, not a destructive reset of authentication, data, SQL, RLS, or existing contracts.

## Core experience

MORISE is SYSTEM-first. The Player should not feel that they are navigating a catalogue of software modules. The SYSTEM observes the current application context and presents a small number of relevant next experiences. Direct routes remain available for accessibility and deep links.

Primary loop:

`PLAYER → SYSTEM CONTEXT → RELEVANT EXPERIENCE → REAL ACTION → EVENT → PLAYER EVOLUTION → SYSTEM CONTEXT`

## Calm visual system

The visual language must feel futuristic without high-frequency neon effects.

### Palette

- Ink: `#0A1018`
- Surface: `#111A24`
- Surface elevated: `#172330`
- Mist: `#DCE7E8`
- Muted text: `#91A3AA`
- Teal accent: `#63BDB6`
- Soft lavender: `#A9A6C7`
- Warm amber: `#D8B77A`
- Success: `#79B89A`
- Danger: `#C98282`

Teal is the primary interactive accent. Lavender is secondary. Amber is reserved for meaningful rewards/status. Saturated neon gradients and continuous glow animations are prohibited by default.

## Interaction rules

1. No fake statistics.
2. No simulated social presence presented as real.
3. No XP/progression granted from arbitrary client values.
4. No broken capability is exposed as executable.
5. If an infrastructure is unavailable, the SYSTEM selects a fallback or explains the temporary unavailability.
6. Solo use must remain useful when there are zero other users.
7. Generated or future functionality must not be presented as already available.
8. Reduced-motion users receive static effects.
9. Mobile is a first-class layout, not a compressed desktop layout.
10. English is the display fallback when a requested locale is unsupported.

## Module 1 — Foundation / Entry

The entry experience is quiet and welcoming. Authentication remains Supabase-backed, but the visual language introduces MORISE as a calm SYSTEM rather than a technical dashboard.

The existing auth service boundary remains authoritative.

## Module 2 — Player

Player identity is presented as a living profile/context rather than a stat-heavy RPG sheet. Progression is visible but never dominates the first screen.

## Module 3 — Social + private messaging

Social is contextual. The SYSTEM can surface a relevant conversation, activity or community without forcing the Player through a large social dashboard. Private messages preserve original language and can request translation on demand.

## Module 4 — World

World is the surrounding experience. The landing surface presents what the Player can do now, not a list of every possible feature.

## Module 5 — SYSTEM / progression

The SYSTEM is the primary orchestration surface. It reports real events, progression, memories and available capabilities. It does not claim that an unavailable provider or infrastructure is active.

## Module 6 — Play / final QA

Play is solo-first. A Play experience must work with no populated community. Actions are authoritative, idempotent and tied to real events. The visual shell uses the same calm design system.

## Internationalization

Canonical locales:

`en, fr, hi, es, de, it, pt, ar, ja, ko, ru, tr, id, th, vi, pl, nl, ro, bn, ur`

Resolution order:

`explicit choice → saved preference → device locale → supported locale → en`

## Capability fallback

Video, music, advanced image generation, heavy local AI and other optional infrastructures are capability-gated. A missing dependency changes capability state; it does not create a blank screen.

## Owner/Superadmin boundary

The existing administrator account remains the initial OWNER/Superadmin identity. The rebuild must not expose administrative controls to normal Players. Role mutations remain server-authorized and audited.

## Verification gate

Before calling Modules 1→6 rebuilt:

- typecheck;
- lint/format where configured;
- tests;
- production build;
- authentication smoke test;
- protected-route smoke test;
- real browser verification;
- mobile viewport verification;
- reduced-motion verification;
- empty-state verification;
- unavailable-capability verification;
- no-blank-screen regression;
- visual review for excessive glow/contrast.
