import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Faits extérieurs relevés le 8 novembre 2026 : réouverture du Sherpa (sherpa.net),
 * magasins de la coopérative (beaufortdesarves.com), refuge (article refuge-chalet-la-croe).
 * À reprendre chaque automne : la date de réouverture du Sherpa change tous les ans.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Au printemps et à l'automne, Albiez-Montrond redevient un village de montagne. Les
        remontées sont à l'arrêt, une partie des commerces a baissé le rideau, et il n'y a
        presque personne sur les sentiers. Voici ce qui reste ouvert, ce qui ne l'est pas,
        et comment organiser un séjour au Mollard entre deux saisons.
      </p>

      <h2>Ce qui est fermé</h2>
      <ul>
        <li>
          <strong>Les remontées mécaniques</strong>. Le domaine skiable tourne du 19
          décembre 2026 au 21 mars 2027. Avant et après, le télésiège des Échaux, à 250 m
          de l'appartement, ne fonctionne pas.
        </li>
        <li>
          <strong>Le Sherpa du front de neige</strong>, le magasin le plus proche du
          logement. Sa fiche indique qu'il ouvre 7 jours sur 7 « en saison » ; cette année,
          il rouvre le <strong>12 décembre</strong>. Pour le printemps, sa date de
          fermeture n'est pas publiée : renseignez-vous avant de compter dessus.
        </li>
        <li>
          <strong>La boutique de la coopérative fromagère à Albiez</strong> : c'est un
          magasin saisonnier, ouvert l'été et l'hiver seulement.
        </li>
        <li>
          Une partie des <strong>restaurants</strong> (ceux qui restent ouverts sont
          plutôt du côté du Chef-lieu : renseignez-vous avant de monter), les loueurs de
          skis et l'ESF. Les
          activités d'été aussi : la baignade au{" "}
          <Link href="/fr/guide/lac-du-mollard-baignade">plan d'eau du Mollard</Link> est
          surveillée en juillet et août seulement, et le{" "}
          <Link href="/fr/guide/refuge-chalet-la-croe">refuge du Chalet d'la Croë</Link>{" "}
          n'ouvre que de mi-juin à mi-septembre.
        </li>
      </ul>

      <h2>Ce qui reste ouvert</h2>

      <h3>L'épicerie du Chef-lieu, tous les jours de l'année</h3>
      <p>
        L'épicerie Sambuis Dufreney, au Chef-lieu, à environ 2 km de l'appartement, est{" "}
        <strong>ouverte tous les jours de l'année</strong>. Alimentation générale, fromage
        et charcuterie à la coupe, gaz, quincaillerie, premiers soins. Le pain du Moulin
        Valentin y est livré chaque jour : c'est la solution pour avoir du pain frais hors
        saison.
      </p>
      <div className="facts">
        <p>
          <strong>Épicerie Sambuis Dufreney</strong>, Chef-lieu
          <br />
          <strong>Horaires</strong> (susceptibles d'évoluer) : tous les jours de 7 h 30 à
          12 h 30 et de 17 h à 19 h.
        </p>
      </div>

      <h3>La boulangerie, le week-end au printemps</h3>
      <p>
        Le{" "}
        <Link href="/fr/guide/boulangerie-moulin-valentin-albiez">Moulin Valentin</Link>,
        au Chef-lieu, ouvre tous les jours l'hiver et l'été. Au printemps, du 25 mars au
        25 juin, il n'ouvre que le <strong>samedi et le dimanche</strong>. Pour l'automne,
        appelez avant de descendre :{" "}
        <a href="tel:+33479593397">04 79 59 33 97</a>.
      </p>

      <h3>Saint-Jean-de-Maurienne, pour le gros des courses</h3>
      <p>
        Saint-Jean-de-Maurienne est sur la route, à <strong>18 km</strong> et 20 à 25
        minutes de l'appartement. Hors saison, c'est là qu'il faut remplir le coffre{" "}
        <strong>avant de monter</strong> : Carrefour Market (avec drive, station essence et
        laverie) et Lidl. Le détail est dans notre article{" "}
        <Link href="/fr/guide/faire-ses-courses-a-albiez">faire ses courses à Albiez</Link>.
      </p>
      <p>
        Pour le fromage, la coopérative de la vallée des Arves a un magasin{" "}
        <strong>ouvert toute l'année</strong> au centre de Saint-Jean, 52 rue de la
        République.
      </p>
      <div className="facts">
        <p>
          <strong>Fromagerie Aux Produits Savoyards</strong> (coopérative de la vallée des
          Arves)
          <br />
          52 rue de la République, 73300 Saint-Jean-de-Maurienne ·{" "}
          <a href="tel:+33479642245">04 79 64 22 45</a>
          <br />
          Du lundi au samedi de 8 h 30 à 12 h 30 et de 14 h 30 à 19 h, le dimanche de 9 h à
          12 h (horaires affichés par la{" "}
          <a href={PROPERTY.links.cheeseCoop} target="_blank" rel="noopener noreferrer">
            coopérative
          </a>
          , susceptibles d'évoluer).
        </p>
      </div>

      <h2>La météo : prévoir le froid, parfois la neige</h2>
      <p>
        À 1 600 m, les nuits sont froides dès l'automne, et encore fraîches au printemps.
        L'appartement est équipé d'un <strong>chauffage électrique à régler librement</strong> :
        allumez-le dès l'arrivée si besoin, sans demander.
      </p>
      <p>
        La première neige peut tomber <strong>dès la mi-octobre</strong>, bien avant
        l'ouverture du domaine. En Savoie, les pneus hiver ou les chaînes sont obligatoires
        du <strong>1er novembre au 31 mars</strong> (loi Montagne). Pour un séjour en
        octobre ou en avril, mieux vaut avoir des chaînes ou des chaussettes dans le coffre.
        Tout est expliqué dans notre article{" "}
        <Link href="/fr/guide/pneus-neige-chaines-albiez">
          pneus neige et chaînes pour monter à Albiez
        </Link>
        .
      </p>

      <h2>Que faire au printemps et à l'automne</h2>

      <h3>Marcher depuis le logement</h3>
      <p>
        Plusieurs des{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">randonnées balisées</Link> se
        font en toute saison tant qu'il n'y a pas de neige :
      </p>
      <ul>
        <li>
          <strong>La croix du Châtel</strong>, 30 minutes de montée depuis le chemin du
          Châtel, derrière la résidence.
        </li>
        <li>
          <strong>La boucle du plan d'eau du Mollard</strong>, 30 minutes, au départ du
          logement, face aux Aiguilles d'Arves.
        </li>
        <li>
          <strong>Le tour des Contamines</strong> (40 min) et{" "}
          <strong>le tour de la Cochette</strong> (3 h), au départ du Chef-lieu.
        </li>
      </ul>
      <p>
        Au printemps, la neige reste longtemps sur les hauteurs. Le sentier de la Plaigne
        traverse des combes avalancheuses : ne le prenez pas tant qu'il y a de la neige au
        sol.
      </p>

      <h3>La forêt du Rival</h3>
      <p>
        La{" "}
        <Link href="/fr/guide/foret-du-rival">forêt du Rival</Link>, qu'on traverse en
        montant à la station, est la sortie de l'entre-saison. Au printemps, les torrents
        sont pleins et les cascades au maximum. À l'automne, les couleurs, les
        champignons et le brame du cerf.
      </p>

      <h3>Partir avec un accompagnateur</h3>
      <p>
        Yves Vionnet, accompagnateur en montagne installé à Albiez, travaille{" "}
        <strong>toute l'année</strong>, hors saison comprise : randonnées à pied ou en
        raquettes, faune, flore et patrimoine. C'est la façon la plus sûre de sortir des
        sentiers du village quand les conditions changent d'un jour à l'autre.
      </p>
      <div className="facts">
        <p>
          <strong>Albiez Randonnée Patrimoine — Yves Vionnet</strong>
          <br />
          <a href={PROPERTY.links.mountainGuide} target="_blank" rel="noopener noreferrer">
            albiezrandopatrimoine.com
          </a>
        </p>
      </div>

      <h3>Regarder les Aiguilles d'Arves</h3>
      <p>
        Le balcon de l'appartement, orienté sud-ouest, donne sur les{" "}
        <Link href="/fr/guide/aiguilles-arves">Aiguilles d'Arves</Link>. Le col du Mollard
        et la boucle du plan d'eau offrent la même vue sans effort. La montée vers la Basse
        du Gerbier (2 578 m) est un itinéraire d'été : hors saison, la neige et le froid
        la rendent beaucoup plus engagée. Demandez conseil à l'accompagnateur avant de
        partir.
      </p>

      <h3>Le col du Mollard à vélo</h3>
      <p>
        Le{" "}
        <Link href="/fr/guide/col-du-mollard-velo">col du Mollard</Link> (1 638 m) est à la
        sortie du hameau : 17 km de montée depuis Saint-Jean-de-Maurienne, et l'arrivée est
        chez vous. Les grands cols plus hauts, comme la Croix de Fer et le Glandon, sont
        fermés par la neige une partie de l'année : vérifiez qu'ils sont ouverts avant de
        les prévoir. Le vélo s'attache sur le palier couvert ou se range sur le balcon (le
        casier à skis est trop petit).
      </p>

      <h3>Une journée à Turin</h3>
      <p>
        Hors saison, c'est une bonne idée de sortie :{" "}
        <Link href="/fr/guide/turin-depuis-albiez">Turin</Link> est à environ 2 h en
        voiture par le tunnel du Fréjus, ou à 1 h 56 en train direct depuis
        Saint-Jean-de-Maurienne.
      </p>

      <h2>Le calme, et des séjours plus courts</h2>
      <p>
        Hors saison, on vient à Albiez pour le calme : pas de file au parking, pas de
        bruit, les sentiers pour soi. Les prix sont aussi souvent les plus bas de l'année.
      </p>
      <p>
        Les séjours sont plus souples : <strong>2 nuits minimum en général</strong>, du 20
        mars à mi-décembre (sauf du 2 juillet au 20 août, où il faut 3 nuits). Un week-end
        prolongé suffit. L'arrivée se fait <strong>à partir de 16 h</strong>.
      </p>

      <div className="facts">
        <p>
          <strong>Réserver</strong> — disponibilités et prix en temps réel sur{" "}
          <Link href="/fr#reserver">la page du logement</Link>.
          <br />
          <strong>Avant de monter</strong> : courses à Saint-Jean-de-Maurienne, chaînes ou
          chaussettes dans le coffre à partir d'octobre.
          <br />
          <strong>Office de tourisme</strong> : <a href="tel:+33479593048">04 79 59 30 48</a>,
          joignable toute l'année.
        </p>
      </div>

      <p>
        Voir aussi :{" "}
        <Link href="/fr/guide/quelle-semaine-skier-albiez">
          quelle semaine choisir pour skier à Albiez
        </Link>
        , <Link href="/fr/ete">la page été</Link> et{" "}
        <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
