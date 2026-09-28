import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPlayLaunchContext } from "@/lib/play/server";
import { PlayLauncher } from "@/components/play/play-launcher";
import "./play.css";

export default async function PlayPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const context = await getPlayLaunchContext();

  return (
    <main className="play-main">
      <section className="play-shell">
        <header className="play-topbar">
          <Link href="/home" className="play-brand">MORISE</Link>
          <nav aria-label="Play navigation">
            <Link href="/system">SYSTEM</Link>
            <Link href="/social">SOCIAL</Link>
          </nav>
        </header>

        <section className="play-hero">
          <div>
            <p className="play-eyebrow">PLAY / LAB</p>
            <h1>Une porte.<br />Des mondes à maîtriser.</h1>
            <p>Des expériences courtes, étranges et rejouables. Ton SYSTEM influence ce qui apparaît ensuite.</p>
          </div>
          <div className="play-system-note">
            <span>SYSTEM</span>
            <strong>Lv. {context?.level ?? 1}</strong>
            <small>sélection adaptative active</small>
          </div>
        </section>

        {context ? <PlayLauncher selection={context.selection} /> : null}

        <section className="play-lab-grid" aria-labelledby="lab-title">
          <div className="play-section-heading">
            <p className="play-eyebrow">LAB / EXPÉRIMENTAL</p>
            <h2 id="lab-title">Choisis autrement.</h2>
          </div>
          <div className="play-game-grid">
            <Link href="/play/echo-trace" className="play-game-card">
              <span>01</span><strong>Echo Trace</strong><small>Mémoire + précision</small>
            </Link>
            <Link href="/play/signal-bloom" className="play-game-card">
              <span>02</span><strong>Signal Bloom</strong><small>Timing + observation</small>
            </Link>
            <Link href="/play/shadow-courier" className="play-game-card">
              <span>03</span><strong>Shadow Courier</strong><small>Planification spatiale</small>
            </Link>
          </div>
        </section>

        <footer className="play-footer">
          <span>Play Lab — premières expériences du moteur MORISE.</span>
          <Link href="/home">Retour au World →</Link>
        </footer>
      </section>
    </main>
  );
}