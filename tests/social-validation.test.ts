import { describe, expect, it } from "vitest";
import { normalizeCommentBody, normalizeMediaUrl, normalizePostBody } from "@/lib/social/validation";

describe("social validation", () => {
  it("normalizes post and comment text", () => {
    expect(normalizePostBody("  hello MORISE  ")).toBe("hello MORISE");
    expect(normalizeCommentBody("  nice discovery  ")).toBe("nice discovery");
  });

  it("rejects empty and oversized text", () => {
    expect(() => normalizePostBody("   ")).toThrow();
    expect(() => normalizeCommentBody("   ")).toThrow();
    expect(() => normalizePostBody("x".repeat(5001))).toThrow();
    expect(() => normalizeCommentBody("x".repeat(2001))).toThrow();
  });

  it("accepts only http/https media URLs", () => {
    expect(normalizeMediaUrl("")).toBeNull();
    expect(normalizeMediaUrl("https://example.com/image.png")).toBe("https://example.com/image.png");
    expect(() => normalizeMediaUrl("javascript:alert(1)")).toThrow();
    expect(() => normalizeMediaUrl("not-a-url")).toThrow();
  });
});
