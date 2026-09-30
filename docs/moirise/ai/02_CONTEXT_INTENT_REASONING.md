# MORISE AI — CONTEXT / INTENT / REASONING

## Context Pack

Le Context Pack doit rester petit.

```ts
export interface AIContext {
  sessionId?: string;
  actorId?: string;
  locale: string;
  moduleId: string;
  route?: string;
  currentExperienceId?: string;
  explicitIntent?: string;
  permittedEvents: unknown[];
  explicitPreferences: Record<string, unknown>;
  worldState?: unknown;
  gameState?: unknown;
  availableCapabilities: CapabilityId[];
  providerHealth: Record<string, HealthStatus>;
  privacyPolicy: PrivacyPolicy;
  deviceProfile?: DeviceProfile;
}
```

## Context retrieval

`REQUEST → RETRIEVE RELEVANT MEMORY → DEDUP → COMPRESS → CAP CONTEXT`

Jamais d'envoi automatique de toute la mémoire.

## Intent Engine

Transforme :
- texte ;
- bouton ;
- événement ;
- état de jeu ;
- action de création
en `Intent`.

```ts
interface Intent {
  type: string;
  confidence: number;
  parameters: Record<string, unknown>;
  origin: "user" | "system" | "event";
}
```

## Reasoning

Le raisonnement peut utiliser :
- règles déterministes ;
- calculs locaux ;
- modèle externe ;
- heuristiques ;
- recherche ;
- expériences similaires.

Il doit choisir la méthode adaptée.

## Deterministic core

Les règles critiques restent déterministes :
- permissions ;
- XP ;
- récompenses ;
- RLS ;
- validation des résultats ;
- limites de ressources ;
- sécurité.

## Model usage

Un LLM ne reçoit que la portion de contexte nécessaire et peut proposer une décision. Les parties critiques la valident.

## Uncertainty

```ts
interface Decision {
  action: AIActionId;
  confidence: number;
  evidenceIds: string[];
  requiresConfirmation: boolean;
}
```

Une faible confiance doit produire :
- clarification ;
- plusieurs options ;
- état dégradé ;
- ou refus contrôlé.
