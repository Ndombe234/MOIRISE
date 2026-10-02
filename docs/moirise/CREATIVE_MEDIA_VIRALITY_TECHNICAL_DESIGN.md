# MOIRISE — CREATIVE MEDIA + SOCIAL VIRALITY — TECHNICAL DESIGN

## 0. Authority
This document is the cross-module technical contract for creative media, social distribution and virality mechanics. It does not create a new module. Business owners remain those defined in MASTER_PLAN.md.

## 1. Boundary
UI → command boundary → owner use-case → privacy/provenance policy → media analysis/generation capability → validator → owner commit → event → projection → discovery.

## 2. Canonical media object
```ts
MediaAsset {
  id;
  ownerRef;
  kind: IMAGE | VIDEO | AUDIO | MUSIC | STORY | REEL | AVATAR;
  storageRef;
  mime;
  size;
  durationMs?;
  dimensions?;
  visibility;
  privacyClass;
  sourceOwnershipClass;
  provenanceRef;
  moderationStatus;
  originalityStatus;
  createdAt;
  version;
}
```

## 3. Media upload pipeline
```text
client select/capture
→ resumable upload
→ quarantine
→ MIME/signature validation
→ size/dimension/duration limits
→ malware/safety scan
→ ownership/permission declaration
→ provenance record
→ derivative generation
→ owner commit
→ event
→ projection
```

A failed validation never publishes the asset.

## 4. Derivatives
Generate bounded derivatives:
- thumbnail;
- feed preview;
- story preview;
- reel streaming renditions;
- waveform/audio preview;
- poster frame;
- AI analysis representation.

The original asset remains canonical. Derived files are disposable/cacheable.

## 5. AI media analysis contract
```ts
MediaAnalysisRequest {
  mediaRef;
  actorRef;
  privacyClass;
  permissionState;
  purpose: CREATIVE_TRANSFORMATION | MODERATION | SEARCH | ACCESSIBILITY;
}
```

Output:
```ts
MediaSemanticProfile {
  subjects[];
  scene[];
  composition[];
  colorPalette[];
  lighting;
  motion;
  pacing;
  mood[];
  genreHints[];
  audioFeatures[];
  transcriptRef?;
  protectedRanges[];
  sourceOwnershipClass;
  provenanceRef;
  confidence;
  expiry;
}
```

Raw private media is not copied into general telemetry.

## 6. Creative transformation contract
Input = semantic profile + explicit user intent + permitted source refs + transformation constraints.

The generator receives a **creative brief**, not an instruction to reproduce the source expression.

Examples of transformation dimensions:
- composition changed;
- subject relationship changed;
- setting changed;
- palette changed;
- camera language changed;
- pacing changed;
- narrative changed;
- character/object identity changed where necessary;
- original text/lyrics/dialogue replaced with newly generated expression.

A trivial spelling substitution, minor pitch shift, speed change, crop, border or re-encoding is not considered an originality transform.

## 7. Similarity/originality gate
For third-party source material:
```text
source permission
→ protected-element detector
→ semantic extraction
→ generation
→ similarity checks
→ prohibited-expression checks
→ provenance validation
→ publish decision
```

If the output is too close to protected source material or rights are unclear, state = INCONCLUSIVE/REJECTED and the user receives a safe alternative path.

This is a technical risk-control mechanism, not a legal guarantee.

## 8. Music/audio pipeline
```text
audio input
→ rights/permission class
→ feature extraction
→ protected recording/lyrics/melody handling
→ new musical brief
→ generation
→ audio validation
→ similarity/risk screening
→ provenance
→ publish
```

Do not attempt to bypass copyright by changing individual words or characters. The system must generate materially new expression or use an authorized source/catalog.

## 9. Video pipeline
```text
video
→ frame sampling
→ scene segmentation
→ motion analysis
→ audio analysis
→ transcript if permitted
→ semantic profile
→ storyboard
→ generation/editing
→ temporal validation
→ safety/originality
→ preview
→ user approval
→ publish
```

## 10. Image pipeline
```text
image
→ vision analysis
→ semantic profile
→ protected-element classification
→ creative brief
→ image generation/editing
→ metadata/provenance
→ visual validation
→ preview
→ approval
```

## 11. Stories technical model
```ts
Story {
  id;
  ownerRef;
  itemRefs[];
  audiencePolicy;
  expiresAt;
  archivePolicy;
  replyPolicy;
  provenanceRefs[];
  status;
}
```

State:
DRAFT → VALIDATED → PUBLISHED → EXPIRED → ARCHIVED/DELETED.

## 12. Reel technical model
```ts
Reel {
  id;
  ownerRef;
  mediaRef;
  captionRef;
  audioRef?;
  visibility;
  remixPolicy;
  attributionRef;
  rankingSignalsVersion;
  status;
}
```

State:
DRAFT → VALIDATED → PUBLISHED → DISTRIBUTED → REMOVED/ARCHIVED.

## 13. Repost/remix
A repost stores a reference to the original object; it does not duplicate ownership.

A remix stores:
- sourceRef;
- permission state;
- transformation type;
- new creator;
- attribution;
- resulting asset ref.

The original owner remains visible where policy requires.

## 14. Feed ranking
Candidate generation must first apply:
1. authentication/visibility;
2. block/mute/privacy;
3. safety/recommendation eligibility;
4. dedupe;
5. quality floor.

Then score using bounded signals:
```text
relevance
+ predicted satisfaction
+ completion/watch quality
+ explicit feedback
+ social connection
+ freshness
+ novelty
+ diversity
+ creator quality
- repetition
- negative feedback
- safety/recommendation penalties
```

Weights are versioned. No single user action should instantly dominate ranking.

## 15. Friends layer
A projection can expose public activity from mutually connected users. It must never reveal private likes/comments/activity that the user has chosen to hide.

## 16. Share graph
```text
content created
→ share target selected
→ permission check
→ share token/reference
→ recipient opens
→ attribution retained
→ event
→ optional recommendation signal
```

External share links must use a safe public projection and must never embed private data.

## 17. Group recommendation
M15 emits `CommunityProposal`.

M11 validates:
- evidence threshold;
- topic safety;
- non-sensitive inference;
- name uniqueness;
- creator/owner;
- visibility;
- minimum viable purpose.

Only M11 commits membership/group state.

## 18. Viral invitation engine
A `ShareOpportunity` is generated only after a meaningful event:
- creation completed;
- challenge result;
- game result;
- collection milestone;
- collaborative artifact;
- personalized discovery.

Schema:
```ts
ShareOpportunity {
  sourceEventRef;
  audienceCandidates[];
  reasonKey;
  cooldownKey;
  expiresAt;
  privacyClass;
}
```

The SYSTEM selects at most a small number of relevant actions. No global action bar is expanded with every capability.

## 19. First-session engine
The first-session recommender should optimize a sequence, not a screen:
```text
welcome
→ instant discovery
→ one low-friction interaction
→ one creative transformation
→ one playable moment
→ one social connection
→ optional share
```

Each step is cancellable and the sequence adapts to actual behavior.

## 20. Anti-spam / anti-growth-hack controls
- share cooldowns;
- invitation dedupe;
- burst suppression;
- creator diversity;
- recipient relevance;
- no fake counters;
- no fake members;
- no fake scarcity;
- no forced contacts upload;
- no dark-pattern confirmation;
- report/mute/not-interested always available.

## 21. Recommendation explanation
Every recommendation may expose a short `reasonKey`, for example:
- `BECAUSE_YOU_PLAYED_X`
- `YOUR_GROUP_LIKES_X`
- `NEW_IN_YOUR_INTERESTS`
- `CREATED_BY_MUTUAL`
- `TRY_THIS_CREATIVE_TRANSFORM`

No sensitive hidden feature is disclosed.

## 22. Provider/API routing
UI never chooses provider URLs. M15 capability routing chooses an adapter after hard filters.

Provider registry fields:
```ts
ProviderAdapter {
  providerId;
  capabilityIds[];
  endpointRef;
  authMode;
  privacyClasses[];
  requestSchema;
  responseSchema;
  rateLimit;
  costClass;
  healthState;
  termsRef;
  enabled;
}
```

Secrets remain server-side. Anonymous/public endpoints are treated as untrusted and can only be enabled after schema, rate-limit, privacy, terms and health verification.

## 23. Existing provider examples
Pollinations, Puter, LLM7, AI Horde, Kilo AI, Hugging Face, Gemini, OpenRouter and other historical candidates remain interchangeable execution targets only. Their presence does not make them the intelligence.

## 24. Testing matrix
Every media capability requires:
- valid upload;
- invalid MIME;
- oversized file;
- corrupt file;
- slow network;
- retry after commit;
- duplicate command;
- unauthorized source;
- private source leakage;
- provider timeout;
- provider malformed output;
- originality INCONCLUSIVE;
- publish cancellation;
- deletion propagation;
- mobile;
- desktop;
- accessibility;
- degraded/no-provider mode.

## 25. Performance
- resumable uploads;
- background transcoding;
- lazy feed media;
- poster-first video loading;
- adaptive streaming;
- bounded AI analysis;
- cache semantic profiles by content hash + version + scope;
- never block app boot on creative AI;
- prefetch only when predicted value exceeds resource budget.

## 26. Security/privacy
- owner-derived identity;
- signed upload URLs;
- quarantine storage;
- content-type validation;
- scoped AI context;
- no private media in analytics payloads;
- explicit camera-roll/media permission;
- deletion/retention propagation;
- provider-specific privacy routing;
- no arbitrary URL fetching from model output;
- no arbitrary code execution from creative input.

## 27. DONE
The technical contract is complete when the same architecture can handle photo, video, audio and music input; generate new artifacts; preserve provenance; enforce privacy; support Stories/Reels/reposts/remixes; feed discovery; create share opportunities; and degrade safely when AI/providers are unavailable.
