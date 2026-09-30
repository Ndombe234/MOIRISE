# MOIRISE — DOCUMENTATION GOVERNANCE

## Hiérarchie
1. Master Plan = vérité globale.
2. Module Plan = périmètre, comportement et exigences.
3. Module Technical Design = détail d'implémentation.
4. AI Master Plan = vision/capacités IA.
5. AI Technical Design = implémentation IA.
6. Cross-module contracts = interfaces et ownership partagés.

## Anti-doublons
Une règle métier existe une seule fois dans sa source canonique. Les autres documents la référencent. Une idée complémentaire met à jour le propriétaire canonique puis les dépendants.

## Conflits
Un document inférieur ne peut pas remplacer silencieusement une règle supérieure. Le conflit remonte, le propriétaire est déterminé, les contrats et dépendants sont mis à jour, puis les tests.

## Règle de profondeur
La longueur n'est pas l'objectif ; l'élimination des décisions cachées l'est. Une conception est insuffisante si un implémenteur doit deviner ownership, états, permissions, erreurs, retry, récupération, rétention, comportement UX ou oracle de test.
