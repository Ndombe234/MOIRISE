# M04 — WORLD — CONCEPTION TECHNIQUE APPROFONDIE

## 1. Boundary
M04 owns the World/Home surface and contextual navigation into existing capabilities. It does not own ranking algorithms or game engines.

## 2. World contract
World answers “what can I do now?” with a small number of meaningful choices.
Doors:
Discover;
Play;
Create;
Communities;
Activities;
Events;
plus SYSTEM/PLAYER via primary navigation.

## 3. Context composition
Inputs:
Player state;
current route;
recent activity;
unfinished task;
real future events;
availability of Play/Create;
safe discovery candidates.
Output is a bounded ContextCard list.

## 4. Detours
A Detour is an optional unexpected but relevant experience:
recent signal → novelty candidate → policy → one-line reason → accept/dismiss.
Dismissal is respected to avoid repetitive recommendation loops.

## 5. No fake activity
World never fabricates:
people;
likes;
notifications;
counters;
events;
scarcity;
trends.
Empty states are real empty states.

## 6. Solo-first
A Player without friends should see useful activities, games, creation and discovery.
Social opportunities are optional expansions.

## 7. Navigation
Desktop geometry can differ from mobile, but information architecture remains common.
No new module button for each internal feature.

## 8. AI
M15 supplies contextual candidate generation and explanation. M07/M13 own ranking/filtering. M04 decides presentation.

## 9. States
WORLD_LOADING → READY → CONTEXTUAL_SUGGESTION → READY.
Optional dependencies can yield DEGRADED.

## 10. Security
Only data authorized for the Player. Shareable projections strip private fields.
Deep links still pass route authorization.

## 11. Performance
Home payload is bounded.
Heavy media is lazy.
3D and AI are never loaded only because World opened.

## 12. Tests
First-session flow; zero social graph; populated graph; dependency outage; dismiss/restore; mobile 390x844; deep links; no blank-screen transition.

## 13. DONE
World is understandable in seconds and remains a lightweight shell over a deep internal system.

## 14. Context contract
WorldContext contains:
currentDoor;
recentValidatedActions;
unfinishedContinuations;
safeRecommendations;
availableCapabilities;
playerExplicitPreferences;
timeBudgetHint.
It does not contain full private history.

## 15. Door rules
Discover → M07.
Play → M06.
Create → M08/M15.
Communities → M11.
Activities/Events → M12.
SYSTEM → M05.
PLAYER → M02.

M04 does not execute the underlying mutation; it routes.

## 16. Context card contract
ContextCard {id, titleKey, reasonKey?, actionId, expiresAt?, sourceRef}
Reason is explainable and based on real state.

## 17. Anti-spam
Same candidate is suppressed after dismissal for a policy-defined cooldown.
No card chain can recursively generate infinite cards.

## 18. Acceptance scenarios
New Player with no friends sees useful Solo doors.
A live event starting tomorrow can create a real card.
No active event → no fake “come back tomorrow”.
