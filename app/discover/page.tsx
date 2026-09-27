import Link from "next/link";

export default function DiscoverPage() {
  return (
    <main>
      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">DISCOVER</p>
        <h1 id="title">Discovery begins here.</h1>
        <p className="lead">The discovery engine will grow in a later module. This route is already real and navigable.</p>
        <div className="actions">
          <Link className="button secondary" href="/">Back home</Link>
          <Link className="button" href="/system">Open SYSTEM</Link>
        </div>
      </section>
    </main>
  );
}
