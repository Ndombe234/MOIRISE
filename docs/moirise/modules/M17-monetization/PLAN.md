# M17 — Monetization / Partnerships — PLAN DE MODULE

## Mission
Fournir des surfaces optionnelles de monétisation et partenariats non intrusives si activées, avec attribution, conformité et absence de paiement forcé.

## Ownership
Entities: Placement; Campaign; Impression; ClickAttribution; Partner; AmbassadorCode; RewardExperience; MonetizationConfig.
Commands: CREATE_PLACEMENT; ENABLE_CAMPAIGN; RECORD_IMPRESSION; RECORD_ATTRIBUTION; CREATE_AMBASSADOR_REF; GRANT_AMBASSADOR_EXPERIENCE; DISABLE_CAMPAIGN.
Queries: GET_ACTIVE_PLACEMENTS; GET_CAMPAIGN; GET_ATTRIBUTION; GET_PARTNER; GET_AMBASSADOR_STATUS.
Events: PLACEMENT_SHOWN; IMPRESSION_RECORDED; ATTRIBUTION_RECORDED; AMBASSADOR_REWARD_GRANTED; CAMPAIGN_DISABLED.

## Dependencies
M01, M13, M16.

## Lifecycle
campaign DRAFT → ACTIVE → PAUSED/ENDED; placement ACTIVE/INACTIVE.

## User / operator experience
native/banner placements only when enabled; no popunder/social bar/forced redirect; ambassador rewards are in-platform experiences.

## AI boundary
AI may optimize placement relevance under policy but cannot bypass safety, privacy or frequency caps.

## Data
campaign metadata, placement config, attribution, partner refs, reward experience ledger.

## Security
financial/partner configuration segregated; no secret ad credentials in browser; policy and frequency caps server-side.

## Performance
async impression logging; no blocking page rendering.

## Failure behavior
Double submit, unauthorized actor, stale config, dependency outage, worker loss, provider outage, timeout, reconnect, concurrent update and corrupted record must be handled explicitly.

## Cross-module rules
Use events and typed service contracts. Never modify another module's database directly.

## Acceptance
optional module can be disabled without breaking core MOIRISE; attribution privacy-respecting; no forced user payment.

## DONE
All commands/queries have authorization, persistence, error handling, tests, observability and browser/admin verification.