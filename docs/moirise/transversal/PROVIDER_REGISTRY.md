# MOIRISE — PROVIDER REGISTRY CANONIQUE

## Purpose
External providers are auxiliary execution mechanisms. They are never the identity of MORISE AI.

## Candidate catalog

| Provider | Known capability categories | Verification status |
|---|---|---|
| Pollinations | text/image/video/audio/music | endpoint/auth/quota must be verified before activation |
| Puter | text/image/video/audio/music | verify current execution model |
| LLM7 | LLM/text | verify current endpoint and models |
| Vireonix | LLM | verify official capability data |
| Murakumo | LLM | verify official capability data |
| Kilo AI | LLM/vision | verify official capability data |
| AI Horde | text/image | verify API and terms |
| AI Horde OpenAI API | OpenAI-compatible text | verify current endpoint |
| Cehpoint AI | LLM | verify official capability data |
| OVH AI Endpoints | LLM/vision | verify current catalog |
| Quillly | creative/tools | verify official capability data |
| Openverse | open media search | source discovery + license metadata |
| Internet Archive | archive/media discovery | source discovery + rights metadata |
| Gemini | text/vision/multimodal | adapter only |
| DeepSeek | text/reasoning/code | adapter only |
| OpenRouter | multi-provider text | router adapter only |

## Registry schema

providerId
displayName
capabilities[]
endpoint
authMode
secretName
requestSchema
responseSchema
timeout
quota
privacyClassAllowed[]
dataDestinationPolicy
termsRef
health
fallbackProviderIds[]
lastVerifiedAt
disabledReason?

## URL rules

A URL supplied by a screenshot or conversation is not automatically a production endpoint. Before activation:
1. verify official source;
2. verify endpoint behavior;
3. verify auth;
4. verify quota;
5. verify response schema;
6. verify policy/terms;
7. add health probe;
8. record verification date.

## Secrets

Values are never committed. Documentation stores names only. Server-side adapters read secrets from the configured secret manager.

Historical aliases such as GEMIN_API_KEY and Higgins face_API_KEY are normalized to GEMINI_API_KEY and HUGGINGFACE_API_KEY through migration notes, without copying secret values.

## Fallback

LOCAL/ON_DEVICE → CACHE → TRUSTED_WORKER → COMMUNITY_WORKER if data policy permits → VERIFIED_FREE/CLIENT → VERIFIED_API_KEY → PAID if explicitly enabled → DEGRADED/UNAVAILABLE.

A provider failure never changes product ownership or AI architecture.
