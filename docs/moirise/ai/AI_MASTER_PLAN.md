# MOIRISE AI — PLAN MAÎTRE EXCLUSIF — RECONSTRUCTION À ZÉRO

## 0. Rôle du document
Ce document est l'unique plan comportemental de MORISE AI. Il ne remplace pas les plans des modules M01–M15 : il décrit uniquement le cerveau/orchestrateur IA et renvoie aux modules pour leurs mutations métier. Aucun provider externe n'est le cerveau.

## 1. Mission
MORISE AI doit comprendre une demande, déterminer ce qui est nécessaire, choisir une stratégie, utiliser les capacités disponibles, vérifier le résultat, apprendre de l'expérience autorisée et proposer des améliorations contrôlées. Ajouter du code ou des données n'est jamais considéré comme une preuve d'intelligence.

## 2. Règle de précision « France → Paris → rue → bâtiment → appartement → porte »
Toute affirmation générale doit être décomposée jusqu'à ce qu'une IA développeuse puisse implémenter sans deviner. Pour chaque mécanisme : ACTEUR → DÉCLENCHEUR → PRÉCONDITIONS → ENTRÉES EXACTES → ORDRE DES ÉTAPES → DÉCISION → SORTIE → MUTATION AUTORISÉE → ÉVÉNEMENT → ERREURS → RÉCUPÉRATION → SÉCURITÉ → OBSERVABILITÉ → TESTS → DONE.
Si un mécanisme possède une sous-décision, la même règle s'applique à la sous-décision.

## 3. Ce que MORISE AI est
MORISE AI = orchestration + contexte + intention + raisonnement + planification + politiques + capacités + outils + ressources + validation + mémoire + expérience + apprentissage contrôlé + évolution contrôlée.
Un LLM, une API ou un endpoint n'est qu'un exécuteur possible.

## 4. Boucle canonique
OBSERVE → AUTHENTICATE → CLASSIFY → MINIMIZE → CONTEXT → UNDERSTAND → REQUIREMENTS → PLAN → POLICY → RESERVE → EXECUTE → VALIDATE → CORRECT/ASK → COMMIT → EVENT → EXPERIENCE → EVALUATE → IMPROVE.
Une demande simple peut utiliser un sous-ensemble. Une création de jeu, une action longue ou une amélioration du système utilise la chaîne complète.

## 5. Identité et frontières
MORISE ne s'accorde jamais elle-même de nouvelles permissions. M01 garde la frontière identité/sécurité; M02 l'identité Player; M03 les messages et données sociales privées; M05 la progression/SYSTEM; M11 les permissions communautaires; M12 l'état des événements; M14 le ledger économie/récompenses; M15 l'orchestration IA.

## 6. Les 5–6 portes visibles
SYSTEM, PLAYER, SOCIAL, WORLD, PLAY, CREATE. Les capacités internes n'ajoutent pas de boutons globaux. MORISE coordonne contextuellement les fonctions. Exemple : traduction, création d'image, formation de groupe, recommandation ou génération de jeu apparaissent dans le contexte où elles sont utiles.

## 7. Parcours utilisateur et comportement
À l'arrivée, MORISE doit observer sans harceler. Elle peut créer une première expérience courte, proposer une action claire et conserver une raison réelle de revenir, mais elle ne doit jamais fabriquer de faux compteurs, fausse urgence, fausse rareté ou faux événement. Une promesse « reviens demain » n'est affichée que si un véritable état futur existe. Pendant lecture, saisie, jeu ou création, les interruptions non critiques sont réduites.

## 8. Compréhension
Entrée minimale : texte/action/événement + actorId serveur + module source + refs autorisées. MORISE identifie objectif, entités, contraintes, sortie attendue, effets secondaires, niveau d'autonomie et ambiguïtés. Une ambiguïté qui peut changer une mutation irréversible entraîne clarification ou chemin réversible autorisé.

## 9. Contexte
MORISE construit le plus petit contexte utile. Sources possibles : session, Player, module courant, entité, conversation, jeu actif, création active, mémoire autorisée, événements et World Memory autorisée. Secrets et données privées non autorisées sont exclus. Chaque snapshot a provenance, classe de confidentialité, expiration et hash.

## 10. Raisonnement
Le raisonnement est indépendant du fournisseur. Il peut combiner règles déterministes, algorithmes locaux, petits modèles locaux et fournisseurs externes. Il produit hypothèses, assumptions, plan et questions ouvertes. Il n'exécute pas directement une mutation privilégiée.

## 11. Planification
Les tâches longues deviennent un graphe DAG. Chaque nœud précise capacité/version, entrées, sorties, dépendances, ressources, trust class, timeout, retry, idempotence et validator. Une dépendance circulaire est rejetée avant exécution.

## 12. Autonomie
A0 répondre; A1 proposer; A2 exécuter après confirmation; A3 graphe borné; A4 workflow long borné. Une capability ne peut jamais dépasser la policy du contexte.

## 13. Capability Registry
Familles initiales : texte, raisonnement, vision, image, vidéo, audio, musique, TTS, STT, traduction, recherche, embeddings, modération, code, tests, jeu 2D, jeu 3D, résumé, classification, recommandation, proposition de communautés, Living Objects, Convergence, World Memory, génération de candidats d'évolution.
Chaque capability possède version, schémas, policy, targets, validator, ressources, timeout, concurrence, payload maximal et health.

## 14. Tool Registry
Un outil = actionId + ownerModule + inputSchema + permission + confirmationMode + sideEffectClass + rateLimit + validator + auditLevel. Aucun wildcard « execute anything ».

## 15. Ressources
Ordre par défaut : ON_DEVICE/LOCAL → CACHE → TRUSTED_WORKER → COMMUNITY_WORKER opt-in → provider vérifié gratuit/client-side → provider avec secret → provider payant explicitement activé → degraded.
Le routeur applique d'abord les filtres durs : capability, confidentialité, confiance, CPU/RAM/GPU, réseau, quota, délai. Le score de santé/coût/latence ne peut pas contourner un filtre dur.

## 16. Workers et ordinateurs
Trusted Worker = ordinateur explicitement autorisé. Community Worker = participation explicite. Un worker fournit du calcul, pas de la RAM partagée : la machine distante ne devient pas une extension directe de la RAM de l'ordinateur de l'utilisateur.
Profil Community par défaut : 1 CPU logique, 512 MiB RAM, GPU désactivé, stockage persistant désactivé, réseau borné. Aucun secret de production, clé service-role, credential admin ou message privé brut n'est envoyé.

## 17. Providers : rôle et inventaire
Les providers de la conception historique sont des adaptateurs : Pollinations, Puter, LLM7, Vireonix, Murakumo, Kilo AI, AI Horde, AI Horde OpenAI API, Cehpoint AI, OVH AI Endpoints, Quillly, Openverse, Internet Archive, ainsi que Gemini, DeepSeek, OpenRouter et d'autres adapters vérifiés.
Ils sont facultatifs. MORISE reste fonctionnelle sans eux pour les capacités locales/offline réalisables.

## 18. URLs et APIs
Une URL ne doit jamais être inventée. Le registre technique doit conserver pour chaque provider : `providerId`, `baseUrl`, `endpoint(s)`, `authMode`, `secretName`, `apiVersion`, `requestSchema`, `responseSchema`, `capabilities`, `rateLimit`, `licenseRef`, `lastVerifiedAt`, `health`. Une URL seulement mentionnée dans une conversation ou une image est `UNVERIFIED` jusqu'à vérification. Les clés restent dans Supabase Secrets/Edge Functions et jamais dans React/Vite/public env.

## 19. Création IA
Pour texte/image/vidéo/audio/musique/voix : INTENT → BRIEF → POLICY/ORIGINALITY → CAPABILITY → ROUTE → GENERATE → PROVENANCE → VALIDATE → ARTIFACT → optional PUBLISH. Un provider ne publie jamais directement.

## 20. Jeux 2D/3D
MORISE AI peut transformer une idée en GameSpecification : genre, 2D/3D, boucle de jeu, contrôles, caméra, difficulté, durée, partage, assets, audio, sauvegarde, performance, accessibilité, sécurité. Puis RESEARCH → IDEA → REQUIREMENTS → DESIGN → SPEC → ENGINE → CONTENT/ASSETS/CODE → BUILD → SIMULATE → TEST → PLAYTEST → BALANCE → PACKAGE → PREVIEW → PUBLISH. M08 possède la création; M09 possède l'exécution runtime.

## 21. Social / groupes
MORISE peut proposer ou, selon policy, créer un groupe communautaire lorsque des signaux autorisés montrent un besoin réel. Elle doit déterminer objectif, thème, langue, visibilité, membres admissibles, règles, owner et expiration éventuelle. M11 reste l'autorité de membership. Les messages privés restent privés et ne deviennent pas automatiquement une mémoire générale.

## 22. Mémoire
SESSION, PLAYER, EXPERIENCE, CREATOR, COMMUNITY, WORLD, SYSTEM_OBSERVATION, PROVIDER_EVIDENCE. Chaque entrée possède owner/scope, sensitivity, provenance, confidence, utility, consent basis, retention et deletion policy. Une sortie provider reste une evidence jusqu'à validation.

## 23. Apprentissage
OBSERVATION → NORMALISATION → PATTERN → HYPOTHESIS → CANDIDATE → OFFLINE EVALUATION → POLICY → CANARY. Les clics ou lignes de code seuls ne prouvent rien. Les modifications de production sont versionnées et réversibles.

## 24. Détection des capacités manquantes
SIGNAL D'ÉCHEC/LIMITE → CLASSIFIER LE MANQUE → distinguer connaissance/donnée/outil/algorithme/modèle/ressource/policy → formuler hypothèse → choisir une amélioration minimale → générer candidate → sandbox → tests → benchmark baseline → sécurité → canary → promotion/rejet → monitoring → rollback.

## 25. Auto-code contrôlé
Une candidate de code est écrite uniquement dans un workspace isolé. Elle doit passer static scan, dépendance allowlist, typecheck, build, tests unitaires, intégration, comportement, sécurité, ressources et régression. Elle ne s'exécute jamais directement sur la production.

## 26. AI Lab
AI Lab est la zone de recherche contrôlée de MORISE. Elle peut générer/analyser du code, expérimenter des stratégies, benchmarker, proposer de nouvelles capabilities et préparer une version. Elle n'a pas les secrets production, l'accès admin illimité ou le droit de s'auto-attribuer une permission.

## 27. Self-correction
FAILURE → CLASSIFY → EVIDENCE → HYPOTHESIS → MINIMAL CORRECTION → SANDBOX → VALIDATE → COMPARE → ACCEPT/REJECT. Limites : profondeur, durée, tentatives, mutation scope, ressources. Une oscillation déclenche l'arrêt.

## 28. Validation
Chaque résultat critique est validé par schema, policy, security, static/type, runtime, behavior, content, artifact et integrity validators appropriés. `INCONCLUSIVE` n'est pas `VALID`.

## 29. Living Objects / Convergence / Missions / World Memory
Ces mécanismes sont des spécialistes coordonnés, pas des cerveaux séparés. AI propose; l'owner module autorise la mutation. Les signaux privés/sensibles sont exclus des mécanismes de convergence. World Memory conserve provenance, attribution, portée, confiance, rétention et correction.

## 30. Mesure de l'intelligence
Chaque capability doit avoir benchmark, baseline, critères de réussite, coût, latence, taux d'erreur et régression critique. « Plus de code », « plus de RAM » ou « plus de providers » ne signifie pas « plus intelligent ».

## 31. DONE global
MORISE AI n'est déclarée terminée que lorsque chaque capability active possède owner, contrat, code/adapter, policy, ressources, validator, observabilité, récupération, tests, version et rollback; que les providers sont vérifiés; que les secrets sont protégés; et que les mécanismes d'auto-évolution sont bornés, testables et réversibles.
