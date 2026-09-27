# MORISE Module 3 — Home World Design Specification

**Status:** APPROVED DESIGN — WRITTEN SPEC PENDING USER REVIEW
**Date:** 2026-09-27

## Goal

Create MORISE's authenticated primary **World** surface: a simple, mobile-first starting point that gives every Player a small set of meaningful doors into a much deeper world.

The Home World is not a conventional social feed. Its job is to answer one question immediately:

> **What can I do now?**

The surface must stay simple while the underlying MORISE engine remains capable of growing with the Player.

## Product principles

- Every authenticated user is a Player.
- SYSTEM remains a dedicated destination, not a hidden profile subpage.
- Solo-first: a Player can use the World meaningfully without an existing social network.
- Social discovery should emerge from real activity rather than requiring a prebuilt social graph.
- Surface complexity stays low; engine complexity can be high.
- No fake activity, fake users, fake engagement, or invented statistics.
- The World should feel like entering a living digital world, not opening a generic feed.
- Mobile-first and desktop-valid.
- Global and multilingual by design.
- The visual language should remain compatible with the approved dark/futuristic SYSTEM HUD without copying any third-party protected character, artwork, or interface.

## Current market analysis — 2026

The market review for this module focuses on how large social/community products are changing discovery and navigation.

### Observation 1 — Discovery is increasingly interest-led, not only follower-led

Dash Social's 2026 report describes a continued shift toward non-follower discovery across TikTok and Instagram, while YouGov's 2026 research also describes discovery as increasingly fragmented across search, AI assistants, maps, marketplaces, and social platforms.

**MORISE implication:** the primary surface should expose discovery as a first-class action instead of assuming the Player starts with a populated friend/follow graph.

Sources:
- https://www.dashsocial.com/press-release/2026-social-media-trends-report
- https://yougov.com/reports/55100-india-websearch-ai-report-2026

### Observation 2 — Platforms are creating explicit community discovery surfaces

Threads introduced Communities, then expanded them in 2026 with a Communities Hub, visual identities, progress toward community creation, local communities, and more control over what conversations users see.

**MORISE implication:** Communities should be a visible World door, but MORISE should not stop at static user-created communities. The existing MORISE vision requires relationships and emergent groups to be able to grow from actual behavior.

Sources:
- https://about.fb.com/news/2025/10/introducing-threads-communities-find-your-people/
- https://about.fb.com/news/2026/06/meta-launching-new-features-500-million-monthly-threads-users/

### Observation 3 — Personal control over discovery is becoming more explicit

Threads launched Dear Algo and later Your Algo, allowing people to express temporary preferences about what they want more or less of.

**MORISE implication:** the long-term discovery engine should eventually expose understandable Player intent signals rather than treating personalization as an invisible black box. Module 3 only establishes the World surface; it does not implement the full ranking engine.

Sources:
- https://about.fb.com/news/2026/02/threads-dear-algo/
- https://about.fb.com/news/2026/06/meta-launching-new-features-500-million-monthly-threads-users/

### Observation 4 — Community products emphasize belonging and intentional spaces

Circle's 2026 community research reports a stronger emphasis on connection, human experiences, and intentionally designed communities. Ogilvy's 2026 trends report similarly describes movement toward smaller, self-defined communities and away from pure broadcasting.

**MORISE implication:** the World should provide multiple paths into participation — not only a high-volume feed. Activities, creation, communities, events, and play should be peers at the navigation level.

Sources:
- https://circle.so/2026-community-trends-report
- https://www.ogilvy.com/sites/g/files/dhpsjz106/files/pdfdocuments/2026_Social_Trends_Report.pdf

### Observation 5 — People use social products for multiple jobs

DataReportal's Digital 2026 reporting shows that people use social platforms for a growing range of purposes and that the average online adult uses multiple social platforms.

**MORISE implication:** a single monotonous feed is not enough for the MORISE concept. The Home World should make distinct actions visible without turning them into a massive navigation system.

Source:
- https://datareportal.com/reports/digital-2026-global-overview-report

## Product decision from the market review

MORISE will **not** reproduce a follower-first feed as the main home experience.

Instead, Module 3 establishes a **World Action Surface** with six primary non-SYSTEM doors:

1. **Discover** — find something unexpected.
2. **Play** — start a solo experience.
3. **Create** — make something.
4. **Communities** — enter interest-based/social spaces.
5. **Activities** — take part in structured actions.
6. **Events** — see what is happening.

SYSTEM is the seventh high-level destination:

7. **SYSTEM** — inspect Player evolution and progression.

These are navigation doors, not claims that every underlying subsystem is complete in Module 3.

## UX structure

```text
MORISE
                         SYSTEM
                           │
            ┌──────────────┴───────────────┐
            │         PLAYER WORLD         │
            │                              │
            │      What will you do now?   │
            │                              │
            │  Discover   Play    Create   │
            │  Communities Activities Events│
            │                              │
            │       Solo-first context     │
            └──────────────────────────────┘
```

### Header

The header remains deliberately small:

- MORISE identity
- SYSTEM destination
- exit/sign-out control

No large multi-row navigation bar.

### Hero / world introduction

The central heading should communicate action and possibility, not social pressure.

Approved direction:

> **What will you do now?**

Supporting copy explains that the Player can start with one action and evolve through actual use.

### SYSTEM card

SYSTEM gets a visually distinct card because it is the Player's persistent evolution layer.

It should communicate:

- SYSTEM
- Player evolution
- route into the existing SYSTEM HUD

### Action grid

Six World doors appear as large, touch-friendly action cards.

Each card has:

- short label
- small explanatory sentence
- stable order/index
- directional affordance
- visible keyboard focus
- no unnecessary counters or fake activity

### Solo-first notice

A small persistent note communicates:

> You can explore MORISE alone. Connections appear naturally as your actions create opportunities.

This reinforces the core MORISE principle without blocking social entry.

## Responsive behavior

### Mobile

At approximately 520px and below:

- one action card per row
- full-width touch targets
- no horizontal overflow
- header remains compact
- System card remains easy to reach
- typography remains legible without requiring zoom

### Tablet / desktop

- six action cards may form a 2-column or 3-column grid depending on viewport width.
- hero uses a two-column relationship between introduction and SYSTEM.
- maximum page width keeps content from becoming excessively stretched.

## Accessibility

Required:

- semantic main content
- real links/buttons rather than decorative click targets
- visible focus states
- descriptive accessible navigation labels
- sufficient text contrast
- reduced-motion handling
- no essential information conveyed only by color

## Navigation contracts

Module 3 must never create dead clickable links.

Every visible World door must have a real navigable route.

Where the underlying feature is not yet implemented by a later module, the route may be a clearly identified **gateway shell** rather than pretending the feature already exists.

A gateway shell must:

- load successfully
- explain what the destination is
- offer a route back to the World
- avoid fake content, fake counters, or fake user activity

The exact implementation of the underlying feature belongs to its own module.

## Data and backend scope

Module 3 is primarily a navigation and experience layer.

It must not create an unnecessary social-feed database just to make the home page look alive.

The World may consume existing authenticated Player identity and SYSTEM state where useful, but it does not invent engagement data.

Future modules will plug their real domain data into these World doors.

## Non-goals

Module 3 does not implement:

- a full recommendation/ranking engine
- a follower graph
- messaging
- a production community system
- the games inventory
- activity progression
- event management
- creator publishing infrastructure
- analytics dashboards
- an AI recommendation engine

Those remain separate modules.

## Security

- Authenticated World access must respect the existing Supabase session architecture.
- The page must never expose private Player data to unauthenticated visitors.
- Gateway routes must follow the access rules of the destination they lead to.
- No client-side trust assumption should be introduced.
- No public API should be added solely to render static navigation.

## Performance

- Prefer server-rendered/static UI for the World shell.
- No large client bundle for the navigation surface.
- Do not introduce a data-fetching dependency when static routing is sufficient.
- The first meaningful World render should remain lightweight on mobile connections.

## Success criteria

Module 3 is complete only when:

1. Authenticated Player lands on the World surface.
2. The surface presents no more than seven high-level destinations.
3. SYSTEM is visibly distinct and links to the real SYSTEM.
4. All six non-SYSTEM doors navigate to real routes.
5. Mobile 390×844 has no horizontal overflow.
6. Desktop layout remains coherent.
7. Keyboard focus and semantic navigation work.
8. No fake engagement, counters, or activity are displayed.
9. Existing authentication and protected-route behavior remain intact.
10. TypeScript, lint, unit tests, production build, deployment, and browser QA all pass.
11. The World remains visually coherent with the approved SYSTEM HUD direction.
12. This module leaves clear extension points for later Play, Create, Communities, Activities, and Events modules without building those systems prematurely.

## Relationship to Module 2

Module 2 remains:

**SYSTEM CORE — IMPLEMENTED / AUTHENTICATED E2E PENDING**

The Module 3 design assumes the existing SYSTEM route and HUD are real and preserves them. Completing Module 3 does not retroactively change the Module 2 authentication E2E status.

## Review questions

Before implementation, review:

- the seven-destination navigation model
- the World Action Surface rather than a conventional feed
- the gateway-shell approach for future modules
- the market-derived emphasis on discovery, communities, multiple modes of participation, and user control
