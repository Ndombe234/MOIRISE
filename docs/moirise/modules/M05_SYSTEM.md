# MOIRISE Module 05 — SYSTEM / PROGRESSION

## 1. Purpose

Créer l'interface SYSTEM de progression sans transformer l'application en écran rempli de messages SYSTEM.

## 2. UI

SYSTEM contient :
- niveau ;
- XP ;
- rang ;
- missions ;
- titres ;
- récompenses ;
- statistiques ;
- objectifs ;
- notifications système.

Le SYSTEM est une couche contextuelle qui peut apparaître comme overlay, panneau ou notification.

## 3. Actions

- ouvrir SYSTEM ;
- consulter progression ;
- ouvrir mission ;
- suivre mission ;
- réclamer récompense ;
- consulter titre ;
- consulter historique.

## 4. MORISE dialogue

Exemples :
« Nouveau titre débloqué. »
« Une nouvelle mission correspond à ce que tu viens de faire. »
« Progression enregistrée. »

Éviter les messages automatiques à chaque micro-action.

## 5. Progression model

Pipeline :
ACTION → EVENT → VALIDATED RULE → XP → LEVEL/UNLOCK → EVENT

La progression ne dépend pas d'un appel IA.

## 6. Data

player_progress
player_xp_events
player_titles
player_missions
player_rewards
system_notifications

## 7. AI

AI peut :
- proposer des missions ;
- expliquer ;
- adapter la présentation ;
- analyser des patterns ;
- générer des expériences contextualisées.

L'IA ne doit pas écrire directement l'XP en production sans passer par les règles de progression.

## 8. Events

XP_GRANTED
LEVEL_CHANGED
RANK_CHANGED
MISSION_CREATED
MISSION_COMPLETED
TITLE_UNLOCKED
REWARD_UNLOCKED

## 9. Security

Les résultats de jeu et récompenses doivent être validés côté serveur.
Pas de confiance dans une valeur envoyée par le navigateur.

## 10. Performance

SYSTEM peut être ouvert sans charger tous les modules.
Les historiques sont paginés.

## 11. Tests

- XP ;
- niveau ;
- rang ;
- mission ;
- récompense ;
- tentative frauduleuse ;
- duplicate event ;
- mobile ;
- offline read ;
- error state.

## 12. Acceptance

Le SYSTEM est utile, lisible et discret. Il enrichit l'expérience sans devenir une nuisance visuelle.

## 13. Do not modify

Ne pas placer le moteur AI complet dans ce module.

## 14. New-AI handoff

SYSTEM est une UI/progression layer. MORISE AI est le moteur central séparé.


---

# M05 — SYSTEM / PROGRESSION — COMPLETE TECHNICAL CONTRACT

## Responsibility
M05 owns authoritative XP, level, rank, progression rules, SYSTEM notifications and progression-facing HUD state. M14 owns inventory/rewards.

## Data
`player_progression`, `xp_events`, `system_notifications`, `progression_rules`.

## Types
```ts
interface Progression { playerId:string; level:number; xp:number; rank:string; version:number; }
interface XPEvent { id:string; playerId:string; source:string; amount:number; idempotencyKey:string; ruleVersion:number; createdAt:string; }
interface SystemNotice { id:string; playerId:string; kind:string; priority:'low'|'normal'|'high'; readAt?:string; }
```

## Authoritative calculation
All progression mutations run through one deterministic server function using a versioned ruleset. UI never calculates authoritative XP/rank. Each source event is idempotent and auditable.

## Event pipeline
`validated source event → authorize → validate amount/source → insert XP event → recompute progression → emit SYSTEM notice → invalidate player cache`.

## SYSTEM UX
Use concise contextual HUD/panels/toasts. Group low-priority changes. Persist important notices. Do not display SYSTEM text for every trivial action. Animation is subordinate to readability and can be reduced/disabled.

## AI boundary
AI can explain progression, recommend next actions or generate cosmetic text. It cannot grant XP, change rank, alter rules or mark events as valid.

## Security
Reject negative/overflow values unless explicitly defined by the ruleset. Server transactions prevent forged XP. Rule versions are immutable after publication.

## Performance
Cache progression read models per player with explicit invalidation after writes. Batch non-critical notification creation. Avoid polling; use realtime/event delivery where supported.

## Tests
XP idempotency; concurrent events; threshold boundaries; ruleset migration; unauthorized mutation; notice grouping/read state; cache invalidation; reconnect; mobile HUD; provider outage.

## Done gate
Progression is deterministic, versioned, auditable, recoverable and works with every AI provider offline.



## 17. Canonical implementation runbook

1. Create one authoritative progression read model per player.
2. Define immutable versioned progression rules.
3. Route all XP grants through one deterministic server transaction.
4. Require idempotency keys on source events that can be retried.
5. Recompute level/rank from authoritative events or a validated projection; never trust client XP.
6. Add SYSTEM notification grouping so low-priority events do not spam the player.
7. Keep titles/rewards references modular: M05 determines unlock eligibility; M14 owns inventory/reward grants.
8. Add server-side validation against negative/overflow values and impossible source events.
9. Add cache invalidation after progression writes and realtime/read reconciliation after reconnect.
10. Add audit trail for ruleset version, source event and resulting progression.
11. Test exact threshold boundaries, concurrent grants, duplicates, forged payloads, ruleset upgrades and rollback.
12. Validate mobile SYSTEM overlays and reduced-motion behavior.

### Canonical server contracts
getProgression, recordValidatedProgressionEvent, listSystemNotices, markSystemNoticeRead, explainProgression. Only the first two can change authoritative state, and both are server-authorized.

### Completion proof
The SYSTEM layer remains useful and visually calm while progression remains deterministic and independent of AI.

## 20. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.