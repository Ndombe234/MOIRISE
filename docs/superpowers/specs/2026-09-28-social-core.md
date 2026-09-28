# MORISE Module 5 — Social Core

**Status:** IMPLEMENTED ON BRANCH / VERIFICATION PENDING  
**Date:** 2026-09-28

## Goal

Make MORISE a real social network at its core while keeping the broader World, SYSTEM, games, discovery, creation, communities and events vision intact.

MORISE should support the familiar social jobs users expect from a mature social network: publish, follow people, react, comment, discover a public stream, switch toward a personal following stream, and share something worth sending to another person.

The difference is that social activity is not the entire MORISE product. It becomes one connected layer of the World.

## Market analysis — current direction

Current social products increasingly combine social graphs with interest-led discovery, creator content, short-form media, communities and personalized recommendation controls.

2026 market signals show that discovery continues to move beyond a pure follower graph; distinctive content can be more shareable than generic content; platforms keep investing in explicit recommendation controls; short-form creator participation remains a major discovery mechanism; and social products face growing trust and safety pressure.

Sources reviewed:
- Dash Social, 2026 Social Media Trends: https://www.dashsocial.com/press-release/2026-social-media-trends-report
- Meta / Threads product updates: https://about.fb.com/news/
- DataReportal Digital 2026: https://datareportal.com/reports/digital-2026-global-overview-report
- Current YouTube creator/commerce reporting reviewed during market research.

## MORISE product decision

MORISE will not copy a single endless Facebook-style feed.

Instead, Social Core has two simple surfaces:

### World
Recent public MORISE activity from across the network.

### Following
Posts from Players the current Player follows, plus the Player's own posts.

The platform can later add smarter ranking signals without changing the surface model.

## Post model

A post can contain text and an optional media URL, plus author, timestamp, reactions and comments.

The first implementation intentionally avoids fake metrics and fake activity.

## Social graph

Players can follow other Players.

The graph is directional: A follows B.

A Player cannot follow themselves.

## Reactions

Module 5 starts with one primary reaction interaction while the database supports a small controlled vocabulary: like, love, laugh, wow, support.

This leaves room for future richer reactions without redesigning the storage model.

## Comments

Authenticated Players can comment on posts.

Comments are owned by their author for editing and deletion permissions.

## Sharing

A post can produce a direct MORISE URL that another user can open.

Future versions will add a stronger share-card / Moment layer so game results, discoveries, creations and social posts can all become shareable objects.

## Safety and abuse

The social core must require authentication for publishing and engagement; enforce ownership through RLS; avoid client-side trust; validate text length; reject self-follow; avoid fake counters; and prepare for rate limiting and moderation in a later safety module.

## Data architecture

The first social tables are:
- social_posts
- social_follows
- social_comments
- social_reactions

RLS allows authenticated reading of public social content and ownership-based writes.

Player public profile fields are readable by authenticated Players so social cards can display author identity without exposing authentication data.

## Relationship to SYSTEM

Social interactions will later become a source of real SYSTEM progression signals.

Module 5 does not award arbitrary XP on every click. A later social-progression contract will define meaningful events such as creating a post, sustained contribution, community participation, or constructive creation.

## Non-goals

This module does not yet implement algorithmic ranking, private messaging, groups/communities, moderation dashboards, live chat, stories, reels-style video infrastructure, advertising, or full creator monetization.

## Success criteria

- Authenticated Player can open Social.
- Public/world stream works.
- Following stream works.
- Player can create a post.
- Player can react/unreact.
- Player can comment.
- Player can follow/unfollow.
- Direct sharing URL is available.
- RLS prevents unauthorized writes.
- Empty/loading/error states exist.
- Mobile 390x844 has no horizontal overflow.
- Desktop layout is coherent.
- CI, tests, production build, deployment and browser QA pass.
