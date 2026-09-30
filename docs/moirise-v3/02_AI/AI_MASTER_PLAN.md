# MOIRISE AI — PLAN MAÎTRE V3

## 1. Rôle
L'IA de MOIRISE est une plateforme d'orchestration de capacités. Elle comprend le contexte autorisé, choisit une stratégie, planifie des tâches, utilise des outils/capacités déclarés, valide les résultats et présente une réponse ou un artefact au produit. Elle ne reçoit pas une autorité globale par défaut.

## 2. Sous-systèmes
1. Context Engine — construit le contexte minimal utile à partir de sources autorisées.
2. Memory System — mémoire de session, mémoire utilisateur consentie, mémoire projet et mémoire opérationnelle avec politiques de rétention.
3. Planner — décompose une intention en étapes vérifiables.
4. Capability Registry — décrit les capacités disponibles, leurs contraintes, coûts, entrées/sorties et niveaux de confiance.
5. Tool Registry — décrit les outils d'exécution.
6. Provider Router — sélectionne un fournisseur selon capacité, coût, latence, disponibilité et politique.
7. Orchestrator — coordonne plan, outils, tâches et validation.
8. Task Engine — file, priorité, timeout, retry, idempotence et reprise.
9. Worker Registry — workers internes et communautaires, avec identité, capacités et budget de ressources.
10. Scheduler — placement et réservation de tâches.
11. Sandbox — isolation des exécutions non fiables.
12. Validation Engine — schémas, invariants, tests et vérification d'artefacts.
13. Self-Correction — corrige un résultat échoué dans les limites définies, sans boucle infinie.
14. Artifact/Provenance — versionne les artefacts, sources, étapes et résultats.
15. User Journey AI — onboarding, découverte, recommandations, objectifs différés et politique d'interaction.
16. Safety/Policy — autorisations, limites, données sensibles et actions à risque.
17. Evaluation — jeux de tests, qualité, régression, coûts et fiabilité.
18. Observability — traces de décision, métriques, erreurs et audits minimisés.

## 3. Comportement utilisateur
L'IA ne doit pas être un personnage qui parle sans raison. Elle doit agir lorsque le contexte justifie une intervention. Pour une première session, elle peut guider l'utilisateur pendant les deux premières minutes par micro-actions adaptatives : activité pertinente, révélation progressive d'une fonctionnalité réellement disponible, puis proposition d'une prochaine action. Si une continuation existe réellement demain, elle peut planifier un événement ou un objectif différé. Aucun faux suspense, faux compteur, fausse rareté ou fausse notification.

## 4. Création
L'IA peut assister la conception de code, jeux 2D/3D, images, audio, vidéo et contenus lorsque les capacités correspondantes existent. Chaque génération suit : intention -> plan -> génération -> validation -> artefact versionné -> prévisualisation -> publication explicite ou workflow approuvé.

## 5. Intelligence distribuée
Les Trusted Workers sont administrés par MOIRISE. Les Community Workers sont opt-in, limités, révocables et isolés. Le budget CPU/RAM n'est qu'une limite de planification ; il ne transforme jamais la RAM d'un utilisateur en mémoire globale partagée. Les tâches doivent être découplables, sérialisables et dépourvues de secrets ou données privées non nécessaires.

## 6. Apprentissage/adaptation
L'IA peut adapter les recommandations et le parcours à partir de signaux autorisés. Elle ne modifie pas silencieusement ses règles de sécurité. Les changements de comportement du moteur doivent être versionnés, évalués et réversibles.

## 7. Définition de terminé
Une capacité IA est terminée quand son contrat d'entrée/sortie, ses permissions, son contexte, sa stratégie de sélection, ses limites de coût/temps, ses erreurs, ses retries, sa validation, sa provenance, son observabilité et ses tests sont définis.
