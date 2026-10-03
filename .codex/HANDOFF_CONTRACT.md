# MOIRISE — Worker Handoff Contract

Every worker sends a structured handoff. The handoff is not itself acceptance.

## Required fields

```text
TASK_ID:
FEATURE_ID:
OWNER_ROLE:
COMMIT_SHA:

OBJECTIVE:
IMPLEMENTED:
INTENTIONALLY_NOT_CHANGED:

WRITE_SURFACES:
READ_SURFACES:

CANONICAL_REFERENCES:
CONTRACTS_READ:
DEPENDENCIES_CHECKED:

STATE_CHANGES:
EVENTS:
AUTHORITY_BOUNDARY:

TESTS_RUN:
TEST_RESULTS:
BUILD_OR_TYPECHECK:
BROWSER_TESTS:
MOBILE_TESTS:
SECURITY_TESTS:
RESILIENCE_TESTS:

EXPECTED:
ACTUAL:

KNOWN_FAILURES:
KNOWN_WARNINGS:
UNRESOLVED_IMPACTS:

EVIDENCE_REFS:
STATUS:
NEXT_ACTION:
```

## Status semantics

- VERIFIED = bounded task acceptance demonstrated with fresh evidence.
- PARTIAL = some implementation/evidence exists, but completion conditions remain.
- BLOCKED = work cannot progress because a dependency, permission, conflict or environment is unresolved.
- INCONCLUSIVE = evidence exists but does not establish the required property.
- READY_FOR_INTEGRATION = coordinator may inspect and integrate the change.
- LOCKED = coordinator integrated and independently re-verified the task.

## Forbidden handoff behavior

Do not write:

- "looks good";
- "should work";
- "completed" without evidence;
- claims based only on a previous agent's run;
- credentials, tokens, cookies, session IDs, or private user data.

## Coordinator response

The coordinator returns:

```text
INTEGRATED:
REVERIFIED:
EVIDENCE:
CONFLICTS:
IMPACT_STATUS:
FINAL_STATUS:
```
