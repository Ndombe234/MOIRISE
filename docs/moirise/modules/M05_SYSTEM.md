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
