import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        The French ski school (ESF) of Albiez-Montrond covers every age, from the Piou-Piou
        club at 3½ years old to adult lessons. One detail matters more than all the others
        when booking: the resort has{" "}
        <strong>two meeting points</strong>, and if you are staying in the Mollard, the
        Mollard one is the one to pick.
      </p>

      <h2>The meeting-point trap</h2>
      <p>
        The Albiez ski school gathers its lessons in two sectors. If you are staying in the
        Mollard — which is the case for our apartment, 250 m from the snow front — you must
        select the <strong>ESF Mollard meeting point</strong> when booking. Getting it wrong
        means starting every morning with a car journey with children in ski boots. The kind
        of mistake that costs a week.
      </p>
      <p>
        That said, a fully booked Mollard is not a dead end:{" "}
        <strong>the village sector is reachable on skis</strong>. If your level allows it,
        take the Échaux chairlift and ski down to the village — you will be warmed up before
        the lesson even starts, which is more than can be said for those who arrive by car.
      </p>
      <p>
        The caveat matters: it assumes you can already ski down. For a Piou-Piou child or a
        complete beginner, the Mollard meeting point remains the only comfortable one — and
        the car the only fallback.
      </p>

      <h2>Lessons by age</h2>

      <h3>Piou-Piou club — from 3½</h3>
      <p>
        The snow garden takes children from three and a half, four or five years old
        depending on the option. <strong>Childcare</strong> can be added, usefully extending
        the cover beyond the lesson itself.
      </p>

      <h3>Children's lessons — 6 to 12</h3>
      <p>
        The classic option, again with optional additional childcare. This is the age at
        which the{" "}
        <Link href="/en/guide/domaine-skiable-albiez-secteur-mollard">
          Polytre drag lift
        </Link>{" "}
        comes into its own: several places to let go of the bar, with increasing difficulty.
      </p>

      <h3>Teens and young people — from 12</h3>
      <p>Separate groups, which avoids mixing a teenager with seven-year-olds.</p>

      <h3>Adult lessons</h3>
      <p>Group or private, whether you are starting again or trying to improve.</p>

      <h2>Beyond alpine skiing</h2>
      <p>
        The Albiez ski school also runs activities you would not expect from a ski school:
      </p>
      <ul>
        <li>
          <strong>Sit-skiing</strong>
        </li>
        <li>
          <strong>Snowshoeing</strong>
        </li>
        <li>
          <strong>Snake-gliss</strong> (linked sledge descents)
        </li>
        <li>
          <strong>Biathlon taster sessions</strong>
        </li>
        <li>
          <strong>Avalanche transceiver (DVA) search training</strong> — an hour that
          changes how you look at the mountain, even if you never leave the pistes
        </li>
        <li>
          <strong>Torchlit descents</strong>, notably during the{" "}
          <Link href="/en/guide/albiez-c-show">Albiez C'Show</Link>
        </li>
      </ul>

      <h2>Booking, and when</h2>
      <p>
        Book ski school <strong>early</strong>, for two reasons: availability, and above all
        the time slot. Morning slots go first, and a late-afternoon lesson with a tired
        five-year-old does not deliver the same results.
      </p>
      <p>
        Lift passes can be bought <strong>at the same time as the lessons</strong>, which
        removes one more queue on the first day. Alternatively, order them online and have
        them posted before you leave home.
      </p>

      <div className="facts">
        <p>
          <strong>ESF Albiez-Montrond</strong> — Mollard meeting point, 250 m from the
          apartment.{" "}
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
        </p>
      </div>

      <h2>And childcare for the youngest?</h2>
      <p>
        Beyond the ski school's own childcare, the resort has a holiday club and a day
        nursery — enough to cover children too young to ski. The detail is in our article{" "}
        <Link href="/en/guide/albiez-en-famille">Albiez-Montrond with children</Link>.
      </p>
    </>
  );
}
