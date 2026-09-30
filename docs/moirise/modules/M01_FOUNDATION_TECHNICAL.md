# M01 — FOUNDATION

## Goal
Create the stable application shell, routing, design tokens, error boundaries, configuration layer and shared contracts.

## Visible UI
Only the primary navigation shell and contextual SYSTEM surface. No feature-specific dashboard overload.

## Core contracts
`AppShell`, `RouteGuard`, `FeatureFlag`, `AppError`, `LoadingState`, `EmptyState`, `UnavailableState`, `AIRequest`.

## Behavior
The shell must boot deterministically, show a loading state, recover from route/component failures, and never leave a blank screen.

## MORISE SYSTEM
On boot it may say a short contextual status such as “SYSTEM ONLINE” once; it must not spam SYSTEM messages.

## Technical
React + TypeScript + Vite. Shared UI primitives. Lazy-load feature routes. Keep provider SDKs out of UI components.

## Acceptance
Fresh load, refresh on every route, mobile viewport, offline/degraded provider state, and error-boundary recovery all pass.
