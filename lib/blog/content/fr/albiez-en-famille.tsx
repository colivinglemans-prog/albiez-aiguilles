import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez est une station familiale, et ça ne se limite pas à un slogan : deux modes
        de garde, un jardin des neiges, une piste de luge à côté de la résidence, un plan
        d'eau surveillé l'été et des aires de jeux. Voici, concrètement, ce sur quoi on
        peut compter avec des enfants.
      </p>

      <h2>Faire garder les enfants</h2>

      <h3>La garderie de l'ESF</h3>
      <p>
        Elle s'ajoute aux cours du{" "}
        <Link href="/fr/guide/cours-de-ski-esf-albiez">club Piou-Piou</Link> (dès 3 ans et
        demi) et aux cours enfants 6-12 ans. C'est la solution la plus simple : un seul
        interlocuteur, un seul lieu, une plage de prise en charge plus longue que le seul
        cours.
      </p>

      <h3>Le centre de loisirs « Le Petit Montagnard »</h3>
      <p>
        Il accueille les enfants de <strong>4 à 12 ans</strong> pendant les vacances
        scolaires d'hiver et d'été. Au programme : activités artistiques, pratiques
        sportives encadrées, ateliers découvertes, mini-camps. C'est l'option pour une
        journée sans ski, ou pour un enfant qui n'en veut plus.
      </p>

      <h3>La halte-garderie « Le Chat Perché »</h3>
      <p>
        Accueil régulier ou occasionnel, hiver comme été, pour les enfants de{" "}
        <strong>3 mois à 6 ans</strong>. C'est ce qui rend un séjour possible avec un tout
        petit.
      </p>

      <h2>L'hiver : luge, jardin des neiges et flambeaux</h2>
      <p>
        La <strong>piste de luge du Mollard</strong> est juste à côté de la résidence du
        Hameau des Aiguilles, très bien exposée au soleil. L'enneigement n'y est pas
        garanti — c'est une piste naturelle — mais quand elle est prise, elle est à trente
        secondes de la porte.
      </p>
      <p>
        Le <strong>téléski Coucou</strong> est celui des débutants, et le{" "}
        <Link href="/fr/guide/domaine-skiable-albiez-secteur-mollard">
          téléski Polytre
        </Link>{" "}
        propose plusieurs endroits où lâcher la perche, avec des difficultés croissantes :
        de quoi progresser sans se faire peur.
      </p>
      <p>
        Enfin, l'<Link href="/fr/guide/albiez-c-show">Albiez C'Show</Link> du mardi soir
        permet aux enfants dès le niveau flocon de participer à une descente aux flambeaux,
        avec feu d'artifice à la clé. C'est souvent le souvenir qui reste.
      </p>
      <p>
        Les <Link href="/fr/guide/chiens-de-traineau-albiez">chiens de traîneau</Link>,
        eux, se réservent longtemps à l'avance.
      </p>

      <h2>L'été : baignade, poneys et vélo</h2>
      <p>
        Le <Link href="/fr/guide/lac-du-mollard-baignade">plan d'eau du Mollard</Link>, à
        350 m, est <strong>surveillé du 1<sup>er</sup> juillet au 31 août, de 12 h à 18 h</strong>.
        On y trouve une structure gonflable, un bassin « pataugeoire » pour les plus petits,
        des tables de pique-nique, un terrain de pétanque, un terrain de volley et des
        toilettes publiques.
      </p>
      <p>
        À 300 m du logement, le{" "}
        <Link href="/fr/guide/equitation-le-kavalkada">centre équestre Le Kavalkada</Link>{" "}
        propose des balades à poney d'une demi-heure ou d'une heure autour du Châtel, et
        des stages de poney à la semaine.
      </p>
      <p>
        Au Chef-lieu, la{" "}
        <Link href="/fr/guide/bmx-vtt-trottinette-albiez">piste de BMX race</Link> est en
        libre accès, entourée de terrains de foot, basket, tennis et pétanque, d'une aire
        de jeux et de tables de pique-nique.
      </p>

      <h2>Dans l'appartement</h2>
      <p>
        Un <strong>kit bébé</strong> (lit parapluie et chaise haute) est disponible sur
        demande. Le coin montagne, avec ses lits superposés, est en général le premier
        endroit que les enfants s'approprient. Le détail des couchages est sur{" "}
        <Link href="/fr#appartement">la page du logement</Link>.
      </p>
      <p>
        Un point d'honnêteté : l'accès demande <strong>une cinquantaine de marches</strong>{" "}
        depuis le parking. Avec une poussette, il faut le savoir avant de réserver.
      </p>
    </>
  );
}
