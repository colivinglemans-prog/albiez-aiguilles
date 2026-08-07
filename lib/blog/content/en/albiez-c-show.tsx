import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        The Albiez C'Show is the resort's night out: every Tuesday evening during the French
        school holidays, on the Mollard snow front. A torchlit descent, a piste-basher show,
        instructor demonstrations, fireworks and mulled wine. It is free or nearly, and it
        is 250 m from the apartment.
      </p>

      <h2>The programme</h2>

      <h3>The torchlit descent</h3>
      <p>
        Run by instructors from the{" "}
        <Link href="/en/guide/cours-de-ski-esf-albiez">French ski school</Link>, it is{" "}
        <strong>open to children and teenagers from "flocon" level upwards</strong>. Willing
        holidaymakers ski down alongside the instructors, torch in hand.
      </p>
      <p>
        Sign up on the spot and come properly dressed. The torch itself costs a few euros
        (around €5).
      </p>

      <h3>The demonstrations</h3>
      <p>
        A presentation and show by the <strong>piste bashers</strong> — watching those
        machines manoeuvre up close impresses adults as much as children — plus skiing
        demonstrations by the ski school instructors and the sports club.
      </p>

      <h3>The fireworks</h3>
      <p>A pyrotechnic display lighting up the resort at the end of the evening.</p>

      <h3>The drink</h3>
      <p>
        Mulled wine for adults, fruit juice for children, offered on arrival by the ski
        school.
      </p>

      <div className="facts">
        <p>
          <strong>When</strong>: every Tuesday evening during the school holidays
          <br />
          <strong>Where</strong>: the Mollard snow front, 250 m from the apartment
          <br />
          <strong>Price</strong>: free — only the torch is charged for (approx. €5)
          <br />
          <strong>Exact time</strong>: published each season by the tourist office and the
          ski school
        </p>
      </div>

      <h2>Why staying in the Mollard is a genuine advantage</h2>
      <p>
        The event is held <strong>on the Mollard snow front</strong>, 250 m from the
        apartment. In practice, that means:
      </p>
      <ul>
        <li>No car and no parking to find on a busy evening.</li>
        <li>
          A tired child can be back in bed in five minutes, without ruining anyone else's
          evening.
        </li>
        <li>
          The fireworks are perfectly visible from the{" "}
          <Link href="/en#appartement">balcony</Link> if you would rather stay warm.
        </li>
      </ul>

      <h2>Checking the times</h2>
      <p>
        Exact dates and times change from one season to the next — they follow the school
        holiday calendar, and darkness falls later towards the end of winter. The events
        programme is available at the Albiez-Montrond tourist office in the village centre,
        along with the resort map and the cinema listings.
      </p>

      <h2>The rest of the week</h2>
      <p>
        To round things out: the Mollard sledging run right beside the residence,{" "}
        <Link href="/en/guide/chiens-de-traineau-albiez">husky sledding</Link> at the
        Contamines, and the igloo evenings run by Mustang Sports.
      </p>
    </>
  );
}
