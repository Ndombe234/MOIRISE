"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    const referralCode = document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith("morise_referral="))
      ?.split("=")[1]
      ?.trim()
      ?.toLowerCase();

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          display_name: displayName.trim(),
          ...(referralCode && /^[a-f0-9]{10}$/.test(referralCode) ? { referral_code: referralCode } : {}),
        },
        emailRedirectTo: window.location.origin + "/auth/callback",
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.replace("/system");
      router.refresh();
      return;
    }

    setNotice("Account created. Check your email to confirm your account, then return to MORISE.");
    setLoading(false);
  }

  return (
    <main>
      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">MORISE / CREATE</p>
        <h1 id="title">Create your Player.</h1>
        <p className="lead">One account. One evolving Player. The rest grows from there.</p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Display name</span>
            <input className="input" autoComplete="name" maxLength={50} required value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
          </label>
          <label className="field">
            <span>Email</span>
            <input className="input" autoComplete="email" inputMode="email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="field">
            <span>Password</span>
            <input className="input" autoComplete="new-password" minLength={8} required type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {error ? <p className="notice error">{error}</p> : null}
          {notice ? <p className="notice success">{notice}</p> : null}
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create Player"}
          </button>
        </form>
        <div className="actions">
          <Link className="button secondary" href="/auth/sign-in">I already have an account</Link>
          <Link className="button secondary" href="/">Back home</Link>
        </div>
      </section>
    </main>
  );
}
