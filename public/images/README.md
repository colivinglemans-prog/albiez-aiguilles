# Photos

Les galeries sont construites automatiquement à partir du contenu de ces dossiers.
Déposer un fichier suffit : aucune modification de code n'est nécessaire.

## Dossiers

| Dossier  | Usage |
|----------|-------|
| `hiver/` | Photos où l'hiver se voit — hero et galerie de `/fr/ski` et `/en/ski` |
| `ete/`   | Photos où l'été se voit — hero et galerie de `/fr/ete` et `/en/summer` |
| `commun/`| Photos sans saison visible — reprises sur **toutes** les pages |
| `activites-hiver/` | Illustrations des activités de la page ski |
| `activites-ete/`   | Illustrations des activités de la page été |
| `blog/`  | Illustrations des articles |
| `guide-arrivee/` | Itinéraire du guide d'arrivée — **pas une galerie**, voir ci-dessous |

## `guide-arrivee/`

Ce dossier n'alimente aucune galerie : chaque photo est appelée **par son nom de fichier**
depuis `lib/arrival.ts`, parce qu'elle doit montrer exactement l'étape décrite. Renommer
un fichier casse la page ; ajouter une photo ne suffit pas à la faire apparaître, il faut
aussi ajouter son étape et son texte.

```
01-col-du-mollard.jpg                  → Au col du Mollard, à droite
02-residence-hameau-des-aiguilles.jpg  → La résidence
03-parking-conteneurs.jpg              → Se garer près des conteneurs
04-escalier-piscine.jpg                → L'escalier le long de la piscine
05-chalet-dernier-etage.jpg            → Le chalet
06-dernier-escalier.jpg                → Le dernier escalier
07-porte-b122-casier-ski.jpg           → La porte et le casier à skis
08-boite-a-clef.jpg                    → La boîte à clés
09-tableau-electrique.jpg              → « Juste au cas où » (hors itinéraire)
```

Les annotations dessinées sur les photos (flèches, cadres de couleur) font partie du
contenu. Celles du tableau électrique sont reprises en pastilles dans la liste de la
page : leurs couleurs sont figées dans `PANEL_MARKERS`.

## Photos d'activités

Elles illustrent les encarts « activités » des pages de saison, **dans l'ordre du
dossier** : la 1ʳᵉ photo va à la 1ʳᵉ activité, la 2ᵉ à la 2ᵉ, etc. Une activité sans
photo s'affiche en texte seul — il n'est pas obligatoire de toutes les illustrer, mais
mieux vaut alors les remplir dans l'ordre.

L'ordre attendu aujourd'hui :

**`activites-hiver/`**
```
01-ski-alpin.jpg        → Ski alpin
02-ecole-de-ski.jpg     → Débuter à l'école de ski
03-raquettes-luge.jpg   → Raquettes et luge
04-apres-ski.jpg        → Après-ski tranquille
```

**`activites-ete/`**
```
01-lac-baignade.jpg     → Baignade au lac
02-poney-cheval.jpg     → Poney et cheval
03-randonnee.jpg        → Randonnée
04-vtt-electrique.jpg   → Vélo et VTT électrique
```

Si l'ordre des activités change dans les dictionnaires
(`lib/i18n/dictionaries/*.ts`, clé `seasons.<saison>.activities`), renuméroter les
fichiers en conséquence.

## Comment répartir les photos d'intérieur

Le critère n'est pas « intérieur ou extérieur » mais **est-ce que la saison se voit
sur la photo ?**

- Salon avec la neige derrière la baie vitrée, balcon sous la neige → `hiver/`
- Le même salon avec la montagne verte, balcon au soleil d'été → `ete/`
- Salle de bains, chambre sans vue, détail de la cuisine → `commun/`

Les photos de `commun/` sont automatiquement ajoutées à la suite des photos de saison
sur les pages `/ski` et `/ete` : **inutile de les dupliquer dans plusieurs dossiers**.
Une pièce photographiée dans les deux saisons mérite en revanche ses deux fichiers,
un dans chaque dossier de saison — c'est exactement ce qui donne envie de revenir
à l'autre saison.

## Mettre une photo de côté

Un fichier dont le nom commence par `_` reste dans le dossier mais **n'est pas publié** :
il disparaît des galeries sans être supprimé. C'est le moyen d'écarter une photo
redondante ou de qualité insuffisante tout en la gardant sous la main.

Deux exceptions y sont chargées explicitement par le code, parce qu'elles ont un rôle
désigné et n'ont rien à faire dans « En images » — elles ne montrent que des photos
déjà présentes :

```
hiver/_mosaique-hiver.jpg   → carte « L'hiver au ski » sur l'accueil
ete/_mosaique-ete.jpg       → carte « L'été au lac » sur l'accueil
```

Ces deux-là doivent rester **carrées** et conserver leur nom exact.

## Ordre d'affichage

L'ordre suit **l'ordre alphabétique des noms de fichiers**. Préfixer par un numéro
pour le maîtriser :

```
01-balcon-vue-aiguilles.jpg
02-salon-cuisine.jpg
03-chambre-lit-double.jpg
```

La **première photo du dossier** ouvre la galerie « En images », sur l'accueil comme sur
la page de saison. Choisir celle qui donne le plus envie d'ouvrir la galerie.

Le **hero** ne suit pas cet ordre : il est désigné par nom de fichier dans `HERO_PHOTOS`
(`lib/property.ts`). Les deux ne répondent pas au même critère — un hero doit tenir en
bandeau très large, une vignette de tête doit accrocher l'œil. Les coupler obligeait à
sacrifier l'un pour changer l'autre.

## Texte alternatif

Il est dérivé du nom de fichier : le préfixe numérique est retiré, les tirets deviennent
des espaces. `02-balcon-vue-aiguilles.jpg` → « Balcon vue aiguilles ». Nommer les fichiers
de façon descriptive améliore donc à la fois l'accessibilité et le référencement image.

## Formats

`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`. Viser environ 2000 px de large et moins de
500 Ko par fichier.
