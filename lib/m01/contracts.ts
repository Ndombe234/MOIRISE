export type AuthClass = "public" | "authenticated";

export interface RequestContext {
  requestId: string;
  traceId: string;
  actorId: string | null;
  sessionId: string | null;
  route: string;
  locale: string;
}

export interface SessionContext {
  actorId: string | null;
  sessionId: string | null;
  authenticated: boolean;
  email: string | null;
}

export type CapabilityStatus = "declared" | "available" | "degraded" | "disabled";

export interface CapabilityDefinition {
  id: string;
  version: number;
  ownerModule: "M01";
  status: CapabilityStatus;
  description: string;
}
