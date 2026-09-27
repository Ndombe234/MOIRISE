export function normalizeHandle(value: string) {
  return value.trim().toLowerCase().replace(/^@+/, "");
}

export function validateDisplayName(value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return "Display name is required.";
  }

  if (normalized.length > 50) {
    return "Display name must be 50 characters or fewer.";
  }

  return null;
}

export function validateHandle(value: string) {
  const normalized = normalizeHandle(value);

  if (!normalized) {
    return null;
  }

  if (!/^[a-z0-9_]{3,24}$/.test(normalized)) {
    return "Handle must be 3–24 lowercase letters, numbers, or underscores.";
  }

  return null;
}

export function validatePlayerInput(displayName: string, handle: string) {
  return validateDisplayName(displayName) ?? validateHandle(handle);
}
