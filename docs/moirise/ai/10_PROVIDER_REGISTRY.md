# MORISE AI — PROVIDER REGISTRY

## Authority
Only this file owns provider endpoint configuration for the AI architecture. Modules must reference capability IDs, never provider URLs.

## Provider record
Each provider entry must contain: `id`, `baseUrl`, `authMode`, `secretName`, `capabilities`, `healthCheck`, `privacyClass`, `rateLimit`, `fallbacks`, `enabled`, `lastVerifiedAt`.

## Providers requested for MOIRISE
- Gemini / Google AI Studio — text, reasoning, vision and other capabilities supported by the selected Gemini model.
- DeepSeek — text, reasoning and code capabilities supported by the selected model.
- Pollinations — anonymous/key-based creative endpoints when their current contract supports the requested capability.
- Puter — client-side AI gateway when its current contract supports the requested capability.
- OpenRouter — model routing for supported text/reasoning models; free availability must never be assumed.
- LLM7 — text capability when endpoint and quota are available.
- SiliconFlow — model/API capabilities supported by the account.
- SambaNova Cloud — supported text/reasoning models.
- AI Horde — community generation endpoints where permitted.
- AI Horde OpenAI-compatible API — compatible text interface where permitted.
- Cehpoint AI — only after endpoint/terms are verified.
- OVH AI Endpoints — supported AI endpoints.
- Quillly — supported creative/tool endpoints after verification.
- Openverse — public/open media discovery, not an AI generation provider.
- Internet Archive — public/archive media discovery, not an AI generation provider.

## Anonymous URLs
The exact anonymous URLs supplied during project discussions must be copied here only after verification. Never invent an endpoint from a provider name. Anonymous access is an adapter mode, not a promise of unlimited or permanent free access.

Known external reference supplied by the project: `https://api.freetouse.com/v3/openapi.json` (must be verified before production use).

## Secrets
Secret values never enter Git. Existing Supabase secret names observed in the project must be verified before use. Examples previously supplied include `Gemin_API_KEY`, `Openrouter_API_KEY`, `POLLINATIONS_API_KEY`, `LLM7_API_KEY`, `Posthog_API_KEY`, and other provider-specific names. Exact names are configuration data and must be checked in Supabase before code depends on them.

## Router rule
Provider selection uses capability, privacy, health, quota, latency, quality history, local availability and fallback policy. No provider is the permanent brain.

## Verification rule
Before an adapter is enabled: verify endpoint, authentication, response schema, quota/rate limit, privacy/terms, timeout behavior and failure behavior. Mark unknown providers as `disabled/unverified`, not as working.
