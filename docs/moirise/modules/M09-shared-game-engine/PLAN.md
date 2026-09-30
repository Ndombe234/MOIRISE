# M09 — SHARED GAME ENGINE — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
M09 n'est pas « un moteur de jeu ». C'est la frontière qui transforme un GameVersion publié en runtime contrôlé : manifest → allocation → input → state → save → result evidence → destruction.

## 1. Owner
M09 possède les runtimes, bridges et sandbox. M06 possède la session produit et M08 le package de jeu.

## 2. Runtime manifest
Avant lancement, valider engineId/version, entrypoint, assets, input map, save schema, network policy, resource profile et capability allowlist. Un manifest invalide bloque le lancement.

## 3. Runtime allocation
**Déclencheur :** M06 demande runtime pour une PlaySession.
**Séquence :** vérifier GameVersion → vérifier device/runtime compatibility → créer SandboxLease → monter package → injecter uniquement les paramètres autorisés → marquer READY → rendre runtimeRef.
Une allocation incomplète ne doit pas produire ACTIVE côté M06.

## 4. Input bridge
Seules les actions définies dans inputMap passent au jeu. Les événements inconnus sont ignorés. Le runtime n'accède pas directement aux tables MOIRISE.

## 5. Save/load
Save = schemaVersion + bounded payload + checksum + timestamp. Load vérifie Player/session ownership, checksum et version. Une migration ne s'exécute que si une migration connue existe.

## 6. 2D runtime
Canvas/state machine adapté au type d'expérience. Le runtime collecte les evidence nécessaires et respecte le fixed-step/turn semantics défini par la GameSpecification.

## 7. 3D runtime
Lazy-load moteur/asset; contrôle mémoire, frame budget, texture budget, scene size et timeout. Si le device ne respecte pas les contraintes, utiliser seulement un fallback prévu dans la spec ou refuser le lancement proprement.

## 8. Sandbox
Filesystem limité; réseau deny-by-default; aucune clé production; process/time/memory limits; workspace temporaire détruit après session.

## 9. Worker loss / crash
Si worker perdu : mark lease LOST. Requeue uniquement les tâches idempotentes. Une session déjà ACTIVE ne doit pas être dupliquée sans procédure de reprise. Crash local → dernier save valide ou restart.

## 10. États
ALLOCATING → READY → RUNNING → PAUSED/FINISHED/ABORTED → DESTROYED.
Chaque transition possède un owner et une preuve.

## 11. Tests / DONE
Manifest malveillant, input inconnu, save corrompu, 3D over budget, worker loss, runtime crash, network denied, secrets scan, mobile, desktop et destruction après TTL.

## AI-INTÉGRATION M09 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M09 est l'autorité du runtime commun. L'IA peut fabriquer/repair des éléments compatibles mais ne peut jamais contourner le manifest, la sandbox ou l'allowlist.

### B. AI input
Seulement GamePackage validé, runtime compatibility, capability allowlist et resource profile. Aucun code arbitraire venant directement d'un provider vers le navigateur.

### C. Runtime
Manifest → engine/version validation → resource reservation → sandbox → bridge allowlist → execute.

### D. AI adaptive support
Une capability runtime AI est explicitement inscrite dans allowedCapabilities[]. Un jeu qui ne l'a pas ne peut pas l'utiliser simplement parce que M15 la possède.

### E. DONE
Toute exécution AI/jeu est traçable, versionnée, bornée et récupérable.

## GAME PLATFORM — RUNTIME COMMUN M09

M09 est la fondation d'exécution réutilisée par les jeux 2D et 3D.

Deux classes de runtime peuvent être supportées et versionnées : 2D et 3D. Le GameBuild déclare explicitement engineId/engineVersion et ses budgets.

M09 fournit via contrat les services communs nécessaires : input, lifecycle, save bridge, asset loading, audio, timing, error boundary, resource monitoring et capability bridge.

Le jeu ne peut utiliser que les APIs présentes dans RuntimeManifest.allowedCapabilities. Une capability présente dans M15 n'est pas automatiquement disponible dans un jeu.

Si le budget 3D ou la compatibilité device échoue, M09 applique uniquement le fallback déclaré ou renvoie INCOMPATIBLE. Il ne réécrit pas le jeu arbitrairement.