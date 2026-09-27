# MORISE

MORISE — a global social world centered on an evolving personal SYSTEM.

## Project status

**Module 0 — VALIDATED**

**Module 1 — AUTH + PLAYER — VALIDATED**

**Module 2 — SYSTEM CORE — IMPLEMENTED / AUTHENTICATED E2E PENDING**

This repository intentionally started from zero. No legacy OtakuWorld/NexoraVerse application code, database schema, RPCs, Edge Functions or RLS policies are reused.

## Product principles

- Simple surface, deep architecture.
- Every user is a Player.
- SYSTEM is a dedicated destination.
- Solo-first: discover, play, explore, create and progress alone.
- Social depth emerges from real user actions.
- No fake users, fake engagement or fake statistics.
- Global and multilingual by design.
- Render is the current build/QA environment.
- Cloudflare is the intended final production platform.
- Vercel is not used unless explicitly justified.

## Module 0 validation evidence

- GitHub repository: clean-slate MORISE foundation.
- Next.js App Router + TypeScript foundation builds successfully on Render.
- Render runtime uses the Next standalone server with HOSTNAME=0.0.0.0.
- Supabase public schema was initialized cleanly after removal of legacy RLS automation.
- /api/health returns HTTP 200 with status: ok.
- Home, /discover, and /system return HTTP 200.
- Browser Use verified real-user navigation, back navigation, console/runtime health, asset loading and 390×844 mobile layout.
- Standalone static assets are copied into the runtime bundle during build.

## Module 1 validation evidence

- Real Supabase email/password signup and sign-in verified through the deployed browser flow.
- Hosted email confirmation behavior verified; the QA account was explicitly confirmed for controlled end-to-end testing, then removed after verification.
- public.players is linked one-to-one to auth.users with cascade deletion.
- Player RLS is enabled with owner-only SELECT/INSERT/UPDATE policies based on auth.uid().
- Table grants are explicitly restricted to authenticated SELECT/INSERT/UPDATE; anon and public grants are revoked.
- Player creation is idempotent against concurrent initialization races.
- Player display name and handle updates validate input, handle uniqueness conflicts, persist to PostgreSQL and survive reload.
- Authenticated SYSTEM displays the persisted Player; sign-out returns to public home and protected SYSTEM routes redirect to sign-in.
- Performance advisors are clean. Supabase security advisors report only the platform-level leaked-password-protection warning described below.
- Browser Use verified the sign-in flow, Player persistence, SYSTEM synchronization, sign-out protection, 390×844 layout and console/runtime health.
- A favicon route was added and verified HTTP 200.
- CI now runs TypeScript validation and unit tests during the production build.

## Current platform-level auth note

Supabase's leaked-password protection remains disabled because the current project plan does not provide that feature. The application does not attempt to bypass or emulate it. Supabase documents leaked-password protection as a Pro Plan and above feature.


## Module 2 validation evidence

- PostgreSQL SYSTEM schema is deployed: profiles, seven dimensions, immutable progression events and memories.
- All four SYSTEM tables have RLS enabled; anonymous reads and authenticated direct writes to SYSTEM aggregates/events are blocked.
- The progression RPC is the authenticated mutation boundary and is protected by caller identity, fixed search_path, strict v1 event validation and idempotency.
- Player creation initializes SYSTEM state through a database trigger; the initialization RPC is not executable by authenticated clients.
- Render production build: TypeScript passed; 6 test files and 14 tests passed; Next.js production build and standalone preparation passed; deployment is LIVE at https://morise.onrender.com.
- Browser Use verified unauthenticated /system and /system/progression protection, 390x844 layout without horizontal overflow, no visible runtime/console errors, and /api/system returning HTTP 401.
- Authenticated end-to-end persistence is deliberately not marked validated yet because the connected browser session has no authenticated QA account/session for the live project.
