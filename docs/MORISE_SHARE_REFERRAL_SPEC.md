# MORISE — SHARE & REFERRAL

## SHARE

Shareable links are part of SOCIAL/WORLD/PLAY. A share action should use the native Web Share API when available and fall back to copying the canonical URL.

Supported targets include:

- posts;
- PLAYER profiles;
- GUILDS;
- games;
- game results;
- activities;
- events;
- invite/referral links.

The URL must identify the resource without exposing private data.

## INVITE / REFERRAL

Every PLAYER receives one stable referral code and personal invite URL:

`/invite?ref=<code>`

Flow:

1. Existing PLAYER opens their personal invite page.
2. MORISE shows the personal link.
3. The PLAYER shares it using the device share sheet or copy fallback.
4. A visitor opens `/invite?ref=...`.
5. MORISE stores the referral code in a secure first-party cookie for 30 days.
6. Visitor creates an account.
7. Signup passes the referral code into Supabase Auth metadata.
8. Player bootstrap records the referral server-side.
9. Referral status starts at `joined` and can later become `activated` or `rewarded`.

## Anti-abuse baseline

- no self-referrals;
- one referred player can have one referrer;
- referral ownership is server-side;
- client cannot directly award rewards;
- reward transitions must be performed by trusted server-side logic;
- codes are generated server-side and unique;
- referral tables are protected by RLS.

## Rewards

The referral system records attribution first. Reward rules should be attached later to verified activation milestones and should use MORISE-native rewards rather than direct cash payouts.

## UX

The invite feature must not dominate the main navigation. It belongs in MENU / PLAYER / ALLIES and can be surfaced contextually after meaningful activity.
