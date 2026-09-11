import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Turin is two hours from Albiez. That is not widely known, and it changes a stay: the
        Maurienne is a border valley, and the first major Italian city sits on the other
        side of the massif rather than at the end of a journey. Many of our guests give it a
        day mid-stay; others make Albiez their first stop and carry on into Italy.
      </p>

      <h2>Three ways to get there</h2>

      <h3>By train, from Saint-Jean-de-Maurienne</h3>
      <p>
        The most comfortable option, and the most underrated.{" "}
        <strong>134 km, 1 hr 56 min, no change.</strong> The Paris-Milan trains run by SNCF
        and Trenitalia stop at Saint-Jean-de-Maurienne, then Modane, Oulx and Turin. Leave
        the car at the station, arrive at Torino Porta Susa, and the parking question never
        arises.
      </p>
      <p>
        Two caveats, and they matter. There are only a handful of trains a day: check the
        timetable before building a day around it.{" "}
        <strong>
          And the line is closed between Chambéry and Modane from 11 September to 9 October
          2026
        </strong>
        , while a new platform linked to the Lyon-Turin works is brought into service.
      </p>

      <h3>By car, through the Fréjus tunnel</h3>
      <p>
        Fastest and most dependable in any season: about twenty minutes down to Saint-Jean,
        then the A43 to Modane, the 12.8 km of tunnel, and the A32 which drops you into
        Turin. Roughly two hours door to door.
      </p>
      <p>
        The tunnel is tolled, on both sides, and the rate changes every year — check with
        SFTRF. Return formulas exist and are worth it as soon as you come back within a few
        days.
      </p>

      <h3>By car, over the Col du Mont-Cenis — in summer</h3>
      <p>
        The route you take for its own sake. The pass tops out at{" "}
        <strong>2,081 metres</strong>, it is <strong>free</strong>, and it opens at the top
        onto a vast turquoise reservoir lake that is one of the most dramatic landscapes in
        the Alps. From Lanslebourg to Susa, some forty kilometres of hairpins, under an
        hour.
      </p>
      <p>
        It is open only from <strong>mid-May to mid-November</strong>. Allow a good hour
        more than the tunnel, and treat the drive as part of the day out.
      </p>

      <div className="facts">
        <p>
          <strong>Train</strong>: Saint-Jean-de-Maurienne → Turin, 134 km, 1 hr 56 min,
          direct
          <br />
          <strong>Car via the Fréjus</strong>: about 2 hrs from Albiez, tolled tunnel
          <br />
          <strong>Car via the Mont-Cenis</strong>: 2,081 m, free, open mid-May to
          mid-November
          <br />
          <strong>Note</strong>: rail line closed between Chambéry and Modane from 11
          September to 9 October 2026
        </p>
      </div>

      <h2>A day in Turin: what earns the trip</h2>
      <p>
        Turin is not Florence and does not try to be. It is a capital — of the kingdom of
        Savoy, then briefly of Italy — with everything that implies: ordered squares,
        palaces, and cafés you sit down in.
      </p>
      <ul>
        <li>
          <strong>The Egyptian Museum</strong>: the oldest museum in the world devoted to
          Egypt, and one of the richest after Cairo. On its own it justifies the journey.
          Book ahead, the queue is long.
        </li>
        <li>
          <strong>The Mole Antonelliana</strong> and its National Cinema Museum, in a
          building that resembles nothing else. The panoramic lift rises to the viewing
          deck, above the roofs and facing the Alps — the ones you have just crossed.
        </li>
        <li>
          <strong>Palazzo Reale and Piazza Castello</strong>, the seat of Savoyard power,
          from which the great arcaded avenues radiate.
        </li>
        <li>
          <strong>The arcades</strong>, indeed: eighteen kilometres of covered galleries.
          Raining? It changes nothing.
        </li>
        <li>
          <strong>The historic cafés</strong> around Piazza San Carlo, and the{" "}
          <em>bicerin</em> — coffee, chocolate and cream in three layers you do not stir.
          Turin is the city of gianduja; that is not tourist folklore, it is an industry.
        </li>
      </ul>
      <p>
        If you have a second day: the Basilica of Superga on its hill, or the Venaria Reale
        and its gardens, on the outskirts.
      </p>

      <h2>Two practical warnings</h2>
      <p>
        <strong>Central Turin is a limited traffic zone</strong> (ZTL), active on weekday
        mornings. A car entering without a permit is fined automatically, and the fine
        arrives months later. Park on the edge and finish by metro — or take the train,
        which settles the matter.
      </p>
      <p>
        <strong>Italian motorways are ticket-tolled</strong>, as in France. Bring a card
        that works at the barriers.
      </p>

      <h2>Albiez as a first stop</h2>
      <p>
        It is a pattern we see often: a few days in the mountains to begin with, then the
        descent into Piedmont. The order has its logic — you acclimatise to altitude and
        quiet before the city rather than the reverse, and the road only goes downhill.
      </p>
      <p>
        In that direction Turin is not only a destination but a gateway: its airport, its
        trains to Milan, Liguria two hours further on. Albiez is the last village before the
        border where you still sleep in silence.
      </p>
      <p>
        For the rest of the stay, see our <Link href="/en/guide">Albiez guide</Link>, and
        the <Link href="/en/summer">summer</Link> and <Link href="/en/ski">ski</Link> pages
        depending on the season.
      </p>
    </>
  );
}
