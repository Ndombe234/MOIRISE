# MORISE — AI SYSTEM Mechanics Map

## Purpose

The MORISE SYSTEM is not a chatbot bolted onto a social network. It is a platform-wide AI orchestration layer made of multiple specialized mechanics.

MORISE is general-purpose: the SYSTEM adapts to the PLAYER rather than forcing every user into a fixed niche.

## Core architecture

`PLAYER signals → specialist mechanics → SYSTEM Orchestrator → recommendation / proposal / assisted action → feedback → controlled learning`

The long-term conversational experience should feel comparable to a modern general AI assistant, but it is grounded in MORISE context, tools, permissions and product data.

## Mechanics

### 1. Context and memory
- current screen/context;
- explicit preferences;
- permitted product history;
- recent activity context;
- personal preference memory.

### 2. Recommendation and ranking
- content ranking;
- people/connection ranking;
- game recommendations;
- activity/event recommendations;
- novelty and diversity balancing.

### 3. Social intelligence
- relationship signals;
- interaction patterns;
- useful connection suggestions;
- social context explanations.

### 4. Adaptive community intelligence
- GUILD candidate detection;
- shared-interest proposals;
- group recommendations;
- community health signals.

### 5. Game intelligence
- game discovery;
- player/game matching;
- game concept generation;
- game design assistance;
- balancing suggestions;
- game testing assistance.

### 6. Translation intelligence
Translation is a first-class V1 SYSTEM capability.

Preferred order:
1. browser/on-device translation when suitable;
2. cached translations;
3. local/server fallback when required;
4. optional external API only behind an internal abstraction.

Users should be able to write naturally in their own language while recipients see a translated version and can access the original. MORISE terminology and context must be preserved.

V1 must already provide useful translation quality. Later learning improves context, terminology and personalization; it is not a replacement for usable V1 translation.

### 7. Conversation/reasoning
- natural-language SYSTEM interaction;
- contextual explanations;
- multi-step reasoning;
- tool use;
- action proposals.

### 8. Safety
- spam and abuse signals;
- moderation assistance;
- anomaly detection;
- safe generation;
- action validation.

### 9. Economy intelligence
- reward analysis;
- economy simulation;
- anomaly/fraud signals;
- creator-reward integrity.

## Specialist agents

Potential agents:

- Conversation/Reasoning Agent;
- Social Agent;
- Community Agent;
- Game Discovery Agent;
- Game Design Agent;
- Creator Agent;
- Translation Agent;
- Safety Agent;
- Economy Agent;
- Personalization Agent;
- SYSTEM Orchestrator.

The Orchestrator chooses which specialist should handle a task and combines results under server-side permissions.

## Adaptive GUILD example

Three doctors can have different professional paths while repeatedly interacting around a common topic.

1. Social/Community mechanics detect a sustained, non-sensitive interaction pattern.
2. The SYSTEM evaluates permitted signals and explicit interests.
3. Community Agent prepares a GUILD proposal.
4. SYSTEM explains the proposal without exposing private information.
5. Users confirm before persistent creation or membership changes.
6. Feedback from accept/dismiss/leave improves future ranking.

The SYSTEM suggests; it does not silently create persistent communities from inference.

## Learning model

MORISE can learn from the first users in V1.

### Personal adaptation
Fast updates to one PLAYER's preferences and recommendations.

### Aggregated learning
Patterns across many users are filtered, evaluated and validated before global use.

### Feedback learning
Accepted, rejected, corrected and completed recommendations become useful signals.

### Global model/ranking updates
Never deploy raw behavior directly into the global AI. Protect against spam, fake accounts, coordinated manipulation and data poisoning.

## Privacy and safety

- Do not infer or expose sensitive attributes for recommendation purposes.
- Never expose private messages or private content to another PLAYER through AI inference.
- Respect blocking, reporting, mute and recommendation controls.
- Keep authorization and RLS server-side.
- AI output is never an authorization decision by itself.
- Validate generated game rules, rewards, moderation decisions and database mutations before execution.
- Keep high-impact or irreversible actions behind explicit confirmation.
- Log important AI decisions in auditable form without storing unnecessary private content.
- Core MORISE workflows must remain usable if an external AI provider is unavailable.

## Provider architecture

MORISE must not hard-code the product to one AI vendor. Use internal interfaces for reasoning, generation, embeddings/retrieval, translation, moderation/classification, ranking and future multimodal capabilities.

## Cost strategy

Start with deterministic mechanics and browser/on-device processing where quality is sufficient. Use cache aggressively. Use local/small models for simple tasks. Reserve stronger models or external APIs for tasks that genuinely need them.

## Roadmap mapping

| Module | AI role |
|---|---|
| 1 Foundation | AI-ready events/context + provider abstractions |
| 2 PLAYER | preference/context memory |
| 3 SOCIAL | social intelligence + translation + private-safe context |
| 4 WORLD | discovery/ranking |
| 5 SYSTEM | conversational SYSTEM foundations |
| 6 PLAY | behavior signals for future recommendations |
| 7 Game Discovery Engine | personalized game discovery |
| 8 Game A→Z Factory | AI-assisted complete game creation |
| 9 Shared Game Engine | reusable AI-aware game services |
| 10 Social Gaming | social/game matching |
| 11 Communities | Adaptive Social System |
| 12 Events | event recommendation/generation |
| 13 Adaptive World | platform-wide personalization |
| 14 Collection / Reward Economy | economy analysis/anomaly detection |
| 15 Meta SYSTEM | unified conversational multi-mechanic AI |

## Definition of success

The SYSTEM should feel intelligent because MORISE becomes more useful as it understands legitimate PLAYER context and adapts.

It should not feel like a chatbot pasted onto every screen.

**PLAYER → SYSTEM understands → correct mechanic → useful response/action → feedback → controlled learning.**
