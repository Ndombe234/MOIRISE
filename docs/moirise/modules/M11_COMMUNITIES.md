# MOIRISE Module 11 — COMMUNITIES

## 1. Purpose

Créer les groupes, clans, communautés et espaces collectifs structurés.

## 2. Community structure

Community
→ members
→ roles
→ posts
→ events
→ games
→ moderation
→ settings

## 3. Roles

Minimum :
- owner ;
- admin ;
- moderator ;
- member.

Les permissions doivent être explicites et testées.

## 4. UI

Page communauté avec :
- identité ;
- contenu ;
- membres ;
- activités ;
- événements ;
- jeux ;
- administration selon rôle.

Mobile : sections empilées, pas de dashboard minuscule illisible.

## 5. MORISE

Peut :
- résumer une communauté ;
- proposer une activité ;
- assister un admin ;
- traduire ;
- aider à organiser.

Elle ne doit pas attribuer des rôles critiques seule.

## 6. Data

communities
community_members
community_roles
community_posts
community_settings
community_events

## 7. Events

COMMUNITY_CREATED
MEMBER_JOINED
MEMBER_LEFT
ROLE_CHANGED
COMMUNITY_EVENT_CREATED
COMMUNITY_ACTIVITY_CREATED

## 8. AI

TEXT_ASSISTANCE
TRANSLATION
MODERATION
RECOMMENDATION
EVENT_PLANNING

## 9. Security

RLS stricte par communauté.
Administration vérifiée côté serveur.

## 10. Performance

Paginer membres et contenus.
Charger l'onglet actif uniquement.

## 11. Tests

- create/join/leave ;
- roles ;
- RLS ;
- moderation ;
- mobile ;
- empty community ;
- unavailable AI.

## 12. Acceptance

Une communauté peut fonctionner entièrement sans IA.

## 13. Do not modify

Ne pas mettre ici le moteur d'événements global ni AI Lab.
