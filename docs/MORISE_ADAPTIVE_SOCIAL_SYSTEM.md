# MORISE — Adaptive Social System

## Principle

MORISE is a general-purpose social platform. It is not limited to Otaku users, gamers, doctors, students, creators, or any other niche.

The SYSTEM adapts to each PLAYER's interests, activities, relationships and communities without requiring the PLAYER to choose a niche at registration.

## Adaptive community creation

MORISE may detect repeated, meaningful interaction between PLAYERS and identify a potential shared interest or collaboration pattern.

Example:

- Doctor A, Doctor B and Doctor C independently join MORISE.
- Their professional paths differ.
- They repeatedly communicate with one another about a common subject.
- The SYSTEM detects the interaction pattern and a plausible shared interest.
- MORISE proposes a GUILD rather than silently creating one.
- The PLAYERS accept or reject the proposal.

Example SYSTEM prompt:

> SYSTEM SUGGESTION — You interact regularly around a shared topic. Would you like to create a GUILD with these PLAYERS?
>
> [Create GUILD] [Not now]

## Consent and agency

The SYSTEM must suggest, not force.

It must never automatically create a persistent group solely from behavioral inference. A proposal requires an appropriate user action before a GUILD is created or members are added.

The system should also provide controls to dismiss, mute or reduce similar suggestions.

## Signals

Potential signals can include, subject to privacy controls and applicable policy:

- repeated conversations;
- shared groups or activities;
- shared games or challenges;
- recurring interaction with related content;
- mutual follows or connections;
- explicit interests and profile information;
- participation in the same events.

Signals must be combined conservatively. Frequency alone is not sufficient evidence of a shared interest.

## Privacy and safety requirements

- Do not infer sensitive personal attributes for recommendation purposes.
- Do not expose private conversation content to other PLAYERS.
- Private messages may inform a user's own recommendations only where the product's privacy model permits it; never use private content to expose a hidden inference to another person without appropriate controls.
- Provide mute/dismiss controls.
- Respect blocking and reporting.
- Apply RLS and server-side authorization to social actions.
- Keep recommendation logic auditable and configurable.

## GUILD discovery modes

### Manual
PLAYER → DISCOVER → GUILD → JOIN

### SYSTEM-assisted
PLAYER interactions → shared-interest signal → SYSTEM suggestion → consent → GUILD

Both modes must coexist.

## General-purpose examples

The model applies to any legitimate community:

- doctors;
- developers;
- students;
- artists;
- entrepreneurs;
- athletes;
- gamers;
- musicians;
- photographers;
- hobby communities;
- professional communities.

The topic is determined by the users and their explicit interests, not by a fixed MORISE niche.

## Product objective

The goal is to make MORISE feel like a social system that helps people discover relevant relationships and communities while keeping the user in control.

The SYSTEM should reduce the work required to find the right people without turning MORISE into an opaque recommendation engine.

## Roadmap placement

- Module 3: SOCIAL/LINK/GUILDS foundation and user-controlled community interactions.
- Module 7: Game Discovery Engine remains focused on discovering games and activities.
- Module 11: Communities expands this into the full persistent Adaptive Social System.
- Module 13: Adaptive World extends contextual personalization across MORISE.
- Module 15: Meta SYSTEM integrates the adaptive behavior across the platform.

This feature is therefore a cross-module requirement, not a single isolated screen.
