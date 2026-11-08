import Link from "next/link";
import ArticleImage from "@/lib/blog/ArticleImage";

/*
 * Sources relevées le 8 novembre 2026 :
 * - fiches office (explore-maurienne.com/activites/...) :
 *   experience-motoneige-albiez-montrond-fr-6138082,
 *   experience-soiree-inuit-en-igloo-motoneige-et-apero-albiez-montrond-fr-6138422,
 *   experience-soiree-eskimo-motoneige-et-resto-albiez-montrond-fr-6138572,
 *   sortie-fat-bike-accompagnee-albiez-montrond-fr-6138380
 * - réservation et conditions générales Mustang : mustangsport.lokki.rent (prix igloo,
 *   eskimo, trappeur ; tarifs motoneige 75 € / 35 € / 10 €, permis B, caution 1 000 €,
 *   aucune annulation, dans le « contrat motoneige » des conditions générales)
 * Prix du fat bike non publié. Groupe max. igloo et eskimo : chiffres différents entre
 * l'office et Mustang, non repris.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Une fois les pistes fermées, la soirée peut continuer dehors. À Albiez, quatre
        sorties encadrées se font à la nuit tombée : piloter une motoneige, rejoindre un
        igloo en traîneau, enchaîner motoneige et fondue au restaurant, ou rouler en fat
        bike électrique. Trois partent du Mollard, à quelques minutes à pied de
        l'appartement.
      </p>

      <h2>Qui organise quoi</h2>
      <ul>
        <li>
          <strong>Motoneige, soirée igloo, soirée motoneige et resto, soirée
          trappeur</strong> : Mustang, loueur de skis de la station, avec deux magasins
          ouverts toute l'année. <strong>Mustang 1650 (Skiset)</strong> est au cœur du front
          de neige du Mollard, près de l'appartement ; <strong>Mustang 1550
          (Skimium)</strong>, le plus grand magasin de sport de la station depuis 1980, est
          au Chef-lieu, près de la place Opinel.
        </li>
        <li>
          <strong>Fat bike</strong> : l'ESF d'Albiez, au départ du chalet ESF du Chef-lieu.
        </li>
      </ul>
      <p>
        Toutes ces sorties fonctionnent du <strong>19 décembre 2026 au 21 mars 2027</strong>,
        sur réservation. L'office de tourisme précise que les horaires ne sont pas garantis :
        le programme peut changer avec la météo ou l'enneigement.
      </p>

      <h2>Piloter une motoneige</h2>
      <p>
        Après un briefing, on prend soi-même le guidon et on suit le guide sur un parcours
        réservé de 4 hectares, face aux Aiguilles d'Arves. Les groupes sont de 5 personnes
        au plus. À deux sur la même machine, pilote et passager peuvent échanger leur place
        à mi-parcours.
      </p>
      <ul>
        <li>
          <strong>Déroulé</strong> : accueil et briefing 10 à 15 min, pilotage 30 à 35 min,
          retour et déséquipement 10 à 15 min.
        </li>
        <li>
          <strong>Départs</strong> : 18 h, 19 h, 20 h, 21 h et 22 h, tous les jours. Des
          baptêmes sont annoncés à partir de 17 h 30.
        </li>
        <li>
          <strong>Pour piloter</strong> : 18 ans révolus et le permis B, selon les conditions
          générales de Mustang. Le casque fourni est obligatoire.
        </li>
        <li>
          <strong>Passager</strong> : 1,30 m minimum, capable de poser les pieds sur les
          repose-pieds et de se tenir au pilote.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Départ</strong> : front de neige du Mollard, 125 rue du Ravarin, à environ
          250 m de l'appartement
          <br />
          <strong>Tarifs</strong> (conditions générales Mustang) : 75 € par motoneige, 35 €
          pour un passager derrière le guide, 10 € par enfant pour un baptême
          <br />
          <strong>Caution</strong> : 1 000 €, par empreinte de carte bancaire au magasin
          Mustang 1550 ou 1650 (ouverts de 9 h à 19 h)
          <br />
          <strong>Réservation</strong> : Mustang Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a>, Mustang Chef-lieu{" "}
          <a href="tel:+33788439696">07 88 43 96 96</a>
        </p>
      </div>
      <p>
        Lisez les conditions avant de réserver : d'après Mustang, une sortie motoneige ne
        peut être <strong>ni annulée ni reportée</strong> par le client, et l'inscription
        n'est effective qu'avec le paiement et la caution, 24 heures avant la sortie. Seul
        Mustang peut annuler ou décaler, en cas de mauvais temps notamment.
      </p>

      <h2>La soirée inuit en igloo</h2>
      <p>
        C'est la sortie qui convient à tout le monde, enfants compris, parce que personne
        ne conduit. On part du front de neige dans un <strong>traîneau tiré par une
        motoneige</strong>, sur un circuit réservé. Suit une courte balade facile dans les
        bois jusqu'à l'igloo, où chacun reçoit un apéritif dînatoire de produits locaux,
        avec vue sur les Aiguilles d'Arves et le mont Émy. Le guide raconte le village et
        son histoire, puis le traîneau ramène le groupe en station, à la nuit.
      </p>
      <ul>
        <li>
          L'office la décrit comme accessible à tous les âges. Les personnes âgées ou à
          mobilité réduite peuvent être déposées directement à l'igloo.
        </li>
        <li>
          Menus spécifiques et régimes alimentaires adaptés sur demande : signalez-le en
          réservant.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Départ</strong> : front de neige du Mollard, à environ 250 m de
          l'appartement
          <br />
          <strong>Horaires</strong> : deux séances par soir, 18 h 30 - 20 h ou 20 h 30 -
          22 h, tous les jours
          <br />
          <strong>Durée</strong> : 1 h 30
          <br />
          <strong>Tarifs</strong> : 59 € à partir de 11 ans, 49 € pour les moins de 11 ans
          <br />
          <strong>Réservation</strong> :{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          (« Soirée Inuit Igloo »), ou par téléphone, Mustang Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a>
        </p>
      </div>
      <p>
        Pour cette soirée, les conditions de Mustang prévoient que toute annulation à moins
        de 24 heures est facturée en entier. Les mineurs doivent être accompagnés d'un
        adulte responsable.
      </p>

      <h2>La soirée eskimo : motoneige et restaurant</h2>
      <p>
        La version longue, le <strong>mercredi seulement</strong>. Une initiation au
        pilotage sur le même parcours de 4 hectares, puis un dîner dans un restaurant
        savoyard au pied des pistes, choisi par Mustang. Le nom du restaurant n'est pas
        publié.
      </p>
      <ul>
        <li>
          <strong>Au menu</strong> : kir à l'apéritif, fondue ou raclette au choix avec
          charcuterie et salade, dessert au choix.
        </li>
        <li>
          <strong>En duo</strong>, conducteur et passager échangent à mi-parcours.
        </li>
        <li>
          <strong>Conducteur</strong> : 18 ans minimum ; <strong>passager</strong> : 1,30 m
          minimum.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Quand</strong> : le mercredi, de 19 h à 22 h
          <br />
          <strong>Rendez-vous</strong> : selon l'office, au magasin Mustang 1550, au
          Chef-lieu ; faites-le confirmer en réservant
          <br />
          <strong>Tarifs</strong> : 130 € en solo, 175 € en duo (une motoneige pour deux),
          sortie motoneige et repas compris
          <br />
          <strong>Réservation</strong> :{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          (« Soirée Eskimo »), ou Mustang 1650 au Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a> (à défaut, Mustang 1550 :{" "}
          <a href="tel:+33788439696">07 88 43 96 96</a>)
        </p>
      </div>

      <h2>Le fat bike électrique de nuit, avec l'ESF</h2>
      <p>
        Le fat bike est un VTT à pneus très larges ; celui-ci a une assistance électrique
        puissante et des éclairages. La sortie suit les sentiers d'Albiez à la tombée de la
        nuit, encadrée par Arnaud, moniteur diplômé, en groupe de 6 au plus.
      </p>
      <ul>
        <li>
          <strong>Taille minimum</strong> : 1,40 m. Aucun âge minimum n'est indiqué.
        </li>
        <li>
          <strong>Tenue</strong> : tenue de ski, chaussures d'après-ski ou de marche, gants
          (pour passer les vitesses et commander le moteur). Le casque de ski est conseillé.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Départ</strong> : chalet ESF du Chef-lieu, 97 chemin de la Rua, à environ
          2 km de l'appartement
          <br />
          <strong>Horaires</strong> : 17 h 30 - 19 h, tous les jours
          <br />
          <strong>Tarif</strong> : sur demande
          <br />
          <strong>Réservation</strong> : ESF, bureau du Chef-lieu{" "}
          <a href="tel:+33479593177">04 79 59 31 77</a>
        </p>
      </div>
      <p>
        Le fat bike roule sur les sentiers ; le{" "}
        <Link href="/fr/guide/sunset-ride-albiez-vtt-pistes">Sunset Ride des Aiguilles</Link>,
        lui, descend les pistes en VTT électrique après le dernier télésiège du jeudi. Ce
        sont deux sorties différentes, avec deux organisateurs différents.
      </p>

      <h2>Et la soirée trappeur</h2>
      <ArticleImage
        src="blog/soiree-trappeur-mustang.jpg"
        alt="Grillades sur une plancha au feu de bois, de nuit, pendant la soirée trappeur"
        caption="La soirée trappeur de Mustang. Photo : Mustang Albiez."
      />
      <p>
        Mustang propose aussi, les mercredis et jeudis soirs, une soirée en raquettes :
        navette depuis Albiez jusqu'à Montrond, montée d'environ 45 minutes avec un
        accompagnateur en montagne jusqu'au chalet d'alpage de la Broue (1 800 m), apéritif
        dînatoire autour des braseros, puis 3 km de descente en luge à la frontale. Départ
        à 18 h, retour vers 22 h 30. Dès 8 ans, de 4 à 7 personnes, 99 € par adulte et
        79 € pour les moins de 11 ans, sur{" "}
        <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
          mustangsport.lokki.rent
        </a>
        . Pas de motoneige dans celle-là.
      </p>

      <h2>Laquelle choisir</h2>
      <ul>
        <li>
          <strong>Avec de jeunes enfants</strong> : la soirée igloo, la seule ouverte à tous
          les âges, et au départ du Mollard.
        </li>
        <li>
          <strong>Entre adultes, pour les sensations</strong> : la motoneige seule, ou la
          soirée eskimo si vous voulez dîner dehors le mercredi.
        </li>
        <li>
          <strong>Avec des ados de plus de 1,40 m</strong> : le fat bike. Ils ne peuvent pas
          piloter de motoneige avant 18 ans, seulement monter derrière.
        </li>
        <li>
          <strong>Pour marcher un peu</strong> : la soirée trappeur.
        </li>
      </ul>
      <p>
        Les plus jeunes ont aussi les{" "}
        <Link href="/fr/guide/chiens-de-traineau-albiez">chiens de traîneau</Link> des
        Contamines, en journée, et l'<Link href="/fr/guide/albiez-c-show">Albiez C'Show</Link>{" "}
        du mardi soir pendant les vacances scolaires, gratuit. D'autres idées dans{" "}
        <Link href="/fr/guide/albiez-en-famille">Albiez en famille</Link>.
      </p>

      <h2>Réserver avant le séjour</h2>
      <p>
        Les groupes sont petits : 5 personnes par départ de motoneige, 6 pour le fat bike, une seule
        soirée eskimo par semaine. Sur une semaine de vacances scolaires, réservez en même
        temps que les{" "}
        <Link href="/fr/guide/louer-ses-skis-a-albiez">skis</Link> et les{" "}
        <Link href="/fr/guide/cours-de-ski-esf-albiez">cours</Link>. Habillez-vous comme
        pour skier : le soir, à 1 600 m, il fait vite très froid.
      </p>
      <p>
        Ces activités dépendent de la météo et de la neige, et leurs horaires peuvent
        changer. En cas de doute, appelez le prestataire ou l'office de tourisme au{" "}
        <a href="tel:+33479593048">04 79 59 30 48</a>.
      </p>

      <p>
        Voir aussi : <Link href="/fr/guide/chiens-de-traineau-albiez">les chiens de
        traîneau</Link>,{" "}
        <Link href="/fr/guide/sunset-ride-albiez-vtt-pistes">le Sunset Ride en VTT sur les
        pistes</Link>, <Link href="/fr/guide/albiez-en-famille">Albiez en famille</Link> et{" "}
        <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
