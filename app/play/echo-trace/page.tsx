"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const TARGET = ["◈", "◆", "◇", "✦", "●"];
const OPTIONS = [
  ["◈", "◆", "◇", "✦", "●"],
  ["◈", "◇", "◆", "✦", "●"],
  ["◆", "◈", "◇", "✦", "●"],
  ["◈", "◆", "✦", "◇", "●"],
];

export default function EchoTracePage() {
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const duration = useMemo(() => startedAt ? Math.max(250, Date.now() - startedAt) : 0, [done, startedAt]);
  const correct = answer === 0;

  function start() {
    setStarted(true);
    setAnswer(null);
    setDone(false);
    setStartedAt(Date.now());
  }

  function finish(index: number) {
    if (!started || done) return;
    setAnswer(index);
    setDone(true);
  }

  return (
    <main className="play-main">
      <section className="play-shell" aria-labelledby="echo-title">
        <header className="play-topbar">
          <Link href="/play" className="play-brand">MORISE / PLAY</Link>
          <Link href="/home">WORLD</Link>
        </header>
        <section className="play-hero">
          <div>
            <p className="play-eyebrow">SYSTEM / ECHO TRACE</p>
            <h1 id="echo-title">Reconstruis la trace.</h1>
            <p>Observe la séquence, puis choisis la reconstruction identique.</p>
          </div>
        </section>

        <section className="play-launcher" aria-live="polite">
          {!started ? (
            <div>
              <p className="play-eyebrow">SOLO</p>
              <h2>Une partie rapide.</h2>
              <p>Le jeu mesure ta précision et la durée de ta session.</p>
              <button className="play-primary-button" type="button" onClick={start}>Commencer →</button>
            </div>
          ) : !done ? (
            <div>
              <p className="play-eyebrow">TRACE</p>
              <div style={{ fontSize: "2.5rem", letterSpacing: ".45rem", margin: "1.5rem 0" }} aria-label="séquence cible">{TARGET.join(" ")}</div>
              <p>Quelle reconstruction est identique ?</p>
              <div style={{ display: "grid", gap: ".7rem", marginTop: "1rem" }}>
                {OPTIONS.map((option, index) => (
                  <button key={index} type="button" className="play-option" onClick={() => finish(index)} aria-label={`Reconstruction ${index + 1}`}>
                    {option.join(" ")}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="play-eyebrow">RESULTAT</p>
              <h2>{correct ? "Trace reconstruite." : "Trace manquée."}</h2>
              <p>{correct ? "Le résultat est prêt à être enregistré dans ta progression." : "Tu peux recommencer pour améliorer ta précision."}</p>
              <small>Durée : {Math.round(duration / 1000)} s</small>
              <div style={{ display: "flex", gap: ".7rem", flexWrap: "wrap", marginTop: "1rem" }}>
                <button className="play-primary-button" type="button" onClick={start}>Rejouer</button>
                <Link className="play-secondary-button" href="/play">Retour à PLAY</Link>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
