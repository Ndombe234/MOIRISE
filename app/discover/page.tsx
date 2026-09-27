import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import "./discover.css";

const intents = [
  ["01", "Discover", "Show me something I would not have searched for."],
  ["02", "Learn", "Open a path where curiosity can become knowledge."],
  ["03", "Create", "Find a direction that could become something I make."],
  ["04", "Play", "Find an experience I can start right now."],
  ["05", "Meet", "Explore interests that can lead to people and communities."],
] as const;

const domains = [
  "Technology", "Arts & Design", "Science", "Games", "Sport & Movement",
  "Music", "Film & Stories", "Learning", "Business & Projects", "Culture & Languages",
] as const;

export default async function DiscoverPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  return (
    <main className="discover-main">
      <section className="discover-shell" aria-labelledby="discover-title">
        <header className="discover-header">
          <Link href="/home" className="discover-brand">MORISE</Link>
          <nav aria-label="Discovery navigation"><Link href="/home">WORLD</Link><Link href="/system">SYSTEM</Link></nav>
        </header>
        <div className="discover-hero">
          <div><p className="discover-kicker">DISCOVERY / CURIOSITY MAP</p><h1 id="discover-title">Where do you want your curiosity to go?</h1><p className="discover-lead">Choose a direction, not an identity. MORISE can use your choices to open new paths without locking you into a category.</p></div>
          <div className="discover-signal" aria-label="Discovery status"><span className="discover-signal-dot" /><span>PLAYER-LED</span><small>YOUR CHOICES SHAPE THE MAP</small></div>
        </div>
        <section aria-labelledby="intent-title" className="discover-section">
          <div className="discover-section-heading"><div><p className="discover-index">01 / INTENT</p><h2 id="intent-title">What feels right now?</h2></div><span>Choose one</span></div>
          <div className="intent-grid">{intents.map(([index, title, description]) => <button className="intent-card" key={title} type="button" aria-label={`${title}: ${description}`}><span className="intent-index">{index}</span><strong>{title}</strong><small>{description}</small><span className="intent-arrow" aria-hidden="true">↗</span></button>)}</div>
        </section>
        <section aria-labelledby="domain-title" className="discover-section">
          <div className="discover-section-heading"><div><p className="discover-index">02 / PATHS</p><h2 id="domain-title">Choose a world to open</h2></div><span>Nothing permanent</span></div>
          <div className="domain-grid">{domains.map((domain, index) => <button type="button" className="domain-chip" key={domain}><span>{String(index + 1).padStart(2, "0")}</span>{domain}</button>)}</div>
        </section>
        <section className="detour" aria-labelledby="detour-title"><div><p className="discover-index">03 / DETOUR</p><h2 id="detour-title">Take one step sideways.</h2><p>Unexpected connections are part of the world. A future MORISE engine will use your activity to create bridges between different domains.</p></div><button type="button" className="detour-button">Open a detour <span aria-hidden="true">→</span></button></section>
        <footer className="discover-footer"><span>Discovery changes with you.</span><Link href="/home">Return to World →</Link></footer>
      </section>
    </main>
  );
}
