import type { CapabilityDefinition } from "@/lib/m01/contracts";

const DEFINITIONS: CapabilityDefinition[] = [
  {
    id: "m01.boot",
    version: 1,
    ownerModule: "M01",
    status: "available",
    description: "Application boot and recoverable shell state.",
  },
  {
    id: "m01.route",
    version: 1,
    ownerModule: "M01",
    status: "available",
    description: "Route normalization and ownership boundary.",
  },
  {
    id: "m01.session",
    version: 1,
    ownerModule: "M01",
    status: "available",
    description: "Server-derived authenticated session context.",
  },
  {
    id: "m01.capability-registry",
    version: 1,
    ownerModule: "M01",
    status: "available",
    description: "Versioned capability declarations.",
  },
  {
    id: "m01.ai-gateway",
    version: 1,
    ownerModule: "M01",
    status: "declared",
    description: "Single boundary toward M15; no provider is selected by UI.",
  },
  {
    id: "m01.event-bus",
    version: 1,
    ownerModule: "M01",
    status: "declared",
    description: "Post-commit event contract; durable delivery is not yet implemented.",
  },
];

export function listCapabilities(): readonly CapabilityDefinition[] {
  return DEFINITIONS;
}

export function resolveCapability(
  capabilityId: string,
  version = 1,
): CapabilityDefinition | null {
  return (
    DEFINITIONS.find(
      (definition) =>
        definition.id === capabilityId && definition.version === version,
    ) ?? null
  );
}
