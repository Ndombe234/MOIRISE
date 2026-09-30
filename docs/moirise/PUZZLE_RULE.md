# MOIRISE — PUZZLE RULE

Le but de cette documentation est qu'un agent d'implémentation puisse traiter le système comme un puzzle dont toutes les pièces ont une forme et une destination explicites.

Pour chaque capability, l'agent doit pouvoir répondre aux questions suivantes avant de coder :

1. Qui en est propriétaire ?
2. Quelle commande déclenche le comportement ?
3. Quel contexte est nécessaire ?
4. Quelles données sont lues ?
5. Quelles données ne doivent jamais être lues ?
6. Quelle permission autorise l'opération ?
7. Quel est l'état initial ?
8. Quelles transitions sont autorisées ?
9. Quelle mutation est exécutée ?
10. Quelle transaction ou clé d'idempotence est utilisée ?
11. Quel événement est émis ?
12. Quel résultat est retourné ?
13. Quelles erreurs sont possibles ?
14. Que se passe-t-il si une dépendance est indisponible ?
15. Que voit le joueur ?
16. Que voit le modérateur/admin si applicable ?
17. Comment l'opération est observée ?
18. Quels tests démontrent le comportement ?
19. Quelle donnée est supprimable ?
20. Quelle donnée possède une rétention différente ?

Une phrase vague du type « l'IA crée un jeu » est incomplète. La version correcte doit décrire Intent → GameSpecification → task graph → resource routing → code/assets/audio → sandbox → build → simulation → validation → preview → version → publication → runtime → résultats → progression → partage.

Une phrase vague du type « le système crée du suspense » est incomplète. Le comportement doit être attaché à une vraie condition persistée : événement, progression, tâche, création inachevée, défi ou continuation future réelle. Les faux compteurs et la fausse rareté sont interdits.

Une phrase vague du type « les ordinateurs des utilisateurs aident l'IA » est incomplète. Les workers sont des nœuds de calcul explicitement autorisés, avec identité, trust class, capability manifest, quotas, heartbeat, lease, sandbox, révocation et validation.
