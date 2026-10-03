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

## AI-INTÉGRATION M11 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M11 reste l'unique autorité pour Communities/Guilds, membership, rôles, invitations et gouvernance. MORISE AI peut découvrir des communautés, proposer une formation, résumer ou assister la modération, mais toute mutation passe par le command path M11. Une CommunityProposal est une proposition non autoritative : proposal → policy → M11 validation → commit → event. Les données privées ne traversent la frontière AI que par scope explicite. Aucune sortie AI ne peut ajouter un membre, élever un rôle, contourner un block ou supprimer la protection du dernier owner. Sans AI, discovery et gouvernance restent déterministes. DONE exige des tests de role escalation, private-data leakage, duplicate join, stale membership, proposal rejection et provider outage.

# D10 — M11 COMMUNITIES — EXPANSION COMPORTEMENTALE
## Community role
Communities/guilds create durable belonging around Otaku interests, games, creations and events.
## Creation
PROPOSAL/CREATE → POLICY → OWNER MEMBERSHIP → DEFAULT SETTINGS → EVENT → DISCOVERY PROJECTION.
## AI role
M15 can propose affinity/convergence/community creation but M11 decides actual creation, membership, roles and visibility.
## Media/game integration
Communities can host feeds, Stories/Reels projects, challenges, game sessions and events without owning their internal source records.
## Viral growth
A community grows from a real shared action (play, creation, event, discussion), not from fake recommendations or auto-added users. Invitations are scoped and rate-limited.
## DONE
Public/private membership, moderation, roles, invite controls, cross-module projections and leave/delete recovery validated.

# D100K — M11 Communities / Guilds — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M11. Scope: membership, roles, moderation, community state. Dependencies: M02,M03,M12,M13. Primary invariant: membership/role authority is M11 only.
Capability transition: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
No authoritative mutation on failed auth/policy/schema/version/ownership/idempotency guards or unavailable critical dependency.

## 3. AI and cross-module boundary
M15 may propose/analyze but cannot mutate M11 private authority. Consumers use defined contracts/events/projections only.

## 4. Proof obligations
Nominal, empty/no-data, error, unavailable/degraded, retry/replay, refresh/reopen, permission denial, concurrency where relevant, desktop and mobile, plus adversarial cases specific to M11.

## 5. Impact obligation
M11 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.

## 6. Formal properties
Authority is unique; duplicate commands are idempotent; stale versions do not overwrite; projections remain rebuildable; privacy follows the object; VERIFIED requires fresh applicable evidence.

## 7. Completion
This section defines proof requirements, not implementation completion.


## AI FABRICATION CONTEXT CONTRACT — ANTI-AMBIGUITY AND PROOF GATE

This document is an authoritative fabrication input for **M11-communities** within its declared ownership. It must be read together with the complete paired PLAN + TECHNICAL_DESIGN, applicable transversal contracts, dependency rules, definition of done, and the current repository state before implementation.

### Controlled context
Before changing code, the agent MUST record current branch/commit; exact in-scope files/symbols; EXISTS/MISSING/TO_MODIFY/FORBIDDEN/AFFECTED_DEPENDENCY classification; direct/transitive dependencies; data/API/event/schema contracts; acceptance criteria; tests; browser/mobile checks; security/privacy constraints; and required DONE evidence. Missing details are resolved from canonical repository evidence, never invented silently.

### Understanding before fabrication
The sequence is **READ → MODEL CURRENT STATE → CHECK DEPENDENCIES → PLAN → FABRICATE → TEST → VERIFY → INTEGRATE → REGRESSION → LOCK**. Generated code, a green isolated test, or a worker handoff is not sufficient proof of integrated correctness. The coordinator verifies the actual integrated commit.

### Measurable quality target
The goal is to reduce avoidable errors by reducing what the agent must guess. Track first-pass task success, correction count, integration defects, regressions, test failures, and browser failures independently. An 80% first-pass target or 10–20% error envelope can be an engineering KPI, never a guarantee and never a reason to skip verification.

### Evidence gate
DONE requires the applicable chain: **code exists → type/build → focused tests → integration/contracts → runtime/route accessibility → desktop/mobile verification where relevant → error/reload/permissions → dependency regression → fresh evidence**. Anything not demonstrated is **UNVERIFIED**.

### Conflict rule
Conflicting documentation, repository state, or dependencies block the affected fabrication path until the coordinator resolves the authority. This section improves traceability without creating another business or AI authority.
