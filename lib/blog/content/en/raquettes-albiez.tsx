import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        You don't need to ski to make the most of the snow in Albiez. From the apartment in
        Le Mollard, there are three ways to go snowshoeing: on your own along the marked
        trails, on a guided outing with the ESF or a mountain leader, or in the evening, to
        walk up for dinner at a mountain chalet.
      </p>

      <h2>On your own, on the marked trails</h2>
      <p>
        Three of{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">Albiez's marked trails</Link> work
        on snowshoes. The times below are the walking times: you move more slowly in snow,
        so allow some margin.
      </p>

      <h3>The Plaigne trail, from Le Mollard</h3>
      <p>
        The handiest from the apartment: it starts to the right of the Échaux chairlift, on
        the car park opposite the Pierre aux fées holiday centre. An out-and-back with little
        climbing and a constant view of the Aiguilles d'Arves, the Montrond plateau, Mont Emy
        and the Grande Chible. The trail ends at the foot of a cross, opposite a picnic
        table.
      </p>
      <p>
        <strong>Don't go beyond the cross</strong>: further on, the gullies you would have to
        cross make the area potentially prone to avalanches.
      </p>
      <div className="facts">
        <p>
          <strong>Start</strong>: Échaux chairlift, Le Mollard ·{" "}
          <strong>Walking time</strong>: 2 h return · <strong>Climb</strong>: 200 m ·{" "}
          <strong>Distance</strong>: 5 km
        </p>
      </div>

      <h3>The Contamines loop, in the village centre</h3>
      <p>
        A very flat loop around the Contamines hillock, starting from rue Froide, opposite
        the Constantin bar-tobacconist. It is the shortest and easiest of the three. The
        trail is shared: in winter you will meet{" "}
        <Link href="/en/guide/chiens-de-traineau-albiez">dog-sled teams</Link> on it, so let
        them have the track. The village centre is lower than Le Mollard: early or late in
        the season, snow can be short there.
      </p>
      <div className="facts">
        <p>
          <strong>Start</strong>: rue Froide, village centre · <strong>Walking time</strong>:
          40 min · <strong>Climb</strong>: 37 m · <strong>Distance</strong>: 2.2 km
        </p>
      </div>

      <h3>The Montrond plateau, from Le Chalmieu</h3>
      <p>
        The big outing of the week, and a snowshoe and Nordic ski route in winter. It starts
        from the car park in the hamlet of Le Chalmieu, 7.5 km from the apartment (about 15
        minutes by car). The trail climbs towards the Relai TV and then Les Chabottes,
        right through the high pastures at the foot of the Aiguilles d'Arves, with
        viewpoint tables to name the peaks. Back the same way.
      </p>
      <div className="facts">
        <p>
          <strong>Start</strong>: Le Chalmieu car park (7.5 km) ·{" "}
          <strong>Walking time</strong>: 3 h 30 · <strong>Climb</strong>: 424 m
        </p>
      </div>

      <h3>And the Rival forest</h3>
      <p>
        The <Link href="/en/guide/foret-du-rival">Rival forest</Link>, which you drive
        through on the way up to the resort, can also be explored on snowshoes in winter,
        as long as you stay on the marked routes.
      </p>
      <p>
        The tourist office, in the village centre, sells route guides covering
        Albiez-Montrond and Albiez-le-Jeune. It is also where to ask about trail conditions
        before setting off.
      </p>

      <h2>On a guided outing</h2>

      <h3>With the ESF</h3>
      <p>
        The{" "}
        <Link href="/en/guide/cours-de-ski-esf-albiez">Albiez ESF ski school</Link> does more
        than ski lessons: it also runs snowshoe outings, led by an instructor who knows the
        local viewpoints and wildlife. In November 2026, its website listed:
      </p>
      <ul>
        <li>
          <strong>themed outings</strong> every week — forest, panorama and wildlife, a
          gourmet outing with a snack — most of them meeting at the Mollard ESF, 250 m from
          the apartment, with a minimum of five participants;
        </li>
        <li>
          a <strong>made-to-measure outing</strong>, every day, morning or afternoon, from
          four people: ideal for a family or a group of friends, at the group's own pace.
        </li>
      </ul>
      <p>
        Two things to know: <strong>snowshoe hire is not included</strong>, and the
        panorama outing uses the lifts, which means a lift pass (unless you walk up). Check
        this season's programme, days and times on{" "}
        <a href={PROPERTY.links.esf + "raquettes/"} target="_blank" rel="noopener noreferrer">
          esfalbiez.fr/raquettes
        </a>
        .
      </p>

      <h3>With a mountain leader</h3>
      <p>
        Yves Vionnet, a mountain leader based in Albiez, runs guided snowshoe walks in
        Albiez and beyond, focusing on wildlife, plants and local heritage. He works{" "}
        <strong>all year round</strong>, off-season included: the safest way to venture
        beyond the village trails when conditions change from one day to the next.
      </p>
      <div className="facts">
        <p>
          <strong>Albiez Randonnée Patrimoine — Yves Vionnet</strong>
          <br />
          <a href={PROPERTY.links.mountainGuide} target="_blank" rel="noopener noreferrer">
            albiezrandopatrimoine.com
          </a>
        </p>
      </div>

      <h3>In the evening: Mustang's trapper night</h3>
      <p>
        On Wednesday and Thursday evenings, Mustang takes small groups from Montrond up to
        the La Broue mountain chalet (1,800 m): about 45 minutes of snowshoeing with a
        mountain leader, a dinner-style aperitif around braziers, then a sledge ride down
        by headtorch. From age 8. Details in our article on{" "}
        <Link href="/en/guide/motoneige-igloo-albiez">snowmobiling and igloo evenings</Link>
        .
      </p>

      <h2>Hiring snowshoes</h2>
      <p>
        On the Mollard snow front, 250 m away, <strong>Sport 2000 Aux Deux Frères</strong> —
        where we hire our own equipment — has snowshoes in its range, as well as baby
        carriers. For the resort's other shops, ask on the spot. As with skis, booking
        online before you arrive costs less: see our article on{" "}
        <Link href="/en/guide/louer-ses-skis-a-albiez">hiring skis in Albiez</Link>.
      </p>
      <p>
        Back at the apartment, snowshoes and poles go in the{" "}
        <strong>private ski locker on the landing</strong>, right next to the front door.
      </p>

      <h2>Staying safe</h2>
      <ul>
        <li>
          <strong>Stay on the marked trails</strong>, and stop where they end: the Plaigne
          trail ends where it does for a reason.
        </li>
        <li>
          <strong>Ask before you go</strong>: the tourist office can tell you about trail
          conditions, and go with a professional if you want to leave the village trails.
        </li>
        <li>
          <strong>Share the track</strong>: dog sleds on the Contamines loop, Nordic skiers
          at Le Chalmieu.
        </li>
        <li>
          To understand avalanche risk, the ESF offers an{" "}
          <strong>introduction to avalanche transceivers</strong>: an hour that changes the
          way you look at the mountains.
        </li>
      </ul>

      <h2>With children</h2>
      <p>
        The Contamines loop, flat and short, is the best first try. For a made-to-measure
        ESF outing, a family of four is enough. The trapper night is open from age 8. And
        when legs get tired, the children's sledges (baby sledge included) are waiting in
        the ski locker, a stone's throw from the Mollard sledging slope. All the ideas for
        younger ones are in{" "}
        <Link href="/en/guide/albiez-en-famille">Albiez-Montrond with children</Link>.
      </p>

      <p>
        See also:{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">the marked walking trails</Link>,{" "}
        <Link href="/en/guide/ski-de-randonnee-albiez-debutant">
          getting started with ski touring
        </Link>{" "}
        and <Link href="/en/ski">the apartment's winter page</Link>.
      </p>
    </>
  );
}
