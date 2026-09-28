# Exceptional SYSTEM Primary Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the five primary MOIRISE destinations immediately visible inside the SYSTEM HUD on desktop and mobile, with an exceptional spatial/orbital presentation rather than a conventional dashboard navigation bar.

**Architecture:** Keep the existing Next.js SYSTEM layout as the single navigation shell. Replace the compact header navigation with a permanent SYSTEM command rail centered around the SYSTEM core: PLAYER, WORLD, SOCIAL, PLAY, and SYSTEM. Keep secondary utilities discoverable in the same shell without hiding the five primary destinations; preserve existing routes and server-side sign-out behavior.

**Tech Stack:** Next.js 16, React 19, TypeScript, existing CSS in `app/globals.css`, `next/link`, existing `signOut` action.

**Spec:** Approved in chat on 2026-09-28: primary destinations must be directly visible, visually exceptional, integrated beside/around the SYSTEM, and remain touch-friendly on mobile; secondary destinations remain accessible without displacing the primary navigation.

## Global Constraints

- Preserve official project module numbering: this is a Module 6 UI/navigation refinement, not a new module.
- Do not rename existing routes or change backend contracts.
- Primary destinations are always visible: SYSTEM, PLAYER, WORLD, SOCIAL, PLAY.
- Secondary destinations remain accessible: Progression, History, Memories, Communities, Activities, Events, Disconnect.
- No account-state mutation is introduced by the navigation itself; Disconnect keeps the existing server action.
- Mobile must not require horizontal page scrolling and primary controls must have comfortable touch targets.
- Keep the existing dark HUD / glass / neon visual language while making the primary navigation substantially more prominent.

## Review Focus

- 320px-wide mobile layout: all five primary destinations remain reachable without page-level horizontal scrolling — add responsive navigation test/inspection.
- Active route state: current destination is visually obvious without relying on hover — test each primary link class/state.
- Secondary navigation density: secondary actions remain accessible without visually competing with the five primary commands — inspect SYSTEM shell at desktop and mobile widths.
- Existing `/system`, `/player`, `/discover`, `/social`, `/play` route targets remain unchanged — verify rendered hrefs.
- Disconnect remains a form action and is not accidentally converted into a link — verify DOM structure and action preservation.

### Task 1: Replace the compact SYSTEM header with a primary command rail

**Files:**
- Modify: `app/system/layout.tsx`
- Modify: `app/globals.css`
- Test: `tests/system-navigation.test.ts`

**Interfaces:**
- Consumes existing SYSTEM layout and `signOut` action.
- Produces stable navigation markup with exact primary hrefs: `/system`, `/player`, `/home`, `/social`, `/play`.

- [ ] **Step 1: Write the failing navigation contract test**

Add a lightweight Vitest contract test asserting the layout source contains the five primary destinations and the secondary destination labels, and that Disconnect remains a form action. The test should fail before the new command rail markup is present.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- tests/system-navigation.test.ts`
Expected: FAIL because the current layout exposes only Overview/Progression/History/Memory plus Player/Discover/Disconnect.

- [ ] **Step 3: Implement the command rail in `app/system/layout.tsx`**

Create explicit primary command data with labels, short system codes, routes, and visual positions. Render the five commands as always-visible HUD nodes around a central SYSTEM command. Render secondary commands in a compact secondary rail beneath/alongside the primary orbit. Preserve the existing MORISE brand and Disconnect form.

- [ ] **Step 4: Add the exceptional responsive visual system in `app/globals.css`**

Style the primary commands as a spatial SYSTEM constellation: central SYSTEM nucleus, four surrounding command nodes on larger screens, subtle orbit/connector lines, active-state glow, and compact secondary utility strip. At mobile widths, reflow the constellation into a clear two-row/rail composition so all five commands are directly visible without horizontal scrolling. Preserve the existing HUD palette and avoid hover-only controls.

- [ ] **Step 5: Run the focused test and verify pass**

Run: `npm test -- tests/system-navigation.test.ts`
Expected: PASS.

- [ ] **Step 6: Run typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS with no new TypeScript or ESLint errors.

- [ ] **Step 7: Commit**

Commit message: `feat: redesign SYSTEM primary navigation HUD`

### Task 2: Verify the complete module build contract

**Files:**
- Modify: none unless verification exposes a defect.

- [ ] **Step 1: Run the complete automated suite**

Run: `npm test`
Expected: all existing Module 6 tests pass, including play, system, player, and social validation tests.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: typecheck, tests, Next.js production build, and standalone preparation all pass.

- [ ] **Step 3: Perform browser verification on the authenticated QA deployment**

Open `/system` with the existing QA account and verify that SYSTEM, PLAYER, WORLD, SOCIAL, and PLAY are visible immediately on desktop and mobile. Verify the active state, route transitions, secondary utilities, and Disconnect placement without submitting account-changing content.

- [ ] **Step 4: Record any browser defect before claiming completion**

If browser verification finds a navigation or responsive defect, fix it with a focused regression test before completion.
