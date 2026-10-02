# MOIRISE Browser E2E

This directory is reserved for executable browser end-to-end scenarios.

The canonical behavioral source is:
- docs/moirise/transversal/TESTING.md
- docs/moirise/transversal/AGENT_FABRICATION_PROTOCOL.md
- docs/qa/USER_JOURNEYS.md
- docs/qa/REGRESSION_MATRIX.md

Browser automation must verify real user behavior, not only DOM existence.

Required baseline:
OPEN → LOAD → AUTH/SESSION → NAVIGATE → PRIMARY ACTION → SECONDARY ACTION → BACK → REFRESH → REOPEN → SUCCESS → ERROR → RECOVERY.

Do not duplicate business rules here; reference the owner contracts.

When an E2E framework is introduced or changed, update this README and the release checklist together.
