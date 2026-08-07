import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        This is the activity everyone books too late. Albiez's husky sledding rides leave
        from the Contamines leisure area in the village centre, and the slots fill up well
        before the holidaymakers arrive.
      </p>

      <h2>What it is</h2>
      <p>
        Sitting in a sledge, you are pulled along by a full team. The musher explains how
        the dogs' work is organised — which one pulls, which one steers, how the team shares
        the effort — and the bond between musher and animals is the real surprise of the
        outing.
      </p>
      <p>
        Two formats: <strong>half an hour</strong> or <strong>one hour</strong>.
      </p>

      <div className="facts">
        <p>
          <strong>Departure</strong>: Contamines leisure area, Albiez-Montrond village
          centre
          <br />
          <strong>Season</strong>: 17/12 to 01/04, daily, subject to snow conditions
          <br />
          <strong>Prices</strong>: from €45 for adults, €40 for children
          <br />
          <strong>Booking</strong>: essential —{" "}
          <a href="tel:+33682759926">+33 6 82 75 99 26</a>
        </p>
      </div>

      <h2>Book as soon as your dates are set</h2>
      <p>
        That is the single most important point of this article. Booking is essential, and
        it is advised to book <strong>as early as possible</strong>. Over a school-holiday
        week, available slots disappear within days.
      </p>
      <p>
        The useful habit: book the sledge ride at the same time as{" "}
        <Link href="/en/guide/cours-de-ski-esf-albiez">ski lessons</Link> and{" "}
        <Link href="/en/guide/louer-ses-skis-a-albiez">equipment</Link> — that is, several
        weeks before departure.
      </p>

      <h2>Subject to snow conditions</h2>
      <p>
        The activity depends on snow on the ground, not just on the pistes: the village
        centre is lower than the Mollard. Early or late in the season, have a plan B —{" "}
        <Link href="/en/guide/randonnees-balisees-albiez">snowshoeing</Link>, the Mollard
        sledging run or the{" "}
        <Link href="/en/guide/albiez-c-show">Albiez C'Show</Link> on Tuesday evening.
      </p>

      <h2>On the same route</h2>
      <p>
        The <strong>Contamines loop</strong>, a 2.2 km circuit from Rue Froide, is a shared
        route: husky teams use it too, as do cyclists. Stay alert and leave them the track.
      </p>

      <h2>Other off-ski activities</h2>
      <p>
        Albiez also offers snowmobiling and igloo evenings (Skimium / Mustang Sports),
        snowshoeing and cross-country skiing. The hire shops are listed in our article on{" "}
        <Link href="/en/guide/louer-ses-skis-a-albiez">ski hire in Albiez-Montrond</Link>.
      </p>
    </>
  );
}
