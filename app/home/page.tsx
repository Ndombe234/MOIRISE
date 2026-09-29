import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MoriseNavigation, WorldQuickNav } from "@/components/morise-navigation";
import "./home-world.css";

const moments = [
  { href: "/discover", label: "Something new", text: "Let the SYSTEM find a small experience that fits your current context.", tone: "teal" },
  { href: "/play", label: "A solo moment", text: "Start something you can enjoy even when the world is quiet.", tone: "lavender" },
  { href: "/create", label: "Make something", text: "Create a piece of your world and keep it as a memory.", tone: "amber" },
];

export default async function HomeWorldPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/sign-in");

  return (
    <main className="world-main">
      <section className="world-shell" aria-labelledby="world-title">
        <MoriseNavigation />
        <WorldQuickNav />

        <header className="world-header">
          <div>
            <span className="world-brand">MORISE</span>
            <span className="world-header-sub">A world coordinated by your SYSTEM</span>
          </div>
          <Link className="world-system-link" href="/system">SYSTEM <span>↗</span></Link>
        </header>

        <section className="world-intro" aria-labelledby="world-title">
          <div className="world-intro-copy">
            <p className="world-kicker">YOUR WORLD · READY</p>
            <h1 id="world-title">What feels right <em>now?</em></h1>
            <p className="world-lead">You do not have to learn a catalogue of features. Start with one real action. MORISE will keep the rest of the experience around it.</p>
          </div>
          <aside className="world-system-card" aria-label="SYSTEM guidance">
            <span className="world-card-label">SYSTEM / GUIDANCE</span>
            <strong>Your next step can stay simple.</strong>
            <p>No crowded dashboard. No forced path. Your actions create the history that shapes your Player.</p>
            <div className="world-card-state"><i /> Ready · solo-friendly</div>
          </aside>
        </section>

        <section className="world-moments" aria-labelledby="moments-title">
          <div className="world-section-heading">
            <div>
              <span className="world-kicker">SUGGESTED BY CONTEXT</span>
              <h2 id="moments-title">Three quiet openings</h2>
            </div>
            <span className="world-section-note">The SYSTEM can change these as you act.</span>
          </div>
          <div className="world-action-grid">
            {moments.map((moment, index) => (
              <Link className={`world-action world-action-${moment.tone}`} href={moment.href} key={moment.href}>
                <span className="world-action-index">0{index + 1}</span>
                <span className="world-action-orb" aria-hidden="true" />
                <span className="world-action-copy"><strong>{moment.label}</strong><small>{moment.text}</small></span>
                <span className="world-action-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="world-lower-grid">
          <article className="world-soft-panel">
            <span className="world-kicker">SOLO-FIRST</span>
            <h2>You are not waiting for a crowd.</h2>
            <p>MORISE remains useful when you are the only Player online. Social connections appear when real activity gives them a reason to exist.</p>
            <Link className="world-text-link" href="/play">Enter a solo experience <span>→</span></Link>
          </article>
          <article className="world-soft-panel world-memory-panel">
            <span className="world-kicker">MEMORY</span>
            <h2>Your moments can stay with you.</h2>
            <p>Photos, videos, audio and creations can become private memories. Nothing is shared or used for learning without the corresponding permission.</p>
            <Link className="world-text-link" href="/system/memories">Open Memory <span>→</span></Link>
          </article>
        </section>

        <footer className="world-footer">
          <span><i /> SYSTEM context active</span>
          <span>English fallback · 20 locales ready</span>
          <span>Real actions only</span>
        </footer>
      </section>
    </main>
  );
}
