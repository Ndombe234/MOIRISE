# MOIRISE — PLAN MAÎTRE CANONIQUE

> Version documentaire canonique. Ce document remplace les anciennes numérotations concurrentes. Les anciennes appellations restent traçables dans `RECONCILIATION.md` et l'inventaire historique, mais ne créent pas de modules supplémentaires.

## 1. Mission

MOIRISE est un réseau social Otaku ludique, créatif et évolutif dans lequel le SYSTEM constitue la couche d'interaction transversale. Il ne s'agit ni d'un réseau social auquel on ajoute un RPG, ni d'une application de quiz, ni d'une collection de providers IA. Social, découverte, création, jeux, communautés, progression, événements et intelligence forment un même environnement.

L'architecture interne peut être très complexe, mais l'interface permanente doit rester simple : environ cinq à six portes principales. Le SYSTEM révèle les capacités secondaires selon le contexte, sans transformer chaque mécanisme interne en bouton.

## 2. Règles de fusion

1. Un ancien nom n'est pas automatiquement une nouvelle fonctionnalité.
2. Une fonctionnalité conservée doit avoir un propriétaire canonique unique.
3. Un mécanisme transversal est documenté une fois puis référencé.
4. Les anciennes spécifications supprimées restent des sources historiques, pas des instructions concurrentes.
5. Aucune fonctionnalité demandée explicitement ne doit disparaître sous prétexte qu'elle est fusionnée.
6. La fusion ne doit pas réduire le niveau de détail technique nécessaire à l'implémentation.
7. Une fonctionnalité n'est considérée comme documentée que si son comportement, ses états, ses données, ses permissions, ses dépendances, ses erreurs, ses événements et ses tests sont définis.

## 3. Les 15 modules canoniques

### M01 — FOUNDATION
Fondations applicatives : bootstrap, configuration, shell, routing, auth boundary, contrats, événements, erreurs, loading, stockage abstrait, feature flags, sécurité primitive et interfaces partagées.

### M02 — PLAYER
Identité et espace Player : profil, identité publique/privée, préférences, confidentialité, progression exposée, historique autorisé, paramètres et signaux explicitement consentis.

### M03 — SOCIAL
Réseau social : feed, posts, commentaires, réactions, partage, relations, présence sociale, messages privés, conversations et capacités sociales de première classe. Les groupes et communautés possèdent leur propre propriétaire dans M11, mais leurs interactions sociales utilisent M03.

### M04 — WORLD
Monde et contexte : représentation du monde, mémoire du monde, objets vivants, états, agents, interactions, signaux et contexte dans lequel les expériences peuvent apparaître.

### M05 — SYSTEM
Couche SYSTEM visible et orchestratrice : commandes, panneaux contextuels, états, suggestions, navigation contextuelle, présentation des capacités, expérience d'arrivée, continuité et coordination avec M15 AI. Le SYSTEM ne devient pas une seconde base métier.

### M06 — PLAY
Expériences jouables : catalogue, sessions, quiz, jeux 2D/3D consommables, sauvegardes, scores, progression de session et runtime-facing player experience. La fabrication technique est M08/M09.

### M07 — DISCOVERY
Recherche et découverte : contenus, personnes, jeux, groupes, événements, expériences, recommandations, fraîcheur, diversité, pertinence et détection d'opportunités.

### M08 — GAME FACTORY
Création de jeux : idéation, game design, spécification, règles, scènes, contenu, assets, code, 2D, 3D, build, simulation, validation, preview, versionnement et publication. L'IA orchestre mais le package final doit rester portable et validé.

### M09 — GAME ENGINE
Infrastructure d'exécution des jeux : moteurs/adapters 2D et 3D, runtime, scène, input, physique, sauvegarde, chargement, performance, compatibilité appareil, isolation et contrats de jeu. Game creation et runtime sont séparés.

### M10 — SOCIAL GAMING
Jeu social : parties entre utilisateurs, défis, coopérations, compétitions, invitations, résultats partagés, interactions sociales dans les jeux et expériences communautaires.

### M11 — COMMUNITIES
Groupes, guildes et communautés : création par l'utilisateur, propriété, rôles, invitations, demandes, modération, activités et découverte. Mécanisme IA : détection de tendances autorisées, vérification des communautés existantes, proposition/création selon policy, invitations appropriées et apprentissage à partir de l'adoption. L'IA ne crée pas silencieusement une communauté permanente sur une simple inférence.

### M12 — EVENTS
Événements, activités et continuités : défis, quêtes, événements, tournois, objectifs temporaires, échéances réelles, suites d'actions et raisons légitimes de revenir. Aucun faux compte à rebours, faux événement ou fausse rareté.

### M13 — ADAPTIVE WORLD
Adaptation du monde et expériences émergentes : personnalisation du contexte, convergence de signaux autorisés, événements émergents, missions émergentes, agents du monde et évolution contrôlée des expériences. Le monde ne doit pas devenir imprévisible au point de violer les permissions ou les contrats.

### M14 — COLLECTION
Progression et collection : XP, niveaux, rangs, titres, achievements, récompenses, collections, roulette configurable, objets gagnés et règles d'éligibilité. Les décisions critiques restent serveur-side et auditées.

### M15 — META / AI LAB
Intelligence et méta-système : contexte, intention, raisonnement, planification, mémoire, apprentissage, capabilities, tools, providers, resource routing, agents, création multimédia, création de jeux, auto-évaluation, génération de code, sandbox, benchmarks, évolution contrôlée, observabilité et expérimentation. M15 n'est pas autorisé à contourner les autorités des autres modules.

## 4. Capacités conservées dans cette structure

La fusion doit explicitement conserver :
- feed et publications ;
- commentaires et réactions ;
- messages privés ;
- groupes créés par les utilisateurs ;
- communautés/guildes créées ou proposées selon des règles par l'IA ;
- profils et relations ;
- recherche et découverte ;
- quiz ;
- jeux 2D ;
- jeux 3D ;
- création de jeux assistée/orchestrée par IA ;
- runtime séparé du Game Factory ;
- création d'images ;
- création vidéo ;
- création audio ;
- création musicale ;
- texte et narration ;
- traduction contextuelle ;
- monde adaptatif ;
- agents du monde ;
- missions et expériences émergentes ;
- événements ;
- progression ;
- titres ;
- achievements ;
- collection ;
- roulette ;
- recommandations ;
- notifications/contextualisation ;
- modération et sécurité ;
- workers locaux/trusted/community opt-in ;
- providers externes interchangeables ;
- exécution locale/on-device lorsque possible ;
- évolution contrôlée du code et des capacités IA ;
- analytics et observabilité.

## 5. Interface visible

Le produit ne doit pas exposer des centaines de capacités sous forme de boutons.

Portes principales recommandées :
1. Home/SYSTEM
2. Social
3. Play
4. World/Discover
5. Create
6. Player

Les messages privés, groupes, collections, événements, outils créatifs, missions et autres capacités sont accessibles contextuellement. Une décision de design peut fusionner Home/Discover/World dans une porte commune si cela améliore la cohérence, sans changer les propriétaires internes.

## 6. Parcours utilisateur

### Arrivée
Le SYSTEM doit donner immédiatement une compréhension minimale du lieu et une première valeur réelle. Il ne doit pas déverser toutes les fonctions à l'écran.

### Première période de session
Le système observe le contexte autorisé et choisit des actions de découverte proportionnées : première interaction, petite réussite, révélation progressive, opportunité sociale ou ludique pertinente, puis une continuation réelle. La période n'est pas un script artificiel de deux minutes et aucune fausse récompense ne doit être fabriquée.

### Retour
Le système peut créer une raison de revenir uniquement lorsqu'une continuation existe réellement : événement planifié, réponse attendue, défi, progression, création sauvegardée, activité communautaire, mission ou autre état réel. Il peut présenter cette continuation clairement sans manipuler l'utilisateur par de fausses urgences.

## 7. Architecture IA transversale

```text
Player / Module
  -> AI Request
  -> Context Assembly
  -> Policy / Permission
  -> Intent
  -> Plan / Task Graph
  -> Capability Registry
  -> Resource Router
  -> Provider / Local / Trusted Worker / Community Worker
  -> Validation
  -> Correct / Ask / Fail
  -> Commit if authorized
  -> Event
  -> Safe Memory / Experience
  -> SYSTEM presentation
```

M15 ne remplace jamais une autorité métier. Une sortie IA est une proposition ou un résultat validé ; elle n'est pas une permission implicite.

## 8. Ressources distribuées

Les machines ne constituent pas une RAM commune. Elles constituent un pool de calcul distribué.

- appareil local : ressources disponibles localement ;
- Trusted Worker : machine explicitement autorisée ;
- Community Worker : opt-in explicite, sandbox strict ;
- provider externe : exécution externe via adapter.

Le scheduler applique les contraintes CPU/RAM/GPU/storage/réseau/quota avant tout score de sélection. Le profil de départ d'un Community Worker reste volontairement faible, par exemple 1 logical CPU et 512 MiB RAM maximum, GPU et stockage désactivés par défaut, puis peut évoluer par policy et confiance.

## 9. Création 2D/3D

La création doit être décomposée :

idéation -> exigences -> game specification -> sélection d'engine -> task graph -> code/assets/audio -> build -> simulation -> tests -> preview -> validation -> version -> publication -> runtime.

L'IA peut produire ou coordonner les artefacts, mais aucune sortie générée n'est exécutée directement en production sans validation.

## 10. Évolution de MOIRISE AI

```text
OBSERVE
-> GAP
-> HYPOTHESIS
-> CANDIDATE
-> STATIC CHECK
-> SANDBOX
-> TEST
-> BENCHMARK
-> SECURITY/POLICY
-> CANARY
-> PROMOTE or REJECT
-> MONITOR
-> ROLLBACK if needed
```

Ajouter du code n'augmente pas automatiquement l'intelligence. Une capacité doit apporter un mécanisme utile, être mesurable, testée et rester compatible avec les contrats existants.

## 11. Sécurité et autorité

- Les permissions critiques sont vérifiées côté serveur.
- Le client ne décide pas d'un rôle, d'une récompense critique ou de l'autorité d'un worker.
- Les messages privés ne deviennent pas automatiquement une mémoire globale.
- Les secrets providers ne sont jamais exposés au client.
- Un worker n'est jamais une autorité métier.
- Une opération réessayable possède une stratégie d'idempotence.
- Toute évolution du code de production est précédée de sandbox/tests/validation.

## 12. Dépendances canoniques

M01 -> M02 -> M03/M04/M05.
M03/M05 -> M06/M07/M11.
M06/M07/M11 -> M10/M12.
M06/M07/M12 -> M13.
M06 -> M08/M09.
M08 <-> M09 via contrats de package/runtime.
M14 fournit les contrats de progression/collection utilisés par M06/M08/M10/M12/M13.
M15 utilise les contrats de tous les modules sans devenir leur propriétaire métier.
M15 peut utiliser des ressources distribuées mais ne contourne jamais M01/M03/M11/M14 pour les autorisations correspondantes.

## 13. Ordre de construction

M01 -> M02 -> M03 -> M04 -> M05 -> M06 -> M07 -> M08 -> M09 -> M10 -> M11 -> M12 -> M13 -> M14 -> M15.

Les contrats peuvent être définis avant l'implémentation d'un module. Un écran ou un build réussi ne suffit pas pour déclarer un module terminé.

## 14. Définition de terminé

Pour chaque fonctionnalité : objectif, acteurs, déclencheurs, préconditions, entrées, traitement détaillé, états, sorties, données, permissions, événements, dépendances, IA, erreurs, fallback, sécurité, performance, mobile, desktop, cas limites, tests et critères d'acceptation.

Pour chaque module : tous ses contrats et fonctionnalités critiques sont couverts et testables.

Pour l'ensemble du projet : aucun propriétaire métier ambigu, aucune dépendance critique implicite, aucune règle de sécurité critique uniquement visuelle, aucun doublon documentaire contradictoire.
