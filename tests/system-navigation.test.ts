import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const layout = readFileSync(resolve(process.cwd(), "app/system/layout.tsx"), "utf8");
const navigation = readFileSync(resolve(process.cwd(), "components/morise-navigation.tsx"), "utf8");

describe("MORISE primary navigation", () => {
  it("keeps the five primary destinations visible", () => {
    expect(layout).toContain("<MoriseNavigation />");
    expect(navigation).toContain('{ href: "/system", label: "SYSTEM"');
    expect(navigation).toContain('{ href: "/player", label: "PLAYER"');
    expect(navigation).toContain('{ href: "/home", label: "WORLD"');
    expect(navigation).toContain('{ href: "/social", label: "SOCIAL"');
    expect(navigation).toContain('{ href: "/play", label: "PLAY"');
    expect(navigation).toContain('aria-label="MORISE primary navigation"');
  });

  it("keeps the hamburger menu dedicated to secondary tabs", () => {
    expect(navigation).toContain('aria-label="Onglets secondaires MORISE"');
    expect(navigation).toContain('title="Menu secondaire"');
    expect(navigation).toContain('Onglets secondaires');
    expect(navigation).toContain('href: "/messages"');
    expect(navigation).toContain('href: "/friends"');
    expect(navigation).toContain('href: "/communities"');
    expect(navigation).toContain('href: "/reels"');
    expect(navigation).toContain('href: "/marketplace"');
    expect(navigation).toContain('href: "/settings"');
    expect(navigation).toContain('href: "/referral"');
  });

  it("keeps secondary SYSTEM tabs out of the main SYSTEM page", () => {
    expect(layout).not.toContain("system-secondary-links");
    expect(layout).not.toContain("system-disconnect-form");
    expect(layout).toContain("SECONDARY TABS ARE IN MENU");
  });
});
