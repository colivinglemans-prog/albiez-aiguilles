import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Le Trail de l'Étendard traverse le massif des Grandes Rousses début août, de
        Bourg-d'Oisans à Saint-Sorlin-d'Arves — à un quart d'heure d'Albiez. Et son parcours
        ne disparaît pas le lundi : il existe aussi comme{" "}
        <strong>itinéraire permanent balisé</strong>, qu'on peut courir n'importe quel jour
        de l'été, sans dossard.
      </p>

      <h2>L'épreuve</h2>
      <p>
        Quatre parcours — <strong>17, 22, 44 et 65 km</strong> — au cœur des Grandes
        Rousses, sur deux jours, début août. L'édition 2026 était la treizième.
      </p>
      <p>
        Le <strong>65 km</strong> est celui qui donne son sens à l'épreuve :{" "}
        <strong>3 624 mètres de dénivelé positif</strong>, une traversée du massif au départ
        de Bourg-d'Oisans, un passage au pied du glacier de l'Étendard, et une douzaine de
        lacs remarquables sur le chemin — le Lac Blanc, le lac Bramant, le lac de
        Grand-Maison. Une boucle au pied du pic de l'Étendard, puis la descente sur
        Saint-Sorlin-d'Arves.
      </p>
      <p>
        Le <strong>44 km</strong> suit la même logique en plus court : départ de
        Bourg-d'Oisans, objectif Saint-Sorlin. Les deux formats courts restent du côté
        savoyard.
      </p>

      <div className="facts">
        <p>
          <strong>Quand</strong> : deux jours au tout début août
          <br />
          <strong>Parcours</strong> : 17, 22, 44 et 65 km
          <br />
          <strong>Le 65 km</strong> : 3 624 m de dénivelé positif, Bourg-d'Oisans →
          Saint-Sorlin-d'Arves
          <br />
          <strong>Arrivée</strong> : Saint-Sorlin-d'Arves, à 12 km d'Albiez
          <br />
          <strong>Le reste de l'année</strong> : parcours n° 7 de l'Espace Trail, balisé en
          permanence
        </p>
      </div>

      <h2>Le même parcours, sans dossard</h2>
      <p>
        C'est ce qui rend ce coin intéressant même hors épreuve. L'
        <strong>Espace Trail Pays des Aiguilles d'Arves</strong> balise en permanence{" "}
        <strong>550 kilomètres d'itinéraires</strong>, répartis en plus de quarante parcours
        numérotés : de 3 km pour une sortie en famille à près de 38 km, avec des dénivelés
        qui montent jusqu'à 2 380 mètres.
      </p>
      <p>
        Le <strong>parcours n° 7 est le Trail de l'Étendard lui-même</strong>. On peut donc
        le reconnaître en juillet, le refaire en septembre, ou simplement le courir sans
        jamais s'inscrire à quoi que ce soit. Les chiens tenus en laisse sont admis sur les
        parcours balisés.
      </p>

      <h2>Ce qu'il faut savoir si l'on loge à Albiez</h2>
      <p>
        Disons-le franchement :{" "}
        <strong>aucun parcours de l'Espace Trail ne part d'Albiez-Montrond.</strong> Ils
        partent de Saint-Sorlin-d'Arves, de Saint-Jean-d'Arves, de La Toussuire, du Corbier,
        de la vallée des Villards et du secteur de La Tour-en-Maurienne. Albiez est dans le
        même pays, pas dans le même réseau.
      </p>
      <p>
        En pratique, ça veut dire une quinzaine à une vingtaine de minutes de route pour
        atteindre un départ — Saint-Sorlin est à 12 km, sans repasser par la vallée. C'est
        peu pour un réseau de 550 km, mais ce n'est pas zéro, et mieux vaut le savoir avant
        de réserver.
      </p>
      <p>
        Au départ du village même, il y a en revanche nos{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">six randonnées balisées</Link>, de
        40 minutes à 3 h 30. De quoi courir depuis la porte les jours où l'on ne veut pas
        prendre la voiture.
      </p>

      <h2>Le même massif, à pied et à vélo</h2>
      <p>
        Curiosité de géographie : les coureurs du 65 km traversent les Grandes Rousses à
        pied depuis Bourg-d'Oisans, pendant que les cyclistes franchissent le même massif
        par la route, un mois plus tôt, au col de la Croix de Fer et au Glandon. Même
        barrière, deux façons de la passer — et Albiez est du bon côté pour les deux. Voir{" "}
        <Link href="/fr/guide/albiez-camp-de-base-grands-cols">
          Albiez, camp de base des grands cols
        </Link>
        .
      </p>

      <h2>Autour de la course</h2>
      <p>
        Début août, le village a aussi sa fête —{" "}
        <Link href="/fr/guide/tradi-cimes-albiez">Tradi'Cimes</Link>, gratuite, le week-end.
        Mi-juillet, le{" "}
        <Link href="/fr/guide/cross-triathlon-swimrun-albiez">
          cross triathlon et swimrun
        </Link>{" "}
        se court au plan d'eau du village. Et pour récupérer, la baignade surveillée du{" "}
        <Link href="/fr/guide/lac-du-mollard-baignade">lac du Mollard</Link>.
      </p>
      <p>
        Le reste de la saison est sur notre <Link href="/fr/ete">page été</Link>.
      </p>
    </>
  );
}
