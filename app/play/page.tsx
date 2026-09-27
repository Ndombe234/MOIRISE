import Link from "next/link";

export default function PlayPage() {
  return <main><section className="hero" aria-labelledby="title"><p className="eyebrow">PLAY</p><h1 id="title">Your next experience starts here.</h1><p className="lead">Solo and social games will connect to the Player SYSTEM as this module evolves.</p><div className="actions"><Link className="button secondary" href="/home">Back to World</Link><Link className="button" href="/system">Open SYSTEM</Link></div></section></main>;
}
