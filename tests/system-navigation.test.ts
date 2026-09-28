import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const layout = readFileSync(resolve(process.cwd(), "app/system/layout.tsx"), "utf8");

describe("SYSTEM primary navigation", () => {
  it("keeps the five primary destinations directly visible in the SYSTEM shell", () => {
    expect(layout).toContain('href="/system"');
    expect(layout).toContain('href: "/player"');
    expect(layout).toContain('href: "/home"');
    expect(layout).toContain('href: "/social"');
    expect(layout).toContain('href: "/play"');
    expect(layout).toContain('aria-label="Primary SYSTEM navigation"');
  });

  it("keeps secondary utilities available and Disconnect as a form action", () => {
    expect(layout).toContain('href: "/system/progression"');
    expect(layout).toContain('href: "/system/history"');
    expect(layout).toContain('href: "/system/memories"');
    expect(layout).toContain('href: "/communities"');
    expect(layout).toContain('href: "/activities"');
    expect(layout).toContain('href: "/events"');
    expect(layout).toContain('<form action={signOut} className="system-disconnect-form">');
    expect(layout).toContain('>Disconnect</button>');
  });
});
