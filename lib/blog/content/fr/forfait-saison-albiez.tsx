import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Tarifs de la saison 2026-2027, relevés le 8 novembre 2026 sur station-albiez.com
 * (accueil et page /fr/tarifs2). À reprendre chaque automne, et à retoucher après le
 * 2 décembre 2026 : la promotion terminée, c'est le plein tarif qui devient le cas courant.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Jusqu'au <strong>2 décembre 2026 à 23h59</strong>, la station d'Albiez vend son
        forfait saison à moitié prix : 249 € pour un adulte au lieu de 497 €. Le domaine
        ouvre du samedi 19 décembre 2026 au dimanche 21 mars 2027. Reste à savoir à partir
        de combien de jours il est rentable — les tarifs à la journée et à la semaine
        répondent à la question.
      </p>

      <h2>Les prix du forfait saison 2026-2027</h2>
      <ul>
        <li>
          <strong>Adulte</strong> (12 à 64 ans) : <strong>249 €</strong> au lieu de 497 €
        </li>
        <li>
          <strong>Enfant</strong> (5 à 11 ans) : <strong>178 €</strong> au lieu de 355 €
        </li>
        <li>
          <strong>Senior</strong> (65 à 74 ans) : <strong>228 €</strong> au lieu de 457 €
        </li>
        <li>
          <strong>Moins de 5 ans et 75 ans et plus</strong> : forfait gratuit, à retirer en
          caisse avec un justificatif d'âge
        </li>
      </ul>
      <p>
        À noter : un adolescent de 12 ans paie déjà le tarif adulte. La remise s'applique
        automatiquement au panier, en ligne, jusqu'à la date limite.
      </p>

      <h2>Ce qu'il faut comparer</h2>
      <p>
        Les forfaits qui servent de point de comparaison, au tarif adulte / enfant / senior :
      </p>
      <ul>
        <li>
          <strong>Journée</strong> : 32,50 € / 27,50 € / 30 €
        </li>
        <li>
          <strong>6 jours</strong> : 177 € / 140 € / 158 €
        </li>
        <li>
          <strong>8 jours</strong> : 215 € / 168 € / 192 €
        </li>
        <li>
          <strong>Week-end</strong> (samedi et dimanche) : 40,50 € / 36,50 € / 38,50 €
        </li>
        <li>
          <strong>Samedi</strong> : 14 € pour tous en l'achetant en ligne avant le mercredi
          0 h (donc au plus tard le mardi soir), 16 € sinon
        </li>
      </ul>

      <h2>À partir de quand il est rentable</h2>

      <h3>Au prix promo : deux semaines suffisent</h3>
      <p>
        À 249 €, le forfait adulte vaut un peu moins de <strong>huit journées</strong> au
        tarif plein. En pratique :
      </p>
      <ul>
        <li>
          <strong>Une semaine</strong> (6 jours, 177 €) : le forfait saison ne se justifie
          pas.
        </li>
        <li>
          <strong>Une semaine et un week-end</strong> (177 + 40,50 = 217,50 €) : toujours
          pas.
        </li>
        <li>
          <strong>Deux semaines</strong> (2 × 177 = 354 €) : le forfait saison fait gagner
          105 € par adulte.
        </li>
        <li>
          <strong>Sept week-ends</strong> (7 × 40,50 = 283,50 €) : il devient rentable au
          septième — six week-ends coûtent 243 €.
        </li>
      </ul>
      <p>
        Même logique pour un enfant : 178 € contre 140 € la semaine, donc rentable dès la
        deuxième semaine (280 €). Pour un senior, 228 € contre 158 €, même conclusion.
      </p>

      <h3>Au plein tarif : il faut trois semaines</h3>
      <p>
        À 497 €, deux semaines (354 €) ne suffisent plus ; il en faut trois (531 €). Le
        forfait saison au plein tarif est fait pour ceux qui vivent sur place ou presque.
        La date du 2 décembre n'est donc pas un détail : elle divise le seuil de rentabilité
        par deux.
      </p>

      <h3>Le cas où il ne sert à rien : un seul séjour d'une semaine</h3>
      <p>
        Pour <strong>un seul séjour</strong> d'une semaine, ou d'un peu plus, le forfait
        saison ne se rattrape pas : huit jours d'affilée coûtent 215 € avec le forfait
        8 jours, neuf jours 247,50 € (8 jours + une journée), moins que les 249 € du saison.
        Au-delà, ou dès que les jours sont répartis sur plusieurs séjours, il reprend
        l'avantage. Et pour quelques samedis isolés, le samedi à 14 € en ligne
        bat tout le reste.
      </p>

      <h2>Pour une famille</h2>
      <p>
        La station propose un <strong>Pack Famille 6 jours</strong> (deux adultes et deux
        jeunes de 5 à 17 ans) à 604 € en ligne — en l'achetant au plus tard trois jours avant
        le premier jour de ski — et 619 € en caisse. C'est lui qu'il faut comparer au forfait
        saison :
      </p>
      <ul>
        <li>
          Deux adultes et deux enfants de 5 à 11 ans, en forfait saison promo : 2 × 249 + 2
          × 178 = <strong>854 €</strong>.
        </li>
        <li>
          La même famille en Pack Famille : 604 € pour une semaine,{" "}
          <strong>1 208 € pour deux</strong>.
        </li>
      </ul>
      <p>
        Une semaine : le pack. Deux semaines ou plus : le forfait saison, avec un peu plus de 350 € d'écart. Avec deux ados de 12 à 17 ans, comptés comme adultes dans le forfait
        saison (4 × 249 = 996 €), la conclusion ne change pas.
      </p>

      <h2>Avant de commander</h2>
      <ul>
        <li>
          Une <strong>photo d'identité récente</strong> (sans couvre-chef ni lunettes de
          soleil) et un <strong>justificatif d'âge</strong> sont demandés à la commande, en
          ligne comme en caisse.
        </li>
        <li>
          Le forfait est sur une carte mains-libres rechargeable en ligne. Retrait aux
          caisses du <strong>Chef-lieu</strong> ou du <strong>Mollard</strong> — celle du
          Mollard est au front de neige, à 250 m de l'appartement.
        </li>
        <li>
          L'assurance Carré Neige se prend en supplément, au panier.
        </li>
        <li>
          La page de la station renvoie à un astérisque sur « domaine skiable » sans dire ce
          qu'il recouvre. Le forfait saison vaut pour le domaine d'Albiez ; pour une journée
          aux{" "}
          <a href={PROPERTY.links.sybelles} target="_blank" rel="noopener noreferrer">
            Sybelles
          </a>
          , la station vend à part un forfait « 5 jours Albiez + 1 jour Sybelles » (200 € adulte, 166 € enfant), avec un accès par Saint-Jean-d'Arves.
        </li>
      </ul>
      <div className="facts">
        <p>
          <strong>Acheter en ligne</strong> —{" "}
          <a href={PROPERTY.links.resort} target="_blank" rel="noopener noreferrer">
            station-albiez.com
          </a>
          <br />
          Les prix ci-dessus sont ceux affichés par la station le 8 novembre 2026 : le
          montant qui fait foi est celui du panier.
        </p>
      </div>

      <p>
        Voir aussi :{" "}
        <Link href="/fr/guide/domaine-skiable-albiez-secteur-mollard">
          skier à Albiez depuis le secteur Mollard
        </Link>
        , <Link href="/fr/guide/louer-ses-skis-a-albiez">louer ses skis à Albiez</Link>,{" "}
        <Link href="/fr/guide/cours-de-ski-esf-albiez">les cours de l'ESF</Link> et{" "}
        <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
