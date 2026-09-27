export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">MORISE</p>
        <h1 id="title">Your world. Your path.</h1>
        <p className="lead">A simple surface for a world that grows with every Player.</p>
        <div className="actions" aria-label="Primary navigation">
          <a href="#discover">Discover</a>
          <a href="#play">Play</a>
          <a href="#explore">Explore</a>
          <a href="#system">SYSTEM</a>
        </div>
      </section>
    </main>
  );
}
