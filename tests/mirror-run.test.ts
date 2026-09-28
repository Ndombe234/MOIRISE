import { describe, expect, it } from "vitest";
import { rotateTile, isConnected } from "../components/play/mirror-run";

describe("Mirror Run", () => {
  it("rotates a tile through four orientations", () => {
    expect(rotateTile(0, 1)).toBe(1);
    expect(rotateTile(3, 1)).toBe(0);
    expect(rotateTile(2, 2)).toBe(0);
  });

  it("recognizes a connected light path", () => {
    const tiles = [1, 2, 1, 0, 0, 0, 0, 0, 0];
    expect(isConnected(tiles, 3, 3)).toBe(true);
  });
});
