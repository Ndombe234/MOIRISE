"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    const supabase = createSupabaseBrowserClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setBusy(false);
      return;
    }

    if (data.session) {
      router.replace("/");
      router.refresh();
      return;
    }

    setMessage("Inscription créée. Consultez votre email si une confirmation est requise.");
    setBusy(false);
  }

  return (
    <main className="moirise-shell">
      <section className="moirise-card">
        <p className="moirise-muted">M01 · SESSION</p>
        <h1>Créer un Player</h1>
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
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {message ? <p className="moirise-muted">{message}</p> : null}
          {error ? <p className="moirise-error">{error}</p> : null}
          <div className="moirise-actions">
            <button className="moirise-button primary" disabled={busy} type="submit">
              {busy ? "Création…" : "Créer le Player"}
            </button>
            <Link className="moirise-button" href="/auth/sign-in">
              Connexion
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
