import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        The Cross Triathlon and Swimrun des Aiguilles d'Arves takes place in mid-July at the
        Albiez lake — 300 metres from the flat. Two races in the same day, open{" "}
        <strong>from age 8</strong>, in a setting where you swim facing the Aiguilles. It is
        a morning and an afternoon; the rest of the week is yours.
      </p>

      <h2>Two races, one day</h2>

      <h3>The cross triathlon, in the morning</h3>
      <p>
        Swim, mountain bike, then trail-style running. Three formats, sorted by age:
      </p>
      <ul>
        <li>
          <strong>S format, 16 and over</strong> — 500 m swim, 11.97 km mountain bike,
          4.8 km run. Start at 9.30am.
        </li>
        <li>
          <strong>Ages 12-15</strong> — 200 m, 5.4 km, 2.4 km. Start at midday.
        </li>
        <li>
          <strong>Ages 8-11</strong> — 100 m, 5.4 km, 1 km. Start at 12.45pm.
        </li>
      </ul>

      <h3>The swimrun, in the afternoon</h3>
      <p>Swimming and running, alternating, no bike. Five formats, one of them in pairs:</p>
      <ul>
        <li>
          <strong>S format, 16 and over</strong> — 900 m swim, 8.8 km run.
        </li>
        <li>
          <strong>Ages 12-19</strong>, in pairs or solo — 450 m, 4.8 km.
        </li>
        <li>
          <strong>Ages 10-11</strong> — 360 m, 640 m.
        </li>
        <li>
          <strong>Ages 8-9</strong> — 60 m, 580 m.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>When</strong>: a mid-July weekend
          <br />
          <strong>Where</strong>: the Albiez-Montrond lake, 300 m from the flat
          <br />
          <strong>From</strong>: age 8
          <br />
          <strong>Morning</strong>: cross triathlon — swim, mountain bike, trail
          <br />
          <strong>Afternoon</strong>: swimrun — swim and run
          <br />
          <strong>Entries</strong>: through the French Triathlon Federation calendar
        </p>
      </div>

      <h2>From age 8, and that changes everything</h2>
      <p>
        Most mountain events start at sixteen, which settles the family holiday question:
        the parents race, the children watch. Here all four age brackets have their own
        distance, on the same lake and on the same day. An eight-year-old swims their 60
        metres and runs their 580, and wears a number like everyone else.
      </p>
      <p>
        It is also, very concretely, why sleeping next door beats sleeping forty minutes
        away: a 9.30am start for the older ones and another at 12.45pm for the youngest
        makes a full day on site, with wet kit in between.
      </p>

      <h2>The lake, 300 metres away</h2>
      <p>
        It is the same lake as the rest of the summer: supervised swimming, paddling pool,
        pedalos, inflatable structure, playground and picnic area. The detail is in our
        article on the <Link href="/en/guide/lac-du-mollard-baignade">Mollard lake</Link>.
      </p>
      <p>
        From the flat you walk there. No car to park on a busy day, no bag to carry for a
        whole day out: you go back up to change between starts, and the south-facing balcony
        dries a wetsuit in an hour.
      </p>

      <h2>Staying the week</h2>
      <p>
        The race lasts a day. What surrounds it lasts longer, and that is where a stay is
        decided:
      </p>
      <ul>
        <li>
          The{" "}
          <Link href="/en/guide/randonnees-balisees-albiez">six waymarked walks</Link> from
          the village, from 40 minutes to 3½ hours — enough to scout a route or to recover
          on foot.
        </li>
        <li>
          Mountain bikes and e-bikes, with the{" "}
          <Link href="/en/guide/bmx-vtt-trottinette-albiez">
            BMX race track in the middle of the village
          </Link>
          .
        </li>
        <li>
          The <Link href="/en/guide/col-du-mollard-velo">Col du Mollard</Link>, at the edge
          of the hamlet, if you brought the road bike.
        </li>
        <li>
          And everything that makes it a holiday rather than a sporting trip:{" "}
          <Link href="/en/guide/albiez-en-famille">Albiez with children</Link>.
        </li>
      </ul>
      <p>
        The full season is on our <Link href="/en/summer">summer page</Link>.
      </p>
    </>
  );
}
