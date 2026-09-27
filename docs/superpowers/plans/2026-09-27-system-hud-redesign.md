# MORISE SYSTEM HUD Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the MORISE SYSTEM home screen from a conventional dashboard into an original dark-fantasy game HUD inspired by premium manhwa RPG systems, without copying any protected character or artwork.

**Architecture:** Keep the existing SYSTEM data/service/API model unchanged. Redesign only the presentation layer through a focused SYSTEM shell, HUD-style cards, original visual effects, and responsive layout. Preserve all existing routes and real data bindings so visual changes cannot fabricate progression.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, existing Supabase-backed SYSTEM service.

**Spec:** Existing MORISE SYSTEM product/engineering specification and the approved visual direction from the current conversation.

## Global Constraints

- SYSTEM data must remain real and sourced from the existing service.
- No fake users, fake XP, fake activity, or simulated statistics.
- Preserve `/system`, `/system/progression`, `/system/history`, and `/system/memories`.
- Preserve authentication and existing RLS/backend behavior.
- Mobile-first; verify 390×844 and 1440×900.
- Visual direction: dark, mysterious, sovereign, premium game HUD; original MORISE identity, not a copy of Solo Leveling/Sung Jin-Woo.
- Avoid UI overload: the main screen must prioritize identity, level/XP, dimensions, and recent evolution.

## Review Focus

- Long Player names and empty states must not break the HUD layout — verify wrapping and constrained widths.
- Zero-progress users must still see a polished SYSTEM — verify no fake values appear.
- Small mobile screens must retain readable navigation and no horizontal overflow — verify at 390×844.
- High XP/level values must remain visually stable — verify large numbers do not overflow.
- Existing detail routes must retain their data and navigation semantics — verify all four SYSTEM routes after the redesign.

---

### Task 1: Replace SYSTEM shell and home HUD composition

**Files:**
- Modify: `app/system/layout.tsx`
- Modify: `app/system/page.tsx`

- [ ] Add an original HUD shell with a SYSTEM title, status indicator, compact navigation, and decorative frame layers.
- [ ] Add a Player identity panel with avatar placeholder treatment, name, handle, level, rank, and XP sourced only from `system`.
- [ ] Add a central progression core with XP ring/arc treatment and next-level progress sourced from `system.progressPercent`.
- [ ] Present the seven dimensions as compact attribute nodes/cards without changing their values or keys.
- [ ] Present recent memory/history as secondary HUD panels.
- [ ] Keep all existing navigation destinations intact.
- [ ] Preserve accessible headings, labels, and progressbar semantics.
- [ ] Run typecheck and tests.

### Task 2: Build original dark-fantasy HUD visual system

**Files:**
- Modify: `app/globals.css`

- [ ] Add layered radial/linear backgrounds, subtle grid/noise-like CSS effects, glowing borders, angular HUD accents, and restrained shadow/energy effects.
- [ ] Create reusable visual classes for HUD frame, stat chips, progress core, attribute nodes, and system status.
- [ ] Avoid external assets and copyrighted character imagery; the visual identity must be original to MORISE.
- [ ] Add reduced-motion behavior for animated HUD effects.
- [ ] Verify responsive breakpoints at 390×844 and desktop.

### Task 3: Regression and browser validation

**Files:**
- No application logic changes expected.

- [ ] Run `npm run typecheck`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Confirm Render deploys the commit successfully.
- [ ] Open `/system` in a real browser.
- [ ] Verify `/system/progression`, `/system/history`, and `/system/memories` still work.
- [ ] Verify 390×844 has no horizontal overflow.
- [ ] Verify 1440×900 has stable composition and readable hierarchy.
- [ ] Verify no console/runtime errors are introduced.
