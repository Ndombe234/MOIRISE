# MOIRISE — RESET D'IMPLÉMENTATION ET NOUVEAU POINT DE DÉPART

Date : 2026-10-02  
Branche : `rebuild/canonical-m01-reset`  
Base : `4c5eb93070a1af943daed10cc238e2d84e744335`

## 1. Décision

L'ancienne implémentation M01–M06 a été explicitement considérée comme non conforme au nouveau plan. Elle ne doit donc pas servir de preuve d'avancement, ni fournir une seconde architecture concurrente.

Le nouveau plan canonique est celui de `docs/moirise/` :

M01 Foundation → M02 Player → M03 Social → M04 World → M05 System → M06 Play → M07 Discovery → M08 Game Factory → M09 Game Engine → M10 Social Gaming → M11 Communities → M12 Events → M13 Adaptive → M14 Collection/Reward → M15 Meta/MORISE AI Lab.

## 2. Ce qui est retiré comme ancienne implémentation

Le reset retire du runtime de la branche de reconstruction :

- `app/**`
- `components/**`
- `lib/**`
- `supabase/migrations/**`
- `tests/**`
- `proxy.ts`

Cette suppression couvre notamment les anciennes routes Home/Discover/Player/Social/System/Play, les anciens mini-jeux, les anciens selectors Play, les anciens services Player/System/Social, les anciennes migrations de tables/RPC/RLS et les tests qui validaient cette ancienne architecture.

**Conséquence importante : aucune de ces implémentations n'est comptée comme M01, M02, M03, M04, M05 ou M06 du nouveau plan.**

## 3. Ce qui est conservé

Le reset conserve :

- `docs/moirise/**` ;
- `.github/workflows/**` ;
- `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs` ;
- `Dockerfile` ;
- `scripts/**` ;
- `public/**` ;
- `.env.example` ;
- l'historique Git.

La documentation historique reste une trace d'origine, pas une architecture concurrente.

## 4. Nouveau socle M01 créé

Le nouveau socle contient uniquement la première tranche de M01 :

- shell Next minimal ;
- endpoint health ;
- résolution serveur de session ;
- auth sign-in/sign-up + callback ;
- contexte de requête/session typé ;
- registre de capabilities M01 ;
- modèle d'erreur applicatif ;
- frontière Supabase serveur/navigateur ;
- tests contractuels déterministes.

Le socle ne revendique pas encore :

- event bus persistant ;
- outbox/delivery durable ;
- registry persisté ;
- observabilité production complète ;
- rate limiting production ;
- partage signé/révocable ;
- AI gateway opérationnelle avec M15 ;
- validation navigateur desktop/mobile ;
- gate DONE complet de M01.

## 5. Autorité

Le code M01 ne possède aucune logique Player, Social, World, Progression ou Play. Les futurs modules doivent passer par les contrats M01 sans y recopier leur métier.

## 6. État

**M01 = IN PROGRESS.**

Le prochain passage doit suivre le gate :

PLAN → TECHNICAL DESIGN → CODE INSPECTION → TYPES → DATA → AUTH → DOMAIN → EVENTS → UI → TESTS → BROWSER → MOBILE → SECURITY → DONE.

Un test vert isolé ou une page qui se rend ne suffit pas à déclarer M01 terminé.

## 7. Estimation révisée

Le reset lui-même + le premier vertical slice M01 représente environ **6–10 h d'implémentation/contrôle** selon les corrections CI.

Pour fermer tout le gate M01 avec persistence/event contracts, récupération, sécurité, observabilité, tests de concurrence, desktop/mobile et browser verification : **16–28 h supplémentaires** est une enveloppe de travail réaliste avec un agent de code opérant en boucle ANALYSE → IMPLÉMENTATION → TEST → NAVIGATEUR → CORRECTION → RETEST.

Cette estimation sera recalculée lorsque le détail technique exposera des tâches supplémentaires ; elle ne sera pas multipliée artificiellement par le niveau de détail.
