import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        À 300 mètres du logement, Le Kavalkada propose de découvrir la montagne à cheval ou
        à poney : forêts, alpages, prairies. Balades, cours en carrière, stages à la
        semaine — encadrés par des moniteurs diplômés d'État.
      </p>

      <h2>Les formules</h2>

      <h3>Pour les plus petits — 30 min ou 1 h</h3>
      <p>
        Des balades à poney d'une demi-heure ou d'une heure <strong>autour du Châtel</strong>,
        c'est-à-dire juste au-dessus du logement. Format idéal pour un premier contact : assez
        court pour tenir l'attention, assez long pour que ce soit une vraie sortie.
      </p>
      <p>
        La balade emprunte le <strong>tour du Châtel</strong>, et la résidence du Hameau des
        Aiguilles est bâtie à flanc sur le Châtel : concrètement,{" "}
        <strong>le circuit passe devant le chalet</strong>. On peut donc voir passer les
        enfants depuis le balcon, et les rejoindre à pied en quelques minutes.
      </p>
      <p>
        C'est d'ailleurs, à pied aussi, <strong>la balade la plus simple et la plus facile
        au départ du chalet</strong> — le point de départ de tout le reste, détaillé dans
        notre guide des{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">randonnées balisées d'Albiez</Link>.
      </p>

      <h3>Pour les plus confirmés — 1 h 30</h3>
      <p>
        Des promenades dans les alpages, <strong>aux pieds des{" "}
        <Link href="/fr/guide/aiguilles-arves">Aiguilles d'Arves</Link></strong>. C'est le
        décor qui fait la différence.
      </p>

      <h3>La demi-journée</h3>
      <p>
        Une promenade à travers les <strong>prairies de la Cochette</strong> et le village
        d'Albiez. Le même secteur que{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">le tour de la Cochette</Link>,
        vu d'une autre hauteur.
      </p>

      <h3>Les cours en carrière</h3>
      <p>
        Cours collectifs tous niveaux, initiation et perfectionnement. Également des cours
        particuliers, à l'unité ou en stage.
      </p>

      <h3>Les stages de poney à la semaine</h3>
      <p>
        Le centre accueille les enfants et les plus grands tout l'été pour des stages à la
        semaine. C'est la formule qui structure un séjour familial : les enfants ont leur
        activité, les adultes ont leurs matinées.
      </p>

      <div className="facts">
        <p>
          <strong>Le Kavalkada</strong> — centre équestre, à 300 m du logement
          <br />
          <strong>Horaires</strong> (du 08/07 au 31/08, susceptibles d'évoluer) : lundi,
          mardi, mercredi, jeudi, vendredi et dimanche, de 9 h à 12 h et de 14 h à 19 h.{" "}
          <strong>Fermé le samedi.</strong>
          <br />
          <strong>Encadrement</strong> : moniteurs diplômés d'État — tarifs spécifiques pour
          les groupes
        </p>
      </div>

      <h2>Un deuxième centre équestre au col</h2>
      <p>
        Le <Link href="/fr/guide/col-du-mollard-velo">col du Mollard</Link> abrite lui aussi
        un centre équestre avec manège, en fonctionnement l'été. Il est juste à côté de la
        zone de loisirs du col (plan d'eau, pataugeoire, pétanque, aire de jeux et de
        pique-nique) — de quoi organiser une demi-journée complète au même endroit.
      </p>

      <h2>Fermé le samedi : à anticiper</h2>
      <p>
        Le samedi est le jour d'arrivée et de départ dans la plupart des locations de la
        station, et c'est justement le jour de fermeture du Kavalkada. Sur une semaine du
        samedi au samedi, il reste six jours utiles : ça suffit, à condition de ne pas
        compter sur le premier.
      </p>

      <p>
        Les autres activités d'été à quelques centaines de mètres :{" "}
        <Link href="/fr/guide/lac-du-mollard-baignade">le plan d'eau du Mollard</Link> et{" "}
        <Link href="/fr/guide/bmx-vtt-trottinette-albiez">la piste de BMX</Link>. Le
        programme complet est sur <Link href="/fr/ete">la page été du logement</Link>.
      </p>
    </>
  );
}
