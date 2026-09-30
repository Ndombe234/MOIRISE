# M07 — GAME DISCOVERY ENGINE — CONCEPTION TECHNIQUE APPROFONDIE

## 1. Boundary
M07 owns candidate retrieval, evidence collection, ranking policy, novelty/diversity constraints and game feedback learning. M15 supplies semantic capabilities.

## 2. Candidate sources
- local curated registry;
- approved public metadata;
- Player's explicit preferences;
- validated game history;
- public community signals;
- Living Object playable branches;
- approved market research evidence.

Private messages and sensitive attributes are excluded by default.

## 3. Research
Research records source, timestamp, claim, evidence strength and market relevance.
The engine may compare genres, loops, platform constraints, demand signals and differentiation opportunities.
External research is evidence, not truth.

## 4. Ranking pipeline
query/context → candidates → ACL/moderation → relevance → quality → novelty → diversity → freshness → player fit → explanation.

The ranking must prevent a single creator or repeated action from dominating automatically.

## 5. Novelty
Novelty budget avoids showing only familiar genres.
The engine can intentionally surface an unusual but plausible experience as a Detour.

## 6. Feedback
Signals:
play start;
completion;
abandonment;
explicit like/dislike;
dismiss;
share;
challenge;
creation request.
Signals are normalized and protected against manipulation.

## 7. Convergence
Repeated independent game mechanic patterns can form a Convergence candidate, passed to M15 with evidence and privacy checks.

## 8. World Memory
Validated game discoveries/strategies can become World Memory candidates but only after evidence validation and attribution rules.

## 9. APIs/contracts
SEARCH_GAMES; GET_RECOMMENDATIONS; GET_RESEARCH_BRIEF; RECORD_FEEDBACK; GET_SIMILAR_EXPERIENCES.

## 10. Tests
Ranking determinism; novelty; diversity; blocked content; stale metadata; source provenance; feedback poisoning; empty search; provider outage; mobile result card.

## 11. DONE
Discovery works with and without AI, remains diverse, explainable and privacy-respecting.