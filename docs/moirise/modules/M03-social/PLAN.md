# M03 — SOCIAL + PRIVATE MESSAGING — PLAN DÉTAILLÉ CANONIQUE

## 1. Mission et ownership
Fournir le réseau social et la messagerie privée comme une seule capacité sociale cohérente : publication, interaction, relations, conversations, partage et traduction contextuelle.
Ce module possède les comportements listés ci-dessous. Une dépendance ne devient pas propriété locale simplement parce que le module l'affiche.

## 2. Fonctionnalités couvertes
### 1. Feed
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 2. Posts
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 3. Comments
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 4. Reactions
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 5. Follows/relations
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 6. Sharing
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 7. Moment Cards
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 8. Private conversations
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 9. Message send/edit/delete
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 10. Read receipts
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 11. Presence/typing
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 12. Attachments
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 13. Conversation translation
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 14. Social recommendations
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 15. Block/mute enforcement
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 16. Report hooks
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M03.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

## 3. Parcours nominaux
1. Post : compose → validate → visibility → persist → POST_CREATED → feed/read models.
2. Comment/reaction : authorize target → validate state → idempotent mutation → event.
3. Private message : recipient policy → anti-abuse → persist → realtime delivery → read receipt.
4. Translation : explicit request → noTranslate mask → cache/local/provider path → translated view without replacing source.
5. Moment share : source result → privacy projection → share token → recipient enters relevant experience.

## 4. Modèle de domaine
Post; Comment; Reaction; Follow; Conversation; Participant; Message; AttachmentRef; ReadReceipt; Presence; ShareToken; TranslationCache.
Pour chaque entité : ownerId/actor relation, lifecycle, timestamps, version, privacy class, retention, deletion policy, indexes, uniqueness et audit lorsque nécessaire.

## 5. États
post DRAFT→PUBLISHED→EDITED/DELETED; message COMPOSING→SENT→DELIVERED→READ/FAILED; conversation ACTIVE/ARCHIVED.
Chaque transition doit posséder une guard testable. Une mutation invalide ne produit pas d'état partiel.

## 6. Interface utilisateur
Le module fournit :
- état initial compréhensible ;
- loading ;
- success ;
- empty lorsqu'il n'y a réellement aucun résultat ;
- error ;
- unavailable ;
- degraded si une dépendance optionnelle est indisponible.
Les écrans mobiles utilisent des actions tactiles sans duplication de l'application.

## 7. IA
Social Intelligence may propose people/content/community candidates from allowed non-sensitive signals. It cannot expose private affinity or read private conversations outside explicit scope.
L'intégration se fait par Capability ID et M15. Aucun composant ne dépend directement d'un provider.

## 8. Sécurité
conversation membership; block/mute; signed attachments; private content excluded from general telemetry/AI memory.

## 9. Données et confidentialité
Post; Comment; Reaction; Follow; Conversation; Participant; Message; AttachmentRef; ReadReceipt; Presence; ShareToken; TranslationCache.
Les données privées ne sont pas ajoutées aux analytics généraux ou aux memories globales par défaut.

## 10. Dépendances et contrats
Le module communique par use cases, événements et projections. Il ne modifie pas directement les tables d'un autre module.

## 11. Cas limites
Double-clic, retry réseau, session expirée, conflit concurrent, record supprimé, cache stale, provider indisponible, worker perdu, policy changée pendant l'opération, payload malveillant, résultat tardif, changement de version.

## 12. Observabilité
Chaque mutation critique associe requestId/traceId et une preuve de résultat. Les contenus privés sont minimisés.

## 13. Performance
Les listes sont bornées/paginées ; les opérations lourdes sont asynchrones ; les médias et engines lourds sont lazy-loaded ; l'IA optionnelle ne bloque pas le shell.

## 14. Acceptance
feed, private messaging, group handoff, sharing, translation, mobile composer, duplicate-send protection, privacy tests.

## 15. Definition of DONE
Fonctionnalités implémentées + autorisation serveur + persistence + événements + états de récupération + tests + navigateur desktop/mobile + sécurité + observabilité + documentation de handoff.

## 16. Interactions cross-module
Les effets sortants sont des événements ou des contrats explicites. Si une fonction traverse plusieurs modules, le module source conserve son ownership et les consommateurs ne recopient pas sa règle.

## 17. No-new-button rule
Une fonctionnalité interne de SOCIAL + PRIVATE MESSAGING n'ajoute pas une nouvelle porte principale sans décision d'architecture. Le SYSTEM expose la capacité au bon moment.