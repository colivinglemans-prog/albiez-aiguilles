import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Facts taken on 8 November 2026 from explore-maurienne.com and the tourist office's
 * PDF route guide. See the French version for the sources and caveats.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Ski touring means climbing under your own steam, with skins under your skis, then
        skiing back down. Albiez has two waymarked routes, one of which starts at the foot of
        the slopes in the Mollard, 250 m from the apartment, and which the tourist office
        presents as a first experience. Here is how to go about it if you have never done
        it before.
      </p>

      <h2>The level you need</h2>
      <p>
        The climb takes stamina more than technique. The descent, on the other hand, is on
        skis: for its outings, the ESF asks that you{" "}
        <strong>can ski down a red piste in all types of snow</strong>. That is a good
        benchmark before setting off, even on your own. For a skier who is still a beginner
        on the pistes, better to wait a season.
      </p>

      <h2>The two waymarked routes</h2>

      <h3>Climb to les Aplanes — the first outing, right by the apartment</h3>
      <p>
        Start at the <strong>foot of the slopes in the Mollard</strong> (1,619 m), 250 m on
        foot. The route runs alongside the ski area towards les Aplanes, over{" "}
        <strong>about 2 km</strong> and <strong>about 250 m of ascent</strong>. Allow{" "}
        <strong>1 hour 30</strong>. The climb goes through areas with little avalanche
        exposure, and the descent is by the pistes. At the top, a view of the Aiguilles
        d'Arves and the Étendard glacier.
      </p>
      <p>
        You do not climb to the top of the Aplanes drag lift (2,100 m): the route stops well
        below, and beyond that the ascent becomes much more demanding. That is what makes
        it a good introductory outing, to fit into a morning or at the end of a ski day, and
        one you can do with alpine skiers waiting for you at the top.
      </p>

      <h3>Climb to the Crêt de l'âne — a wilder sector</h3>
      <p>
        Start at the <strong>Crêt de l'âne car park</strong>, on the road to Albiez-le-Jeune
        (1,497 m). You need to drive there from the Mollard. The route is{" "}
        <strong>3.6 to 3.7 km</strong> long, with about <strong>400 m of ascent</strong>{" "}
        according to the tourist office's route guide, in <strong>2 hours 30</strong>. It
        zigzags up beneath the slopes of Casse Massion, over the former La Blanche sector,
        whose lift was dismantled in 2020. Few people, and a view of the north couloirs of
        mont Emy, the village and the Étendard glacier.
      </p>
      <p>
        Longer and steeper than les Aplanes: keep it for a second outing. To come back down,
        when this sector is open, you can ski to the bottom of the Crêt de l'âne chairlift.
        It is a low part of the ski area, which is not open all season: it all depends on
        the snow cover.
      </p>

      <div className="facts">
        <p>
          <strong>Routes</strong>: open every day, depending on snow and weather
          <br />
          <strong>Descent</strong>: by the pistes, only while the ski area is open
          (9 am - 5 pm)
          <br />
          <strong>Route guide and GPX track</strong>:{" "}
          <a
            href="https://www.explore-maurienne.com/activites/activites-neige/ski-de-rando/"
            target="_blank"
            rel="noopener noreferrer"
          >
            explore-maurienne.com
          </a>{" "}
          and the Explore Maurienne app
          <br />
          <strong>Tourist office</strong>:{" "}
          <a href="tel:+33479593048">+33 4 79 59 30 48</a>
        </p>
      </div>

      <h2>The rules on the ski area</h2>
      <p>The tourist office's route guide sums them up as follows:</p>
      <ul>
        <li>
          <strong>The climb follows the "ski de randonnée" waymarks</strong>, not the pistes.
        </li>
        <li>
          <strong>The descent is by the alpine ski pistes</strong>, during the ski area's
          opening hours, from 9 am to 5 pm.
        </li>
        <li>
          <strong>Outside these hours, the pistes are off limits</strong>, and at night even
          more so: that is when the piste bashers are out, sometimes held by a winch cable
          stretched across the slope. No climbing by headtorch on the pistes in the evening,
          quite simply so as not to meet a piste basher in the dark.
        </li>
      </ul>
      <p>
        The ski area is open from 19 December 2026 to 21 March 2027. Outside these dates,
        there are no more groomed pistes and no patrols for the descent.
      </p>

      <h2>Safety, even on a waymarked route</h2>
      <p>
        Both routes are <strong>waymarked but not secured</strong>: no preventive avalanche
        triggering is carried out on them. You are there at your own risk. Before each
        outing:
      </p>
      <ul>
        <li>
          Check the weather, the snow conditions and the{" "}
          <strong>avalanche risk bulletin</strong> (BRA); ask the ski patrol and follow
          their instructions.
        </li>
        <li>
          Take the minimum equipment: <strong>avalanche transceiver, shovel and probe</strong>,
          and know how to use them.
        </li>
        <li>
          Tell someone which route you are taking and what time you expect to be back. Do
          not get caught out by nightfall.
        </li>
        <li>Postpone the outing if the weather turns.</li>
        <li>
          In case of accident: <a href="tel:112">112</a>.
        </li>
      </ul>

      <h2>Equipment</h2>
      <p>
        You need touring skis with their bindings, skins, suitable boots and telescopic
        poles, plus the transceiver, shovel and probe trio. No need to buy for a first
        time: <strong>Sport 2000 Aux Deux Frères</strong>, at the foot of the slopes in the
        Mollard, 250 m away, hires out ski touring equipment. See{" "}
        <Link href="/en/guide/louer-ses-skis-a-albiez">hiring skis in Albiez</Link>; ask at
        the counter what is included in the hire.
      </p>
      <p>
        In the evening, the skis go into the private locker on the landing, right next to
        the apartment door.
      </p>

      <h2>Starting with a professional</h2>
      <p>
        That is the simplest option for a first time: you learn to fit the skins, to make a
        kick turn on a slope and to use a transceiver. Four options are on offer from
        Albiez.
      </p>

      <h3>Ski touring introduction with the ESF</h3>
      <p>
        To discover the equipment and how to use it: skins, transceiver, probe and shovel,
        orientation, controlled descent, starting with small ascents. Groups of{" "}
        <strong>2 to 6 people</strong>, safety equipment provided (transceiver, shovel,
        probe). The tourist office lists it from 19 December 2026 to 21 March 2027, every
        day from 3 pm to 5 pm or on request.
      </p>

      <h3>Tailor-made ski touring outing with the ESF</h3>
      <p>
        The logical next step, in wilder terrain, with a route chosen according to the
        weather and the group's level (<strong>3 to 6 people</strong>). Same level required,
        same safety equipment provided. Listed every day from 3 pm to 6 pm or on request,
        over the same period.
      </p>
      <p>
        Both ESF options leave from the ESF chalet in the Mollard, at the foot of the slopes,
        250 m from the apartment. The ESF website does not say whether touring skis are
        included: ask when booking.
      </p>
      <div className="facts">
        <p>
          <strong>ESF Albiez</strong> — price on request
          <br />
          Mollard office: <a href="tel:+33479593180">+33 4 79 59 31 80</a>
          <br />
          Chef-lieu office: <a href="tel:+33479593177">+33 4 79 59 31 77</a>
          <br />
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
        </p>
      </div>

      <h3>Lesson with Valentin Jullien, independent instructor</h3>
      <p>
        A day of ski touring for <strong>5 people at most</strong>, to discover or to
        practise, in Albiez, Les Sybelles, Les Karellis or elsewhere in the Maurienne.
        Listed every day from 19 December 2026 to 28 March 2027, or on request.
      </p>
      <div className="facts">
        <p>
          <strong>Valentin Jullien</strong> — price on request
          <br />
          <a href="tel:+33618092418">+33 6 18 09 24 18</a>
        </p>
      </div>

      <h3>Outing with Ludovic, high-mountain guide</h3>
      <p>
        Half-day or full day, on the valley's off-piste routes, with safety equipment
        provided (transceiver, shovel, probe). Better suited to a second or third outing,
        once you have the basics. On request, booking required.
      </p>
      <div className="facts">
        <p>
          <strong>Ludovic Gaboriaud, high-mountain guide</strong> — price on request
          <br />
          <a href="tel:+33613845277">+33 6 13 84 52 77</a>
        </p>
      </div>

      <p>
        The times published by the tourist office are not guaranteed and the programme may
        change: confirm with the provider or the tourist office (
        <a href="tel:+33479593048">+33 4 79 59 30 48</a>) before making plans.
      </p>

      <p>
        See also:{" "}
        <Link href="/en/guide/domaine-skiable-albiez-secteur-mollard">
          skiing Albiez from the Mollard sector
        </Link>
        , <Link href="/en/guide/louer-ses-skis-a-albiez">hiring skis in Albiez</Link>,{" "}
        <Link href="/en/guide/cours-de-ski-esf-albiez">ESF ski lessons</Link> and{" "}
        <Link href="/en/ski">the winter page</Link>.
      </p>
    </>
  );
}
