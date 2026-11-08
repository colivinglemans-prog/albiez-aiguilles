import Link from "next/link";

/*
 * Programme de l'hiver 2026-2027, relevé le 8 novembre 2026 sur les fiches agenda
 * d'explore-maurienne.com (office de tourisme). Les fiches portent la mention
 * « horaires non garantis » : à revérifier en décembre, puis chaque automne.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Pendant tout l'hiver, l'office de tourisme d'Albiez-Montrond fait tourner un
        programme d'animations qui revient chaque semaine. Presque tout est gratuit, mais
        une bonne partie se réserve, souvent avant midi le jour même. Voici la semaine
        type, jour par jour, avec la distance depuis le Mollard.
      </p>

      <h2>Avant de commencer</h2>
      <ul>
        <li>
          <strong>Période</strong> : la plupart des animations tournent du 21 décembre 2026
          au 21 mars 2027, à quelques exceptions près, précisées plus bas.
        </li>
        <li>
          <strong>Gratuit ne veut pas dire libre</strong> : la luge tubing, le Yooner, le
          FabriK'Igloo et le réveil musculaire demandent une réservation, au plus tard le
          jour même avant 12 h, en ligne ou à l'office de tourisme.
        </li>
        <li>
          <strong>Deux secteurs</strong> : Albiez, ce sont presque deux petits villages
          reliés par le domaine skiable. Le <strong>Mollard</strong>, le plus haut, est le
          secteur des vacanciers, et l'appartement y est. Le <strong>Chef-lieu</strong>{" "}
          est le village historique, où la vie continue hors saison : école, mairie, salle des
          fêtes, cinéma, épicerie ouverte à l'année. Le centre, place Opinel, est à 2 km de
          l'appartement. Une partie des animations a lieu au Mollard, le reste au Chef-lieu.
        </li>
        <li>
          <strong>Programme non garanti</strong> : l'office précise lui-même que les
          horaires peuvent changer. Vérifiez sur place ou au{" "}
          <a href="tel:+33479593048">04 79 59 30 48</a>.
        </li>
      </ul>

      <h2>Lundi : la journée la plus chargée</h2>

      <h3>11 h : réveil musculaire</h3>
      <p>
        Une heure de séance dynamique pour s'échauffer avant le ski, à la salle des fêtes,
        route du Mollard, au Chef-lieu. Gratuit, sur réservation, deux personnes minimum.
      </p>

      <h3>15 h, 16 h et 17 h : luge tubing</h3>
      <p>
        Une descente en bouée sur piste enneigée, avec des défis en route : cible,
        drapeau, anneau. Ça se passe sur la piste de luge des Contamines, au bout de la rue
        Froide, au Chef-lieu. Trois sessions de 45 minutes :
      </p>
      <ul>
        <li>
          <strong>15 h et 17 h : ados et adultes</strong>. Poids limité à 80 kg.
        </li>
        <li>
          <strong>16 h : enfants</strong>, avec un adulte présent obligatoirement.
        </li>
      </ul>
      <p>
        Gratuit, sur réservation, de 2 à 20 personnes par groupe. Tenue de ski et casque
        obligatoires.
      </p>

      <h3>18 h : pot de bienvenue</h3>
      <p>
        Place Opinel, au Chef-lieu. L'équipe d'animation présente les activités de la
        semaine, propose un quiz, puis offre vin chaud et jus de pomme. Gratuit, sans
        réservation indiquée. Prévoir 1 € de caution pour le verre, ou venir avec le sien.
        Il a lieu du 21 décembre au <strong>15 mars</strong>.
      </p>
      <p>
        Le premier lundi, l'enchaînement est simple : luge à 17 h, pot à 18 h, tous deux au
        Chef-lieu. Et le pot sert justement à présenter les activités de la semaine.
      </p>

      <h2>Mardi : du Mollard au Chef-lieu</h2>

      <h3>9 h - 12 h : découverte du Yooner</h3>
      <p>
        Le Yooner est un engin entre la luge et le ski, sur lequel on descend assis. Départ
        au <strong>col du Mollard</strong>, au départ du tour du Châtel, à la sortie du
        hameau. Arrivée au Chef-lieu, en bas du village, avec une navette possible pour
        remonter.
      </p>
      <p>
        Gratuit, sur réservation, dès 8 ans, de 2 à 15 personnes, cinq personnes par
        descente. Tenue de ski, casque obligatoire, sous réserve d'enneigement.
      </p>

      <h3>16 h - 17 h : FabriK'Igloo</h3>
      <p>
        Construire un igloo en famille en moins d'une heure, au plan d'eau du col du
        Mollard, à 350 m de l'appartement. Les pelles sont fournies ; prévoir gants et
        bonnet. Gratuit, sur réservation, de 2 à 30 personnes. Les enfants doivent être
        accompagnés d'un parent. Il faut assez de neige.
      </p>

      <h3>En fin d'après-midi : Albiez C'Show et descente aux flambeaux</h3>
      <p>
        Sur le front de neige du Mollard, à 250 m. Les enfants et ados dès le niveau flocon
        descendent avec l'ESF, flambeau à la main ; le flambeau s'achète sur place, 5 €, et
        l'achat vaut inscription. Ce n'est pas un rendez-vous de toute la saison : la fiche
        de l'office annonce la descente du 19 décembre au 3 janvier et du 2 au 23 février,
        à 17 h 45 ou 18 h selon les dates. Tout le reste de la soirée est dans notre
        article sur l'<Link href="/fr/guide/albiez-c-show">Albiez C'Show</Link>.
      </p>

      <h3>21 h : karaoké</h3>
      <p>
        À la salle des fêtes, au Chef-lieu. Gratuit, buvette sur place (consigne de 1 € sur
        le verre, carte bancaire acceptée). Seulement du 22 au 29 décembre, puis du 2
        février au 16 mars.
      </p>

      <h2>Mercredi</h2>
      <p>
        <strong>Yooner</strong> de nouveau, de 9 h à 12 h, dans les mêmes conditions que le
        mardi.
      </p>
      <p>
        Deux mercredis de fin de saison, le <strong>3 et le 10 mars</strong>, la fiche de
        l'office annonce aussi une descente aux flambeaux avec l'ESF à 18 h 15, sur le front
        de neige du Mollard.
      </p>

      <h2>Du mardi au vendredi : les escape games</h2>
      <p>
        Au cinéma d'Albiez-Montrond, au Chef-lieu, à 1,4 km de l'appartement, l'office
        propose des escape games sous
        forme de jeu de plateau : une heure pour résoudre les énigmes en équipe.
      </p>
      <ul>
        <li>
          <strong>Tarif</strong> : 6 € par groupe, pas par personne. Le seul rendez-vous
          payant de la semaine, avec le flambeau.
        </li>
        <li>
          <strong>Réservation</strong> : obligatoire avant 17 h 30 la veille, avec paiement
          à l'inscription. Sur place, carte bancaire uniquement.
        </li>
        <li>
          <strong>Neuf scénarios</strong>, selon l'âge du plus jeune joueur :
          <ul>
            <li>dès 6 ans : L'école ensorcelée, Quête du diamant magique ;</li>
            <li>dès 7 ans : Super héros contre docteur vilain, Enquête au musée ;</li>
            <li>dès 8 ans : Le trésor maudit ;</li>
            <li>dès 10 ans : Panique dans l'espace ;</li>
            <li>dès 14 ans : Arsène Lupin, Mission Z - Urgence Zombies ;</li>
            <li>dès 16 ans : Braquage du siècle.</li>
          </ul>
        </li>
      </ul>
      <p>
        C'est l'option d'une fin de journée de mauvais temps, ou d'un jour sans ski.
      </p>

      <h2>Le week-end</h2>
      <p>
        Aucune animation de cette liste n'est programmée le samedi ni le dimanche. En
        haute saison, l'appartement se loue du samedi au samedi : le programme démarre
        donc le lundi qui suit l'arrivée, avec le pot de bienvenue.
      </p>

      <h2>La semaine du 1er au 7 février 2027 : pause</h2>
      <p>
        Les fiches de l'office le montrent : la <strong>luge tubing</strong> s'arrête fin
        janvier et reprend le 8 février, et le <strong>Yooner</strong> aussi. Pas de luge le
        lundi 1er février, pas de Yooner les 2 et 3. C'est justement la semaine où reviennent
        la descente aux flambeaux et le karaoké, le mardi 2 février. Le FabriK'Igloo, le
        réveil musculaire et le pot de bienvenue n'annoncent pas d'interruption.
      </p>

      <div className="facts">
        <p>
          <strong>Office de tourisme</strong> : au Chef-lieu —{" "}
          <a href="tel:+33479593048">04 79 59 30 48</a>
          <br />
          <strong>Réserver</strong> : à l'office ou en ligne, depuis la fiche de chaque
          animation sur{" "}
          <a
            href="https://www.explore-maurienne.com/stations-villages/albiez-montrond/le-plein-danimations/"
            target="_blank"
            rel="noopener noreferrer"
          >
            explore-maurienne.com
          </a>
          <br />
          <strong>Délais</strong> : jour même avant 12 h pour la luge, le Yooner, l'igloo et
          le réveil musculaire ; veille avant 17 h 30 pour les escape games
          <br />
          <strong>Payant</strong> : escape game (6 € par groupe), flambeau (5 €). Tout le
          reste est gratuit.
          <br />
          Horaires non garantis par l'office : le programme peut changer en cours de
          saison.
        </p>
      </div>

      <h2>Tous les jours après le ski : les pistes de luge</h2>
      <p>
        Le vrai rendez-vous de fin d'après-midi n'est dans aucun programme : quand les
        pistes ferment, les familles se retrouvent sur les pistes de luge. Il y en a une de
        chaque côté : au <strong>Mollard</strong>, juste à côté de la résidence, et au{" "}
        <strong>Chef-lieu</strong>, près de l'église. Libres, gratuites, sans réservation —
        seule la neige décide (l'enneigement n'y est pas garanti).
      </p>

      <h2>Pour compléter la semaine</h2>
      <p>
        Avec des enfants, voir aussi notre guide{" "}
        <Link href="/fr/guide/albiez-en-famille">Albiez en famille</Link>. Pour les activités
        payantes, les{" "}
        <Link href="/fr/guide/chiens-de-traineau-albiez">chiens de traîneau</Link> et la{" "}
        <Link href="/fr/guide/motoneige-igloo-albiez">motoneige</Link> se réservent bien à
        l'avance. Et pour le ski lui-même, tout part de la{" "}
        <Link href="/fr/ski">page hiver du logement</Link>.
      </p>
    </>
  );
}
