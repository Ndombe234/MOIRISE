"use client";

import { useState } from "react";
import Link from "next/link";
import type { GameDefinition, PlayResult } from "@/lib/play/types";
import { submitPlayResultAction } from "@/app/play/actions";

type RuntimeResult = Omit<PlayResult, "gameId" | "attemptId">;

export function PlayGameHost({
  definition,
  children,
}: {
  definition: GameDefinition;
  children: (controls: {
    complete: (result: RuntimeResult) => void;
    fail: (result: RuntimeResult) => void;
    abandon: () => void;
  }) => React.ReactNode;
}) {
  const [attemptId] = useState(() => crypto.randomUUID());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (result: RuntimeResult) => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitPlayResultAction(definition.id, attemptId, result);
      window.location.assign("/play/result/" + attemptId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible d'enregistrer cette partie.");
      setSubmitting(false);
    }
  };

  return (
    <div className="play-session">
      {children({
        complete: (result) => submit(result),
        fail: (result) => submit(result),
        abandon: () => submit({
          status: "abandoned",
          score: 0,
          durationMs: 250,
          signals: {},
          momentCandidate: null,
        }),
      })}
      {submitting ? <div className="play-saving" role="status">Synchronisation avec le SYSTEM…</div> : null}
      {error ? <p className="play-error" role="alert">{error}</p> : null}
      <Link href="/play" className="play-back-link">Quitter l’expérience</Link>
    </div>
  );
}