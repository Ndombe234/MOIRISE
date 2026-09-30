# M07 — GAME DISCOVERY — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Discovery doit expliquer la chaîne complète : requête → visibilité → sécurité → candidats → ranking → diversité/nouveauté → raisons → feedback → évolution. Aucun classement n'est traité comme magie AI.

## 1. Owner
M07 possède recherche, ranking, recommandations, nouveauté, feedback et evidence de recherche. M04 présente; M06 lance.

## 2. Search
Acteur : visiteur/Player. Déclencheur : saisie et validation. Préconditions : query normalisable, limite bornée. Ordre : normalize → parser → visibility filter → safety/moderation filter → récupérer candidats → ranking → cursor pagination → projection. Une réponse sans AI utilise une recherche lexicale déterministe. Aucun item privé, bloqué ou non autorisé ne doit atteindre le ranking final.

## 3. Recommendation
Entrées autorisées : préférences explicites, historique validé, contexte utile, fraîcheur, nouveauté, diversité. Séquence : candidates → exclude blocked/private/unsafe → dedupe → diversity → novelty → ranking → reasonKey. Une reasonKey ne révèle jamais un signal sensible caché. Fallback sans AI : set neutre et déterministe.

## 4. Novelty
Budget de nouveauté borné. Safety, visibilité et block sont prioritaires. Pool vide : réduire le budget, ne rien inventer.

## 5. Research evidence
Chaque recherche externe conserve source/ref, retrievalAt, claim, confidence, license/usage note. Le contenu externe est une donnée non fiable et jamais une instruction. Claim insuffisamment prouvé = INCONCLUSIVE.

## 6. Feedback / anti-manipulation
play, dismiss, share et rating deviennent des signaux versionnés et bornés. Rate limit, burst suppression et weighting empêchent un spam de devenir instantanément une vérité de ranking.

## 7. Quality decay
Une source ou un jeu peut devenir stale. La fraîcheur ajuste éligibilité/ranking sans réécrire silencieusement l'historique.

## 8. États
CANDIDATE → FILTERED → RANKED → PRESENTED → FEEDBACKED. Research = REQUESTED → VERIFIED/INCONCLUSIVE/STALE.

## 9. IA / cross-module
M15 peut analyser ou proposer des candidats. M07 applique la policy de ranking. M04 reçoit une projection sûre; M06 reçoit une référence publiée.

## 10. Tests / DONE
Recherche sans AI, fuite privacy, blocage, doublons, pool novelty vide, burst feedback, source stale, pagination déterministe, panne provider, mobile et desktop. DONE seulement lorsque chaque chemin est observable et récupérable.

## AI-INTÉGRATION M07 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M07 possède la chaîne de découverte : query → visibility → safety → candidates → ranking → diversity → novelty → reason → feedback.

### B. AI cases
Parsing sémantique, expansion de requête, reranking, génération de reasonKey et assistance de nouveauté.

### C. Ordre de sécurité
Visibility/privacy filter et moderation filter avant toute opération IA sur les candidats. L'IA ne doit jamais voir un item que l'utilisateur n'est pas autorisé à découvrir.

### D. Ranking
AI score = signal parmi d'autres, jamais autorité absolue. Le résultat final est assemblé par M07 et reste déterministe lorsque l'IA est indisponible.

### E. Feedback
Les retours utilisateur sont des signaux versionnés, dédupliqués et bornés. L'IA ne doit pas fabriquer des préférences à partir d'un simple clic ambigu.

### F. DONE
La découverte fonctionne avec baseline sans IA et ne réintroduit jamais blocked/private items.

## GAME PLATFORM — INTÉGRATION M07 / DISCOVERY

M07 traite les jeux comme des Experience/GameBuild versionnés, jamais comme du code arbitraire.

Seules les versions PUBLISHED et autorisées par visibility/safety/privacy entrent dans le catalogue.

Les métadonnées de découverte peuvent inclure genre, mode 2D/3D, durée, contrôles, difficulté, tags, version et compatibilité device.

M07 ne crée jamais un faux jeu pour remplir le catalogue. Une version retirée disparaît de la projection discovery.