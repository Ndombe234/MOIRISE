# MOIRISE — AI Fabrication Bridge

## Purpose

This file is **orchestration metadata only**.

It does not define MORISE AI behavior, capabilities, providers, memory rules, evolution rules, or business authority. Those remain exclusively defined by:

1. `docs/moirise/ai/AI_MASTER_PLAN.md` — WHAT
2. `docs/moirise/ai/AI_TECHNICAL_DESIGN.md` — HOW

When a task concerns MORISE AI, the coordinator MUST read both canonical AI documents before assigning or implementing the task.

## AI understanding gate

The coordinator must be able to answer from the canonical pair:

- What MORISE AI is responsible for;
- what MORISE AI is explicitly forbidden to own;
- how a request becomes an intent, requirements, plan, policy decision, execution, validation and owner commit;
- how capabilities are versioned and validated;
- how context and privacy classes constrain what the AI may see;
- how providers and workers are execution targets rather than the AI authority;
- how AI output remains proposal/evidence until the owning module validates and commits it;
- how memory is scoped, evidenced, validated and promoted;
- how evolution candidates are sandboxed, tested, canaried and promoted/rejected;
- how creative generation and game fabrication delegate to M08/M09/M06 without taking their authority;
- how AI failures degrade to deterministic or approved fallback paths;
- what evidence is required before an AI task can be considered verified.

If any of these questions cannot be answered from the canonical pair, the task is NOT READY for fabrication.

## AI task routing

### AI core task

Required canonical sources:

- `docs/moirise/ai/AI_MASTER_PLAN.md`
- `docs/moirise/ai/AI_TECHNICAL_DESIGN.md`
- `docs/moirise/modules/M15-meta-ai-lab/PLAN.md`
- `docs/moirise/modules/M15-meta-ai-lab/TECHNICAL_DESIGN.md`

### AI + another module

Required sources:

- the complete AI pair;
- the complete PLAN + TECHNICAL_DESIGN pair of every directly affected module;
- transversal contracts required by dependency impact.

### Game-creation AI

Required sources:

- complete AI pair;
- M15 pair;
- M08 pair;
- M09 pair;
- M06 pair when sessions/results are involved.

### Creative-media AI

Required sources:

- complete AI pair;
- M15 pair;
- directly affected module pair;
- relevant creative-media canonical documents when the feature is explicitly in that surface.

## AI authority firewall

The coordinator must preserve these boundaries:

```text
MORISE AI
  → understands / classifies / plans / proposes / orchestrates / validates AI work
  → does NOT become the owner of another module's authoritative business state

Provider / Worker
  → executes an assigned capability
  → does NOT become MORISE AI's brain or authority

Owner module
  → validates and commits its own business state
```

An AI result may be:

- candidate;
- proposal;
- evidence;
- VALID;
- INVALID;
- DEGRADED;
- INCONCLUSIVE;

but it cannot bypass the owning module's commit contract.

## AI fabrication sequence

```text
REQUEST
→ AUTHENTICATE
→ CLASSIFY
→ CONTEXT
→ INTENT
→ REQUIREMENTS
→ PLAN
→ POLICY
→ RESOURCE RESERVATION
→ EXECUTE
→ VALIDATE
→ OWNER COMMIT
→ MEMORY ELIGIBILITY
→ EVALUATE
→ EVOLUTION ELIGIBILITY
```

Terminal conditions remain those defined by the canonical AI pair, including rejection, blocking, degradation, inconclusive, cancellation and rollback.

## AI worker safety

For AI-related worker tasks:

- never place secrets in task packets;
- never grant production service-role credentials;
- never allow arbitrary tool execution when an allowlist exists;
- never treat external provider output as trusted by default;
- never allow a worker to publish business state directly;
- never allow an AI agent to rewrite its own canonical authority;
- never create a second AI router, brain, memory authority, provider registry or evolution authority.

## AI verification gate

Before an AI task is promoted to VERIFIED, the coordinator checks:

```text
CANONICAL AI PAIR READ
+ CONTRACT IMPLEMENTED
+ TYPE / UNIT TESTS
+ INTEGRATION TESTS
+ SECURITY / PRIVACY TESTS
+ FAILURE / RECOVERY TESTS
+ OBSERVABILITY EVIDENCE
+ DEPENDENCY IMPACT
+ EXACT COMMIT EVIDENCE
= AI TASK VERIFIED
```

For user-facing AI behavior, applicable browser and mobile evidence is also required.

## Non-authority statement

This bridge is a routing and comprehension gate. It must never be expanded into a third AI specification. If a behavior is missing here but exists in a canonical AI document, the canonical AI document wins.
