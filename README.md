# MOIRISE

MOIRISE est un réseau social général, ludique et créatif dont le SYSTEM constitue le langage d'interaction central. Les portes globales canoniques sont SYSTEM, PLAYER, SOCIAL, WORLD, PLAY et CREATE.

## Autorité de construction

Cette branche `rebuild/canonical-m01-reset` est la branche de reconstruction canonique. `main` conserve encore l'ancienne implémentation historique et ne constitue pas une preuve d'avancement du nouveau plan.

## État de construction

Le dépôt a été **réinitialisé volontairement sur une nouvelle architecture canonique à 15 modules**. L'ancienne implémentation applicative ne constitue plus une base de progression.

- M01 Foundation : **IN PROGRESS — nouveau socle initial uniquement**
- M02 Player → M15 Meta / MORISE AI Lab : **NOT STARTED dans le code**
- Documentation canonique : `docs/moirise/MASTER_PLAN.md`
- Ordre de construction : `docs/moirise/BUILD_ORDER.md`
- État précis du reset : `docs/moirise/RESET_STATE.md`

## Règle de travail

La documentation ne vaut pas preuve d'implémentation. Chaque module passe :

PLAN → TECHNICAL DESIGN → CODE → DATA/AUTH/SECURITY → TESTS → BROWSER DESKTOP → BROWSER MOBILE → RESILIENCE → DONE.

Aucune ancienne route, migration, RPC, test ou service métier n'est considérée comme du travail validé du nouveau plan.

## Runtime

- Next.js App Router
- React + TypeScript
- Supabase pour l'identité et la persistance lorsqu'un module le requiert
- Vitest pour les tests
- Node.js 22+

Les secrets restent server-only. Le navigateur ne reçoit que la configuration publique explicitement nécessaire.

## Principes non négociables

- un seul owner métier par règle ;
- pas de faux utilisateurs, compteurs, scores, rareté ou urgence ;
- 2D et 3D sont des citoyens de première classe ;
- les providers IA sont des instruments, pas le cerveau ;
- M15 orchestre l'IA mais ne remplace pas les owners des modules ;
- aucune capability interne ne crée automatiquement une nouvelle porte globale ;
- aucun écran blanc : loading, empty, error, unavailable et degraded sont des états explicites.
