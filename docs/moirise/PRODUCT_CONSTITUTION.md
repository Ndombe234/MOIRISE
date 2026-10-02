# MOIRISE — CONSTITUTION PRODUIT
## Niveau 0 — Vision, invariants et règles non négociables

> Ce document est au-dessus des PLAN.md et TECHNICAL_DESIGN.md. Il ne décrit pas les fichiers ni les tables d'un module ; il définit les invariants auxquels toute conception et toute implémentation doivent obéir.

## 1. Identité du produit

MOIRISE est un réseau social international, ludique et créatif dont le SYSTEM constitue le langage d'interaction central. Les univers Otaku/anime peuvent constituer des centres d'intérêt et des contenus, mais ne définissent pas l'identité globale du produit.

Le produit réunit :
- social humain ;
- découverte ;
- création ;
- jeux 2D/3D ;
- communautés ;
- événements ;
- progression ;
- intelligence native MORISE AI.

La promesse structurelle n'est pas « un clone de réseau social avec de l'IA ». C'est un environnement où découvrir, créer, jouer, socialiser et progresser peuvent devenir une seule boucle.

## 2. Six portes et profondeur contextuelle

Les portes globales sont :
1. SYSTEM
2. PLAYER
3. SOCIAL
4. WORLD
5. PLAY
6. CREATE

Une capability interne ne crée pas automatiquement une septième porte.

La profondeur est révélée contextuellement par le SYSTEM.

## 3. Invariants d'intégrité

MOIRISE n'invente pas :
- utilisateurs ;
- compteurs ;
- likes ;
- vues ;
- scores ;
- rareté ;
- urgence ;
- groupes ;
- événements ;
- popularité.

Toute information affichée comme réelle doit provenir d'un état réel et identifiable.

## 4. Privacy

La confidentialité prime sur la personnalisation.

Un contenu privé ne devient pas :
- mémoire globale ;
- signal social global ;
- donnée de ranking général ;
- contenu public ;
- matière première créative partagée

sans la policy, l'autorisation et le scope appropriés.

## 5. IA

MORISE AI est une intelligence native d'orchestration.

Les modèles et providers externes sont des instruments d'exécution spécialisés.

Aucun provider, agent de code ou outil externe n'est :
- l'identité de MORISE ;
- sa mémoire propriétaire ;
- son autorité métier ;
- son mécanisme de policy ;
- son système de publication.

## 6. Originalité créative

Pour les images, photos, vidéos, Reels, Stories, audio et musique, MOIRISE favorise :
- compréhension ;
- abstraction de concepts ;
- transformation créative ;
- contribution humaine ;
- provenance ;
- validation.

Une substitution lexicale ou une petite modification mécanique n'est pas considérée comme une stratégie suffisante d'originalité.

## 7. Social et viralité

Une fonctionnalité sociale doit apporter une valeur réelle avant de demander un partage.

La boucle cible est :
découvrir → comprendre → ressentir → agir → créer/jouer → partager/inviter → découvrir une nouvelle valeur → revenir.

Les dark patterns, faux signaux et notifications artificiellement agressives sont interdits.

## 8. Évolution

MOIRISE doit pouvoir apprendre de résultats validés, changer certains mécanismes sous contrôle et remplacer des providers sans perdre son identité ni ses connaissances.

Toute auto-évolution doit être :
isolée → testée → comparée au baseline → soumise à policy → réversible → observée.

## 9. Autorité

Chaque donnée durable possède un owner unique.

M15 peut proposer, orchestrer et analyser, mais ne vole pas l'autorité des modules.

## 10. Règle de documentation

Lorsqu'une décision appartient à un module, son détail canonique appartient au PLAN.md et à TECHNICAL_DESIGN.md de ce module.

Les documents supérieurs définissent :
- invariants ;
- frontières ;
- relations ;
- standards ;
- contraintes.

Ils ne recopient pas les règles métier détaillées des owners.

## 11. Gate produit

Une capacité n'est complète que lorsqu'elle est :
spécifiée → implémentée → sécurisée → testée → intégrée → vérifiée desktop/mobile → résiliente → observable → prête pour production.


# D100 — CONSTITUTION OPÉRATIONNELLE
## Invariant precedence
CONSTITUTION > ARCHITECTURE > OWNER PLAN > TECHNICAL DESIGN > IMPLEMENTATION. A lower layer cannot weaken a higher invariant. If a feature requires an exception, the higher owner must be explicitly updated before implementation.
## Product object truth
Every user-visible social/game/world/reward fact needs a source-of-truth reference. Projections may cache, summarize or reorder but cannot fabricate.
## Human agency
AI recommendations and generated content remain proposals or user-owned creations according to the relevant policy. The interface must not disguise AI-generated content as a human action.
## Privacy precedence
Private scope dominates ranking, memory, generation and sharing until an explicit permission changes the scope. Revocation propagates to dependent projections.
## Originality
Creative derivation must use provenance and transformation policy. Simple renaming, character substitution or metadata changes are not sufficient originality checks.
## Evolution safety
Any self-improvement candidate must be isolated, benchmarked and reversible. A failed experiment cannot silently mutate production behavior.
