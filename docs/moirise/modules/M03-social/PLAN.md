# M03 — SOCIAL + PRIVATE MESSAGING — PLAN D'IMPLÉMENTATION REPRIS À ZÉRO

## 0. Règle de granularité
La documentation doit descendre comme « France → Paris → rue → bâtiment → appartement → porte ». Dire seulement « le module gère les groupes » est insuffisant. Chaque capability ci-dessous fixe acteur, déclencheur, préconditions, entrées, ordre d'exécution, mutation, projection, événements, erreurs, récupération, sécurité et tests.

## 1. Mission et ownership
feed, posts, comments, relations, private chat, attachments, translation
**Owner unique : M03.** Les autres modules consomment le résultat mais ne recopient pas la règle métier.

## 2. Capacités opérationnelles
### M03.1 Post
**Acteur :** publish
**Déclencheur :** validate content/media → visibility → moderation hook → persist → event
**Préconditions :** private visibility enforced
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. Post.
5. Effectuer la mutation autoritative : **failure keeps draft, no phantom post**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.2 Comment/reaction
**Acteur :** interact with post
**Déclencheur :** target access → state check → idempotent mutation → projection
**Préconditions :** target policy enforced
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. Comment/Reaction.
5. Effectuer la mutation autoritative : **deleted target: safe unavailable**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.3 Relation
**Acteur :** follow/unfollow
**Déclencheur :** block/privacy/self-follow checks → unique relation
**Préconditions :** block overrides recommendations
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. Follow.
5. Effectuer la mutation autoritative : **conflict returns prior state**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.4 Conversation
**Acteur :** open/create private chat
**Déclencheur :** membership policy → create/resolve → bounded history
**Préconditions :** member-scoped
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. Conversation+Participant.
5. Effectuer la mutation autoritative : **invalid participant: no partial membership**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.5 Message
**Acteur :** send/edit/delete
**Déclencheur :** membership → payload/attachment checks → idempotency → persist → delivery
**Préconditions :** private content excluded from broad logs
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. Message.
5. Effectuer la mutation autoritative : **retry same result; dead attachment reject**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.6 Translation
**Acteur :** translate visible message
**Déclencheur :** noTranslate mask → local/cache → provider fallback → translated view only
**Préconditions :** source remains canonical
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. TranslationView/Cache.
5. Effectuer la mutation autoritative : **provider down shows source**.
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
