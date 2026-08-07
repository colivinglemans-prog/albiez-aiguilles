import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        In the centre of Albiez-Montrond, Le Moulin Valentin makes everything on site:
        bread, pastries, tarts, quiches, sandwiches. And behind the counter, a story that
        begins in 1694 — possibly earlier.
      </p>

      <h2>A story that begins in 1694</h2>
      <p>
        Le Moulin Valentin is not a recent arrival. The story of the place goes back to{" "}
        <strong>1694</strong> in Albiez-Montrond, and probably further still. The rest is
        told by pushing the door open: it is the kind of shop you leave with more
        information than bread.
      </p>

      <h2>What they sell</h2>
      <p>Everything is made on the premises, by hand:</p>
      <ul>
        <li>
          <strong>Bread</strong>, including speciality loaves
        </li>
        <li>
          <strong>Viennoiserie</strong> and cakes
        </li>
        <li>
          <strong>Sweet tarts</strong> and desserts
        </li>
        <li>
          <strong>Open sandwiches, quiches and sandwiches</strong>
        </li>
        <li>
          <strong>Hot and cold drinks</strong> (non-alcoholic)
        </li>
      </ul>

      <h2>The specialities worth crossing the village for</h2>
      <p>
        This is where the bakery becomes useful beyond breakfast. Three things to know:
      </p>
      <ul>
        <li>
          <strong>The pâté en croûte</strong> — lunch for a{" "}
          <Link href="/en/guide/randonnees-balisees-albiez">day's walking</Link> sorted in a
          single purchase.
        </li>
        <li>
          <strong>The "pain yéti"</strong>: a baguette baked with bacon and cheese. No
          further comment required.
        </li>
        <li>
          <strong>The almond and apple tartlets</strong>, for the way back.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Boulangerie Moulin Valentin</strong>
          <br />
          50 route du Mollard, Chef-lieu, 73300 Albiez-Montrond, France
          <br />
          <a href="tel:+33479593397">+33 4 79 59 33 97</a>
        </p>
        <p>
          <strong>Opening hours</strong> (subject to change): 17/12 to 19/03 and 01/07 to
          21/08, daily 7 am to 7 pm. 25/03 to 25/06, Saturdays and Sundays.
        </p>
      </div>

      <h2>Don't feel like driving down to the village?</h2>
      <p>
        Fresh Moulin Valentin bread is delivered daily to the{" "}
        <Link href="/en/guide/faire-ses-courses-a-albiez">Sambuis Dufreney grocery</Link>,
        and the Sherpa on the snow front — 250 m from the apartment — has a bread counter.
        You can quite happily spend a week without taking the car out.
      </p>
    </>
  );
}
