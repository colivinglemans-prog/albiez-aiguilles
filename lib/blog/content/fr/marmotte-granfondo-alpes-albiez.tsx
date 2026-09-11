import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        La Marmotte Granfondo Alpes se court le 27 juin 2027, de Bourg-d'Oisans à l'Alpe
        d'Huez, par le Glandon, le Télégraphe et le Galibier. Sept mille cinq cents dossards,
        plafonnés, dont plus de 88 % partent à l'étranger — et qui s'épuisent en moins d'une
        journée. Si vous lisez ceci avant octobre 2026, vous avez de l'avance ; c'est là que
        les inscriptions ouvrent.
      </p>

      <h2>Les dates à retenir</h2>
      <div className="facts">
        <p>
          <strong>Épreuve</strong> : dimanche 27 juin 2027
          <br />
          <strong>Départ</strong> : Le Bourg-d'Oisans — <strong>arrivée</strong> : l'Alpe
          d'Huez
          <br />
          <strong>Cols</strong> : Glandon, Télégraphe, Galibier, puis la montée finale
          <br />
          <strong>Participants</strong> : 7 500 maximum, plus de 88 % venus de l'étranger
          <br />
          <strong>Inscriptions</strong> : ouverture attendue début octobre 2026, épuisées en
          moins d'un jour
        </p>
      </div>

      <h2>Albiez comme camp de base : l'honnêteté d'abord</h2>
      <p>
        Disons-le tout de suite, parce que c'est ce qui décide :{" "}
        <strong>le matin de la course, Albiez n'est pas le bon endroit où dormir.</strong>{" "}
        Bourg-d'Oisans est de l'autre côté de la Croix de Fer, à une heure et quart ou une
        heure et demie de route par le col — l'été seulement, et pas à cinq heures du matin
        un jour d'épreuve.
      </p>
      <p>
        Ce pour quoi Albiez est bon, c'est <strong>la semaine d'avant</strong>. La
        reconnaissance, l'acclimatation à l'altitude, les jambes qu'on prépare sans se
        ruiner : trois des quatre difficultés du parcours se reconnaissent depuis ici, et
        les deux premières sans même passer par une vallée.
      </p>

      <h2>Reconnaître le parcours depuis Albiez</h2>

      <h3>Le Glandon, versant Maurienne</h3>
      <p>
        Le jour de la course, le Glandon se monte depuis l'Oisans et se descend sur la
        Maurienne. Depuis Albiez, c'est donc <strong>la descente</strong> que vous
        reconnaissez — celle qui est neutralisée au chronomètre mais où l'on perd le plus de
        monde. La rejoindre ne demande pas de redescendre dans la vallée : on passe par
        Montrond, Entraigues et La Villette pour retrouver la D926.
      </p>

      <h3>Le Télégraphe et le Galibier</h3>
      <p>
        Les deux vraies difficultés chronométrées, et elles sont dans votre vallée. Depuis
        Albiez, on descend sur Saint-Jean-de-Maurienne — une vingtaine de minutes — puis on
        remonte jusqu'à Saint-Michel-de-Maurienne pour attaquer le Télégraphe. Le Galibier
        enchaîne derrière. C'est la sortie qui ressemble le plus à ce que vous ferez le jour
        J.
      </p>

      <h3>L'Alpe d'Huez</h3>
      <p>
        La seule que vous ne reconnaîtrez pas d'ici sans y aller exprès. Elle se garde pour
        le jour de la course, ou pour une journée entière consacrée à l'Oisans.
      </p>

      <h2>Dormir à 1 600 mètres pendant la préparation</h2>
      <p>
        L'altitude de sommeil n'est pas un détail de confort quand on prépare une épreuve
        qui passe deux fois au-dessus de 2 000 mètres. Albiez-Montrond est à 1 600 m, et
        c'est l'altitude à laquelle vous dormez, pas seulement celle à laquelle vous roulez.
      </p>
      <p>
        À quoi s'ajoute le prosaïque : une cuisine équipée, pour manger ce qu'on veut à
        l'heure qu'on veut plutôt que d'attendre un service ; un balcon plein sud qui sèche
        un maillot en une heure ; et le calme d'un village de 300 habitants la semaine où
        Bourg-d'Oisans se remplit.
      </p>
      <p>
        Un point à anticiper, parce qu'il est concret :{" "}
        <strong>le casier à skis n'est pas dimensionné pour un vélo</strong>. Deux
        solutions sur place : l'attacher sur le palier, qui est couvert et protégé, ou le
        rentrer sur le balcon. Comptez une cinquantaine de marches depuis le parking.
      </p>

      <h2>Et si vous n'avez pas de dossard</h2>
      <p>
        Les 7 500 places partent vite, et beaucoup de cyclistes viennent quand même rouler
        ces cols la même semaine, sans plaque de cadre. Les routes sont les mêmes, les
        paysages aussi, et la Maurienne ferme régulièrement certains cols aux voitures
        pendant une matinée. Tout est dans notre article{" "}
        <Link href="/fr/guide/albiez-camp-de-base-grands-cols">
          Albiez, camp de base des grands cols
        </Link>
        , avec le col du Mollard qui se trouve, lui, à la sortie du hameau — voir{" "}
        <Link href="/fr/guide/col-du-mollard-velo">le col du Mollard à vélo</Link>.
      </p>
      <p>
        Le reste de ce que la station propose l'été est sur notre{" "}
        <Link href="/fr/ete">page été</Link>.
      </p>
    </>
  );
}
