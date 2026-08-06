# Albiez — site vitrine

Site vitrine de l'appartement de montagne d'Albiez-Montrond (Savoie).
Projet **distinct** de `coliving-barbusse` : autre bien, autre entité juridique (SCI),
autre domaine, autre déploiement Vercel.

## Stack

Next.js 16.1.6 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · npm

```bash
npm run dev     # développement
npm run build   # build de production
npm run lint    # ESLint
```

## Structure des URLs

| URL | Contenu |
|-----|---------|
| `/` | Redirection vers `/fr` ou `/en` selon `Accept-Language` (non indexée) |
| `/fr`, `/en` | Accueil — présentation du logement, valable toute l'année |
| `/fr/ski`, `/en/ski` | Page saison hiver |
| `/fr/ete`, `/en/summer` | Page saison été |

Les slugs de saison sont **localisés** : `/fr/ete` et `/en/summer` sont deux URLs
distinctes qui se déclarent mutuellement en `hreflang`. La correspondance vit dans
`SEASON_SLUGS` (`lib/seasons.ts`). Un slug de la mauvaise langue rend un 404
(`/fr/summer` → 404), ce qui évite le contenu dupliqué.

Architecture hub-and-spoke : l'accueil porte le contenu permanent (appartement,
couchages, équipements, infos pratiques, situation), les pages de saison portent le
contenu saisonnier (distances, activités, galerie). Aucun contenu n'est dupliqué
entre les deux, ce qui laisse chaque page cibler ses propres requêtes.

## Le mécanisme de saison

La saison n'est pas un état client mais une **donnée de route**. Trois pièces :

1. `currentSeason()` dans `lib/seasons.ts` — quelle saison mettre en avant sur
   l'accueil. Bascule très en avance sur la saison réelle (**août → avril = ski**)
   parce qu'on vend un séjour plusieurs mois avant qu'il ait lieu : dès août l'été
   est joué et ce sont les réservations de ski qui se décident.
   `FEATURED_SEASON_OVERRIDE` force la saison quand la réalité commerciale ne suit
   pas le calendrier (saison complète en avance, ouverture décalée).
2. L'attribut `data-season` posé sur le conteneur de page.
3. Trois variables CSS (`--season-accent*`) redéfinies par `[data-season]` dans
   `app/globals.css`. Toutes les utilitaires `*-accent` du sous-arbre suivent.

Conséquence : changer la couleur d'une saison = éditer un bloc CSS, pas les composants.
Le header et le footer restent en bleu alpin (`primary`), volontairement hors saison.

## Contenu

| Fichier | Rôle |
|---------|------|
| `lib/property.ts` | **Faits** : adresse, altitude, surface, couchages, distances, accès, contact. Identiques dans toutes les langues, corrigés à un seul endroit. |
| `lib/i18n/dictionaries/{fr,en}.ts` | **Textes** : tout ce qui se traduit, y compris les métadonnées SEO par page. |
| `lib/seasons.ts` | Saisons, slugs, dates d'ouverture du domaine. |
| `lib/seo.ts` | `alternates` (canonical + hreflang) et données structurées schema.org. |
| `lib/legal.ts` | Identité de l'éditeur — **SCI JUARISAL**, distincte de l'entreprise individuelle de Barbusse. |
| `data/reviews.json` | Avis Airbnb + note de synthèse. |

## Distances

L'hiver, tout est réuni au **front de neige à 250 m** : départ des pistes, commerces,
ESF et club Piou-Piou. C'est modélisé par une entrée unique avec un champ `includes`
(`DISTANCES.hiver`) plutôt que quatre entrées à 250 m, qui laisseraient croire à quatre
lieux distincts. L'été, les trois distances sont réellement différentes.

## Avis

`data/reviews.json` contient la note de synthèse (4,96 / 49 avis, Coup de cœur voyageurs)
et une sélection d'avis relevés le 2026-08-06. Chaque avis porte une `season` : les pages
de saison n'affichent que les avis correspondants, l'accueil les affiche tous. La note de
synthèse alimente aussi le `aggregateRating` schema.org, qui pilote les étoiles dans les
résultats Google.

Pour rafraîchir : recopier les nouveaux avis dans le JSON. Le flux SociableKit de Barbusse
n'est **pas** utilisable ici — il est au niveau du compte Airbnb et mélange les annonces
sans champ permettant de les distinguer.

Règle : un chiffre ou une distance ne doit **jamais** être écrit dans un dictionnaire.
Il vit dans `property.ts` et le dictionnaire ne fournit que son libellé.

## Photos

Déposer les fichiers dans `public/images/` — les galeries se construisent seules
(`lib/photos.ts`, lecture du dossier au build). Ordre alphabétique des noms de fichiers,
la première photo sert de couverture.

Le critère de répartition entre `hiver/`, `ete/` et `commun/` n'est pas intérieur/extérieur
mais **est-ce que la saison se voit sur la photo**. Les photos de `commun/` sont ajoutées
à la suite des photos de saison sur les pages `/ski` et `/ete` : elles n'ont jamais besoin
d'être dupliquées.

`activites-hiver/` et `activites-ete/` illustrent les encarts « activités » des pages de
saison, appariés **par position** avec la liste `seasons.<saison>.activities` du
dictionnaire. Changer l'ordre des activités impose de renuméroter les fichiers.

Voir `public/images/README.md`.

## À faire

- [ ] **Nom de domaine** — `SITE_NAME` et `SITE_URL` dans `lib/property.ts` sont des
      valeurs provisoires (`albiez-aiguilles.fr`). Une fois le domaine arrêté, les
      changer là et nulle part ailleurs.
- [ ] **Photos** — les dossiers sont vides ; les galeries affichent un message d'attente.
- [ ] **Calendrier de réservation** — `BookingSection` est un placeholder qui renvoie
      vers Airbnb. À remplacer par le calendrier Beds24 une fois le compte de la SCI créé
      (property ID à mettre en variable d'environnement, pas en dur).
- [ ] **Blog** — prévu, non démarré.
- [ ] **Carte Leaflet** — la section situation utilise pour l'instant un lien Google Maps.
- [ ] **Tarif du ménage** — 60 € est enregistré dans `PROPERTY.services.cleaningFee`
      mais n'est affiché nulle part, en attendant le moteur de réservation.
- [ ] `<html lang>` est figé à `fr` côté serveur et corrigé au montage par `I18nProvider`.
      Le corriger au rendu imposerait de lire les en-têtes et de perdre le rendu statique.
      Les `hreflang` étant corrects, l'impact SEO est marginal.
