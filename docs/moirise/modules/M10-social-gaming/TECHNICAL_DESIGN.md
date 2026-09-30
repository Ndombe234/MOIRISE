# M10 — SOCIAL GAMING — CONCEPTION TECHNIQUE

## Challenge model
Challenge has owner, target game/version, eligibility, invitation/acceptance, lifecycle, attempt and result refs. Mutations are server-authoritative.

## Social bridges
Validated game result may create a share post, challenge, rematch or community activity through events; M10 never writes Social tables directly.

## Cooperative/async
If a game supports co-op or asynchronous competition, the mode is declared in the GameManifest and validated before session creation.

## AI
M15 Social/Game agents can propose challenges, rematches, variants or compatible Players, but cannot bypass block/mute/privacy/permission policies.

## Living Objects
A Living Object may become a game seed. Branch metadata and contributor attribution are preserved.

## Tests
Unauthorized invite, duplicate acceptance, blocked player, stale game version, result tampering, rematch replay, mobile sharing and disconnected recovery.
