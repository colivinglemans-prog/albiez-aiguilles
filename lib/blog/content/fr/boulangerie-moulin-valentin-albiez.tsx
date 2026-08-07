import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Au Chef-lieu d'Albiez-Montrond, le Moulin Valentin prépare tout sur place : pains,
        viennoiseries, tartes, quiches, sandwichs. Et derrière la vitrine, une histoire qui
        commence en 1694 — peut-être avant.
      </p>

      <h2>Une histoire qui commence en 1694</h2>
      <p>
        Le Moulin Valentin ne date pas d'hier. L'histoire du lieu remonte à{" "}
        <strong>1694</strong> à Albiez-Montrond, et sans doute plus loin encore. La suite se
        raconte en poussant la porte : c'est le genre de commerce où l'on repart avec plus
        d'informations que de pain.
      </p>

      <h2>Ce qu'on y trouve</h2>
      <p>Toutes les recettes sont artisanales et préparées sur place :</p>
      <ul>
        <li>
          <strong>Pains</strong> artisanaux et pains spéciaux
        </li>
        <li>
          <strong>Viennoiseries</strong> et gâteaux
        </li>
        <li>
          <strong>Tartes sucrées</strong> et desserts
        </li>
        <li>
          <strong>Tartines, quiches et sandwichs</strong>
        </li>
        <li>
          <strong>Boissons chaudes et fraîches</strong> (sans alcool)
        </li>
      </ul>

      <h2>Les spécialités pour le pique-nique et l'apéro</h2>
      <p>
        C'est là que la boulangerie devient utile au-delà du petit-déjeuner. Trois choses à
        connaître :
      </p>
      <ul>
        <li>
          <strong>Le pâté croûte</strong> — la solution d'un déjeuner de{" "}
          <Link href="/fr/guide/randonnees-balisees-albiez">randonnée</Link> réglée en un
          seul achat.
        </li>
        <li>
          <strong>Le pain yéti</strong> : une baguette lardons-fromage. Ça se passe de
          commentaire.
        </li>
        <li>
          <strong>Les tartelettes amandine et aux pommes</strong>, pour le retour.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Boulangerie Moulin Valentin</strong>
          <br />
          50 route du Mollard, Chef-lieu, 73300 Albiez-Montrond
          <br />
          <a href="tel:+33479593397">04 79 59 33 97</a>
        </p>
        <p>
          <strong>Horaires</strong> (susceptibles d'évoluer) : du 17/12 au 19/03 et du
          01/07 au 21/08, tous les jours de 7 h à 19 h. Du 25/03 au 25/06, samedi et
          dimanche.
        </p>
      </div>

      <h2>Pas envie de descendre au village ?</h2>
      <p>
        Le pain frais du Moulin Valentin est livré tous les jours à l'
        <Link href="/fr/guide/faire-ses-courses-a-albiez">
          épicerie Sambuis Dufreney
        </Link>
        , et le Sherpa du front de neige — à 250 m du logement — fait dépôt de pain. On
        peut donc parfaitement passer une semaine sans prendre la voiture.
      </p>
    </>
  );
}
