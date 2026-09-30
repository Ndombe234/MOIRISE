# MOIRISE Module 06 — PLAY

## 1. Purpose

Reconstruire l'espace de jeu depuis zéro. Le module doit supporter des expériences 2D, 3D et hybrides sans charger tous les moteurs au démarrage.

## 2. UI

Entrées :
- découvrir ;
- jouer ;
- reprendre ;
- solo ;
- collectif ;
- création si autorisée.

Chaque jeu est une unité lazy-loaded décrite par un Game Manifest.

## 3. Actions

- lancer ;
- mettre en pause ;
- reprendre ;
- quitter ;
- terminer ;
- partager ;
- recommencer ;
- signaler un problème.

## 4. MORISE

Avant le jeu :
« Prêt ? Cette expérience a été sélectionnée pour toi. »

Pendant :
intervention minimale, uniquement si l'expérience le prévoit.

Après :
« Session terminée. »
Puis résultats validés.

MORISE ne doit pas distraire le joueur avec des messages inutiles.

## 5. Play Session

Créer :
play_sessions
play_events
play_results

Lifecycle :
STARTED → ACTIVE → PAUSED? → COMPLETED/ABANDONED/FAILED

## 6. Server validation

Un résultat de jeu n'est jamais accepté uniquement depuis le client.

Pipeline :
CLIENT RESULT → AUTH → SESSION CHECK → GAME RULE VALIDATION → DUPLICATE CHECK → PROGRESSION EVENT

## 7. AI

Capabilities :
- game recommendation ;
- narrative ;
- hint ;
- dynamic difficulty selon règles ;
- analysis ;
- game generation via Module 8.

## 8. Provider usage

Aucun jeu ne dépend d'un provider externe pour son fonctionnement de base.

## 9. Performance

- engine lazy loading ;
- assets lazy ;
- texture/audio streaming ;
- cleanup à la sortie ;
- mémoire libérée après session lorsque possible.

## 10. Security

- session token ;
- anti-tamper ;
- validation serveur ;
- rate limiting ;
- payload limits.

## 11. Tests

- start/stop/resume ;
- completion ;
- tampered result ;
- duplicate result ;
- auth/unauth;
- mobile ;
- slow network ;
- provider unavailable ;
- engine loading failure ;
- no blank screen.

## 12. Acceptance

PLAY fonctionne avec au moins une expérience réelle, validée et réversible. Le module ne doit pas être considéré terminé sur la seule présence d'une interface.

## 13. Do not modify

Ne pas construire ici Game Factory complète ni Shared Game Engine complet.

## 14. New-AI handoff

Tout nouveau jeu doit passer par Game Registry/Game Manifest et respecter les contrats du Shared Engine.


---

# M06 — PLAY — COMPLETE TECHNICAL CONTRACT

## Responsibility
M06 is the player-facing game hub: catalog presentation, launch eligibility, continue-playing, favorites, history and session lifecycle. M08 creates packages; M09 executes them; M10 owns social scoring.

## Data
`game_catalog_refs`, `game_favorites`, `game_history`, `play_sessions`.

## Types
```ts
interface PlayEntry { gameId:string; title:string; mode:'2d'|'3d'; status:'ready'|'processing'|'unavailable'; packageVersion:number; thumbnailRef?:string; }
interface PlaySession { id:string; gameId:string; playerId:string; startedAt:string; endedAt?:string; status:'active'|'completed'|'aborted'; }
```

## Launch pipeline
`select → authorization/eligibility → package metadata → integrity/version check → preload → M09 mount → create session → play → result/save → unmount → history`.

## Catalog source
M06 reads catalog references. It never generates a package and never trusts client-provided package paths. M07 owns discovery/ranking.

## Offline/degraded
An offline-capable package may launch from validated cache. Non-cached content displays unavailable/retry state. Runtime errors return to Play without blanking the shell.

## AI boundary
AI may recommend games or explain controls through capabilities. It does not decide access permissions and does not execute packages. Provider URLs remain outside M06.

## UI
Play is one primary door. Continue, favorites, categories, created games and history are internal sections/tabs. Do not add permanent buttons for every game type.

## Performance
Virtualize game grids/lists. Lazy-load thumbnails. Preload only the selected/next package. Keep game runtime isolated from shell rendering.

## Tests
Launch failure; corrupt package; version mismatch; resume; history privacy; offline cache; session cleanup; cancellation; mobile controls; browser back; AI/provider outage.

## Done gate
A player can find, launch, resume and exit a validated game safely, with deterministic recovery when runtime or network services fail.



## 17. Canonical implementation runbook

1. Create one game catalog projection consumed by PLAY; never let the client invent game package URLs.
2. Make launch eligibility resolve from authenticated player, game status, package version and policy.
3. Create the play-session lifecycle before mounting the runtime.
4. Pass only the canonical GameManifest/GamePackage contract into M09.
5. Treat client results as untrusted evidence; send them through server validation before progression/social effects.
6. Persist history after authoritative completion and reconcile interrupted sessions on next launch.
7. Unmount engines and release media/resources when leaving a session.
8. Provide offline launch only for validated cached packages that are explicitly marked offline-capable.
9. Keep AI recommendations optional and outside the launch critical path.
10. Add tests for bad package, version mismatch, runtime crash, resume, duplicate completion, slow network and mobile controls.

### Canonical server contracts
listPlayableGames, startPlaySession, resumePlaySession, abandonPlaySession, submitGameResult, finalizePlaySession.

### Completion proof
A real game can be launched, played, exited and recovered without any AI provider being online.

## 21. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.