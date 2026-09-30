# MORISE AI — CORE ORCHESTRATOR

## Rôle

L'Orchestrator est le point d'entrée du raisonnement opérationnel. Il ne possède pas le détail des providers.

## Modules internes

- Context Engine
- Intent Engine
- Policy Engine
- Planning Engine
- Decision Engine
- Action Executor
- Validation Coordinator
- Response Composer
- Event Publisher

## Types principaux

```ts
export interface AIRequest {
  requestId: string;
  actorId?: string;
  moduleId: string;
  capability?: CapabilityId;
  input: unknown;
  context?: Partial<AIContext>;
  privacy: PrivacyLevel;
  priority: "low" | "normal" | "high";
  idempotencyKey?: string;
}

export interface AIPlan {
  id: string;
  intent: string;
  steps: PlanStep[];
  requiredCapabilities: CapabilityId[];
  risks: Risk[];
  expectedOutcome: string;
}

export interface PlanStep {
  id: string;
  action: AIActionId;
  capability: CapabilityId;
  input: unknown;
  requiresConfirmation: boolean;
  timeoutMs: number;
}
```

## Exécution

1. Vérifier auth.
2. Valider format.
3. Construire Context Pack.
4. Déduire Intent.
5. Appliquer Policy.
6. Construire Plan.
7. Résoudre les capacités.
8. Exécuter chaque étape avec limites.
9. Valider les outputs.
10. Composer une réponse.
11. Émettre un événement.
12. Créer une expérience si éligible.

## Actions explicites

```ts
type AIActionId =
  | "READ_PROFILE"
  | "READ_CONTEXT"
  | "UPDATE_PROFILE"
  | "CREATE_POST"
  | "SEND_PRIVATE_MESSAGE"
  | "TRANSLATE"
  | "SEARCH"
  | "GENERATE_TEXT"
  | "GENERATE_IMAGE"
  | "GENERATE_VIDEO"
  | "GENERATE_MUSIC"
  | "GENERATE_AUDIO"
  | "CREATE_GAME"
  | "RUN_GAME_TEST"
  | "CREATE_EVENT"
  | "PROPOSE_IMPROVEMENT";
```

Aucune action générique `EXECUTE_ANYTHING`.

## Confirmation

Action à faible risque : exécution autorisée selon policy.
Action externe/irréversible/sensible : confirmation requise.
Action interdite : refus sans contournement.

## Réponse

L'Orchestrator ne renvoie jamais son chain-of-thought. Il renvoie :
- intention comprise ;
- statut ;
- action réalisée ;
- résultat ;
- limitation si applicable.

## Failure

Chaque plan doit avoir un fallback ou un état `unavailable`.
