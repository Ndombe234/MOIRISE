import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const layout = readFileSync(resolve(process.cwd(), "app/system/layout.tsx"), "utf8");
const navigation = readFileSync(resolve(process.cwd(), "components/morise-navigation.tsx"), "utf8");

describe("SYSTEM primary navigation", () => {
  it("keeps the five primary destinations directly visible in the shared MORISE navigation", () => {
    expect(layout).toContain("<MoriseNavigation />");
    expect(navigation).toContain('{ href: "/system", label: "SYSTEM"');
    expect(navigation).toContain('{ href: "/player", label: "PLAYER"');
    expect(navigation).toContain('{ href: "/home", label: "WORLD"');
    expect(navigation).toContain('{ href: "/social", label: "SOCIAL"');
    expect(navigation).toContain('{ href: "/play", label: "PLAY"');
    expect(navigation).toContain('aria-label="MORISE primary navigation"');
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
