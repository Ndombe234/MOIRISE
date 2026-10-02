# MOIRISE — USER JOURNEYS FOR SIMULATION

These are cross-module test journeys, not new product requirements. The relevant owner documents remain authoritative.

## U01 — New international user
Landing → language/locale choice → registration → profile → discovery → first interaction → PLAY → progression → return to SOCIAL.

Check:
- no fake social proof;
- locale survives navigation;
- Unicode name works;
- empty states are coherent;
- first-use guidance is understandable without insider knowledge.

## U02 — Returning user
Login → SOCIAL → message/interaction → WORLD → PLAY → progression/reward → notification → return to SOCIAL.

Check:
- session restoration;
- data consistency;
- reward authority;
- navigation and deep links;
- back/refresh behavior.

## U03 — Creator
CREATE → compose → validate → publish → discovery → engagement → transformation/remix where authorized → audience signal → progression → community/event when eligible.

Check:
- author ownership;
- privacy;
- provenance;
- failed upload/publish recovery;
- duplicate submission;
- international text and media metadata.

## U04 — Community participant
Discover community → inspect visibility/rules → join when eligible → participate → challenge/activity → event → return.

Check:
- membership authority;
- visibility restrictions;
- revoked/removed membership;
- event eligibility;
- cross-loop projections.

## U05 — Event participant
Discover event → inspect schedule → eligibility → join → activity → completion → result/reward where valid → post-event return.

Check:
- timezone conversion;
- stale event;
- closed event;
- duplicate participation;
- reward only from authoritative result.

## U06 — Unauthorized user
Attempt protected action from direct route and UI.

Expected:
- correct authorization failure;
- no private-data leak;
- no state mutation;
- recovery to a usable UI.

## U07 — Adversarial user
Double-click → rapid navigation → back/forward → refresh during action → retry → duplicate submission → malformed input → network interruption → reconnect.

Expected:
- idempotent behavior where required;
- deterministic error states;
- no data corruption;
- no blank-screen route.

## U08 — International/mobile user
Android-sized viewport → touch navigation → keyboard → multilingual/Unicode input → language switch → timezone-sensitive screen → slow network → resume.

Expected:
- no overflow or hidden controls;
- state preserved during locale change;
- accessible touch targets;
- correct local date/time presentation;
- graceful degraded behavior.

## U09 — Elevated-role user
Use only documented admin/moderator capabilities.

Expected:
- role boundary enforced;
- ordinary member cannot escalate;
- privileged action audited where required.

## U10 — Regression journey
After any major shared change:
U01 → U02 → relevant owner journey → affected cross-loop transitions → production smoke.

Never assume a local fix is isolated until regression proves it.
