# M01 — FOUNDATION — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 0. Boundary
**Owner : M01.** Architecture : UI → server boundary → use-case owner → policy → repository/adapter → persistence/provider → event → projection.

## 1. Command contract
```
Command {
  commandId: string,
  actorId: server-derived,
  capabilityId: string,
  targetRef?: string,
  expectedVersion?: number,
  payload: validated object
}
```
Le serveur refuse actorId arbitraire, capability inconnue, payload hors schema, target hors scope, expectedVersion périmée ou réutilisation d'un commandId avec un payload différent.

## 2. Capability contracts
### M01.C1 Boot
Entrée : actor + contexte minimal + payload validé.
Préconditions : no secrets client.
Exécution : boot state.
Sortie autoritative : optional dependency fails: DEGRADED, critical failure: RECOVERABLE_ERROR.
Erreur principale : undefined.
Boundary sécurité : undefined.

### M01.C2 Routing
Entrée : actor + contexte minimal + payload validé.
Préconditions : URL never grants authority.
Exécution : navigation projection.
Sortie autoritative : unknown route: recoverable 404; unauthorized: auth/forbidden.
Erreur principale : undefined.
Boundary sécurité : undefined.

### M01.C3 Session
Entrée : actor + contexte minimal + payload validé.
Préconditions : client actorId ignored.
Exécution : session context.
Sortie autoritative : expired session: reauth, never partial write.
Erreur principale : undefined.
Boundary sécurité : undefined.

### M01.C4 Capability registry
Entrée : actor + contexte minimal + payload validé.
Préconditions : consumer cannot pick arbitrary provider.
Exécution : CapabilityDefinition.
Sortie autoritative : invalid schema or duplicate: reject.
Erreur principale : undefined.
Boundary sécurité : undefined.

### M01.C5 AI gateway
Entrée : actor + contexte minimal + payload validé.
Préconditions : keys/endpoints server-side.
Exécution : AI execution ref.
Sortie autoritative : provider down: fallback/degraded; invalid result: INCONCLUSIVE.
Erreur principale : undefined.
Boundary sécurité : undefined.

### M01.C6 Events
Entrée : actor + contexte minimal + payload validé.
Préconditions : private payload minimized.
Exécution : immutable event.
Sortie autoritative : duplicate delivery: dedupe; unknown schema: quarantine.
Erreur principale : undefined.
Boundary sécurité : undefined.

## 3. Persistence
Contraintes uniques pour identities/idempotency; index sur owner+status+updatedAt et clés de recherche; foreign keys uniquement lorsque coupling autorisé; version d'optimistic concurrency quand plusieurs writers existent; suppression/retention alignées avec privacyClass.

## 4. State and transaction contract
Chaque transition définit stateBefore → trigger → guards → transaction → stateAfter → event. Les écritures formant une seule unité métier sont atomiques. Les projections sont reconstruites depuis l'autorité si elles deviennent incohérentes.

## 5. Idempotence / concurrence
Même commandId + même payload = même résultat. Même commandId + payload différent = CONFLICT. Les événements peuvent être délivrés deux fois; les consumers dédupliquent par eventId/sourceRef. Une réponse browser ancienne ne peut pas écraser une version plus récente.

## 6. Event envelope
```
eventId, eventType, schemaVersion, producerModule, occurredAt,
commandId?, requestId?, actorRef?, payloadRef
```
Un event exprime un fait déjà commit. Il ne transporte pas inutilement les contenus privés.

## 7. Failure matrix
- validation → erreur typée, aucune écriture;
- auth absente → 401/sign-in;
- permission refusée → 403 sans fuite;
- cible supprimée → NOT_FOUND/STALE;
- conflit → 409 + nouvelle version;
- timeout → retry borné/fallback;
- provider down → DEGRADED si capability non critique;
- réseau perdu après commit → récupération par commandId;
- worker perdu → requeue uniquement si tâche idempotente.

## 8. Security
Protection IDOR, actor server-derived, validation input/output, session/CSRF selon transport, SSRF allowlist, dependency allowlist, resource limits, sandbox, secret isolation, privacy checks before provider routing, prompt injection treated as untrusted data.

## 9. AI boundary
Aucune capacité métier ne traite directement une sortie de modèle comme autorité. M15 fournit normalized result + validation report + provenance. Le owner du module décide de la mutation.

## 10. Browser proof
Desktop : deep links, refresh, keyboard, focus, no critical console error.
Mobile : touch targets, back navigation, keyboard, narrow viewport, media upload where applicable.
Chaque mutation est testée en double tap et avec réseau coupé juste après commit.

## 11. Observability
requestId, traceId, commandId, moduleId, capabilityId, state transition, validation outcome, duration, provider/worker ref, errorCode. Jamais de secret, mot de passe ou contenu privé brut dans telemetry générale.

## 12. Performance
Limits explicites; pagination; lazy load; async jobs; cache invalidation; no AI blocking critical boot; runtime 3D isolé et chargé à la demande.

## 13. Rollback / recovery
Versions critiques immuables. Un nouveau comportement devient une nouvelle version de règle/capability. Les résultats historiques ne sont pas réécrits silencieusement. Les migrations destructrices exigent une stratégie forward-fix/rollback documentée.

## 14. Tests
Unit rules; integration persistence; auth/policy; event contract; idempotency; concurrency; failure injection; provider fallback; worker lease; artifact sandbox lorsqu'applicable; desktop; mobile; accessibility; regression; observability.

## 15. DONE
Build/tests verts; permissions prouvées; data coherent under retry/concurrency; fallback/recovery proven; mobile+desktop verified; no duplicate authority; documentation handoff complete.
