import Link from "next/link";

export default function SystemPage() {
  return (
    <main>
      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">SYSTEM</p>
        <h1 id="title">Your SYSTEM starts here.</h1>
        <p className="lead">This is the dedicated SYSTEM destination. Its full Player engine will be built in Module 2.</p>
        <div className="actions">
          <Link className="button secondary" href="/">Back home</Link>
          <Link className="button" href="/discover">Discover</Link>
        </div>
      </section>
    </main>
  );
}
