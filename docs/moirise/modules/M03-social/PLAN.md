# M03 — SOCIAL + PRIVATE MESSAGING — PLAN CANONIQUE

## Mission
Réseau social complet : feed, publications, commentaires, réactions, follows, partage, recherche sociale et messages privés.

## Fonctionnalités détaillées
1. Feed paginé et contextualisé.
2. Composer : création, édition, suppression selon ownership.
3. Commentaires et réactions validés.
4. Follow/unfollow et relations explicites.
5. Partage de contenu et de créations.
6. Recherche sociale et découverte de personnes.
7. Conversations privées individuelles.
8. Envoi, lecture, édition/suppression selon policy, présence si activée.
9. Pièces jointes avec accès signé.
10. Traduction contextuelle sans traduire noms/IDs protégés.
11. Assistance rédaction/résumé sur demande.
12. Social Agent : signaux sociaux non sensibles pour recommandations.
13. Anti-spam, rate limits, blocks et mutes.

## IA
M15 fournit TRANSLATION, TEXT_ASSISTANCE, RECOMMENDATION et MODERATION. Les messages privés restent cloisonnés : ils ne deviennent pas automatiquement mémoire globale, analytics ou signal public.

## Flux privé
OPEN CONVERSATION → MEMBERSHIP CHECK → LOAD WINDOW → SEND → SERVER VALIDATION → PERSIST → MESSAGE_SENT → READ_RECEIPT.

## Sécurité
RLS/membership côté serveur; aucun provider ne reçoit une conversation privée entière sans policy explicite; PostHog ne reçoit pas le texte privé brut.

## Dépendances
M01, M02, M05, M11, M12, M15.

## DONE
Feed, publication, commentaire, réaction, follow, partage, conversations, permissions, traduction fallback, mobile, offline/reconnect, aucun écran blanc.
