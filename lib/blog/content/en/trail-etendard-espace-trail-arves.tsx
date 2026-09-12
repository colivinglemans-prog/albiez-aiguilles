import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        The Trail de l'Étendard crosses the Grandes Rousses massif in early August, from
        Bourg-d'Oisans to Saint-Sorlin-d'Arves — a quarter of an hour from Albiez. And its
        route does not vanish on the Monday: it also exists as a{" "}
        <strong>permanent waymarked trail</strong>, which you can run any day of the summer,
        without a number.
      </p>

      <h2>The race</h2>
      <p>
        Four courses — <strong>17, 22, 44 and 65 km</strong> — in the heart of the Grandes
        Rousses, over two days in early August. The 2026 edition was the thirteenth.
      </p>
      <p>
        The <strong>65 km</strong> is the one that gives the event its meaning:{" "}
        <strong>3,624 metres of climbing</strong>, a crossing of the massif starting from
        Bourg-d'Oisans, a passage at the foot of the Étendard glacier, and a dozen notable
        lakes along the way — Lac Blanc, Lac Bramant, Lac de Grand-Maison. A loop below the
        Pic de l'Étendard, then the descent to Saint-Sorlin-d'Arves.
      </p>
      <p>
        The <strong>44 km</strong> follows the same logic, shorter: start at Bourg-d'Oisans,
        finish at Saint-Sorlin. The two short formats stay on the Savoie side.
      </p>

      <div className="facts">
        <p>
          <strong>When</strong>: two days at the very start of August
          <br />
          <strong>Courses</strong>: 17, 22, 44 and 65 km
          <br />
          <strong>The 65 km</strong>: 3,624 m of climbing, Bourg-d'Oisans →
          Saint-Sorlin-d'Arves
          <br />
          <strong>Finish</strong>: Saint-Sorlin-d'Arves, 12 km from Albiez
          <br />
          <strong>The rest of the year</strong>: route no. 7 of the Espace Trail, waymarked
          permanently
        </p>
      </div>

      <h2>The same route, without a number</h2>
      <p>
        This is what makes the area worthwhile outside race weekend. The{" "}
        <strong>Espace Trail Pays des Aiguilles d'Arves</strong> permanently waymarks{" "}
        <strong>550 kilometres of routes</strong>, across more than forty numbered trails:
        from 3 km for a family outing to nearly 38 km, with climbs reaching 2,380 metres.
      </p>
      <p>
        <strong>Route number 7 is the Trail de l'Étendard itself.</strong> So you can
        reconnoitre it in July, run it again in September, or simply run it without ever
        entering anything. Dogs on a lead are allowed on the waymarked routes.
      </p>

      <h2>What to know if you are staying in Albiez</h2>
      <p>
        Let us be straight about it:{" "}
        <strong>no Espace Trail route starts from Albiez-Montrond.</strong> They start from
        Saint-Sorlin-d'Arves, Saint-Jean-d'Arves, La Toussuire, Le Corbier, the Villards
        valley and the La Tour-en-Maurienne area. Albiez is in the same country, not in the
        same network.
      </p>
      <p>
        In practice that means fifteen to twenty minutes' drive to reach a start —
        Saint-Sorlin is 12 km away, without going back through the valley. Little enough for
        a 550 km network, but not nothing, and better known before booking.
      </p>
      <p>
        From the village itself, on the other hand, there are our{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">six waymarked walks</Link>, from
        40 minutes to 3½ hours. Enough to run from the door on days you would rather not
        take the car.
      </p>

      <h2>The same massif, on foot and by bike</h2>
      <p>
        A geographical curiosity: the 65 km runners cross the Grandes Rousses on foot from
        Bourg-d'Oisans, while cyclists cross the same massif by road a month earlier, over
        the Col de la Croix de Fer and the Glandon. One barrier, two ways over it — and
        Albiez is on the right side for both. See{" "}
        <Link href="/en/guide/albiez-camp-de-base-grands-cols">
          Albiez, base camp for the great passes
        </Link>
        .
      </p>

      <h2>Around the race</h2>
      <p>
        In early August the village has its own festival too —{" "}
        <Link href="/en/guide/tradi-cimes-albiez">Tradi'Cimes</Link>, free, over the
        weekend. In mid-July, the{" "}
        <Link href="/en/guide/cross-triathlon-swimrun-albiez">
          cross triathlon and swimrun
        </Link>{" "}
        is held at the village lake. And to recover, the supervised swimming at the{" "}
        <Link href="/en/guide/lac-du-mollard-baignade">Mollard lake</Link>.
      </p>
      <p>
        The rest of the season is on our <Link href="/en/summer">summer page</Link>.
      </p>
    </>
  );
}
