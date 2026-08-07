import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond héberge le terrain de BMX le plus haut de France. Il est en libre
        accès, au Chef-lieu, entouré de terrains de sport et d'une aire de pique-nique. Et
        pour tout ce qui roule, la station loue VTT électriques, BMX et trottinettes
        électriques.
      </p>

      <h2>La piste de BMX race</h2>
      <p>
        Elle se trouve au Chef-lieu et se pratique <strong>en toute liberté</strong> : pas
        de réservation, pas d'encadrement obligatoire. Les modules sont de{" "}
        <strong>différents niveaux</strong>, ce qui permet à un débutant et à un pratiquant
        confirmé de rouler sur le même terrain.
      </p>
      <p>
        Le cadre fait beaucoup : c'est le terrain de BMX le plus haut de France, et on le
        sait en levant les yeux.
      </p>

      <h2>Ce qu'il y a autour</h2>
      <p>
        La piste ne se pratique pas seule — l'ensemble forme une zone de loisirs complète :
      </p>
      <ul>
        <li>Terrains de foot et de basket</li>
        <li>Terrain de tennis</li>
        <li>Terrain de pétanque</li>
        <li>Aire de jeux pour les enfants</li>
        <li>Tables de pique-nique</li>
      </ul>
      <p>
        C'est le bon plan d'une après-midi en famille quand tout le monde ne veut pas faire
        la même chose.
      </p>

      <h2>Louer un vélo</h2>

      <h3>Skiset — Albiez Sports (Chef-lieu)</h3>
      <p>
        Location de <strong>BMX</strong> et de <strong>trottinettes électriques</strong>,
        et balades avec accompagnateurs. Espace de vente de 100 m², matériel de ski l'hiver
        et de randonnée l'été.
      </p>

      <h3>Skimium — Mustang Sports (Chef-lieu)</h3>
      <p>
        <strong>École de vélo</strong> et <strong>VTT électriques</strong>. On les retrouve
        aussi le soir sur le front de neige du Mollard, à 250 m du logement.
      </p>

      <h3>Skiset Ski Attitude et Sport 2000 (front de neige du Mollard)</h3>
      <p>
        Les deux loueurs les plus proches du logement passent en mode randonnée l'été. Le
        détail de chacun est dans notre article{" "}
        <Link href="/fr/guide/louer-ses-skis-a-albiez">
          louer son matériel à Albiez-Montrond
        </Link>
        .
      </p>

      <h2>Le VTT sur les sentiers</h2>
      <p>
        Plusieurs <strong>parcours de VTT</strong> traversent la{" "}
        <Link href="/fr/guide/foret-du-rival">forêt du Rival</Link>, entre 1 300 m et le col
        du Mollard. Attention aux itinéraires partagés : le{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">tour des Contamines</Link> accueille
        aussi des piétons et, l'hiver, des attelages de chiens de traîneaux.
      </p>

      <h2>Et le vélo de route</h2>
      <p>
        Pour les cyclistes, le sujet est ailleurs : le{" "}
        <Link href="/fr/guide/col-du-mollard-velo">col du Mollard</Link>, ses trois montées
        et le tour Arvan-Villards qui enchaîne Glandon, Croix de Fer et Mollard.
      </p>
      <p>
        L'office de tourisme du Chef-lieu met à disposition des cartes et itinéraires pour
        le vélo de route, le gravel et le VTT, avec ou sans assistance électrique.
      </p>
    </>
  );
}
