import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        L'Albiez C'Show est la soirée de la station : tous les mardis soir pendant les
        vacances scolaires, sur le front de neige du Mollard. Descente aux flambeaux, show
        des dameuses, démonstrations des moniteurs, feu d'artifice et vin chaud. C'est
        gratuit ou presque, et c'est à 250 m du logement.
      </p>

      <h2>Le programme</h2>

      <h3>La descente aux flambeaux</h3>
      <p>
        Encadrée par les moniteurs de l'
        <Link href="/fr/guide/cours-de-ski-esf-albiez">École du Ski Français</Link>, elle
        est <strong>ouverte aux enfants et aux adolescents à partir du niveau flocon</strong>.
        Les vacanciers volontaires descendent avec les moniteurs, flambeau à la main.
      </p>
      <p>
        Inscription sur place, venir équipé. Le flambeau est facturé quelques euros
        (comptez 5 €).
      </p>

      <h3>Les démonstrations</h3>
      <p>
        Présentation et show des <strong>dameuses</strong> — voir ces machines manœuvrer de
        près impressionne autant les adultes que les enfants — et démonstrations de ski par
        les moniteurs de l'ESF et le club des sports.
      </p>

      <h3>Le feu d'artifice</h3>
      <p>Un spectacle pyrotechnique qui illumine la station en fin de soirée.</p>

      <h3>Le pot de l'amitié</h3>
      <p>
        Vin chaud pour les adultes, jus de fruit pour les enfants, offerts à l'arrivée par
        l'ESF.
      </p>

      <div className="facts">
        <p>
          <strong>Quand</strong> : tous les mardis soir pendant les vacances scolaires
          <br />
          <strong>Où</strong> : front de neige du Mollard, à 250 m du logement
          <br />
          <strong>Tarif</strong> : gratuit — seul le flambeau est payant (≈ 5 €)
          <br />
          <strong>Horaire précis</strong> : affiché chaque saison par l'office de tourisme
          et l'ESF
        </p>
      </div>

      <h2>Pourquoi c'est un vrai avantage d'être logé au Mollard</h2>
      <p>
        L'événement se tient <strong>sur le front de neige du Mollard</strong>, à 250 m de
        l'appartement. En pratique, cela veut dire :
      </p>
      <ul>
        <li>Aucune voiture, aucun parking à chercher un soir de forte affluence.</li>
        <li>
          Un enfant fatigué peut rentrer se coucher en cinq minutes, sans gâcher la soirée
          des autres.
        </li>
        <li>
          Le feu d'artifice se regarde très bien depuis le{" "}
          <Link href="/fr#appartement">balcon</Link> si l'on préfère rester au chaud.
        </li>
      </ul>

      <h2>Vérifier les horaires</h2>
      <p>
        Les dates et horaires exacts changent d'une saison à l'autre — ils suivent le
        calendrier des vacances scolaires et la nuit tombe plus tard en fin d'hiver. Le
        programme d'animation est disponible à l'office de tourisme d'Albiez-Montrond, au
        Chef-lieu, où l'on trouve aussi le plan de la station et le programme du cinéma.
      </p>

      <h2>Le reste de la semaine</h2>
      <p>
        Pour compléter : la piste de luge du Mollard juste à côté de la résidence, les{" "}
        <Link href="/fr/guide/chiens-de-traineau-albiez">chiens de traîneau</Link> aux
        Contamines, et les soirées igloo proposées par Mustang Sports.
      </p>
    </>
  );
}
