# M10 — SOCIAL GAMING — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Un défi n'est pas juste un bouton. La chaîne exacte est : résultat validé → règle de défi immutable → cible/visibilité → invitation → tentative indépendante → validation → comparaison → rematch éventuel.

## 1. Owner
M10 possède l'état des challenges et comparaisons. M06 possède les sessions de jeu; M11 possède membership des communautés; M05/M14 consomment les résultats validés.

## 2. Create Challenge
Acteur Player. Déclencheur Share/Challenge depuis un résultat validé.
Préconditions : resultId valide; source partageable; target policy.
Étapes : vérifier résultat → copier uniquement les paramètres nécessaires de rulesVersion → définir target/visibility/expiry → créer Challenge immutable → créer invite/ref.
Source privée jamais exposée par la challenge card.

## 3. Async Attempt
Le destinataire ouvre → vérifier que Challenge est ACTIVE et qu'il n'est ni expiré ni interdit par block/privacy → créer ChallengeAttempt → demander une nouvelle PlaySession à M06 → associer result au challenge après validation.
L'ancienne tentative n'est jamais modifiée.

## 4. Comparison
Comparer seulement AuthoritativeResults. Utiliser la même rulesVersion/tie rule pour tous. Le client reçoit une ComparisonProjection, jamais une victoire calculée localement considérée comme officielle.

## 5. Rematch
Rematch crée un nouveau Challenge avec une nouvelle session. L'ancien challenge et son résultat restent immuables. Rate limits évitent une création infinie.

## 6. Community Challenge
M10 reçoit une demande depuis M11 mais revalide membership/permissions au moment de l'action. La communauté ne devient pas source de vérité de membership.

## 7. Abuse controls
Avant création, accept, attempt ou rematch : block/mute check, rate limit, expiry, dedupe, result integrity. Abuse flags peuvent créer un hook vers la modération, pas une punition autonome.

## 8. États
Challenge DRAFT → ACTIVE → COMPLETED/EXPIRED/CANCELLED.
Attempt PENDING → ACTIVE → VALID/INCONCLUSIVE.
Comparison READY seulement si les inputs autoritatifs sont valides.

## 9. Tests / DONE
Duplicate challenge, blocked target, expired challenge, concurrent rematch, invalid score, private result sharing, community membership revoked, mobile/desktop, network loss and idempotent retry.