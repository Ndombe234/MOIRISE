import Link from "next/link";

export default function HomePage() {
  return (
    <main className="moirise-shell">
      <section className="moirise-card">
        <p className="moirise-muted">MOIRISE · M01 FOUNDATION</p>
        <h1>Le nouveau socle est en reconstruction contrôlée.</h1>
        <p className="moirise-muted">
          Cette tranche ne réutilise pas l&apos;ancienne implémentation. La documentation canonique
          reste la source de comportement jusqu&apos;à validation de chaque module.
        </p>
        <div className="moirise-actions">
          <Link className="moirise-button primary" href="/auth/sign-in">
            Se connecter
          </Link>
          <Link className="moirise-button" href="/auth/sign-up">
            Créer un Player
          </Link>
        </div>
      </section>
    </main>
  );
}
