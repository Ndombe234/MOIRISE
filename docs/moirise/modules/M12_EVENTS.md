# MOIRISE Module 12 — EVENTS

## 1. Purpose

Système d'événements individuels et collectifs : activités, défis, compétitions, événements communautaires et SYSTEM.

## 2. Event lifecycle

DRAFT → VALIDATED → SCHEDULED → ACTIVE → COMPLETED → ARCHIVED

## 3. UI

Créer/voir/rejoindre/annuler lorsque permis.
Afficher horaires, objectif, participants, récompenses et statut.

## 4. MORISE

Peut proposer :
« Votre communauté semble prête pour une activité. »

Elle ne publie pas un événement sensible sans autorisation.

## 5. Data

events
event_participants
event_rules
event_results
event_rewards

## 6. Events

EVENT_CREATED
EVENT_STARTED
EVENT_JOINED
EVENT_COMPLETED
EVENT_CANCELLED

## 7. AI

EVENT_PLANNING
TEXT_GENERATION
RECOMMENDATION
MODERATION
CREATIVE_MEDIA

## 8. Provider independence

Un événement simple doit fonctionner sans provider externe.

## 9. Security

Permissions organisateur/participant.
Validation côté serveur.
Protections contre double participation et faux résultats.

## 10. Performance

Scheduler central.
Pas de polling agressif par navigateur.

## 11. Tests

- lifecycle ;
- timezone ;
- join/leave ;
- duplicate ;
- cancelled event ;
- expired event ;
- mobile ;
- provider down.

## 12. Acceptance

Aucun événement ne peut être annoncé comme actif s'il n'existe pas dans l'état serveur.

## 13. Do not modify

Adaptive World transforme éventuellement les signaux d'événements, mais ne doit pas être implémenté ici.
