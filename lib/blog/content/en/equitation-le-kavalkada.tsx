import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        300 metres from the apartment, Le Kavalkada offers a different way to see the
        mountain: on horseback or on a pony, through forests, high pastures and meadows.
        Rides, arena lessons and week-long courses — all led by state-qualified instructors.
      </p>

      <h2>The options</h2>

      <h3>For the smallest — 30 min or 1 h</h3>
      <p>
        Pony rides of half an hour or an hour <strong>around the Châtel</strong>, which is to
        say just above the apartment. The ideal format for a first contact: short enough to
        hold attention, long enough to count as a proper outing.
      </p>
      <p>
        The ride follows the <strong>Châtel loop</strong>, and the Hameau des Aiguilles
        residence is built into the flank of the Châtel: in practice,{" "}
        <strong>the route passes right in front of the chalet</strong>. You can watch the
        children go by from the balcony, and join them on foot in a few minutes.
      </p>
      <p>
        On foot it is also{" "}
        <strong>the simplest and easiest walk starting from the chalet</strong> — the
        starting point for everything else, set out in our guide to{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">
          waymarked walks around Albiez
        </Link>
        .
      </p>

      <h3>For more confident riders — 1 h 30</h3>
      <p>
        Rides through the high pastures,{" "}
        <strong>
          at the foot of the{" "}
          <Link href="/en/guide/aiguilles-arves">Aiguilles d'Arves</Link>
        </strong>
        . The setting is what makes the difference.
      </p>

      <h3>The half-day</h3>
      <p>
        A ride across the <strong>Cochette meadows</strong> and the village of Albiez. The
        same ground as{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">the Cochette loop</Link>, seen from
        a different height.
      </p>

      <h3>Arena lessons</h3>
      <p>
        Group lessons at all levels, from beginner to improver. Private lessons too, singly
        or as a course.
      </p>

      <h3>Week-long pony courses</h3>
      <p>
        The centre takes children and older riders all summer for week-long courses. It is
        the format that gives a family holiday its shape: the children have their activity,
        the adults have their mornings.
      </p>

      <div className="facts">
        <p>
          <strong>Le Kavalkada</strong> — riding centre, 300 m from the apartment
          <br />
          <strong>Hours</strong> (08/07 to 31/08, subject to change): Monday, Tuesday,
          Wednesday, Thursday, Friday and Sunday, 9 am to noon and 2 pm to 7 pm.{" "}
          <strong>Closed on Saturdays.</strong>
          <br />
          <strong>Supervision</strong>: state-qualified instructors — group rates available
        </p>
      </div>

      <h2>A second riding centre at the col</h2>
      <p>
        The <Link href="/en/guide/col-du-mollard-velo">Col du Mollard</Link> also has a
        riding centre with an arena, open in summer. It sits right beside the col's leisure
        area (lake, paddling pool, pétanque, playground and picnic area) — enough for a full
        half-day in one place.
      </p>

      <h2>Closed on Saturdays: worth planning around</h2>
      <p>
        Saturday is changeover day in most of the resort's rentals, and it is also the
        Kavalkada's closing day. Over a Saturday-to-Saturday week, that leaves six usable
        days: plenty, as long as you are not counting on the first one.
      </p>

      <p>
        Other summer activities a few hundred metres away:{" "}
        <Link href="/en/guide/lac-du-mollard-baignade">the Mollard lake</Link> and{" "}
        <Link href="/en/guide/bmx-vtt-trottinette-albiez">the BMX track</Link>. The full
        picture is on <Link href="/en/summer">the summer page</Link>.
      </p>
    </>
  );
}
