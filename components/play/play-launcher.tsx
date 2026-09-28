import Link from "next/link";
import type { PlaySelection } from "@/lib/play/types";

export function PlayLauncher({ selection }: { selection: PlaySelection }) {
  return (
    <section className="play-launcher" aria-label="SYSTEM selected experience">
      <div>
        <p className="play-eyebrow">SYSTEM / FOR YOU</p>
        <h2>{selection.game.title}</h2>
        <p>{selection.game.description}</p>
        <small>{selection.reason}</small>
      </div>
      <Link className="play-primary-button" href={selection.game.launchPath} aria-label={`Lancer ${selection.game.title}`}>
        PLAY →
      </Link>
    </section>
  );
}
