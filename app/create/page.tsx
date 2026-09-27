import Link from "next/link";

export default function CreatePage() {
  return <main><section className="hero" aria-labelledby="title"><p className="eyebrow">CREATE</p><h1 id="title">Build something of your own.</h1><p className="lead">Creation tools will let Players publish, build spaces, activities, events, and projects.</p><div className="actions"><Link className="button secondary" href="/home">Back to World</Link><Link className="button" href="/system">Open SYSTEM</Link></div></section></main>;
}
