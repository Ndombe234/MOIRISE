# M11 — COMMUNITIES / GUILDS — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Un groupe ne se résume pas à « create group ». La chaîne exacte est : acteur → permission de création → nom/description/visibility/rules → validation → community row → OWNER membership → events → management projection.

## 1. Owner
M11 est la seule autorité pour Community, Membership, roles et invitations. Posts, events, challenges et games liés à une communauté restent la propriété de leurs modules respectifs.

## 2. Create Group
Acteur Player; trigger Create Group.
Préconditions : authentifié, policy create=true, name/description/visibility/rules conformes.
Ordre : server actor → validate fields → normalize name → check uniqueness policy → create Community DRAFT/ACTIVE → create OWNER membership dans la même transaction → emit COMMUNITY_CREATED → ouvrir management view.
Si membership échoue, aucun Community partiellement créé ne doit rester actif.

## 3. Join public
Player ouvre groupe → server vérifie group ACTIVE, visibility PUBLIC, block/mute policy, membership inexistante → insert membership unique → emit JOINED → projection welcome.
Double clic retourne le membership existant.

## 4. Private invitation
Owner/Admin autorisé → cible autorisée → créer Invitation avec expiry, inviter, target and scope → notification selon préférence → accept crée membership uniquement après nouvelle vérification.
Invitation expirée ou révoquée ne peut jamais produire membership.

## 5. Roles
Role hierarchy versionnée : OWNER > ADMIN > MODERATOR > MEMBER, avec GUEST facultatif si activé.
Avant changement : vérifier actor role → target membership → règle de transfert/owner safety → écrire role → audit event.
Le dernier OWNER ne peut pas être supprimé sans transfert/closure policy.

## 6. AI-assisted community formation
M15 peut détecter une candidate à partir de signaux non sensibles et autorisés. Pipeline : candidate → existing-group check → duplicate proposal check → confidence/diversity → proposal → consent/policy → appel du même use-case Create Group.
AI ne doit pas écrire directement Community/Membership.

## 7. Group closure/transfer
Freeze joins → revoke pending invites → transfer ownership ou mark CLOSED → publish event → preserve audit references. Les données privées de l'ancien groupe restent protégées par les permissions historiques/retention.

## 8. États
Community DRAFT → ACTIVE → FROZEN → CLOSED.
Membership INVITED/PENDING/ACTIVE/LEFT/REMOVED.
Invitation CREATED → ACCEPTED/REJECTED/EXPIRED/REVOKED.

## 9. Tests / DONE
Create rollback, duplicate join, expired invite, block, role escalation, last-owner safety, AI proposal rejection, community closure, mobile/desktop, private data isolation.