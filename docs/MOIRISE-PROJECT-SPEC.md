# MOIRISE — Project Specification / Source of Truth

**Status:** Living specification
**Purpose:** Preserve product decisions across modules so implementation never loses the original intent.
**Last updated:** 2026-09-28

## 1. Product vision

MOIRISE is a **social network with a game-like identity and a broad vision**. It must feel like a world people want to return to, explore, progress in, and share with friends.

The product should create the reaction:

> “Mon frère / ma sœur, je connais un site qui fait ça.”

The goal is not to become only a game, only a social network, or only a utility. The product combines:

- social identity and community;
- a persistent SYSTEM / progression layer;
- multiple games and playful experiences;
- discovery and experimentation;
- shareable moments;
- an international audience;
- monetization that stays visually discreet;
- a product quality level suitable for future investors.

## 2. Non-negotiable UX direction

### 2.1 Visual quality

The system must be **beautiful, coherent and presentable**. It must not look like an admin dashboard or a collection of generic web components.

The SYSTEM panel should feel like a **real video-game system interface**, with a dark, cinematic, premium sci-fi direction. The visual inspiration is the feeling of a powerful progression interface (including the user's reference to Sung Jin-Woo / Solo Leveling), while remaining an original MOIRISE identity and not copying protected artwork.

Important qualities:

- cinematic hierarchy;
- restrained motion;
- clear progression feedback;
- strong typography;
- dark interface with luminous accents;
- responsive mobile-first behavior;
- polished empty/loading/error states;
- no visual clutter.

### 2.2 Game feel

MOIRISE must be **fun**, not merely functional.

If a 3D experience genuinely improves the product, it can be added. If a 2D experience is more effective, use 2D. Do not force 3D for marketing value alone.

The Play area should support **multiple games** behind a single coherent entry point. Game access and recommendations should react to the user's progression.

## 3. PLAY philosophy

Every game must be considered a product experiment, not filler content.

Before designing a game, perform a **market analysis** covering, when relevant:

- existing comparable games/products;
- player motivations;
- retention loops;
- social/shareability patterns;
- novelty gaps;
- session length;
- mobile suitability;
- technical cost;
- monetization compatibility;
- accessibility and localization;
- opportunities for MOIRISE differentiation.

The analysis should generate original mechanics rather than simply reskinning an existing popular game.

### 3.1 Originality requirement

Games should be meaningfully distinct in their core interaction. Cosmetic differences are not enough.

Examples of the direction established in the PLAY Lab:

- **Echo Trace:** spatial memory / reconstruction;
- **Signal Bloom:** timing / observation;
- **Shadow Courier:** planning / route construction.

These prototypes are starting points, not a claim that the final catalog is limited to three games.

### 3.2 Shareability requirement

For each game, ask:

> “What happens that makes a player want to show this to another person?”

Potential shareable moments include:

- a rare success;
- a personal record;
- an unusual discovery;
- a surprising system event;
- a visually strong result card;
- a challenge that naturally invites another player;
- progression milestones.

Sharing must feel native to the experience, not like an advertisement bolted onto the end.

## 4. PLAY + SYSTEM integration

The SYSTEM is the persistent progression layer for the whole product.

A completed game session may generate progression signals such as:

- play XP;
- timing;
- memory;
- precision;
- planning;
- exploration;
- discovery;
- other game-specific dimensions introduced later.

The authoritative progression logic belongs to the SYSTEM/database layer, not only the browser.

Important rules:

- server-side validation is mandatory;
- clients cannot directly award arbitrary XP;
- idempotency is mandatory for completion events;
- a repeated submission must not double-award progression;
- game results must be linked to the authenticated player;
- result payloads must be bounded and validated;
- RLS/security boundaries must remain explicit.

## 5. Progression-driven game discovery

A player should not necessarily see every experience at once.

The platform may unlock, recommend, rotate, or prioritize experiences according to:

- current level;
- completed games;
- recent activity;
- observed preferences/signals;
- achievements;
- social activity;
- experimental discovery rules.

The purpose is to create a sense of a world that expands with the player.

## 6. Social network identity

MOIRISE remains a social network and must not drift into being only a game portal.

The social layer should eventually support, subject to later detailed specs:

- profiles / Player identity;
- following / connections;
- feed/discovery;
- reactions and social interactions;
- shareable moments;
- achievements and progression visibility where appropriate;
- communities or other social structures when validated by product research.

Social features should strengthen the playful world rather than become a generic Facebook clone.

## 7. Internationalization

The product is intended to be international and should support **20 languages**.

The public product should retain multilingual support rather than becoming English-only merely for an advertising provider.

When an advertising provider requires an English-only application/review surface, an English route such as `/en` may be used as the review target while the wider product remains multilingual.

Localization must include:

- UI strings;
- game instructions;
- result/share cards;
- metadata where appropriate;
- accessibility text;
- language-aware formatting.

Never assume that translated text will have the same length as English; layouts must tolerate expansion.

## 8. Monetization direction

Advertising is part of the business plan, but it must remain **discreet and integrated into the visual system**.

The preferred direction is:

- roughly one appropriately placed banner opportunity per page where justified;
- no aggressive popups that damage the game/social experience;
- no intrusive advertising during critical gameplay;
- ad placements should visually fit the surrounding UI;
- providers must be evaluated against MOIRISE's audience, languages, traffic profile, UX, privacy requirements and approval rules.

Previously discussed provider candidates (A-ADS, EthicalAds, Carbon) are **research candidates, not guaranteed acceptance or revenue assumptions**. Current provider requirements and economics must be verified before integration.

Do not build the product around an assumed traffic number or assumed acceptance by an ad network.

## 9. Business / investor readiness

The product should be developed to a quality level suitable for later investor conversations.

Before investor outreach, the platform should have measurable evidence such as:

- active users;
- retention;
- session frequency;
- game engagement;
- social engagement;
- sharing rate;
- international usage;
- monetization experiments;
- infrastructure reliability;
- clear product roadmap.

The presence of banners alone is not considered investor readiness.

## 10. Market analysis loop

Market analysis is a **continuous parallel workstream**, not a one-time document.

For every major module and every new game idea:

1. identify relevant market patterns;
2. inspect comparable products and user expectations;
3. identify gaps/opportunities;
4. translate useful findings into an original MOIRISE mechanic or feature;
5. validate technical feasibility;
6. instrument the result so real user behavior can inform the next iteration.

Analysis must inform decisions without copying competitors.

## 11. Product quality bar

A feature is not considered finished merely because it works technically.

Definition of done should include, where applicable:

- functional behavior;
- mobile responsiveness;
- visual polish;
- accessibility basics;
- loading/error/empty states;
- security/RLS validation;
- analytics/progression instrumentation;
- idempotency for user actions that mutate state;
- tests for critical logic;
- no obvious console/runtime errors;
- coherent integration with the SYSTEM and social world.

## 12. Testing philosophy

The product should be tested **like a normal user would use it**, not only through isolated code tests.

For important flows, verify:

- new user path;
- returning user path;
- mobile interaction;
- authentication state;
- game start/finish;
- duplicate completion submission;
- progression update;
- result display;
- share flow;
- localization;
- ad placement behavior;
- failure/retry behavior.

Security tests should also verify that a client cannot impersonate another player or award itself arbitrary progression.

## 13. Development process

The user wants modules to be **completed end-to-end before declaring them finished**. Avoid repeatedly stopping for minor confirmations when the requested scope is already clear.

For a module:

1. inspect the current project state;
2. use this specification as the source of truth;
3. implement the full agreed scope;
4. test it as a user;
5. run technical/security checks;
6. perform market analysis in parallel;
7. fix discovered issues;
8. only then report the module as complete and move to the next module.

If a decision conflicts with this specification, surface the conflict explicitly rather than silently changing the product direction.

## 14. Current architectural direction

The current PLAY architecture uses:

- a central game-definition/catalog layer;
- a single Play entry point;
- game-specific runtimes/components;
- authenticated play attempts;
- server-side result validation;
- idempotent completion handling;
- SYSTEM progression events;
- shareable result routes;
- database-level RLS/security controls.

The canonical game inventory should remain in one authoritative catalog/spec rather than being duplicated across UI components.

## 15. Important product principles

1. **Originality over cloning.**
2. **Fun over feature count.**
3. **Shareability over vanity metrics.**
4. **Polish over rushed quantity.**
5. **Progression should feel meaningful.**
6. **The social layer remains central.**
7. **Market analysis informs ideas; it does not dictate copying.**
8. **Security is part of product quality.**
9. **Internationalization is a core capability.**
10. **Advertising must respect the experience.**
11. **Real user behavior should eventually guide iteration.**
12. **The SYSTEM should make the product feel like a living world.**

## 16. Decisions that require future explicit product specs

The following should be detailed in dedicated specs before large implementation changes:

- canonical full game catalog and its unlock tree;
- complete social graph/feed model;
- public Moments/sharing model;
- recommendation algorithm;
- notification system;
- exact 20-language list and translation workflow;
- advertising provider selection and privacy/consent architecture;
- investor analytics dashboard;
- moderation/safety system;
- final 3D strategy and engine choice, if 3D experiences justify it.

## 17. Source-of-truth rule

When older conversation context, temporary implementation notes, or assumptions conflict with this file, this specification should be treated as the current product baseline **only for decisions explicitly recorded here**.

New product decisions should be appended or amended here with a date and rationale rather than left only in chat.
