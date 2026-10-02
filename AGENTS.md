# MOIRISE — AGENT ENGINEERING & QUALITY CONTRACT

## 0. Product identity
MOIRISE is an international social platform. Anime/Otaku content may exist as one interest domain, but it is not the product identity.

All implementation, UI, data, discovery, communities, games, events, AI behavior and tests must remain suitable for an international audience.

Internationalization is a first-class engineering concern:
- Unicode-safe names, text, search and content;
- multilingual UI and translation flows where supported;
- locale-aware dates, times and numbers;
- timezone-aware event and scheduling behavior;
- locale-neutral business logic;
- mobile-first behavior across varied devices, widths and input methods;
- privacy and permission behavior independent of language or country.

## 1. Non-negotiable development rule
A feature is not DONE because it compiles or builds.

A feature is DONE only after:
PLAN → TECHNICAL DESIGN → implementation → auth/security/data checks → unit/integration tests → desktop browser verification → mobile verification → resilience/adversarial checks → regression → deployment evidence → production smoke test.

Do not declare DONE when required evidence is missing.

## 2. Before coding
Before editing:
1. Read the applicable canonical product/module documents.
2. Read relevant transversal contracts.
3. Search for an existing implementation before creating a new file, route, service, table or owner.
4. Identify authoritative state and module ownership.
5. Identify affected user journeys, edge cases and regression surfaces.
6. Define the expected test evidence.

Never invent missing business authority when canonical documentation is incomplete; record a SPECIFICATION_GAP and resolve it through the owner documentation.

## 3. Verification loop
Every meaningful change follows:

inspect → define scenarios → write/update tests → implement → typecheck → targeted tests → integration tests → build → browser desktop → browser mobile → adversarial/resilience tests → regression → evidence.

After a bug fix, rerun the affected tests and all relevant regression tests.

## 4. User simulation
Browser verification must behave like a real user, not only like a DOM checker.

For relevant flows:
- open the application;
- authenticate or use the appropriate session state;
- navigate through visible controls;
- perform the primary and secondary actions;
- use back/forward;
- reload;
- open deep links;
- test loading, empty, success, error, unavailable and degraded states;
- repeat clicks/taps;
- interrupt or retry operations;
- test permission denial;
- test stale/deleted targets;
- test network interruption/reconnect when applicable;
- verify there is no blank-screen route.

## 5. User diversity
When relevant, test at least:
- new user;
- returning user;
- empty account;
- populated account;
- normal member;
- creator;
- elevated-role user;
- unauthorized user;
- malformed or extreme input;
- mobile viewport;
- desktop viewport;
- slow/interrupted network;
- multilingual/Unicode content;
- different timezone/locale.

## 6. Internationalization requirements
Any user-facing feature must be evaluated for:
- text expansion and contraction;
- Unicode and non-Latin scripts;
- bidirectional text where supported;
- date/time/number formatting;
- timezone boundaries;
- language switching without state loss;
- translated error/loading/empty states;
- search/sort/filter behavior with Unicode;
- names and handles that are not ASCII-only.

Do not hard-code locale assumptions into business logic.

## 7. Cross-module regression
When a change affects one of the six global doors, rerun affected cross-loop journeys:

SOCIAL → PLAY
PLAY → SOCIAL
SOCIAL → COMMUNITY
COMMUNITY → CREATE
CREATE → PLAY
PLAY → COMMUNITY
EVENT → SOCIAL

Also test any additional transitions explicitly declared by the affected owner.

## 8. Release gate
Release is blocked by any of:
- typecheck failure;
- failing required test;
- failing build;
- critical browser error;
- blank-screen route;
- dead/incorrect primary control;
- authorization or privacy violation;
- inconsistent authoritative state;
- critical responsive failure;
- unresolved critical regression;
- missing required production smoke evidence.

## 9. Evidence
For each significant task record:
REQUIREMENT → IMPLEMENTATION → TEST → BROWSER SCENARIO → EXPECTED RESULT → ACTUAL RESULT → STATUS.

Statuses:
VERIFIED / PARTIAL / BLOCKED / INCONCLUSIVE.

Previous agent assertions are not fresh evidence.

## 10. Scope and ownership
Keep the canonical 15-module architecture. Never create an M16.

Respect existing module ownership. M15/MORISE AI can orchestrate, propose and analyze but cannot silently become authoritative owner of another module's business state.

Do not create fake users, fake followers, fake groups, fake counters, fake scores, fake scarcity or fake social proof.

## 11. Game verification
2D and 3D games are first-class. Game changes must include:
build → static checks → security checks → simulation → behavior tests → resource/performance checks → preview → runtime validation → Play integration validation.

## 12. Production behavior
After deployment, verify the actually deployed version. Do not accept local-only success as release proof.
