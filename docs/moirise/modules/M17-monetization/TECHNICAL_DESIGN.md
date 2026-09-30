# M17 — Monetization / Partnerships — CONCEPTION TECHNIQUE

## 1. Architecture boundary
Fournir des surfaces optionnelles de monétisation et partenariats non intrusives si activées, avec attribution, conformité et absence de paiement forcé.

~~~text
surface
→ authorized use case
→ policy
→ domain/state machine
→ storage/queue
→ event/audit
→ observable result
~~~

Dependencies: M01, M13, M16.

## 2. Contracts
~~~text
Command { commandId, actorFromSession, requestId, idempotencyKey?, payload, schemaVersion }
Query { requestId, actorFromSession?, cursor?, limit, filters }
Result { ok, data?, error?, traceId }
~~~

## 3. Domain
Placement; Campaign; Impression; ClickAttribution; Partner; AmbassadorCode; RewardExperience; MonetizationConfig.

Each entity requires lifecycle, owner, version, timestamps, indexes, uniqueness and retention/privacy.

## 4. Commands
### 1 CREATE_PLACEMENT
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 2 ENABLE_CAMPAIGN
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 3 RECORD_IMPRESSION
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 4 RECORD_ATTRIBUTION
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 5 CREATE_AMBASSADOR_REF
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 6 GRANT_AMBASSADOR_EXPERIENCE
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 7 DISABLE_CAMPAIGN.
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

## 5. Queries
### 1 GET_ACTIVE_PLACEMENTS
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 2 GET_CAMPAIGN
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 3 GET_ATTRIBUTION
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 4 GET_PARTNER
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 5 GET_AMBASSADOR_STATUS.
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

## 6. Lifecycle
campaign DRAFT → ACTIVE → PAUSED/ENDED; placement ACTIVE/INACTIVE.

Every async lifecycle has a timeout, lease or recovery rule.

## 7. UI
native/banner placements only when enabled; no popunder/social bar/forced redirect; ambassador rewards are in-platform experiences.

## 8. AI integration
AI may optimize placement relevance under policy but cannot bypass safety, privacy or frequency caps.
M19 internally follows the global AI architecture; product modules must use the capability registry instead of provider SDKs.

## 9. Security
financial/partner configuration segregated; no secret ad credentials in browser; policy and frequency caps server-side.

## 10. Failure/recovery

| Failure | Expected behavior |
|---|---|
| auth expires | stop mutation, preserve safe intent |
| policy denies | reject, audit if security relevant |
| dependency unavailable | fallback/degrade |
| duplicate | return previous result |
| timeout | bounded retry if idempotent |
| stale state | conflict/reconciliation |
| worker lost | lease expiry and requeue when safe |

## 11. Observability
Every operational action carries actor, request/trace, action type, result, timestamp and affected entity refs. Private content is minimized.

## 12. Tests
Unit policy/state tests; integration storage; security permission matrix; E2E admin/browser; mobile when relevant; resilience; audit verification.

## 13. Implementation runbook
Types → storage → policy → service → events/audit → UI → tests → browser checks → performance → security review → DONE.

## 14. Puzzle sheet
Owner=M17
Scope=Fournir des surfaces optionnelles de monétisation et partenariats non intrusives si activées, avec attribution, conformité et absence de paiement forcé.
Entities=Placement; Campaign; Impression; ClickAttribution; Partner; AmbassadorCode; RewardExperience; MonetizationConfig.
Commands=CREATE_PLACEMENT; ENABLE_CAMPAIGN; RECORD_IMPRESSION; RECORD_ATTRIBUTION; CREATE_AMBASSADOR_REF; GRANT_AMBASSADOR_EXPERIENCE; DISABLE_CAMPAIGN.
Queries=GET_ACTIVE_PLACEMENTS; GET_CAMPAIGN; GET_ATTRIBUTION; GET_PARTNER; GET_AMBASSADOR_STATUS.
States=campaign DRAFT → ACTIVE → PAUSED/ENDED; placement ACTIVE/INACTIVE.
Events=PLACEMENT_SHOWN; IMPRESSION_RECORDED; ATTRIBUTION_RECORDED; AMBASSADOR_REWARD_GRANTED; CAMPAIGN_DISABLED.
Security=financial/partner configuration segregated; no secret ad credentials in browser; policy and frequency caps server-side.
Acceptance=optional module can be disabled without breaking core MOIRISE; attribution privacy-respecting; no forced user payment.

No unresolved owner, permission or lifecycle transition may remain.