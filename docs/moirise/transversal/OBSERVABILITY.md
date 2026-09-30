# OBSERVABILITY TRANSVERSALE

## Telemetry layers

Product events answer what users do.
Operational metrics answer how the system behaves.
Traces answer where time is spent.
Audit answers who performed security-sensitive operations.

Do not merge these datasets blindly.

## Correlation

All important operations can carry:
requestId
traceId
actorId when safe
moduleId
operation
entityId where safe
schemaVersion.

Long AI/worker operations additionally carry taskId/graphId.

## Privacy

Do not place raw private messages, private media, provider secrets, session tokens or admin credentials in normal logs.

Analytics payloads are minimized and versioned.

## Error signals

Every AppError can be aggregated by:
code
module
route
operation
dependency
release/version.

## AI observability

Record capability, execution target, provider/worker category, latency, retries, validation result and policy outcome.

No hidden chain-of-thought is required or stored.

## Worker observability

Track:
heartbeat freshness;
queue depth;
lease expiry;
quota violations;
sandbox failures;
task success;
resource pressure.

## Product observability

Useful events include:
onboarding progression;
first successful action;
creation started/completed;
game started/completed;
community join;
message send;
event participation.

Do not interpret a metric as truth outside its documented population and time window.

## Health

Health endpoint must report only safe operational state. Detailed diagnostics belong to protected administration/engineering views.

## Retention

Each stream has a retention class. Security audit retention can differ from product analytics retention.