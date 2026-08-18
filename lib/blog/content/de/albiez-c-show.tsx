import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Die Albiez C'Show ist der Abend des Skigebiets: jeden Dienstagabend in den Schulferien,
        am Pistenzugang von Le Mollard. Fackelabfahrt, Pistenraupen-Show, Vorführungen der
        Skilehrer, Feuerwerk und Glühwein. Es ist kostenlos oder fast, und es liegt 250 m von
        der Wohnung.
      </p>

      <h2>Das Programm</h2>

      <h3>Die Fackelabfahrt</h3>
      <p>
        Sie wird von den Lehrkräften der{" "}
        <Link href="/de/guide/cours-de-ski-esf-albiez">französischen Skischule</Link> geleitet
        und ist <strong>für Kinder und Jugendliche ab dem Niveau „flocon“ offen</strong>. Wer
        will, fährt mit den Skilehrern hinunter, die Fackel in der Hand.
      </p>
      <p>
        Anmeldung vor Ort, ausgerüstet kommen. Die Fackel kostet ein paar Euro (rechnen Sie mit
        5 €).
      </p>

      <h3>Die Vorführungen</h3>
      <p>
        Präsentation und Show der <strong>Pistenraupen</strong> – diese Maschinen von nahem
        manövrieren zu sehen beeindruckt Erwachsene so sehr wie Kinder – und Skivorführungen der
        ESF-Lehrkräfte und des Sportclubs.
      </p>

      <h3>Das Feuerwerk</h3>
      <p>Ein pyrotechnisches Schauspiel, das den Ort am Ende des Abends erhellt.</p>

      <h3>Der Umtrunk</h3>
      <p>
        Glühwein für die Erwachsenen, Fruchtsaft für die Kinder, von der ESF im Ziel angeboten.
      </p>

      <div className="facts">
        <p>
          <strong>Wann</strong>: jeden Dienstagabend in den Schulferien
          <br />
          <strong>Wo</strong>: Pistenzugang von Le Mollard, 250 m von der Wohnung
          <br />
          <strong>Preis</strong>: kostenlos — nur die Fackel ist kostenpflichtig (≈ 5 €)
          <br />
          <strong>Genaue Uhrzeit</strong>: jede Saison von Tourismusbüro und ESF ausgehängt
        </p>
      </div>

      <h2>Warum es ein echter Vorteil ist, in Le Mollard zu wohnen</h2>
      <p>
        Die Veranstaltung findet <strong>am Pistenzugang von Le Mollard</strong> statt, 250 m von
        der Wohnung. In der Praxis heißt das:
      </p>
      <ul>
        <li>Kein Auto, kein Parkplatzsuchen an einem Abend mit viel Publikum.</li>
        <li>
          Ein müdes Kind kann in fünf Minuten ins Bett gehen, ohne den Abend der anderen zu
          verderben.
        </li>
        <li>
          Das Feuerwerk lässt sich vom{" "}
          <Link href="/de#appartement">Balkon</Link> aus sehr gut ansehen, wenn man lieber im
          Warmen bleibt.
        </li>
      </ul>

      <h2>Die Uhrzeiten prüfen</h2>
      <p>
        Die genauen Termine und Uhrzeiten wechseln von Saison zu Saison – sie folgen dem Kalender
        der Schulferien, und am Ende des Winters wird es später dunkel. Das Veranstaltungsprogramm
        ist im Tourismusbüro von Albiez-Montrond im Dorfkern erhältlich, wo man auch den Plan des
        Skigebiets und das Kinoprogramm findet.
      </p>

      <h2>Der Rest der Woche</h2>
      <p>
        Zur Ergänzung: die Rodelbahn am Mollard direkt neben der Residenz, die{" "}
        <Link href="/de/guide/chiens-de-traineau-albiez">Hundeschlitten</Link> in Les Contamines
        und die Igluabende von Mustang Sports.
      </p>
    </>
  );
}
