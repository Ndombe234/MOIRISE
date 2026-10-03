# MOIRISE — CONTEXT + MEMORY — CONCEPTION TECHNIQUE D100K
## 0. Autorité
Ce document est la spécification technique canonique du mécanisme transversal de compréhension du contexte, résolution d'entités et mémoire utilisable par le SYSTEM et MORISE AI.
Owner orchestration : M15. Source de données Player : M02. Runtime/session boundary : M01. Retrieval/adaptation : M13.
Aucun module ne recrée son propre moteur de mémoire.

## 1. Objectif observable
MOIRISE doit comprendre une réponse humaine comme un ensemble de faits structurés et reliés, même lorsque l'utilisateur donne les informations en plusieurs phrases, dans un ordre non linéaire, avec des pronoms, des corrections, du code-switching ou des détails imbriqués.

Exemple canonique de comportement :
Utilisateur : « J'habite en France. »
Puis : « À Paris. »
Puis : « Dans telle rue, bâtiment 15. »
Puis : « Sous tel repère, appartement 2, porte bleue, porte 14. »
Le système ne remplace pas « France » par « Paris ». Il construit une hiérarchie :
COUNTRY → CITY → STREET → BUILDING → LANDMARK/REFERENCE → UNIT → ENTRANCE/DOOR.
Chaque niveau conserve sa provenance, sa confiance, sa validité temporelle et ses règles de confidentialité.

Même principe pour :
apparence déclarée → teint/catégorie auto-déclarée → coiffure → vêtements actuels → accessoires ;
profil → âge déclaré → situation de vie déclarée → préférences ;
activité courante → objectif → contexte de session.
Aucune caractéristique inconnue n'est inventée ou déduite silencieusement.

## 2. Unités de contexte
Chaque observation devient un ContextFact :
- factId
- actorRef
- category
- fieldPath
- rawValue
- normalizedValue
- language
- sourceTurnId
- sourceSpan
- provenance = USER_EXPLICIT | SYSTEM_STATE | VERIFIED_EXTERNAL | DERIVED
- confidence = 0..1
- temporalScope = SESSION | CURRENT | UNTIL_CHANGED | DATE_RANGE | PERMANENT_PROFILE
- sensitivity = NORMAL | PERSONAL | SENSITIVE | HIGHLY_SENSITIVE
- storagePolicy
- visibilityPolicy
- consentBasis
- createdAt
- observedAt
- supersedesFactId?
- status = ACTIVE | SUPERSEDED | REJECTED | EXPIRED | DELETED

## 3. Hiérarchie d'entités
LocationContext doit supporter au minimum :
country
administrativeArea
city
district
postalArea
street
building
landmark
property
unit
floor
entrance
door
freeformReference

Le graphe n'est pas une chaîne de texte : chaque nœud possède son propre ID et ses relations parent/enfant.
Exemple :
France(id=L1)
→ Paris(id=L2)
→ street(id=L3)
→ building-15(id=L4)
→ unit-2(id=L5)
→ entrance-blue(id=L6)
→ door-14(id=L7)

Une nouvelle précision ajoute un nœud ou enrichit le bon nœud ; elle ne détruit pas les niveaux déjà valides.

## 4. Profil vs contexte éphémère
MORISE sépare strictement :
A. Profile memory : informations durables explicitement choisies.
B. Session memory : faits utiles à la session courante.
C. Task memory : contexte temporaire d'une tâche.
D. World/game memory : état produit.
E. Conversation memory : faits issus des échanges.
F. Derived signals : signaux calculés, jamais présentés comme des faits utilisateur.

Une information ne passe pas automatiquement d'une catégorie à l'autre.

## 5. Sensibilité et minimisation
Règle générale : comprendre n'oblige pas à stocker.
- Adresse exacte, appartement, porte, coordonnées précises : par défaut SESSION/TASK, non persistés.
- Apparence actuelle et tenue : CONTEXTUELLE avec expiration courte.
- Âge déclaré : profil seulement si l'utilisateur le fournit pour ce but et que la politique d'âge du produit l'autorise.
- Origine/race/ethnicité ou autre attribut sensible : jamais inféré ; stockage persistant uniquement avec consentement explicite et justification de fonctionnalité.
- Vie privée/foyer : stockage minimal, finalité explicite.
- Les données sensibles ne doivent jamais être copiées dans les logs, analytics, prompts de fournisseur ou événements publics.

## 6. Pipeline d'ingestion
USER INPUT
→ LANGUAGE DETECTION
→ SEGMENTATION
→ ENTITY/ATTRIBUTE EXTRACTION
→ COREference RESOLUTION
→ CANONICALIZATION
→ RELATION BUILD
→ TEMPORAL CLASSIFICATION
→ SENSITIVITY CLASSIFICATION
→ CONSENT/POLICY CHECK
→ CONFLICT DETECTION
→ DEDUPLICATION
→ MEMORY WRITE OR SESSION-ONLY BUFFER
→ EVENT AFTER COMMIT
→ RETRIEVAL INDEX UPDATE

L'extracteur doit produire des candidats, pas des mutations autoritaires.
Toute mutation durable passe par M02/M01/M15 selon l'owner.

## 7. Résolution d'entités
Le moteur doit reconnaître :
- synonymes et variantes linguistiques ;
- fautes mineures ;
- articles/prépositions ;
- unités numériques ;
- pronoms et références (« là », « chez moi », « le bâtiment précédent ») ;
- ellipses (« Paris » signifie une précision de la location active si le contexte le permet) ;
- corrections (« non, pas 14, 41 »).

Priorité :
1. référence explicite dans le même tour ;
2. référence explicite récente ;
3. relation active de session ;
4. entité canonique déjà connue ;
5. demande de clarification.

Jamais :
« probable » → « certain » sans signal suffisant.

## 8. Coreference et continuité
Le contexte conversationnel conserve un ActiveContextFrame :
- currentActor
- currentTopic
- currentLocation
- currentTask
- currentPeople
- currentObjects
- currentExperience
- unresolvedReferences
- lastExplicitCorrections

Une phrase suivante peut enrichir un nœud actif sans répéter son nom.
Exemple :
« France » → currentLocation.country
« Paris » → currentLocation.city
« rue X » → currentLocation.street
« bâtiment 15 » → currentLocation.building
« appartement 2 » → currentLocation.unit
« porte bleue » → currentLocation.entrance
« porte 14 » → currentLocation.door

## 9. Conflits et corrections
Ne jamais écraser silencieusement une donnée contradictoire.
Si :
age = 20 puis age = 21,
le nouveau fait devient candidat de remplacement ; le système demande confirmation lorsque la donnée est persistante/sensible, ou applique latest-explicit-wins pour un contexte de session non sensible.
Les anciennes valeurs restent auditables comme SUPERSEDED tant que la politique de rétention l'autorise.

Pour les corrections négatives :
« je ne vis pas seul » doit invalider l'assertion contradictoire, pas être ajouté comme une deuxième vérité.

## 10. Retrieval
M15/M13 ne transmettent pas toute la mémoire à chaque prompt.
Le Context Retrieval Engine calcule :
relevance × recency × authority × taskFit × userVisibility × privacyEligibility.
Le résultat est structuré :
ProfileFacts[]
SessionFacts[]
RelevantConversationFacts[]
WorldState[]
UnresolvedItems[]
Never transmit disallowed facts.

Chaque résultat possède source/provenance afin que l'IA sache :
« utilisateur l'a déclaré » ≠ « système l'a déduit ».

## 11. AI prompt boundary
Avant chaque tâche, M15 fabrique un ContextPacket :
- actorRef
- locale
- current request
- explicit recent facts
- relevant durable facts
- current world/task state
- authorized memory
- forbidden data
- confidence/conflicts
- tool permissions

Le modèle ne doit pas recevoir uniquement un paragraphe résumé susceptible de perdre la hiérarchie.

## 12. Questions de clarification
Le système demande uniquement la précision qui manque pour l'action courante.
Exemples :
- Pour afficher la météo : city suffit.
- Pour livrer ou utiliser une adresse exacte : les champs nécessaires sont demandés explicitement.
- Pour personnaliser une interface : préférences pertinentes seulement.
- Pour connaître l'apparence : demander au joueur s'il souhaite la décrire ; ne jamais l'inventer.

La réponse « France » n'est donc pas un état final universel ; c'est un fait partiel.
La machine sait que country est rempli mais city/street/etc. sont UNKNOWN.

## 13. Multilingue
Le parseur conserve le raw text + langue originale et normalise vers une représentation canonique.
Les valeurs ne sont pas traduites au point de perdre l'entité.
« France », « France », « Francia », « Frankreich » peuvent référer au même countryId sans perdre le texte source.

## 14. Privacy firewall
Avant stockage, chaque champ reçoit :
storageScope
retention
visibility
encryption requirement
provider eligibility
analytics eligibility
export/delete eligibility

Exact-location fields ne doivent jamais être envoyés à un fournisseur de génération si la tâche n'en dépend pas.
Les systèmes de logs utilisent des redactions structurées.

## 15. Memory lifecycle
CREATE → VALIDATE → STORE → RETRIEVE → USE → UPDATE/SUPERSEDE → EXPIRE/DELETE.
Une mémoire expirée ne doit pas réapparaître via cache, vector index ou projection.

## 16. Data contracts
ContextFact :
{
 id,
 actor_ref,
 field_path,
 value_ref,
 value_type,
 source_turn_id,
 provenance,
 confidence,
 sensitivity,
 temporal_scope,
 valid_from,
 valid_until,
 consent_basis,
 visibility,
 status,
 created_at,
 updated_at
}

ContextRelation :
{
 source_fact_id,
 relation_type,
 target_fact_id,
 confidence,
 source_turn_id,
 status
}

ContextCorrection :
{
 correction_id,
 target_fact_id,
 replacement_fact_id?,
 reason,
 actor_ref,
 confirmed,
 created_at
}

ContextPacket :
{
 request_id,
 actor_ref,
 locale,
 active_frame,
 explicit_facts,
 relevant_memory,
 unresolved_references,
 conflicts,
 privacy_filter,
 tool_authority
}

## 17. Events
context.fact.observed
context.fact.normalized
context.relation.created
context.correction.recorded
context.fact.superseded
context.fact.expired
context.fact.deleted
context.retrieval.performed
Ces événements ne contiennent pas de valeur sensible en clair si un identifiant/référence suffit.

## 18. Security
Tenant isolation par actorRef.
Ownership check sur toute lecture/écriture de mémoire privée.
Pas de recherche mémoire par ID fourni par le client sans autorisation.
Pas d'exposition de l'adresse exacte via feed, analytics, ranking, social graph ou share card.
Pas de mémoire utilisateur injectée directement dans du code/outillage sans policy check.

## 19. Adversarial D100K matrix
Tester notamment :
- « France » puis « Paris » puis une rue ;
- correction pays/ville ;
- mêmes noms de ville dans plusieurs pays ;
- pronoms et ellipses ;
- changement de langue ;
- valeurs contradictoires ;
- suppression d'une mémoire ;
- expiration ;
- compte A tentant de lire le contexte du compte B ;
- contexte sensible demandé par un provider non autorisé ;
- cache contenant une ancienne adresse ;
- retrieval retournant un fait SUPERSEDED ;
- prompt injection dans une valeur mémoire ;
- texte volontairement ambigu ;
- session sans historique ;
- provider IA indisponible.

## 20. Browser acceptance
Les scénarios UI doivent vérifier que :
1. l'IA comprend une réponse courte ;
2. l'utilisateur peut enrichir sans répéter ;
3. l'UI montre ce qui a réellement été compris ;
4. l'UI permet correction/suppression ;
5. les champs privés ne fuitent pas ;
6. refresh/reconnexion ne détruisent pas les états autorisés ;
7. mobile et desktop produisent le même contexte canonique.

## 21. DONE gate
Conception D100K DONE seulement lorsque :
- schémas documentés ;
- ownership documenté ;
- privacy classes documentées ;
- ingestion/retrieval/correction définis ;
- tests positifs/négatifs définis ;
- browser acceptance définie ;
- sécurité définie ;
- observabilité définie ;
- chaque module propriétaire référence ce contrat ;
- implémentation réelle et preuves restent une étape séparée.

## 22. Exemple de vérité machine
Question IA : « Où habites-tu ? »
Réponse initiale : country=France.
État : country KNOWN, city UNKNOWN.
Réponse : « À Paris. »
État : country=France, city=Paris.
Réponse : « dans [une rue], bâtiment [15]. »
État : street KNOWN, building=15.
Réponse : « appartement [2], entrée bleue, porte [14]. »
État : unit=2, entrance=blue, door=14.
L'IA peut maintenant répondre à une tâche qui nécessite la hiérarchie autorisée, mais elle ne doit pas exposer ou persister la totalité de cette précision simplement parce qu'elle la connaît.

## 23. Interdictions
- pas d'inférence silencieuse d'attribut sensible ;
- pas de « profil psychologique » caché à partir de signaux ;
- pas d'écrasement silencieux des corrections ;
- pas de mémoire globale non autorisée ;
- pas de provider direct depuis l'UI ;
- pas de déclaration de DONE sur la base du seul document.
