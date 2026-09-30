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
