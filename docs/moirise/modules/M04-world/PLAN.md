# M04 — WORLD — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Décrire une fonction comme « elle existe en France » n'est pas suffisant : la documentation doit pouvoir descendre jusqu'à Paris, la rue, le bâtiment, l'appartement et la porte. Dans MOIRISE cela signifie acteur → déclencheur → préconditions → entrées → étapes → mutation → projection → événement → erreur → reprise → sécurité → tests.

## 1. Owner
M04 possède la surface WORLD, sa contextualisation et ses handoffs. M04 ne devient pas propriétaire des données métier de PLAY, SOCIAL, COMMUNITIES ou EVENTS.

## 2. Home World
**Acteur :** visiteur ou Player.  
**Déclencheur :** ouverture de Home ou retour d'un autre écran.
**Préconditions :** shell READY; contexte minimal disponible.
**Entrées :** session context, locale, viewport, états réels récents autorisés.
**Séquence :** charger contexte minimal → vérifier privacy → sélectionner les 5–6 portes principales → sélectionner seulement les cartes éligibles → rendre LOADING puis READY.
**Mutation :** uniquement impression/dismissal lorsque cela est nécessaire; aucune mutation métier d'une autre feature.
**Projection :** SYSTEM, PLAYER, SOCIAL, WORLD, PLAY, CREATE, plus des cartes contextuelles.
**Échec :** une dépendance optionnelle absente donne DEGRADED; aucune donnée fictive n'est créée.
**Sécurité :** aucun faux compteur, faux utilisateur, fausse récompense ou contenu inventé.
**Tests :** premier passage, session absente, session expirée, aucune carte, source optionnelle indisponible, mobile, desktop.

## 3. Context Cards
**Acteur :** Player.
**Déclencheur :** un événement réel rend une action potentiellement pertinente.
**Préconditions :** source réelle; cooldown absent; player non occupé par une tâche qui doit rester prioritaire.
**Séquence :** récupérer source → vérifier visibilité → calculer pertinence → générer reasonKey → définir expiration/cooldown → afficher → enregistrer dismissal ou action.
**Mutation :** ContextCard + état d'exposition.
**Projection :** une action compréhensible avec raison courte.
**Échec :** source supprimée → carte retirée; player dismiss → suppression temporaire.
**Sécurité :** reasonKey ne doit pas révéler une donnée privée.

## 4. Detours
Un Detour est une possibilité facultative, pas une obligation.
**Suppression obligatoire pendant :** saisie de texte, lecture, partie, création, paiement ou autre tâche où une intervention interrompt l'intention; seuls les cas réellement critiques peuvent contourner cette règle.
**Étapes :** détecter contexte → vérifier signal réel → cooldown → choisir une action → présenter → retour à l'activité.
**Interdit :** faux compte à rebours, fausse rareté, « reviens demain » sans futur Event réel.

## 5. Handoffs
Lorsqu'un Player touche PLAY, CREATE, SOCIAL, PLAYER ou SYSTEM :
1. M04 crée un IntentEnvelope ;
2. il contient originModule, actorRef, intentType, targetRef éventuel, sourceEventRef et UI context minimal ;
3. la destination revalide l'autorisation ;
4. la destination possède la mutation.
M04 ne peut pas écrire directement les tables privées de la destination.

## 6. Solo-first orientation
Première visite :
1. afficher une explication minimale ;
2. donner une action réalisable seul ;
3. présenter ensuite des possibilités sociales sans les rendre obligatoires ;
4. enregistrer l'étape d'orientation ;
5. reprendre au même point en cas de retour.
Aucune progression artificielle n'est accordée pour simplement regarder une carte.

## 7. Shareable Discovery
Le partage suit : source → privacy projection → share token scoped → expiration → projection publique.
Si la source devient privée, le token est révoqué. Une carte publique ne doit jamais contenir une donnée qui n'était visible qu'en privé.

## 8. États
BOOTING → READY.  
READY → CONTEXTUALIZING → READY.  
READY → DEGRADED si dépendance optionnelle indisponible.
Une erreur de rendu ne doit pas supprimer la navigation de secours.

## 9. Données
WorldContext, DoorDefinition, ContextCard, Detour, WorldSurfaceState, IntentEnvelope, ShareToken.

## 10. IA
M15 peut proposer la présentation contextuelle. M04 contrôle l'expérience et applique les suppressions. M15 ne peut pas inventer de futur, d'utilisateur ou de récompense.

## 11. Tests et DONE
Vérifier deep links, refresh, mobile/desktop, suppression pendant typing/reading/playing/creating, absence de faux contenu, handoff refusé, token révoqué, dépendance optionnelle indisponible.