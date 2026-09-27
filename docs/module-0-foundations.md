# Module 0 — Foundations

## Decisions

- Application: Next.js App Router + TypeScript.
- Runtime model: portable Node.js application with standalone output.
- Validation: Railway.
- Final production target: Cloudflare.
- Database/Auth: Supabase.
- Source control: GitHub.
- Browser QA: Browser Use / BrowserAct when available.
- No legacy OtakuWorld/NexoraVerse application code is imported.

## Repository boundaries

- `app/` — web routes and API routes.
- `docs/` — engineering decisions and module records.
- `tests/` — automated tests.
- `public/` — static assets.
- `.env.example` — public configuration contract only.

## Quality gate

A Module 0 release candidate must pass:

1. TypeScript check.
2. ESLint.
3. Unit/smoke tests.
4. Production build.
5. Railway deployment and runtime health check.
6. Browser verification of the deployed application.
7. Supabase security/performance advisory review.

## Current state

- GitHub foundation committed.
- Supabase project `MOIRISE` is ACTIVE_HEALTHY.
- Public schema currently has no application tables.
- A pre-existing public `rls_auto_enable()` SECURITY DEFINER function was found; execute permission was revoked from `anon` and `authenticated` during foundation hardening.
- Supabase performance advisors currently report no findings.
- Railway deployment is currently blocked by the connected Railway workspace's free-plan resource provision limit. No Railway deployment is claimed until that infrastructure constraint is resolved.

## Principle

Do not mark Module 0 DONE until every item in the quality gate has fresh evidence.
