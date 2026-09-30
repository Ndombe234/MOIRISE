# MORISE AI — CREATIVE ENGINE / MEDIA / GAME CREATOR

## Creative capabilities

- text;
- image;
- image edit;
- video;
- music;
- audio;
- TTS;
- STT;
- vision;
- photo processing;
- BD/comic;
- embedding;
- search;
- moderation.

## Universal creative pipeline

`INTENT → BRIEF → POLICY → ROUTER → GENERATION → PROVENANCE → VALIDATION → STORAGE → PUBLISH/PRIVATE`

## Original-first

MORISE should create original material. It must reject or constrain requests that intentionally reproduce protected third-party assets or identifiable artist imitation when not authorized.

## Image

`IMAGE_INTENT → VISUAL_BRIEF → ORIGINALITY → PROVIDER → MODERATION → STORAGE`

## Video

`VIDEO_INTENT → SCRIPT → STORYBOARD → SCENE_PLAN → PROVIDER → VALIDATION`

## Music

`MUSIC_INTENT → BRIEF → PROVIDER → RIGHTS/PROVENANCE → VALIDATION`

The system must not assume that an API's generated music is automatically free of rights concerns.

## Translation

Local/browser first when feasible:
`LOCAL → CACHE → AUTHORIZED REMOTE`

Original text is preserved.

## Game Creator

The first controlled engines:
- Adventure 2D
- Battle 2D
- Puzzle 2D

3D uses approved engine adapters.

## GameSpecification

```ts
interface GameSpecification {
  id: string;
  version: number;
  engine: string;
  title: string;
  description: string;
  scenes: SceneSpec[];
  entities: EntitySpec[];
  rules: RuleSpec[];
  quests: QuestSpec[];
  rewards: RewardSpec[];
  assets: AssetRequest[];
  audio: AudioRequest[];
  difficulty: DifficultyConfig;
  winConditions: Condition[];
  lossConditions: Condition[];
  safetyPolicyVersion: string;
}
```

## Game creation

`PLAYER IDEA → INTENT → DESIGN → SPEC → VALIDATE → GENERATE → BUILD → SIMULATE → TEST → PREVIEW → PUBLISH/PRIVATE`

Generated code never executes directly in production.
