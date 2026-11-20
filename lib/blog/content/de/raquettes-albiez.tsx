import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Man muss nicht Ski fahren können, um den Schnee in Albiez zu genießen. Von der
        Wohnung im Mollard aus gibt es drei Arten, mit Schneeschuhen loszuziehen: allein auf
        den markierten Routen, auf einer geführten Tour mit der ESF oder einem
        Bergwanderführer, oder abends, zum Abendessen auf einer Almhütte.
      </p>

      <h2>Allein, auf den markierten Routen</h2>
      <p>
        Drei der{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">markierten Wanderwege von Albiez</Link>{" "}
        sind mit Schneeschuhen machbar. Die Zeiten unten gelten für die Wanderung zu Fuß: Im
        Schnee kommt man langsamer voran, planen Sie also Reserve ein.
      </p>

      <h3>Der Sentier de la Plaigne, ab dem Mollard</h3>
      <p>
        Der praktischste von der Wohnung aus: Er beginnt rechts vom Sessellift Les Échaux,
        auf dem Parkplatz gegenüber dem Feriencenter Pierre aux fées. Hin und zurück auf
        demselben Weg, mit wenig Höhenunterschied und durchgehendem Blick auf die Aiguilles
        d'Arves, das Plateau von Montrond, den Mont Emy und die Grande Chible. Der Weg endet
        am Fuß eines Kreuzes, gegenüber einem Picknicktisch.
      </p>
      <p>
        <strong>Gehen Sie nicht über das Kreuz hinaus</strong>: Dahinter machen die zu
        querenden Mulden das Gelände potenziell lawinengefährdet.
      </p>
      <div className="facts">
        <p>
          <strong>Start</strong>: Sessellift Les Échaux, im Mollard ·{" "}
          <strong>Gehzeit</strong>: 2 Std. hin und zurück · <strong>Höhenmeter</strong>:
          200 m · <strong>Strecke</strong>: 5 km
        </p>
      </div>

      <h3>Die Runde um die Contamines, im Chef-lieu</h3>
      <p>
        Eine sehr flache Runde um den Hügel der Contamines, mit Start in der Rue Froide,
        gegenüber der Bar-Tabac Constantin. Die kürzeste und leichteste der drei. Der Weg
        wird geteilt: Im Winter begegnet man dort{" "}
        <Link href="/de/guide/chiens-de-traineau-albiez">Hundeschlittengespannen</Link>, denen
        man die Spur überlässt. Der Chef-lieu liegt tiefer als der Mollard: Zu Beginn oder
        am Ende der Saison kann dort der Schnee fehlen.
      </p>
      <div className="facts">
        <p>
          <strong>Start</strong>: Rue Froide, Chef-lieu · <strong>Gehzeit</strong>: 40 Min. ·{" "}
          <strong>Höhenmeter</strong>: 37 m · <strong>Strecke</strong>: 2,2 km
        </p>
      </div>

      <h3>Das Plateau von Montrond, ab Le Chalmieu</h3>
      <p>
        Die große Tour der Woche, und im Winter eine Route für Schneeschuhe und Langlauf.
        Start ist der Parkplatz des Weilers Le Chalmieu, 7,5 km von der Wohnung (etwa 15
        Minuten mit dem Auto). Der Weg steigt Richtung Relai TV und dann zu den Chabottes
        an, mitten durch die Almen am Fuß der Aiguilles d'Arves, mit Orientierungstafeln, um
        die Gipfel zu bestimmen. Zurück auf demselben Weg.
      </p>
      <div className="facts">
        <p>
          <strong>Start</strong>: Parkplatz Le Chalmieu (7,5 km) · <strong>Gehzeit</strong>:
          3 Std. 30 · <strong>Höhenmeter</strong>: 424 m
        </p>
      </div>

      <h3>Und der Wald von Le Rival</h3>
      <p>
        Den <Link href="/de/guide/foret-du-rival">Wald von Le Rival</Link>, durch den man
        zum Skiort hinauffährt, kann man im Winter auch mit Schneeschuhen erkunden –
        vorausgesetzt, man bleibt auf den markierten Routen.
      </p>
      <p>
        Das Tourismusbüro im Chef-lieu verkauft Wanderführer für den Sektor Albiez-Montrond
        und Albiez-le-Jeune. Dort fragt man auch am besten nach dem Zustand der Routen,
        bevor man losgeht.
      </p>

      <h2>Geführte Touren</h2>

      <h3>Mit der ESF</h3>
      <p>
        Die{" "}
        <Link href="/de/guide/cours-de-ski-esf-albiez">Skischule ESF von Albiez</Link> macht
        nicht nur Skikurse: Sie bietet auch Schneeschuhtouren an, geführt von einem
        Skilehrer, der die Aussichtspunkte und die Tierwelt der Gegend kennt. Im November
        2026 standen auf ihrer Website:
      </p>
      <ul>
        <li>
          <strong>Thementouren</strong> jede Woche – im Wald, Panorama und Tierwelt, eine
          Genießertour mit Imbiss –, meist mit Treffpunkt an der ESF im Mollard, 250 m von
          der Wohnung, ab fünf Teilnehmern;
        </li>
        <li>
          eine <strong>Tour nach Wunsch</strong>, täglich, vormittags oder nachmittags, ab
          vier Personen: ideal für eine Familie oder eine Gruppe von Freunden, im eigenen
          Tempo.
        </li>
      </ul>
      <p>
        Zwei Dinge sollte man wissen: <strong>Der Schneeschuhverleih ist nicht inbegriffen</strong>
        , und die Panoramatour nutzt die Lifte, man braucht also einen Skipass (außer man
        steigt zu Fuß auf). Programm, Tage und Uhrzeiten der Saison bitte auf{" "}
        <a href={PROPERTY.links.esf + "raquettes/"} target="_blank" rel="noopener noreferrer">
          esfalbiez.fr/raquettes
        </a>{" "}
        prüfen.
      </p>

      <h3>Mit einem Bergwanderführer</h3>
      <p>
        Yves Vionnet, Bergwanderführer (accompagnateur en montagne) mit Sitz in Albiez,
        bietet geführte Schneeschuhwanderungen in Albiez und Umgebung an, rund um Tierwelt,
        Pflanzen und regionales Erbe. Er arbeitet <strong>das ganze Jahr</strong>, auch in
        der Nebensaison: der sicherste Weg, die Dorfwege zu verlassen, wenn sich die
        Bedingungen von einem Tag auf den anderen ändern.
      </p>
      <div className="facts">
        <p>
          <strong>Albiez Randonnée Patrimoine — Yves Vionnet</strong>
          <br />
          <a href={PROPERTY.links.mountainGuide} target="_blank" rel="noopener noreferrer">
            albiezrandopatrimoine.com
          </a>
        </p>
      </div>

      <p>
        Alain Mollaret stammt aus der Maurienne und lebt im Weiler la Saussaz in
        Albiez-Montrond. Als Bergwanderführer und Skilehrer an der ESF Albiez nimmt er Kinder
        und Erwachsene für einen <strong>halben oder ganzen Tag</strong> auf Schneeschuhtour
        mit, durch Schnee, auf dem oft nur die Spuren der Tiere zu sehen sind.
      </p>
      <div className="facts">
        <p>
          <strong>Alain Mollaret — Wanderungen in Albiez-Montrond</strong>
          <br />
          <a href="https://www.alain-mollaret-randonnees.fr/pr%C3%A9sentation/activit%C3%A9s-hivernales/raquettes/" target="_blank" rel="noopener noreferrer">
            alain-mollaret-randonnees.fr
          </a>
        </p>
      </div>

      <h3>Am Abend: der Trapper-Abend von Mustang</h3>
      <p>
        Mittwoch- und Donnerstagabends bringt Mustang kleine Gruppen von Montrond hinauf zur
        Almhütte La Broue (1.800 m): etwa 45 Minuten Aufstieg mit Schneeschuhen in
        Begleitung eines Bergwanderführers, ein Aperitif mit Abendessen an den
        Feuerschalen, dann die Abfahrt mit dem Schlitten im Schein der Stirnlampe. Ab 8
        Jahren. Die Einzelheiten stehen in unserem Artikel über{" "}
        <Link href="/de/guide/motoneige-igloo-albiez">Motorschlitten und Iglu-Abende</Link>.
      </p>

      <h2>Schneeschuhe leihen</h2>
      <p>
        An der Talstation im Mollard, 250 m entfernt, hat{" "}
        <strong>Sport 2000 Aux Deux Frères</strong> – der Verleih, bei dem wir unsere eigene
        Ausrüstung leihen – Schneeschuhe im Sortiment, ebenso Babytragen. Bei den anderen
        Geschäften des Ortes fragen Sie vor Ort nach. Wie bei den Ski ist die Online-Buchung
        vor der Anreise günstiger: Alles dazu in unserem Artikel{" "}
        <Link href="/de/guide/louer-ses-skis-a-albiez">Skiverleih in Albiez</Link>.
      </p>
      <p>
        Nach der Tour kommen Schneeschuhe und Stöcke in den{" "}
        <strong>privaten Skispind auf dem Treppenabsatz</strong>, direkt neben der
        Wohnungstür.
      </p>

      <h2>Sicherheitsregeln</h2>
      <ul>
        <li>
          <strong>Bleiben Sie auf den markierten Routen</strong> und kehren Sie an deren Ende
          um: Der Endpunkt der Plaigne liegt nicht zufällig dort.
        </li>
        <li>
          <strong>Informieren Sie sich vorher</strong> im Tourismusbüro über den Zustand der
          Routen, und gehen Sie mit einem Profi, wenn Sie die Dorfwege verlassen wollen.
        </li>
        <li>
          <strong>Teilen Sie die Spur</strong>: Hundeschlitten an den Contamines,
          Langläufer am Chalmieu.
        </li>
        <li>
          Um die Lawinengefahr besser zu verstehen, bietet die ESF eine{" "}
          <strong>Einführung in die LVS-Suche</strong> an: eine Stunde, die den Blick auf
          die Berge verändert.
        </li>
      </ul>

      <h2>Mit Kindern</h2>
      <p>
        Die Runde um die Contamines, flach und kurz, ist der beste erste Versuch. Für eine
        Tour nach Wunsch mit der ESF reicht eine vierköpfige Familie. Der Trapper-Abend ist
        ab 8 Jahren offen. Und wenn die Beine müde werden, warten die Kinderschlitten
        (Babyschlitten inklusive) im Skispind, nur ein paar Schritte von der Rodelpiste im
        Mollard. Alle Ideen für die Kleinen finden Sie in{" "}
        <Link href="/de/guide/albiez-en-famille">Albiez-Montrond mit Kindern</Link>.
      </p>

      <p>
        Siehe auch:{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">die markierten Wanderwege</Link>,{" "}
        <Link href="/de/guide/ski-de-randonnee-albiez-debutant">
          Einstieg ins Skitourengehen
        </Link>{" "}
        und <Link href="/de/ski">die Winterseite der Wohnung</Link>.
      </p>
    </>
  );
}
