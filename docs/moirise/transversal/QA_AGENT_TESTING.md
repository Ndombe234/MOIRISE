# MOIRISE — QA AGENT TESTING CONTRACT

## 1. Purpose

MOIRISE must be testable by an automated development agent from a real browser, including before authentication, without creating fake production state.

The QA agent is an external execution actor for verification. It is not a privileged production actor and it does not bypass product authorization.

## 2. Test modes

### PUBLIC_TEST

Uses the real application shell and real user-facing components without authentication.

Allowed:
- open public routes;
- navigate through visible doors and links;
- search public content;
- inspect public profiles/content;
- execute explicitly allowlisted public experiences;
- play public/read-only or sandboxed experiences;
- change locale;
- reload, deep-link, back/forward;
- exercise loading, empty, error, degraded and unavailable states;
- capture browser/network/console evidence.

Forbidden:
- production mutations outside an explicit test namespace;
- private data access;
- role changes;
- reward issuance;
- real moderation actions;
- fake users, likes, followers, views, scores or counters;
- bypassing authentication;
- modifying production event state.

### AUTH_TEST

Uses dedicated non-production/test accounts with explicit roles.

Minimum role profiles:
- Player;
- Creator;
- Community member;
- Event participant;
- Moderator;
- Admin/owner-equivalent test role where operational flows require it.

Each account is isolated, disposable or resettable, and identifiable as test state.

### ADVERSARIAL_TEST

Runs against the test environment and checks:
- expired sessions;
- missing/invalid permissions;
- malformed payloads;
- duplicate commands;
- replay;
- concurrent updates;
- network interruption;
- timeout;
- provider failure;
- corrupted/unknown artifacts;
- direct navigation to protected routes;
- client-side manipulation attempts.

## 3. Environment boundary

The preferred topology is:

AGENT BROWSER
  ↓
MOIRISE TEST ENTRY
  ├─ PUBLIC_TEST
  └─ AUTH_TEST
       ↓
TEST DATA / TEST ACCOUNTS / TEST EVENTS
       ↓
NO PRODUCTION MUTATION

PUBLIC_TEST must use the same production application components and contracts wherever practical. It must not be a fake demo application.

If a dedicated test deployment is used, its configuration, data namespace and external side effects must be isolated from production.

## 4. Test identity and authorization

The browser agent may be anonymous in PUBLIC_TEST.

Authentication is never simulated by simply hiding UI controls. Protected operations must still be rejected by the authoritative authorization boundary.

A test account must not inherit real-user private data.

The agent must never receive:
- production service-role credentials;
- database master credentials;
- private user tokens unrelated to the test account;
- secrets embedded in browser code.

## 5. Test namespace

Any state mutation required for automated testing must carry an explicit test identity/namespace where possible.

Test state must be:
- distinguishable from production state;
- auditable;
- resettable;
- excluded from public counters/rankings/rewards;
- excluded from real creator/economy activation;
- excluded from recommendation signals that affect real Players.

## 6. Browser agent workflow

Canonical loop:

OPEN → INSPECT → ACT → OBSERVE → ASSERT → RECORD EVIDENCE → DIAGNOSE → PATCH → REBUILD → REPEAT

For each critical journey the agent records:
- URL/route;
- viewport/device profile;
- actor mode;
- action sequence;
- expected result;
- actual result;
- console/runtime errors;
- network failures;
- screenshots or equivalent browser evidence;
- test/build result;
- commit/build identifier.

The agent must verify the integrated application, not only source files.

## 7. Required public smoke suite

At minimum:
1. application boot;
2. public landing/first route;
3. each main door reachable;
4. public navigation;
5. public search where available;
6. public experience/game entry where available;
7. locale switch;
8. back/forward;
9. refresh/deep-link;
10. loading/empty/error/degraded states;
11. mobile viewport;
12. no blank-screen route;
13. no uncaught critical browser error.

## 8. Required authenticated regression suite

At minimum:
- sign-in/sign-out;
- Player profile/preferences;
- social publication and private messaging where implemented;
- permissions;
- game/session/result flow;
- community membership;
- event participation;
- adaptive/evolution behavior;
- rewards/ledger where implemented;
- AI capability fallback;
- privacy boundaries;
- deletion/revocation;
- session expiry.

Only implemented capabilities are executed; unimplemented capabilities remain explicitly PARTIAL/BLOCKED.

## 9. Production protection

Production browser smoke testing is permitted only for read-only/public flows unless an explicit production-safe contract exists.

The QA agent must never manufacture activity to make production appear populated.

No automated test may:
- create fake engagement;
- issue real rewards;
- alter real economic balances;
- mutate real moderation state;
- send unsolicited real messages;
- trigger irreversible external side effects.

## 10. Mobile requirement

Every critical PUBLIC_TEST and AUTH_TEST journey must be executable at a mobile viewport.

The agent must check:
- touch targets;
- bottom navigation;
- scrolling;
- keyboard overlap;
- responsive layout;
- loading/error states;
- orientation-sensitive layout where applicable.

## 11. Failure and recovery

A failed browser step is not automatically a product defect.

The agent classifies failures as:
PRODUCT_DEFECT / TEST_DEFECT / ENVIRONMENT_FAILURE / NETWORK_FAILURE / EXTERNAL_PROVIDER_FAILURE / FLAKY / UNRELATED_PREEXISTING.

After a fix, the agent reruns:
1. the failed scenario;
2. the nearest regression suite;
3. affected cross-module tests;
4. build/type checks;
5. critical browser smoke.

## 12. Acceptance gate

QA is complete only when:

REQ → FEATURE_ID → TASK_ID → CODE/SYMBOL → TEST → BROWSER ACTION → EXPECTED → ACTUAL → EVIDENCE → STATUS

A browser page rendering successfully is not sufficient.

PUBLIC_TEST proves anonymous/public behavior.
AUTH_TEST proves authorized behavior.
ADVERSARIAL_TEST proves boundary behavior.

These modes are complementary and must not be collapsed into one privileged test path.
