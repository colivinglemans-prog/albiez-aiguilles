import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        What happens around Albiez through the year, sorted by{" "}
        <strong>real driving time</strong> rather than distance as the crow flies. In the
        mountains the two have nothing to do with each other: a village you can see from the
        balcony may take an hour, because you have to drop into the valley to climb back up
        somewhere else.
      </p>

      <h2>Without taking the car</h2>
      <p>
        Three events have their own article, because they are worth planning dates around:{" "}
        <Link href="/en/guide/celti-cimes-festival-albiez">Celti'Cimes</Link> in late July,{" "}
        <Link href="/en/guide/tradi-cimes-albiez">Tradi'Cimes</Link> in early August, and
        the{" "}
        <Link href="/en/guide/cross-triathlon-swimrun-albiez">
          cross triathlon and swimrun
        </Link>{" "}
        at the lake in mid-July.
      </p>
      <p>The rest of the village calendar:</p>
      <ul>
        <li>
          <strong>14 July</strong> — Bastille Day entertainment and a fire display.
        </li>
        <li>
          <strong>15 August</strong> — flea market and car boot sale, rides in vintage cars,
          village fair, pétanque tournament.
        </li>
        <li>
          <strong>Lantern-lit food walks</strong>, every week through the summer.
        </li>
        <li>
          <strong>Albie'z Night Fever</strong>, on Thursdays during the winter holidays:
          free concerts and dancing. Not to be confused with the Tuesday{" "}
          <Link href="/en/guide/albiez-c-show">Albiez C'Show</Link>, which is the torchlit
          descent.
        </li>
      </ul>

      <h2>Twenty minutes away — the Arves country</h2>
      <p>
        Saint-Sorlin-d'Arves is 12 km away over the Col du Mollard,{" "}
        <strong>without going back through the valley</strong>. That is what makes these
        three doable on a weekday evening.
      </p>
      <ul>
        <li>
          <strong>The Fête du Mouton</strong>, late July, <em>at the Col de la Croix de
          Fer</em> — a flock, its shepherd, a barbecue, an accordion. You climb to it from
          Albiez over the Mollard, staying high the whole way.
        </li>
        <li>
          <strong>The Saint-Sorlin village fête</strong> — Beaufort made the old way in the
          morning, tug of war, wood carving, sheep farming explained, alphorns, folk dancing
          and traditional dress.
        </li>
        <li>
          <strong>Instant Beaufort</strong> — guided tours of the dairy cooperative, meeting
          the PDO producers, tastings. The cooperative can be visited outside the event too:
          see our article on the{" "}
          <Link href="/en/guide/fromagerie-cooperative-beaufort-des-arves">
            Vallée des Arves dairy
          </Link>
          .
        </li>
      </ul>
      <p>
        On 15 August, Saint-Sorlin also has its clubs' fête and fireworks — the same evening
        as the Albiez village fair, so you have to choose.
      </p>

      <h2>Down in the valley — Saint-Jean-de-Maurienne</h2>
      <p>
        Twenty minutes downhill, 18 km. <strong>Le Charoc festival</strong> is held there in
        early June, on Place du Champ de Foire: rock, free entry, and close to ten thousand
        people over two evenings. The line-up leans on tribute bands — Blondie, Aerosmith,
        Scorpions and Foo Fighters have all had theirs.
      </p>
      <p>
        It falls in June, before the resort's summer season opens: a good excuse for an
        off-peak weekend, when the village is quiet and the passes are open.
      </p>

      <h2>Further than it looks</h2>
      <p>
        These three come up often in regional brochures. They are worth the trip, but not on
        a whim — here is the driving time you are not always given.
      </p>
      <ul>
        <li>
          <strong>Valloire Baroque</strong>, late July — a week of baroque and early music,
          more than fifteen events. You can almost see Valloire from here, but you have to
          go down to Saint-Jean and back up the Télégraphe:{" "}
          <strong>allow fifty minutes</strong>. An evening to plan, not to improvise.
        </li>
        <li>
          <strong>Les Fêtes Musicales de Savoie</strong>, mid-July to mid-August — some
          twenty travelling classical concerts, several in Maurienne villages. The drive
          depends entirely on the concert: check the venue before the date.
        </li>
        <li>
          <strong>La Grande Odyssée</strong>, in January — the great Alpine sled dog race.
          Its Maurienne stages are in the Haute-Maurienne, at Aussois, Bessans and Val
          Cenis: <strong>an hour and more</strong>. To see sled dogs without giving up the
          day, there are some{" "}
          <Link href="/en/guide/chiens-de-traineau-albiez">at Les Contamines</Link>, in the
          commune.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Albiez-Montrond</strong>: on foot
          <br />
          <strong>Saint-Sorlin-d'Arves</strong>: 12 km, 15 to 20 min over the Col du Mollard
          <br />
          <strong>Saint-Jean-de-Maurienne</strong>: 18 km, about twenty minutes
          <br />
          <strong>Valloire</strong>: about 50 min, via Saint-Jean and the Télégraphe
          <br />
          <strong>Haute-Maurienne</strong>: an hour and more
        </p>
      </div>

      <h2>Checking the dates</h2>
      <p>
        Dates move from year to year, and most of these only publish theirs in spring. The
        Albiez-Montrond tourist office, in the Chef-lieu, holds the season's programme —{" "}
        <strong>+33 4 79 59 30 48</strong>. It is also where you find the piste map and the
        village cinema listings.
      </p>
      <p>
        For everything else there is to do, see our <Link href="/en/summer">summer</Link>{" "}
        and <Link href="/en/ski">ski</Link> pages, or the whole{" "}
        <Link href="/en/guide">guide</Link>.
      </p>
    </>
  );
}
