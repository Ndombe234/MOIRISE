# MORISE — AI BEHAVIOR + AUTONOMOUS GAME CREATOR SPEC

Complément canonique de la conception technique maître 1→15.

## Objectif
Préciser ce que le SYSTEM IA observe, comprend, planifie, dit, fait, refuse, mémorise, génère, teste et apprend, ainsi que la création automatique de jeux 2D.

## AI Orchestrator
PLAYER → CONTEXT → INTENT → POLICY → CAPABILITY → PROVIDER → ACTION → VALIDATION → RESPONSE → EVENT → MEMORY/OBSERVATION.

Le PLAYER exprime une intention; le SYSTEM coordonne la majorité des capacités. Les règles critiques restent déterministes.

## Ce que l'IA observe
Le SYSTEM construit un Context Pack minimal et autorisé: session, langue, module, expérience, intention explicite, événements autorisés, préférences non sensibles, état du jeu, signaux du monde, disponibilité des providers et politique de confidentialité.

Aucun profilage psychologique caché. Aucun envoi automatique de contenu privé à un provider non autorisé.

## Ce que l'IA fait
Répondre, traduire, recommander, proposer titres/récompenses, concevoir des expériences, générer niveaux/quêtes/dialogues/événements, demander des médias originaux, personnaliser des expériences et préparer des candidates d'amélioration.

Elle ne contourne pas les permissions, ne modifie pas silencieusement l'économie/RLS/historique et n'exécute pas de code arbitraire en production.

## Ce que l'IA dit
Les messages SYSTEM sont contextuels et naturels: guidance, découverte, réaction, avertissement, succès, création, erreur. Le SYSTEM ne spamme pas l'utilisateur et n'expose pas inutilement la complexité provider/API.

## Original-first
Toute génération image/vidéo/audio/musique/voix passe par: intention → creative brief → originalité → provider → provenance/licence → modération → stockage → publication.

Pas de reproduction volontaire de personnages, scènes, logos, marques ou assets d'anime/manga/jeux protégés; pas d'imitation d'artiste identifiable. Les créations MORISE sont originales. Le système ne prétend pas que tout contenu IA est automatiquement libre de copyright.

## Provider Router
Ordre configurable: ANONYMOUS/FREE lorsque autorisé → USER-PAYS/CLIENT-SIDE lorsque le provider l'impose → FREE API KEY → autre provider → PAID uniquement si explicitement activé → cache/local/mode dégradé → UNAVAILABLE.

Providers candidats: Gemini, Pollinations, Puter, OpenRouter, Cloudflare Workers AI, Replicate, Firecrawl et autres adapters. Les clés restent côté serveur/Secrets et jamais dans le frontend.

## PostHog
PostHog est une couche d'observation, pas le cerveau. Flux: MORISE EVENT → POSTHOG → agrégation/analyse → learning candidate → offline evaluation → policy/safety → canary → métriques → approve/rollback.

PostHog ne modifie jamais directement la production et ne reçoit pas automatiquement conversations privées ou médias personnels.

## AI Memory
SESSION, PLAYER, EXPERIENCE, WORLD, COMMUNITY, CREATOR et SYSTEM OBSERVATION sont séparés. Chaque entrée possède provenance, permissions, date, scope et rétention.

Les photos/vidéos du PLAYER peuvent être conservées comme MORISE Memories/Souvenirs, privées par défaut et non utilisées automatiquement pour entraîner un modèle externe.

# GAME CREATOR — 3 moteurs 2D

MORISE fournit trois moteurs 2D génériques réutilisables:

1. ADVENTURE: exploration, cartes, PNJ, dialogues, quêtes, inventaire, objets, événements.
2. BATTLE: combats, compétences, statistiques, ennemis, progression, loot.
3. PUZZLE: énigmes, niveaux, objets interactifs, logique, conditions, chronomètre, score.

L'IA ne reconstruit pas le moteur à chaque création.

## Création par un PLAYER

PLAYER IDEA → INTENT PARSER → GAME DESIGNER AI → GAME SPEC → ENGINE SELECTION → RULES → CONTENT → ASSETS → VALIDATION → SIMULATION → TESTS → VERSION → PREVIEW → PUBLISH/PRIVATE.

Exemple: « Je veux un jeu 2D où j'explore une ville futuriste et résous des énigmes. » Le SYSTEM choisit le moteur Puzzle 2D, construit la spécification et génère le contenu autorisé.

## Game Specification

```ts
interface GameSpecification {
  id: string;
  version: number;
  engine: 'adventure-2d' | 'battle-2d' | 'puzzle-2d' | 'other-approved-engine';
  title: string;
  description: string;
  theme: OriginalityProfile;
  scenes: SceneSpec[];
  entities: EntitySpec[];
  rules: RuleSpec[];
  quests: QuestSpec[];
  rewards: RewardSpec[];
  assets: AssetRequest[];
  audio: AudioRequest[];
  difficulty: DifficultyConfig;
  winConditions: Condition[];
  lossConditions: Condition[];
  safetyPolicyVersion: string;
}
```

L'IA génère une spécification/DSL/JSON validée, pas du code arbitraire exécuté directement.

## Game Validator

Chaque jeu est vérifié par: schema, règles, états inatteignables, victoire/défaite impossibles, références, permissions/RLS, originalité, sécurité, performance, simulation déterministe et régression.

FAIL → correction structurée → validation bornée. PASS → simulation → tests → preview.

## Game Simulation

Tester démarrage, progression, interactions, victoire, défaite, reprise, sauvegarde, états limites, ressources absentes, appareils faibles et réseau dégradé.

## Game events

GAME_CREATION_REQUESTED, GAME_INTENT_PARSED, GAME_ENGINE_SELECTED, GAME_SPEC_CREATED, GAME_SPEC_VALIDATED, GAME_CONTENT_GENERATED, GAME_ASSET_REQUESTED, GAME_ASSET_ACCEPTED, GAME_ASSET_REJECTED, GAME_SIMULATION_STARTED, GAME_SIMULATION_FAILED, GAME_TESTS_STARTED, GAME_TESTS_FAILED, GAME_VERSION_CREATED, GAME_PREVIEW_READY, GAME_PUBLISHED, GAME_UNPUBLISHED, GAME_CREATION_FAILED.

## Actions

```ts
interface GameCreatorActions {
  parseIdea(input: string): Promise<GameIntent>;
  selectEngine(intent: GameIntent): Promise<EngineSelection>;
  generateSpec(intent: GameIntent, engine: EngineSelection): Promise<GameSpecification>;
  validateSpec(spec: GameSpecification): Promise<GameValidationReport>;
  generateContent(spec: GameSpecification): Promise<GameContentBundle>;
  requestAssets(requests: AssetRequest[]): Promise<AssetBundle>;
  simulate(game: GameBuild): Promise<SimulationReport>;
  runTests(game: GameBuild): Promise<GameTestReport>;
  createVersion(game: GameBuild): Promise<GameVersion>;
  publish(versionId: string, visibility: 'private' | 'public'): Promise<PublishResult>;
}
```

## Sécurité Game Creator

L'IA ne peut pas exécuter de commandes arbitraires, lire les fichiers d'autres utilisateurs, accéder aux secrets, appeler une API hors Provider Registry, écrire directement en production, modifier RLS ou publier sans validation.

## 2D + 3D

La conception accepte les jeux 2D et 3D. Les trois moteurs 2D sont le premier socle automatisé; les moteurs 3D sont des adapters/engines approuvés supplémentaires.

## Tests obligatoires

CODE → TYPECHECK/LINT → UNIT → INTEGRATION → BUILD → BROWSER REAL USER TEST → MOBILE → ERROR/EMPTY/UNAVAILABLE → SECURITY/PERMISSION → REGRESSION → ACCEPT.

Pour un jeu: SPEC → VALIDATE → BUILD → SIMULATE → TEST → PREVIEW → REAL USER PLAYTEST → ACCEPT.

## Résumé

PLAYER DÉCRIT → MORISE CONÇOIT → MOTEUR EXÉCUTE → VALIDATEUR VÉRIFIE → PLAYER JOUE → OBSERVATION MESURE → AI LAB AMÉLIORE SOUS CONTRÔLE.
