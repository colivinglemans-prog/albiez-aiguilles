import Link from "next/link";
import { PROPERTY } from "@/lib/property";
import ArticleImage from "@/lib/blog/ArticleImage";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond has everything you need without going back down: a supermarket on
        the snow front, a grocery and a bakery in the village. But to reach Albiez you have
        to pass through Saint-Jean-de-Maurienne — and that is where the big shop belongs.
      </p>

      <h2>The sensible routine: the big shop in Saint-Jean, the rest in the village</h2>
      <p>
        Saint-Jean-de-Maurienne is on the way, roughly <strong>30 km</strong> and{" "}
        <strong>20 minutes</strong> from Albiez. It has a{" "}
        <strong>Carrefour Market</strong> (with a click-and-collect service, so you can
        order from home and load up in ten minutes) and a <strong>Lidl</strong>.
      </p>
      <p>
        Worth knowing: there is a <strong>petrol station and a laundrette</strong> at the
        Carrefour Market. Over a week with ski gear, the laundrette is not a detail.
      </p>
      <p>
        Once you are up there, the village shops cover everything else: bread, the things
        you forgot, cheese, aperitif supplies.
      </p>

      <h2>On the Mollard snow front — the Sherpa</h2>
      <p>
        This is <strong>the closest shop to the apartment</strong>, 250 m away, and it sits{" "}
        <strong>right on the snow front</strong>. That changes what it is for entirely: not
        a shop you plan a trip to, but a two-minute stop{" "}
        <strong>on your way back from the slopes</strong>, skis in hand, for tomorrow's
        bread or whatever dinner is missing.
      </p>
      <p>
        Groceries and household goods, with <strong>delivery available</strong>. On site: a
        bread counter, a butcher and charcuterie counter, cut-to-order cheese and regional
        produce.
      </p>
      <ArticleImage
        src="blog/sherpa-albiez-montrond-interieur.jpg"
        alt="Inside the Sherpa in Albiez-Montrond: the butcher and charcuterie counter and the grocery aisles"
        caption="The fresh counter at the Sherpa in Albiez-Montrond, on the Mollard snow front."
      />
      <div className="facts">
        <p>
          <strong>Opening hours</strong> — they vary by season and are kept up to date on
          the shop's own page:{" "}
          <a href={PROPERTY.links.sherpa} target="_blank" rel="noopener noreferrer">
            sherpa.net — Albiez-Montrond
          </a>
        </p>
      </div>
      <p>
        It is also the best address for taking home something you will not find in a
        supermarket:
      </p>
      <ul>
        <li>
          <strong>Sandrine's home-made dried beef sausages</strong>, made on the premises —
          the shop's speciality, and lethal with an aperitif.
        </li>
        <li>Buckwheat from Saint-Jean.</li>
        <li>Honey from an Albiez beekeeper.</li>
        <li>Beers from Modane and Valloire.</li>
        <li>Génépi from a small local distillery.</li>
      </ul>

      <h2>In the village — the Sambuis Dufreney grocery</h2>
      <p>
        A small grocery-cum-general store in the heart of the village, housed in what was
        once a farm, later converted into a traditional shop. This family business is{" "}
        <strong>open every day of the year</strong> — a sentence that means something in the
        mountains.
      </p>
      <p>
        You will find general groceries, cut charcuterie and cheese, regional produce, gas,
        hardware and first-aid supplies. Fresh bread from the{" "}
        <Link href="/en/guide/boulangerie-moulin-valentin-albiez">Moulin Valentin</Link> is
        delivered daily.
      </p>
      <div className="facts">
        <p>
          <strong>Opening hours</strong> (subject to change): every day 7.30 am to 12.30 pm,
          then 5 pm to 7 pm — and 4 pm to 7 pm from 3 July to 3 September.
        </p>
      </div>

      <h2>In the village — the bakery</h2>
      <p>
        Le Moulin Valentin sells bread, pastries, sweet tarts, hot and cold drinks, open
        sandwiches, quiches and sandwiches.{" "}
        <Link href="/en/guide/boulangerie-moulin-valentin-albiez">
          Its history deserves an article of its own.
        </Link>
      </p>

      <h2>Taking cheese home: the cooperative</h2>
      <p>
        To leave with something that extends the holiday, the stop is the{" "}
        <Link href="/en/guide/fromagerie-cooperative-beaufort-des-arves">
          Arves valley cooperative dairy
        </Link>
        , which has a shop in Albiez-Montrond. Their <strong>Beaufort AOP</strong> is
        excellent, and the range goes well beyond it: cheeses, charcuterie, jams, honey.
      </p>

      <h2>What to bring with you</h2>
      <p>
        A few consumables are not provided in the apartment and cost much less down in the
        valley: dishwasher tablets, 50 L bin bags, toilet paper and Nespresso capsules.
        Worth putting in the boot before driving up — the full list is on{" "}
        <Link href="/en#appartement">the apartment page</Link>.
      </p>
    </>
  );
}
