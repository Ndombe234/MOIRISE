import Link from "next/link";

export default function ActivitiesPage() {
  return <main><section className="hero" aria-labelledby="title"><p className="eyebrow">ACTIVITIES</p><h1 id="title">Do something different.</h1><p className="lead">Activities will cover challenges, learning, discovery, expression, contribution, and other meaningful actions.</p><div className="actions"><Link className="button secondary" href="/home">Back to World</Link><Link className="button" href="/system">Open SYSTEM</Link></div></section></main>;
}
