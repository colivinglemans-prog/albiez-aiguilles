import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez is a family ski resort in the Maurienne valley: 40 km of pistes, 13 lifts and
        22 runs between 1,500 and 2,060 metres. It splits into three sectors — Montrond,
        the village centre and the Mollard — plus the neighbouring village of
        Albiez-le-Jeune. Our apartment is in the Mollard, the highest of the three.
      </p>

      <h2>The ski area in numbers</h2>
      <ul>
        <li>
          <strong>40 km of pistes</strong> across <strong>22 runs</strong>
        </li>
        <li>
          <strong>13 lifts</strong>
        </li>
        <li>
          Altitude: <strong>1,500 m</strong> to <strong>2,060 m</strong>
        </li>
        <li>
          <strong>50 snow cannons</strong> topping up the natural cover
        </li>
      </ul>
      <p>
        The Montrond plateau enjoys low rainfall and remarkable light, with continuous snow
        cover for close to six months a year. The runs are sunny and wide — this is an area
        where you learn to ski comfortably, not one where you come looking for walls.
      </p>

      <h2>Starting from the Mollard: the three lifts to know</h2>

      <h3>The Échaux chairlift — the way in</h3>
      <p>
        <strong>250 to 300 m from the apartment</strong>, it climbs from 1,600 m to
        1,800 m. It is the quickest way to reach the whole area: take it in the morning and
        everything opens up behind it.
      </p>

      <h3>The Aplanes drag lift — the high point</h3>
      <p>
        From the top of the Échaux, you pick up the Aplanes drag lift, which tops out at{" "}
        <strong>2,100 m</strong> — the highest point reachable from this sector.
      </p>

      <h3>Coucou and Polytre — for beginners</h3>
      <p>
        The <strong>Coucou</strong> drag lift is the beginners' one. The{" "}
        <strong>Polytre</strong> is used in particular by the{" "}
        <Link href="/en/guide/cours-de-ski-esf-albiez">ski school</Link>: it offers several
        points at which to let go of the bar, with increasing difficulty. That is exactly
        what a child needs to progress without being thrown in at the deep end.
      </p>

      <h2>What order for a first day?</h2>
      <ol>
        <li>
          <strong>Complete beginner</strong>: Coucou in the morning, then Polytre in the
          afternoon for proper full descents.
        </li>
        <li>
          <strong>Intermediate</strong>: Échaux from opening to get the measure of the
          sector, then move across to the village centre and Montrond during the day.
        </li>
        <li>
          <strong>Strong skier</strong>: Échaux then Aplanes, and the area unrolls from
          2,100 m.
        </li>
        <li>
          <strong>Expert skier</strong>: from the top of the Aplanes lift, snow conditions
          permitting, several off-piste lines drop through the powder from{" "}
          <strong>2,100 m down to 1,500 m</strong>, all the way to the Loup chairlift — 600
          m of vertical in one run. Off-piste means outside the patrolled area: take the
          gear, check the avalanche bulletin, and hire a guide if in any doubt.
        </li>
      </ol>

      <h2>Why staying in the Mollard helps</h2>
      <p>
        The Mollard snow front brings together, within 250 m, the start of the pistes, the{" "}
        <Link href="/en/guide/louer-ses-skis-a-albiez">hire shops</Link>, the supermarket
        and the ski school meeting point. In practice: no shuttle bus, no carrying skis for
        hundreds of metres, and the option of going home for lunch. With children, that is
        the difference between a pleasant week and a week of logistics.
      </p>
      <p>
        It is also where the <Link href="/en/guide/albiez-c-show">Albiez C'Show</Link>, the
        Tuesday-night event during the school holidays, takes place.
      </p>

      <h2>Off the pistes</h2>
      <p>
        The <Link href="/en/guide/albiez-en-famille">Mollard sledging run</Link> is right
        next to the residence and catches plenty of sun (snow cover is not guaranteed —
        it is a natural run). Beyond that, the resort offers snowshoeing, cross-country
        skiing, <Link href="/en/guide/chiens-de-traineau-albiez">husky sledding</Link>,
        snowmobiling and igloo evenings.
      </p>

      <p>
        Distances, the ski locker and access to the snow front are detailed on{" "}
        <Link href="/en/ski">the winter page</Link>.
      </p>
    </>
  );
}
