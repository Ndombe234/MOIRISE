import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">MORISE</p>
        <h1 id="title">Your world. Your path.</h1>
        <p className="lead">A simple surface for a world that grows with every Player.</p>
        <div className="actions" aria-label="Primary actions">
          <Link className="button" href="/auth/sign-up">Create Player</Link>
          <Link className="button secondary" href="/auth/sign-in">Sign in</Link>
          <Link className="button secondary" href="/discover">Discover</Link>
          <Link className="button secondary" href="/system">Enter my SYSTEM</Link>
        </div>
      </section>
    </main>
  );
}
