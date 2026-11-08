import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond has four ski hire shops, split between the resort's two sectors:
        two at the foot of the slopes in the Mollard, 250 m from the apartment, and two in
        the Chef-lieu, the historic village. All of them offer a discount if you book online
        before you arrive. Here is what each one covers.
      </p>

      <h2>On the Mollard snow front (250 m from the apartment)</h2>

      <h3>Sport 2000 Aux Deux Frères — the one we use</h3>
      <p>
        <strong>This is where we hire our own equipment</strong>, and it is the one we
        recommend first. Good advice, a good welcome, and everything sorted on the spot
        without going further into the resort.
      </p>
      <p>
        <strong>135 m²</strong> of hire, servicing and retail
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

      <h3>Mustang 1650 — Skiset</h3>
      <p>
        The former Ski Attitude shop, taken over by Mustang, right at the foot of the slopes
        and open all year round. Ski and snowboard hire and sales, boot fitting with a 3D
        scanner (Bootdoc), servicing workshop: sharpening, waxing, adjustments. Discount
        when you book online.
      </p>
      <p>
        This is also where Mustang's outings are booked: snowmobiling, igloo and trapper
        evenings, the <Link href="/en/guide/sunset-ride-albiez-vtt-pistes">Sunset Ride</Link>{" "}
        on e-mountain bikes down the pistes. The details are in our article on{" "}
        <Link href="/en/guide/motoneige-igloo-albiez">snowmobiling and igloo evenings</Link>.
      </p>

      <h2>In the Chef-lieu (2 km)</h2>

      <h3>Mustang 1550 — Skimium</h3>
      <p>
        The resort's largest sports shop, open all year round since 1980, near place
        Opinel. Ski and snowboard hire and sales, ski and bike workshop, mountain bike and
        e-mountain bike hire. It works hand in hand with Mustang 1650: same outings, same
        team.
      </p>

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
        The hire shops often launch <strong>online promotions as early as autumn</strong>,
        well before the ski area opens, often reserved for registered customers: create an
        account on their website to receive them. It is the best time to book a
        school-holiday week. The order to follow between lessons, equipment and lift pass
        is in our article{" "}
        <Link href="/en/guide/reserver-ski-esf-en-avance">booking ahead</Link>.
      </p>
      <p>
        The same logic applies to lift passes: they can be bought together with{" "}
        <Link href="/en/guide/cours-de-ski-esf-albiez">ski lessons</Link>, or ordered
        online and posted to you, which avoids the first-morning scramble. If you come
        back several times in the winter, see{" "}
        <Link href="/en/guide/forfait-saison-albiez">when the season pass pays off</Link>.
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
