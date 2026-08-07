import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond is home to the highest BMX track in France. It is freely accessible,
        in the village centre, surrounded by sports pitches and a picnic area. And for
        anything on wheels, the resort hires out electric mountain bikes, BMX bikes and
        e-scooters.
      </p>

      <h2>The BMX race track</h2>
      <p>
        It sits in the village centre and is <strong>open to all</strong>: no booking, no
        compulsory supervision. The features come at{" "}
        <strong>different levels</strong>, so a beginner and an experienced rider can share
        the same track.
      </p>
      <p>
        The setting counts for a lot: it is the highest BMX track in France, and you know it
        as soon as you look up.
      </p>

      <h2>What is around it</h2>
      <p>The track does not stand alone — the whole thing forms a complete leisure area:</p>
      <ul>
        <li>Football and basketball pitches</li>
        <li>Tennis court</li>
        <li>Pétanque pitch</li>
        <li>Children's playground</li>
        <li>Picnic tables</li>
      </ul>
      <p>
        It is the answer to an afternoon where not everyone in the family wants to do the
        same thing.
      </p>

      <h2>Hiring a bike</h2>

      <h3>Skiset — Albiez Sports (village centre)</h3>
      <p>
        <strong>BMX</strong> and <strong>e-scooter</strong> hire, plus guided rides. A
        100 m² retail space, with ski equipment in winter and hiking gear in summer.
      </p>

      <h3>Skimium — Mustang Sports (village centre)</h3>
      <p>
        A <strong>cycling school</strong> and <strong>electric mountain bikes</strong>. They
        are also on the Mollard snow front in the evening, 250 m from the apartment.
      </p>

      <h3>Skiset Ski Attitude and Sport 2000 (Mollard snow front)</h3>
      <p>
        The two shops closest to the apartment switch to hiking gear in summer. Each one is
        described in our article on{" "}
        <Link href="/en/guide/louer-ses-skis-a-albiez">
          hiring equipment in Albiez-Montrond
        </Link>
        .
      </p>

      <h2>Mountain biking on the trails</h2>
      <p>
        Several <strong>mountain-bike trails</strong> cross the{" "}
        <Link href="/en/guide/foret-du-rival">Rival forest</Link>, between 1,300 m and the
        Col du Mollard. Watch out for shared routes: the{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">Contamines loop</Link> also takes
        walkers and, in winter, husky teams.
      </p>

      <h2>And road cycling</h2>
      <p>
        For road cyclists the subject lies elsewhere: the{" "}
        <Link href="/en/guide/col-du-mollard-velo">Col du Mollard</Link>, its three ascents
        and the Arvan-Villards tour linking the Glandon, the Croix de Fer and the Mollard.
      </p>
      <p>
        The tourist office in the village centre provides maps and routes for road cycling,
        gravel and mountain biking, with or without electric assistance.
      </p>
    </>
  );
}
