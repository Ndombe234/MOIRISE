# MORISE AI — CAPABILITY REGISTRY / PROVIDER ROUTER

## Principe

Les modules demandent une capacité. Ils ne connaissent pas le provider.

```ts
export type CapabilityId =
  | "TEXT_GENERATION"
  | "REASONING"
  | "VISION"
  | "IMAGE_GENERATION"
  | "VIDEO_GENERATION"
  | "MUSIC_GENERATION"
  | "TTS"
  | "STT"
  | "TRANSLATION"
  | "EMBEDDING"
  | "SEARCH"
  | "MODERATION"
  | "GAME_2D"
  | "GAME_3D"
  | "CODE_GENERATION"
  | "CODE_TESTING";
```

## Capability contract

```ts
export interface CapabilityDefinition {
  id: CapabilityId;
  version: string;
  inputSchema: string;
  outputSchema: string;
  permissions: string[];
  providers: string[];
  fallbacks: string[];
  resourceClass: "light" | "medium" | "heavy";
}
```

## Provider contract

```ts
export interface AIProvider {
  id: string;
  capabilities: CapabilityId[];
  health(): Promise<HealthStatus>;
  execute(request: ProviderRequest): Promise<ProviderResponse>;
}
```

## Router

Score possible adapters using:
- capability match;
- privacy;
- provider health;
- latency;
- configured quota;
- estimated cost;
- quality history;
- local availability;
- fallback policy.

## Provider order

Le Router ne suit pas un ordre fixe universel. Il utilise une policy.

Exemple :
FREE/ANONYMOUS AUTHORIZED → configured key provider → alternate provider → local → degraded.

Aucune hypothèse de gratuité n'est codée sans vérification.

## Exact Supabase secret names currently observed

```text
POLLINATIONS_API_KEY
LLM7_API_KEY
Higgins face_API_KEY
SiliconFlow_API_KEY
Gemin_API_KEY
Pixelverse_API_KEY
Groc_API_KEY
BazaarLink AI_API_KEY
xkiro_API_KEY
SambaNova Cloud_API_KEY
Openrouter_API_KEY
Posthog_API_KEY
```

Les noms avec espaces doivent être testés dans Supabase avant de coder l'intégration comme variable d'environnement.

## Health

```ts
type HealthStatus =
  | "unknown"
  | "healthy"
  | "degraded"
  | "rate_limited"
  | "unauthorized"
  | "offline";
```

## Circuit breaker

Après une série d'erreurs répétées, un provider passe temporairement `degraded` ou `offline` et le Router passe au suivant.

## Provider adapters

Adapters candidats :
- Gemini;
- DeepSeek;
- Pollinations;
- OpenRouter;
- LLM7;
- SiliconFlow;
- SambaNova;
- autres providers validés.

Aucun module produit ne doit importer directement un SDK provider.
