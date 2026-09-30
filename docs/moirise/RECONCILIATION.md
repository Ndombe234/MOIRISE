# MOIRISE — RÉCONCILIATION CANONIQUE DE LA DOCUMENTATION

## 1. But

MOIRISE possède plusieurs générations de documentation. Certaines anciennes versions utilisaient 20 propriétaires techniques alors que la conception validée utilise 15 modules canoniques. Les anciens documents et commits restent utiles pour l'inventaire historique, mais ils ne doivent plus créer plusieurs architectures concurrentes.

La règle active est : **15 modules canoniques + mécanismes transversaux internes**.

## 2. Correspondance des anciennes responsabilités vers les 15 modules

- Ancienne Foundation / Identity Boundary → M01 Foundation.
- Ancien Player → M02 Player.
- Ancien System / Platform Layer → M05 System.
- Ancien Social / Feed → M03 Social.
- Ancien Messaging / Communication → M03 Social, sous-domaine Messaging.
- Ancien World → M04 World.
- Ancien Play / Games & Quiz → M06 Play.
- Ancien Discovery / Recommendation → M07 Discovery.
- Ancien Game Factory → M08 Game Factory.
- Ancien Game Engine → M09 Game Engine.
- Ancien Social Gaming → M10 Social Gaming.
- Ancien Communities / Groups / Clans → M11 Communities.
- Ancien Events / Activities → M12 Events.
- Ancien Adaptive World → M13 Adaptive World.
- Ancien Progression / Rewards / Titles / Collection → M14 Collection.
- Ancien Meta / AI Lab → M15 Meta / AI Lab.
- Ancien Notifications → mécanisme transversal appartenant au SYSTEM et aux contrats d'événements ; la livraison est traitée par les services de contexte du SYSTEM.
- Ancien Localization / Internationalization → mécanisme transversal utilisé par tous les modules.
- Ancien Analytics / Observability → mécanisme transversal utilisé par tous les modules.
- Ancien Monetization / Partnerships → sous-système optionnel à rattacher aux contrats produit concernés, sans devenir un module canonique supplémentaire.
- Ancien Distributed Worker Platform → sous-système d'exécution de M15, avec contrats Foundation et règles de sécurité transversales.
- Ancien AI Platform → M15 Meta / AI Lab.
- Ancien Administration / Operations → gouvernance et opérations transversales, sans créer un seizième module produit.

## 3. Fonctionnalités préservées

La fusion conserve explicitement : Player, SYSTEM, feed, posts, commentaires, réactions, partage, messages privés, groupes utilisateur, communautés, formation de communautés proposée/encadrée par l'IA, découverte, recommandations, quiz, jeux 2D, jeux 3D, création de jeux par IA, runtime séparé de la fabrication, image, vidéo, audio, musique, texte, narration, traduction, progression, titres, achievements, collection, roulette, événements, missions, monde adaptatif, agents, modération, observabilité, workers distribués, exécution locale/on-device et évolution contrôlée de l'IA.

## 4. Règle de dédoublonnage

Un nom historique est classé dans l'une de trois catégories :

A. **Fonctionnalité canonique** : comportement distinct conservé.
B. **Mécanisme interne** : capacité nécessaire mais sans interface/module propriétaire séparé.
C. **Alias historique** : ancienne formulation d'un mécanisme déjà couvert.

La suppression d'un doublon documentaire ne doit jamais supprimer la fonctionnalité qu'il décrivait.

## 5. Source de vérité

`MASTER_PLAN.md` = architecture globale active.
`ai/AI_MASTER_PLAN.md` = architecture IA active.
`modules/Mxx-*/PLAN.md` = plan fonctionnel du module.
`modules/Mxx-*/TECHNICAL_DESIGN.md` = conception technique détaillée du module.
`transversal/` = règles réellement partagées entre plusieurs propriétaires.
`HISTORICAL_INVENTORY.md` = inventaire et traçabilité historique ; il ne constitue pas une architecture concurrente.

## 6. Règle de décision

En cas de conflit :
1. vérifier l'exigence utilisateur validée ;
2. appliquer le propriétaire du `MASTER_PLAN` ;
3. conserver la contrainte métier compatible ;
4. déplacer la règle réellement transversale vers `transversal/` ;
5. éliminer la duplication ;
6. ajouter ou mettre à jour les tests de non-régression ;
7. documenter la décision lorsqu'elle modifie un comportement historique.

## 7. Important

La documentation décrit le puzzle à construire. Elle ne prétend pas qu'une fonctionnalité est déjà codée simplement parce qu'elle est documentée. La complétude d'une fonctionnalité exige son implémentation et ses preuves de validation.
