import Link from "next/link";

/*
 * Calendrier de la saison 2026-2027 :
 * - domaine ouvert du 19/12/2026 au 21/03/2027 (station-albiez.com / office de tourisme) ;
 * - vacances scolaires 2026-2027 relevées le 8 novembre 2026 dans le jeu de données officiel
 *   du ministère (data.education.gouv.fr, « fr-en-calendrier-scolaire », repris par
 *   education.gouv.fr) ;
 * - séjours minimums : public/llms.txt, à garder identiques si les règles changent ;
 * - animations : fiches de l'office relevées le 8 novembre 2026, « horaires non garantis ».
 * À reprendre chaque automne.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Le domaine d'Albiez ouvre du samedi 19 décembre 2026 au dimanche 21 mars 2027. Treize
        semaines, qui ne se ressemblent pas : deux semaines de Noël, un mois de janvier
        calme, quatre semaines de vacances d'hiver qui se chevauchent selon les zones, puis
        une fin de saison au soleil. Si vous pouvez partir hors vacances scolaires, notre
        conseil tient en un mot : <strong>janvier</strong>.
      </p>

      <h2>Le calendrier de la saison 2026-2027</h2>
      <ul>
        <li>
          <strong>Ouverture du domaine</strong> : samedi 19 décembre 2026.
        </li>
        <li>
          <strong>Vacances de Noël</strong> (les trois zones) : du samedi 19 décembre 2026
          au lundi 4 janvier 2027, jour de la reprise.
        </li>
        <li>
          <strong>Vacances d'hiver, zone C</strong> (Paris, Créteil, Versailles,
          Montpellier, Toulouse) : du samedi 6 février au lundi 22 février 2027.
        </li>
        <li>
          <strong>Vacances d'hiver, zone A</strong> (Lyon, Grenoble, Clermont-Ferrand,
          Dijon, Besançon, Bordeaux, Limoges, Poitiers) : du samedi 13 février au lundi
          1er mars 2027.
        </li>
        <li>
          <strong>Vacances d'hiver, zone B</strong> (Aix-Marseille, Nice, Lille, Amiens,
          Nancy-Metz, Strasbourg, Reims, Nantes, Rennes, Normandie, Orléans-Tours) : du
          samedi 20 février au lundi 8 mars 2027.
        </li>
        <li>
          <strong>Fermeture du domaine</strong> : dimanche 21 mars 2027.
        </li>
        <li>
          <strong>Pâques</strong> tombe le 28 mars 2027 et les vacances de printemps
          commencent le 3 avril (zone C) : les deux arrivent après la fermeture.
        </li>
      </ul>
      <p>
        Les dates de vacances sont celles du calendrier scolaire officiel du ministère de
        l'Éducation nationale (
        <a
          href="https://www.education.gouv.fr/calendrier-scolaire-100148"
          target="_blank"
          rel="noopener noreferrer"
        >
          education.gouv.fr
        </a>
        ) ; la date de reprise est le jour où les élèves retournent en classe.
      </p>

      <h2>Les règles de réservation, période par période</h2>
      <p>
        L'appartement ne se réserve pas de la même façon toute la saison :
      </p>
      <ul>
        <li>
          <strong>Du samedi 19 décembre au samedi 2 janvier</strong> : à la semaine,
          arrivée et départ le samedi.
        </li>
        <li>
          <strong>Du 2 au 15 janvier</strong> : 3 nuits minimum, arrivée n'importe quel
          jour. Une arrivée le 14 ou le 15 doit rester jusqu'au samedi 23, premier départ
          possible.
        </li>
        <li>
          <strong>Du samedi 16 janvier au samedi 13 mars</strong> : à la semaine, arrivée
          et départ le samedi.
        </li>
        <li>
          <strong>Du 13 au 20 mars</strong> (fin de saison) : 6 nuits minimum, arrivée
          n'importe quel jour.
        </li>
        <li>
          <strong>À partir du 20 mars</strong> : en général 2 nuits minimum. Le domaine
          ferme le dimanche 21 : un séjour qui commence ce jour-là n'est plus un séjour de
          ski.
        </li>
      </ul>
      <p>
        Arrivée à partir de 16 h, départ avant 10 h. Le calendrier de réservation du site
        applique ces règles date par date.
      </p>

      <h2>Janvier : la période que nous conseillons</h2>
      <p>
        Une fois les vacances de Noël terminées, le 4 janvier, et jusqu'au 6 février, aucune
        zone n'est en vacances. C'est le creux de la saison, et c'est là qu'Albiez est le
        plus agréable pour qui n'a pas d'enfant scolarisé : les couples, les amis, les
        familles avec un bébé ou de jeunes enfants qui ne vont pas encore à l'école.
      </p>
      <p>
        Un détail si quelqu'un prend des cours : les cours collectifs de l'ESF vont du
        samedi au samedi (seuls les cours particuliers se prennent à la carte). Pour une
        semaine de cours, mieux vaut donc arriver un samedi, même du 2 au 15 janvier, quand
        l'arrivée est libre.
      </p>

      <h3>Ce qu'on y gagne</h3>
      <ul>
        <li>
          <strong>Moins de monde partout</strong> : sur les pistes, au télésiège des
          Échaux, à l'École du Ski Français et chez les loueurs du front de neige.
        </li>
        <li>
          <strong>De la neige, en général</strong> : en janvier, la saison est installée et
          il fait froid, ce qui aide la neige à tenir. Ce n'est jamais une garantie : un
          hiver peut être sec, en janvier comme ailleurs. Le domaine compte 50 enneigeurs.
        </li>
        <li>
          <strong>Des prix plus bas</strong> : janvier se loue moins bien que le reste de
          la saison, et l'appartement y est moins cher qu'à Noël ou en février. Le prix
          exact s'affiche sur le calendrier de réservation.
        </li>
        <li>
          <strong>Plus de souplesse début janvier</strong> : du 2 au 15, 3 nuits suffisent
          et l'on arrive le jour qu'on veut. Un long week-end de ski devient possible.
        </li>
        <li>
          <strong>Les animations de la semaine continuent</strong> : le programme de
          l'office tourne à partir du 21 décembre, vacances ou non. Pot de bienvenue le
          lundi, FabriK'Igloo, luge tubing et Yooner (jusqu'à fin janvier pour ces deux
          derniers), escape games : tout le détail est dans{" "}
          <Link href="/fr/guide/animations-gratuites-albiez-semaine">
            les animations gratuites de la semaine
          </Link>
          .
        </li>
      </ul>

      <h3>Ce qu'on y perd</h3>
      <ul>
        <li>
          <strong>L'Albiez C'Show</strong> : la descente aux flambeaux du mardi soir n'a
          lieu que pendant les vacances (voir plus bas). Le karaoké du mardi non plus.
        </li>
        <li>
          <strong>Le froid et les jours courts</strong> : c'est le cœur de l'hiver. Prévoir
          des vêtements chauds, surtout pour un bébé en luge.
        </li>
        <li>
          <strong>Le centre de loisirs « Le Petit Montagnard »</strong> (4-12 ans) n'ouvre
          que pendant les vacances scolaires. La halte-garderie « Le Chat Perché » (3 mois -
          6 ans) fonctionne l'hiver : renseignez-vous auprès de l'office de tourisme (
          <a href="tel:+33479593048">04 79 59 30 48</a>) sur ses jours d'ouverture en
          janvier.
        </li>
      </ul>

      <h3>Avec un bébé</h3>
      <p>
        Le kit bébé (lit parapluie, petit matelas, chaise haute, luge bébé) est prêté sur
        demande, à signaler avant l'arrivée. Les luges sont rangées dans le casier à skis,
        sur le palier. Un point à savoir avant de réserver : le parking gratuit est à 50 m
        et il faut monter une cinquantaine de marches jusqu'à l'appartement, ce qui compte
        avec une poussette. Plus d'idées dans notre guide{" "}
        <Link href="/fr/guide/albiez-en-famille">Albiez en famille</Link>.
      </p>

      <h2>Les vacances de Noël</h2>
      <p>
        Deux semaines, du samedi 19 au samedi 26 décembre et du samedi 26 décembre au
        samedi 2 janvier, réservables à la semaine.
      </p>
      <ul>
        <li>
          <strong>Ce qu'on y gagne</strong> : l'ambiance des fêtes, et l'Albiez C'Show chaque
          mardi soir sur le front de neige du Mollard, à 250 m de l'appartement — l'office
          annonce la descente aux flambeaux du 19 décembre au 3 janvier. Le centre de
          loisirs est ouvert pour les enfants.
        </li>
        <li>
          <strong>Ce qu'on y perd</strong> : c'est une période très demandée, donc plus
          chère, avec du monde à l'ESF et chez les loueurs. Et c'est le tout début de la
          saison : l'enneigement de la première semaine dépend entièrement des chutes de
          novembre et de décembre.
        </li>
      </ul>

      <h2>Les vacances d'hiver (février - début mars)</h2>
      <p>
        Les trois zones se relaient sur quatre semaines, du 6 février au 8 mars. Semaine
        par semaine, du samedi au samedi :
      </p>
      <ul>
        <li>
          <strong>6 au 13 février</strong> : zone C seule.
        </li>
        <li>
          <strong>13 au 20 février</strong> : zones A et C ensemble.
        </li>
        <li>
          <strong>20 au 27 février</strong> : zones A et B ensemble.
        </li>
        <li>
          <strong>27 février au 6 mars</strong> : zone B seule.
        </li>
      </ul>
      <p>
        Les deux semaines du milieu, où deux zones se superposent, sont les plus chargées de
        l'hiver. Avec des enfants scolarisés, la première et la dernière semaine sont un
        peu plus calmes, si elles tombent dans vos vacances.
      </p>
      <ul>
        <li>
          <strong>Ce qu'on y gagne</strong> : la station est animée. L'Albiez C'Show revient
          chaque mardi (descente aux flambeaux du 2 au 23 février selon l'office), ainsi que
          le karaoké. Le centre de loisirs accueille les 4-12 ans. Et la neige est souvent
          là, sans que ce soit garanti.
        </li>
        <li>
          <strong>Ce qu'on y perd</strong> : la foule aux remontées, à l'ESF et chez les
          loueurs, et les prix les plus hauts de la saison. Les samedis, la route depuis la
          vallée est chargée : prévoir large. Pendant la semaine du 1er au 7 février, la
          luge tubing et le Yooner font une pause.
        </li>
      </ul>

      <h2>Mars : la fin de saison</h2>
      <p>
        Après le 8 mars, plus aucune zone n'est en vacances. Deux semaines restent : du 6 au
        13 mars, à la semaine, puis du 13 au 20 mars, 6 nuits minimum avec arrivée libre.
      </p>
      <ul>
        <li>
          <strong>Ce qu'on y gagne</strong> : le soleil avant tout. Le calme revient, et les
          jours sont nettement plus longs — le signe le plus simple : la descente aux flambeaux passe de 17 h 45
          ou 18 h en hiver à 18 h 15 en mars. L'office annonce encore deux descentes, les
          mercredis 3 et 10 mars. Ski au soleil, déjeuner sur le balcon orienté sud-ouest.
        </li>
        <li>
          <strong>Ce qu'on y perd</strong> : la neige dépend beaucoup de l'année. Elle peut
          être excellente comme fatiguée, plus lourde l'après-midi et plus mince en bas des
          pistes. Le domaine monte de 1 500 à 2 060 m : impossible de promettre quoi que ce
          soit à l'avance. Le karaoké s'arrête le 16 mars et le pot de bienvenue le 15.
        </li>
      </ul>

      <h2>Le bon plan : skier aux Sybelles avant et après la saison d'Albiez</h2>
      <p>
        Le domaine d'Albiez ouvre le 19 décembre et ferme le 21 mars. Celui des{" "}
        <strong>Sybelles</strong>, son grand voisin, ouvre plus tôt et ferme plus tard : du{" "}
        <strong>12 décembre 2026 au 9 avril 2027</strong>, sous réserve de l'enneigement.
        La porte d'entrée la plus proche est <strong>Saint-Sorlin-d'Arves, à 20 minutes en
        voiture</strong> de l'appartement.
      </p>
      <p>
        C'est le <strong>4e plus grand domaine relié de France</strong> : six stations
        reliées entre elles, environ 310 km de pistes et 68 remontées, de 1 100 à 2 620 m.
        Au point de rencontre, le sommet de l'Ouillon (2 431 m), la vue fait le tour des
        Aiguilles d'Arves.
      </p>
      <p>
        L'intérêt : pendant ces semaines-là, Albiez n'est pas en saison et l'appartement est
        à son <strong>prix le plus bas</strong>. On skie sur un grand domaine et on dort au
        calme, pour le prix de l'intersaison. Hors saison, le séjour minimum est en général
        de 2 nuits, avec arrivée libre. En pleine saison aussi, les Sybelles valent le
        détour : la station d'Albiez propose un forfait 5 jours Albiez + 1 jour Sybelles.
      </p>
      <ul>
        <li>
          <strong>Ouverture le 12 décembre</strong> : La Toussuire, Le Corbier,
          Saint-Jean-d'Arves et Saint-Sorlin-d'Arves.
        </li>
        <li>
          <strong>Le 19 décembre</strong> : Saint-Colomban-des-Villards.
        </li>
        <li>
          <strong>Le 26 décembre</strong> : Les Bottières.
        </li>
        <li>
          <strong>Après le 21 mars</strong> : Albiez a fermé, les Sybelles tournent encore
          jusqu'au 9 avril.
        </li>
      </ul>
      <p>
        Pour les plus pressés, <strong>Orelle</strong>, porte d'entrée des Trois Vallées par
        Val Thorens, ouvre dès le 21 novembre, à environ une heure de route. Les autres
        grandes stations sont trop loin pour un aller-retour à la journée.
      </p>

      <h2>En résumé</h2>
      <ul>
        <li>
          <strong>Sans enfant scolarisé</strong> : janvier, du 4 janvier au 6 février. Moins
          de monde, de la neige en général, des prix plus bas.
        </li>
        <li>
          <strong>Avec des enfants qui veulent la descente aux flambeaux</strong> : Noël ou
          février.
        </li>
        <li>
          <strong>Pour le soleil et le calme</strong> : mars, après les vacances scolaires
          (à partir du 8 mars), en acceptant l'incertitude sur la neige.
        </li>
        <li>
          <strong>Pour le meilleur prix</strong> : mi-décembre ou fin mars - début avril,
          en skiant aux Sybelles depuis Saint-Sorlin-d'Arves, à 20 minutes.
        </li>
      </ul>

      <h2>Trouver des dates libres</h2>
      <p>
        Le plus simple : ouvrir le{" "}
        <Link href="/fr#reserver">calendrier de réservation du site</Link>. Il affiche les
        nuits libres et le prix réel de chaque séjour, ménage et taxe de séjour compris, et
        refuse les dates qui ne respectent pas les règles ci-dessus.
      </p>
      <p>
        Si vous préparez votre séjour avec un assistant IA (Claude, ChatGPT, Le Chat…),
        demandez-lui simplement « une semaine libre en janvier à Albiez, au Hameau des
        Aiguilles, pour 4 personnes ». Le site met à sa disposition une recherche par dates
        floues : il vous proposera plusieurs séjours libres, déjà chiffrés, avec le lien
        pour réserver.
      </p>

      <div className="facts">
        <p>
          <strong>Réserver</strong> :{" "}
          <Link href="/fr#reserver">calendrier et prix en temps réel</Link>, réservation
          directe
          <br />
          <strong>Saison 2026-2027</strong> : domaine ouvert du 19 décembre 2026 au 21 mars
          2027
          <br />
          <strong>Janvier</strong> : 3 nuits minimum du 2 au 15, puis à la semaine du samedi
          au samedi à partir du 16
          <br />
          <strong>Arrivée</strong> : à partir de 16 h — <strong>départ</strong> : avant
          10 h
          <br />
          <strong>Annulation</strong> : remboursement intégral jusqu'à 14 jours avant
          l'arrivée, 50 % entre 14 et 7 jours, rien à moins de 7 jours
          <br />
          Programme d'animations non garanti par l'office :{" "}
          <a href="tel:+33479593048">04 79 59 30 48</a>
        </p>
      </div>

      <p>
        Une fois les dates prises, ne tardez pas pour le reste :{" "}
        <Link href="/fr/guide/reserver-ski-esf-en-avance">
          réserver l'ESF et le matériel en avance
        </Link>
        , <Link href="/fr/guide/louer-ses-skis-a-albiez">louer ses skis à Albiez</Link>,{" "}
        <Link href="/fr/guide/pneus-neige-chaines-albiez">pneus neige et chaînes</Link> et{" "}
        <Link href="/fr/guide/forfait-saison-albiez">le forfait saison</Link> si vous
        revenez plusieurs fois. Tout le reste est sur{" "}
        <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
