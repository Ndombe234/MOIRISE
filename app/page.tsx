export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">MORISE</p>
        <h1 id="title">Your world. Your path.</h1>
        <p className="lead">
          A simple surface for a world that grows with every Player.
        </p>
        <div className="actions" aria-label="Primary actions">
          <button type="button">Discover</button>
          <button type="button" className="secondary">Enter my SYSTEM</button>
        </div>
      </section>
    </main>
  );
}
