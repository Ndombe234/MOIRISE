import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGameDefinition } from "@/lib/play/definitions";
import { PlayGameHost } from "@/components/play/play-game-host";
import { EchoTrace } from "@/components/play/echo-trace";
import { SignalBloom } from "@/components/play/signal-bloom";
import { ShadowCourier } from "@/components/play/shadow-courier";
import { MirrorRun } from "@/components/play/mirror-run";
import { LastSecond } from "@/components/play/last-second";
import type { GameDefinition } from "@/lib/play/types";

type PlayControls = { sessionId: string; challenge: unknown; complete: (actions: unknown) => void; fail: (actions: unknown) => void; abandon: () => void };
type Params = Promise<{ gameId: string }>;

export default async function PlayGamePage({ params }: { params: Params }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");
  const { gameId } = await params;
  const definition = getGameDefinition(gameId);
  if (!definition) notFound();

  const renderGame = (game: GameDefinition, controls: PlayControls) => {
    switch (game.id) {
      case "echo-trace": return <EchoTrace definition={game} challenge={controls.challenge as import("@/lib/play/games/echo-trace").EchoChallenge} onComplete={(result) => controls.complete(result)} />;
      case "signal-bloom": return <SignalBloom definition={game} challenge={controls.challenge as import("@/lib/play/games/signal-bloom").SignalBloomChallenge} onComplete={(result) => controls.complete(result)} />;
      case "shadow-courier": return <ShadowCourier definition={game} challenge={controls.challenge as import("@/lib/play/games/shadow-courier").ShadowChallenge} onComplete={(result) => controls.complete(result)} />;
      case "mirror-run": return <MirrorRun definition={game} onComplete={(result) => controls.complete(result)} />;
      case "last-second": return <LastSecond definition={game} onComplete={(result) => controls.complete(result)} />;
      default: return <div className="game-board"><strong>Cette expérience n’est pas encore disponible.</strong></div>;
    }
  };

  return <main className="play-main"><section className="play-shell">
    <header className="play-topbar"><Link href="/play" className="play-brand">MORISE PLAY</Link><nav aria-label="Play game navigation"><Link href="/system">SYSTEM</Link><Link href="/social">SOCIAL</Link></nav></header>
    <PlayGameHost definition={definition}>{(controls) => renderGame(definition, controls)}</PlayGameHost>
  </section></main>;
}
