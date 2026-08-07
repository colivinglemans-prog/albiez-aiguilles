import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        The Rival forest climbs from 1,300 metres up to the Col du Mollard at 2,000 metres.
        Seven hundred metres of conifers, waterfalls and streams, crossed by footpaths and
        mountain-bike trails — and home to wildlife you genuinely meet.
      </p>

      <h2>Where it is</h2>
      <p>
        The forest spreads across several hamlets of the commune of Albiez-Montrond. It
        starts at the <strong>Collet d'en Haut</strong> and rises to the{" "}
        <Link href="/en/guide/col-du-mollard-velo">Col du Mollard</Link>, passing La
        Colonne, Le Fregny, La Villette and the village centre.
      </p>
      <p>
        In practice, it is the forest you drive through on the way up to the resort: you
        skirt it without really looking at it, when it deserves an outing of its own.
      </p>

      <h2>What you see</h2>
      <p>
        It is mainly made up of <strong>conifers</strong>, but it also holds a few{" "}
        <strong>waterfalls</strong>, and several streams cross it around La Colonne and La
        Villette.
      </p>
      <p>As for wildlife, the list is long and the encounters real:</p>
      <ul>
        <li>Red deer and hinds</li>
        <li>Roe deer</li>
        <li>Squirrels</li>
        <li>Foxes</li>
      </ul>
      <p>
        It is also full of <strong>mushrooms</strong> — in season you mostly meet locals,
        basket in hand and admirably discreet about their spots.
      </p>
      <p>
        In summer, <strong>herds of cattle</strong> graze its clearings. That is also where
        the valley's constant soundtrack of cowbells comes from.
      </p>

      <h2>Getting through it</h2>
      <p>
        Several <strong>walking paths</strong> and <strong>mountain-bike trails</strong>{" "}
        cross the forest. It can be walked in any season.
      </p>
      <p>
        <strong>One precaution</strong>: watch out for falling branches and trees,
        particularly after high winds or heavy snowfall. This is a mountain forest, not a
        managed park.
      </p>

      <h2>When to go</h2>
      <ul>
        <li>
          <strong>Spring</strong>: the streams are full and the waterfalls at their best.
        </li>
        <li>
          <strong>Summer</strong>: the shade of the conifers is precious when the plateau is
          baking, and the clearings hold the herds.
        </li>
        <li>
          <strong>Autumn</strong>: mushrooms, colour, and the roar of rutting stags.
        </li>
        <li>
          <strong>Winter</strong>: on snowshoes, sticking to the waymarked routes.
        </li>
      </ul>

      <h2>Going with a guide</h2>
      <p>
        Yves Vionnet, a mountain leader based in Albiez, runs guided outings on the wildlife,
        the plants and the local heritage — and he works{" "}
        <strong>all year round, off-season included</strong>. That is what turns a forest
        into a landscape you can read.
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

      <p>
        See also{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">
          six waymarked walks from Albiez-Montrond
        </Link>{" "}
        and <Link href="/en/summer">the summer page</Link>.
      </p>
    </>
  );
}
