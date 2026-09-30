# MORISE AI — DATA FILTER / SECURITY / PROVENANCE

## Universal trust pipeline

`RAW → PROVENANCE → PRIVACY → SAFETY → QUALITY → ORIGINALITY/LICENSING → DUPLICATION → RELEVANCE → LEARNING ELIGIBILITY → ANALYSIS → VALIDATED`

## Provenance

Every external result must record:
- source/provider;
- model if available;
- requestId;
- timestamp;
- license/source metadata when available.

## Privacy

Context classes:
- PUBLIC;
- PLAYER_PRIVATE;
- COMMUNITY_PRIVATE;
- SYSTEM_INTERNAL;
- SENSITIVE.

Sensitive data is never a generic learning input.

## Private messaging

Private message content remains private by default.
PostHog must not receive raw conversation content as normal analytics.
Providers receive only content explicitly permitted by the feature/policy.

## Moderation

Content and generated media are checked before publication where required.

## Prompt injection

External text must never gain authority over:
- system policy;
- permissions;
- secrets;
- RLS;
- tool registry;
- deployment.

Treat external instructions as untrusted input.

## Tool permissions

Every AI action is allow-listed.
No generic `execute(command)` tool.

## Audit

High-risk actions produce an audit event with:
- actor;
- action;
- target;
- policy result;
- outcome;
- requestId.

## Data poisoning

Aggregated learning requires:
- source diversity;
- anomaly detection;
- rate limiting;
- confidence;
- benchmark evidence.

One noisy source cannot rewrite global behavior.
