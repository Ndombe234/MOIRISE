# M02 — PLAYER — PLAN CANONIQUE

## Mission
Construire l'identité persistante du Player, son profil, ses préférences, sa confidentialité, son attribution et les fondations de MORISE DNA.

## Fonctionnalités détaillées
1. Session → Player : création idempotente après authentification.
2. Profil public : handle, display name, avatar, bio, préférences publiables.
3. Profil privé : paramètres, préférences et consentements.
4. Avatar : upload ou génération via IMAGE_GENERATION, validation avant utilisation.
5. Préférences : langue, intérêts explicites, recommandations, notifications et visibilité.
6. Historique : créations, jeux, activités et collections sous contrôle de visibilité.
7. Confidentialité : visibilité par champ, blocage/mute consommés par les modules sociaux.
8. Attribution : propriétaire canonique de ses créations et contributions.
9. Player Context : vue minimale destinée au SYSTEM/M15.
10. Player Memory : mémoire personnelle séparée des autres mémoires.
11. MORISE DNA : capacités démontrées, jamais profil psychologique.
12. Suppression : oubli et rétention selon policy.

## IA
M15 peut traduire, résumer, aider à rédiger, générer un avatar, proposer des personnalisations et calculer des candidates DNA. L'IA ne modifie jamais identité, rôle ou confidentialité sans commande autorisée.

## Flux avatar
REQUEST → POLICY → IMAGE_CAPABILITY → VALIDATION → PREVIEW → CONFIRM → PROFILE_UPDATE.

## Flux DNA
ACTION VALIDÉE → EVIDENCE → DNA SIGNAL → CAPABILITY PROFILE → POSSIBILITY CONTEXTUELLE.

## Règles
actorId vient de la session; profil public = projection; données privées non envoyées automatiquement aux providers.

## DONE
Création idempotente, ownership serveur, visibilité correcte, avatar validé, Player Context borné, suppression testée, mobile/desktop validés.
