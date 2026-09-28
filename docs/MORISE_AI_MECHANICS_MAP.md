# MORISE — AI SYSTEM Mechanics Map

## Purpose

The MORISE SYSTEM is not a chatbot bolted onto a social network. It is a platform-wide AI orchestration layer made of multiple specialized mechanics.

MORISE remains general-purpose: the SYSTEM adapts to the PLAYER rather than forcing every user into a fixed niche.

## Architecture

PLAYER signals → specialized AI mechanics → SYSTEM orchestration → recommendation / proposal / assisted action → user confirmation where required → feedback → learning/evaluation.

No single AI mechanism should own the entire platform.

## Mechanics by maturity

### Level 1 — deterministic intelligence

These mechanics can work with ordinary application logic and do not require a generative model.

- Context engine: knows where the PLAYER is and what action is currently relevant.
- Preference profile: stores explicit interests and stable product preferences.
- Event/context memory: records permitted product events and useful recent context.
- Recommendation rules: basic relevance, freshness and diversity rules.
- Notification intelligence: timing, grouping and suppression rules.
- Anti-abuse signals: spam, duplicate actions, suspicious activity and rate limits.
- Reward calculation: deterministic XP, titles, progression and eligibility rules.

Modules: 1 Foundation, 2 PLAYER, 3 SOCIAL, 4 WORLD, 5 SYSTEM, 6 PLAY.

### Level 2 — predictive / ranking intelligence

- Content ranking.
- People/connection ranking.
- GUILD candidate detection.
- Game recommendation ranking.
- Activity and event recommendation.
- Churn/return-risk signals used only for product assistance, not sensitive profiling.
- Personalization based on explicit preferences plus non-sensitive product behavior.

Modules: 3 SOCIAL, 4 WORLD, 6 PLAY, 7 Game Discovery Engine, 11 Communities, 13 Adaptive World.

### Level 3 — generative assistance

- SYSTEM natural-language assistant.
- Profile and interest summarization.
- GUILD description generation.
- Activity/event suggestions.
- Game concept ideation.
- Quest/mission generation with validation.
- Creator assistance for game design, balancing ideas, naming and documentation.
- Personalized explanations of recommendations and rewards.

Modules: 5 SYSTEM, 7 Game Discovery Engine, 8 Game A→Z Factory, 11 Communities, 15 Meta SYSTEM.

### Level 4 — multi-agent / specialized AI orchestration

Specialized agents can cooperate while a central SYSTEM orchestrator controls permissions and workflow.

Potential agents:

- Social Agent — relationships and social context.
- Community Agent — GUILD discovery and formation proposals.
- Game Discovery Agent — market demand and opportunity research.
- Game Design Agent — rules, mechanics and balancing proposals.
- Creator Agent — helps PLAYERS build games and content.
- Safety Agent — moderation and abuse detection.
- Economy Agent — reward/economy simulations and anomaly detection.
- Personalization Agent — contextual recommendations.
- SYSTEM Orchestrator — decides which specialist should act and combines results.

Modules: 7, 8, 9, 10, 11, 13 and 15.

## Adaptive GUILD example

Three doctors can have different professional paths while repeatedly interacting around a shared topic.

1. The Social/Community mechanics detect a sustained interaction pattern.
2. The system evaluates non-sensitive, permitted signals and explicit interests.
3. The Community Agent produces a candidate GUILD proposal.
4. The SYSTEM explains why the proposal is relevant without exposing private information.
5. Each required PLAYER action is obtained before creating the persistent group.
6. The resulting GUILD becomes normal MORISE infrastructure.
7. Feedback from accept/dismiss/leave actions improves future ranking.

The SYSTEM suggests; it does not silently create persistent communities from inference.

## AI + privacy rules

- Do not infer or expose sensitive attributes for recommendation purposes.
- Never expose private messages or private content to another PLAYER through an AI inference.
- Respect blocking, reporting, mute and recommendation controls.
- Keep authorization and RLS server-side; AI output is never an authorization decision by itself.
- Validate generated game rules, rewards, moderation decisions and database mutations before execution.
- Keep high-impact or irreversible actions behind explicit confirmation.
- Log important AI decisions in an auditable form without storing unnecessary private content.
- Provide safe fallbacks when an AI provider is unavailable.

## AI provider architecture

MORISE should not hard-code the product to one model vendor.

Use an internal SYSTEM AI interface so providers/models can be changed by capability:

- reasoning;
- generation;
- embeddings/retrieval;
- moderation/classification;
- ranking;
- speech or multimodal features when later justified.

The application must continue functioning for core social/product workflows when an external AI service is unavailable.

## Cost strategy

Start with deterministic mechanics where possible. Use AI only when it adds measurable value.

Prefer:

1. rules and cached results for simple decisions;
2. local/cheap models where quality is sufficient;
3. small/fast models for classification and ranking;
4. stronger models only for complex generation/reasoning;
5. caching and batching to control inference cost.

## Roadmap mapping

| Module | AI role |
|---|---|
| 1 Foundation | AI-ready event/context architecture |
| 2 PLAYER | preference and context profile |
| 3 SOCIAL | relationship/context intelligence |
| 4 WORLD | discovery and ranking |
| 5 SYSTEM | SYSTEM assistant foundations |
| 6 PLAY | adaptive play/recommendation signals |
| 7 Game Discovery Engine | market/research/recommendation intelligence |
| 8 Game A→Z Factory | AI-assisted complete game creation pipeline |
| 9 Shared Game Engine | reusable AI-aware game services |
| 10 Social Gaming | social graph + gameplay intelligence |
| 11 Communities | adaptive GUILD intelligence |
| 12 Events | event generation, scheduling and personalization |
| 13 Adaptive World | platform-wide personalization |
| 14 Collection / Reward Economy | economy analysis and anomaly detection |
| 15 Meta SYSTEM | unified multi-mechanic AI orchestration |

## Definition of success

The SYSTEM should feel intelligent because MORISE becomes more useful as it understands the PLAYER's legitimate preferences and context.

It should not feel like a chatbot pasted onto every screen.

The desired experience is:

**PLAYER → MORISE observes permitted context → SYSTEM understands → SYSTEM proposes/helpfully adapts → PLAYER remains in control.**
