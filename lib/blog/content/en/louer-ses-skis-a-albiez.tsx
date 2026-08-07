import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond has four ski hire shops: three on the Mollard snow front, 250 m from
        the apartment, and one in the village centre. All of them offer a discount if you
        book online before you arrive. Here is what each one covers.
      </p>

      <h2>On the Mollard snow front (250 m from the apartment)</h2>

      <h3>Sport 2000 Aux Deux Frères — the one we use</h3>
      <p>
        <strong>This is where we hire our own equipment</strong>, and it is the one we
        recommend first. Good advice, a good welcome, and everything sorted on the spot
        without going further into the resort.
      </p>
      <p>
        The largest of the three: <strong>135 m²</strong> of hire, servicing and retail
        space (equipment, accessories, clothing). The catalogue is broad — alpine skis,
        freeride skis, touring skis, cross-country skis, snowboards, snowshoes, boots, adult
        sledges, snowscoots, child carriers.
      </p>
      <p>
        This is the address to remember if you are after something slightly unusual, or if
        you need to kit out a whole group with differing needs.
      </p>
      <div className="facts">
        <p>
          <strong>Book online</strong> —{" "}
          <a href={PROPERTY.links.skiRental} target="_blank" rel="noopener noreferrer">
            location-ski.sport2000.fr — Aux Deux Frères
          </a>
          <br />
          The online rate is better than the counter price, and all that is left to do in
          the shop is the boot fitting.
        </p>
      </div>

      <h3>Skiset Ski Attitude</h3>
      <p>
        The closest Skiset to the apartment. Ski and snowboard hire and servicing, with a
        retail space: ski equipment in winter, hiking gear in summer. Worthwhile discount
        for online bookings.
      </p>

      <h3>Skimium — Mustang Sports</h3>
      <p>
        Based in the village centre but present on the Mollard snow front in the evening,
        which makes it a practical option on the way back from the slopes. Beyond skiing,
        Mustang Sports offers snowmobiling, igloo evenings, a cycling school and electric
        mountain bikes.
      </p>

      <h2>In the village centre (2 km)</h2>

      <h3>Skiset — Albiez Sports</h3>
      <p>
        A <strong>100 m²</strong> retail space, ski hire and servicing. It is also the shop
        to know in summer: BMX bikes, e-scooters and guided rides.
      </p>

      <h2>Booking online: the one real tip</h2>
      <p>
        All four shops apply a discount to bookings made online before arrival. Over a week
        for four to six people, the gap is not trivial — and the benefit is twofold:
      </p>
      <ul>
        <li>
          <strong>The price</strong>, lower in every case.
        </li>
        <li>
          <strong>The time</strong>: on the first day of a holiday, the queue in the hire
          shop is the worst moment of the week. Equipment reserved means a quick stop for
          boot fitting and nothing more.
        </li>
      </ul>
      <p>
        The same logic applies to lift passes: they can be bought together with{" "}
        <Link href="/en/guide/cours-de-ski-esf-albiez">ski lessons</Link>, or ordered
        online and posted to you, which avoids the first-morning scramble.
      </p>

      <h2>What genuinely has to be decided in person</h2>
      <p>
        The only things that really need the shop are boots — one fitting beats any size
        chart — and binding settings, which need your weight and your level. Allow twenty
        minutes, not a morning.
      </p>

      <p>
        See also:{" "}
        <Link href="/en/guide/domaine-skiable-albiez-secteur-mollard">
          skiing Albiez from the Mollard sector
        </Link>{" "}
        and <Link href="/en/ski">the winter page</Link>.
      </p>
    </>
  );
}
