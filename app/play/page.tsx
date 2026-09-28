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
            <p className="play-eyebrow">SYSTEM / PLAY</p>
            <h1>Une porte.<br />Ton expérience.</h1>
            <p>
              Le SYSTEM choisit une expérience selon ton parcours, tes dimensions et ce qu'il apprend de ta façon de jouer.
              Tu n'as pas besoin de parcourir un catalogue.
            </p>
          </div>
          <div className="play-system-note">
            <span>SYSTEM</span>
            <strong>Lv. {context?.level ?? 1}</strong>
            <small>sélection adaptative active</small>
          </div>
        </section>

        {context ? (
          <PlayLauncher selection={context.selection} />
        ) : (
          <section className="play-launcher" aria-live="polite">
            <div>
              <p className="play-eyebrow">SYSTEM</p>
              <h2>Ton expérience se prépare.</h2>
              <p>Réessaie dans un instant.</p>
            </div>
          </section>
        )}

        <footer className="play-footer">
          <span>Le catalogue reste derrière le SYSTEM. Tu n'as qu'une porte à ouvrir.</span>
          <Link href="/home">Retour au World →</Link>
        </footer>
      </section>
    </main>
  );
}
