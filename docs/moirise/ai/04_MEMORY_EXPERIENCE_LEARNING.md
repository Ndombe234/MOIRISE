# MORISE AI — MEMORY / EXPERIENCE / LEARNING

## Memory layers

1. Session Memory
2. Player Memory
3. Experience Memory
4. World Memory
5. Community Memory
6. Creator Memory
7. Skill Memory
8. System Observation

## Memory entry

```ts
interface MemoryEntry {
  id: string;
  scope: string;
  type: string;
  content: unknown;
  provenance: Provenance;
  permissions: string[];
  confidence: number;
  retention: "ephemeral" | "short" | "long";
  createdAt: string;
  expiresAt?: string;
}
```

## Retrieval

`QUERY → SCOPE CHECK → RELEVANCE → DEDUP → COMPRESS → CONTEXT`

## Experience

```ts
interface Experience {
  id: string;
  type: string;
  capability: CapabilityId;
  inputHash: string;
  outputHash?: string;
  providerId?: string;
  resultStatus: "success" | "partial" | "failed";
  qualityScore?: number;
  feedback?: Feedback;
  provenance: Provenance;
  validated: boolean;
}
```

## Learning

Learning is not direct rewriting.

`EXPERIENCE → ANALYSIS → HYPOTHESIS → LEARNING CANDIDATE`

## Individual vs collective

Individual:
- affects player-specific recommendations or preferences.

Collective:
- requires aggregation;
- privacy filtering;
- poisoning controls;
- evaluation.

One user cannot directly change global rules.

## Knowledge states

```text
RAW
→ CANDIDATE
→ VERIFIED
→ ACTIVE
→ SUPERSEDED
→ REJECTED
```

## Feedback

User feedback becomes evidence with provenance and confidence. It is not automatically truth.

## Forgetting

Private/temporary memories must expire according to policy. Users can delete eligible personal data.
