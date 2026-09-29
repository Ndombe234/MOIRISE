# MORISE — MODULES 1→6 REDESIGN V2

Date: 2026-09-29
Status: CANONICAL REDESIGN SPECIFICATION FOR MODULES 1→6
Position: rebuild the user-facing experience from zero while preserving the Master Plan contracts
Source of truth: `docs/MORISE_MASTER_PLAN_V3.md`

## 0. OBJECTIVE

Modules 1→6 are redesigned from zero at the experience/UI layer without destroying the functional doctrine already established.

Central rule:

`PLAYER → SYSTEM UNDERSTANDS CONTEXT → SYSTEM COORDINATES → PLAYER ACTS → MORISE REACTS → PLAYER DISCOVERS`

The interface must feel like a living intelligent system, not a dashboard containing many independent applications. The internal architecture remains deep; the visible interface remains simple.

## 1. VISUAL DESIGN SYSTEM V2

### 1.1 Objective

The interface is futuristic, calm, premium, Otaku/anime inspired without copying a franchise, readable for long sessions, and comfortable on low-quality displays.

Avoid pure black plus saturated neon everywhere, permanent glow, rapidly moving particles, flashing, excessive gradients, giant SYSTEM messages, rainbow palettes, and low-contrast text.

### 1.2 Canonical palette

Base:
- `#0B0F14` deep graphite
- `#111820` elevated graphite
- `#17212B` surface

Primary accent:
- `#63D8FF` soft cyan

Secondary accent:
- `#B8A7FF` muted violet

Warm accent:
- `#F2C879` soft gold

Status:
- `#65D6A1` success
- `#E9B85C` warning
- `#E97878` danger

Text:
- `#F1F5F9` primary
- `#AAB7C4` secondary
- `#71808E` muted

Borders: `rgba(190,210,225,0.10)`.

The palette is deliberately muted. Cyan, violet and gold are reserved for meaning rather than decoration.

### 1.3 Color semantics

Cyan = active SYSTEM / interaction / navigation focus.
Violet = discovery / possibility / creativity.
Gold = achievement / rare event / important memory.
Green = available / successful / healthy.
Amber = attention / pending dependency.
Red = destructive or security-critical state only.

No component may use an accent color without semantic reason.

### 1.4 Lighting and motion

Use soft shadows and restrained glow. Active glow is reserved for focused/important elements. Gold glow is reserved for meaningful achievements/memories. No animated glow loops by default.

Default motion duration: 160–260ms. Long animation: maximum 700ms unless it is explicitly part of Play. Respect `prefers-reduced-motion`.

Typography: Inter; Noto Sans JP for CJK; appropriate Unicode fallbacks for Arabic, Devanagari and Bengali. Minimum body size 14px; primary reading target 16px.

## 2. MODULE 1 — FOUNDATION V2

### Purpose

Make MORISE immediately understandable without exposing architecture.

### First screen

The first screen contains only:
1. MORISE identity;
2. one contextual SYSTEM message;
3. one primary action;
4. one secondary exploration action;
5. language selector;
6. accessibility entry.

No feature wall.

Example:

```text
MORISE

SYSTEM READY

"Let's see what changes when you act."

[ ENTER MORISE ]

Explore quietly →
```

English is the default locale.

### Boot

```text
LOAD SHELL
→ LOAD RUNTIME CONFIG
→ RESTORE SESSION
→ RESOLVE LOCALE
→ LOAD CAPABILITIES
→ LOAD PLAYER CONTEXT
→ RESOLVE FIRST CONTACT
→ RENDER
```

Optional infrastructure failures never block shell rendering.

### Rules

- no blank screen on boot failure;
- every loading state has a visible fallback;
- every unavailable optional feature has a neutral state;
- navigation contains only approved primary doors;
- SYSTEM may surface internal capabilities without creating navigation tabs.

## 3. MODULE 2 — PLAYER V2

### Purpose

Make the PLAYER feel like the protagonist rather than an account page.

### Surface

Primary information:
- identity;
- current state;
- progression;
- titles;
- recent meaningful actions;
- selected memories;
- SYSTEM relationship/status;
- privacy controls.

Avoid dashboard overload.

### Header

```text
PLAYER
@handle

LEVEL / RANK
CURRENT TITLE

SYSTEM STATUS: ACTIVE
```

Progression is presented as a story of validated actions, not only as an XP bar. XP remains a secondary detail.

Privacy is separated into profile visibility, activity visibility, memory visibility, translation permission, AI analysis permission, training permission, and sharing permission.

Private media is not used for training by default.

## 4. MODULE 3 — SOCIAL V2

### Purpose

Social interaction must feel native to MORISE rather than like a generic social network pasted into it.

### Feed

Priority:
1. relevant current activity;
2. people/communities explicitly followed;
3. discoveries;
4. recent events;
5. broader content.

No fake activity.

### Private chat

```text
WRITE
→ STORE ORIGINAL
→ AUTHORIZE RECIPIENT
→ DETECT LANGUAGE
→ DISPLAY ORIGINAL
→ OPTIONAL TRANSLATION
→ CACHE TRANSLATION
```

Translation is a derived representation. The original is never overwritten.

### Translation fallback

```text
USER LOCALE
→ BROWSER/LOCAL TRANSLATION
→ CACHED RESULT
→ AUTHORIZED REMOTE PROVIDER IF CONFIGURED
→ ORIGINAL + TRANSLATION UNAVAILABLE STATE
```

Chat remains usable if translation is unavailable.

Social cards use quiet surfaces. Meaningful events use thin cyan/gold indicators rather than large animated banners.

## 5. MODULE 4 — WORLD V2

### Purpose

The World feels reactive without requiring the PLAYER to understand the underlying simulation.

### World home

```text
WORLD

CURRENT SIGNAL
"Something changed near you."

[ DISCOVER ]

Recent changes
Memories
Living objects
Hidden possibilities
```

### Reaction pipeline

```text
PLAYER EVENT
→ RULE EVALUATION
→ WORLD CHANGE
→ SYSTEM INTERPRETATION
→ PLAYER-FACING CONSEQUENCE
```

Living Objects evolve through versioned deterministic state. The UI exposes meaningful changes, not simulation noise.

### Solo mode

Even with one PLAYER, World provides exploration, discovery, deterministic challenges, evolving objects, memories, contextual SYSTEM opportunities and asynchronous traces when appropriate.

Never invent a fake human.

## 6. MODULE 5 — SYSTEM / PROGRESSION V2

### Purpose

SYSTEM becomes the central interface/orchestration layer.

SYSTEM is not a permanent chatbot window. It appears through contextual cards, subtle status changes, short messages, suggestions, reactions, discovery moments and Play transitions.

### Decision context

SYSTEM evaluates:

```text
WHAT HAPPENED?
WHAT IS AVAILABLE?
WHAT IS ALLOWED?
WHAT IS USEFUL NOW?
WHAT CAN RUN ON THIS DEVICE?
WHAT REQUIRES AN UNAVAILABLE DEPENDENCY?
```

Then it chooses an authorized action.

### Message hierarchy

Normal: short, calm, contextual.
Important: stronger contrast, cyan/gold accent, limited duration.
Critical: persistent until acknowledged, red only when genuinely necessary.

Never spam SYSTEM text after every click.

### Progressive disclosure

Internal capabilities become visible when an action, condition, event, availability state or contextual usefulness justifies them.

Progression is based on validated events. Client cannot submit arbitrary XP. Titles/unlocks contain their source event and rule version.

## 7. MODULE 6 — PLAY / FINAL QA V2

### Purpose

PLAY proves that PLAYER actions matter.

### First Contact

Not a tutorial. Target approximately two minutes with immediate interaction, suspense, one meaningful consequence, one discovery and one reason to continue.

```text
ARRIVAL
→ SYSTEM OBSERVES
→ PLAYER ACTS
→ WORLD RESPONDS
→ PLAYER DISCOVERS
→ SYSTEM REACTS
→ NEW POSSIBILITY
```

### Play UI

One dominant stage. Supporting information remains minimal: objective, progress when useful, one contextual SYSTEM message, exit/return, accessibility controls.

No dashboard around a game unless the experience requires it.

### Solo population

When no other PLAYER is available, use solo challenge, ghost/replay of real previous activity, asynchronous challenge, World event, creation challenge or collectible discovery. Never invent a fake online human.

### Dependency failure

Example:

```text
MUSIC ENGINE
UNAVAILABLE

The SYSTEM selected a playable alternative.

[ CONTINUE ]
```

Never expose a technical stack trace to a normal PLAYER.

### Final QA gate

Verify no blank screen, no dead-end navigation, primary actions, mobile, desktop, reduced motion, 2GB-class device path, network loss, refresh during session, session expiry, optional provider disabled, translation unavailable, media unavailable, persistence failure, duplicate action, unauthorized action, accessibility labels, 20-locale fallback and no fake statistics.

## 8. COMMON COMPONENTS V2

Required primitives:

`SystemShell`, `SystemMessage`, `SystemPulse`, `ContextCard`, `ActionCard`, `PlayerHeader`, `ProgressStrip`, `MemoryCard`, `WorldSignal`, `DiscoveryCard`, `PlayStage`, `CapabilityStatus`, `UnavailableState`, `LoadingState`, `ErrorState`, `BottomNavigation`, `DesktopNavigation`, `LanguageSelector`, `PrivacyControl`.

Every primitive supports loading, disabled, unavailable, error, reduced motion, keyboard/focus, localization and small screens.

## 9. RESPONSIVE RULES

### Small phones
Single column, bottom navigation, no horizontal overflow, reduced decoration, no large background animation.

### Phones/tablets
One/two-column contextual layouts with optional secondary information.

### Desktop
Centered content, optional left navigation, contextual secondary panel. Never three dense dashboards by default.

### 2GB-class devices
Reduced animation, lazy media, compressed images, minimal effects, no unnecessary WebGPU, no heavy model download and cache-first static assets.

## 10. INTERNATIONALIZATION V2

Canonical locales:

`en, fr, hi, es, de, it, pt, ar, ja, ko, ru, tr, id, th, vi, pl, nl, ro, bn, ur`

Default display locale: `en`.

Resolution:

```text
EXPLICIT USER CHOICE
→ SAVED LOCALE
→ DEVICE LOCALE
→ SUPPORTED LOCALE
→ ENGLISH
```

All interface strings are translation keys. No hard-coded user-facing strings in components. Locale formatting covers dates, time, numbers, pluralization, directionality and script/font fallback. Arabic and Urdu require RTL support.

## 11. OWNER / ADMIN SEPARATION

PLAYER experience stays simple. OWNER/Superadmin is a separate control plane.

OWNER controls administrators, moderators, permissions, capabilities, providers, maintenance, events, economy, advertising adapters, memory policy, AI policy, security policy and audit.

Optional capability states:

`ENABLED | DISABLED | MAINTENANCE | PENDING_DEPENDENCY`

Video, music, image and local AI can remain disabled until infrastructure is ready.

## 12. IMPLEMENTATION GATE

Do not implement Modules 7→15 until Module 6 passes the final QA gate.

Order:

`FOUNDATION → PLAYER → SOCIAL → WORLD → SYSTEM → PLAY/QA`

Then:

`DISCOVERY → FACTORY → ENGINE → SOCIAL GAMING → COMMUNITIES → EVENTS → ADAPTIVE WORLD → ECONOMY → META SYSTEM`

## 13. ACCEPTANCE CRITERIA

A new PLAYER must be able to:
1. arrive without reading a manual;
2. understand what to do within seconds;
3. experience SYSTEM without being overwhelmed;
4. perform an action;
5. see a meaningful consequence;
6. discover something new;
7. continue alone without fake users;
8. communicate privately;
9. use every supported locale;
10. fall back to English when needed;
11. use MORISE when optional infrastructure is disabled;
12. use the site on a low-memory phone;
13. understand errors without technical internals;
14. access privacy controls;
15. never encounter a blank screen from an expected failure.

This specification is the UX/experience baseline for the rebuild of Modules 1→6.