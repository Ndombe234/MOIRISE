import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const layout = readFileSync(resolve(process.cwd(), "app/system/layout.tsx"), "utf8");
const navigation = readFileSync(resolve(process.cwd(), "components/morise-navigation.tsx"), "utf8");

describe("MORISE primary navigation", () => {
  it("keeps the five understandable destinations visible", () => {
    expect(layout).toContain("<MoriseNavigation />");
    expect(navigation).toContain('{ href: "/home", label: "WORLD"');
    expect(navigation).toContain('{ href: "/communities", label: "ALLIES"');
    expect(navigation).toContain('{ href: "/social", label: "LINK"');
    expect(navigation).toContain('{ href: "/play", label: "PLAY"');
    expect(navigation).toContain('aria-label="MORISE primary navigation"');
    expect(navigation).toContain('aria-label="Open MORISE menu"');
  });

  it("provides the Facebook-like menu structure without copying its branding", () => {
    expect(navigation).toContain('aria-label="MORISE menu"');
    expect(navigation).toContain('PLAYER');
    expect(navigation).toContain('SOCIAL');
    expect(navigation).toContain('WORLD');
    expect(navigation).toContain('SYSTEM');
    expect(navigation).toContain('href: "/player"');
    expect(navigation).toContain('href: "/discover"');
    expect(navigation).toContain('href: "/create"');
    expect(navigation).toContain('href: "/system/progression"');
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
