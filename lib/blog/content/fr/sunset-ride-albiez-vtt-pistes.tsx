import Link from "next/link";

/*
 * Sources relevées le 8 novembre 2026 :
 * - fiche office : explore-maurienne.com/activites/sunset-ride-des-aiguilles-albiez-montrond-fr-6138446/
 * - réservation Mustang : mustangsport.lokki.rent (prix « dès 89 € », 2 h 30, 6 places)
 * - revendeur : adrenactive.com/vtt-electrique-albiez-montrond-9266.htm (13 ans, 1,30 m,
 *   dernier télésiège vers 17 h, rendez-vous 16 h 30, tenue de ski, caution 500 €)
 * Nom du télésiège et magasin de rendez-vous non publiés : à faire confirmer.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Le jeudi, en fin d'après-midi, un petit groupe prend le dernier télésiège de la
        journée avec des VTT électriques, puis redescend les pistes d'Albiez au coucher du
        soleil, face aux Aiguilles d'Arves. C'est le <strong>Sunset Ride des Aiguilles</strong>,
        une sortie encadrée par un moniteur de Mustang Sports, qui se termine par un apéritif
        savoyard. La station la présente comme une activité propre à Albiez.
      </p>

      <h2>Comment se passe la sortie</h2>
      <ul>
        <li>
          <strong>La mise en jambes</strong> : on récupère le VTT à assistance électrique et
          les protections, et le moniteur fait une première balade avec le groupe pour prendre
          le vélo en main.
        </li>
        <li>
          <strong>La montée</strong> : le groupe emprunte le dernier télésiège de la journée
          jusqu'en haut, vers 17 h.
        </li>
        <li>
          <strong>La descente</strong> : retour par les pistes à vélo, au moment où le soleil
          se couche derrière les sommets, toujours avec le moniteur.
        </li>
        <li>
          <strong>L'apéritif</strong> : la sortie se termine vers 18 h 30 par un apéritif
          savoyard.
        </li>
      </ul>
      <p>
        Comptez <strong>2 h 30</strong> en tout. Le groupe est petit : 3 personnes minimum
        pour que la sortie ait lieu, 6 au plus.
      </p>

      <h2>Pour qui</h2>
      <p>
        L'activité est ouverte <strong>dès 13 ans</strong>, avec une taille minimum de
        1,30 m. <strong>Aucun niveau de ski n'est demandé</strong> : c'est donc l'une des
        rares sorties de l'hiver où un skieur confirmé et un ami qui ne skie pas descendent
        les mêmes pistes ensemble.
      </p>
      <p>Elle convient bien :</p>
      <ul>
        <li>
          aux familles avec des <strong>ados</strong>, pour qui la semaine de ski commence à
          ressembler à la précédente ;
        </li>
        <li>
          aux groupes d'amis qui veulent une soirée différente au milieu de la semaine ;
        </li>
        <li>
          aux <strong>non-skieurs</strong> du séjour, qui voient enfin le domaine d'en haut ;
        </li>
        <li>aux habitués du VTT l'été, curieux de rouler sur la neige.</li>
      </ul>
      <p>
        Le revendeur qui la commercialise signale deux contre-indications : problèmes
        cardiaques et grossesse. Pour des enfants de moins de 13 ans, regardez plutôt du côté
        de la piste de luge du Mollard ou de l'
        <Link href="/fr/guide/albiez-c-show">Albiez C'Show</Link> du mardi soir pendant les
        vacances scolaires.
      </p>

      <div className="facts">
        <p>
          <strong>Quand</strong> : le jeudi, de 16 h à 18 h 30, du 19 décembre 2026 au
          21 mars 2027
          <br />
          <strong>Tarif</strong> : à partir de 89 € par personne
          <br />
          <strong>Âge</strong> : dès 13 ans, 1,30 m minimum
          <br />
          <strong>Groupe</strong> : 3 personnes minimum, 6 au plus
          <br />
          <strong>Inclus</strong> : moniteur, VTT électrique, casque et protections,
          apéritif savoyard
          <br />
          <strong>Non inclus</strong> : le forfait de remontées (un forfait piéton existe
          pour qui ne skie pas)
          <br />
          <strong>Réservation</strong> :{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          ou par téléphone au magasin du Mollard, à côté de l'appartement :{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a> (à défaut, celui du Chef-lieu :{" "}
          <a href="tel:+33788439696">07 88 43 96 96</a>)
        </p>
      </div>

      <h2>Le forfait, le point à ne pas oublier</h2>
      <p>
        La montée se fait par les remontées mécaniques, et le forfait n'est pas compris dans
        le prix. Si vous skiez ce jour-là, le vôtre suffit. Sinon, un{" "}
        <strong>forfait piéton</strong> existe : il s'achète aux caisses des remontées,
        au Mollard comme au Chef-lieu. Demandez à Mustang en réservant s'il le faut pour
        votre sortie.
      </p>

      <h2>Ce qu'il faut prévoir</h2>
      <ul>
        <li>
          <strong>Une tenue de ski</strong> : veste, pantalon, bonnet sous le casque. À 17 h
          en hiver, la température tombe vite une fois le soleil passé derrière les crêtes.
        </li>
        <li>
          Des <strong>chaussures chaudes</strong> et imperméables qui tiennent sur les
          pédales : renseignez-vous auprès de Mustang sur ce qui convient le mieux.
        </li>
        <li>
          Une <strong>caution</strong> pour le vélo est demandée sur place (500 € selon le
          revendeur) : prévoyez une carte bancaire.
        </li>
      </ul>
      <p>
        Le casque, les protections et le vélo sont fournis. Le revendeur cite aussi des gants
        et une chasuble ; si vous avez vos propres gants de ski, prenez-les quand même.
      </p>

      <h2>Où est le rendez-vous</h2>
      <p>
        Albiez a deux secteurs, presque deux petits villages reliés par le domaine : le{" "}
        <strong>Mollard</strong>, où se trouve l'appartement, et le{" "}
        <strong>Chef-lieu</strong>, à 2 km. Chacun a son télésiège — les Échaux au Mollard,
        le Loup au Chef-lieu — et Mustang a un magasin de chaque côté :{" "}
        <strong>Mustang 1650 (Skiset)</strong> au cœur du front de neige du Mollard,
        près de l'appartement, et <strong>Mustang 1550 (Skimium)</strong> au Chef-lieu,
        près de la place Opinel. Les deux magasins organisent les mêmes sorties.
      </p>
      <p>
        Le point de départ et le télésiège emprunté ne sont pas publiés, et ils peuvent
        changer d'une sortie à l'autre. Faites-les préciser en réservant, tout comme l'heure
        exacte : la fiche de l'office annonce 16 h, le revendeur un rendez-vous à 16 h 30.
        Si le départ est au Mollard, vous y allez à pied depuis l'appartement.
      </p>

      <h2>Réservez avant le jeudi</h2>
      <p>
        Six places par sortie, une seule sortie par semaine : sur une semaine de vacances
        scolaires, le jeudi se remplit vite. Le plus simple est de réserver en même temps que
        le <Link href="/fr/guide/louer-ses-skis-a-albiez">matériel de ski</Link>, avant de
        partir : Mustang loue aussi des skis, dans ses deux magasins.
      </p>
      <p>
        Comme toutes les activités en extérieur, la sortie dépend de la météo, et l'office
        précise que les horaires ne sont pas garantis. Le programme peut changer : en cas de
        doute, appelez Mustang ou l'office de tourisme au{" "}
        <a href="tel:+33479593048">04 79 59 30 48</a>.
      </p>

      <p>
        Voir aussi :{" "}
        <Link href="/fr/guide/bmx-vtt-trottinette-albiez">
          le VTT, le BMX et la trottinette à Albiez l'été
        </Link>
        , <Link href="/fr/guide/louer-ses-skis-a-albiez">louer ses skis à Albiez</Link>,{" "}
        <Link href="/fr/guide/motoneige-igloo-albiez">la motoneige et les soirées igloo</Link>{" "}
        et <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
