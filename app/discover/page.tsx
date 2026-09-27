import Link from "next/link";

const paths = [
  { label: "Learn", text: "Follow a question until it becomes a skill." },
  { label: "Create", text: "Find ideas, tools and people who build." },
  { label: "Play", text: "Discover a solo experience matched to your moment." },
  { label: "Connect", text: "Meet communities beyond your usual circles." },
];

const detours = [
  "Something outside your usual interests",
  "A community built around a shared curiosity",
  "A challenge you can try in a few minutes",
];

export default function DiscoverPage() {
  return (
    <main className="discover-main">
      <section className="discover-shell" aria-labelledby="discover-title">
        <header className="discover-header">
          <Link className="discover-brand" href="/">MORISE</Link>
          <nav aria-label="Discovery navigation">
            <Link href="/home">WORLD</Link>
            <Link href="/system">SYSTEM</Link>
          </nav>
        </header>

        <div className="discover-hero">
          <p className="discover-kicker">DISCOVERY / CURIOUS MODE</p>
          <h1 id="discover-title">What are you curious about?</h1>
          <p>
            MORISE does not need to decide who you are. Choose a direction, explore a detour,
            and let your actions shape what becomes relevant next.
          </p>
        </div>

        <section aria-labelledby="paths-title">
          <div className="discover-section-heading">
            <div>
              <span className="discover-code">PATHS</span>
              <h2 id="paths-title">Start anywhere.</h2>
            </div>
            <span className="discover-caption">No permanent category.</span>
          </div>
          <div className="discover-paths">
            {paths.map((path, index) => (
              <Link className="discover-path" href={`/discover/${path.label.toLowerCase()}`} key={path.label}>
                <span className="discover-number">0{index + 1}</span>
                <span>
                  <strong>{path.label}</strong>
                  <small>{path.text}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="discover-detour" aria-labelledby="detour-title">
          <div>
            <span className="discover-code">DETOUR</span>
            <h2 id="detour-title">Try something you did not come looking for.</h2>
            <p>Unexpected connections are part of the world. These are prompts, not predictions about you.</p>
          </div>
          <ul>
            {detours.map((detour) => <li key={detour}>{detour}</li>)}
          </ul>
        </section>

        <footer className="discover-footer">
          <span>Discovery is a door, not a destination.</span>
          <Link href="/home">Return to World →</Link>
        </footer>
      </section>
    </main>
  );
}
