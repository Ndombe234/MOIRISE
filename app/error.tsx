"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="moirise-shell">
      <section className="moirise-card" role="alert">
        <h1>Le SYSTEM a rencontré un problème récupérable.</h1>
        <p className="moirise-muted">
          Aucun état métier n&apos;est considéré comme validé tant que la reprise n&apos;a pas réussi.
        </p>
        <button className="moirise-button primary" onClick={reset}>
          Réessayer
        </button>
      </section>
    </main>
  );
}
