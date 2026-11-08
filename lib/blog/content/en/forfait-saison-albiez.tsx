import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * 2026-2027 prices, taken on 8 November 2026 from station-albiez.com (home page and
 * /fr/tarifs2). See the French version for the yearly update note.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Until <strong>2 December 2026 at 11:59 pm</strong>, the Albiez resort sells its
        season pass at half price: €249 for an adult instead of €497. The ski area is open
        from Saturday 19 December 2026 to Sunday 21 March 2027. The question is how many
        days it takes to pay off — the day and week prices answer it.
      </p>

      <h2>2026-2027 season pass prices</h2>
      <ul>
        <li>
          <strong>Adult</strong> (12 to 64): <strong>€249</strong> instead of €497
        </li>
        <li>
          <strong>Child</strong> (5 to 11): <strong>€178</strong> instead of €355
        </li>
        <li>
          <strong>Senior</strong> (65 to 74): <strong>€228</strong> instead of €457
        </li>
        <li>
          <strong>Under 5 and 75 and over</strong>: free pass, to collect at the ticket
          office with proof of age
        </li>
      </ul>
      <p>
        Note that a 12-year-old already pays the adult rate. The discount is applied
        automatically in the online basket until the deadline.
      </p>

      <h2>What to compare it with</h2>
      <p>The passes worth comparing, at adult / child / senior rates:</p>
      <ul>
        <li>
          <strong>Day</strong>: €32.50 / €27.50 / €30
        </li>
        <li>
          <strong>6 days</strong>: €177 / €140 / €158
        </li>
        <li>
          <strong>8 days</strong>: €215 / €168 / €192
        </li>
        <li>
          <strong>Weekend</strong> (Saturday and Sunday): €40.50 / €36.50 / €38.50
        </li>
        <li>
          <strong>Saturday</strong>: €14 for everyone if bought online before 00:00 on
          Wednesday (so by Tuesday night at the latest), €16 otherwise
        </li>
      </ul>

      <h2>When it pays off</h2>

      <h3>At the offer price: two weeks are enough</h3>
      <p>
        At €249, the adult pass is worth just under <strong>eight days</strong> at the full
        day rate. In practice:
      </p>
      <ul>
        <li>
          <strong>One week</strong> (6 days, €177): the season pass is not worth it.
        </li>
        <li>
          <strong>One week and a weekend</strong> (€177 + €40.50 = €217.50): still not.
        </li>
        <li>
          <strong>Two weeks</strong> (2 × €177 = €354): the season pass saves €105 per
          adult.
        </li>
        <li>
          <strong>Seven weekends</strong> (7 × €40.50 = €283.50): it pays off on the
          seventh — six weekends cost €243.
        </li>
      </ul>
      <p>
        The same logic holds for a child: €178 against €140 a week, so it pays off from
        the second week (€280). For a senior, €228 against €158 — same conclusion.
      </p>

      <h3>At full price: it takes three weeks</h3>
      <p>
        At €497, two weeks (€354) are no longer enough; it takes three (€531). The full
        price season pass is for people who practically live here. So the 2 December
        deadline is not a detail: it halves the break-even point.
      </p>

      <h3>When it is pointless: a single one-week stay</h3>
      <p>
        For <strong>a single stay</strong> of a week or a little more, the season pass does
        not pay off: eight days in a row cost €215 with the 8-day pass, nine days €247.50
        (8 days + one day), less than the €249 season pass. Beyond that, or as soon as your
        ski days are spread over several stays, it takes the lead again. And for a few odd Saturdays, the €14 online Saturday beats everything else.
      </p>

      <h2>For a family</h2>
      <p>
        The resort offers a <strong>6-day Family Pack</strong> (two adults and two young
        people aged 5 to 17) at €604 online — bought at least three days before the first
        day of skiing — and €619 at the ticket office. That is what to compare the season
        pass with:
      </p>
      <ul>
        <li>
          Two adults and two children aged 5 to 11 on the offer season pass: 2 × €249 + 2 ×
          €178 = <strong>€854</strong>.
        </li>
        <li>
          The same family on the Family Pack: €604 for one week,{" "}
          <strong>€1,208 for two</strong>.
        </li>
      </ul>
      <p>
        One week: the pack. Two weeks or more: the season pass, by just over €350. With two
        teenagers aged 12 to 17, counted as adults for the season pass (4 × €249 = €996),
        the conclusion does not change.
      </p>

      <h2>Before you order</h2>
      <ul>
        <li>
          A <strong>recent ID photo</strong> (no hat, no sunglasses) and{" "}
          <strong>proof of age</strong> are required when ordering, online or at the ticket
          office.
        </li>
        <li>
          The pass is on a hands-free card that can be topped up online. Collect it at the{" "}
          <strong>Chef-lieu</strong> or <strong>Mollard</strong> ticket office — the Mollard
          one is at the foot of the slopes, 250 m from the apartment.
        </li>
        <li>Carré Neige insurance is an optional extra in the basket.</li>
        <li>
          The resort's page puts an asterisk on "ski area" without saying what it covers.
          The season pass is valid on the Albiez ski area; for a day at{" "}
          <a href={PROPERTY.links.sybelles} target="_blank" rel="noopener noreferrer">
            Les Sybelles
          </a>
          , the resort sells a separate "5 days Albiez + 1 day Sybelles" pass (€200 adult, €166 child), with access via Saint-Jean-d'Arves.
        </li>
      </ul>
      <div className="facts">
        <p>
          <strong>Buy online</strong> —{" "}
          <a href={PROPERTY.links.resort} target="_blank" rel="noopener noreferrer">
            station-albiez.com
          </a>
          <br />
          The prices above are those shown by the resort on 8 November 2026: the amount in
          the basket is the one that counts.
        </p>
      </div>

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
