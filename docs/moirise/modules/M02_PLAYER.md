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


---

# M02 — PLAYER — COMPLETE TECHNICAL CONTRACT

## Responsibility
M02 owns authenticated player identity, profile, preferences and public identity presentation. Progression arithmetic is M05; rewards/inventory are M14; social content/messages are M03.

## Data
`profiles`, `profile_preferences`, `player_settings`, `player_stats_public`.

## Canonical identity
`auth.user.id` is the immutable identity key. `handle` is unique and server-validated. `displayName` is presentation only. Never use display name as a foreign key.

## Types
```ts
interface PlayerProfile { id:string; handle:string; displayName:string; avatarRef?:string; bio:string; locale:string; createdAt:string; }
interface PlayerPreferences { locale:string; theme:'dark'; interests:string[]; privacy:'public'|'friends'|'private'; }
interface PlayerPatch { displayName?:string; bio?:string; avatarRef?:string; locale?:string; interests?:string[]; privacy?:PlayerPreferences['privacy']; }
```

## Profile lifecycle
`AUTHENTICATED → ENSURE_PROFILE → LOAD_PROFILE → READY`. Missing profile is created once through an idempotent server transaction. Deleted/disabled accounts cannot create new profile rows.

## Writes
Validate string lengths, locale membership, avatar MIME/size and privacy enum before mutation. Use optimistic UI only for reversible preferences. Identity/security changes wait for server acknowledgement.

## Privacy
Public profile fields and private settings use separate authorization policies. Blocked users cannot retrieve restricted profile data. Admin access is explicit and audited.

## AI boundary
AI may draft a bio, translate text, suggest interests or explain settings only after explicit invocation. It cannot change identity, privacy, email, roles or permissions.

## Caching
Public profile cards may use short TTL cache keyed by player ID. Private settings are user-scoped. Invalidate profile caches after authoritative writes.

## UI
Profile is one permanent door. Edit/profile settings/statistics/collection are contextual sections. Avoid separate pages for each setting.

## Failure handling
Avatar upload failure leaves previous avatar intact. Profile save conflict reloads the authoritative version. Deleted profile references render a safe fallback card.

## Tests
Handle uniqueness; self-only mutation; privacy matrix; blocked-user access; avatar validation; locale persistence; concurrent edits; deleted-account references; AI-offline operation; mobile layout.

## Done gate
A player can create and edit identity safely, another user cannot mutate it, private settings never leak, and the profile works with AI/providers completely offline.



## 17. Canonical implementation runbook

1. Define the profiles row keyed by auth.users.id; never use a display name as an identity key.
2. Define server-side profile bootstrap as an idempotent operation.
3. Separate public profile projection from private settings and AI memory.
4. Add unique normalized handle validation with conflict-safe write handling.
5. Add profile edit server action/API with field-level validation and ownership checks.
6. Add avatar reference validation; preserve the previous avatar if an upload fails.
7. Add locale validation against the canonical supported-locale registry.
8. Add privacy enum enforcement in the database, not only in TypeScript.
9. Add profile read models/cache keys and explicit invalidation after authoritative writes.
10. Add audit events for identity/security-sensitive changes.
11. Add RLS policies for self-write/private-read/public-profile-read according to visibility.
12. Add tests for concurrent edits, handle collision, unauthorized mutation, deleted account references and AI-disabled operation.
13. Validate mobile profile scrolling, keyboard behavior and touch target sizes.

### Canonical server contracts
ensureProfile(), getMyProfile(), updateMyProfile(patch), updateMyPreferences(patch), removeProfileData(scope). Every mutation derives the user ID from the authenticated session.

### Completion proof
Player identity, preferences and profile work when every AI/provider is offline.

## 20. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.