import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        At 2,076 metres, below the Aiguilles d'Arves, Le Chalet d'la Croë is a private
        mountain refuge renovated in 2013. You climb up there for a crêpe halfway through a
        walk, for a raclette, or to sleep in a dome under the alpine night sky.
      </p>

      <h2>Where and when</h2>
      <p>
        The refuge stands in the commune of Albiez-Montrond, in the Maurienne valley, at the
        foot of the <Link href="/en/guide/aiguilles-arves">Aiguilles d'Arves</Link>.
      </p>
      <div className="facts">
        <p>
          <strong>Le Chalet d'la Croë</strong> — private refuge, 2,076 m
          <br />
          <strong>2026 season</strong>: 18 June to 13 September
          <br />
          <a href="https://www.lechaletdlacroe.fr/" target="_blank" rel="noopener noreferrer">
            lechaletdlacroe.fr
          </a>
        </p>
      </div>

      <h2>Stopping to eat</h2>
      <p>
        That is the main reason to go up if you are out for the day. A crêpe or a raclette
        halfway through a walk changes the outing entirely — and at that altitude, in the
        high pastures, the setting does the rest.
      </p>
      <p>
        The refuge works <strong>entirely off-grid</strong> and largely with{" "}
        <strong>home-made local produce</strong>. It is a constraint they have chosen, and it
        shows on the plate.
      </p>

      <h2>Sleeping in a dome</h2>
      <p>
        Accommodation is <strong>outdoors, in geodesic domes</strong>, for one night or
        more. It is what sets the place apart: full immersion in the mountain night sky,
        without the constraints of a bivouac.
      </p>
      <p>
        For a multi-day walk, it is a stage that shapes the itinerary: you climb on day one,
        sleep high, and set off early the next morning.
      </p>

      <h2>The atmosphere of the high pastures</h2>
      <p>
        Cowbells give the summer pastures their life — that is the constant soundtrack of the
        season, and the setting in which the refuge serves its food and puts up its guests.
      </p>

      <h2>Getting there</h2>
      <p>
        The refuge is reached on foot, from the sector's trails. The usual approaches go via
        the Chalmieu hamlet and the Montrond plateau — the same sector as the climb to the
        Basse du Gerbier described in our article on the{" "}
        <Link href="/en/guide/aiguilles-arves">Aiguilles d'Arves</Link>.
      </p>
      <p>
        Plan on <strong>checking opening hours and booking</strong> before setting off,
        especially for a night in a dome: a private refuge has limited capacity, and the
        season is short.
      </p>

      <h2>The rest of the trails</h2>
      <p>
        The six waymarked routes from the village and the Mollard — shorter and more
        accessible — are set out in{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">
          our guide to walking in Albiez
        </Link>
        .
      </p>
    </>
  );
}
