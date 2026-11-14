import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Outside facts taken on 8 November 2026. See the French version for the sources and
 * the yearly update note (the Sherpa's reopening date changes every year).
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        In spring and autumn, Albiez-Montrond becomes a mountain village again. The lifts
        are stopped, some of the shops have pulled down the shutters, and there is hardly
        anyone on the trails. Here is what stays open, what does not, and how to organise
        a stay in the Mollard between two seasons.
      </p>

      <h2>What is closed</h2>
      <ul>
        <li>
          <strong>The ski lifts</strong>. The ski area runs from 19 December 2026 to 21
          March 2027. Before and after, the Échaux chairlift, 250 m from the apartment,
          does not operate.
        </li>
        <li>
          <strong>The Sherpa at the foot of the slopes</strong>, the shop closest to the
          apartment. Its listing says it opens 7 days a week "in season"; this year, it
          reopens on <strong>12 December</strong>. For spring, its closing date is not
          published: check before counting on it.
        </li>
        <li>
          <strong>The cheese cooperative's shop in Albiez</strong>: it is a seasonal shop,
          open in summer and winter only.
        </li>
        <li>
          Some of the <strong>restaurants</strong> (those that stay open are mostly on the
          Chef-lieu side: check before driving up), the ski hire shops and the ESF. Summer
          activities too: swimming at the{" "}
          <Link href="/en/guide/lac-du-mollard-baignade">Mollard lake</Link> is supervised
          in July and August only, and the{" "}
          <Link href="/en/guide/refuge-chalet-la-croe">Chalet d'la Croë refuge</Link> only
          opens from mid-June to mid-September.
        </li>
      </ul>

      <h2>What stays open</h2>

      <h3>The grocery in the Chef-lieu, every day of the year</h3>
      <p>
        The Sambuis Dufreney grocery, in the Chef-lieu, about 2 km from the apartment, is{" "}
        <strong>open every day of the year</strong>. General groceries, cheese and
        charcuterie cut to order, gas, hardware, first aid. Bread from the Moulin Valentin
        is delivered there every day: it is the way to get fresh bread out of season.
      </p>
      <div className="facts">
        <p>
          <strong>Épicerie Sambuis Dufreney</strong>, Chef-lieu
          <br />
          <strong>Opening hours</strong> (subject to change): every day from 7:30 am to
          12:30 pm and from 5 pm to 7 pm.
        </p>
      </div>

      <h3>The bakery, at weekends in spring</h3>
      <p>
        The{" "}
        <Link href="/en/guide/boulangerie-moulin-valentin-albiez">Moulin Valentin</Link>,
        in the Chef-lieu, opens every day in winter and summer. In spring, from 25 March
        to 25 June, it only opens on <strong>Saturday and Sunday</strong>. For autumn,
        call before going down: <a href="tel:+33479593397">+33 4 79 59 33 97</a>.
      </p>

      <h3>Saint-Jean-de-Maurienne, for the bulk of the shopping</h3>
      <p>
        Saint-Jean-de-Maurienne is on the way, <strong>18 km</strong> and 20 to 25 minutes
        from the apartment. Out of season, that is where to fill the boot{" "}
        <strong>before driving up</strong>: Carrefour Market (petrol station and
        launderette) and Lidl. The details are in our article{" "}
        <Link href="/en/guide/faire-ses-courses-a-albiez">food shopping in Albiez</Link>.
      </p>
      <p>
        For cheese, the Arves valley cooperative has a shop{" "}
        <strong>open all year round</strong> in the centre of Saint-Jean, 52 rue de la
        République.
      </p>
      <div className="facts">
        <p>
          <strong>Fromagerie Aux Produits Savoyards</strong> (Arves valley cooperative)
          <br />
          52 rue de la République, 73300 Saint-Jean-de-Maurienne ·{" "}
          <a href="tel:+33479642245">+33 4 79 64 22 45</a>
          <br />
          Monday to Saturday from 8:30 am to 12:30 pm and from 2:30 pm to 7 pm, Sunday
          from 9 am to 12 pm (hours shown by the{" "}
          <a href={PROPERTY.links.cheeseCoop} target="_blank" rel="noopener noreferrer">
            cooperative
          </a>
          , subject to change).
        </p>
      </div>

      <h2>The weather: expect cold, sometimes snow</h2>
      <p>
        At 1,600 m, nights are cold from autumn onwards, and still cool in spring. The
        apartment has <strong>electric heating you can adjust freely</strong>: turn it on
        as soon as you arrive if needed, without asking.
      </p>
      <p>
        The first snow can fall <strong>as early as mid-October</strong>, well before the
        ski area opens. In Savoie, winter tyres or chains are compulsory from{" "}
        <strong>1 November to 31 March</strong> (the loi Montagne). For a stay in October
        or April, it is better to have chains or snow socks in the boot. Everything is
        explained in our article{" "}
        <Link href="/en/guide/pneus-neige-chaines-albiez">
          winter tyres and snow chains for the drive up to Albiez
        </Link>
        .
      </p>

      <h2>What to do in spring and autumn</h2>

      <h3>Walking from the apartment</h3>
      <p>
        Several of the{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">waymarked walks</Link> can be
        done in any season as long as there is no snow:
      </p>
      <ul>
        <li>
          <strong>The Châtel cross</strong>, a 30-minute climb from the chemin du Châtel,
          behind the residence.
        </li>
        <li>
          <strong>The Mollard lake loop</strong>, 30 minutes, starting from the apartment,
          facing the Aiguilles d'Arves.
        </li>
        <li>
          <strong>The Contamines loop</strong> (40 min) and{" "}
          <strong>the Cochette loop</strong> (3 h), starting from the Chef-lieu.
        </li>
      </ul>
      <p>
        In spring, snow lingers on the heights for a long time. The Plaigne trail crosses
        avalanche-prone gullies: do not take it while there is snow on the ground.
      </p>

      <h3>The Rival forest</h3>
      <p>
        The <Link href="/en/guide/foret-du-rival">Rival forest</Link>, which you cross on
        the way up to the resort, is the shoulder-season outing. In spring, the streams are
        full and the waterfalls at their peak. In autumn, the colours, the mushrooms and
        the rutting of the red deer.
      </p>

      <h3>Going out with a guide</h3>
      <p>
        Yves Vionnet, a mountain leader based in Albiez, works{" "}
        <strong>all year round</strong>, off-season included: walks on foot or on
        snowshoes, wildlife, flora and heritage. It is the safest way to leave the village
        trails when conditions change from one day to the next.
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

      <h3>Looking at the Aiguilles d'Arves</h3>
      <p>
        The apartment's south-east-facing balcony looks out on the{" "}
        <Link href="/en/guide/aiguilles-arves">Aiguilles d'Arves</Link>. The col du Mollard
        and the lake loop offer the same view without effort. The climb to the Basse du
        Gerbier (2,578 m) is a summer route: out of season, snow and cold make it much
        more serious. Ask the guide for advice before setting off.
      </p>

      <h3>The col du Mollard by bike</h3>
      <p>
        The <Link href="/en/guide/col-du-mollard-velo">col du Mollard</Link> (1,638 m) is
        at the edge of the hamlet: a 17 km climb from Saint-Jean-de-Maurienne, and the
        finish is at your door. The higher passes, such as the Croix de Fer and the
        Glandon, are closed by snow for part of the year: check they are open before
        planning them. The bike can be locked on the covered landing or stored on the
        balcony (the ski locker is too small).
      </p>

      <h3>A day in Turin</h3>
      <p>
        Out of season, it makes a good outing:{" "}
        <Link href="/en/guide/turin-depuis-albiez">Turin</Link> is about 2 hours by car
        through the Fréjus tunnel, or 1 h 56 by direct train from Saint-Jean-de-Maurienne.
      </p>

      <h2>Peace and quiet, and shorter stays</h2>
      <p>
        Out of season, people come to Albiez for the peace: no queue at the car park, no
        noise, the trails to yourself. Prices are also often the lowest of the year.
      </p>
      <p>
        Stays are more flexible: <strong>generally 2 nights minimum</strong>, from 20 March
        to mid-December (except from 2 July to 20 August, when 3 nights are required). A
        long weekend is enough. Check-in is <strong>from 4 pm</strong>.
      </p>

      <div className="facts">
        <p>
          <strong>Book</strong> — real-time availability and prices on{" "}
          <Link href="/en#reserver">the apartment page</Link>.
          <br />
          <strong>Before driving up</strong>: shopping in Saint-Jean-de-Maurienne, chains
          or snow socks in the boot from October.
          <br />
          <strong>Tourist office</strong>:{" "}
          <a href="tel:+33479593048">+33 4 79 59 30 48</a>, reachable all year round.
        </p>
      </div>

      <p>
        See also:{" "}
        <Link href="/en/guide/quelle-semaine-skier-albiez">
          which week to choose for skiing in Albiez
        </Link>
        , <Link href="/en/summer">the summer page</Link> and{" "}
        <Link href="/en/ski">the apartment's winter page</Link>.
      </p>
    </>
  );
}
