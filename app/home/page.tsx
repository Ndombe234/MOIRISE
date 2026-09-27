import Link from "next/link";

const actions = [
  { href: "/discover", label: "Discover", index: "01", text: "Find something unexpected." },
  { href: "/play", label: "Play", index: "02", text: "Start a solo experience." },
  { href: "/create", label: "Create", index: "03", text: "Make something that can grow." },
  { href: "/communities", label: "Communities", index: "04", text: "Find people around an interest." },
  { href: "/activities", label: "Activities", index: "05", text: "Try something short or deep." },
  { href: "/events", label: "Events", index: "06", text: "See what is happening." },
];

export default function HomeWorldPage() {
  return (
    <main className="world-main">
      <section className="world-shell" aria-labelledby="world-title">
        <header className="world-header">
          <Link className="world-brand" href="/">MORISE</Link>
          <nav aria-label="World navigation">
            <Link href="/system">SYSTEM</Link>
            <Link href="/auth/sign-out">Exit</Link>
          </nav>
        </header>

        <div className="world-intro">
          <div>
            <p className="world-kicker">PLAYER WORLD / ONLINE</p>
            <h1 id="world-title">What will you do now?</h1>
            <p>One world. Many paths. Start with one action and let your Player evolve from what you actually do.</p>
          </div>
          <Link className="world-system-card" href="/system">
            <span>SYSTEM</span>
            <strong>Enter your evolution</strong>
            <small>View Player progression →</small>
          </Link>
        </div>

        <div className="world-actions" aria-label="Primary world actions">
          {actions.map((action) => (
            <Link className="world-action" href={action.href} key={action.href}>
              <span className="world-action-index">{action.index}</span>
              <span className="world-action-copy">
                <strong>{action.label}</strong>
                <small>{action.text}</small>
              </span>
              <span aria-hidden="true" className="world-action-arrow">↗</span>
            </Link>
          ))}
        </div>

        <section className="world-note" aria-label="Solo first">
          <span className="world-note-dot" />
          <div>
            <strong>Solo-first</strong>
            <p>You can explore MORISE alone. Connections appear naturally as your actions create opportunities.</p>
          </div>
        </section>
      </section>
    </main>
  );
}
