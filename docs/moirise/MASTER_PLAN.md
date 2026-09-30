# MOIRISE — PLAN MAÎTRE GLOBAL

## 1. Mission

MOIRISE est un réseau social Otaku, ludique et créatif dans lequel le SYSTEM constitue la couche d'interaction transversale. Le produit n'est pas un réseau social auquel on aurait ajouté un RPG, ni une application de quiz. Social, découverte, jeux, création, communautés, progression et IA forment un seul environnement.

## 2. Frontières

L'interface permanente expose environ cinq à six portes principales : Home, Discover, Play, Communities, Create, Profile. Les capacités secondaires apparaissent selon le contexte par SYSTEM, panneaux, drawers, tabs ou actions contextualisées. Les messages privés sont une capacité sociale de première classe sans imposer nécessairement une septième porte permanente.

## 3. Modules canoniques

M01 Foundation / Identity Boundary : bootstrap, configuration, shell, auth boundary, sécurité primitive, événements et contrats partagés.
M02 Player Identity & Profile : identité persistante, profil public/privé, préférences et confidentialité.
M03 SYSTEM / Platform Layer : couche SYSTEM, contexte d'interface, commandes, suggestions et présentation de l'état.
M04 Social Feed / Posts : posts, feed, réactions, commentaires, partage et visibilité.
M05 Messaging / Communication : conversations, messages, présence, lecture, pièces jointes et traduction contextuelle.
M06 Communities / Groups / Clans : communautés, groupes, clans, memberships, rôles et activité.
M07 Discovery / Recommendation / Otaku Content : recherche, découverte et metadata Otaku.
M08 Games & Quiz Platform : catalogue, sessions, quiz, jeux 2D/3D, scores et sauvegardes.
M09 Game Creation : génération, build, test, sandbox et publication de jeux.
M10 Creative Studio : image, vidéo, audio, musique, texte et artefacts composés.
M11 Progression / Rewards / Titles / Collection : XP, niveaux, titres, achievements, collections, roulette et récompenses.
M12 Events / Activities : défis, événements, tournois, quêtes et continuations réelles.
M13 Moderation / Trust & Safety : reports, blocks, mutes, abuse prevention, décisions et appels.
M14 Notifications / Engagement Context : notifications, priorités, déduplication, préférences et rappel contextuel.
M15 Localization / Internationalization : locales, traductions, formats, cache et timezone.
M16 Analytics / Observability : événements produit, logs, traces, métriques, coûts et diagnostics.
M17 Monetization / Partnerships : surfaces optionnelles, attribution, ambassadeurs et garde-fous.
M18 Distributed Worker Platform : registry, scheduler, Trusted Workers, Community Workers, sandbox et recovery.
M19 AI Platform : contexte, mémoire, intention, planification, capacités, providers, orchestration, validation et évolution contrôlée.
M20 Administration / Operations : administration, feature flags, configuration, maintenance, audit et opérations internes.

## 4. Dépendances

M01 est la base.
M02 dépend de M01.
M03 dépend de M01/M02.
M04/M05 dépendent de M01/M02/M03.
M06 dépend de M02/M04/M05.
M07 dépend de M02/M04/M06.
M08 dépend de M01/M02/M03.
M11 dépend de M02/M03/M08 et fournit des hooks à M12.
M12 dépend de M06/M11.
M14 dépend de M03/M12/M16.
M13 protège tous les modules.
M15 est un service transversal utilisé par tous.
M18 dépend de M01/M13/M16 et sert M09/M10/M19.
M19 utilise les contrats transversaux et M18.
M09 dépend de M08/M18/M19.
M10 dépend de M18/M19.
M16 sert de couche d'observation à tous.
M20 dépend de M13/M16/M18/M19.
M17 est optionnel et dépend de M13/M16.

## 5. Invariants

Une permission critique est vérifiée côté serveur.
Un client ne décide jamais du rôle, de l'identité canonique, d'une récompense, d'une probabilité critique ou de la sécurité d'un worker.
Une opération réessayable a une clé d'idempotence.
Un résultat asynchrone peut être repris.
Un provider externe est un adaptateur, jamais la définition du système.
Un worker n'est jamais une autorité métier.
Une sortie IA est une proposition ou un résultat validé, jamais une permission implicite.
Les données privées ne deviennent pas automatiquement mémoire d'apprentissage.
Aucun événement de retour n'est inventé.

## 6. Parcours global

Arrivée → orientation → première valeur → interaction réelle → découverte contextualisée → participation sociale ou ludique → création/collection → continuité → retour réel → maîtrise.

La première période de session n'est pas un script chronométré rigide. Le comportement est piloté par l'état réel du joueur, sa permission et le contexte courant.

## 7. Ordre de construction

M01 → M02 → M03 → M13 → M15 → M04 → M05 → M06 → M08 → M11 → M12 → M14 → M07 → M18 → M19 → M09 → M10 → M16 → M20 → M17.

Les interfaces peuvent être stubées par contrats typés, mais un module ne peut être déclaré terminé uniquement parce que son écran existe.

## 8. Compatibilité avec le code existant

Le dépôt actuel contient notamment des surfaces Home, Player, Social, System et Play ainsi que des migrations Supabase. Ces éléments servent d'évidence pour la cartographie et la migration ; ils ne créent pas de nouveaux propriétaires métier.

## 9. Critère de complétude globale

Le produit est considéré documenté lorsqu'aucune fonctionnalité majeure n'a un propriétaire ambigu, aucune dépendance critique n'est implicite, aucune règle de sécurité critique n'est uniquement visuelle, et chaque fonctionnalité critique possède un contrat, un flux nominal, des erreurs, une stratégie de récupération et des tests d'acceptation.
