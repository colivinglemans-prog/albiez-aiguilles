import Link from "next/link";

/*
 * Réglementation relevée le 8 novembre 2026 sur savoie.gouv.fr (page « Équipements
 * obligatoires en période hivernale : soyez prêts », mise à jour le 20/10/2026) et sur
 * service-public.gouv.fr (actualité A14389 du 20/10/2026). À revérifier chaque automne.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond est à 1 600 m, et en Savoie l'équipement d'hiver est obligatoire
        sur toutes les routes du <strong>1er novembre au 31 mars</strong>. Pneus hiver,
        chaînes ou chaussettes : voici ce que dit la règle, ce qu'il faut avoir dans le
        coffre et comment se passe la montée depuis Saint-Jean-de-Maurienne.
      </p>

      <h2>Ce que dit la loi Montagne en Savoie</h2>
      <p>
        Du 1er novembre au 31 mars, chaque voiture qui circule en Savoie doit avoir, au
        choix :
      </p>
      <ul>
        <li>
          <strong>quatre pneus hiver marqués 3PMSF</strong> (le symbole de la montagne à
          trois pics avec un flocon) ;
        </li>
        <li>
          ou, dans le coffre, des <strong>chaînes métalliques ou des chaussettes à
          neige</strong> pour au moins deux roues motrices.
        </li>
      </ul>
      <p>
        L'obligation couvre tout le département, pas seulement les stations. Depuis le 1er
        novembre 2024, seuls les pneus 3PMSF dispensent des chaînes : des pneus marqués
        seulement M+S, ou des pneus « 4 saisons » sans le symbole, ne suffisent plus. Avec
        eux, il faut des chaînes ou des chaussettes à bord. Les véhicules en pneus à clous
        sont exemptés.
      </p>
      <p>
        Avant d'acheter, vérifiez que les chaînes ou les chaussettes correspondent à la
        taille de vos pneus et qu'il reste assez d'espace entre la roue et la carrosserie.
      </p>

      <h3>Les panneaux à connaître</h3>
      <ul>
        <li>
          <strong>Le panneau d'entrée de zone (B58)</strong> : il marque le début d'une zone
          où l'équipement d'hiver est obligatoire, avec un panonceau qui rappelle la période
          (1er novembre - 31 mars). Le panneau B59 en marque la fin. C'est l'équipement
          qu'il faut <em>avoir</em> : pneus 3PMSF montés, ou chaînes dans le coffre.
        </li>
        <li>
          <strong>Le panneau B26</strong> (rond, bleu, avec une roue chaînée) : il impose de
          rouler <em>avec</em> les chaînes sur une route enneigée, y compris en dehors de la
          période hivernale. Une voiture en pneus 3PMSF est considérée comme en règle, sauf
          si un panonceau indique « chaînes à neige obligatoires » : là, il faut chaîner
          quels que soient les pneus.
        </li>
      </ul>

      <h2>La neige n'attend pas le 1er novembre</h2>
      <p>
        La date légale ne dit rien de la météo. À Albiez, il est déjà arrivé que la
        première neige tombe <strong>mi-octobre</strong>, sur des voitures encore en pneus
        été. Si vous venez en automne, regardez la météo de la station quelques jours avant
        et gardez une paire de chaussettes dans le coffre : c'est peu encombrant et cela
        évite de rester bloqué en bas.
      </p>

      <h2>Chaînes ou chaussettes ?</h2>
      <h3>Les chaussettes à neige</h3>
      <ul>
        <li>Faciles et rapides à enfiler, même pour une première fois.</li>
        <li>Légères, elles tiennent dans un coin du coffre.</li>
        <li>
          Pensées pour un usage <strong>occasionnel</strong> : elles s'usent vite sur une
          route dégagée ou sur de longues distances. On les enlève dès que le bitume
          réapparaît.
        </li>
      </ul>
      <h3>Les chaînes métalliques</h3>
      <ul>
        <li>Plus d'adhérence dans la neige épaisse et sur la glace.</li>
        <li>Plus résistantes : c'est le choix conseillé pour un usage fréquent.</li>
        <li>
          Plus longues à poser, surtout les premières fois, et vitesse limitée une fois
          montées (la limite figure sur la notice).
        </li>
      </ul>
      <p>
        Pour une semaine au ski avec de bons pneus hiver, des chaussettes suffisent
        souvent comme solution de secours. Si vous montez en pneus été ou si vous revenez
        souvent en montagne, les pneus 3PMSF restent la solution la plus simple.
      </p>

      <h3>S'entraîner avant de partir</h3>
      <p>
        Posez vos chaînes ou vos chaussettes <strong>une fois chez vous</strong>, au sec,
        avant le départ. Au bord d'une route enneigée, de nuit, avec des enfants dans la
        voiture, ce n'est pas le moment de découvrir la notice. Gardez dans le coffre des
        gants, une lampe frontale et un gilet jaune, posés au-dessus des bagages.
      </p>

      <h3>Où en acheter</h3>
      <p>
        Le plus sûr est de les acheter avant de partir, en centre auto ou en ligne, avec la
        dimension exacte de vos pneus (elle est inscrite sur le flanc). En dernier recours,
        les centres auto et les grandes surfaces de Saint-Jean-de-Maurienne, à 18 km de
        l'appartement, sont le dernier arrêt avant la montée : appelez avant pour vérifier
        qu'ils ont votre taille en stock, surtout un samedi de vacances.
      </p>

      <h2>La route jusqu'à l'appartement</h2>
      <ul>
        <li>
          <strong>Autoroute A43</strong>, sortie <strong>Saint-Jean-de-Maurienne</strong>.
        </li>
        <li>
          Puis la <strong>route d'Albiez</strong> : 18 km, environ 20 à 25 minutes hors
          bouchons. Elle est déneigée tout l'hiver.
        </li>
        <li>
          Si la route est blanche, chaînez <strong>avant la montée</strong>, et non au
          milieu des lacets : sur une aire de chaînage signalée ou sur un endroit plat,
          dégagé et hors de la chaussée. Une voiture qui patine en pleine côte bloque tout
          le monde derrière elle.
        </li>
      </ul>

      <h3>Le parking et les derniers mètres</h3>
      <p>
        L'appartement est au Mollard, chemin du Châtel. On se gare sur le{" "}
        <strong>parking extérieur gratuit</strong>, à 50 m, puis il reste une{" "}
        <strong>cinquantaine de marches</strong> jusqu'à la résidence. Avec des bagages
        lourds ou une poussette, prévoyez deux allers-retours. Le chemin du Châtel et les
        marches sont <strong>déneigés</strong> ; par forte chute de neige, il peut quand
        même en rester le temps que le déneigement passe : des chaussures qui accrochent
        ne sont pas de trop.
      </p>

      <h2>Partir tôt le samedi</h2>
      <p>
        En saison, la plupart des séjours commencent et finissent le samedi : c'est le jour
        des rotations en station, et les samedis d'hiver allongent nettement les temps de
        route. L'arrivée à l'appartement se fait à partir de 16 h : partez
        tôt, faites une pause dans la vallée si vous êtes en avance, et vous éviterez le
        plus gros de la circulation.
      </p>
      <p>
        Le jour du départ, consultez l'état des routes sur{" "}
        <a href="https://www.savoie-route.fr" target="_blank" rel="noopener noreferrer">
          savoie-route.fr
        </a>{" "}
        ; sur l'autoroute, Autoroute Info diffuse l'info trafic sur 107.7.
      </p>

      <div className="facts">
        <p>
          <strong>Obligation</strong> : du 1er novembre au 31 mars, sur toute la Savoie
          <br />
          <strong>Équipement</strong> : 4 pneus hiver 3PMSF, ou chaînes / chaussettes dans
          le coffre
          <br />
          <strong>Itinéraire</strong> : A43, sortie Saint-Jean-de-Maurienne, puis 18 km
          de route d'Albiez, déneigée tout l'hiver
          <br />
          <strong>Sur place</strong> : parking gratuit à 50 m, puis une cinquantaine de
          marches
          <br />
          <strong>La règle officielle</strong> :{" "}
          <a
            href="https://www.savoie.gouv.fr/Actions-de-l-Etat/Transports-deplacements-et-securite-routiere/Securite-routiere/Equipements-obligatoires-en-periode-hivernale-soyez-prets"
            target="_blank"
            rel="noopener noreferrer"
          >
            préfecture de la Savoie
          </a>
        </p>
      </div>

      <p>
        Voir aussi :{" "}
        <Link href="/fr/guide/faire-ses-courses-a-albiez">faire ses courses à Albiez</Link>{" "}
        (le dernier plein de provisions se fait souvent à Saint-Jean-de-Maurienne),{" "}
        <Link href="/fr/guide/quelle-semaine-skier-albiez">quelle semaine choisir pour skier</Link>,{" "}
        <Link href="/fr/guide/albiez-hors-saison">Albiez hors saison</Link> et{" "}
        <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
