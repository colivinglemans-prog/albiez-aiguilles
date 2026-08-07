import Link from "next/link";
import { PROPERTY } from "@/lib/property";
import ArticleImage from "@/lib/blog/ArticleImage";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond a de quoi vivre sans redescendre : un supermarché au front de
        neige, une épicerie et une boulangerie au Chef-lieu. Mais pour arriver à Albiez,
        on passe forcément par Saint-Jean-de-Maurienne — et c'est là qu'il faut faire le
        gros des courses.
      </p>

      <h2>La bonne méthode : le gros à Saint-Jean, le reste au village</h2>
      <p>
        Saint-Jean-de-Maurienne est sur la route, à environ <strong>30 km</strong> et{" "}
        <strong>20 minutes</strong> d'Albiez. On y trouve un{" "}
        <strong>Carrefour Market</strong> (avec drive, ce qui permet de commander depuis
        chez soi et de charger en dix minutes) et un <strong>Lidl</strong>.
      </p>
      <p>
        Bon à savoir : <strong>station essence et laverie</strong> au Carrefour Market. Sur
        un séjour d'une semaine avec des affaires de ski, la laverie n'est pas un détail.
      </p>
      <p>
        Une fois là-haut, les commerces du village couvrent tout le reste : le pain, les
        oublis, le fromage, l'apéro.
      </p>

      <h2>Au front de neige du Mollard — le Sherpa</h2>
      <p>
        C'est <strong>le magasin le plus proche du logement</strong>, à 250 m, et il est{" "}
        <strong>directement sur le front de neige</strong>. Cela change complètement son
        usage : ce n'est pas une course qu'on planifie, c'est un arrêt de deux minutes{" "}
        <strong>sur le chemin du retour de ski</strong>, skis à la main, pour le pain du
        lendemain ou ce qui manque au dîner.
      </p>
      <p>
        Alimentation et droguerie, avec <strong>livraison possible</strong>. Sur place :
        dépôt de pain, boucherie-charcuterie, fromage à la coupe, produits régionaux.
      </p>
      <ArticleImage
        src="blog/sherpa-albiez-montrond-interieur.jpg"
        alt="Intérieur du Sherpa d'Albiez-Montrond : le rayon boucherie-charcuterie et les allées d'épicerie"
        caption="Le rayon frais du Sherpa d'Albiez-Montrond, au front de neige du Mollard."
      />
      <div className="facts">
        <p>
          <strong>Horaires</strong> — ils varient selon la saison et sont tenus à jour sur
          la fiche du magasin :{" "}
          <a href={PROPERTY.links.sherpa} target="_blank" rel="noopener noreferrer">
            sherpa.net — Albiez-Montrond
          </a>
        </p>
      </div>
      <p>
        C'est aussi la meilleure adresse pour rapporter quelque chose qui ne se trouve pas
        en grande surface :
      </p>
      <ul>
        <li>
          <strong>Les saucisses de bœuf séchées maison</strong> de Sandrine, fabriquées sur
          place — la spécialité du magasin, redoutable à l'apéro.
        </li>
        <li>Le sarrasin de Saint-Jean.</li>
        <li>Le miel d'un apiculteur d'Albiez.</li>
        <li>Les bières de Modane et de Valloire.</li>
        <li>Le génépi d'une petite distillerie.</li>
      </ul>

      <h2>Au Chef-lieu — l'épicerie Sambuis Dufreney</h2>
      <p>
        Une supérette-alimentation au cœur du village, installée dans ce qui était
        autrefois une ferme, réhabilitée en épicerie traditionnelle. Ce commerce familial
        est <strong>ouvert tous les jours de l'année</strong> — une phrase qui a du sens en
        montagne.
      </p>
      <p>
        On y trouve l'alimentation générale, la charcuterie et le fromage à la coupe,
        l'épicerie, les produits régionaux, le gaz, la quincaillerie et les premiers soins.
        Le pain frais du{" "}
        <Link href="/fr/guide/boulangerie-moulin-valentin-albiez">Moulin Valentin</Link> y
        est livré tous les jours.
      </p>
      <div className="facts">
        <p>
          <strong>Horaires</strong> (susceptibles d'évoluer) : tous les jours de 7 h 30 à
          12 h 30, puis de 17 h à 19 h — et de 16 h à 19 h du 3 juillet au 3 septembre.
        </p>
      </div>

      <h2>Au Chef-lieu — la boulangerie</h2>
      <p>
        Le Moulin Valentin propose pains, viennoiseries, tartes sucrées, boissons chaudes
        et fraîches, tartines, quiches et sandwichs.{" "}
        <Link href="/fr/guide/boulangerie-moulin-valentin-albiez">
          Son histoire mérite un article à elle seule.
        </Link>
      </p>

      <h2>Rapporter du fromage : la coopérative</h2>
      <p>
        Pour repartir avec de quoi prolonger les vacances, l'étape est la{" "}
        <Link href="/fr/guide/fromagerie-cooperative-beaufort-des-arves">
          Fromagerie Coopérative de la vallée des Arves
        </Link>
        , qui a une boutique à Albiez-Montrond. Leur <strong>Beaufort AOP</strong> est
        excellent, et le choix va bien au-delà : fromages, charcuterie, confitures, miel.
      </p>

      <h2>Ce qu'il faut apporter</h2>
      <p>
        Quelques consommables ne sont pas fournis dans l'appartement et se trouvent
        beaucoup moins cher en plaine : tablettes de lave-vaisselle, sacs poubelle 50 L,
        papier toilette et dosettes Nespresso. À glisser dans le coffre avant de monter —
        le détail est sur{" "}
        <Link href="/fr#appartement">la page du logement</Link>.
      </p>
    </>
  );
}
