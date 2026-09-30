# M15 — META SYSTEM + MORISE AI LAB — PLAN D’IMPLÉMENTATION

## 0. Autorité documentaire

Ce document décrit uniquement le comportement propre au module M15 :
- rôle du Meta System ;
- rôle du MORISE AI Lab ;
- interfaces M15 avec les autres modules ;
- responsabilités de M15 ;
- limites d'autorité ;
- états métier M15 ;
- résultats attendus.

La fabrication interne du cerveau IA est décrite une seule fois dans :
- docs/moirise/ai/AI_MASTER_PLAN.md
- docs/moirise/ai/AI_TECHNICAL_DESIGN.md

Ne pas recopier ici Request Gate, Context Engine, Provider Router, Memory Service, Validation Engine ou Evolution Engine.

## 1. Mission M15

M15 fournit le système d'orchestration qui permet à MORISE AI d'être utilisée par les autres modules.

M15 coordonne :
- demandes AI ;
- capabilities ;
- outils autorisés ;
- exécution ;
- validation ;
- expérience ;
- AI Lab.

M15 ne remplace pas les owners métier.

## 2. Entrées M15

M15 reçoit :
- requête AI ;
- événement système ;
- demande d'un module ;
- proposition d'évolution ;
- demande de création ;
- demande de traduction ;
- demande d'analyse ;
- demande de génération créative.

Chaque entrée doit être conforme aux contrats centraux de l'AI Technical Design.

## 3. Sorties M15

M15 peut retourner :
- réponse AI ;
- proposition ;
- artifact ref ;
- task reference ;
- validation result ;
- event proposal ;
- improvement candidate ;
- degraded state.

Une sortie ne devient un état métier durable qu'après le commit de son module owner.

## 4. Frontières M15

M15 ne devient jamais propriétaire :
- de l'identité M01 ;
- du profil/état Player M02 ;
- des DMs M03 ;
- des règles de progression M05 ;
- de l'exécution des PlaySessions M06 ;
- des communautés M11 ;
- des événements M12 ;
- des changements globaux du World M13 ;
- des récompenses/ledger M14.

## 5. SYSTEM

Les fonctions internes de M15 sont présentées au Player à travers le SYSTEM contextuel.

Le Player n'a pas besoin d'un onglet distinct pour chaque capability interne.

Le SYSTEM doit supprimer les interventions non critiques lorsque le Player :
- écrit ;
- lit ;
- joue ;
- crée ;
- réalise une action nécessitant de la concentration.

## 6. AI Lab

Le AI Lab permet :
- d'examiner une limitation ;
- de formuler une candidate d'amélioration ;
- de produire un patch candidat ;
- de lancer les tests ;
- de comparer au baseline ;
- de proposer un canary ;
- d'autoriser ou rejeter selon les règles centrales.

Le AI Lab ne possède pas :
- secrets production ;
- admin ;
- service role ;
- comptes financiers ;
- pouvoir de promotion sans la chaîne centrale.

## 7. Capabilities consommées par M15

M15 consomme le catalogue central :
- text ;
- reasoning ;
- vision ;
- image ;
- video ;
- audio ;
- music ;
- TTS ;
- STT ;
- translation ;
- search ;
- embedding ;
- moderation ;
- code ;
- game;
- recommendation ;
- evolution.

La définition et la fabrication de ces capabilities ne sont pas redéfinies ici.

## 8. Interaction avec les modules

### M02 Player
M15 peut exploiter les données autorisées mais ne modifie pas directement l'identité Player.

### M03 Social
M15 peut assister traduction, rédaction, découverte et modération selon policy. Les messages privés ne deviennent pas mémoire globale par défaut.

### M05 System
M15 fournit intelligence et propositions. M05 reste owner de progression, XP, titres et état SYSTEM métier.

### M08 Game Factory
M15 produit requirements/spec/task graph. M08 reste owner de la fabrication.

### M09 Game Engine
M15 décrit ou génère les besoins. M09 reste owner du runtime.

### M11 Communities
M15 peut proposer des affinités/convergences. M11 reste owner du membership.

### M12 Events
M15 peut proposer contenu/personnalisation. M12 reste owner de l'état événementiel.

### M14 Economy
M15 peut analyser ou proposer des ajustements. M14 reste owner du ledger et des récompenses.

## 9. Living Objects / Convergence / Missions / World Memory

M15 peut détecter, proposer et orchestrer.

Les lifecycles durables restent chez les owners définis par l'architecture.

Les données provenant de sources privées doivent respecter les contrats de destination et de confidentialité centraux.

## 10. DONE M15

M15 est fonctionnel lorsque :
- les demandes AI peuvent entrer par le contrat central ;
- les modules peuvent appeler les capabilities sans connaître les providers ;
- les résultats sont validés avant mutation ;
- le AI Lab peut produire une candidate isolée ;
- les frontières M01–M14 sont respectées ;
- aucune logique AI concurrente n'est recréée dans M15.
