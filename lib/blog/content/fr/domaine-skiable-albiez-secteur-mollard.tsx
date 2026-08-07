import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez est une station familiale de la vallée de la Maurienne : 40 km de pistes,
        13 remontées mécaniques, 22 pistes entre 1 500 et 2 060 mètres. Elle se divise en
        trois secteurs — Montrond, Chef-lieu et Mollard — auxquels s'ajoute le village
        voisin d'Albiez-le-Jeune. Notre appartement est au Mollard, le plus haut des trois.
      </p>

      <h2>Le domaine en chiffres</h2>
      <ul>
        <li>
          <strong>40 km de pistes</strong> réparties sur <strong>22 pistes</strong>
        </li>
        <li>
          <strong>13 remontées mécaniques</strong>
        </li>
        <li>
          Altitude : de <strong>1 500 m</strong> à <strong>2 060 m</strong>
        </li>
        <li>
          <strong>50 enneigeurs</strong> en complément de l'enneigement naturel
        </li>
      </ul>
      <p>
        Le plateau de Montrond bénéficie d'une faible pluviométrie et d'une luminosité
        remarquable, avec un enneigement continu près de six mois par an. Les pistes sont
        ensoleillées et larges — c'est un domaine où l'on apprend à skier confortablement,
        pas un domaine où l'on vient chercher des murs.
      </p>

      <h2>Partir du Mollard : les trois remontées à connaître</h2>

      <h3>Le télésiège des Échaux — la porte d'entrée</h3>
      <p>
        À <strong>250 à 300 m du logement</strong>, il monte de 1 600 m à 1 800 m. C'est la
        remontée qui permet de rejoindre le plus rapidement l'ensemble du domaine : on
        l'emprunte le matin, et tout s'ouvre derrière.
      </p>

      <h3>Le téléski des Aplanes — le point haut</h3>
      <p>
        Depuis le sommet des Échaux, on récupère le téléski Les Aplanes, qui culmine à{" "}
        <strong>2 100 m</strong>. C'est le point le plus haut accessible depuis le secteur.
      </p>

      <h3>Coucou et Polytre — pour débuter</h3>
      <p>
        Le <strong>téléski Coucou</strong> est celui des débutants. Le{" "}
        <strong>téléski Polytre</strong>, lui, est notamment utilisé par l'
        <Link href="/fr/guide/cours-de-ski-esf-albiez">école de ski</Link> : il offre
        plusieurs endroits où lâcher la perche, avec des niveaux de difficulté croissants.
        C'est exactement ce qu'il faut pour faire progresser un enfant sans le mettre en
        difficulté d'un coup.
      </p>

      <h2>Quel ordre pour une première journée ?</h2>
      <ol>
        <li>
          <strong>Débutant complet</strong> : Coucou le matin, puis Polytre l'après-midi
          pour enchaîner de vraies descentes.
        </li>
        <li>
          <strong>Skieur moyen</strong> : Échaux dès l'ouverture pour prendre la mesure du
          secteur, puis bascule vers le Chef-lieu et Montrond dans la journée.
        </li>
        <li>
          <strong>Bon skieur</strong> : Échaux puis Aplanes, et le domaine se déroule
          depuis 2 100 m.
        </li>
      </ol>

      <h2>L'avantage d'être logé au Mollard</h2>
      <p>
        Le front de neige du Mollard réunit à 250 m le départ des pistes, les{" "}
        <Link href="/fr/guide/louer-ses-skis-a-albiez">loueurs de matériel</Link>, le
        supermarché et le point de rassemblement de l'ESF. Concrètement : pas de navette,
        pas de portage de skis sur des centaines de mètres, et la possibilité de rentrer
        déjeuner. Avec des enfants, c'est la différence entre une semaine agréable et une
        semaine de logistique.
      </p>
      <p>
        C'est aussi là que se tient l'
        <Link href="/fr/guide/albiez-c-show">Albiez C'Show</Link>, la soirée du mardi
        pendant les vacances scolaires.
      </p>

      <h2>Hors des pistes</h2>
      <p>
        La <Link href="/fr/guide/albiez-en-famille">piste de luge du Mollard</Link> est
        juste à côté de la résidence, très bien exposée au soleil (l'enneigement n'y est
        pas garanti). Pour le reste, la station propose raquettes, ski de fond,{" "}
        <Link href="/fr/guide/chiens-de-traineau-albiez">chiens de traîneau</Link>,
        motoneige et soirées igloo.
      </p>

      <p>
        Le détail des distances, du casier à skis et de l'accès au front de neige est sur{" "}
        <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
