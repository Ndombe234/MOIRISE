# M05 — SYSTEM / PROGRESSION / EVOLUTION — PLAN D'IMPLÉMENTATION REPRIS À ZÉRO

## 0. Règle de granularité
La documentation doit descendre comme « France → Paris → rue → bâtiment → appartement → porte ». Dire seulement « le module gère les groupes » est insuffisant. Chaque capability ci-dessous fixe acteur, déclencheur, préconditions, entrées, ordre d'exécution, mutation, projection, événements, erreurs, récupération, sécurité et tests.

## 1. Mission et ownership
SYSTEM HUD, progression, missions, titles, achievements, trace, surprise and evolution hooks
**Owner unique : M05.** Les autres modules consomment le résultat mais ne recopient pas la règle métier.

## 2. Capacités opérationnelles
### M05.1 HUD
**Acteur :** open SYSTEM or contextual display
**Déclencheur :** assemble status/objectives → suppress intrusive elements → render
**Préconditions :** no system spam
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. SystemContext.
5. Effectuer la mutation autoritative : **AI unavailable leaves core state usable**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M05.2 XP
**Acteur :** validated source result
**Déclencheur :** rule version → entitlement → idempotent ledger transaction → projection
**Préconditions :** client never grants
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. XPTransaction.
5. Effectuer la mutation autoritative : **invalid source: no grant**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M05.3 Level/rank
**Acteur :** XP committed
**Déclencheur :** threshold calculation with rule version → update progression → milestone event
**Préconditions :** versioned rules
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. ProgressionProjection.
5. Effectuer la mutation autoritative : **rule migration explicit**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M05.4 Title/achievement
**Acteur :** evidence event
**Déclencheur :** evaluate eligibility → unlock once → handoff collection ownership if needed
**Préconditions :** AI cannot direct-grant
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. UnlockRef.
5. Effectuer la mutation autoritative : **missing evidence: locked**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M05.5 Mission
**Acteur :** offer accepted
**Déclencheur :** create instance → progress from validated events → completion guard → reward handoff
**Préconditions :** expiry only when real
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. MissionProgress.
5. Effectuer la mutation autoritative : **retries don't duplicate progress**.
6. Construire la projection depuis la donnée commitée.
7. Émettre l'événement seulement après le commit.
**Échec :** undefined
**Sécurité :** undefined
**Idempotence :** une nouvelle requête identique avec le même commandId retourne le résultat déjà commité; un même commandId avec payload différent est rejeté.
**Concurrence :** utiliser contrainte unique ou expectedVersion; aucun état partiel n'est accepté.
**Réseau :** si la réponse est perdue après commit, le client récupère l'état via commandId au lieu de créer une seconde mutation.
**Suppression :** si la cible disparaît entre lecture et écriture, la transaction est annulée et l'UI affiche NOT_FOUND/UNAVAILABLE.
**Tests :** nominal, chaque précondition invalide, double clic, deux clients concurrents, session expirée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M05.6 Fun & Surprise
**Acteur :** real eligible signal
**Déclencheur :** context suppression → cooldown → candidate → presentation → response
**Préconditions :** no manipulative urgency
**Ordre exact :**
1. Authentifier/dériver l'acteur côté serveur.
2. Charger le minimum de contexte nécessaire et vérifier la visibilité.
3. Valider schéma, taille, format, état et policy.
4. SurpriseCandidate.
5. Effectuer la mutation autoritative : **no eligible signal = no surprise**.
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
