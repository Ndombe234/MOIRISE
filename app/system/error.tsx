"use client";

export default function SystemError({ reset }: { reset: () => void }) {
  return (
    <div className="system-error" role="alert">
      <p className="label">SYSTEM ERROR</p>
      <h1>Le SYSTEM n'a pas pu être chargé.</h1>
      <p className="help">Aucune progression n'est inventée. Réessaie après avoir rétabli la connexion.</p>
      <button className="button" type="button" onClick={reset}>Réessayer</button>
    </div>
  );
}
