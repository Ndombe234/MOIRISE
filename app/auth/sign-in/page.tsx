"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setBusy(false);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <main className="moirise-shell">
      <section className="moirise-card">
        <p className="moirise-muted">M01 · SESSION</p>
        <h1>Connexion</h1>
        <form onSubmit={submit}>
          <label className="moirise-field">
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="moirise-field">
            Mot de passe
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error ? <p className="moirise-error">{error}</p> : null}
          <div className="moirise-actions">
            <button className="moirise-button primary" disabled={busy} type="submit">
              {busy ? "Connexion…" : "Se connecter"}
            </button>
            <Link className="moirise-button" href="/auth/sign-up">
              Inscription
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
