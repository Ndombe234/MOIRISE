# M14 — COLLECTION / REWARD ECONOMY

Owner: collections, original items/cards, titles, badges, rarity, rewards, provenance, roulette and economy integrity.

Reward flow: VALIDATED ACTION → REWARD RULE → OUTCOME → PROVENANCE → GRANT → COLLECTION.

Titles use deterministic grammar/evidence and are materialized on unlock instead of pre-creating millions of rows. Roulette configuration is versioned and server-authoritative; client code never chooses rarity/outcome.

AI can generate original assets and analyze/simulate economy behavior, but it cannot directly grant critical rewards or rewrite the economy.

## Detailed economy integrity
All reward outcomes use versioned rules. Historical rewards retain their source rule version.
No client-side RNG decides rarity.
No repeated network retry may consume an additional pull or grant another reward.

## Collection semantics
Ownership records are per Player. Public collection projection contains only items the Player chooses to expose.
Creator attribution remains linked to source contributions.
