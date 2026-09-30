# M04 — WORLD — PLAN DÉTAILLÉ CANONIQUE

## 1. Mission et ownership
Être la surface d'entrée principale vers la profondeur de MOIRISE : une expérience simple qui permet de comprendre quoi faire maintenant sans exposer toutes les capacités internes.
Ce module possède les comportements listés ci-dessous. Une dépendance ne devient pas propriété locale simplement parce que le module l'affiche.

## 2. Fonctionnalités couvertes
### 1. Home World
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 2. Discover entry
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 3. Play entry
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 4. Create entry
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 5. Communities entry
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 6. Activities entry
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 7. Events entry
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 8. Context cards
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 9. Detours
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 10. World loading states
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 11. Solo-first orientation
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 12. Shareable discovery
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 13. SYSTEM handoff
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M04.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

## 3. Parcours nominaux
1. Landing : Player context → compute relevant doors → render a small set of actions.
2. Detour : recent action + eligible novelty → optional contextual suggestion → accept/dismiss.
3. World-to-Play : intent → M06/M07 without exposing engine internals.
4. World-to-Create : intent → M08/M15 capability path.
5. World-to-Community : existing group or M11 candidate proposal.

## 4. Modèle de domaine
WorldContext; DoorDefinition; ContextCard; Detour; WorldSurfaceState; DiscoveryRef.
Pour chaque entité : ownerId/actor relation, lifecycle, timestamps, version, privacy class, retention, deletion policy, indexes, uniqueness et audit lorsque nécessaire.

## 5. États
BOOTING → READY; READY → CONTEXTUAL_SUGGESTION → READY; unavailable dependency → DEGRADED.
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
AI selects contextual presentation while M04 remains presentation owner and M13/M07 own filtering/ranking rules.
L'intégration se fait par Capability ID et M15. Aucun composant ne dépend directement d'un provider.

## 8. Sécurité
only authorized data; no fake popularity; no fabricated people/activity.

## 9. Données et confidentialité
WorldContext; DoorDefinition; ContextCard; Detour; WorldSurfaceState; DiscoveryRef.
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
first-time user understands main options, no wall of buttons, no fake content, mobile-first, deep links recover.

## 15. Definition of DONE
Fonctionnalités implémentées + autorisation serveur + persistence + événements + états de récupération + tests + navigateur desktop/mobile + sécurité + observabilité + documentation de handoff.

## 16. Interactions cross-module
Les effets sortants sont des événements ou des contrats explicites. Si une fonction traverse plusieurs modules, le module source conserve son ownership et les consommateurs ne recopient pas sa règle.

## 17. No-new-button rule
Une fonctionnalité interne de WORLD n'ajoute pas une nouvelle porte principale sans décision d'architecture. Le SYSTEM expose la capacité au bon moment.