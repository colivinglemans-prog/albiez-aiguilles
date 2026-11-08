import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Planning article: it ties together the ESF lessons, ski hire and season pass articles
 * without repeating them. See the French version for the update note.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        A ski week in Albiez comes down to three bookings: lessons, equipment, lift pass.
        They do not fill up at the same pace. Taking them in the right order means avoiding
        the late-afternoon lesson, the first-morning queue and the full price.
      </p>

      <h2>1. ESF lessons, as soon as your dates are set</h2>
      <p>
        This is the booking that fills up fastest. During the school holidays, it is not so
        much places that run short as good time slots:{" "}
        <strong>the morning slots go first</strong>, and so do those of the Piou-Piou club
        (from 3½ years old), even faster in the Mollard than in the Chef-lieu. Group
        lessons run from Saturday to Saturday; only private lessons can be booked à la
        carte. A morning lesson with a rested child is worth more than a lesson at the end
        of the day.
      </p>
      <p>
        The only trap: choosing the <strong>Mollard meeting point</strong>, the one at the
        foot of the slopes 250 m from the apartment. The options by age are detailed in our
        article on{" "}
        <Link href="/en/guide/cours-de-ski-esf-albiez">ESF lessons in Albiez</Link>.
      </p>
      <p>
        No places left in the Mollard? There is still the{" "}
        <strong>Chef-lieu meeting point</strong>. You can get there by car, but for
        children who are no longer beginners, the most pleasant way is to go{" "}
        <strong>on skis</strong>: take the Échaux chairlift, at the foot of the slopes in
        the Mollard, and ski down to the meeting point. A warm-up before the lesson, and a
        run to ski with your children. You just need to leave the apartment a little
        earlier.
      </p>
      <p>
        The same goes for <strong>childcare for the little ones</strong>: the ESF
        childcare, the "Le Petit Montagnard" holiday club (4-12 years) during the
        holidays, the "Le Chat Perché" day nursery (3 months - 6 years). Places go fast
        there too: book them at the same time as the lessons. The details are in{" "}
        <Link href="/en/guide/albiez-en-famille">Albiez with children</Link>.
      </p>
      <p>
        The same logic applies to activities with time slots, such as{" "}
        <Link href="/en/guide/chiens-de-traineau-albiez">dog sledding</Link>: you fit them
        around the lessons, so straight after.
      </p>

      <h2>2. Equipment, online, a few weeks before</h2>
      <p>
        The resort's four hire shops — two at the foot of the slopes in the Mollard, 250 m
        away, and two in the Chef-lieu — give a discount to anyone who books online before
        arriving. Stock does not run short the way ESF slots do, but booking early has two
        advantages:
      </p>
      <ul>
        <li>
          <strong>the price</strong>: the online rate is lower than at the counter, and the
          hire shops often launch online promotions in autumn, reserved for registered
          customers: create an account on their website to receive them;
        </li>
        <li>
          <strong>the time</strong>: on site, all that is left is boot fitting and binding
          adjustment, about twenty minutes.
        </li>
      </ul>
      <p>
        Why after the lessons? Because the ESF times decide when you will go to the shop,
        and a child enrolled in Piou-Piou does not need the same equipment as a teenager in
        group lessons. Who hires what, and where: see{" "}
        <Link href="/en/guide/louer-ses-skis-a-albiez">hiring skis in Albiez</Link>.
      </p>

      <h2>3. The lift pass, last, but not too late</h2>
      <p>
        The lift pass never sells out. So you can leave it until the end, with two
        exceptions tied to dates:
      </p>
      <ul>
        <li>
          <strong>The season pass</strong> is half price online until{" "}
          <strong>2 December 2026 at 11:59 pm</strong>. It is only worth it from two weeks
          of skiing in the winter: if that is your case, it is the one to buy first, even
          before the lessons. The calculation is in our article{" "}
          <Link href="/en/guide/forfait-saison-albiez">when the season pass pays off</Link>
          .
        </li>
        <li>
          <strong>The 6-day Family Pack</strong> (two adults and two young people aged 5
          to 17) is cheaper online if bought at least three days before the first day of
          skiing.
        </li>
      </ul>
      <p>
        Otherwise, the lift pass can be bought together with the ESF lessons, or online on
        the resort's website. Allow one recent ID photo per skier and proof of age.
        Collection is at the Mollard ticket office, at the foot of the slopes, 250 m from
        the apartment.
      </p>

      <h2>What can wait until the last minute</h2>
      <p>
        Outside the school holidays, in January in particular, there are fewer people on
        the slopes and the pressure eases. The morning ESF slots remain the thing not to
        leave lying, but the rest can be decided more freely:
      </p>
      <ul>
        <li>
          <strong>the lift pass</strong>: by the day, day by day, depending on the weather;
        </li>
        <li>
          <strong>adult lessons</strong>, which can be added after a day or two on the
          slopes, once you have gauged your level;
        </li>
        <li>
          <strong>one-off outings</strong>, such as a day at Les Sybelles or an activity
          other than skiing.
        </li>
      </ul>
      <p>
        Equipment can wait too, but the online discount does require booking before you
        arrive: even in January, it is worth doing the week before. If you are still
        unsure about the dates of your stay, see{" "}
        <Link href="/en/guide/quelle-semaine-skier-albiez">
          which week to choose for skiing in Albiez
        </Link>
        .
      </p>

      <div className="facts">
        <p>
          <strong>As soon as the apartment is booked</strong>
          <br />
          — ESF lessons, Mollard meeting point, morning slots:{" "}
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
          <br />
          — Dog sledding or another activity with time slots, if you want one
          <br />
          — Season pass, only if you ski two weeks or more in the winter and before 2
          December 2026
          <br />
          — Baby kit to mention to the host, if needed
        </p>
        <p>
          <strong>A month before</strong>
          <br />
          — Equipment online, with everyone's shoe size, height and weight to hand:{" "}
          <a href={PROPERTY.links.skiRental} target="_blank" rel="noopener noreferrer">
            Sport 2000 Aux Deux Frères
          </a>{" "}
          or another hire shop in the resort
          <br />
          — Week passes or Family Pack online (at least three days before the first day of
          skiing for the pack):{" "}
          <a href={PROPERTY.links.resort} target="_blank" rel="noopener noreferrer">
            station-albiez.com
          </a>
          <br />
          — Recent ID photos and proof of age for the lift passes
          <br />
          — Winter tyres or chains: compulsory in Savoie from 1 November to 31 March (
          <Link href="/en/guide/pneus-neige-chaines-albiez">our article</Link>)
        </p>
        <p>
          <strong>The day before you leave</strong>
          <br />
          — ESF, hire and lift pass confirmations gathered on one phone
          <br />
          — Everyone's level, weight and shoe size noted for the binding adjustment
          <br />
          — Check-in at the apartment from 4 pm: the Mollard shop and ticket office are 250
          m away
        </p>
      </div>

      <p>
        See also:{" "}
        <Link href="/en/guide/domaine-skiable-albiez-secteur-mollard">
          skiing Albiez from the Mollard sector
        </Link>
        , <Link href="/en/guide/albiez-en-famille">Albiez-Montrond with children</Link>{" "}
        and <Link href="/en/ski">the apartment's winter page</Link>.
      </p>
    </>
  );
}
