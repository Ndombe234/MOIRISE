import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { MoriseNavigation } from "@/components/morise-navigation";
import "./system-nav.css";

const secondaryLinks = [
  { href: "/system/progression", label: "Progression", code: "01" },
  { href: "/system/history", label: "History", code: "02" },
  { href: "/system/memories", label: "Memories", code: "03" },
  { href: "/communities", label: "Communities", code: "04" },
  { href: "/activities", label: "Activities", code: "05" },
  { href: "/events", label: "Events", code: "06" },
];

export default function SystemLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="system-main">
      <section className="system-shell">
        <MoriseNavigation />
        <header className="system-shell-header system-shell-header-exceptional">
          <Link className="system-brand" href="/system" aria-label="MORISE SYSTEM overview">
            <span className="system-brand-mark" aria-hidden="true">◈</span>
            <span><strong>MORISE</strong><small>SYSTEM</small></span>
          </Link>
          <div className="system-live-status" aria-label="SYSTEM online status"><span className="system-live-dot" aria-hidden="true" /><span>ONLINE</span><small>PLAYER LINK // ACTIVE</small></div>
        </header>

        <section className="system-core-stage" aria-label="SYSTEM core">
          <span className="system-stage-orbit system-stage-orbit-one" aria-hidden="true" />
          <span className="system-stage-orbit system-stage-orbit-two" aria-hidden="true" />
          <span className="system-stage-line system-stage-line-one" aria-hidden="true" />
          <span className="system-stage-line system-stage-line-two" aria-hidden="true" />
          <Link className="system-core-command" href="/system" aria-current="page">
            <span className="system-core-ring system-core-ring-outer" aria-hidden="true" />
            <span className="system-core-ring system-core-ring-inner" aria-hidden="true" />
            <span className="system-core-code">CORE</span><strong>SYSTEM</strong><small>ONLINE</small>
          </Link>
          <div className="system-stage-caption"><strong>ONE CORE · FIVE DESTINATIONS</strong><span>Choose a door. Keep your place.</span></div>
        </section>

        <nav className="system-secondary-nav" aria-label="SYSTEM modules">
          <div className="system-secondary-heading"><span className="system-secondary-caption">SYSTEM MODULES</span><small>Useful shortcuts, without competing with the main navigation.</small></div>
          <div className="system-secondary-links">
            {secondaryLinks.map((link) => <Link key={link.href} href={link.href}><span>{link.code}</span><strong>{link.label}</strong><em>↗</em></Link>)}
          </div>
          <form action={signOut} className="system-disconnect-form"><button type="submit" className="system-disconnect">Disconnect</button></form>
        </nav>

        {children}
        <footer className="system-footer"><span className="system-footer-status"><span aria-hidden="true" /> SYSTEM ONLINE</span><span className="system-footer-hint">PRIMARY NAVIGATION STAYS VISIBLE</span></footer>
      </section>
    </main>
  );
}
