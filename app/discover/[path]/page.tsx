import Link from "next/link";
import "../discover.css";

const destinations: Record<string, { title: string; text: string }> = {
  learn: { title: "Learn", text: "A future learning path will connect questions, activities and knowledge without locking your Player into one subject." },
  create: { title: "Create", text: "The creation layer will let Players turn ideas into posts, projects, activities and collaborative spaces." },
  play: { title: "Play", text: "The Play layer will surface solo and social experiences that fit the moment, including short activities and deeper games." },
  connect: { title: "Connect", text: "The connection layer will help Players meet communities and people through shared actions and interests." },
};

export default async function DiscoveryGateway({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;
  const destination = destinations[path] ?? { title: "Discovery path", text: "This discovery path is reserved for a future MORISE experience." };

  return (
    <main className="discover-main">
      <section className="discover-shell" aria-labelledby="gateway-title">
        <header className="discover-header">
          <Link className="discover-brand" href="/">MORISE</Link>
          <nav aria-label="Discovery navigation"><Link href="/discover">DISCOVER</Link><Link href="/system">SYSTEM</Link></nav>
        </header>
        <div className="discover-hero">
          <p className="discover-kicker">DISCOVERY PATH / GATEWAY</p>
          <h1 id="gateway-title">{destination.title}</h1>
          <p>{destination.text}</p>
          <div className="actions"><Link className="button secondary" href="/discover">Back to Discovery</Link><Link className="button" href="/home">Return to World</Link></div>
        </div>
      </section>
    </main>
  );
}
