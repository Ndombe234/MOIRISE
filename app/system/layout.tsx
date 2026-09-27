import Link from "next/link";
import { signOut } from "@/app/auth/actions";

const systemLinks = [
  { href: "/system", label: "Overview" },
  { href: "/system/progression", label: "Progression" },
  { href: "/system/history", label: "History" },
  { href: "/system/memories", label: "Memory" },
];

export default function SystemLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="system-main">
      <section className="system-shell">
        <div className="system-shell-glow" aria-hidden="true" />
        <div className="system-shell-grid" aria-hidden="true" />
        <header className="system-shell-header">
          <Link className="system-brand" href="/system" aria-label="MORISE SYSTEM overview">
            <span className="system-brand-mark" aria-hidden="true">◈</span>
            <span>
              <strong>MORISE</strong>
              <small>SYSTEM</small>
            </span>
          </Link>
          <nav className="system-nav" aria-label="SYSTEM navigation">
            {systemLinks.map((link, index) => (
              <Link key={link.href} href={link.href} className={index === 0 ? "is-primary" : undefined}>
                <span className="system-nav-index">0{index + 1}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
        <footer className="system-footer">
          <Link className="hud-link-button" href="/player">Player</Link>
          <Link className="hud-link-button" href="/discover">Discover</Link>
          <form action={signOut}>
            <button className="hud-link-button" type="submit">Disconnect</button>
          </form>
          <span className="system-footer-status"><span aria-hidden="true" /> SYSTEM ONLINE</span>
        </footer>
      </section>
    </main>
  );
}
