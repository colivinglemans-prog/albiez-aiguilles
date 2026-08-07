import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        À 350 mètres du logement, le plan d'eau du Mollard mène une double vie : réserve
        d'eau pour la neige de culture l'hiver, base de loisirs et de baignade l'été. C'est
        le lieu de rendez-vous du secteur entre juillet et août.
      </p>

      <h2>La baignade</h2>
      <p>
        Le lac est ouvert à la baignade l'été, et{" "}
        <strong>surveillé du 1<sup>er</sup> juillet au 31 août, tous les jours de 12 h à
        18 h</strong>. En dehors de ce créneau, la baignade n'est pas surveillée.
      </p>
      <p>
        L'eau est une eau de montagne à 1 630 mètres : elle se mérite en début de saison, et
        devient franchement agréable au cœur de l'été.
      </p>

      <h2>Ce qu'il y a autour</h2>
      <ul>
        <li>
          <strong>Une structure gonflable</strong> sur le plan d'eau — c'est ce qui occupe
          les enfants toute une après-midi.
        </li>
        <li>
          <strong>Un bassin « pataugeoire »</strong> pour les plus petits.
        </li>
        <li>
          <strong>Des tables de pique-nique.</strong>
        </li>
        <li>
          <strong>Un terrain de pétanque</strong> et un <strong>terrain de volley</strong>.
        </li>
        <li>
          <strong>Des toilettes publiques.</strong>
        </li>
      </ul>
      <p>
        Une seconde zone de loisirs existe de l'autre côté de la route au{" "}
        <Link href="/fr/guide/col-du-mollard-velo">col du Mollard</Link>, avec plan d'eau et
        pataugeoire surveillés, sanitaires, pétanque, aire de jeux et aire de pique-nique.
      </p>

      <h2>La boucle à pied : 30 minutes</h2>
      <p>
        Le tour du plan d'eau est une boucle familiale au départ direct du logement, très
        bien exposée, avec <strong>peu de dénivelé et 30 minutes de marche</strong>. La vue
        porte sur les <Link href="/fr/guide/aiguilles-arves">Aiguilles d'Arves</Link>, le
        glacier de l'Étendard et la vallée de l'Arvan.
      </p>
      <p>
        C'est la promenade de fin de journée par excellence, et le meilleur endroit du
        secteur pour photographier les Aiguilles au coucher du soleil : le lac les reflète.
      </p>
      <p>
        Les cinq autres itinéraires balisés de la commune sont détaillés dans notre article{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">
          les six randonnées balisées d'Albiez-Montrond
        </Link>
        .
      </p>

      <h2>L'hiver, le même lac</h2>
      <p>
        De décembre à mars, le plan d'eau sert de <strong>réserve d'eau pour les
        50 enneigeurs</strong> du domaine. C'est lui qui garantit une partie de
        l'enneigement des pistes. La balade autour reste possible, dans un tout autre décor.
      </p>

      <div className="facts">
        <p>
          <strong>Distance depuis le logement</strong> : 350 m
          <br />
          <strong>Baignade surveillée</strong> : du 01/07 au 31/08, tous les jours de 12 h à
          18 h
          <br />
          <strong>Tour du lac</strong> : 30 min, peu de dénivelé
        </p>
      </div>

      <p>
        Les autres activités d'été — <Link href="/fr/guide/equitation-le-kavalkada">poneys</Link>,{" "}
        <Link href="/fr/guide/bmx-vtt-trottinette-albiez">BMX et VTT</Link> — sont à quelques
        centaines de mètres. Le programme complet est sur{" "}
        <Link href="/fr/ete">la page été du logement</Link>.
      </p>
    </>
  );
}
