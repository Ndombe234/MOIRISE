# MODÈLE DE DONNÉES TRANSVERSAL

## Principes

Identity authority : auth session + profile ownership.
Business records : tables appartenant à un module.
Projection : vues/read models dédiés lorsque nécessaire.
Audit : événements séparés des données produit.
AI memory : tables distinctes des profils.
Provider evidence : provenance obligatoire.
Worker state : identité, trust, capability, quota, heartbeat, lease.
Artifacts : objet, version, provenance, owner, storage reference, validation status.

## Classes de données

PUBLIC : données publiées volontairement.
PLAYER_PRIVATE : préférences et contenus privés.
SENSITIVE : sécurité, secrets, moderation cases.
AI_CONTEXT : contexte temporaire autorisé.
AI_MEMORY : mémoire persistante consentie/scopée.
TELEMETRY : mesures techniques ou produit bornées.
AUDIT : actions administratives et sécurité.

## Règles

Une donnée ne change pas de classe simplement parce qu'un modèle IA la demande.
Les jointures inter-modules doivent être minimisées.
Les secrets ne résident jamais dans les documents, événements produit ou logs.
Les fichiers uploadés reçoivent un owner, MIME validé, taille, hash et lifecycle.


# CONTEXT/MEMORY D100K DATA MODEL ADDENDUM
The following logical entities are canonical and must map to the implementation owner indicated here.

## ContextFact
actor_ref, field_path, value_ref, value_type, source_turn_id, provenance, confidence, sensitivity, temporal_scope, valid_from, valid_until, consent_basis, visibility, status, timestamps.

## ContextRelation
source_fact_id, relation_type, target_fact_id, confidence, source_turn_id, status.

## ContextCorrection
correction_id, target_fact_id, replacement_fact_id, reason, confirmed, actor_ref, timestamp.

## ContextFrame
session_id, actor_ref, current_topic, current_location_node, current_task, active_entities, unresolved_references, last_corrections.

## ContextPacket
request_id, actor_ref, locale, active_frame, explicit_facts, relevant_memory, conflicts, privacy_filter, authorized_tools.

## Ownership
M02 = durable Player facts; M01 = session identity; M03 = conversation context; M04 = World state; M12 = temporal event state; M13 = retrieval; M15 = extraction/orchestration.



# D100K — LEGACY PERSISTENCE CONTRACT RESTORATION

## Base data invariants
When PostgreSQL/Supabase is used by an implementation:
- UUID primary identifiers use `gen_random_uuid()` unless an externally issued identifier is explicitly required.
- Instants are stored as `timestamptz`; timezone is presentation state, not persistence semantics.
- `jsonb` is restricted to extensible metadata, provider payloads and bounded state snapshots. Authoritative business fields remain typed.
- User-owned records reference `auth.users(id)` directly or an owned application profile relation when required by the canonical module.
- Server-side authorization and RLS are both required where applicable; client state never becomes the persistence authority.
- Idempotency keys are first-class for retryable mutations.

## Memory Vault data classes
Memory media types may include PHOTO, VIDEO, AUDIO, TEXT, CREATION, MOMENT and CARD. Memory lifecycle may include UPLOADING, READY, PROCESSING, FAILED and DELETED.

Memory permissions are distinct:
- STORE;
- ANALYZE;
- SHARE;
- TRAIN.

Granting one permission never implies the others. Private memory cannot enter global learning by default.

## Async jobs
Long-running work is represented by an explicit job identity, status, resource request, owner/privacy scope, idempotency key, timeout/expiry, result reference and validation outcome. A job is not authoritative merely because it exists.

## Translation data
Message translations and cached translations are derived data. Original message authority remains M03. Translation entries retain source/target locale, source message/reference, version, status and provenance.

## Rights/provenance
Media/creative records retain sourceRef, owner, provenance, license/permission class, derivation lineage and visibility. Publication rights are separate from generation success.



# D100K — RESTORED NOTIFICATION / DEVICE / AUDIT DATA

Derived notification projections may reference a real source event, recipient, priority, status, readAt, expiry and action target. Notifications never become authoritative business state.

Device profiles record bounded execution capability metadata and are not a resource-sharing authorization. Resource sharing requires the separate worker consent/trust contract.

Administrative/audit records preserve actor, action, target/resource, result, correlation ID and timestamp. They are evidence, not editable replacement state.

