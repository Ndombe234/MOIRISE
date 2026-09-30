# M12 — EVENTS — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
M12 est la seule autorité des états futurs réels : événement, inscription, calendrier, tournoi et continuation. « Reviens demain » n'est permis que si une vraie continuation est enregistrée.

## 1. Owner
M12 possède Event, EventVersion, registration, brackets/matches et ContinuationRef. Notification delivery est transversal; M12 fournit la vérité de l'état.

## 2. Create event
Owner autorisé → validate title, description, timezone, start/end, rules, visibility → créer EventVersion → état DRAFT/SCHEDULED → schedule transition.
Un événement ne devient futur qu'après commit d'un état SCHEDULED valide.

## 3. Registration
Player → open event → vérification state OPEN, eligibility, block/privacy, capacity → unique EventRegistration → event REGISTERED.
Retry avec même commandId = même registration. Event complet/fermé = état explicite, jamais faux succès.

## 4. Start/end scheduler
Trusted server time → charger EventVersion → vérifier state attendu + fenêtre temporelle → transition SCHEDULED→LIVE ou LIVE→ENDED → event.
Une relance du scheduler doit être idempotente grâce à la guard state+version.

## 5. Tournament
Freeze entrants avant bracket. Générer bracket avec rulesVersion déterministe. Chaque match reçoit participants, round, seed, state et result source.
Aucun résultat final ne vient d'un bouton client; il vient d'une source validée M06/M10 selon contrat.

## 6. Continuation
Créer ContinuationRef seulement lorsque le prochain état réel existe : targetEvent, nextStartAt, sourceRef, eligibility et dedupeKey. Sans état futur confirmé, ne rien afficher.

## 7. Notification hook
M12 signale « event started/ending/reminder eligible ». Le service de notification déduplique par event+recipient+type et respecte quiet hours/preferences. Une notification ne crée pas l'événement.

## 8. États
Event DRAFT→SCHEDULED→LIVE→ENDED/CANCELLED. Registration OPEN/CLOSED. Tournament DRAFT→LOCKED→RUNNING→COMPLETED.

## 9. Tests / DONE
Timezone, daylight change, scheduler retry, event cancellation, full capacity, duplicate registration, tournament invalid result, continuation absent, quiet hours, mobile/desktop.

## AI-INTÉGRATION M12 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M12 est owner du lifecycle Event, des permissions organizer/participant et de l'admission des résultats. AI peut aider à rédiger un Event, proposer un planning, localiser le texte, suggérer des participants, préparer des rappels ou résumer les résultats. Toute modification passe par M12. Le contenu d'un Event est une donnée et non une instruction de confiance : aucune URL ou instruction injectée dans le texte n'est exécutée automatiquement. Participant privacy et organizer authorization sont revalidées avant commit. Sans AI, le lifecycle Event reste fonctionnel. DONE exige tests de permission, participant privacy, schedule conflict, prompt/tool injection, duplicate reminder et recovery.