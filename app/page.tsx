export default function HomePage() {
  return (
    <main className="morise-shell">
      <section className="morise-card" aria-labelledby="morise-title">
        <div className="eyebrow">System ready</div>
        <h1 id="morise-title" className="title">MORISE</h1>
        <p className="message">Let&apos;s see what changes when you act.</p>
        <div className="actions">
          <button className="primary" type="button">Enter MORISE</button>
          <button className="secondary" type="button">Explore quietly</button>
        </div>
        <div className="meta-row" aria-label="Current system state">
          <span className="meta">SYSTEM ACTIVE</span>
          <span className="meta">EN · default</span>
          <span className="meta">Solo-ready</span>
        </div>
      </section>
    </main>
  );
}
