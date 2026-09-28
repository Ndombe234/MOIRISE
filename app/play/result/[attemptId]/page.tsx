import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGameDefinition } from "@/lib/play/definitions";
import { validateAttemptId } from "@/lib/play/result-validation";
import { ShareMomentButton } from "@/components/play/share-moment-button";

type Params = Promise<{ attemptId: string }>;

export default async function PlayResultPage({ params }: { params: Params }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { attemptId } = await params;
  const id = validateAttemptId(attemptId);

  const { data: attempt, error } = await supabase
    .from("play_attempts")
     .select("attempt_id, game_id, status, score, duration_ms, signals, moment_candidate, share_token, created_at")
    .eq("attempt_id", id)
    .eq("player_id", user.id)
    .maybeSingle();

  if (error) throw new Error("Unable to load result.");
  if (!attempt) notFound();

  const game = getGameDefinition(attempt.game_id);
  const shareUrl = attempt.share_token ? "/play/m/" + attempt.share_token : "/play/result/" + id;

  return (
    <main className="play-main">
      <section className="play-shell">
        <header className="play-topbar">
          <Link href="/play" className="play-brand">MORISE PLAY</Link>
          <nav aria-label="Result navigation">
            <Link href="/home">WORLD</Link>
            <Link href="/system">SYSTEM</Link>
          </nav>
        </header>

        <section className="play-result">
          <p className="play-eyebrow">MOMENT / RESULT</p>
          <h1>{game?.title ?? "PLAY"}</h1>
          <div className="play-result-score">
            <span>Score</span>
            <strong>{attempt.score}</strong>
          </div>
          <div className="play-result-grid">
            <div><span>Status</span><strong>{attempt.status}</strong></div>
            <div><span>Durée</span><strong>{Math.round(attempt.duration_ms / 1000)}s</strong></div>
            <div><span>Signaux</span><strong>{Object.keys(attempt.signals ?? {}).length}</strong></div>
          </div>
          {attempt.moment_candidate && typeof attempt.moment_candidate === "object" && !Array.isArray(attempt.moment_candidate) ? (
            <article className="play-moment">
              <p className="play-eyebrow">MOMENT CANDIDATE</p>
              <h2>{String((attempt.moment_candidate as Record<string, unknown>).title ?? "")}</h2>
              <p>{String((attempt.moment_candidate as Record<string, unknown>).summary ?? "")}</p>
            </article>
          ) : null}
          <div className="play-result-actions">
            <Link className="play-primary-button" href={game?.launchPath ?? "/play"}>Rejouer</Link>
            attempt.share_token ? <ShareMomentButton url={shareUrl} /> : <Link className="play-result-secondary" href={shareUrl}>Lien du résultat</Link>
          </div>
          <p className="play-hint">{attempt.share_token ? "Ce Moment partage uniquement le résultat de jeu. Aucun profil ou historique privé n’est exposé." : "Ce résultat reste privé car aucun Moment partageable n’a été généré."}</p>
        </section>
      </section>
    </main>
  );
}