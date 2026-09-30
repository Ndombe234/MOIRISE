# MOIRISE Module 03 — SOCIAL

## 1. Purpose

Créer le réseau social MOIRISE : publications, feed, réactions, commentaires, abonnements et messagerie privée.

## 2. UI

Surface principale :
FEED
+ contexte
+ composer
+ navigation minimaliste.

Mobile : feed plein écran, actions tactiles.

## 3. User actions

- publier ;
- modifier/supprimer sa publication selon permission ;
- commenter ;
- réagir ;
- suivre/ne plus suivre ;
- partager ;
- rechercher ;
- envoyer un message privé ;
- ouvrir une conversation.

## 4. MORISE

MORISE peut :
- traduire ;
- résumer si demandé ;
- aider à reformuler ;
- proposer des contenus ;
- signaler un risque de modération.

Elle ne doit pas publier ou envoyer un message privé sans action autorisée de l'utilisateur.

## 5. Data

Tables conceptuelles :
profiles
posts
comments
reactions
follows
private_conversations
private_messages
notifications

Chaque table doit avoir RLS appropriée.

## 6. Events

POST_CREATED
POST_UPDATED
COMMENT_CREATED
REACTION_CREATED
FOLLOW_CREATED
MESSAGE_SENT
MESSAGE_READ
NOTIFICATION_CREATED

## 7. AI

Capabilities :
- TRANSLATION ;
- MODERATION ;
- SEARCH ;
- TEXT_ASSISTANCE ;
- RECOMMENDATION.

Traduction prioritairement browser/on-device ou cache local lorsque possible.

## 8. Providers

Provider-neutral. Les providers externes ne doivent jamais être une dépendance critique pour afficher le réseau social.

## 9. Secrets

Aucun secret de provider requis pour les fonctions sociales de base. Les capacités IA utilisent le Gateway.

## 10. Security

- RLS ;
- ownership ;
- conversation membership ;
- contrôle d'accès aux messages ;
- anti-abus ;
- rate limiting ;
- validation du contenu.

Les messages privés ne doivent jamais être envoyés à PostHog comme contenu brut.

## 11. Performance

- pagination ;
- infinite loading contrôlé ;
- images lazy ;
- cache des préférences ;
- pagination des messages ;
- pas de préchargement de toutes les conversations.

## 12. Failure states

Feed indisponible : état récupérable.
Traduction indisponible : texte original.
Moderation indisponible : appliquer la politique fail-safe adaptée.
Pas de données : état empty.

## 13. Tests

- feed ;
- publication ;
- commentaire ;
- réaction ;
- follow ;
- messagerie ;
- RLS ;
- accès conversation ;
- mobile ;
- fournisseur IA absent ;
- réseau offline.

## 14. Acceptance

Le réseau social fonctionne complètement sans IA. L'IA améliore l'expérience mais ne devient pas un point de panne.

## 15. Do not modify

Ne pas placer ici les communautés, événements, jeu, monde adaptatif ou AI Lab.

## 16. New-AI handoff

Toute donnée sociale envoyée à un provider doit respecter minimisation, consentement et filtrage de confidentialité.
