# SÉCURITÉ TRANSVERSALE

## Trust boundaries

Browser → server actions/route handlers → service layer → data/provider adapters.

AI model/provider → untrusted output boundary.

Worker → sandbox boundary.

Admin UI → server authorization boundary.

## Règles obligatoires

- service-role/service keys uniquement côté serveur ;
- rôle provenant d'une session/authority serveur ;
- validation input ;
- output encoding/sanitization ;
- RLS pour les données Supabase concernées ;
- CSRF protections adaptées aux mutations ;
- rate limits ;
- audit pour les opérations sensibles ;
- secrets exclus des logs ;
- private message content exclu des logs généraux ;
- generated code sandboxed ;
- community workers isolés et opt-in ;
- AI ne peut pas s'accorder de permissions.

## Worker defaults

Community Worker : 1 logical CPU maximum, 512 MiB RAM maximum, GPU désactivé, storage désactivé par défaut, réseau borné. Les limites sont imposées par le runtime, pas par une variable UI.

Trusted Worker : machine explicitement autorisée, limites personnalisables par policy, toujours sandboxée.

## Prompt/data safety

Le contenu utilisateur ou externe est une donnée non fiable. Il ne peut pas modifier les tool schemas, permissions, system policies ou secrets.

## Recovery

Une révocation doit invalider les leases actives. Une tâche reprise doit respecter idempotence et version de capability.


# CONTEXT/MEMORY SECURITY D100K ADDENDUM
- Actor isolation is mandatory on every memory read/write.
- Exact location defaults to session/task scope and is redacted from telemetry.
- Sensitive attributes are never inferred from images/text and require explicit opt-in for persistence.
- Memory retrieval is filtered by purpose, visibility, sensitivity and temporal status.
- Deleted/superseded facts are removed from caches and retrieval indexes.
- Providers receive only task-authorized ContextPacket fields.
- Prompt injection inside stored memory is treated as untrusted data, never as policy.
- Share/feed/ranking systems cannot read private memory by default.



# D100K — LEGACY SECURITY BOUNDARY RESTORATION

Server authority is mandatory for permissions, role changes, private data access, progression/rewards, provider credentials and sensitive operations.

RLS is not replaced by TypeScript checks. Client visibility is not an authorization grant.

Role mutation sequence:
requester → authorizeRoleMutation → validateTarget → writeRole → audit → event.

Moderator/admin operations require explicit role policy and audit evidence. A route or button existing in the frontend never grants privilege.

Memory STORE, ANALYZE, SHARE and TRAIN are independent permissions. Private memory is never a default training input.

Translation of a private message inherits the original conversation/member authorization and cannot change publication visibility.

Media license/rights state is an authorization input. A successful generation is not proof of publication rights.

