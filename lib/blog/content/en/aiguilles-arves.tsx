import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Three rock spires at 3,514 metres, dominating the Arvan valley and visible from the
        apartment's balcony: the Aiguilles d'Arves are the emblem of the Maurienne. The
        English alpinist Coolidge, who made the first official ascent in 1878, called them
        "the finest trio in the Alps".
      </p>

      <h2>What exactly you are looking at</h2>
      <p>
        The Aiguilles d'Arves are three aligned summits topping out at{" "}
        <strong>3,514 m</strong>. They dominate the Arvan valley and are visible from most
        of the sector: the balcony, the{" "}
        <Link href="/en/guide/lac-du-mollard-baignade">Mollard lake</Link>, the{" "}
        <Link href="/en/guide/col-du-mollard-velo">Col du Mollard</Link>, and most of the{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">waymarked trails</Link> in the
        commune.
      </p>
      <p>
        They are as much a navigational aid as a backdrop: when you have them face-on, you
        know where you are.
      </p>

      <h2>The gentle way: the Savoyard Discovery Walk</h2>
      <p>
        The <strong>PSD des Aiguilles d'Arves</strong> is the most accessible way to get
        closer. It is graded easy, takes <strong>1½ to 2 hours</strong>, and is{" "}
        <strong>accessible to pushchairs and to people with reduced mobility</strong> —
        which is rare at this altitude.
      </p>
      <p>
        The route is punctuated by interactive markers telling the story of the high
        pastures and the people who work them. It is a discovery walk, not a performance.
      </p>

      <h2>The serious way: the Basse du Gerbier</h2>
      <p>
        To reach the foot of the Aiguilles, the summer route starts from the{" "}
        <strong>relay-TV car park</strong> at the Chalmieu hamlet (1,900 m), in
        Albiez-Montrond. Allow <strong>+700 m of height gain</strong> to reach the{" "}
        <strong>Basse du Gerbier</strong>, at 2,578 m.
      </p>
      <p>
        This is no longer a stroll: mountain boots, water, a windproof layer, and an early
        enough start to avoid late-afternoon storms.
      </p>
      <div className="facts">
        <p>
          <strong>Savoyard Discovery Walk</strong>: easy, 1 h 30 to 2 h, pushchair- and
          wheelchair-accessible.
          <br />
          <strong>Basse du Gerbier</strong>: from the relay-TV car park, Chalmieu hamlet
          (1,900 m), +700 m to 2,578 m.
        </p>
      </div>

      <h2>Seeing them without walking</h2>
      <p>Three viewpoints require no particular effort:</p>
      <ul>
        <li>
          <strong>The apartment's balcony</strong>, facing south-west, straight at the
          Aiguilles.
        </li>
        <li>
          <strong>The Col du Mollard</strong> (1,638 m), with a panorama over the
          Arvan-Villards massif and Les Sybelles: Albiez, the high pastures,
          Albiez-le-Jeune, the Mont Emy, the Aiguilles d'Arves, the Étendard glacier, the
          Genin combe and the resorts of Le Corbier and La Toussuire.
        </li>
        <li>
          <strong>The lake loop</strong>, 30 minutes' walk from the apartment, with the
          Aiguilles and the Étendard glacier as a backdrop.
        </li>
      </ul>

      <h2>Sleeping at their foot</h2>
      <p>
        The <Link href="/en/guide/refuge-chalet-la-croe">Chalet d'la Croë</Link>, a private
        refuge at 2,076 m, sits below the Aiguilles. Meals during the day, dome
        accommodation for the night.
      </p>

      <p>
        The view from the apartment is described on{" "}
        <Link href="/en/summer">the summer page</Link> and{" "}
        <Link href="/en/ski">the winter page</Link>.
      </p>
    </>
  );
}
