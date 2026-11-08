import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Article de préparation : il orchestre cours-de-ski-esf-albiez, louer-ses-skis-a-albiez
 * et forfait-saison-albiez sans les répéter. Dates du forfait relevées le 8 novembre 2026
 * (voir forfait-saison-albiez) : à retoucher après le 2 décembre 2026.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Une semaine de ski à Albiez se prépare en trois réservations : les cours, le
        matériel, le forfait. Elles ne partent pas au même rythme. Les prendre dans le bon
        ordre, c'est éviter le cours de fin d'après-midi, la file du premier matin et le
        plein tarif.
      </p>

      <h2>1. Les cours ESF, dès que les dates sont posées</h2>
      <p>
        C'est la réservation qui se remplit le plus vite. Pendant les vacances scolaires,
        ce ne sont pas tant les places qui manquent que les bons horaires :{" "}
        <strong>les créneaux du matin partent en premier</strong>, et ceux du club
        Piou-Piou (dès 3 ans et demi) aussi, plus vite encore au Mollard qu'au Chef-lieu.
        Les cours collectifs vont du samedi au samedi ; seuls les cours particuliers se
        réservent à la carte. Un cours du matin avec un enfant reposé ne
        vaut pas un cours en fin de journée.
      </p>
      <p>
        Le seul piège : choisir le <strong>rassemblement Mollard</strong>, celui du front
        de neige à 250 m de l'appartement. Le détail des formules par âge est dans notre
        article sur les{" "}
        <Link href="/fr/guide/cours-de-ski-esf-albiez">cours de l'ESF d'Albiez</Link>.
      </p>
      <p>
        Plus de place au Mollard ? Il reste le <strong>rassemblement du Chef-lieu</strong>.
        On peut s'y rendre en voiture, mais pour les enfants qui ne sont plus débutants, le
        plus agréable est d'y aller <strong>à ski</strong> : on monte par le télésiège des
        Échaux, au front de neige du Mollard, et on redescend jusqu'au rassemblement. Un
        échauffement avant le cours, et une descente à skier avec ses enfants. Il faut
        seulement partir un peu plus tôt de l'appartement.
      </p>
      <p>
        Même chose pour la <strong>garde des tout-petits</strong> : garderie de l'ESF,
        centre de loisirs « Le Petit Montagnard » (4-12 ans) pendant les vacances, halte-garderie
        « Le Chat Perché » (3 mois - 6 ans). Les places partent vite elles aussi : réservez-les
        en même temps que les cours. Le détail est dans{" "}
        <Link href="/fr/guide/albiez-en-famille">Albiez en famille</Link>.
      </p>
      <p>
        Même logique pour les activités à créneaux comme les{" "}
        <Link href="/fr/guide/chiens-de-traineau-albiez">chiens de traîneau</Link> : on les
        cale autour des cours, donc juste après.
      </p>

      <h2>2. Le matériel, en ligne, quelques semaines avant</h2>
      <p>
        Les quatre loueurs de la station — deux au front de neige du Mollard, à 250 m, et
        deux au Chef-lieu — appliquent une remise à qui réserve en ligne avant d'arriver.
        Le stock ne manque pas autant que les créneaux ESF, mais réserver tôt a deux
        avantages :
      </p>
      <ul>
        <li>
          <strong>le prix</strong> : le tarif en ligne est plus bas qu'au comptoir, et les
          loueurs lancent souvent des promotions en ligne à l'automne, réservées aux
          inscrits : créez votre compte sur leur site pour les recevoir ;
        </li>
        <li>
          <strong>le temps</strong> : sur place, il ne reste que l'essayage des chaussures
          et le réglage des fixations, une vingtaine de minutes.
        </li>
      </ul>
      <p>
        Pourquoi après les cours ? Parce que les horaires de l'ESF décident du moment où
        vous passerez au magasin, et qu'un enfant inscrit au Piou-Piou n'a pas besoin du
        même équipement qu'un ado en cours collectif. Qui loue quoi, et où : voir{" "}
        <Link href="/fr/guide/louer-ses-skis-a-albiez">louer ses skis à Albiez</Link>.
      </p>

      <h2>3. Le forfait, en dernier, mais pas trop tard</h2>
      <p>
        Le forfait n'est jamais complet. On peut donc le garder pour la fin, avec deux
        exceptions qui tiennent à des dates :
      </p>
      <ul>
        <li>
          <strong>Le forfait saison</strong> est à moitié prix en ligne jusqu'au{" "}
          <strong>2 décembre 2026 à 23h59</strong>. Il ne vaut le coup qu'à partir de deux
          semaines de ski dans l'hiver : si c'est votre cas, c'est lui qu'il faut acheter
          en premier, avant même les cours. Le calcul est dans notre article{" "}
          <Link href="/fr/guide/forfait-saison-albiez">
            quand le forfait saison est rentable
          </Link>
          .
        </li>
        <li>
          <strong>Le Pack Famille 6 jours</strong> (deux adultes et deux jeunes de 5 à 17
          ans) est moins cher en ligne s'il est acheté au plus tard trois jours avant le
          premier jour de ski.
        </li>
      </ul>
      <p>
        Pour le reste, le forfait peut se prendre en même temps que les cours ESF, ou en
        ligne sur le site de la station. Prévoyez une photo d'identité récente par skieur
        et un justificatif d'âge. Le retrait se fait à la caisse du Mollard, au front de
        neige, à 250 m de l'appartement.
      </p>

      <h2>Ce qu'on peut garder pour le dernier moment</h2>
      <p>
        Hors vacances scolaires, en janvier notamment, il y a moins de monde sur les pistes
        et la pression retombe. Les créneaux ESF du matin restent la chose à ne pas
        laisser traîner, mais le reste se décide plus librement :
      </p>
      <ul>
        <li>
          <strong>le forfait</strong> : à la journée, au jour le jour, selon la météo ;
        </li>
        <li>
          <strong>les cours d'adultes</strong>, qu'on peut ajouter après un ou deux jours
          sur les pistes, une fois son niveau jaugé ;
        </li>
        <li>
          <strong>les sorties ponctuelles</strong>, comme une journée aux Sybelles ou une
          activité hors ski.
        </li>
      </ul>
      <p>
        Le matériel aussi peut attendre, mais la remise en ligne, elle, suppose de
        réserver avant d'arriver : même en janvier, cela vaut la peine de le faire la
        semaine précédente. Si vous hésitez encore sur la date du séjour, voir{" "}
        <Link href="/fr/guide/quelle-semaine-skier-albiez">
          quelle semaine choisir pour skier à Albiez
        </Link>
        .
      </p>

      <div className="facts">
        <p>
          <strong>Dès la réservation de l'appartement</strong>
          <br />
          — Cours ESF, rassemblement Mollard, créneaux du matin :{" "}
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
          <br />
          — Chiens de traîneau ou autre activité à créneaux, si vous en voulez
          <br />
          — Forfait saison, seulement si vous skiez deux semaines ou plus dans l'hiver et
          avant le 2 décembre 2026
          <br />
          — Kit bébé à signaler à l'hôte, le cas échéant
        </p>
        <p>
          <strong>Un mois avant</strong>
          <br />
          — Matériel en ligne, pointures, tailles et poids de chacun sous la main :{" "}
          <a href={PROPERTY.links.skiRental} target="_blank" rel="noopener noreferrer">
            Sport 2000 Aux Deux Frères
          </a>{" "}
          ou un autre loueur de la station
          <br />
          — Forfaits de la semaine ou Pack Famille en ligne (au plus tard trois jours avant
          le premier jour de ski pour le pack) :{" "}
          <a href={PROPERTY.links.resort} target="_blank" rel="noopener noreferrer">
            station-albiez.com
          </a>
          <br />
          — Photos d'identité récentes et justificatifs d'âge pour les forfaits
          <br />
          — Pneus hiver ou chaînes : obligatoires en Savoie du 1er novembre au 31 mars (
          <Link href="/fr/guide/pneus-neige-chaines-albiez">notre article</Link>)
        </p>
        <p>
          <strong>La veille du départ</strong>
          <br />
          — Confirmations ESF, location et forfaits rassemblées sur un téléphone
          <br />
          — Niveau, poids et pointure de chacun notés pour le réglage des fixations
          <br />
          — Arrivée à l'appartement à partir de 16 h : le magasin et la caisse du Mollard
          sont à 250 m
        </p>
      </div>

      <p>
        Voir aussi :{" "}
        <Link href="/fr/guide/domaine-skiable-albiez-secteur-mollard">
          skier à Albiez depuis le secteur Mollard
        </Link>
        , <Link href="/fr/guide/albiez-en-famille">Albiez-Montrond en famille</Link> et{" "}
        <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
