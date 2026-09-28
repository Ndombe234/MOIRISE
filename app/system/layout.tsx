import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import "./system-nav.css";

const primaryLinks = [
  { href: "/player", label: "PLAYER", code: "01", note: "Identity", position: "top-left" },
  { href: "/home", label: "WORLD", code: "02", note: "Explore", position: "top-right" },
  { href: "/social", label: "SOCIAL", code: "03", note: "Connect", position: "bottom-left" },
  { href: "/play", label: "PLAY", code: "04", note: "Experience", position: "bottom-right" },
];

const secondaryLinks = [
  { href: "/system/progression", label: "Progression" },
  { href: "/system/history", label: "History" },
  { href: "/system/memories", label: "Memories" },
  { href: "/communities", label: "Communities" },
  { href: "/activities", label: "Activities" },
  { href: "/events", label: "Events" },
];

export default function SystemLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="system-main">
      <section className="system-shell">
        <div className="system-shell-glow" aria-hidden="true" />
        <div className="system-shell-grid" aria-hidden="true" />

        <header className="system-shell-header system-shell-header-exceptional">
          <Link className="system-brand" href="/system" aria-label="MORISE SYSTEM overview">
            <span className="system-brand-mark" aria-hidden="true">◈</span>
            <span>
              <strong>MORISE</strong>
              <small>SYSTEM</small>
            </span>
          </Link>

          <div className="system-command-constellation">
            <span className="system-constellation-line system-constellation-line-a" aria-hidden="true" />
            <span className="system-constellation-line system-constellation-line-b" aria-hidden="true" />
            <span className="system-constellation-line system-constellation-line-c" aria-hidden="true" />
            <span className="system-constellation-line system-constellation-line-d" aria-hidden="true" />

            <nav className="system-primary-nav" aria-label="Primary SYSTEM navigation">
              {primaryLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`system-command-node system-command-node-${link.position}`}>
                  <span className="system-command-orbit" aria-hidden="true" />
                  <span className="system-command-code">{link.code}</span>
                  <span className="system-command-label">{link.label}</span>
                  <span className="system-command-note">{link.note}</span>
                </Link>
              ))}
            </nav>

            <Link className="system-core-command" href="/system" aria-current="page">
              <span className="system-core-ring system-core-ring-outer" aria-hidden="true" />
              <span className="system-core-ring system-core-ring-inner" aria-hidden="true" />
              <span className="system-core-code">CORE</span>
              <strong>SYSTEM</strong>
              <small>ONLINE</small>
            </Link>
          </div>
        </header>

        <nav className="system-secondary-nav" aria-label="SYSTEM utilities">
          <span className="system-secondary-caption">SYSTEM MODULES</span>
          <div className="system-secondary-links">
            {secondaryLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </div>
          <form action={signOut} className="system-disconnect-form">
            <button type="submit" className="system-disconnect">Disconnect</button>
          </form>
        </nav>

        {children}

        <footer className="system-footer">
          <span className="system-footer-status"><span aria-hidden="true" /> SYSTEM ONLINE</span>
          <span className="system-footer-hint">PRIMARY COMMANDS SURROUND THE CORE</span>
        </footer>
      </section>
    </main>
  );
}
