import { describe, expect, it } from "vitest";

describe("public PLAY Moment token contract", () => {
  it("accepts only the 36-character hexadecimal share token shape", () => {
    expect(/^[a-f0-9]{36}$/i.test("0123456789abcdef0123456789abcdef01234567")).toBe(true);
    expect(/^[a-f0-9]{36}$/i.test("not-a-share-token")).toBe(false);
    expect(/^[a-f0-9]{36}$/i.test("g123456789abcdef0123456789abcdef01234567")).toBe(false);
  });
});