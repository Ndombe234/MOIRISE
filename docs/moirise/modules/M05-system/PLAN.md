# M05 — SYSTEM / PROGRESSION / EVOLUTION — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Le SYSTEM est le langage d'interaction de MOIRISE. Une description du type « le système donne de l'XP » est insuffisante. Il faut préciser : quelle action produit le signal, qui valide le signal, quelle règle est chargée, quelle transaction écrit l'XP, quel événement prouve le commit, ce que le Player voit et comment un retry est traité.

## 1. Owner
M05 possède la progression visible et les mutations de progression : XP, niveaux, ranks, missions, achievements, présentation des titres et orchestration visuelle SYSTEM. M14 possède le ledger de récompenses/collection; M15 propose de l'intelligence mais ne possède aucune de ces mutations.

## 2. SYSTEM HUD
**Acteur :** Player.
**Déclencheur :** ouverture /system ou possibilité contextuelle autorisée.
**Préconditions :** session valide ou état visiteur explicitement prévu.
**Séquence :** charger progression confirmée → charger objectifs actifs → charger cards contextuelles autorisées → appliquer suppression si Player est en train d'écrire/lire/jouer/créer → composer HUD → afficher.
**Mutation :** aucune lors d'un simple affichage.
**Projection :** statut, progression, objectif, découverte ou prochaine action; pas de mur de messages SYSTEM.
**Échec :** M15 indisponible → statut de base reste disponible; source progression indisponible → ERROR/RETRY.

## 3. XP
**Déclencheur :** événement de résultat validé provenant de M06, M12 ou une autre source autorisée.
**Préconditions :** source event signé, owner connu, ruleVersion connue, événement non déjà consommé.
**Séquence exacte :** vérifier event → charger règle → calculer entitlement → créer XPTransaction avec sourceEventId+ruleVersion → commit atomique → recalculer projection → publier XP_GRANTED.
**Interdit :** le navigateur ou M15 ne peut pas appeler « grant XP » avec une valeur arbitraire.
**Retry :** même sourceEventId + règle = même transaction.

## 4. Level et Rank
Une fois XP commitée :
1. lire les seuils de la règle versionnée ;
2. calculer le niveau résultant ;
3. comparer au niveau précédent ;
4. écrire uniquement si différent ;
5. publier LEVEL_CHANGED/RANK_CHANGED ;
6. déclencher la présentation d'un milestone.
Une migration de règle ne modifie pas silencieusement l'histoire; elle produit une nouvelle version ou un correctif explicite.

## 5. Titles / Achievements
**Données nécessaires :** definitionId, ruleVersion, evidenceRefs, unlock condition.
**Séquence :** recevoir evidence → vérifier que la preuve appartient au Player → calculer éligibilité → créer unlock idempotent → transmettre ownership à M14 si nécessaire.
Une sortie IA qui « pense que le joueur mérite » n'est pas une preuve d'éligibilité.

## 6. Missions
Mission = définition + instance Player + progression.
**Création :** candidate validée → prerequisites → instance ACTIVE.
**Progression :** seuls les événements définis dans le contrat peuvent avancer une mission.
**Completion :** vérifier chaque condition à partir d'états autoritatifs → marquer COMPLETED → déclencher handoff reward.
**Échec :** FAILED seulement lorsqu'une règle d'échec réelle existe. Pas d'échec inventé.
**Reconnexion :** progression recalculable/idempotente à partir des events acceptés.

## 7. Trace
Trace n'est pas un journal de données privées. Elle conserve les jalons utiles au Player : création, découverte, progression, accomplissement, erreurs utiles et transformations Living Object approuvées.
Chaque entrée possède sourceRef, type, timestamp, privacyClass et deletion behavior.

## 8. Fun & Surprise
**Éligibilité :** signal réel + contexte approprié + cooldown + budget de fréquence.
**Suppression absolue :** typing, reading, gameplay actif, creation flow sauf intervention réellement critique.
**Séquence :** candidate → policy → presentation → reaction → cooldown.
Aucune surprise ne doit créer une fausse rareté, une fausse urgence ou un futur inexistant.

## 9. Hidden Possibilities / Unexplored Paths
Ce sont des possibilités générées à partir d'états existants, jamais des récompenses cachées attribuées automatiquement.
Une possibilité doit avoir sourceRef, reasonKey, expiration/cooldown et action possible.
Dismissal = suppression temporaire; absence d'un signal réel = aucune possibilité.

## 10. États
SYSTEM IDLE → CONTEXTUALIZING → READY.
Mission AVAILABLE → ACTIVE → COMPLETED ou FAILED.
Title LOCKED → UNLOCKED → EQUIPPED/UNSELECTED.
Toute mutation est idempotente.

## 11. Données
SystemContext, SystemCommand, XPTransaction, ProgressionProjection, LevelRule, RankRule, TitleDefinition, UnlockedTitle, Achievement, Mission, MissionProgress, TraceEntry, SurpriseCandidate, DNAProjection.

## 12. Sécurité
Server authority. Le client ne peut créer XPTransaction, MissionCompletion, UnlockTitle ou RankChange. M15 n'a pas accès direct aux tables M05.

## 13. Cross-module
M06 fournit les résultats de jeu validés. M12 fournit les résultats d'événements. M14 applique collection/reward grants. M15 fournit contexte/propositions. M05 reste la décision finale sur progression.

## 14. Tests et DONE
Tester XP doublée, résultat falsifié, replay event, level boundary, title déjà débloqué, mission avec progression hors ordre, surprise supprimée pendant typing, provider AI down, mobile, desktop, réseau perdu après commit.