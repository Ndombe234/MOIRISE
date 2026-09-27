import Link from "next/link";
import { signOut } from "@/app/auth/actions";

export default function SystemLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="system-main">
      <section className="system-shell">
        <header className="system-shell-header">
          <div>
            <Link className="system-brand" href="/system">MORISE / SYSTEM</Link>
            <p className="system-shell-tagline">Un moteur profond. Une interface claire.</p>
          </div>
          <nav className="system-nav" aria-label="SYSTEM">
            <Link href="/system">Vue</Link>
            <Link href="/system/progression">Progression</Link>
            <Link href="/system/history">Historique</Link>
            <Link href="/system/memories">Mémoire</Link>
          </nav>
        </header>
        {children}
        <footer className="system-footer">
          <Link className="button secondary" href="/player">Player</Link>
          <Link className="button secondary" href="/discover">Découvrir</Link>
          <form action={signOut}>
            <button className="button secondary" type="submit">Déconnexion</button>
          </form>
        </footer>
      </section>
    </main>
  );
}
