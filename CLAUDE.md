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

## Distinctions

`AWARDS` dans `lib/property.ts` — Traveller Review Awards Booking.com : 8,8/10 en 2026,
9,1/10 en 2025, décernés à « Appart - Chalet du Hameau des Aiguilles » (le nom de
l'annonce Booking diffère de celui du site).

Les certificats officiels sont de grands aplats bleus avec le texte incrusté. Le
composant `Awards` les **reconstruit** aux couleurs du site plutôt que de les afficher
tels quels : le texte devient traduisible et lisible par un lecteur d'écran, et net à
toute taille — le visuel 2025 fourni ne fait que 305 px de côté. Les fichiers d'origine
restent dans `public/images/awards/` pour un usage hors site.

Le kit de communication complet de Booking (stories Instagram, PDF, GIF de signature)
est dans `booking-2026-awards/` à la racine, **hors versionnement** : il n'a pas sa
place dans un dépôt web.

## Avis

`data/reviews.json` contient la note de synthèse (4,96 / 49 avis, Coup de cœur voyageurs)
et les 49 avis relevés le 2026-08-06. La note de synthèse alimente le `aggregateRating`
schema.org, qui pilote les étoiles dans les résultats Google.

Chaque avis porte une **`period`** — `hiver` (déc-mars), `ete` (juil-août) ou
`hors-saison` — à ne pas confondre avec `Season`, qui ne connaît que deux valeurs parce
qu'il n'existe que deux pages de saison. Un séjour hors saison décrit une expérience
différente (remontées fermées, commerces au ralenti) et mérite d'être identifié plutôt
que rangé d'office dans l'une des deux saisons.

Le filtre à quatre entrées (Tous / Saison ski / Saison été / Hors saison), avec ses
compteurs, est affiché sur **toutes** les pages. La prop `season` de `<Reviews>` ne
filtre pas : elle fixe seulement la sélection de départ — `hiver` sur `/ski`, `ete` sur
`/ete`, `all` sur l'accueil. Le visiteur reste libre de consulter les autres périodes.

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

Un fichier préfixé par `_` reste dans le dossier mais n'est pas publié : c'est le moyen
d'écarter une photo sans la supprimer. `getPhoto(dir, fileName)` permet malgré tout de
charger un fichier précis — c'est ainsi que les mosaïques des cartes de saison
(`_mosaique-hiver.jpg`, `_mosaique-ete.jpg`) sont utilisées sans polluer les galeries.

Voir `public/images/README.md`.

### Aucune photo n'est recadrée

`listPhotos()` relève les dimensions de chaque fichier au build (lecture de l'en-tête
via `image-size`) et expose `width`, `height` et `ratio`. Les composants s'en servent
pour que **le conteneur prenne le format de l'image**, jamais l'inverse :

- **Encarts d'activités** — `style={{ aspectRatio: photo.ratio }}`. La moitié de ces
  photos sont en 1:1 ; un cadre 16:9 leur coupait 44 % de la hauteur.
- **Galeries** — disposition en colonnes (`columns-2/3/4` + `break-inside-avoid`), chaque
  vignette en `h-auto w-full`. Les portraits et les carrés cohabitent sans recadrage.
- **Cartes de saison** — cadre carré imposé, mais `object-contain` : ce sont des
  mosaïques, un recadrage couperait dans les vignettes qui les composent.
- **Hero** — la photo prend son propre format, plafonné à `70vh` pour qu'il reste
  quelque chose de visible sous la bannière. `object-cover` ne recadre donc que sur
  les écrans très larges.

Ajouter une photo d'un format inhabituel ne demande donc aucun ajustement.

### Le hero ne pose pas de texte sur la photo

Le titre vit dans une carte blanche opaque qui chevauche le bas de l'image. La première
version assombrissait toute la photo pour faire passer du texte blanc par-dessus : la
photo devenait terne alors que c'est elle qui vend le logement. La carte règle les deux
problèmes — la photo garde ses couleurs, le texte a son propre fond et reste lisible
quelle que soit l'image placée derrière.

Conséquence pratique : **aucune contrainte de luminosité ou de zone calme** sur les
photos de couverture. Une photo très claire ou très chargée convient.

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
