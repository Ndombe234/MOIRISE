# M06 — PLAY — PLAN CANONIQUE

Surface Player de jeu : catalogue, quiz, jeux 2D/3D, sessions, sauvegardes, résultats, partage et récupération.

Fonctionnalités : Play hub; catalogue; quiz; runtime 2D; runtime 3D; sessions; pause/reprise; saves versionnés; result validation; leaderboards; share tokens; mobile controls; crash recovery; quiz anti-replay.

IA : recommandations et adaptation éventuelle via M15; le runtime reste fonctionnel sans provider.

Intégrité : le client ne décide ni XP ni récompense; le package de jeu est sandboxé; les résultats compétitifs sont validés côté serveur.

DONE : toutes les actions visibles testées, mobile/desktop, erreurs, reconnect, double submit et dépendances indisponibles.


## Detailed feature behavior

### PLAY NOW
The primary Play action does not open a catalogue. It requests a context-aware experience recommendation and creates a server-owned session only after the Player confirms launch.

### Experience families
Pulse = 30–90 second skill challenge.
Drift = small exploration.
Forge = creation-oriented mini-experience.
Duel = asynchronous result challenge.
Quest = progression-linked experience.
World = heavier 3D experience when spatial interaction justifies the cost.

### Session lifecycle
Discovery → Preview → Start → Run → Pause/Resume → Submit → Validate → Result → Optional Moment/Share → Progression.

### Honest selection
The selection reason must be based on real inputs such as recent activity, explicit interests, time budget or an unfinished activity. It must never claim that “other players are playing” without verified data.

### AI interaction
M15 can propose which experience best matches the context, but M06 validates eligibility and starts the session. Generated or adaptive content cannot bypass result validation.

### Edge cases
Expired session; runtime crash; duplicate completion; save schema mismatch; provider unavailable; network reconnect; unsupported device; player leaves mid-session.

### Completion evidence
One-button Play surface, session integrity tests, result validator tests, save/resume tests, share privacy tests, mobile 390x844 and desktop evidence.