# MOIRISE — PREUVE DE L'ÉTAT ACTUEL DU DÉPÔT

Ce document décrit les faits observés dans le dépôt au moment de la reconstruction documentaire. Il n'est pas une spécification métier.

## Runtime

package.json observé :
- next 16.3.6
- react 19.3.0
- react-dom 19.3.0
- typescript 7.0.2
- vitest 5.0.2
- @supabase/ssr 0.12.7
- @supabase/supabase-js 2.117.1
- Node >=22.

Scripts :
- dev = next dev
- build = typecheck + tests + next build + standalone preparation
- start = standalone server
- typecheck
- test
- lint

## Données actuellement observées

La base contient des migrations Supabase pour :
- public.players ;
- social posts/follows/comments/reactions ;
- play attempts ;
- play sessions ;
- progression/system RPCs ;
- RLS et grants.

Le Player utilise auth.users.id comme clé et des policies owner-only dans la migration observée.

## Surfaces observées

Le dépôt contient notamment :
- Home ;
- Discover ;
- Play ;
- Player ;
- Social ;
- System ;
- Activities ;
- Communities ;
- Events ;
- Create ;
- auth sign-in/sign-up ;
- API health ;
- API system ;
- API system progress.

Les fichiers existants sont une base à inspecter pendant l'implémentation. Ils ne doivent pas créer un second propriétaire métier.

## Preuves importantes

Le code Play possède une table play_attempts et une RPC record_play_completion qui déduplique par attempt_id et peut déclencher un événement de progression avec une clé déterministe.

Le code Play possède play_sessions avec une durée d'expiration et des RPC server-side de création/fermeture.

Le Player possède une contrainte de handle et une contrainte de longueur display_name, avec index unique case-insensitive sur le handle.

Le social possède RLS, owner-write policies et réactions limitées à un enum.

## Naming reconciliation

Le dépôt/package utilise encore le libellé MORISE à plusieurs endroits, alors que le nom produit canonique documentaire demandé est MOIRISE. Le code existant n'est pas renommé automatiquement par cette documentation. Toute modification de naming doit être traitée comme une migration consciente et testée.

## Environnement

Le README actuel décrit Render comme environnement de build/QA et Cloudflare comme cible de production future. Cette documentation ne transforme pas cette intention en fait déployé ; les déploiements doivent être vérifiés séparément.

## Conséquence pour l'agent

Avant chaque module :
1. lire ce document ;
2. lire les migrations et source réellement présents ;
3. comparer avec le PLAN et TECHNICAL_DESIGN ;
4. conserver les comportements valides existants ;
5. corriger explicitement toute divergence contractuelle ;
6. ne pas déduire qu'une feature est complète parce qu'une route existe.