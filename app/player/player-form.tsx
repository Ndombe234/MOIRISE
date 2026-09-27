"use client";

import { useState, type FormEvent } from "react";
import type { Player } from "@/lib/supabase/database.types";
import { updatePlayer } from "@/app/player/actions";

export function PlayerForm({ player }: { player: Player }) {
  const [displayName, setDisplayName] = useState(player.display_name);
  const [handle, setHandle] = useState(player.handle ?? "");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");
    setSaving(true);

    const result = await updatePlayer(new FormData(event.currentTarget));

    if (!result.ok) {
      setError(result.error ?? "Player update failed.");
      setSaving(false);
      return;
    }

    setStatus("Saved. Your Player is persistent.");
    setSaving(false);
  }

  return (
    <form className="form" onSubmit={submit}>
      <label className="field">
        <span>Display name</span>
        <input className="input" name="displayName" maxLength={50} required value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
      </label>
      <label className="field">
        <span>Handle</span>
        <input className="input" name="handle" maxLength={25} pattern="[A-Za-z0-9_@]{3,25}" placeholder="@your_handle" value={handle} onChange={(event) => setHandle(event.target.value)} />
        <small className="help">Optional. 3–24 letters, numbers, or underscores.</small>
      </label>
      {error ? <p className="notice error">{error}</p> : null}
      {status ? <p className="notice success">{status}</p> : null}
      <button className="button" type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save Player"}
      </button>
    </form>
  );
}
