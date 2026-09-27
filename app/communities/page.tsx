import Link from "next/link";

export default function CommunitiesPage() {
  return <main><section className="hero" aria-labelledby="title"><p className="eyebrow">COMMUNITIES</p><h1 id="title">Find your people.</h1><p className="lead">Communities will connect interests, local spaces, global groups, and relationships that emerge through Player activity.</p><div className="actions"><Link className="button secondary" href="/home">Back to World</Link><Link className="button" href="/system">Open SYSTEM</Link></div></section></main>;
}
