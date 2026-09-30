# MORISE AI — GAME CREATION VS GAME EXECUTION

## Non-negotiable separation
AI creation and game execution are different systems.

### Creation
`PLAYER IDEA → INTENT → GAME SPEC → CODE/ASSETS/AUDIO → BUILD → SIMULATION → TEST → PREVIEW → PACKAGE`

MORISE AI may use configured providers for reasoning, code, image, video, music or audio generation.

### Execution
`GAME PACKAGE → MOIRISE RUNTIME → INPUT/RENDER/PHYSICS/AUDIO/SAVE → RESULT`

The runtime must not require the provider that created the game.

## 2D runtime
Canvas/WebGL/Phaser-compatible execution. Generated games must use an approved runtime contract.

## 3D runtime
Three.js/Babylon/PlayCanvas/WebGL/WebGPU-compatible execution according to the package adapter.

## Offline requirement
A successfully published package must remain playable when Gemini, DeepSeek, Pollinations, OpenRouter and other creation providers are unavailable.

## Generated code safety
Generated code is treated as untrusted until sandboxed, tested, scanned and packaged. No direct production execution.

## Learning loop
MORISE may analyze validated game telemetry and player feedback to propose improvements. A proposal becomes code only through the Evolution Sandbox contract.
