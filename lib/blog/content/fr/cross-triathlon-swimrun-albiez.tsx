import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Le Cross Triathlon et Swimrun des Aiguilles d'Arves se tient mi-juillet au plan
        d'eau d'Albiez — à 300 mètres de l'appartement. Deux épreuves dans la même journée,
        ouvertes <strong>dès 8 ans</strong>, dans un décor où l'on nage face aux Aiguilles.
        C'est l'affaire d'une matinée et d'un après-midi ; le reste de la semaine est à
        prendre.
      </p>

      <h2>Deux épreuves, une journée</h2>

      <h3>Le cross triathlon, le matin</h3>
      <p>
        Natation, VTT, puis course à pied de type trail. Trois formats, et c'est la
        pyramide des âges qui les distingue :
      </p>
      <ul>
        <li>
          <strong>Format S, à partir de 16 ans</strong> — 500 m de nage, 11,97 km de VTT,
          4,8 km de course. Départ à 9 h 30.
        </li>
        <li>
          <strong>12-15 ans</strong> — 200 m, 5,4 km, 2,4 km. Départ à midi.
        </li>
        <li>
          <strong>8-11 ans</strong> — 100 m, 5,4 km, 1 km. Départ à 12 h 45.
        </li>
      </ul>

      <h3>Le swimrun, l'après-midi</h3>
      <p>
        Nage et course, en alternance, sans vélo. Cinq formats, dont un en duo :
      </p>
      <ul>
        <li>
          <strong>Format S, à partir de 16 ans</strong> — 900 m de nage, 8,8 km de course.
        </li>
        <li>
          <strong>12-19 ans</strong>, en binôme ou en solo — 450 m, 4,8 km.
        </li>
        <li>
          <strong>10-11 ans</strong> — 360 m, 640 m.
        </li>
        <li>
          <strong>8-9 ans</strong> — 60 m, 580 m.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Quand</strong> : un week-end de mi-juillet
          <br />
          <strong>Où</strong> : le plan d'eau d'Albiez-Montrond, à 300 m de l'appartement
          <br />
          <strong>À partir de</strong> : 8 ans
          <br />
          <strong>Le matin</strong> : cross triathlon — nage, VTT, trail
          <br />
          <strong>L'après-midi</strong> : swimrun — nage et course
          <br />
          <strong>Inscriptions</strong> : au calendrier de la Fédération française de
          triathlon
        </p>
      </div>

      <h2>Dès 8 ans, et ça change tout</h2>
      <p>
        La plupart des épreuves de montagne commencent à seize ans, ce qui règle la question
        des vacances en famille : les parents courent, les enfants regardent. Ici les quatre
        tranches d'âge ont leur distance, sur le même plan d'eau et dans la même journée. Un
        enfant de huit ans fait ses 60 mètres de nage et ses 580 mètres de course, et il a
        son dossard comme les autres.
      </p>
      <p>
        C'est aussi, très concrètement, la raison pour laquelle il vaut mieux dormir à côté
        qu'à quarante minutes de route : un départ à 9 h 30 pour les grands et un autre à
        12 h 45 pour les petits, ça fait une journée entière sur place, avec des maillots
        mouillés entre les deux.
      </p>

      <h2>Le plan d'eau, à 300 mètres</h2>
      <p>
        C'est le même plan d'eau que le reste de l'été : baignade surveillée, pataugeoire,
        pédalos, structure gonflable, aire de jeux et aire de pique-nique. Le détail est
        dans notre article sur le{" "}
        <Link href="/fr/guide/lac-du-mollard-baignade">lac du Mollard</Link>.
      </p>
      <p>
        Depuis l'appartement on y va à pied. Pas de voiture à garer un jour d'affluence, pas
        de sac à porter pour la journée entière : on remonte se changer entre deux départs,
        et le balcon plein sud sèche une combinaison en une heure.
      </p>

      <h2>Rester la semaine</h2>
      <p>
        L'épreuve dure un jour. Ce qui l'entoure dure plus longtemps, et c'est là qu'un
        séjour se joue :
      </p>
      <ul>
        <li>
          Les{" "}
          <Link href="/fr/guide/randonnees-balisees-albiez">six randonnées balisées</Link>{" "}
          au départ du village, de 40 minutes à 3 h 30 — de quoi reconnaître un terrain ou
          récupérer en marchant.
        </li>
        <li>
          Le VTT et les vélos électriques, avec la{" "}
          <Link href="/fr/guide/bmx-vtt-trottinette-albiez">
            piste de BMX race au centre du village
          </Link>
          .
        </li>
        <li>
          Le <Link href="/fr/guide/col-du-mollard-velo">col du Mollard</Link>, à la sortie
          du hameau, pour qui a emmené le vélo de route.
        </li>
        <li>
          Et tout ce qui fait des vacances plutôt qu'un déplacement sportif :{" "}
          <Link href="/fr/guide/albiez-en-famille">Albiez en famille</Link>.
        </li>
      </ul>
      <p>
        Le programme complet de la saison est sur notre{" "}
        <Link href="/fr/ete">page été</Link>.
      </p>
    </>
  );
}
