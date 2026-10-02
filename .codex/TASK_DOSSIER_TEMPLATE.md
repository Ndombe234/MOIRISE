# MOIRISE — Task Dossier Template

Use this template to create a bounded worker assignment.

```yaml
task_id: "<stable id>"
feature_id: "<canonical feature id>"
module_owner: "Mxx"
role: "R#"
objective: "<single observable outcome>"

canonical_sources:
  - "<exact canonical path>"
  - "<exact canonical path>"

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

Do not copy whole module specifications into the packet.
Do not copy AI architecture into the packet.
Do not create a second business source of truth.
