import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Trois pointes de rocher à 3 514 mètres, qui dominent la vallée de l'Arvan et qu'on
        voit depuis le balcon du logement : les Aiguilles d'Arves sont l'emblème de la
        Maurienne. L'alpiniste anglais Coolidge, qui en fit officiellement la première
        ascension en 1878, y voyait « la plus belle trilogie des Alpes ».
      </p>

      <h2>Ce qu'on regarde exactement</h2>
      <p>
        Les Aiguilles d'Arves sont trois sommets alignés, culminant à{" "}
        <strong>3 514 m</strong>. Elles dominent la vallée de l'Arvan et se voient depuis
        une grande partie du secteur : le balcon, le{" "}
        <Link href="/fr/guide/lac-du-mollard-baignade">plan d'eau du Mollard</Link>, le{" "}
        <Link href="/fr/guide/col-du-mollard-velo">col du Mollard</Link>, et la plupart des{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">sentiers balisés</Link> de la
        commune.
      </p>
      <p>
        C'est un repère pratique autant qu'un décor : quand on les a de face, on sait où on
        est.
      </p>

      <h2>Y aller doucement : la Promenade Savoyarde de Découverte</h2>
      <p>
        La <strong>PSD des Aiguilles d'Arves</strong> est la façon la plus accessible de
        s'en approcher. Elle est classée facile, dure <strong>1 h 30 à 2 h</strong>, et
        elle est <strong>accessible aux poussettes et aux personnes à mobilité réduite</strong> —
        ce qui est rare à cette altitude.
      </p>
      <p>
        Le parcours est jalonné de bornes interactives qui racontent les alpages et la vie
        de ceux qui y travaillent. C'est une promenade de découverte, pas une performance.
      </p>

      <h2>Y aller sérieusement : la Basse du Gerbier</h2>
      <p>
        Pour aller au pied des Aiguilles, l'itinéraire d'été part du{" "}
        <strong>parking du relais TV</strong>, au hameau du Chalmieu (1 900 m), à
        Albiez-Montrond. Il faut compter <strong>+700 m de dénivelé</strong> pour atteindre
        la <strong>Basse du Gerbier</strong>, à 2 578 m.
      </p>
      <p>
        Ce n'est plus une promenade : chaussures de montagne, eau, coupe-vent, et un départ
        assez tôt pour éviter les orages de fin d'après-midi.
      </p>
      <div className="facts">
        <p>
          <strong>Promenade Savoyarde de Découverte</strong> : facile, 1 h 30 à 2 h,
          accessible poussettes et PMR.
          <br />
          <strong>Basse du Gerbier</strong> : départ parking du relais TV, hameau du
          Chalmieu (1 900 m), +700 m jusqu'à 2 578 m.
        </p>
      </div>

      <h2>Les voir sans marcher</h2>
      <p>
        Trois points de vue ne demandent aucun effort particulier :
      </p>
      <ul>
        <li>
          <strong>Le balcon du logement</strong>, orienté sud-ouest, face aux Aiguilles.
        </li>
        <li>
          <strong>Le col du Mollard</strong> (1 638 m), qui offre un panorama sur le massif
          Arvan-Villards et les Sybelles : Albiez, les alpages, Albiez-le-Jeune, le Mont
          Emy, les Aiguilles d'Arves, le glacier de l'Étendard, la combe Genin et les
          stations du Corbier et de la Toussuire.
        </li>
        <li>
          <strong>La boucle du plan d'eau</strong>, 30 minutes de marche depuis
          l'appartement, avec les Aiguilles et le glacier de l'Étendard en toile de fond.
        </li>
      </ul>

      <h2>Dormir à leur pied</h2>
      <p>
        Le{" "}
        <Link href="/fr/guide/refuge-chalet-la-croe">Chalet d'la Croë</Link>, refuge privé
        à 2 076 m, se trouve aux pieds des Aiguilles. Restauration en journée, hébergement
        en dômes pour la nuit.
      </p>

      <p>
        La vue depuis le logement est détaillée sur{" "}
        <Link href="/fr/ete">la page été</Link> et{" "}
        <Link href="/fr/ski">la page hiver</Link>.
      </p>
    </>
  );
}
