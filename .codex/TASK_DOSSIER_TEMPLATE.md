# MOIRISE — Task Dossier Template

Use this template to create a bounded worker assignment.

```yaml
task_id: "<stable id>"
feature_id: "<canonical feature id>"
module_owner: "Mxx"
role: "R#"
objective: "<single observable outcome>"

canonical_sources:
  # For an Mxx task, both files are mandatory:
  # PLAN = WHAT, TECHNICAL_DESIGN = HOW.
  # For an AI task, both canonical AI files are mandatory.
  - "<exact canonical path>"
  - "<exact canonical path>"

canonical_read_rule:
  module_pair_required: true
  ai_pair_required_when_ai_in_scope: true
  transversal_dependencies_required_when_impacting_shared_contracts: true
  no_copied_specification: true

dependencies:
  required_tasks: []
  shared_contracts: []

write_surface:
  files: []
  symbols: []
  generated_outputs: []

read_surface:
  files: []
  modules: []

must_not_change:
  - "unrelated modules"
  - "unassigned shared surfaces"
  - "canonical sources outside explicit task scope"

preconditions: []
inputs: []
expected_outputs: []

verification:
  unit: []
  integration: []
  browser_desktop: []
  browser_mobile: []
  security: []
  resilience: []
  canonical_spec_trace:
    - "PLAN requirement → implementation/evidence"
    - "TECHNICAL_DESIGN contract → implementation/test/evidence"

handoff:
  evidence_required: true
  status_allowed:
    - VERIFIED
    - PARTIAL
    - BLOCKED
    - INCONCLUSIVE
```

## Task packet rule

The packet should contain only task-specific information plus references to canonical sources.

For a module task, the coordinator MUST pass the complete canonical pair:
`modules/<Mxx>/PLAN.md` + `modules/<Mxx>/TECHNICAL_DESIGN.md`.

For an AI task, the coordinator MUST pass:
`ai/AI_MASTER_PLAN.md` + `ai/AI_TECHNICAL_DESIGN.md`.

For cross-module tasks, include every directly affected module pair. Add the AI pair when M15, a capability, provider, worker, memory, or evolution path is affected.

Do not copy whole specifications into the packet.
Do not create a second business source of truth.
Do not create a third AI authority.
