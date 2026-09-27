import { SYSTEM_DIMENSIONS, type SystemDimensionKey } from "@/lib/system/constants";
import type { Json } from "@/lib/supabase/database.types";
import type { SystemProgressionPayload } from "@/lib/system/types";

export function isSystemDimension(value: unknown): value is SystemDimensionKey {
  return typeof value === "string" && (SYSTEM_DIMENSIONS as readonly string[]).includes(value);
}

export function validateProgressionPayload(payload: unknown): SystemProgressionPayload {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid progression payload.");
  }

  const value = payload as Record<string, unknown>;
  const eventType = typeof value.eventType === "string" ? value.eventType.trim() : "";
  const idempotencyKey = typeof value.idempotencyKey === "string" ? value.idempotencyKey.trim() : "";
  const sourceType = typeof value.sourceType === "string" ? value.sourceType.trim() : "";
  const dimensionValue = value.dimensionKey;
  const dimensionKey = dimensionValue === null || dimensionValue === undefined ? null : dimensionValue;

  if (!eventType) throw new Error("Event type is required.");
  if (!idempotencyKey) throw new Error("Idempotency key is required.");
  if (idempotencyKey.length > 200) throw new Error("Idempotency key is too long.");
  if (!sourceType) throw new Error("Source type is required.");
  if (!Number.isInteger(value.xpDelta) || Number(value.xpDelta) < 0 || Number(value.xpDelta) > 10000) {
    throw new Error("XP delta is out of range.");
  }
  if (dimensionKey !== null && !isSystemDimension(dimensionKey)) {
    throw new Error("Invalid dimension.");
  }

  return {
    eventType,
    dimensionKey,
    xpDelta: Number(value.xpDelta),
    idempotencyKey,
    sourceType,
    sourceId: typeof value.sourceId === "string" ? value.sourceId : null,
    metadata: value.metadata && typeof value.metadata === "object"
      ? value.metadata as Json
      : {},
  };
}
