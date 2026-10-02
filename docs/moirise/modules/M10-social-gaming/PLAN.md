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

## AI-INTÉGRATION M10 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M10 possède les interactions sociales autour du jeu partagé : participants, party, coordination et règles sociales de la session.

### B. AI cases
Suggestion d'équipe, coordination, matchmaking assistance, suggestion d'activité et synthèse de session.

### C. Context
Participant IDs nécessaires, rôle/permission, game/session state autorisé, préférences explicitement consenties. Pas de lecture libre des DMs ou communautés.

### D. Authority
AI proposal → M10 policy → participant checks → commit. M15 ne peut pas ajouter/supprimer un participant ni modifier un rôle sans use-case M10 autorisé.

### E. DONE
Les suggestions sont réversibles, explicables et n'exposent aucun participant privé non nécessaire.

## GAME PLATFORM — INTÉGRATION M10 / JEUX SOCIAUX

M10 permet à un jeu fabriqué par M08 et exécuté par M09 d'utiliser une couche sociale commune.

GameSpecification peut déclarer des hooks : party, invite, challenge, shared score, spectator ou cooperative objective.

Le jeu produit des événements de gameplay validables. M10 possède l'état social partagé et vérifie membership, permissions et privacy.

M15 peut proposer composition d'équipe, matchmaking assistance, résumé ou événement social. La proposition devient active seulement après validation M10.

Un jeu sans hook social reste un jeu solo. Aucun social layer n'est ajouté artificiellement.

# D10 — M10 SOCIAL GAMING — EXPANSION COMPORTEMENTALE
## Social game objects
Challenge, rematch, party, co-op invite, spectator projection, team, result card and game-linked conversation.
## Loop
PLAY → RESULT → SOCIAL_ACTION → INVITE/SHARE/REMATCH → NEW_SESSION.
## Boundaries
M10 owns social hooks; M06 owns play session; M11 owns membership; M14 owns rewards.
## Media integration
A validated Reel/Story/photo can include a game launch action. A game result can produce a media card only from authoritative result data.
## Anti-spam
Invite dedupe, recipient controls, mute, frequency caps and block enforcement.
## Viral loops
Challenge links should make the next action obvious and reversible: play, join group, rematch or share result.
## DONE
Friend/group challenge, privacy, block, duplicate invite, build removal and mobile/desktop behavior tested.

# D100 — SPÉCIFICATION COMPORTEMENTALE
## Challenge
Create only from validated result. RulesVersion and expiration are fixed at creation. Recipient scope respects block/privacy.
## Rematch
Result → rematch proposal → target accepts → new PlaySession. A rejected/expired proposal cannot reopen a session.
## Invite
Invite is deduplicated and rate-limited. Recipient can mute or reject without revealing hidden profile data.
## Group play
M10 asks M11 membership/permissions when a community or guild is involved; M10 does not mutate membership.
## Media handoff
Validated result can create safe visual/text projection in M03; it cannot fabricate scores.

# D110 — CROSS-LOOP INTEGRATION GOVERNANCE
M10 est le bridge social principal entre un résultat de jeu réel et une action sociale : challenge, rematch, invite, share ou projection communautaire.

M10 reçoit des résultats validés de M06 et ne fabrique jamais de score/sourceRef. Une transition PLAY → SOCIAL ou SOCIAL → PLAY doit rester idempotente, rate-limited et contrôlée par recipient/privacy policy.

M10 peut être une étape centrale du Cross-Loop Engine, mais ne devient pas propriétaire des memberships M11, des résultats M06 ou des récompenses M14.

Référence : `docs/moirise/transversal/PRODUCT_LOOP_GOVERNANCE.md`.
