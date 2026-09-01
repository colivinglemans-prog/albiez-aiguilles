---
description: Récupère les nouveaux avis Airbnb via Beds24, complète ce que l'API ne donne pas, et propose le déploiement
argument-hint: "[--dry-run]"
allowed-tools: Bash(npm run sync-reviews:*), Bash(node scripts/sync-reviews.mjs:*), Bash(npm run lint:*), Bash(npm run build:*), Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(npx vercel deploy:*), Read, Edit
---

Récupère les nouveaux avis Airbnb d'Albiez et met à jour le site.

Argument éventuel : $ARGUMENTS (`--dry-run` = ne rien écrire, juste montrer).

## Déroulé

0. **Se placer à la racine du repo Albiez** — celui qui contient `scripts/sync-reviews.mjs`
   et `data/reviews.json`. Le poste sert deux sites voisins, et le répertoire courant peut
   très bien être celui de Barbusse : toutes les commandes ci-dessous en dépendent.

1. **Lancer la synchro.** `npm run sync-reviews -- --dry-run` d'abord, toujours, pour voir ce
   qui arrive avant d'écrire. Si le rapport annonce « Aucun avis nouveau » et aucun écart de
   `summary`, dis-le en une phrase et **arrête-toi là** — il n'y a rien à committer.

2. **Relire ce qui arrive.** Le script lit l'API mais ne juge de rien. Pour chaque avis
   nouveau, montre-moi le texte et vérifie trois points :
   - **le prénom.** Vide = la réservation n'est pas passée par Beds24, l'API ne donne pas le
     nom du voyageur. Demande-le-moi, je le lis sur la page Airbnb. Ne l'invente jamais et ne
     laisse pas `""` dans le fichier.
   - **la période** (`hiver` déc-mars / `ete` juil-août / `hors-saison`). Elle est dérivée du
     mois d'arrivée, mais un séjour à cheval sur deux saisons ou hors des dates de remontées
     peut mériter mieux. Le texte de l'avis tranche souvent tout seul.
   - **la réponse de l'hôte**, si le script en a repris une. Le fichier ne garde que celles
     qui apprennent quelque chose au lecteur : « merci beaucoup ! » n'a rien à y faire.
   - Signale aussi les **fautes de frappe évidentes** — le fichier les corrige, l'API renvoie
     le texte brut — mais ne touche jamais au fond ni au ton du propos.

3. **Écrire.** Relancer sans `--dry-run`, puis appliquer les corrections décidées à l'étape 2
   directement dans `data/reviews.json`.

4. **Vérifier.** `git diff data/reviews.json` : le diff ne doit contenir **que** les avis
   nouveaux et le `summary`. Si une entrée ancienne bouge, c'est un appariement raté — dis-le
   moi et n'écris rien de plus. Puis `npm run lint` et `npm run build`.

5. **Déployer**, après mon accord :
   ```bash
   git add data/reviews.json && git commit && git push
   npx vercel deploy --prod --scope colivinglemans-progs-projects
   ```
   Le `--scope` n'est pas décoratif : sans lui, le déploiement répond `Not authorized`.
   Le site fait un `import` statique de `data/reviews.json` : sans redéploiement, les avis
   restent ceux du dernier build. Rappelle-moi que l'un ne va pas sans l'autre.

## À savoir

Le script est `scripts/sync-reviews.mjs`, documenté dans la section **Avis** de `CLAUDE.md`.
Il ajoute et ne réécrit pas : un avis déjà dans le fichier est laissé intact, un avis qu'Airbnb
ne renvoie plus est signalé mais jamais supprimé. Seul `summary` est recalculé.

Si le script échoue en `401`, le refresh token de `.env.local` a été révoqué : le regénérer
avec `scripts/beds24-setup.mjs`. Un `403` sur `/channels/airbnb/reviews` veut dire que le
token a perdu le scope `read:channels`.
