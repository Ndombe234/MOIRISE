"use client";

import { useState } from "react";

export function ReferralShare({ link }: { link: string }) {
  const [status, setStatus] = useState("");

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Join me on MORISE", text: "Join me on MORISE.", url: link });
        setStatus("Shared.");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(link);
        setStatus("Invite link copied.");
      } else {
        setStatus("Copy the link below to share it.");
      }
    } catch {
      setStatus("Share cancelled.");
    }
  }

  return (
    <div className="form">
      <label className="field">
        <span>Your invite link</span>
        <input className="input" readOnly value={link} onFocus={(event) => event.currentTarget.select()} />
      </label>
      <button className="button" type="button" onClick={share}>Share invite</button>
      {status ? <p className="notice success" aria-live="polite">{status}</p> : null}
    </div>
  );
}
