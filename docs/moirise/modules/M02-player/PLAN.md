# M02 — PLAYER — PLAN DÉTAILLÉ CANONIQUE

## 1. Mission et ownership
Créer l'identité Player persistante, le profil, les préférences, la confidentialité, l'attribution et le contexte personnel utilisé par le SYSTEM sans transformer le profil en diagnostic psychologique.
Ce module possède les comportements listés ci-dessous. Une dépendance ne devient pas propriété locale simplement parce que le module l'affiche.

## 2. Fonctionnalités couvertes
### 1. Player bootstrap
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 2. Public profile
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 3. Private profile
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 4. Handle uniqueness
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 5. Avatar upload
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 6. AI avatar generation
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 7. Preferences
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 8. Privacy controls
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 9. Activity history
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 10. Creation history
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 11. Game history
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 12. Collection view
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 13. Player Memory
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 14. MORISE DNA signals
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 15. Data export/deletion
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

### 16. Blocking/mute preferences
Définition : cette capacité est une responsabilité explicitement testable du module.
Entrée : une intention utilisateur ou un événement autorisé.
Sortie : une projection, une mutation ou un résultat validé.
Propriétaire : M02.
Règle : aucune action ne peut contourner l'autorisation canonique du propriétaire.

## 3. Parcours nominaux
1. Bootstrap : authenticated auth user → ensure Player → create default privacy/preferences idempotently.
2. Avatar : request → capability AVATAR_GENERATION/upload → safety validation → preview → confirm → profile update.
3. Privacy : user chooses visibility → validate → persist → emit preference event → invalidate public projection.
4. DNA evidence : validated action → evidence record → M05/M15 DNA processor → contextual possibility.
5. Deletion : verify actor → classify data → delete/anonymize according to retention policy → revoke caches/references.

## 4. Modèle de domaine
Player; PublicProfileProjection; PlayerPreferences; PrivacySettings; AvatarRef; PlayerMemoryRef; DNAEvidence.
Pour chaque entité : ownerId/actor relation, lifecycle, timestamps, version, privacy class, retention, deletion policy, indexes, uniqueness et audit lorsque nécessaire.

## 5. États
ABSENT → BOOTSTRAPPING → ACTIVE; ACTIVE → LIMITED/DISABLED; avatar REQUESTED → VALIDATING → ACTIVE/REJECTED.
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
M15 may assist avatar, writing, translation, recommendations and DNA candidate signals, but never changes identity/role/permissions directly.
L'intégration se fait par Capability ID et M15. Aucun composant ne dépend directement d'un provider.

## 8. Sécurité
auth.users.id as authority; owner-only mutations; public projection separated; private memory not provider-readable by default.

## 9. Données et confidentialité
Player; PublicProfileProjection; PlayerPreferences; PrivacySettings; AvatarRef; PlayerMemoryRef; DNAEvidence.
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
idempotent bootstrap, secure profile ownership, privacy matrix, avatar validation, bounded Player Context, delete/recovery tested.

## 15. Definition of DONE
Fonctionnalités implémentées + autorisation serveur + persistence + événements + états de récupération + tests + navigateur desktop/mobile + sécurité + observabilité + documentation de handoff.

## 16. Interactions cross-module
Les effets sortants sont des événements ou des contrats explicites. Si une fonction traverse plusieurs modules, le module source conserve son ownership et les consommateurs ne recopient pas sa règle.

## 17. No-new-button rule
Une fonctionnalité interne de PLAYER n'ajoute pas une nouvelle porte principale sans décision d'architecture. Le SYSTEM expose la capacité au bon moment.