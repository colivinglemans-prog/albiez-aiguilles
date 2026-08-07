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

## Domaine

`albiez-aiguilles.fr`, acheté le 2026-08-07.

Le site se sert de la forme **`www.`** — c'est la valeur de `SITE_URL` (`lib/property.ts`),
donc celle qui figure dans les canonical, les hreflang, le sitemap et l'Open Graph.
L'apex doit **rediriger vers `www`**, jamais l'inverse : servir les deux revient à publier
deux fois le même site.

Une seule ligne à changer si le domaine bouge un jour — `SITE_URL` — et tout suit.

Registrar **OVH** (serveurs de noms `dns106.ovh.net` / `ns106.ovh.net`). Les deux domaines
sont rattachés au projet Vercel, avec la redirection apex → www en 308 configurée côté
Vercel. Enregistrements DNS en place dans la zone OVH depuis le 2026-08-07 :

| Type | Sous-domaine | Cible |
|------|--------------|-------|
| `A` | (vide, l'apex) | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com.` |

`www` est en **CNAME** et non en `A` : Vercel sert ce nom depuis plusieurs adresses et les
fait évoluer (il renvoie aujourd'hui `76.76.21.142` et `66.33.60.66`, pas le `76.76.21.21`
de l'apex). Un `A` en dur sur `www` deviendrait un point de panne silencieux le jour où ces
adresses changent. L'apex n'a pas le choix — la norme DNS interdit un `CNAME` sur un nom qui
porte déjà `SOA`, `NS` et `MX`.

La mise en service a demandé de supprimer les vestiges du parking OVH : l'`A` de l'apex
pointait sur `213.186.33.5`, et deux `TXT` au format interne des redirections OVH traînaient
(`1|www.albiez-aiguilles.fr` sur l'apex, `3|welcome` sur `www`). Ce dernier bloquait la
création du `CNAME`, un `CNAME` ne pouvant coexister avec aucun autre enregistrement sur le
même nom. Les `MX` et le `SPF` d'OVH Mail sont à laisser intacts.

## Déploiement

Projet Vercel **`albiez-aiguilles`** (équipe `colivinglemans-progs-projects`), déployé
depuis la CLI comme Barbusse :

```bash
npx vercel --prod
```

⚠️ **Le preset de framework doit rester `nextjs`** sur le projet. Il était vide au départ,
parce que le projet a été créé par `vercel project add` et non par le flux interactif de la
CLI, qui est le seul à faire la détection. Sans lui, le build réussit, le déploiement passe
en `READY`… et **toutes les routes renvoient 404** : Vercel ne câble ni les fonctions ni le
routage Next.js. Symptôme trompeur, à connaître.

`ssoProtection` est **désactivé** : les URLs `*.vercel.app` sont publiques, ce qui permet de
tester depuis un téléphone sans se connecter à Vercel. À remettre sur
`all_except_custom_domains` une fois le domaine en service, pour éviter que Google indexe le
site deux fois (les canonical pointent déjà tous vers le domaine, le risque est faible mais
inutile).

## Structure des URLs

| URL | Contenu |
|-----|---------|
| `/` | Redirection vers `/fr` ou `/en` selon `Accept-Language` (non indexée) |
| `/fr`, `/en` | Accueil — présentation du logement, valable toute l'année |
| `/fr/ski`, `/en/ski` | Page saison hiver |
| `/fr/ete`, `/en/summer` | Page saison été |
| `/fr/guide`, `/en/guide` | Index du guide (blog éditorial) |
| `/fr/guide/<slug>`, `/en/guide/<slug>` | Article du guide — 16 slugs, communs aux deux langues |
| `/fr/guide-arrivee`, `/en/guide-arrivee` | Guide d'arrivée — **page cachée** (voir plus bas) |

Les slugs de saison sont **localisés** : `/fr/ete` et `/en/summer` sont deux URLs
distinctes qui se déclarent mutuellement en `hreflang`. La correspondance vit dans
`SEASON_SLUGS` (`lib/seasons.ts`). Un slug de la mauvaise langue rend un 404
(`/fr/summer` → 404), ce qui évite le contenu dupliqué.

## Les trois pages ont la même colonne vertébrale

L'accueil, `/ski` et `/ete` sont bâties sur le même squelette. Seul le bloc situé entre le
hero et la galerie change :

| | Accueil | `/ski` et `/ete` |
|---|---|---|
| Bloc variable | `SeasonCards` — « Deux saisons, deux séjours » | `SeasonBlock` — bascule de saison, distances, plan des pistes, bandeau, points forts, activités |
| Tout ce qui suit | `CommonSections` | `CommonSections`, à l'identique |

`CommonSections` (`components/public/CommonSections.tsx`) rend la galerie, l'appartement,
le kit linge, les distinctions, les avis, les infos pratiques, la situation, l'hôte,
HomeExchange et la réservation — et résout lui-même ses photos. Sa prop `season` est
**optionnelle** : absente = accueil (galerie ordonnée sur `currentSeason()`, avis non
filtrés) ; fournie = page de saison (galerie et filtre d'avis accordés à la page).

Ces sections vivaient auparavant sur la seule page d'accueil, en hub-and-spoke. Le
problème : on arrive sur `/fr/ski` depuis Google ou depuis un lien Airbnb, pas par
l'accueil, et on n'y apprenait ni le nombre de couchages, ni le kit linge, ni les 50
marches. Le contenu partagé se paie en duplication SEO — c'est assumé, et compensé par
des `<title>`, descriptions et H1 distincts, des canonical propres à chaque page, un haut
de page unique, et le **JSON-LD `Apartment` déclaré sur la seule page d'accueil** (une
seule entité pour un seul logement — ne pas le dupliquer sur les pages de saison).

Corollaire : les ancres de navigation visent la **page courante**. `anchorBase(pathname,
locale)` (`lib/anchors.ts`) rend `/fr/ski#appartement` depuis `/fr/ski`, et retombe sur
`/fr#appartement` depuis une page qui ne porte pas ces sections (guide, mentions légales).
Utilisé par le `Header` **et** par les deux boutons du `Hero` — sans quoi un clic sur
« L'appartement » éjecterait le visiteur de la saison qu'il consultait.

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
| `data/guidebook-airbnb.md` | **Matière première du guide** — le guidebook Airbnb de l'hôte, aspiré et converti. Pas lu par le code. |

## Distances

L'hiver, tout est réuni au **front de neige à 250 m** : départ des pistes, commerces,
ESF et club Piou-Piou. C'est modélisé par une entrée unique avec un champ `includes`
(`DISTANCES.hiver`) plutôt que quatre entrées à 250 m, qui laisseraient croire à quatre
lieux distincts. L'été, les trois distances sont réellement différentes.

Le **plan des pistes** est collé au bandeau de distances : il montre ce que le chiffre
affirme. Il est **agrandissable** (`ZoomableFigure`), en deux paliers — ajusté à l'écran,
puis taille réelle dans un cadre qui défile. Dans sa colonne, un plan de 1920 px de large
rend les noms de pistes illisibles, et le premier palier n'y suffit pas sur un téléphone.
Composant distinct de la visionneuse de `PhotoGallery`, qui parcourt une série avec
compteur et flèches là où il n'y a ici qu'une image à regarder de près.

## La section « activités » des pages de saison

Cinq encarts l'hiver, quatre l'été, appariés à leurs photos par position (voir « Photos »).

L'hiver, le **premier prend toute la largeur** — c'est le domaine skiable, ce que vient
chercher le visiteur — avec sa photo à gauche et, sous le texte, les chiffres de la
station en pastilles. Ce qui déclenche cette mise en vedette est la présence de
`resortFacts` dans le dictionnaire de la saison : l'été, aucune activité ne l'emporte sur
les autres, les quatre restent à égalité.

Le compte n'est pas arbitraire : l'encart en vedette occupe une ligne entière, et les
suivants remplissent une grille à deux colonnes. Un nombre impair d'encarts derrière
la vedette laisse une case vide en bas de grille — d'où cinq activités l'hiver (1 + 4) et
quatre l'été (2 × 2).

Les chiffres viennent de `RESORT` (`property.ts`) et n'apparaissent **qu'une fois** sur la
page, dans ces pastilles. Le dictionnaire ne porte que les mots (`pistes`, `remontées`,
`enneigeurs`) ; les milliers sont formatés selon la langue (« 1 500 » / « 1,500 »).
Auparavant *40 km / 13 remontées / 1 500-2 060 m* était écrit trois fois — intro, points
forts, activités — et les encarts qui répétaient un chiffre déjà donné n'avaient plus rien
à dire.

Le titre de la section est `activitiesTitle`, et non `heading` : ce dernier est déjà le H1
du hero, quelques centaines de pixels plus haut.

Le lien d'un encart est soit un **prestataire** (URL dans `PROPERTY.links`, nouvel onglet),
soit un **article du guide** (`internal: true`, `<Link>` préchargé, href préfixé par la
langue comme dans le corps des articles). Les liens vers le guide sont ce qui permet à un
encart de rester court sans être creux.

## Distinctions

Côté Airbnb, deux distinctions différentes affichées côte à côte par
`AirbnbDistinctions` : **Superhôte** récompense l'hôte, **Coup de cœur voyageurs**
récompense le logement. Elles restent deux cartes séparées — fondues en un seul
bandeau, la seconde passerait pour une reformulation de la première. Textes dans
`superhost` et `guestFavourite` des dictionnaires i18n.

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

## HomeExchange

Présenté dans le bloc « Et hors saison ? » de l'accueil, là où la question se pose pour
le visiteur qui envisage avril ou octobre. Deux liens dans `PROPERTY.links` : la page du
logement et le lien de parrainage (`alexandre-07e4b`, 250 GuestPoints pour chaque
partie). La contrepartie du parrainage est **annoncée sous le bouton** — un lien de
parrainage qui ne dit pas son nom se retourne contre celui qui le pose.

Logo officiel dans `public/brand/homeexchange.svg`, servi en `unoptimized` : c'est un
SVG statique, l'optimiseur d'images de Next n'a rien à y gagner et le laisser passer
demanderait d'activer `dangerouslyAllowSVG`.

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

## Le guide (blog)

`/{locale}/guide` — 17 articles bilingues sur Albiez-Montrond : randonnées balisées,
domaine skiable, loueurs, ESF, commerces, fromagerie coopérative, lac, col du Mollard,
refuge, activités d'été.

| Fichier | Rôle |
|---------|------|
| `lib/blog/posts.ts` | `BLOG_POSTS` — slug, date, photo, saison, et les métadonnées FR/EN (titre, description, excerpt, keywords). Plus `relatedPosts()` et `splitImagePath()`. |
| `lib/blog/content/{fr,en}/<slug>.tsx` | Le corps de l'article, en JSX presque nu. Les `<Link>` internes sont préfixés en dur par `/fr` ou `/en`. |
| `app/[locale]/guide/page.tsx` | Index — résout les photos côté serveur et passe les cartes au filtre. |
| `components/public/GuideFilter.tsx` | Filtre de saison + grille de cartes (composant **client**). |
| `app/[locale]/guide/[slug]/page.tsx` | Article + JSON-LD + encart de réservation + « À lire aussi ». |
| `lib/blog/ArticleImage.tsx` | Photo au fil d'un article (`<ArticleImage src="dossier/fichier.jpg" alt caption />`). Même traitement que les couvertures : dimensions relevées au build, aucun recadrage, figure absente si le fichier manque. |
| `.prose-article` (`app/globals.css`) | Toute la typographie du corps d'article, plus la classe `.facts` des encadrés pratiques. |

**Le slug est commun aux deux langues**, contrairement aux slugs de saison : un article
n'existe qu'à une seule adresse par langue, et les deux se déclarent en `hreflang`. Cela
évite de maintenir une table de correspondance pour du contenu qui n'a pas d'équivalent
« naturel » dans l'autre langue.

Les composants d'article sont **importés paresseusement** dans `CONTENT` (`[slug]/page.tsx`) :
trente-deux imports en tête de fichier pour n'en rendre qu'un seul alourdiraient chaque page.
Les chemins doivent rester des littéraux, sans quoi le bundler ne les résout pas.

Les **liens vers les prestataires** (ESF, location de ski Sport 2000, accompagnateur en
montagne) vivent dans `PROPERTY.links`, jamais en dur dans un article : un partenaire qui
change d'URL se corrige à un seul endroit, et les deux langues suivent.

La photo de couverture est désignée par `dossier/fichier.jpg` sous `public/images/` et
chargée par `getPhoto()` : ses dimensions réelles sont relevées au build, donc **aucune
couverture n'est recadrée** — la vignette prend le format de l'image, comme le reste du site.
Un préfixe `_` est accepté (`getPhoto` le charge, contrairement à `listPhotos`).

Le champ `season` d'un article pose `data-season` sur la carte et sur la page : l'accent
suit la saison, sans code conditionnel. `null` = valable toute l'année.

**Le filtre de l'index** reprend la logique de celui des avis : trois entrées avec
compteurs — *Toute l'année* (par défaut, tout est affiché), *Hiver*, *Été*. Un article
`season: null` reste visible **sous chaque filtre** : « faire ses courses » ou « la
boulangerie » servent autant en février qu'en août, et les exclure d'une saison donnerait
une liste techniquement juste et pratiquement inutilisable. D'où des compteurs qui ne
s'additionnent pas (17 / 11 / 12) — un encart l'explique dès qu'une saison est
sélectionnée.

Le filtre étant client, l'index résout les photos côté serveur et passe des cartes déjà
mesurées. Les **17 cartes sont dans le HTML initial** (le filtre part sur « tout »), donc
le filtrage ne coûte rien au référencement.

**Ajouter un article** : une entrée dans `BLOG_POSTS`, deux fichiers dans
`content/{fr,en}/`, une entrée dans `CONTENT`. Le sitemap et l'index suivent tout seuls.

`react/no-unescaped-entities` est **désactivé sur `lib/blog/content/**`** (voir
`eslint.config.mjs`) : la règle vise les `>` et `}` tapés par accident, et sur de la prose
française elle ne signale que des apostrophes légitimes.

## Guide d'arrivée (page cachée)

`/{locale}/guide-arrivee` — l'itinéraire en photos, du col du Mollard à la boîte à clés.
Destiné aux voyageurs qui ont réservé ; son adresse leur est communiquée avec la réservation.

« Caché » veut dire trois choses, toutes nécessaires : `robots: { index: false, follow: false }`,
absence du sitemap, absence du header et du footer. La page n'est **pas** listée dans
`robots.txt` — un `Disallow` publierait justement l'adresse qu'on veut garder discrète.
Rien n'empêche qui que ce soit d'y accéder : il n'y a **aucun secret sur la page**, le code
de la boîte à clés est transmis par message et ne doit jamais y être écrit.

Conçue pour être lue sur un téléphone, à l'arrêt au bord de la route : une seule colonne,
photos pleine largeur au format d'origine, cibles tactiles d'au moins 48 px, et les numéros
d'urgence composables d'un doigt (ligne entière cliquable).

| Fichier | Rôle |
|---------|------|
| `lib/arrival.ts` | Étapes (clé + nom de fichier photo), repères du tableau électrique, numéros d'urgence. |
| `lib/i18n/dictionaries/{fr,en}.ts` | Bloc `guide` — tous les textes. |
| `public/images/guide-arrivee/` | Photos numérotées `01-` à `09-`. |

Les étapes sont appariées à leur photo **par nom de fichier**, pas par position : une photo
d'itinéraire doit montrer exactement l'endroit décrit, et insérer une étape ne doit pas
décaler silencieusement toutes les suivantes. Le numéro affiché, lui, est la position dans
`ARRIVAL_STEPS`.

Les couleurs de `PANEL_MARKERS` reprennent les cadres dessinés sur la photo du tableau
électrique : en changer une impose de refaire l'annotation de l'image.

Deux valeurs de la page viennent de `property.ts` et non des dictionnaires — le nombre de
marches (`access.steps`) et le numéro de la porte (`unit`), qui est aussi celui du casier
à skis.

## Photos

Déposer les fichiers dans `public/images/` — les galeries se construisent seules
(`lib/photos.ts`, lecture du dossier au build).

### Saison × espace

Une photo de galerie porte **deux** coordonnées : la saison (dossier parent) et l'espace
(sous-dossier) — `hiver/balcon/`, `commun/chambre/`. Les deux axes se composent au lieu
de se disputer un seul dossier, ce qui permet au balcon d'avoir ses photos d'été *et*
d'hiver regroupées sous un seul titre dans la galerie.

| Fichier | Rôle |
|---------|------|
| `lib/spaces.ts` | `SPACES` — les espaces **dans l'ordre de la visite**, sans dépendance (importé aussi par le typage i18n). |
| `lib/photos.ts` | `listSpaces(dir)` lit les sous-dossiers ; `gallerySpaces(season)` fusionne les trois dossiers espace par espace. |
| `lib/gallery.ts` | Rapproche les photos (système de fichiers) des titres et équipements (dictionnaires). Côté serveur : la galerie reçoit des groupes déjà traduits. |
| `spaces.list` (dictionnaires) | Titre et équipements de chaque espace, exhaustif sur `SPACES` — un espace sans libellé ne compile pas. |

L'ordre des espaces est celui de la visite, pas l'ordre alphabétique : il est donc écrit
dans `SPACES` et non déduit du système de fichiers. Créer un espace demande le dossier,
sa clé et ses libellés FR/EN.

Le critère de répartition entre `hiver/`, `ete/` et `commun/` n'est pas intérieur/extérieur
mais **est-ce que la saison se voit sur la photo**. Dans chaque espace, l'ordre reste
`[saison en cours, commun, autre saison]` : les photos de `commun/` n'ont jamais besoin
d'être dupliquées.

### La galerie a deux états

Repliée, elle montre **une vignette par espace** avec son nom et son nombre de photos :
on voit ce que contient le logement, balcon et extérieur compris, là où « les 8 premières
photos » les laissait hors champ. Dépliée, c'est la visite complète, chaque espace suivi
de ses équipements. La visionneuse, elle, parcourt les photos à plat dans l'ordre de la
visite — ouvrir « Balcon » puis continuer à la flèche déroule la suite.

Le **hero est découplé de cet ordre** : il est désigné par `espace/nom-de-fichier` dans
`HERO_PHOTOS` (`lib/property.ts`), avec repli sur la première photo de la visite. Changer
la tête de galerie n'impose donc pas de changer le hero, et réciproquement. Même forme
pour `SLEEPING_PHOTOS`, `LINEN_PHOTOS` et `BABY_KIT_PHOTO`.

`activites-hiver/` et `activites-ete/` illustrent les encarts « activités » des pages de
saison, appariés **par position** avec la liste `seasons.<saison>.activities` du
dictionnaire. Changer l'ordre des activités impose de renuméroter les fichiers, et il
faut **autant de photos numérotées que d'activités** : une activité sans photo devient un
bloc de texte au milieu d'une grille d'images. La quatrième photo d'hiver
(`04-soiree-albiez-c-show-…`) est une copie de la couverture de l'article correspondant —
`public/images/blog/` sert les articles, `activites-*/` sert les pages de saison, et les
deux dossiers restent indépendants.

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

- [ ] **`ssoProtection`** — à remettre sur `all_except_custom_domains` maintenant que le
      domaine est en service (voir la section « Déploiement »).
- [ ] **Google Search Console** — propriété à créer pour `albiez-aiguilles.fr` et sitemap à
      soumettre. Rien n'est déclaré aujourd'hui : contrairement à Barbusse, `app/layout.tsx`
      ne porte aucun `google-site-verification`.
- [ ] **Photos** — les dossiers sont vides ; les galeries affichent un message d'attente.
- [ ] **Calendrier de réservation** — `BookingSection` est un placeholder qui renvoie
      vers Airbnb. À remplacer par le calendrier Beds24 une fois le compte de la SCI créé
      (property ID à mettre en variable d'environnement, pas en dur).
- [ ] **Guide** — 16 articles en ligne. Restent à vérifier avant la haute saison : les
      horaires des commerces et du centre équestre, et l'horaire exact de l'Albiez C'Show,
      qui changent chaque année. Dix articles ont une couverture dédiée dans
      `public/images/blog/` ; les sept autres empruntent encore au dossier `activites-*`
      (randonnées, ESF, domaine skiable, famille, lac, Aiguilles d'Arves, équitation).
      Chaque article a bien une couverture distincte — à remplacer au fil de l'eau par des
      visuels propres.
- [ ] **Carte Leaflet** — la section situation utilise pour l'instant un lien Google Maps.
- [ ] **Tarif du ménage** — 60 € est enregistré dans `PROPERTY.services.cleaningFee`
      mais n'est affiché nulle part, en attendant le moteur de réservation.
- [ ] `<html lang>` est figé à `fr` côté serveur et corrigé au montage par `I18nProvider`.
      Le corriger au rendu imposerait de lire les en-têtes et de perdre le rendu statique.
      Les `hreflang` étant corrects, l'impact SEO est marginal.
