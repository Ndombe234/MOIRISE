export default function EnterPage() {
  return (
    <main className="morise-shell">
      <section className="morise-card" aria-labelledby="enter-title">
        <div className="eyebrow">First contact</div>
        <h1 id="enter-title">SYSTEM ready</h1>
        <p className="message">Your session shell is ready. The deeper MORISE modules will appear progressively as they become available.</p>
        <div className="meta-row" aria-label="Boot status">
          <span className="meta">SHELL READY</span>
          <span className="meta">CAPABILITIES RESOLVED</span>
          <span className="meta">NO OPTIONAL DEPENDENCY REQUIRED</span>
        </div>
      </section>
    </main>
  );
}
