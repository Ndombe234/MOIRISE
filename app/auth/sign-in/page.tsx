"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }
    router.replace("/home");
    router.refresh();
  }

  return (
    <main>
      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">MORISE / SYSTEM ENTRY</p>
        <h1 id="title">Welcome back.</h1>
        <p className="lead">Your Player world is waiting. The SYSTEM will keep the experience simple and adapt to what you actually do.</p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="field"><span>Email</span><input className="input" autoComplete="email" inputMode="email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label className="field"><span>Password</span><input className="input" autoComplete="current-password" minLength={8} required type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          {error ? <p className="notice error">{error}</p> : null}
          <button className="button" type="submit" disabled={loading}>{loading ? "Entering…" : "Enter MORISE"}</button>
        </form>
        <div className="actions"><Link className="button secondary" href="/auth/sign-up">Create a Player</Link><Link className="button secondary" href="/">Back</Link></div>
        <p className="help" style={{ marginTop: 18 }}>English is the default display language when a requested language is not supported.</p>
      </section>
    </main>
  );
}
