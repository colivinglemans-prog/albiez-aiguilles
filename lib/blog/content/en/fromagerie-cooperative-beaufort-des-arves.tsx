import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        This is the essential stop for anyone who wants to take something home from the
        Maurienne — or simply to eat well while they are here. The Arves valley cooperative
        dairy makes a genuinely good Beaufort AOP, and it has a shop in Albiez-Montrond.
      </p>

      <h2>Who makes the cheese</h2>
      <p>
        The cooperative is based at Belluard, in{" "}
        <strong>Saint-Sorlin-d'Arves</strong>, on the far side of the massif. It collects
        milk from farms across the Arves valley and turns it into cheese on site.
      </p>
      <p>
        <strong>Beaufort AOP</strong> is made from <strong>raw, whole milk</strong>,
        collected from high pastures reaching up to <strong>2,500 metres</strong>, then
        matured for <strong>6 to 12 months</strong> in cool, humid cellars. The
        appellation is fifty years old, and the dairy holds a gold medal from the Paris
        agricultural show.
      </p>

      <h2>Summer or winter Beaufort: not the same cheese</h2>
      <p>
        This is the thing worth knowing before you reach the counter. Beaufort comes in{" "}
        <strong>two seasonal versions</strong>, depending on when the milk was collected:
      </p>
      <ul>
        <li>
          <strong>Summer Beaufort</strong> comes from high-pasture milk, when the cows graze
          at altitude on a very varied flora. It is deeper in colour, more aromatic, more
          complex.
        </li>
        <li>
          <strong>Winter Beaufort</strong> comes from milk produced down in the valley. It
          is milder and more consistent.
        </li>
      </ul>
      <p>
        Neither is "better" in absolute terms: the first is for eating as it is, the second
        works very well in cooking. Ask for both at the counter — they will let you taste
        them.
      </p>

      <h2>What else they sell</h2>
      <p>The shop does not stop at Beaufort. On the cheese side:</p>
      <ul>
        <li>
          <strong>Raclette de Savoie IGP</strong>, including a smoked version ("Brezain")
          and one with wild garlic
        </li>
        <li>
          <strong>Grated fondue blend, 100 % Beaufort AOP</strong> — the ready-made mix,
          which saves you balancing three cheeses yourself
        </li>
        <li>
          <strong>Tome des Bauges AOP</strong> and <strong>dairy Reblochon AOP</strong>
        </li>
        <li>
          <strong>Beurre des Arves</strong> butter
        </li>
      </ul>
      <p>
        Add charcuterie, jams and honey, and you can put together a full board without going
        anywhere else.
      </p>

      <h2>Why it matters when you are staying in Albiez</h2>
      <p>
        The apartment comes with a <strong>raclette grill, a fondue set, a pierrade stone
        and a crêpe maker</strong>. In other words, everything needed to turn a trip to the
        cooperative into that evening's dinner — and it is a long way better than a
        supermarket pack.
      </p>
      <p>
        The logic of the stay becomes simple: everyday{" "}
        <Link href="/en/guide/faire-ses-courses-a-albiez">food shopping</Link> at the Sherpa
        on the snow front or the Carrefour Market in Saint-Jean, and cheese at the
        cooperative.
      </p>

      <h2>Where to buy it</h2>
      <p>
        The cooperative runs <strong>eight shops</strong> across the region, two of them
        directly useful from Albiez:
      </p>
      <ul>
        <li>
          <strong>Albiez-Montrond</strong> — the closest, without leaving the commune.
        </li>
        <li>
          <strong>Saint-Jean-de-Maurienne</strong> — on the way, to combine with the big
          shop on your way up or down.
        </li>
      </ul>
      <p>
        The other six are at Saint-Sorlin-d'Arves (at the dairy itself), Le Corbier, La
        Toussuire, Saint-Michel-de-Maurienne, Valloire and the Col du Galibier — handy if
        you are passing through on a{" "}
        <Link href="/en/guide/col-du-mollard-velo">cycling day</Link>.
      </p>

      <h2>Having it delivered after your stay</h2>
      <p>
        The cooperative ships within mainland France (Corsica excluded). Orders are
        processed on <strong>Mondays</strong> and shipments leave by Chronofresh from{" "}
        <strong>Tuesday</strong>. Shipping is free above <strong>€100</strong>.
      </p>
      <p>
        It is the way to extend the holiday without overloading the boot — or to restock in
        December.
      </p>

      <div className="facts">
        <p>
          <strong>Fromagerie Coopérative de la vallée des Arves</strong>
          <br />
          Belluard, 73530 Saint-Sorlin-d'Arves, France
          <br />
          <a href="tel:+33479597016">+33 4 79 59 70 16</a> · boutique@beaufortdesarves.com
          <br />
          <a href={PROPERTY.links.cheeseCoop} target="_blank" rel="noopener noreferrer">
            beaufortdesarves.com
          </a>{" "}
          — addresses and opening hours for all eight shops, plus the online shop
        </p>
      </div>
    </>
  );
}
