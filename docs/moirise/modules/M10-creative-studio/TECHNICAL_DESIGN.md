# M10 — Creative Studio — CONCEPTION TECHNIQUE CANONIQUE

## 1. Boundary

M10 owns creative projects, artifact versions, generation jobs, compositions, previews and exports. M19 owns the AI orchestration and provider routing. M18 owns distributed execution. M13 owns safety policy.

## 2. Canonical pipeline

~~~text
creative request
→ project authorization
→ requirements normalization
→ capability selection
→ resource policy
→ generation task
→ provider/local/worker execution
→ content validation
→ artifact hash
→ provenance
→ version commit
→ preview
→ export/share
~~~

## 3. Project model

~~~text
CreativeProject {
  projectId
  ownerId
  title
  defaultLocale
  status
  createdAt
  updatedAt
}
~~~

Artifact:
~~~text
Artifact {
  artifactId
  projectId
  artifactType
  ownerId
  sourceTaskId
  contentHash
  storageRef
  validationStatus
  createdAt
}
~~~

Version:
~~~text
ArtifactVersion {
  versionId
  artifactId
  parentVersionId?
  generationInputRef
  validatorRefs[]
  provenanceRef
  createdAt
}
~~~

## 4. Supported artifact types

TEXT
IMAGE
VIDEO
AUDIO
MUSIC
COMPOSITE

A composite artifact references child versions instead of copying binaries.

## 5. Command contracts

CREATE_PROJECT
- actor from session;
- title validation;
- create project.

GENERATE_TEXT/IMAGE/VIDEO/AUDIO/MUSIC
- create generation request;
- resolve M19 capability;
- create durable task;
- return task reference.

COMPOSE_ARTIFACT
- verify all child refs belong to accessible project;
- create composition graph;
- render asynchronously.

CREATE_REVISION
- never mutate an old immutable artifact version;
- create a new version with parent reference.

RENDER_EXPORT
- verify output format;
- check storage quota;
- create export job.

APPROVE_ARTIFACT
- optional checkpoint;
- only approved versions can become publishable when policy requires it.

## 6. Generation task state

~~~text
REQUESTED
→ QUEUED
→ RUNNING
→ VALIDATING
→ READY

RUNNING → FAILED_RETRYABLE → QUEUED
RUNNING → FAILED_TERMINAL
REQUESTED → CANCELLED
~~~

Late results from cancelled jobs do not replace active versions.

## 7. Prompt/revision model

Store prompt metadata as a versioned reference, not necessarily raw text in logs.

Each revision records:
- source artifact;
- prompt/source reference;
- capability version;
- generation target;
- constraints;
- output format;
- safety classification.

Private source input is not copied into general telemetry.

## 8. Provider boundary

M10 requests capability IDs only.

~~~text
M10
→ M19 IMAGE_GENERATION / VIDEO_GENERATION / MUSIC_GENERATION / ...
→ provider/local/worker
→ normalized result
→ M10 validator
~~~

No provider SDK in M10 UI.

## 9. Provenance

Every generated artifact records:
- source request;
- capability/version;
- execution target;
- provider ID when applicable;
- input references;
- output hash;
- validator versions;
- creation timestamp.

Provider output is evidence about generation, not a guarantee of legal ownership.

## 10. Validation

Text:
schema, length, safety, encoding.

Image:
format, size, decode, policy, malware scan where applicable.

Video:
container integrity, codec support, duration, frame budget, audio stream consistency.

Audio/music:
decode, duration, sample rate, size, safety.

Composite:
child validation plus composition graph validation.

## 11. Storage

Use object references, not large binary blobs inside business rows.

Store:
metadata in database;
binary in object storage;
signed access references;
hash for integrity.

Private projects must never share a public cache namespace.

## 12. Caching

Safe cache candidates:
- generated previews;
- public immutable artifact versions;
- deterministic transforms.

Do not reuse sensitive outputs across players.

Cache key:
artifact type + input hash + capability version + policy version + format.

## 13. Resource routing

Small deterministic transformations can run locally.

Large render jobs use M18 or provider adapters.

Resource classes:
SMALL_CPU
MEDIA_RENDER
GPU_OPTIONAL
LONG_MEDIA
COMPOSITE_RENDER

Community workers receive only tasks whose destination policy explicitly permits them.

## 14. User experience

Desktop:
project rail + canvas/preview + properties/version panel.

Mobile:
single-column canvas/preview with bottom action tray; generation progress as a compact status sheet.

Every long generation shows:
queued/running/validation/ready or failure.

The UI never waits on a provider synchronously when a durable job can be used.

## 15. Revision behavior

Old versions remain readable and immutable.

New version:
parentVersionId = current version;
new artifact hash;
new provenance;
new validation.

Rollback = select an earlier version as current pointer, not delete history.

## 16. Export

Export checks:
owner access;
artifact validation;
format support;
size quota;
signed URL expiration.

Export is not equivalent to publication.

## 17. Security

Threats:
- malicious uploaded media;
- prompt injection through source files;
- provider output with embedded instructions;
- cross-project reference abuse;
- huge render requests;
- storage exhaustion.

Mitigations:
- MIME and magic-byte checks;
- content scanning;
- bounded generation specs;
- ownership validation;
- quotas;
- provider outputs treated as untrusted data;
- signed URLs.

## 18. Failure matrix

Provider unavailable:
→ switch eligible target or UNAVAILABLE.

Worker lost:
→ lease expiry and recovery if generation is idempotent.

Corrupt binary:
→ reject artifact and retain previous stable version.

Validation failure:
→ artifact REJECTED, no publish.

Quota:
→ QUEUED/blocked with explicit message; never silently charge.

## 19. Observability

Record:
projectId;
artifactId;
versionId;
taskId;
capabilityId;
executionTarget;
providerId/workerId;
latency;
output size;
validator result;
error code.

Never log full private source media or secret URLs.

## 20. Testing

Unit:
- format validators;
- version graph;
- ownership checks;
- hash consistency.

Integration:
- generation task creation;
- object storage refs;
- validator;
- provenance.

Security:
- cross-project access;
- malicious upload;
- signed URL scope;
- provider prompt injection.

E2E:
- create project;
- generate image;
- generate text;
- version;
- preview;
- export;
- mobile recovery.

Resilience:
- provider outage;
- worker loss;
- cancel/restart;
- duplicate task;
- corrupted output.

## 21. Definition of done

M10 is complete when every supported artifact type has an authoritative pipeline, state machine, validator, provenance record, storage policy, versioning behavior, failure path, mobile surface, tests and M19/M18 integration through typed contracts.
