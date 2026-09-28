"use client";

export function SharePostButton({ postId }: { postId: string }) {
  async function share() {
    const url = new URL("/social", window.location.origin);
    url.hash = postId;
    const text = "See this on MORISE.";
    try {
      if (navigator.share) {
        await navigator.share({ title: "MORISE", text, url: url.toString() });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url.toString());
      }
    } catch {
      // User cancelled or browser does not support sharing.
    }
  }

  return (
    <button className="social-inline-button" type="button" onClick={share}>
      Share
    </button>
  );
}