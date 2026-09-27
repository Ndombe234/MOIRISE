import Link from "next/link";

export default function EventsPage() {
  return <main><section className="hero" aria-labelledby="title"><p className="eyebrow">EVENTS</p><h1 id="title">See what is happening.</h1><p className="lead">Local, international, community, competitive, creative, educational, and recurring events will connect the World.</p><div className="actions"><Link className="button secondary" href="/home">Back to World</Link><Link className="button" href="/system">Open SYSTEM</Link></div></section></main>;
}
