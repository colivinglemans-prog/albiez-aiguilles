import Link from "next/link";
import ArticleImage from "@/lib/blog/ArticleImage";

/*
 * Sources checked on 8 November 2026 (tourist office listings and Mustang's terms and
 * conditions): see the French version for the list and the figures left out.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Once the pistes have closed, the evening can carry on outdoors. In Albiez, four
        guided outings take place at nightfall: riding a snowmobile, reaching an igloo by
        sledge, snowmobiling followed by fondue at a restaurant, or riding an electric fat
        bike. Three of them leave from the Mollard, a few minutes' walk from the apartment.
      </p>

      <h2>Who runs what</h2>
      <ul>
        <li>
          <strong>Snowmobiling, igloo evening, snowmobile and restaurant evening, trapper
          evening</strong>: Mustang, the resort's ski hire shop, with two shops open all
          year round. <strong>Mustang 1650 (Skiset)</strong> is right at the foot of the
          slopes in the Mollard, near the apartment; <strong>Mustang 1550
          (Skimium)</strong>, the resort's largest sports shop since 1980, is in the
          Chef-lieu, near place Opinel.
        </li>
        <li>
          <strong>Fat bike</strong>: the Albiez ESF, leaving from the ESF chalet in the
          Chef-lieu.
        </li>
      </ul>
      <p>
        All these outings run from <strong>19 December 2026 to 21 March 2027</strong>, on
        booking. The tourist office states that times are not guaranteed: the programme may
        change with the weather or the snow conditions.
      </p>

      <h2>Riding a snowmobile</h2>
      <p>
        After a briefing, you take the handlebars yourself and follow the guide on a
        reserved 4-hectare circuit, facing the Aiguilles d'Arves. Groups are 5 people at
        most. Two on the same machine, driver and passenger can swap places halfway round.
      </p>
      <ul>
        <li>
          <strong>How it goes</strong>: welcome and briefing 10 to 15 min, riding 30 to
          35 min, return and kit removal 10 to 15 min.
        </li>
        <li>
          <strong>Departures</strong>: 6 pm, 7 pm, 8 pm, 9 pm and 10 pm, every day. Taster
          rides are listed from 5:30 pm.
        </li>
        <li>
          <strong>To drive</strong>: aged 18 or over with a car driving licence (permis B),
          according to Mustang's terms and conditions. The helmet provided is compulsory.
        </li>
        <li>
          <strong>Passenger</strong>: 1.30 m minimum, able to put their feet on the
          footrests and hold on to the driver.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Departure</strong>: at the foot of the slopes in the Mollard, 125 rue du
          Ravarin, about 250 m from the apartment
          <br />
          <strong>Prices</strong> (Mustang's terms and conditions): €75 per snowmobile, €35
          for a passenger behind the guide, €10 per child for a taster ride
          <br />
          <strong>Deposit</strong>: €1,000, by bank card pre-authorisation at the Mustang
          1550 or 1650 shop (open 9 am to 7 pm)
          <br />
          <strong>Booking</strong>: Mustang Mollard{" "}
          <a href="tel:+33786344212">+33 7 86 34 42 12</a>, Mustang Chef-lieu{" "}
          <a href="tel:+33788439696">+33 7 88 43 96 96</a>
        </p>
      </div>
      <p>
        Read the terms before booking: according to Mustang, a snowmobile outing can be{" "}
        <strong>neither cancelled nor postponed</strong> by the customer, and the booking
        only becomes effective with payment and the deposit, 24 hours before the outing.
        Only Mustang can cancel or reschedule, in particular in bad weather.
      </p>

      <h2>The Inuit igloo evening</h2>
      <p>
        This is the outing that suits everyone, children included, because nobody drives.
        You leave from the foot of the slopes in a <strong>sledge pulled by a
        snowmobile</strong>, on a reserved circuit. Then comes a short, easy walk through
        the woods to the igloo, where everyone is served a hearty aperitif of local
        produce, with a view of the Aiguilles d'Arves and mont Émy. The guide tells the
        story of the village, then the sledge brings the group back to the resort, after
        dark.
      </p>
      <ul>
        <li>
          The tourist office describes it as suitable for all ages. Elderly people or those
          with reduced mobility can be dropped off right at the igloo.
        </li>
        <li>
          Special menus and dietary requirements catered for on request: mention it when
          booking.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Departure</strong>: at the foot of the slopes in the Mollard, about 250 m
          from the apartment
          <br />
          <strong>Times</strong>: two sessions per evening, 6:30 pm - 8 pm or 8:30 pm -
          10 pm, every day
          <br />
          <strong>Duration</strong>: 1 hour 30
          <br />
          <strong>Prices</strong>: €59 from age 11, €49 for under-11s
          <br />
          <strong>Booking</strong>:{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          ("Soirée Inuit Igloo"), or by phone, Mustang Mollard{" "}
          <a href="tel:+33786344212">+33 7 86 34 42 12</a>
        </p>
      </div>
      <p>
        For this evening, Mustang's terms provide that any cancellation less than 24 hours
        ahead is charged in full. Minors must be accompanied by a responsible adult.
      </p>

      <h2>The Eskimo evening: snowmobile and restaurant</h2>
      <p>
        The long version, <strong>on Wednesdays only</strong>. An introduction to riding on
        the same 4-hectare circuit, then dinner in a Savoyard restaurant at the foot of the
        pistes, chosen by Mustang. The name of the restaurant is not published.
      </p>
      <ul>
        <li>
          <strong>On the menu</strong>: kir as an aperitif, a choice of fondue or raclette
          with cured meats and salad, a choice of dessert.
        </li>
        <li>
          <strong>As a pair</strong>, driver and passenger swap halfway round.
        </li>
        <li>
          <strong>Driver</strong>: 18 minimum; <strong>passenger</strong>: 1.30 m minimum.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>When</strong>: Wednesdays, 7 pm to 10 pm
          <br />
          <strong>Meeting point</strong>: according to the tourist office, at the Mustang
          1550 shop, in the Chef-lieu; have it confirmed when booking
          <br />
          <strong>Prices</strong>: €130 solo, €175 as a pair (one snowmobile for two),
          snowmobile outing and meal included
          <br />
          <strong>Booking</strong>:{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          ("Soirée Eskimo"), or Mustang 1650 in the Mollard{" "}
          <a href="tel:+33786344212">+33 7 86 34 42 12</a> (failing that, Mustang 1550:{" "}
          <a href="tel:+33788439696">+33 7 88 43 96 96</a>)
        </p>
      </div>

      <h2>Electric fat biking at night, with the ESF</h2>
      <p>
        A fat bike is a mountain bike with very wide tyres; this one has powerful electric
        assistance and lights. The outing follows the Albiez trails at nightfall, led by
        Arnaud, a qualified instructor, in groups of 6 at most.
      </p>
      <ul>
        <li>
          <strong>Minimum height</strong>: 1.40 m. No minimum age is given.
        </li>
        <li>
          <strong>Clothing</strong>: ski clothing, snow boots or walking shoes, gloves (to
          change gear and control the motor). A ski helmet is recommended.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Departure</strong>: ESF chalet in the Chef-lieu, 97 chemin de la Rua,
          about 2 km from the apartment
          <br />
          <strong>Times</strong>: 5:30 pm - 7 pm, every day
          <br />
          <strong>Price</strong>: on request
          <br />
          <strong>Booking</strong>: ESF, Chef-lieu office{" "}
          <a href="tel:+33479593177">+33 4 79 59 31 77</a>
        </p>
      </div>
      <p>
        The fat bike rides on the trails; the{" "}
        <Link href="/en/guide/sunset-ride-albiez-vtt-pistes">Sunset Ride des Aiguilles</Link>,
        on the other hand, goes down the pistes on electric mountain bikes after Thursday's
        last chairlift. They are two different outings, with two different organisers.
      </p>

      <h2>And the trapper evening</h2>
      <ArticleImage
        src="blog/soiree-trappeur-mustang.jpg"
        alt="Food grilling on a wood-fired plancha at night, during the trapper evening"
        caption="Mustang's trapper evening. Photo: Mustang Albiez."
      />
      <p>
        On Wednesday and Thursday evenings, Mustang also offers a snowshoe evening: shuttle
        from Albiez to Montrond, a climb of about 45 minutes with a mountain leader up to
        the Broue alpine chalet (1,800 m), a hearty aperitif around the braziers, then a
        3 km sledge descent by headtorch. Departure at 6 pm, back around 10:30 pm. From
        age 8, 4 to 7 people, €99 per adult and €79 for under-11s, on{" "}
        <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
          mustangsport.lokki.rent
        </a>
        . No snowmobile in this one.
      </p>

      <h2>Which one to choose</h2>
      <ul>
        <li>
          <strong>With young children</strong>: the igloo evening, the only one open to all
          ages, and leaving from the Mollard.
        </li>
        <li>
          <strong>Adults looking for thrills</strong>: the snowmobile on its own, or the
          Eskimo evening if you want to dine out on Wednesday.
        </li>
        <li>
          <strong>With teenagers over 1.40 m</strong>: the fat bike. They cannot drive a
          snowmobile before 18, only ride behind.
        </li>
        <li>
          <strong>To walk a little</strong>: the trapper evening.
        </li>
      </ul>
      <p>
        The youngest can also enjoy{" "}
        <Link href="/en/guide/chiens-de-traineau-albiez">husky sledding</Link> at the
        Contamines, during the day, and the{" "}
        <Link href="/en/guide/albiez-c-show">Albiez C'Show</Link> on Tuesday evenings during
        the school holidays, free. More ideas in{" "}
        <Link href="/en/guide/albiez-en-famille">Albiez with children</Link>.
      </p>

      <h2>Book before your stay</h2>
      <p>
        Groups are small: 5 people per snowmobile departure, 6 for the fat bike, a single
        Eskimo evening per week. During a school-holiday week, book at the same time as your{" "}
        <Link href="/en/guide/louer-ses-skis-a-albiez">skis</Link> and{" "}
        <Link href="/en/guide/cours-de-ski-esf-albiez">lessons</Link>. Dress as you would
        for skiing: in the evening, at 1,600 m, it gets very cold very quickly.
      </p>
      <p>
        These activities depend on the weather and the snow, and their times may change. If
        in doubt, call the provider or the tourist office on{" "}
        <a href="tel:+33479593048">+33 4 79 59 30 48</a>.
      </p>

      <p>
        See also: <Link href="/en/guide/chiens-de-traineau-albiez">husky sledding</Link>,{" "}
        <Link href="/en/guide/sunset-ride-albiez-vtt-pistes">
          the Sunset Ride on e-mountain bikes down the pistes
        </Link>
        , <Link href="/en/guide/albiez-en-famille">Albiez with children</Link> and{" "}
        <Link href="/en/ski">the winter page</Link>.
      </p>
    </>
  );
}
