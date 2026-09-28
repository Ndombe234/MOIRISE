"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./morise-navigation.css";

const primary = [
  { href: "/system", label: "SYSTEM", icon: "◈" },
  { href: "/player", label: "PLAYER", icon: "P" },
  { href: "/home", label: "WORLD", icon: "W" },
  { href: "/social", label: "SOCIAL", icon: "S" },
  { href: "/play", label: "PLAY", icon: "▶" },
];

export function MoriseNavigation() {
  const pathname = usePathname();
  return (
    <nav className="morise-global-nav" aria-label="MORISE primary navigation">
      <div className="morise-global-nav-inner">
        {primary.map((item) => {
          const active = pathname === item.href || (item.href !== "/home" && pathname.startsWith(`${item.href}/`));
          return <Link className={`morise-global-link${active ? " is-active" : ""}`} href={item.href} key={item.href} aria-current={active ? "page" : undefined}>
            <span className="morise-global-icon" aria-hidden="true">{item.icon}</span><span className="morise-global-label">{item.label}</span>
          </Link>;
        })}
      </div>
    </nav>
  );
}

export const worldLinks = [
  { href: "/discover", label: "Discover", icon: "✦" },
  { href: "/play", label: "Play", icon: "▶" },
  { href: "/create", label: "Create", icon: "＋" },
  { href: "/communities", label: "Communities", icon: "◎" },
  { href: "/activities", label: "Activities", icon: "◇" },
  { href: "/events", label: "Events", icon: "◷" },
];

export function WorldQuickNav() {
  return <nav className="morise-context-nav" aria-label="World quick navigation">
    <span className="morise-context-title">WORLD</span>
    <div className="morise-context-links">{worldLinks.map((item) => <Link href={item.href} key={item.href}><span aria-hidden="true">{item.icon}</span>{item.label}</Link>)}</div>
  </nav>;
}

export function SocialQuickNav({ mode }: { mode: "world" | "following" }) {
  return <nav className="morise-context-nav morise-social-context" aria-label="Social navigation">
    <span className="morise-context-title">SOCIAL</span>
    <div className="morise-context-links morise-segmented">
      <Link className={mode === "world" ? "is-active" : ""} href="/social">World</Link>
      <Link className={mode === "following" ? "is-active" : ""} href="/social?mode=following">Following</Link>
      <Link className={mode === "world" ? "" : ""} href="/link">Link</Link>
      <Link href="/guilds">Guilds</Link>
    </div>
  </nav>;
}
