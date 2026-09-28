import { MoriseNavigation } from "@/components/morise-navigation";
import "./system-nav.css";

export default function SystemLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="system-main">
      <section className="system-shell">
        <MoriseNavigation />
        <section className="system-core-stage" aria-label="SYSTEM core">
          <span className="system-stage-orbit system-stage-orbit-one" aria-hidden="true" />
          <span className="system-stage-orbit system-stage-orbit-two" aria-hidden="true" />
          <span className="system-stage-line system-stage-line-one" aria-hidden="true" />
          <span className="system-stage-line system-stage-line-two" aria-hidden="true" />
          <div className="system-core-command">
            <span className="system-core-ring system-core-ring-outer" aria-hidden="true" />
            <span className="system-core-ring system-core-ring-inner" aria-hidden="true" />
            <span className="system-core-code">CORE</span><strong>SYSTEM</strong><small>ONLINE</small>
          </div>
          <div className="system-stage-caption"><strong>ONE CORE · FIVE DESTINATIONS</strong><span>Choose a door. Keep your place.</span></div>
        </section>
        {children}
        <footer className="system-footer"><span className="system-footer-status"><span aria-hidden="true" /> SYSTEM ONLINE</span><span className="system-footer-hint">SECONDARY TABS ARE IN MENU</span></footer>
      </section>
    </main>
  );
}
