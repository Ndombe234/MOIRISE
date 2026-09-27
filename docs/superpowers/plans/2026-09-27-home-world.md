# MORISE Module 3 — Home World Implementation Plan

## Objective

Implement the approved Home World as a lightweight, authenticated entry surface with seven high-level destinations, while preserving the existing SYSTEM HUD and avoiding premature implementation of downstream modules.

## Step 1 — Repository and route audit

Inspect the current app tree, authentication middleware, existing SYSTEM route, global styles, TypeScript configuration, and test/build configuration.

Acceptance:
- Existing auth contract is understood.
- Existing SYSTEM route is identified and preserved.
- No existing route is overwritten accidentally.

## Step 2 — Define World navigation contract

Create one typed source of truth for the six World actions and the SYSTEM destination.

Acceptance:
- No duplicated route strings where avoidable.
- Every visible destination maps to a real route.
- No fake counters or dynamic engagement values.

## Step 3 — Implement authenticated Home World shell

Build the semantic Home World page with:
- compact MORISE header
- SYSTEM entry
- World hero
- six action cards
- solo-first notice

Acceptance:
- Mobile-first.
- Keyboard accessible.
- Responsive without horizontal overflow.
- Reduced-motion support.
- No unnecessary client-side state.

## Step 4 — Create gateway routes only where necessary

For Play, Create, Communities, Activities, and Events, create minimal truthful gateway shells if their production modules do not yet exist. Reuse existing Discover when available.

Acceptance:
- Every Home World card resolves to a working route.
- Gateway shells clearly state their purpose.
- No simulated social proof or fake content.

## Step 5 — Integrate the real SYSTEM destination

Verify the SYSTEM card points to the existing authenticated SYSTEM route rather than creating a duplicate SYSTEM experience.

Acceptance:
- Existing SYSTEM UI remains intact.
- Navigation from World to SYSTEM works.
- Back navigation to World works.

## Step 6 — Test behavior

Add or update tests for:
- all seven destinations
- semantic links
- protected access
- no duplicate route failures
- responsive structural behavior where test tooling supports it

Run lint, typecheck, unit tests, and production build.

## Step 7 — Browser QA

Use the connected browser tooling to test as a real user:
- authenticated entry
- each World destination
- SYSTEM transition
- browser back/forward
- refresh on direct routes
- keyboard focus
- mobile viewport
- desktop viewport
- no dead buttons
- no horizontal overflow

If authentication prevents automated entry, document the exact blocker rather than bypassing security.

## Step 8 — Deployment verification

Verify the deployment target and production build after implementation. Because MORISE's final deployment target is Cloudflare, confirm the generated application is compatible with the project's configured Cloudflare deployment architecture.

Acceptance:
- production build succeeds
- deployment succeeds through the configured pipeline
- production Home World renders
- route navigation remains functional after deployment

## Step 9 — Review and integration

Review the diff for scope creep, security issues, dead links, accessibility regressions, and accidental changes to Module 2.

Create a pull request from `module-3-home-world` to `main` when verification is complete.

## Definition of done

Module 3 is not considered complete merely because the build succeeds. It is complete only after code checks, browser interaction, route verification, and production/deployment verification pass, with any remaining limitations explicitly documented.
