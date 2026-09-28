"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { GameDefinition } from "@/lib/play/types";
import { startGameSessionAction, completePlaySessionAction, abandonPlaySessionAction } from "@/app/play/actions";
import { EchoTrace } from "./echo-trace";
import { SignalBloom } from "./signal-bloom";
import { ShadowCourier } from "./shadow-courier";
import type { EchoChallenge } from "@/lib/play/games/echo-trace";
import type { SignalBloomChallenge } from "@/lib/play/games/signal-bloom";
import type { ShadowChallenge } from "@/lib/play/games/shadow-courier";

export function PlayGameHost({ definition }: { definition: GameDefinition }) {
  const [session, setSession] = useState<{ session_id: string; challenge: unknown } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restartKey, setRestartKey] = useState(0);
  const startingRef = useRef(false);

  useEffect(() => {
    if (startingRef.current) return;
    startingRef.current = true;
    let cancelled = false;
    setSession(null);
    setError(null);

    startGameSessionAction(definition.id)
      .then((value) => {
        if (!cancelled) setSession({ session_id: value.session_id, challenge: value.challenge });
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Impossible de préparer cette expérience.");
      })
      .finally(() => {
        startingRef.current = false;
      });

    return () => { cancelled = true; };
  }, [definition.id, restartKey]);

  const submit = async (actions: unknown) => {
    if (!session || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const result = await completePlaySessionAction(session.session_id, actions);
      if (result.status === "recorded") {
        window.location.assign("/play/result/" + session.session_id);
        return;
      }
      setError(result.summary ?? "La validation du run a échoué.");
      setSubmitting(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible d'enregistrer cette partie.");
      setSubmitting(false);
    }
  };

  const abandon = async () => {
    if (!session || submitting) return;
    setSubmitting(true);
    try {
      await abandonPlaySessionAction(session.session_id);
      window.location.assign("/play");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de quitter cette expérience.");
      setSubmitting(false);
    }
  };

  const replay = () => {
    setError(null);
    setSession(null);
    setSubmitting(false);
    setRestartKey((value) => value + 1);
  };

  if (error && !session) {
    return (
      <div className="play-session">
        <p className="play-error" role="alert">{error}</p>
        <div className="play-error-actions">
          <button type="button" className="play-primary-button" onClick={replay}>Rejouer</button>
          <Link href="/play" className="play-back-link">Retour au PLAY</Link>
        </div>
      </div>
    );
  }

  if (!session) {
    return <div className="play-session"><div className="game-board"><strong>Préparation de ton run…</strong></div></div>;
  }

  let game: React.ReactNode;
  switch (definition.id) {
    case "echo-trace":
      game = <EchoTrace definition={definition} challenge={session.challenge as EchoChallenge} onComplete={submit} />;
      break;
    case "signal-bloom":
      game = <SignalBloom definition={definition} challenge={session.challenge as SignalBloomChallenge} onComplete={submit} />;
      break;
    case "shadow-courier":
      game = <ShadowCourier definition={definition} challenge={session.challenge as ShadowChallenge} onComplete={submit} />;
      break;
    default:
      game = <div className="game-board"><strong>Cette expérience n’est pas encore disponible.</strong></div>;
  }

  return (
    <div className="play-session">
      {game}
      {submitting ? <div className="play-saving" role="status">Validation serveur du run…</div> : null}
      {error ? (
        <div className="play-error-panel" role="alert">
          <p className="play-error">{error}</p>
          <button type="button" className="play-primary-button" onClick={replay}>Rejouer</button>
        </div>
      ) : null}
      <button type="button" className="play-back-link" onClick={abandon} disabled={submitting}>Quitter l’expérience</button>
    </div>
  );
}
