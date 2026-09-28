"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./morise-navigation.css";

const primary = [
  { href: "/home", label: "WORLD", icon: "W" },
  { href: "/communities", label: "ALLIES", icon: "◎" },
  { href: "/social", label: "LINK", icon: "S" },
  { href: "/play", label: "PLAY", icon: "▶" },
];

const menuSections = [
  {
    title: "PLAYER",
    items: [
      { href: "/player", label: "Profile", icon: "P" },
      { href: "/system/progression", label: "Progression", icon: "↗" },
      { href: "/system/memories", label: "Memories", icon: "◇" },
      { href: "/activities", label: "Activity", icon: "◷" },
    ],
  },
  {
    title: "SOCIAL",
    items: [
      { href: "/social", label: "Moments", icon: "S" },
      { href: "/social?mode=following", label: "Following", icon: "↗" },
      { href: "/events", label: "Alerts & Events", icon: "!" },
    ],
  },
  {
    title: "WORLD",
    items: [
      { href: "/discover", label: "Discover", icon: "✦" },
      { href: "/create", label: "Create", icon: "＋" },
      { href: "/communities", label: "Communities", icon: "◎" },
      { href: "/activities", label: "Activities", icon: "◇" },
      { href: "/events", label: "Events", icon: "◷" },
    ],
  },
  {
    title: "PLAY",
    items: [
      { href: "/play", label: "Games", icon: "▶" },
      { href: "/play", label: "Solo", icon: "1" },
      { href: "/play", label: "Challenges", icon: "◆" },
      { href: "/system/history", label: "History", icon: "◷" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { href: "/system", label: "Core System", icon: "◈" },
      { href: "/system/progression", label: "Progression", icon: "↗" },
      { href: "/system/history", label: "History", icon: "◷" },
      { href: "/system/memories", label: "Memories", icon: "◇" },
    ],
  },
];

export function MoriseNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="morise-topbar">
        <Link className="morise-topbar-brand" href="/home" aria-label="MORISE accueil">
          <span className="morise-topbar-mark" aria-hidden="true">◈</span>
          <span>MORISE</span>
        </Link>
        <div className="morise-topbar-actions">
          <Link className="morise-topbar-action" href="/create" aria-label="Créer" title="Créer">＋</Link>
          <Link className="morise-topbar-action" href="/discover" aria-label="Rechercher" title="Rechercher">⌕</Link>
          <button
            type="button"
            className={`morise-topbar-action morise-menu-button${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Fermer le menu MORISE" : "Open MORISE menu"}
            aria-expanded={menuOpen}
            aria-controls="morise-main-menu"
            title="Menu"
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="morise-menu-layer" role="presentation">
          <button type="button" className="morise-menu-backdrop" aria-label="Fermer le menu" onClick={() => setMenuOpen(false)} />
          <aside id="morise-main-menu" className="morise-menu-panel" aria-label="MORISE menu">
            <div className="morise-menu-header">
              <div>
                <span className="morise-menu-kicker">MORISE</span>
                <h2>Menu</h2>
              </div>
              <button type="button" className="morise-menu-close" onClick={() => setMenuOpen(false)} aria-label="Fermer le menu">×</button>
            </div>
            <div className="morise-menu-profile">
              <span className="morise-menu-avatar" aria-hidden="true">P</span>
              <div><strong>Ton espace MORISE</strong><small>Accès rapide à toutes les fonctions</small></div>
            </div>
            <div className="morise-menu-grid">
              {menuSections.map((section) => (
                <section key={section.title} className="morise-menu-section">
                  <h3>{section.title}</h3>
                  <div className="morise-menu-items">
                    {section.items.map((item, index) => (
                      <Link href={item.href} key={`${item.href}-${item.label}-${index}`} className="morise-menu-item">
                        <span className="morise-menu-item-icon" aria-hidden="true">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </aside>
        </div>
      ) : null}

      <nav className="morise-global-nav" aria-label="MORISE primary navigation">
        <div className="morise-global-nav-inner">
          {primary.map((item) => {
            const active = pathname === item.href || (item.href !== "/home" && pathname.startsWith(`${item.href}/`));
            return (
              <Link className={`morise-global-link${active ? " is-active" : ""}`} href={item.href} key={item.href} aria-current={active ? "page" : undefined}>
                <span className="morise-global-icon" aria-hidden="true">{item.icon}</span>
                <span className="morise-global-label">{item.label}</span>
              </Link>
            );
          })}
          <button type="button" className={`morise-global-link morise-global-menu-link${menuOpen ? " is-active" : ""}`} onClick={() => setMenuOpen(true)} aria-label="Open MORISE menu">
            <span className="morise-global-icon" aria-hidden="true">☰</span>
            <span className="morise-global-label">MENU</span>
          </button>
        </div>
      </nav>
    </>
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
  return (
    <nav className="morise-context-nav" aria-label="World quick navigation">
      <span className="morise-context-title">WORLD</span>
      <div className="morise-context-links">
        {worldLinks.map((item) => (
          <Link href={item.href} key={item.href}>
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function SocialQuickNav({ mode }: { mode: "world" | "following" }) {
  return (
    <nav className="morise-context-nav morise-social-context" aria-label="Social feed navigation">
      <span className="morise-context-title">SOCIAL</span>
      <div className="morise-context-links morise-segmented">
        <Link className={mode === "world" ? "is-active" : ""} href="/social">World</Link>
        <Link className={mode === "following" ? "is-active" : ""} href="/social?mode=following">Following</Link>
      </div>
    </nav>
  );
}
