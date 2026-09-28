import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGameDefinition } from "@/lib/play/definitions";
import { PlayGameHost } from "@/components/play/play-game-host";
import { EchoTrace } from "@/components/play/echo-trace";
import { SignalBloom } from "@/components/play/signal-bloom";
import { ShadowCourier } from "@/components/play/shadow-courier";
import type { GameDefinition, PlayResult } from "@/lib/play/types";

type PlayControls = {
  complete: (result: Omit<PlayResult, "gameId" | "attemptId">) => void;
  fail: (result: Omit<PlayResult, "gameId" | "attemptId">) => void;
  abandon: () => void;
};

type Params = Promise<{ gameId: string }>;

export default async function PlayGamePage({ params }: { params: Params }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { gameId } = await params;
  const definition = getGameDefinition(gameId);
  if (!definition || definition.requiredLevel > 1) notFound();

  const renderGame = (game: GameDefinition, controls: PlayControls) => {
    switch (game.id) {
      case "echo-trace":
        return <EchoTrace definition={game} onComplete={controls.complete} />;
      case "signal-bloom":
        return <SignalBloom definition={game} onComplete={controls.complete} />;
      case "shadow-courier":
        return <ShadowCourier definition={game} onComplete={controls.complete} />;
      default:
        return <div className="game-board"><strong>Cette expérience n’est pas encore disponible.</strong></div>;
    }
  };

  return (
    <main className="play-main">
      <section className="play-shell">
        <header className="play-topbar">
          <Link href="/play" className="play-brand">MORISE PLAY</Link>
          <nav aria-label="Play game navigation">
            <Link href="/system">SYSTEM</Link>
            <Link href="/social">SOCIAL</Link>
          </nav>
        </header>

        <PlayGameHost definition={definition}>
          {(controls) => renderGame(definition, controls)}
        </PlayGameHost>
      </section>
    </main>
  );
}