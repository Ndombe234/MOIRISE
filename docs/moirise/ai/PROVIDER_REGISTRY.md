# MORISE AI — PROVIDER REGISTRY

## Authority
Ce registre contient les fournisseurs/canaux d'exécution. Aucun provider n'est MORISE AI.

## Historical providers explicitly present
- Gemini
- Pollinations
- Puter
- OpenRouter
- Cloudflare Workers AI
- Replicate
- Firecrawl

## Providers surfaced by the later project configuration/capture
- LLM7
- Vireonix
- Murakumo
- Kilo AI
- AI Horde
- AI Horde OpenAI API
- Cehpoint AI
- OVH AI Endpoints
- Quillly
- Openverse
- Internet Archive

## Capability classes
LLM/reasoning: text, reasoning, classification, summarization.
Vision: vision/analysis.
Creative: image, video, audio, music, voice.
Knowledge: search, embeddings, retrieval.
Code/game: code generation/testing, game creation.
Safety: moderation/classification.
Translation: translation.

## Provider contract
ProviderAdapter(id, capabilities, health, execute(request), normalizeError, normalizeResponse, cancel?).

## Mandatory fields
providerId, version, capabilityIds, authMode, secretRef?, endpointRef?, privacyPolicy, quotas, payloadLimit, timeout, health, fallbackRole, provenance.

## Rules
Provider URLs and secrets are not hard-coded in product modules. A provider is selected only through M15 capability/resource routing. Provider output is untrusted until validation. Provider outage must produce fallback/degraded state rather than breaking core social use.

## Verification
A name appearing in a screenshot is not proof of an approved production endpoint. Before activation, endpoint, authentication, terms, quota, response schema and capability mapping must be verified and recorded.

## Secret rule
Only secret variable names may appear in documentation. Secret values never belong in GitHub.
