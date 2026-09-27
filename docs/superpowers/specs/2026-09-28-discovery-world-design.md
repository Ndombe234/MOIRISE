# MORISE Module 4 — Discovery World

## Goal

Turn `/discover` from a placeholder into MORISE's first real exploration surface without creating an endless recommendation feed.

The experience should answer: **"What could I explore next?"**

## Market signals

2026 social products are increasingly moving from follower-only discovery toward interest-led discovery. Dash Social describes discovery shifting beyond owned audiences; HubSpot's 2026 research describes a broader shift from social graphs toward interest-based discovery. citeturn0search8turn0search10

Platforms are also giving users more explicit influence over recommendations. Threads introduced controls that let people ask for more or less of topics, and research on recommender-system control emphasizes transparent, understandable user controls. citeturn0search0turn0search3

TikTok's 2026 trend report describes "curiosity detours": people arrive with one intention and discover adjacent interests along the way. citeturn0search23

Community research also emphasizes connection and intentional participation rather than raw attention volume. citeturn0search5

## MORISE decision

MORISE will not copy a conventional infinite feed.

Module 4 introduces a **Curiosity Map** with three layers:

1. **Intent** — what the Player wants right now: Discover, Learn, Create, Play, Meet.
2. **Paths** — broad domains that can later connect to games, activities, communities, events and creators.
3. **Detours** — one deliberately adjacent direction to encourage unexpected discovery.

The UI presents a small number of choices. The future recommendation engine can become extremely sophisticated behind the scenes without changing the surface model.

## Initial intent choices

- Discover something new
- Learn something
- Make something
- Play something
- Meet people around an interest

## Initial exploration domains

- Technology
- Arts & Design
- Science
- Games
- Sport & Movement
- Music
- Film & Stories
- Learning
- Business & Projects
- Culture & Languages

These are navigation dimensions, not fixed identities. Selecting a domain must never classify the Player permanently.

## Detour principle

The detour is not a random recommendation. It is a controlled bridge between domains. Example: a Player exploring music may receive a bridge toward game sound design, visual art, coding, live events or language learning.

Future versions will derive bridges from actual Player behavior and global activity graphs.

## Solo-first

Every discovery action must produce a useful next step even when the Player has no friends, follows nobody and belongs to no community.

## Privacy and safety

Module 4 does not infer sensitive traits. It should use explicit interests and non-sensitive product behavior only. No private profile data is exposed to other users through discovery.

## Scope

Implement the Discovery World UI and truthful navigation shells only. Do not build a ranking model, social graph, recommendation AI, or content ingestion pipeline in this module.

## Done criteria

- Authenticated `/discover` renders the Curiosity Map.
- Player can choose an intent and domain.
- UI explains that choices shape discovery, not identity.
- A detour action exists and is clearly framed as adjacent exploration.
- Routes back to World and SYSTEM work.
- Mobile has no horizontal overflow.
- Keyboard focus is visible.
- No fake user counts, engagement counts or invented recommendations.
- Production CI and browser QA pass.
