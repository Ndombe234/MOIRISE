# M06 — PLAY — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
PLAY n'est pas « une page qui lance un jeu ». La chaîne exacte est : expérience sélectionnée → version publiée → compatibilité → session serveur → runtime → tentative → validation → résultat autoritatif → progression/récompense éventuelle → partage.

## 1. Owner
M06 possède l'expérience de jeu côté produit, les PlaySession, la coordination des résultats et la reprise. M07 choisit les candidats. M09 fournit le runtime. M05/M14 décident respectivement progression et économie.

## 2. Sélection
**Acteur :** Player.
**Déclencheur :** ouverture de PLAY.
**Préconditions :** catalogue lisible.
**Séquence :** demander candidates à M07 → filtrer visibilité, publication, device et runtime → afficher preview → n'appeler le runtime qu'après Start.
Aucun rendu de carte de jeu ne doit démarrer une session.
**Échec :** M07 absent → fallback catalogue déterministe; aucun jeu inventé pour remplir la page.

## 3. Launch
**Acteur :** Player.
**Déclencheur :** tap Start.
**Préconditions :** gameVersion immutable publiée, Player autorisé, runtime compatible.
**Séquence :**
1. vérifier activeVersion ;
2. vérifier policy ;
3. créer commandId ;
4. créer PlaySession côté serveur ;
5. allouer runtime ;
6. transmettre manifest minimal ;
7. marquer STARTING ;
8. seulement ensuite lancer ACTIVE.
**Mutation :** PlaySession.
**Retry :** même commandId retourne la même session ou son état.
**Échec :** allocation runtime échouée → session ABORTED/preview conservée.

## 4. Runtime attempt
Le client/runtime fournit des actions et des snapshots, jamais la décision de récompense.
**Sandbox :** filesystem limité, réseau limité, pas de secrets production, CPU/RAM/temps bornés.
Les snapshots sont versionnés et checksummés lorsqu'ils sont persistés.
Crash → dernier snapshot valide ou RESTART, jamais un score inventé.

## 5. Résultat
**Trigger :** finish, timeout ou quit.
**Validation exacte :**
- session appartient au Player ;
- session ACTIVE ;
- gameVersion/rulesVersion correspondent ;
- transitions autorisées ;
- score dans bounds ;
- completion rule satisfaite ;
- attempt non déjà consommée.
Puis créer AuthoritativeResult une seule fois.
Un résultat INCONCLUSIVE n'appelle pas M05/M14 comme s'il était valide.

## 6. Sauvegarde / reprise
Save = schemaVersion + payload bounded + checksum + updatedAt.
Au Resume : session ownership → checksum → schema compatibility → migration connue uniquement → reprise.
Schema inconnu = INCOMPATIBLE et proposition de restart, pas lecture arbitraire.

## 7. Partage
Après résultat validé : result → privacy projection → M03 ShareToken.
Tap Share n'entraîne jamais une publication publique automatique d'une session privée.

## 8. États
DISCOVERED → PREVIEWED → STARTING → ACTIVE → FINISHED/ABORTED.
Save : VALID → STALE/INCOMPATIBLE.
Result : PENDING → VALID / INCONCLUSIVE.

## 9. Données
ExperienceRef, PlaySession, RuntimeSnapshot, SaveRecord, AttemptEvidence, AuthoritativeResult, MomentRef.

## 10. Security
Toutes les décisions de score/récompense sont serveur-authoritative. Toute tentative d'envoyer un score hors bounds ou un sessionId d'un autre Player est rejetée.

## 11. Tests
Launch double tap; expired session; runtime crash; malicious result; score overflow; replay same result; save corruption; mobile; desktop; offline/degraded network; share privacy revoked.

## AI-INTÉGRATION M06 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M06 est l'autorité produit des PlaySession, du lancement/reprise et de l'admission du résultat autoritatif. M15 peut assister le jeu mais ne décide jamais du score ou de la récompense.

### B. AI cases
Aide contextuelle, adaptive content autorisé, génération de variantes de contenu déjà prévues par la GameSpecification, analyse de session et suggestions post-partie.

### C. Contexte
Player/session/gameVersion/rulesVersion/runtimeCapabilities et seulement les snapshots autorisés. Aucun accès aux secrets ou aux tables économiques.

### D. Résultat
Runtime evidence → M06 validator → VALID/INVALID/INCONCLUSIVE → AuthoritativeResult. Une sortie AI ne peut pas devenir un score valide sans passer cette chaîne.

### E. Fallback
Le jeu doit continuer sans IA lorsqu'un contenu adaptatif n'est pas critique. Sinon UNAVAILABLE explicite, jamais résultat inventé.

### F. DONE
Tests couvrent runtime AI down, résultat falsifié par AI/client, version mismatch, retry et reprise.