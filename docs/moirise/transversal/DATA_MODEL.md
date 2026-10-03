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

