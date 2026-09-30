# MOIRISE Module 02 — PLAYER

## 1. Purpose

Reconstruire l'identité et l'espace personnel du joueur depuis zéro. Aucun ancien profil ou ancien état n'est considéré comme acquis.

## 2. Entry points

/system/player ou entrée PLAYER selon la navigation finale.

Sous-vues :
- profil ;
- édition ;
- avatar ;
- progression visible ;
- préférences ;
- historique autorisé ;
- créations ;
- jeux joués.

## 3. UI

Desktop : profil central + contexte latéral discret.
Mobile : profil vertical, actions accessibles au pouce.

Sections principales : identité, avatar, stats publiques, préférences explicites, activité, créations.

## 4. Actions

- créer profil ;
- modifier profil ;
- changer avatar ;
- modifier langue ;
- modifier préférences explicites ;
- consulter progression ;
- consulter créations ;
- retirer une donnée autorisée.

Chaque écriture doit produire une validation et un événement.

## 5. MORISE behavior

MORISE :
- aide à configurer ;
- explique les champs ;
- propose un avatar si demandé ;
- suggère une personnalisation non sensible.

Exemples :
« Ton profil est prêt. »
« Tu peux choisir ton style d'expérience. »
Elle ne doit pas attribuer de personnalité sensible au joueur.

## 6. Data

Séparer :
- public_profile ;
- private_profile ;
- player_preferences ;
- player_progress ;
- player_activity ;
- AI memory scoped to player.

Ne jamais mélanger données publiques et mémoire interne.

## 7. Events

PLAYER_CREATED
PROFILE_UPDATED
AVATAR_GENERATION_REQUESTED
AVATAR_CREATED
PREFERENCE_UPDATED
PLAYER_ACTIVITY_RECORDED

## 8. AI

Capabilities :
- AVATAR_GENERATION ;
- TRANSLATION ;
- TEXT_ASSISTANCE ;
- RECOMMENDATION.

La recommandation ne doit utiliser que des signaux autorisés.

## 9. Providers

Provider Router uniquement. Exemple possible pour avatar : Pollinations/Gemini/SiliconFlow/Pixelverse si leurs adapters et capacités sont validés. Aucun module ne code le provider directement.

## 10. Secrets

Aucun secret supplémentaire spécifique au PLAYER. Utiliser uniquement les secrets du Provider Registry via Edge Functions.

## 11. Security

- authentification ;
- RLS ;
- ownership checks ;
- interdiction de modifier le profil d'un autre joueur ;
- validation des uploads ;
- suppression de données contrôlée.

## 12. Performance

Avatar et historique chargés à la demande.
Les préférences nécessaires au shell sont minimales.
Les activités lourdes sont paginées.

## 13. Tests

- création ;
- édition ;
- ownership ;
- avatar provider indisponible ;
- mobile ;
- utilisateur non connecté ;
- profil vide ;
- profil corrompu ;
- rollback d'une mise à jour échouée.

## 14. Acceptance

Un joueur peut créer son identité, la consulter, la modifier et utiliser ses préférences sans dépendre d'un fournisseur IA disponible.

## 15. Do not modify

Ne pas placer ici la logique complète de progression, social, jeu ou mémoire globale.

## 16. New-AI handoff

PLAYER DATA ≠ MORISE MEMORY. Une IA future doit respecter cette séparation.
