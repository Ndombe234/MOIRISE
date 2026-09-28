const MAX_POST_LENGTH = 5000;
const MAX_COMMENT_LENGTH = 2000;
const MAX_MEDIA_URL_LENGTH = 2048;

export function normalizePostBody(value: string): string {
  const normalized = value.trim();
  if (normalized.length < 1 || normalized.length > MAX_POST_LENGTH) {
    throw new Error("Post must contain between 1 and 5000 characters.");
  }
  return normalized;
}

export function normalizeCommentBody(value: string): string {
  const normalized = value.trim();
  if (normalized.length < 1 || normalized.length > MAX_COMMENT_LENGTH) {
    throw new Error("Comment must contain between 1 and 2000 characters.");
  }
  return normalized;
}

export function normalizeMediaUrl(value: string): string | null {
  const normalized = value.trim();
  if (!normalized) return null;
  if (normalized.length > MAX_MEDIA_URL_LENGTH) {
    throw new Error("Media URL is too long.");
  }
  try {
    const url = new URL(normalized);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Media URL must use HTTPS.");
    }
  } catch {
    throw new Error("Media URL must be a valid HTTP or HTTPS URL.");
  }
  return normalized;
}