# MOIRISE Module 15 — META SYSTEM + AI LAB

## 1. Purpose

Construire la couche méta qui permet à MORISE d'observer, expérimenter, apprendre et proposer des améliorations sans perdre le contrôle du produit.

## 2. User-facing role

AI Lab n'est pas un écran obligatoire pour le joueur.

Les outils internes peuvent être réservés aux rôles autorisés.

## 3. Internal architecture

OBSERVATION
→ EXPERIENCE
→ EVALUATION
→ HYPOTHESIS
→ LEARNING CANDIDATE
→ EXPERIMENT
→ SANDBOX
→ BENCHMARK
→ SECURITY
→ POLICY GATE
→ CANARY
→ PRODUCTION
→ ROLLBACK

## 4. MORISE behavior

MORISE peut détecter une limite :
« Cette stratégie échoue trop souvent dans cette situation. »

Puis elle crée une hypothèse.

Elle ne doit jamais dire :
« J'ai réécrit mon cerveau. »
si aucune modification validée n'existe réellement.

## 5. Learning

Sources autorisées :
- interactions non sensibles ;
- feedback explicite ;
- expériences validées ;
- résultats de jeux ;
- résultats créatifs ;
- erreurs techniques ;
- observations PostHog autorisées.

## 6. PostHog

PostHog = observation/expérimentation/analytics.
PostHog ≠ mémoire profonde.
PostHog ≠ vérité.
PostHog ≠ décision autonome.

Secret serveur observé :
Posthog_API_KEY, valeur non exposée.

## 7. Code evolution

Candidate code est généré dans sandbox.

Obligatoire :
- typecheck ;
- tests ;
- lint ;
- security scan ;
- regression;
- benchmark ;
- comparison old/new.

Puis :
REJECT ou CANDIDATE ou CANARY ou PROMOTE.

## 8. Memory

Séparer :
- facts ;
- episodic experiences ;
- semantic relations ;
- skills ;
- strategies ;
- system state ;
- provenance.

## 9. Provider learning

Les résultats des providers externes sont traités comme des expériences.
Ils passent :
PROVENANCE → PRIVACY → SAFETY → QUALITY → ORIGINALITY/LICENSING → RELEVANCE → VALIDATION.

Une sortie d'API n'est jamais automatiquement considérée vraie.

## 10. Creative Engine

Peut orchestrer :
- text ;
- image ;
- video ;
- music ;
- audio ;
- TTS ;
- STT ;
- vision ;
- comic/BD ;
- embeddings ;
- search ;
- moderation.

Chaque capability reste derrière le Capability Registry.

## 11. Game Creator

Module 15 orchestre l'amélioration du Game Factory et du Shared Game Engine, mais les jeux restent dans Modules 8-9.

## 12. Scheduler

Les tâches AI sont classées :
- interactive ;
- background ;
- low priority ;
- batch.

Le scheduler protège CPU/RAM et évite les appels inutiles.

## 13. Resource optimization

MORISE peut apprendre des stratégies d'économie :
- cache ;
- batching ;
- model selection ;
- compression ;
- offloading ;
- background scheduling.

Elle ne peut pas créer de RAM ou de puissance physique par du code. Les ressources réelles viennent du matériel disponible.

## 14. Security

Fail closed pour :
- secrets ;
- permissions ;
- RLS ;
- destructive actions ;
- production deployment ;
- arbitrary code ;
- private data.

## 15. Tests

- learning candidate rejection ;
- sandbox failure ;
- regression detection ;
- rollback ;
- provider failure ;
- memory corruption;
- prompt injection;
- data leakage;
- cost/quota protection;
- cross-user isolation.

## 16. Acceptance

Le Meta System permet des améliorations mesurées et réversibles.
Aucun mécanisme d'auto-évolution ne peut contourner les tests ou les politiques.

## 17. Do not modify

Ne pas donner au modèle une capacité générale du type exec(anything). Toutes les actions doivent passer par des outils/contrats explicites.

## 18. New-AI handoff

Lire d'abord MORISE_AI_MASTER et tous les contrats Core. Une nouvelle IA ne doit jamais réinventer le moteur d'évolution.
