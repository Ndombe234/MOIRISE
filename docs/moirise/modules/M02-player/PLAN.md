# M02 — PLAYER — PLAN D'IMPLÉMENTATION REPRIS À ZÉRO

## 0. Règle de granularité
La documentation doit descendre comme « France → Paris → rue → bâtiment → appartement → porte ». Dire seulement « le module gère les groupes » est insuffisant. Chaque capability ci-dessous fixe acteur, déclencheur, préconditions, entrées, ordre d'exécution, mutation, projection, événements, erreurs, récupération, sécurité et tests.

## 1. Mission et ownership
identity, profile, preferences, privacy, history, memory and DNA evidence
**Owner unique : M02.** Les autres modules consomment le résultat mais ne recopient pas la règle métier.

## 2. Capacités opérationnelles
### M02.1 Bootstrap
**Acteur :** first authenticated entry
**Déclencheur :** lookup by auth user → create default atomically if absent → return existing on retry
**Préconditions :** auth user authoritative
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. Player.
5. Effectuer la mutation autoritative : **race: unique constraint + existing record**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.2 Profile
**Acteur :** open/edit profile
**Déclencheur :** validate fields → privacy projection → versioned update → invalidate public cache
**Préconditions :** privacy enforced server
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. public/private projection.
5. Effectuer la mutation autoritative : **invalid field: no partial save**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.3 Handle
**Acteur :** confirm username
**Déclencheur :** normalize Unicode → uniqueness check → atomic reserve/change
**Préconditions :** no owner leak
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. handle record.
5. Effectuer la mutation autoritative : **conflict: old handle; same command: same result**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.4 Avatar
**Acteur :** upload or generate avatar
**Déclencheur :** quarantine/validate/approve → replace only after success
**Préconditions :** safe storage, policy validation
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. AvatarRef.
5. Effectuer la mutation autoritative : **processing failure preserves old avatar**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.5 Preferences
**Acteur :** change setting
**Déclencheur :** validate key/value → versioned write → emit preference event
**Préconditions :** settings not authority
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. Preferences.
5. Effectuer la mutation autoritative : **unknown key reject; stale version conflict**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.6 Memory/DNA
**Acteur :** validated action or explicit memory
**Déclencheur :** provenance → privacy class → bounded inference → invalidation path
**Préconditions :** no sensitive inference/global private chat mining
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. Memory/DNA evidence.
5. Effectuer la mutation autoritative : **low confidence: no promotion**.
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
