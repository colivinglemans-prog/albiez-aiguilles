import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        300 Meter von der Wohnung bietet Le Kavalkada an, die Berge zu Pferd oder auf dem Pony zu
        entdecken: Wälder, Almen, Wiesen. Ausritte, Unterricht auf dem Reitplatz, Wochenkurse – geleitet
        von staatlich geprüften Lehrkräften.
      </p>

      <h2>Die Angebote</h2>

      <h3>Für die Kleinsten — 30 Min. oder 1 Std.</h3>
      <p>
        Ponyausritte von einer halben oder einer ganzen Stunde <strong>rund um den Châtel</strong>, also
        direkt oberhalb der Wohnung. Das ideale Format für einen ersten Kontakt: kurz genug, um die
        Aufmerksamkeit zu halten, lang genug, um ein richtiger Ausflug zu sein.
      </p>
      <p>
        Der Ausritt folgt dem <strong>Rundweg um den Châtel</strong>, und die Residenz Le Hameau des
        Aiguilles steht an der Flanke des Châtel: konkret{" "}
        <strong>führt die Runde am Chalet vorbei</strong>. Man kann die Kinder also vom Balkon aus
        vorbeireiten sehen und in wenigen Minuten zu Fuß zu ihnen gehen.
      </p>
      <p>
        Es ist übrigens auch zu Fuß{" "}
        <strong>der einfachste und leichteste Spaziergang ab dem Chalet</strong> – der Ausgangspunkt für
        alles andere, beschrieben in unserem Führer der{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">markierten Wanderungen von Albiez</Link>.
      </p>

      <h3>Für die Geübteren — 1½ Std.</h3>
      <p>
        Ausritte über die Almen, <strong>am Fuß der{" "}
        <Link href="/de/guide/aiguilles-arves">Aiguilles d'Arves</Link></strong>. Die Kulisse macht den
        Unterschied.
      </p>

      <h3>Der halbe Tag</h3>
      <p>
        Ein Ritt über die <strong>Wiesen der Cochette</strong> und durch das Dorf Albiez. Derselbe Sektor
        wie{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">der Rundweg der Cochette</Link>, aus einer
        anderen Höhe gesehen.
      </p>

      <h3>Der Unterricht auf dem Reitplatz</h3>
      <p>
        Gruppenunterricht für alle Niveaus, Einführung und Vertiefung. Außerdem Einzelstunden, einzeln
        oder als Kurs.
      </p>

      <h3>Die Ponykurse über eine Woche</h3>
      <p>
        Der Betrieb nimmt den ganzen Sommer über Kinder und Ältere für Wochenkurse auf. Das ist das
        Angebot, das einen Familienaufenthalt strukturiert: die Kinder haben ihre Beschäftigung, die
        Erwachsenen haben ihre Vormittage.
      </p>

      <div className="facts">
        <p>
          <strong>Le Kavalkada</strong> — Reitbetrieb, 300 m von der Wohnung
          <br />
          <strong>Öffnungszeiten</strong> (vom 08.07. bis 31.08., Änderungen möglich): Montag, Dienstag,
          Mittwoch, Donnerstag, Freitag und Sonntag, von 9 bis 12 Uhr und von 14 bis 19 Uhr.{" "}
          <strong>Samstags geschlossen.</strong>
          <br />
          <strong>Betreuung</strong>: staatlich geprüfte Lehrkräfte — besondere Preise für Gruppen
        </p>
      </div>

      <h2>Ein zweiter Reitbetrieb am Pass</h2>
      <p>
        Auch der <Link href="/de/guide/col-du-mollard-velo">Col du Mollard</Link> hat einen Reitbetrieb
        mit Reithalle, im Sommer in Betrieb. Er liegt direkt neben dem Freizeitgelände des Passes
        (Badesee, Planschbecken, Boulebahn, Spiel- und Picknickplatz) – genug, um einen halben Tag am
        selben Ort zu verbringen.
      </p>

      <h2>Samstags geschlossen: einzuplanen</h2>
      <p>
        Der Samstag ist in den meisten Ferienwohnungen des Orts An- und Abreisetag, und genau da hat Le
        Kavalkada zu. Auf einer Woche von Samstag zu Samstag bleiben sechs nutzbare Tage: das genügt,
        solange man nicht mit dem ersten rechnet.
      </p>

      <p>
        Die anderen Sommeraktivitäten, wenige Hundert Meter entfernt:{" "}
        <Link href="/de/guide/lac-du-mollard-baignade">der See am Mollard</Link> und{" "}
        <Link href="/de/guide/bmx-vtt-trottinette-albiez">die BMX-Bahn</Link>. Das vollständige Programm
        steht auf <Link href="/de/sommer">der Sommerseite der Wohnung</Link>.
      </p>
    </>
  );
}
