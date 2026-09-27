# MORISE

MORISE — a global social world centered on an evolving personal SYSTEM.

## Project status

**Module 0 — VALIDATED**

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
- Supabase public schema is empty and security/performance advisors are clean.
- /api/health returns HTTP 200 with status: ok.
- Home, /discover, and /system return HTTP 200.
- Browser Use verified real-user navigation, back navigation, console/runtime health, asset loading and 390×844 mobile layout.
- Standalone static assets are copied into the runtime bundle during build.
