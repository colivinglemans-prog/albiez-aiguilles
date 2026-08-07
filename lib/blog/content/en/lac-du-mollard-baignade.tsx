import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        350 metres from the apartment, the Mollard lake leads a double life: a snowmaking
        reservoir in winter, a leisure and swimming spot in summer. Between July and August
        it is the meeting place of the whole sector.
      </p>

      <h2>Swimming</h2>
      <p>
        The lake is open for swimming in summer and{" "}
        <strong>supervised from 1 July to 31 August, daily from noon to 6 pm</strong>.
        Outside those hours, swimming is unsupervised.
      </p>
      <p>
        This is mountain water at 1,630 metres: it has to be earned early in the season, and
        becomes genuinely pleasant at the height of summer.
      </p>

      <h2>What is around it</h2>
      <ul>
        <li>
          <strong>An inflatable play structure</strong> on the water — the thing that keeps
          children busy for a whole afternoon.
        </li>
        <li>
          <strong>A paddling pool</strong> for the smallest.
        </li>
        <li>
          <strong>Picnic tables.</strong>
        </li>
        <li>
          <strong>A pétanque pitch</strong> and a <strong>volleyball court</strong>.
        </li>
        <li>
          <strong>Public toilets.</strong>
        </li>
      </ul>
      <p>
        A second leisure area sits across the road at the{" "}
        <Link href="/en/guide/col-du-mollard-velo">Col du Mollard</Link>, with a supervised
        lake and paddling pool, toilets, pétanque, a playground and a picnic area.
      </p>

      <h2>The walk round: 30 minutes</h2>
      <p>
        The loop around the lake is a family walk starting directly from the apartment, very
        well exposed, with <strong>little height gain and 30 minutes of walking</strong>. It
        looks out over the <Link href="/en/guide/aiguilles-arves">Aiguilles d'Arves</Link>,
        the Étendard glacier and the Arvan valley.
      </p>
      <p>
        It is the end-of-day stroll par excellence, and the best spot in the sector to
        photograph the Aiguilles at sunset: the lake reflects them.
      </p>
      <p>
        The five other waymarked routes in the commune are described in our article on{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">
          six waymarked walks from Albiez-Montrond
        </Link>
        .
      </p>

      <h2>The same lake in winter</h2>
      <p>
        From December to March, the lake serves as the{" "}
        <strong>water reservoir for the ski area's 50 snow cannons</strong>. It underwrites
        part of the resort's snow cover. The walk around it is still possible, in an
        entirely different setting.
      </p>

      <div className="facts">
        <p>
          <strong>Distance from the apartment</strong>: 350 m
          <br />
          <strong>Supervised swimming</strong>: 01/07 to 31/08, daily from noon to 6 pm
          <br />
          <strong>Lake loop</strong>: 30 min, little height gain
        </p>
      </div>

      <p>
        Other summer activities —{" "}
        <Link href="/en/guide/equitation-le-kavalkada">ponies</Link>,{" "}
        <Link href="/en/guide/bmx-vtt-trottinette-albiez">BMX and mountain biking</Link> —
        are a few hundred metres away. The full picture is on{" "}
        <Link href="/en/summer">the summer page</Link>.
      </p>
    </>
  );
}
