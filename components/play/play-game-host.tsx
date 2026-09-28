"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { GameDefinition } from "@/lib/play/types";
import { startGameSessionAction, completePlaySessionAction, abandonPlaySessionAction } from "@/app/play/actions";

type RuntimeControls = {
  sessionId: string;
  challenge: unknown;
  complete: (actions: unknown) => void;
  fail: (actions: unknown) => void;
  abandon: () => void;
};

export function PlayGameHost({
  definition,
  children,
}: {
  definition: GameDefinition;
  children: (controls: RuntimeControls) => React.ReactNode;
}) {
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

  return (
    <div className="play-session">
      {children({
        sessionId: session.session_id,
        challenge: session.challenge,
        complete: submit,
        fail: submit,
        abandon,
      })}
      {submitting ? <div className="play-saving" role="status">Validation serveur du run…</div> : null}
      {error ? (
        <div className="play-error-panel" role="alert">
          <p className="play-error">{error}</p>
          <button type="button" className="play-primary-button" onClick={replay}>Rejouer</button>
        </div>
      ) : null}
      <Link href="/play" className="play-back-link">Quitter l’expérience</Link>
    </div>
  );
}