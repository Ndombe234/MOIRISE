# MOIRISE — DEPENDENCY MAP — 15 MODULES

| Module | Depends on | Exposes |
|---|---|---|
| M01 | runtime | session, contracts, events, capability boundary |
| M02 | M01 | Player identity/context |
| M03 | M01,M02 | social/private events |
| M04 | M01,M02,M03,M05,M07,M13 | World surfaces |
| M05 | M01,M02 | SYSTEM/progression |
| M06 | M01,M02,M05,M09 | Play results/Moments |
| M07 | M01,M02,M03,M06,M13 | game discovery candidates |
| M08 | M01,M05,M07,M09,M15 | validated game packages |
| M09 | M01,M08 | reusable runtime |
| M10 | M03,M06,M11,M12 | social gaming events |
| M11 | M02,M03,M12,M13 | communities/membership |
| M12 | M05,M11,M14 | event state |
| M13 | M01,M02,M03,M04,M07,M15 | adaptive world ranking |
| M14 | M05,M06,M10,M11,M12 | rewards/collections |
| M15 | all contract surfaces, M01 | AI capabilities/orchestration |

## Ownership
A consumer may read an exposed projection/event but may not mutate another module's private persistence directly.


## AI Cognition Dependency

La dépendance vers M15 ne signifie pas que M15 possède l'état métier du module. Elle signifie que le module peut consommer les capacités d'orchestration AI via un contrat.

Pour toute feature AI :
module owner → capability contract → M15 orchestration → provider/worker éventuel → ValidationEngine → module owner commit → event → projection.

La fabrication doit donc charger à la fois la dépendance de module et son contrat AI. Un consumer peut demander une capability, mais ne choisit pas directement le provider et ne modifie pas la persistence d'un autre owner.


## 3. Dependency Impact Layer

The module matrix above describes module dependencies. Fabrication additionally resolves impact at multiple levels.

### Edge types
- MODULE_DEPENDS: module dependency;
- CONTRACT_READS: reading a contract/projection;
- SYMBOL_IMPORTS: direct symbol import;
- SYMBOL_CALLS: direct call;
- DATA_READS / DATA_WRITES: data access;
- EVENT_EMITS / EVENT_CONSUMES: event relation;
- ROUTE_ENTERS: route to capability;
- AI_CAPABILITY: dependency on M15 capability;
- PROJECTION_FEEDS: projection to a surface;
- TEST_ASSERTS: test covering behavior;
- BROWSER_VERIFIES: browser scenario covering behavior.

### Change-impact algorithm

~~~text
change
→ changed file/symbol/contract
→ direct consumers
→ transitive consumers
→ event consumers
→ projections/routes
→ AI capability callers
→ affected tests
→ affected security/resilience scenarios
~~~

Every impact result is classified:
DIRECT, TRANSITIVE, POTENTIAL, UNRESOLVED.

A POTENTIAL or UNRESOLVED dependency is never silently treated as safe.

### Example

For a change to M08 GameSpecification, the agent must resolve at minimum the contract path toward:
M08 internal TaskGraph → M09 runtime manifest → M06 Play validation → M05 progression hooks → M14 rewards where the changed contract reaches them, plus any M07 discovery, M10 social gaming and M15 AI capability surfaces actually connected by the code/contracts.

The list is an impact hypothesis until source-code/contracts traversal confirms each edge.

## 4. Ownership guard for impact analysis

Impact analysis discovers consumers; it does not transfer ownership.

A consumer may:
- read an exposed projection;
- consume an event;
- call an allowed use-case/capability.

A consumer may not:
- mutate another owner's private tables/state directly;
- create a competing event authority;
- create a competing AI capability/provider router.


# D100K — LEGACY DEPENDENCY STATE RESTORATION

Optional capabilities/dependencies may be:
PLANNED → CONFIGURED → AUTHORIZED → ENABLED → EXECUTING → VALIDATING → COMPLETED
or
PENDING_DEPENDENCY / DEGRADED / MAINTENANCE / DISABLED / UNAVAILABLE / CANCELED / FAILED.

A dependency outage must degrade only the dependent execution path when a fallback exists. No optional provider/dependency may become an application startup prerequisite.

