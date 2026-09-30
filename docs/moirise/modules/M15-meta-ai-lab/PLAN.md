# M15 — META SYSTEM + MORISE AI LAB — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
M15 n'est pas un wrapper de providers. Pour chaque requête, la chaîne doit être explicite : demande → identité/policy → contexte → intention → plan → ressources → exécution → validation → correction/clarification → commit → expérience → évaluation. Une augmentation du nombre de lignes de code n'est jamais une preuve d'intelligence.

## 1. Authority
M15 possède l'orchestration AI, le Context Engine, Intent/Requirement Interpreter, Reasoning, Planner, Capability/Tool Registry, Provider Router, Memory/Experience, validation, self-correction, Worker Scheduler et AI Lab.
M15 ne peut pas devenir owner de l'identité M01/M02, des messages privés M03, de la progression M05, du membership M11, des événements M12 ou de l'économie M14.

## 2. Intent
Acteur : Player ou module autorisé. Déclencheur : demande AI/capability.
Entrées : goal, entities, constraints, desired output, side effects, privacy class, autonomy ceiling.
Étapes : authentifier → parser → distinguer données utilisateur et instructions → identifier ambiguïtés bloquantes → construire IntentSpec versionné.
Une ambiguïté non bloquante est résolue par défaut explicite et traçable; une ambiguïté qui change fortement l'effet demande une clarification.

## 3. Context Engine
Avant exécution : identifier scope session/player/module/task; demander seulement les données autorisées; attacher provenance, privacyClass, expiry, owner et hash; séparer instructions de contexte et contenu non fiable; compiler ContextBundle.
Un message privé n'entre pas dans un contexte AI générique sans contrat explicite.

## 4. Planner / Task Graph
IntentSpec → DAG. Chaque TaskNode possède taskId, graphId, dependencies, capabilityVersion, input/output refs, resource profile, timeout, lease, idempotencyKey, validatorRef et attempt count.
Le planner ne peut pas créer une dépendance circulaire. Un graph impossible doit retourner une raison exploitable plutôt que boucler.

## 5. Autonomy
A0 = answer. A1 = propose. A2 = tool execution after required approval. A3 = bounded multi-step graph. A4 = bounded long-running workflow.
Une capability et sa policy peuvent réduire le niveau autorisé; jamais l'augmenter au-dessus de la policy du contexte.

## 6. Resource / Provider Router
Ordre : local/on-device → cache → Trusted Worker → Community Worker uniquement opt-in → provider gratuit/client-side vérifié → provider avec clé API → paid provider seulement activé → degraded/unavailable.
Le choix dépend de capabilities, privacy, coût, quota, latency, health et resource profile. Le module métier ne choisit pas directement un provider.

## 7. Workers
Trusted Worker = machine explicitement autorisée. Community Worker = participation explicite.
Défaut Community Worker : 1 logical CPU, 512 MiB RAM, GPU/storage désactivés, réseau borné.
Une machine est un pool de calcul distribué, pas de la RAM partagée.
Les workers n'ont ni secrets production, ni admin API, ni accès aux messages privés.

## 8. Validation
Validators selon la tâche : schema → policy → security → static/type → runtime → behavior → content → artifact → result.
INCONCLUSIVE ≠ VALID. Un provider fournit evidence/artifact; il ne devient pas la vérité globale.

## 9. Self-correction
Failure → classify → root-cause hypothesis → bounded correction candidate → sandbox → affected tests → regression → compare baseline.
Limites : depth, time, resources, mutation scope, attempts. Oscillation détectée = arrêt et FAILED/ASK.

## 10. Memory
Types : session, Player, project/creator, community, system experience, provider evidence, World Memory.
Chaque MemoryEntry porte owner/scope, sensitivity, consent, provenance, confidence, version, retention et deletion behavior.
Provider output reste une evidence. Une mémoire supprimée doit être invalidée à la source.

## 11. Creative AI
Text/image/video/audio/music/voice suivent : intent → brief → policy/originality → route → generation → provenance → validation → artifact storage/version.
Un résultat média n'est jamais publié directement parce qu'un provider a répondu.

## 12. Evolution / AI Lab
OBSERVE LIMIT → GAP → ROOT CAUSE → HYPOTHESIS → DESIGN → CODE/ALGORITHM CANDIDATE → STATIC → SANDBOX → TEST → BENCHMARK → POLICY/SECURITY → CANARY → PROMOTE/REJECT → MONITOR → ROLLBACK → EXPERIENCE.
AI Lab est isolé de la production. Aucun secret production, aucun superuser.

## 13. Controlled learning
Une action validée produit experience evidence. L'apprentissage ne modifie que les poids/configurations/règles explicitement autorisés. Il ne modifie jamais silencieusement permissions ou ownership.

## 14. Convergence / Living Objects / Missions From Reality
M15 peut détecter/proposer trajectoires compatibles, problèmes récurrents, transformations/forks/merges de Living Objects et World Memory candidates. Le module owner valide toujours la création durable.

## 15. Prompt/tool security
External/user content = UNTRUSTED_DATA. Tool schemas = allowlisted contracts. Prompt injection ne peut pas changer capability policy, actor permissions ou secret scope.
Le raisonnement interne privé n'est pas stocké comme donnée métier; seul un rationale de haut niveau utile peut être conservé.

## 16. Tests / DONE
Tester ambiguity, privacy scope, provider outage, worker loss, duplicate task, INCONCLUSIVE, oscillating correction, malicious generated code, prompt injection, sensitive-data attempt, self-evolution rollback, creative artifact provenance, mobile et desktop. DONE seulement quand une capability possède contract, implementation, policy, validator, resource profile, tests, observability, version et rollback.