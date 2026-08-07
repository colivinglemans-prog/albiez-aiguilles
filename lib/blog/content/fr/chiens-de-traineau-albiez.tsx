import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        C'est l'activité qu'on réserve trop tard. Les balades en traîneau à chiens d'Albiez
        partent de la base de loisirs des Contamines, au Chef-lieu, et les créneaux se
        remplissent bien avant l'arrivée des vacanciers.
      </p>

      <h2>Ce que c'est</h2>
      <p>
        Installé dans un traîneau, on se laisse porter par un grand attelage. Le musher
        explique l'organisation du travail des chiens — qui tire, qui guide, comment
        l'équipe se répartit l'effort — et la complicité entre l'homme et les animaux est
        la vraie surprise de la sortie.
      </p>
      <p>Deux formats : <strong>une demi-heure</strong> ou <strong>une heure</strong>.</p>

      <div className="facts">
        <p>
          <strong>Départ</strong> : base de loisirs des Contamines, Chef-lieu
          d'Albiez-Montrond
          <br />
          <strong>Période</strong> : du 17/12 au 01/04, tous les jours, sous réserve des
          conditions d'enneigement
          <br />
          <strong>Tarifs</strong> : à partir de 45 € adulte, 40 € enfant
          <br />
          <strong>Réservation</strong> : indispensable —{" "}
          <a href="tel:+33682759926">06 82 75 99 26</a>
        </p>
      </div>

      <h2>Réservez dès que vos dates sont posées</h2>
      <p>
        C'est le point le plus important de cet article. La réservation est indispensable,
        et il est conseillé de la prendre <strong>dès que possible</strong>. Sur une
        semaine de vacances scolaires, les créneaux disponibles fondent en quelques jours.
      </p>
      <p>
        Le réflexe utile : réserver le traîneau en même temps que les{" "}
        <Link href="/fr/guide/cours-de-ski-esf-albiez">cours de ski</Link> et le{" "}
        <Link href="/fr/guide/louer-ses-skis-a-albiez">matériel</Link>, c'est-à-dire
        plusieurs semaines avant le départ.
      </p>

      <h2>Sous réserve d'enneigement</h2>
      <p>
        L'activité dépend de la neige au sol, et pas seulement de celle des pistes : le
        Chef-lieu est plus bas que le Mollard. En début ou en fin de saison, prévoyez un
        plan B — la{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">raquette</Link>, la piste de luge
        du Mollard ou l'
        <Link href="/fr/guide/albiez-c-show">Albiez C'Show</Link> du mardi soir.
      </p>

      <h2>Sur le même itinéraire</h2>
      <p>
        Le <strong>tour des Contamines</strong>, boucle de 2,2 km au départ de la rue Froide,
        est un itinéraire partagé : on y croise justement des attelages de chiens de
        traîneaux, ainsi que des vélos. Restez attentif et laissez-leur la trace.
      </p>

      <h2>Les autres activités hors ski</h2>
      <p>
        Albiez propose aussi la motoneige et les soirées igloo (Skimium / Mustang Sports),
        les raquettes et le ski nordique. Le détail des loueurs est dans notre article{" "}
        <Link href="/fr/guide/louer-ses-skis-a-albiez">
          louer ses skis à Albiez-Montrond
        </Link>
        .
      </p>
    </>
  );
}
