# Albiez Aiguilles

Site vitrine de l'appartement de montagne d'Albiez-Montrond (Savoie, 1 600 m),
à 250 m des pistes et 350 m du lac.

## Démarrer

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:3000 et redirige vers `/fr` ou `/en`.

## Ajouter des photos

Déposer les fichiers dans le sous-dossier d'espace correspondant —
`public/images/{hiver,ete,commun}/{salon,chambre,balcon,…}/`. La saison est le dossier
parent, l'espace le sous-dossier ; les galeries se mettent à jour au build.
Détails dans [`public/images/README.md`](public/images/README.md).

## Documentation

L'architecture, les conventions de contenu et la liste des chantiers en cours sont
dans [`CLAUDE.md`](CLAUDE.md).
