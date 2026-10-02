# MOIRISE — REGRESSION MATRIX

## Scope
This matrix maps shared surfaces to required regression checks. It does not replace owner PLAN.md or TECHNICAL_DESIGN.md.

| Change area | Minimum regression |
|---|---|
| M01 Foundation / routing / auth | all six doors + deep links + session restore + unauthorized routes |
| M02 Player | PLAYER + SOCIAL identity surfaces + privacy + locale |
| M03 Social | SOCIAL + PLAYER + notifications/messages + SOCIAL→PLAY |
| M04 World | WORLD + navigation handoffs + locale/timezone |
| M05 System | SYSTEM + PLAYER + progression/reward projections |
| M06 Play | PLAY + result validation + progression + rewards + PLAY→SOCIAL |
| M07 Discovery | discovery entry points + ranking exposure + cold start + content/game handoffs |
| M08 Game Factory | generation/build validation + preview + runtime handoff |
| M09 Game Engine | 2D/3D runtime + resource failures + M06 integration |
| M10 Social Gaming | SOCIAL + PLAY + communities/challenges |
| M11 Communities | community discovery + membership + CREATE/PLAY handoffs |
| M12 Events | event creation/state + timezone + eligibility + SOCIAL return |
| M13 Adaptive | personalization + privacy scopes + fallback/degraded behavior |
| M14 Rewards | authoritative results + duplicate prevention + ledger integrity |
| M15 Meta AI Lab | orchestration + policy + sandbox + provider fallback + owner boundaries |

## Cross-loop regression
Required when shared contracts or navigation are touched:
- SOCIAL → PLAY
- PLAY → SOCIAL
- SOCIAL → COMMUNITY
- COMMUNITY → CREATE
- CREATE → PLAY
- PLAY → COMMUNITY
- EVENT → SOCIAL

## International regression
For user-facing changes:
- Unicode;
- language switch;
- RTL sample where supported;
- locale date/number formatting;
- timezone boundary;
- mobile width;
- desktop width.

## Release rule
A regression row is VERIFIED only with fresh executable evidence. Documentation inspection alone is not evidence.
