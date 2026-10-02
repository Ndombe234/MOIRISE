# MOIRISE — RELEASE CHECKLIST

## A. Specification
- [ ] Canonical owner identified.
- [ ] PLAN.md checked.
- [ ] TECHNICAL_DESIGN.md checked.
- [ ] Dependencies and cross-module impacts identified.
- [ ] Internationalization impact identified.

## B. Implementation
- [ ] Existing implementation reused where applicable.
- [ ] No duplicate owner introduced.
- [ ] No M16 introduced.
- [ ] No fake users/counters/social proof.
- [ ] Privacy and authorization preserved.

## C. Automated verification
- [ ] Typecheck passes.
- [ ] Targeted unit tests pass.
- [ ] Integration tests pass.
- [ ] Contract tests pass where relevant.
- [ ] Build passes.
- [ ] Required security/resilience tests pass.

## D. Browser verification
- [ ] Desktop primary journey.
- [ ] Desktop error/recovery journey.
- [ ] Mobile primary journey.
- [ ] Mobile error/recovery journey.
- [ ] Back/forward.
- [ ] Reload.
- [ ] Deep link.
- [ ] No blank screen.
- [ ] No critical console error.
- [ ] Loading/empty/error/unavailable/degraded states.

## E. International verification
- [ ] Unicode/non-Latin content.
- [ ] Long text/name expansion.
- [ ] Language switch.
- [ ] Date/time/number locale formatting.
- [ ] Timezone-sensitive behavior.
- [ ] RTL sample where supported.

## F. Regression
- [ ] Affected module regression.
- [ ] Relevant cross-loop regression.
- [ ] Auth/privacy regression.
- [ ] Reward/result integrity regression.
- [ ] 2D/3D regression if game runtime touched.

## G. Deployment
- [ ] Deployment completed.
- [ ] Actual deployed URL/version verified.
- [ ] Production smoke test passed.
- [ ] Rollback point known.
- [ ] Evidence recorded.

## Final status
VERIFIED only when all required checks have fresh evidence.
Otherwise use PARTIAL, BLOCKED or INCONCLUSIVE.
