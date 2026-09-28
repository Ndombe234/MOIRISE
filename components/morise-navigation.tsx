"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./morise-navigation.css";

// Navigation principale : toujours visible. Le menu hamburger est réservé aux onglets secondaires.
const primary = [
  { href: "/system", label: "SYSTEM", icon: "◈" },
  { href: "/player", label: "PLAYER", icon: "P" },
  { href: "/home", label: "WORLD", icon: "W" },
  { href: "/social", label: "SOCIAL", icon: "S" },
  { href: "/play", label: "PLAY", icon: "▶" },
];

const menuSections = [
  {
    title: "SOCIAL",
    items: [
      { href: "/messages", label: "Messages", icon: "✉" },
      { href: "/friends", label: "Friends", icon: "◎" },
      { href: "/communities", label: "Groups", icon: "◉" },
      { href: "/social?mode=following", label: "Following", icon: "↗" },
      { href: "/events", label: "Alerts & Events", icon: "!" },
    ],
  },
  {
    title: "CREATOR",
    items: [
      { href: "/create", label: "Create", icon: "＋" },
      { href: "/reels", label: "Reels", icon: "▷" },
      { href: "/pages", label: "Pages", icon: "▣" },
      { href: "/marketplace", label: "Marketplace", icon: "⌂" },
    ],
  },
  {
    title: "PLAYER",
    items: [
      { href: "/player", label: "Profile", icon: "P" },
      { href: "/system/progression", label: "Progression", icon: "↗" },
      { href: "/system/history", label: "History", icon: "◷" },
      { href: "/system/memories", label: "Memories", icon: "◇" },
      { href: "/activities", label: "Activity", icon: "◷" },
      { href: "/bookmarks", label: "Saved", icon: "▮" },
    ],
  },
  {
    title: "WORLD",
    items: [
      { href: "/discover", label: "Discover", icon: "✦" },
      { href: "/communities", label: "Groups", icon: "◎" },
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
  {
    title: "ACCOUNT",
    items: [
      { href: "/settings", label: "Settings & Privacy", icon: "⚙" },
      { href: "/help", label: "Help & Support", icon: "?" },
      { href: "/referral", label: "Invite & Referral", icon: "♥" },
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
        <Link className="morise-topbar-brand" href="/system" aria-label="MORISE SYSTEM">
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
            aria-label={menuOpen ? "Fermer le menu secondaire" : "Ouvrir le menu secondaire"}
            aria-expanded={menuOpen}
            aria-controls="morise-secondary-menu"
            title="Menu secondaire"
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="morise-menu-layer" role="presentation">
          <button type="button" className="morise-menu-backdrop" aria-label="Fermer le menu" onClick={() => setMenuOpen(false)} />
          <aside id="morise-secondary-menu" className="morise-menu-panel" aria-label="Onglets secondaires MORISE">
            <div className="morise-menu-header">
              <div>
                <span className="morise-menu-kicker">MORISE</span>
                <h2>Menu</h2>
                <small className="morise-menu-subtitle">Onglets secondaires</small>
              </div>
              <button type="button" className="morise-menu-close" onClick={() => setMenuOpen(false)} aria-label="Fermer le menu">×</button>
            </div>
            <div className="morise-menu-profile">
              <span className="morise-menu-avatar" aria-hidden="true">P</span>
              <div><strong>Ton espace MORISE</strong><small>Les fonctions secondaires sont regroupées ici.</small></div>
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
            <div className="morise-menu-footer">
              <Link href="/settings" className="morise-menu-footer-link">⚙ Paramètres</Link>
              <Link href="/help" className="morise-menu-footer-link">? Aide</Link>
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
        </div>
      </nav>
    </>
  );
}

export const worldLinks = [
  { href: "/discover", label: "Discover", icon: "✦" },
  { href: "/play", label: "Play", icon: "▶" },
  { href: "/create", label: "Create", icon: "＋" },
  { href: "/communities", label: "Groups", icon: "◎" },
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
