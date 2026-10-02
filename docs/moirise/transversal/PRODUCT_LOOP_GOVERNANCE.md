# MOIRISE — PRODUCT LOOP, CROSS-LOOP & VALIDATION GOVERNANCE

**Statut : canonique transversal — 2026-10-02**

Ce document formalise les extensions produit approuvées autour de la boucle de valeur MOIRISE. Il **ne crée aucun module supplémentaire**. Il complète les owners existants et devient la référence commune pour les transitions entre SOCIAL, PLAY, CREATE, COMMUNITIES, EVENTS, PROGRESSION, DISCOVERY et MORISE AI.

## 1. Finalité

MOIRISE doit être compris comme une boucle de produit et non comme un assemblage de pages :

**DISCOVERY → INTERACTION → CREATION / PLAY → COMMUNITY → EVENT → PROGRESSION → SHARE → DISCOVERY**

Les transitions suivantes sont natives et doivent rester possibles lorsque les permissions et le contexte les autorisent :

- CONTENT → GAME
- GAME → CONTENT
- CONTENT → COMMUNITY
- COMMUNITY → GAME
- EVENT → CONTENT
- CONTENT → EVENT
- CREATION → COMMUNITY
- COMMUNITY → CREATION
- PLAY → PROGRESSION
- PROGRESSION → CREATION / DISCOVERY

Une capacité interne n'ajoute jamais une nouvelle porte utilisateur. Les six portes canoniques restent **SYSTEM · PLAYER · SOCIAL · WORLD · PLAY · CREATE**.

## 2. T01 — Delivery Priority Layer

La priorité sert à organiser le travail ; elle ne constitue ni un classement de valeur des modules ni une autorité métier.

### 2.1 Classes de livraison

**FOUNDATION / DEPENDENCY**
- M01 Foundation
- M02 Player
- M05 System / Progression

**DAILY PRODUCT LOOP**
- M03 Social
- M06 Play
- M07 Game Discovery
- M10 Social Gaming
- M11 Communities
- M12 Events
- M14 Collection / Reward

**DIFFERENTIATION PLATFORM**
- M08 Game Factory
- M09 Shared Game Engine

**ADAPTIVE / META**
- M04 World
- M13 Adaptive World
- M15 Meta System + MORISE AI Lab

Cette classification ne change aucun ownership. M08/M09/M06/M10 restent essentiels à la différenciation jeux de MOIRISE ; les capacités avancées peuvent toutefois être livrées progressivement.

## 3. T02 — Cross-Loop Engine

Le Cross-Loop Engine est un **mécanisme transversal**, pas M16.

### 3.1 Responsabilité

Il détecte qu'un résultat réel peut ouvrir une transition utile vers une autre capacité, prépare une proposition bornée et permet au module propriétaire d'exécuter ou refuser la transition.

Pipeline canonique :

**OBSERVED STATE → ELIGIBILITY → TRANSITION PROPOSAL → OWNER VALIDATION → OWNER COMMAND → AUTHORITATIVE EVENT → PROJECTION**

M15 peut proposer/orchestrer. Le module destination reste propriétaire de la mutation.

### 3.2 Envelope minimale

Toute proposition de transition porte au minimum :

- `transitionId`
- `sourceRef`
- `sourceOwner`
- `targetCapability`
- `targetOwner`
- `reasonKey`
- `evidenceRefs[]`
- `privacyClass`
- `policyVersion`
- `expiresAt`
- `idempotencyKey`

Le moteur ne possède pas les tables métier des modules et ne signe pas lui-même les autorisations.

### 3.3 Exemples

**Post → Challenge → Play → Result → Share**
M03 produit le contenu → M07 peut détecter une opportunité → M10 crée le challenge → M06 ouvre la session → résultat validé → M03 produit la projection partageable → M14 peut traiter une récompense.

**Discussion → Poll → Challenge → Community**
M03 conserve la discussion → M11 peut héberger l'espace durable → M10 crée l'activité → M11 conserve l'appartenance → M07 rend la découverte possible selon visibilité.

## 4. T03 — Recommendation Experimentation

M07 est propriétaire du ranking et de la recommandation pour ses surfaces de discovery.

### 4.1 Architecture

**CANDIDATES → HARD FILTERS → RANKING VERSION → EXPERIMENT ASSIGNMENT → DIVERSITY / NOVELTY → REASON → PROJECTION**

M13 fournit du contexte adaptatif autorisé. M15 peut produire une hypothèse, analyser les résultats ou proposer un changement. M15 ne modifie pas directement les poids de production.

### 4.2 Contrat d'expérience

Une expérience de ranking est identifiable par :

- `rankingVersion`
- `experimentId`
- `cohortId`
- `assignmentVersion`
- `exposureId`
- `metricWindow`
- `decisionState`

Cycle :

**RANKING VERSION → EXPERIMENT → COHORT → EXPOSURE → METRICS → COMPARISON → PROMOTE / REJECT**

Aucune promotion ne repose sur une seule métrique d'attention.

### 4.3 Valeur après clic

Les métriques doivent distinguer au minimum :

- attention : impression, visibilité, démarrage ;
- interaction : réaction, commentaire, sauvegarde, partage ;
- transformation : création dérivée, jeu lancé, communauté rejointe, événement ouvert ;
- rétention : retour et activité ultérieure.

Le système suit notamment la **value-after-click** : ce qui s'est produit après qu'un contenu a effectivement obtenu l'attention de l'utilisateur.

## 5. T04 — Cold-Start & Content Density

MOIRISE ne simule jamais une communauté pour masquer un manque de contenu.

### 5.1 Sources autorisées

Le pool initial peut combiner uniquement des objets réellement disponibles :

- `OFFICIAL`
- `CREATOR`
- `PUBLIC_USER`
- `USER_CREATED`
- `GAME`
- `QUESTION`
- `CHALLENGE`
- `COMMUNITY`
- `EVENT`

### 5.2 Métadonnées minimales

Tout objet candidat au cold-start/discovery possède selon son type :

`sourceType`, `ownerRef`, `visibility`, `availability`, `freshness`, `qualityStatus`, `provenanceRef`, `createdAt`.

Il est interdit de fabriquer :

- faux utilisateurs ;
- faux followers ;
- faux groupes ;
- faux joueurs ;
- faux compteurs ;
- faux résultats ;
- faux signaux sociaux.

Quand le pool est réellement vide, l'expérience le dit et propose des actions honnêtes : créer, jouer, rechercher, explorer ou revenir plus tard.

## 6. T05 — Creator Career Loop

Le créateur doit pouvoir observer une trajectoire au-delà des likes :

**CREATE → PUBLISH → DISCOVERY → ENGAGEMENT → TRANSFORMATION → AUDIENCE → PROGRESSION → UNLOCK → CREATE AGAIN**

Répartition :

- M02 : identité et profil ;
- M03 : création/publication sociale ;
- M07 : découverte ;
- M05 : progression ;
- M14 : récompenses/unlocks ;
- M10/M11/M12 : transformations vers challenge, communauté et événement.

Un creator loop doit expliciter la valeur reçue par l'auteur, la valeur pour les spectateurs et l'action suivante réellement disponible.

## 7. T06 — Product Validation Layer

La validation produit est distincte de la validation technique.

### 7.1 Technique

**CODE → TYPE/LINT → UNIT/INTEGRATION → BUILD → SECURITY → BROWSER → MOBILE → PRODUCTION EVIDENCE**

### 7.2 Produit

**HYPOTHESIS → TARGET COHORT → EXPOSURE → BEHAVIOR → VALUE SIGNAL → RETENTION / REUSE → QUALITATIVE EVIDENCE → DECISION**

Une feature peut être techniquement correcte et rester une hypothèse produit. Cette distinction doit apparaître dans les DONE gates.

### 7.3 Signaux de produit

Le système peut mesurer, selon la feature :

- activation ;
- aha moment ;
- J1 / J7 / J30 retention ;
- profondeur sociale ;
- taux de création ;
- taux de transformation ;
- taux de cross-loop ;
- value-after-click ;
- retour sur une création ou un jeu ;
- participation communautaire/événementielle.

Aucun seuil universel n'est inventé. Les seuils expérimentaux appartiennent à la spécification de l'expérience concernée.

## 8. T07 — Cross-Loop Analytics

Les analytics doivent mesurer les **transitions entre owners**, pas seulement les clics locaux.

### 8.1 Transitions de référence

- SOCIAL → PLAY
- PLAY → SOCIAL
- SOCIAL → COMMUNITY
- COMMUNITY → PLAY
- COMMUNITY → CREATE
- CREATE → PLAY
- PLAY → COMMUNITY
- EVENT → SOCIAL
- EVENT → PLAY
- PLAY → PROGRESSION
- PROGRESSION → CREATE
- CREATE → DISCOVERY
- DISCOVERY → CREATE

### 8.2 Règle de provenance

Chaque transition analytique relie un événement source réel à un événement cible réel. Les compteurs de transition ne sont jamais déduits de données inventées.

### 8.3 Graphe social élargi

Le graphe relationnel peut représenter des relations d'action réelles telles que :

follow, like, comment, share, play, create, join, participate, compete, remix.

Une relation n'est créée que par un événement métier ou une projection explicitement dérivée.

## 9. MORISE AI — rôle dans les cross-loops

M15/MORISE AI :

- comprend les transitions possibles ;
- récupère le contexte minimal ;
- propose des actions ;
- construit des TaskGraphs ;
- mesure et analyse les résultats ;
- peut proposer une nouvelle hypothèse de ranking ou de produit.

MORISE AI **ne devient jamais l'owner** d'une table métier d'un autre module.

La chaîne reste :

**M15 PROPOSAL → OWNER POLICY → VALIDATION → OWNER COMMIT → EVENT → PROJECTION → ANALYTICS**

## 10. Auto-évolution contrôlée

Pour toute évolution pouvant modifier le produit :

**OBSERVATION → GAP → HYPOTHESIS → CANDIDATE PATCH → SANDBOX → TESTS → BENCHMARK → SECURITY/POLICY → CANARY → PRODUCT VALIDATION WHEN APPLICABLE → PROMOTE / REJECT → MONITOR → ROLLBACK**

La production n'est jamais auto-modifiée directement depuis une sortie de modèle.

## 11. Acceptance contract

Une intégration cross-loop ne peut être marquée DONE que si elle démontre :

1. owner source correct ;
2. owner destination correct ;
3. permission/privacy correcte ;
4. transition idempotente ;
5. absence de mutation cross-owner ;
6. event source et cible traçables ;
7. fallback si destination indisponible ;
8. anti-spam/rate-limit adapté ;
9. analytics de transition ;
10. test produit distinct du test technique lorsque la feature modifie un comportement utilisateur.

## 12. No-new-module rule

Toutes les capacités définies ici vivent dans les 15 modules canoniques et leurs contrats transversaux existants. Le Cross-Loop Engine, Product Validation Layer, ranking experimentation et analytics cross-loop sont des mécanismes de gouvernance/coordination, pas de nouveaux modules.

## 13. Delivery impact

Cette gouvernance réduit le risque de construire des fonctionnalités isolées sans boucle de retour, mais elle révèle du travail supplémentaire : instrumentation, cohortes, ranking versions, transitions, projections, produit expérimental et browser scenarios.

Elle doit être intégrée progressivement au rythme de chaque module et ne doit pas bloquer les fondations M01/M02/M05 déjà en fabrication.
