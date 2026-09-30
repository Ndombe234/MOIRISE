# M06 — PLAY — PLAN D'IMPLÉMENTATION REPRIS À ZÉRO

## 0. Règle de granularité
La documentation doit descendre comme « France → Paris → rue → bâtiment → appartement → porte ». Dire seulement « le module gère les groupes » est insuffisant. Chaque capability ci-dessous fixe acteur, déclencheur, préconditions, entrées, ordre d'exécution, mutation, projection, événements, erreurs, récupération, sécurité et tests.

## 1. Mission et ownership
game discovery entry, sessions, runtime attempts, saves and results
**Owner unique : M06.** Les autres modules consomment le résultat mais ne recopient pas la règle métier.

## 2. Capacités opérationnelles
### M06.1 Selection
**Acteur :** open PLAY
**Déclencheur :** ask M07 for candidates → device/runtime filter → render preview
**Préconditions :** render never launches game
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. Selection projection.
5. Effectuer la mutation autoritative : **M07 down: baseline fallback**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M06.2 Launch
**Acteur :** tap Start
**Déclencheur :** verify published version → create server session → allocate runtime
**Préconditions :** session is server-owned
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. PlaySession.
5. Effectuer la mutation autoritative : **retry returns same session**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M06.3 Runtime
**Acteur :** play inputs
**Déclencheur :** sandboxed runtime → bounded snapshots → no reward client
**Préconditions :** resource limits
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. RuntimeSnapshot.
5. Effectuer la mutation autoritative : **crash resumes last valid save**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M06.4 Result
**Acteur :** finish/quit/time out
**Déclencheur :** validate session,evidence,score,rulesVersion → idempotent authoritative result
**Préconditions :** server authoritative
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. AuthoritativeResult.
5. Effectuer la mutation autoritative : **INCONCLUSIVE = no reward**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M06.5 Resume
**Acteur :** tap Resume
**Déclencheur :** checksum/schema/version → migrate only known versions → continue
**Préconditions :** no arbitrary state
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. SaveVersion.
5. Effectuer la mutation autoritative : **unknown schema safe restart**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M06.6 Share result
**Acteur :** tap Share
**Déclencheur :** validated result → privacy projection → M03 share token
**Préconditions :** private by default
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. MomentRef.
5. Effectuer la mutation autoritative : **revoked privacy blocks share**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

## 3. Données owned
Chaque entité possède id stable, owner/actor relation, status, version, createdAt, updatedAt, privacyClass, retentionPolicy, auditRef si nécessaire et contraintes d'unicité. Une projection ne devient jamais la source d'autorité.

## 4. États
Les capacités suivent une machine d'états explicite : REQUESTED/AVAILABLE → VALIDATING → ACTIVE/SUCCESS ou REJECTED/FAILED, avec des transitions propres à la capacité. Toute transition = trigger + guards + mutation + event + projection. Une guard échouée n'écrit rien.

## 5. Contrats inter-modules
Échanges uniquement par use-case, event ou projection versionnée. Aucun module ne modifie directement les tables privées d'un autre owner. Les noms historiques restent des alias/mécanismes, jamais des owners supplémentaires.

## 6. UX / SYSTEM
États obligatoires : LOADING, READY/SUCCESS, EMPTY si réellement vide, ERROR, UNAVAILABLE, DEGRADED. Les fonctionnalités internes ne créent pas de nouveaux boutons principaux automatiquement. SYSTEM peut révéler une capability contextuellement.

## 7. IA
Les capacités AI utilisent M15 via Capability ID. La sortie du modèle est une proposition/evidence tant que le module owner ne l'a pas validée. M15 ne peut pas modifier directement identité, membership, progression ou économie.

## 8. Sécurité
Autorité serveur; validation; auth/RLS/policies; rate limits; secrets server-only; provenance; sandbox pour code/artifacts; minimisation des données privées; logs sans contenu privé brut.

## 9. Résilience et performance
Retries bornés; fallback déterministe lorsque possible; jobs lourds asynchrones; pagination/cursors; lazy loading des médias/3D; cache jetable et invalidable; aucune dépendance AI optionnelle ne doit provoquer un écran blanc.

## 10. DONE
Code/migrations + owner serveur + permissions + persistence + events + recovery + tests + desktop/mobile + observability + audit anti-doublon.
