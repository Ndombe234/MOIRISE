# M01 — FOUNDATION — PLAN DÉTAILLÉ CANONIQUE

## 1. Mission et ownership
Créer le socle invisible qui permet aux 14 autres modules d'exister sans se connaître directement : runtime, shell, identité de session, routing, sécurité primitive, contrats, événements, configuration, feature flags, observabilité et abstraction des capacités.
Ce module possède les comportements listés ci-dessous. Une dépendance ne devient pas propriété locale simplement parce que le module l'affiche.

## 2. Fonctionnalités couvertes
### 1. Application Shell
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 2. Routing Boundary
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 3. Auth/Session Boundary
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 4. Design System
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 5. Responsive System
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 6. Loading/Error/Empty/Unavailable/Degraded states
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 7. Event Bus
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 8. Capability Registry
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 9. Provider Registry boundary
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 10. AI Gateway
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 11. Configuration
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 12. Feature Flags
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 13. Storage abstraction
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 14. Health/Observability
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 15. Request/Trace correlation
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 16. Rate-limit primitives
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 17. Schema validation
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 18. Tenant isolation primitives
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M01.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

## 3. Parcours nominaux
1. Boot : process start → config validate → session restore → route resolution → READY/DEGRADED.
2. Navigation : route request → auth policy → module boundary → loading → data/action.
3. AI call : module → AI Gateway → capability ID → policy → M15.
4. Event : owner module → event envelope → subscribers without direct table writes.
5. Failure : boundary catches error → normalized AppError → recoverable surface.

## 4. Modèle de domaine
AppConfig; RouteDefinition; SessionContext; FeatureFlag; SystemEvent; CapabilityDefinition; ProviderDefinition; RequestTrace; AppError; TenantContext.
Pour chaque entité : ownerId/actor relation, lifecycle, timestamps, version, privacy class, retention, deletion policy, indexes, uniqueness et audit lorsque nécessaire.

## 5. États
COLD → BOOTING → CONFIGURED → SESSION_RESTORING → READY; READY → DEGRADED; fatal shell error → RECOVERABLE_ERROR.
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
Foundation exposes the gateway but never requires AI for boot. All later AI calls are typed and policy-mediated.
L'intégration se fait par Capability ID et M15. Aucun composant ne dépend directement d'un provider.

## 8. Sécurité
server-derived actorId; secrets server-only; schema validation; auth boundary; CSP and safe headers; no provider endpoint from browser; no service-role bundle.

## 9. Données et confidentialité
AppConfig; RouteDefinition; SessionContext; FeatureFlag; SystemEvent; CapabilityDefinition; ProviderDefinition; RequestTrace; AppError; TenantContext.
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
Application starts, routes do not white-screen, auth works, event bus and capability registry are tested, security boundaries are server-side, mobile/desktop shell works.

## 15. Definition of DONE
Fonctionnalités implémentées + autorisation serveur + persistence + événements + états de récupération + tests + navigateur desktop/mobile + sécurité + observabilité + documentation de handoff.

## 16. Interactions cross-module
Les effets sortants sont des événements ou des contrats explicites. Si une fonction traverse plusieurs modules, le module source conserve son ownership et les consommateurs ne recopient pas sa règle.

## 17. No-new-button rule
Une fonctionnalité interne de FOUNDATION n'ajoute pas une nouvelle porte principale sans décision d'architecture. Le SYSTEM expose la capacité au bon moment.