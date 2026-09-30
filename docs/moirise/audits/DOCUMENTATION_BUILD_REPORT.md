# MOIRISE — RAPPORT FINAL DE RECONSTRUCTION DOCUMENTAIRE

## Architecture active
**15 modules canoniques + mécanismes transversaux.**

## Nouveau niveau de précision
La documentation possède désormais deux spécifications complémentaires :
- `FUNCTIONAL_BEHAVIOR_SPEC.md` : comportement fonctionnel détaillé, déclencheurs, préconditions, entrées, décisions, mutations, projections, événements, erreurs, récupération, sécurité et tests pour les capacités des 15 modules ;
- `TECHNICAL_IMPLEMENTATION_SPEC.md` : contrats techniques, enveloppes de requêtes/réponses, idempotence, concurrence, événements, workers, AI Gateway, providers, génération de jeux 2D/3D, sandbox, mémoire, auto-amélioration, sécurité, performance et validation navigateur.

Ces documents ne créent pas un nouveau module. Ils détaillent les contrats des modules existants.

## Contenu actif vérifié
- 15 Plans de module ;
- 15 Conceptions techniques ;
- Plan Maître global ;
- Plan Maître IA ;
- Conception Technique IA ;
- Inventaire historique ;
- Matrice de fusion ;
- Provider Registry ;
- Cross-module Mechanics ;
- Dependency Map ;
- Security/Data/Event/Error/Testing/Observability contracts ;
- Documentation Governance ;
- Definition of Done ;
- Feature Coverage ;
- Duplicate Audit ;
- Implementation Handoff ;
- Functional Behavior Specification ;
- Technical Implementation Specification.

## Historique
L'architecture a été reconstruite à partir des documents actuels, des plans historiques récupérables dans Git, des commits historiques et des décisions validées. Les concepts historiques ne sont pas jetés lorsqu'un fichier a été supprimé : ils sont classés PRESERVED, MERGED, AUXILIARY, HISTORICAL_ALIAS ou REJECTED avec propriétaire canonique.

## Règle de précision
Une fonctionnalité n'est plus considérée comme suffisamment documentée parce que son nom est présent. L'implémentation doit pouvoir retrouver : acteur, déclencheur, préconditions, entrées, décision, mutation, projection, événements, erreurs, récupération, permissions, confidentialité, observabilité, tests et critère DONE.

Exemple de niveau attendu : « France » seul n'est pas suffisant lorsque la fonctionnalité exige un chemin opérationnel complet. La documentation doit descendre jusqu'aux détails nécessaires à une implémentation sans deviner.

## UX / SYSTEM
La navigation visible reste volontairement limitée à environ 5–6 portes principales. Une capacité interne ne crée pas automatiquement un nouveau bouton. SYSTEM et World coordonnent les capacités contextuellement.

## Fonctionnalités couvertes
Player, SYSTEM, Social, messages privés, groupes/GUILDS utilisateurs, formation communautaire assistée par AI, World, Discovery, Play 2D/3D, Game Factory A→Z, Shared Game Engine, Social Gaming, Events, Adaptive World, Collection/Reward Economy, Living Objects, Evolution Engine, Fun & Surprise, MORISE DNA, Convergence, Emergent Missions/Missions From Reality, World Memory, Creative AI, translation, zero-API/on-device, distributed workers, provider adapters et MORISE-native AI self-development.

## Provider rule
Les fournisseurs externes sont des adapters/capacités auxiliaires. Ils ne constituent pas le cerveau de MORISE. Une capacité doit rester architecturée même lorsqu'un provider est indisponible. Les vrais secrets ne sont jamais stockés dans GitHub.

## Doublons
Les doublons architecturaux doivent être supprimés par propriétaire canonique : un mécanisme = un owner et un contrat. Les spécifications fonctionnelle et technique ci-dessus sont des compléments volontairement distincts : elles ne constituent pas deux implémentations concurrentes.

## Code
Cette reconstruction documentaire ne signifie pas que toutes les fonctionnalités documentées sont déjà implémentées. Le code existant reste l'état d'implémentation à auditer module par module.

## Gate d'implémentation
PLAN → TECHNICAL DESIGN → comportement détaillé → code/migrations → auth/security → tests → browser desktop/mobile → resilience → production evidence → DONE.

## Conclusion
La documentation active est une architecture 15-module cohérente, mais surtout suffisamment détaillée pour servir de cahier de construction à une IA d'implémentation : elle doit suivre les contrats au lieu d'inventer les détails manquants.