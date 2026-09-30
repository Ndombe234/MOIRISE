# MOIRISE — PLAN MAÎTRE V3

## 1. Mission
MOIRISE est un réseau social otaku dont l'expérience entière est conçue comme un SYSTEM vivant : social, découverte, création, jeux 2D/3D, progression et intelligence adaptative sont des parties d'un même produit. L'IA n'est pas une page séparée : elle orchestre des capacités autorisées au service des fonctionnalités du produit.

## 2. Principes non négociables
- Une fonctionnalité possède un propriétaire canonique.
- Le backend reste l'autorité pour identité, permissions, progression, récompenses et opérations sensibles.
- Le client peut être riche mais ne doit pas devenir l'autorité de sécurité.
- Toute action asynchrone importante possède une identité de tâche, une politique de retry et une stratégie de récupération.
- Toute capacité IA est déclarée, contrôlée, observable et testable.
- Les ressources des machines utilisateur ne sont jamais utilisées par défaut : participation volontaire, opt-in explicite, quotas, sandbox, révocation et absence d'accès aux données privées.
- L'engagement repose sur la valeur, la découverte et la continuité réelle, jamais sur de faux événements ou une tromperie comportementale.

## 3. Modules canoniques
M01 Foundation & Platform — runtime, configuration, observabilité et conventions.
M02 Identity & Player — compte, profil, Player, préférences, réputation de base.
M03 SYSTEM — HUD, états, missions, titres, progression visible et commandes SYSTEM.
M04 Social — feed, posts, réactions, commentaires, profils sociaux.
M05 Communication — messages privés, groupes, présence et traduction conversationnelle.
M06 Discovery & Content — découverte anime/manga, recherche, recommandations et catalogues.
M07 Quiz & Knowledge — quiz, questions, scores, difficulté adaptative et classements associés.
M08 Games — runtime de jeux, jeux 2D/3D, sessions, sauvegardes et partage.
M09 Game Factory — génération et modification de jeux par l'IA, validation et publication.
M10 Creative Studio — création d'images, audio, vidéo, textes et expériences multimédia via capacités disponibles.
M11 Progression & Rewards — XP, niveaux, rangs, titres, récompenses, gacha/roulette et règles anti-abus.
M12 Communities — communautés, groupes thématiques, rôles, modération locale et événements communautaires.
M13 Events — événements système, défis temporaires, calendriers et récompenses liées.
M14 Notifications & Re-engagement — notifications, objectifs différés et retour utile sans spam.
M15 Personalization & User Journey — onboarding, contexte, parcours, recommandations et comportement UX.
M16 Internationalization — langues, localisation, traduction, formats régionaux et fallback.
M17 Safety & Moderation — signalement, modération, sanctions, sécurité des contenus et appels.
M18 Analytics & Observability — métriques produit, logs, traces, qualité, coûts et audits.
M19 AI Platform — orchestrateur IA, mémoire, planification, capacités, workers, sandbox et validation.
M20 Administration & Operations — administration, configuration, feature flags, opérations et gouvernance.

## 4. Dépendances principales
M01 est la fondation. M02 dépend de M01. M03 dépend de M01/M02. M04 et M05 dépendent de M01/M02. M06 dépend de M01 et alimente M15. M07 dépend de M02/M06. M08 dépend de M01/M02/M03. M09 dépend de M08 et M19. M10 dépend de M19. M11 dépend de M02/M03. M12 dépend de M02/M04. M13 dépend de M03/M11/M12. M14 dépend de M15/M18. M15 dépend de M02/M03/M04/M06/M08 et consomme des signaux autorisés. M16 est transversal mais possède son propriétaire pour les règles de localisation. M17 s'applique à M04/M05/M06/M07/M08/M10/M12/M13. M18 observe tous les modules sans devenir leur source de vérité métier. M19 fournit les capacités IA aux modules sans leur transférer son autorité. M20 administre les paramètres sans contourner les frontières métier.

## 5. Parcours utilisateur canonique
Première visite -> reconnaissance du contexte minimal -> entrée simple -> première valeur en moins de friction possible -> découverte progressive -> première action significative -> personnalisation par signaux réels -> progression -> connexion sociale/créative -> objectif suivant -> retour volontaire.

### Première session
La fenêtre initiale n'est pas un script fixe. Le User Journey Manager observe les actions réelles et peut, dans les deux premières minutes, présenter progressivement une activité pertinente, révéler une possibilité réellement disponible et proposer une continuation. Le système ne fabrique jamais de fausse rareté, de fausse notification ou de récompense inexistante.

### Retour futur
Une action différée peut être créée si elle correspond à une fonctionnalité réelle : événement, suite de création, défi, cooldown ou nouvelle étape. Le message de retour indique une possibilité réelle, jamais une promesse inventée.

## 6. Jeux et création
Les jeux 2D et 3D sont des citoyens de première classe. L'IA peut planifier, générer ou modifier des jeux lorsque les capacités disponibles le permettent. Le runtime reste responsable de l'exécution sécurisée. La génération ne peut pas publier directement un artefact non validé.

## 7. Intelligence distribuée
M19 peut répartir certaines tâches sur des workers fiables opérés par MOIRISE et, séparément, sur des machines d'utilisateurs explicitement opt-in. Une machine participante reçoit un budget de ressources configurable ; une valeur de départ possible est 1 CPU logique et 512 Mo de RAM, mais le scheduler doit vérifier les ressources réelles, la politique de l'appareil et la révocation. Aucun worker communautaire n'obtient un accès implicite aux données utilisateur ou aux secrets du serveur.

## 8. Définition de terminé globale
Une fonctionnalité n'est terminée que lorsque son comportement est spécifié, son propriétaire est clair, ses contrats sont définis, ses données sont définies, ses permissions sont définies, ses erreurs et récupérations sont définies, ses tests sont prévus, son observabilité est prévue et son intégration avec les dépendances a été vérifiée.

## 9. Documentation liée
Voir `01_MODULES/*`, `02_AI/*` et `03_TRANSVERSAL/*`. Les détails techniques ne sont volontairement pas dupliqués ici.
