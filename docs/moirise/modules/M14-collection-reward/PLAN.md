# M14 — COLLECTION / REWARD ECONOMY — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
M14 est la seule autorité des grants, collection ownership, roulette et économie. Un modèle AI, une interface ou M05 ne peut pas écrire directement un reward ledger.

## 1. Reward grant
**Acteur :** M05/M06/M12 via événement validé. **Déclencheur :** entitlement event.
**Préconditions :** source event valide, reward rule version connue, event non déjà consommé.
**Séquence :** vérifier source → charger RewardRuleVersion → calculer grant → créer ledger entry avec sourceEventId → commit → projection collection → event REWARD_GRANTED.
Retry = même ledger entry.

## 2. Collection ownership
CollectionOwnership référence itemId, ownerId, quantity selon policy, acquisitionSource et version. Une acquisition doit être dérivable d'un ledger ou d'une règle explicite. Le client ne peut jamais augmenter quantity.

## 3. Titles
M05 confirme l'eligibility; M14 conserve ownership/collection si ce titre est collectible. Unlock et ownership sont deux étapes distinctes pour éviter une double autorité.

## 4. Roulette
Baseline documentée : 3 pulls/jour. Odds configurées : Common 50%, Rare 30%, Epic 13%, Legendary 5%, Mythic 2%.
**Séquence :** vérifier allowance → réserver Pull avec commandId → choisir résultat par RNG auditable/config version → commit outcome → ledger grant → projection.
Le modèle AI ne choisit jamais l'issue aléatoire.
Retry de la même pull = même outcome; RNG failure avant commit = aucune consommation.

## 5. One-million titles
Les 1 000 000 titres ne sont pas préinsérés comme 1 000 000 rows. Le catalogue utilise une grammaire/règle versionnée; une identité de titre est matérialisée pour un Player seulement lorsqu'elle est effectivement débloquée. Le titre débloqué conserve la règle, evidence et version qui l'ont produit.

## 6. Reconciliation
Le ledger est source d'autorité. Une tâche de reconciliation compare projections et ledger. Mismatch simple → rebuild projection. Mismatch grave → freeze du grant path concerné + rapport, jamais correction silencieuse d'un montant.

## 7. Reward presentation
Afficher source, nom, rarity, ruleVersion et delta collection. Ne pas afficher un compteur de rareté fictif ou un gain qui n'est pas encore commité.

## 8. États
Grant REQUESTED→VALIDATED→COMMITTED/FAILED. Roulette READY→RESERVED→RESOLVED/FAILED. Ownership ACTIVE/REVOKED.

## 9. Tests / DONE
Duplicate grant, invalid source, concurrent pulls, allowance limit, RNG interruption, one-million-title deterministic generation, reconciliation mismatch, mobile/desktop. DONE lorsque l'économie est entièrement server-authoritative et replay-safe.

## AI-INTÉGRATION M14 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M14 est l'unique autorité de collection, rewards, roulette et intégrité économique. AI peut analyser la collection, expliquer une rareté, suggérer une présentation, détecter des anomalies ou recommander une action. AI ne grant jamais, ne mint jamais, ne roll jamais et ne modifie jamais le ledger. Roulette = configuration versionnée + algorithme M14 + ledger idempotent + limites d'usage. Reward = evidence validée → entitlement → ledger → event. Toute proposition AI reste descriptive jusqu'à validation M14. Fallback : ledger et algorithmes déterministes continuent sans AI. DONE exige impossibilité technique de l'écriture directe par AI.

# D10 — M14 COLLECTION / REWARD — EXPANSION COMPORTEMENTALE
## Reward surfaces
Collection, titles, roulette, cards/collectibles and validated reward drops. M14 owns ledger/outcome; M05 owns progression.
## Roulette
Default 3 pulls/day with versioned odds (Common 50, Rare 30, Epic 13, Legendary 5, Mythic 2) unless product configuration is intentionally changed and audited.
## Viral surfaces
A player may share a newly earned title/item/result through a safe projection. Share never exposes private inventory details when policy forbids it.
## Collection loops
Discover → earn → inspect → customize/display → share → discover next related item. No fake scarcity or cash-purchase pressure.
## AI role
M15 can analyze collection balance and propose content ideas. It cannot grant rewards or choose lottery outcomes.
## DONE
Ledger idempotence, outcome audit, daily limit, duplicate prevention, share privacy, rollback and AI outage validated.

# D100K — M14 Collection / Reward — FORMAL VERIFICATION

Owner: M14. Scope: collection, reward ledger, roulette, economy. Dependencies: M05,M06,M10,M11,M12. Invariant: M14 alone owns authoritative reward/economy mutation.

Canonical transition: ACTOR → INTENT → PRECONDITIONS → CONTEXT/POLICY → INPUTS → AUTHORITY → GUARDS → STATE → OUTPUT → VALIDATION → COMMIT → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

Forbidden: hidden owner transfer, unauthorized mutation, silent privacy expansion, stale overwrite, duplicate authoritative mutation, or treating an unverified proposal as fact.

Proof must cover nominal, empty/no-data, failure, degraded/unavailable, replay, concurrency where relevant, refresh/reopen, permissions, mobile and desktop, and the module-specific invariant.

Impact path: M14 → consumers → contracts/events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.


## AI FABRICATION CONTEXT CONTRACT — ANTI-AMBIGUITY AND PROOF GATE

This document is an authoritative fabrication input for **M14-collection-reward**. It must be consumed with its complete canonical pair, applicable transversal contracts, dependency rules, definition of done, and current repository evidence. It never becomes a third authority.

### Controlled context gate
Before implementation, the agent MUST capture: branch/commit; exact files/functions/surfaces in scope; EXISTS/MISSING/TO_MODIFY/FORBIDDEN/AFFECTED_DEPENDENCY status; direct and transitive dependencies; relevant data/API/schema/event contracts; permissions/privacy/security constraints; acceptance criteria; required tests; browser/mobile checks; and evidence required for DONE. Missing decisions must be resolved from canonical evidence, not guessed.

### Fabrication sequence
**READ → RECONCILE CURRENT STATE → CHECK DEPENDENCIES → PLAN → IMPLEMENT → TEST → VALIDATE → INTEGRATE → REGRESSION → LOCK.** Code generation, isolated green tests, or worker summaries do not prove integrated correctness. The coordinator verifies the integrated commit independently.

### AI-specific authority rule
When this document concerns MORISE AI, the AI orchestrates and validates capabilities but does not silently acquire business-state authority owned by other modules. Providers/workers are execution instruments, not a second brain. Owner modules still validate and commit their own state.

### Error-reduction KPI
The engineering objective is to reduce avoidable errors by reducing undocumented choices. Track first-pass task success, correction count, integration defects, regressions, test failures, browser failures, and unresolved assumptions separately. An 80% first-pass target or 10–20% error envelope may be a KPI; it is not a guarantee and never replaces verification.

### Evidence and conflict gate
DONE requires the applicable proof chain: **code → type/build → focused tests → integration/contracts → runtime → browser (desktop/mobile where relevant) → error/reload/permission/security cases → dependency regression → fresh evidence**. Anything not demonstrated is **UNVERIFIED**. Any unresolved conflict between canonical documents and repository state blocks the affected path until the coordinator resolves the authority.
