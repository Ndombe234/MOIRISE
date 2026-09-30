# MODÈLE D'ERREURS

## Forme canonique

~~~text
AppError {
  code,
  category,
  messageKey,
  retryable,
  userAction,
  traceId,
  detailsSafe
}
~~~

## Catégories

AUTH_REQUIRED
FORBIDDEN
NOT_FOUND
VALIDATION
CONFLICT
RATE_LIMITED
DEPENDENCY_UNAVAILABLE
TIMEOUT
QUOTA_EXCEEDED
POLICY_REJECTED
SANDBOX_FAILURE
PROVIDER_FAILURE
WORKER_UNAVAILABLE
INTERNAL

## Règles

L'interface reçoit messageKey et action sûre, pas une stack trace.
Les logs internes peuvent conserver des détails supplémentaires selon la privacy class.
Un retry n'est permis que si la catégorie et l'opération le permettent.
Les erreurs déterministes de validation ne doivent pas être réessayées automatiquement.
Les conflits de version provoquent une relecture de la source canonique avant nouvelle mutation.

## Degraded behavior

Chaque module documente sa capacité à continuer sans AI, sans provider ou sans worker. Les fonctions sociales essentielles ne doivent pas devenir inutilisables parce qu'une capacité IA est indisponible.
