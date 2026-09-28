"use client";

import { useState } from "react";

export function ShareMomentButton({ url }: { url: string }) {
  const [label, setLabel] = useState("Partager le Moment");

  async function share() {
    const absolute = new URL(url, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({
          title: "MORISE Moment",
          text: "Essaie ce Moment sur MORISE.",
          url: absolute,
        });
        setLabel("Partagé");
        return;
      }
      await navigator.clipboard.writeText(absolute);
      setLabel("Lien copié");
    } catch {
      setLabel("Lien prêt");
    }
    window.setTimeout(() => setLabel("Partager le Moment"), 2200);
  }

  return (
    <button type="button" className="play-result-secondary" onClick={share}>
      {label}
    </button>
  );
}