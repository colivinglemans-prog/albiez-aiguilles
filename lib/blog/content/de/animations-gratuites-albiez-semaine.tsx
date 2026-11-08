import Link from "next/link";

/*
 * Programm des Winters 2026-2027, am 8. November 2026 erhoben: siehe französische Fassung.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Den ganzen Winter über lässt das Tourismusbüro von Albiez-Montrond ein
        Veranstaltungsprogramm laufen, das sich jede Woche wiederholt. Fast alles ist
        kostenlos, aber ein guter Teil muss gebucht werden, oft vor 12 Uhr am selben Tag.
        Hier die typische Woche, Tag für Tag, mit der Entfernung vom Mollard.
      </p>

      <h2>Vorab</h2>
      <ul>
        <li>
          <strong>Zeitraum</strong>: Die meisten Veranstaltungen laufen vom 21. Dezember
          2026 bis 21. März 2027, mit einigen Ausnahmen, die weiter unten genannt sind.
        </li>
        <li>
          <strong>Kostenlos heißt nicht ohne Anmeldung</strong>: Tubing-Rodeln, Yooner,
          FabriK'Igloo und Frühgymnastik müssen gebucht werden, spätestens am selben Tag vor
          12 Uhr, online oder im Tourismusbüro.
        </li>
        <li>
          <strong>Zwei Sektoren</strong>: Albiez, das sind fast zwei kleine Dörfer, die
          durch das Skigebiet verbunden sind. Der <strong>Mollard</strong>, der höher
          gelegene, ist der Sektor der Urlauber, und dort liegt die Wohnung. Der{" "}
          <strong>Chef-lieu</strong> ist das historische Dorf, in dem das Leben auch außerhalb
          der Saison weitergeht: Schule, Rathaus, Festsaal, Kino, ganzjährig geöffneter
          Lebensmittelladen. Das Zentrum, die place Opinel, liegt 2 km von der Wohnung. Ein
          Teil der Veranstaltungen findet am Mollard statt, der Rest im Chef-lieu.
        </li>
        <li>
          <strong>Programm ohne Gewähr</strong>: Das Tourismusbüro weist selbst darauf hin,
          dass sich die Zeiten ändern können. Prüfen Sie vor Ort oder unter{" "}
          <a href="tel:+33479593048">04 79 59 30 48</a>.
        </li>
      </ul>

      <h2>Montag: der vollste Tag</h2>

      <h3>11 Uhr: Frühgymnastik</h3>
      <p>
        Eine Stunde dynamisches Training zum Aufwärmen vor dem Skifahren, im Festsaal,
        route du Mollard, im Chef-lieu. Kostenlos, mit Anmeldung, mindestens zwei Personen.
      </p>

      <h3>15, 16 und 17 Uhr: Tubing-Rodeln</h3>
      <p>
        Eine Abfahrt im Schwimmreifen auf einer verschneiten Bahn, mit Aufgaben unterwegs:
        Zielscheibe, Fahne, Ring. Das findet auf der Rodelbahn Les Contamines statt, am Ende
        der rue Froide, im Chef-lieu. Drei Durchgänge zu 45 Minuten:
      </p>
      <ul>
        <li>
          <strong>15 und 17 Uhr: Jugendliche und Erwachsene</strong>. Gewicht auf 80 kg
          begrenzt.
        </li>
        <li>
          <strong>16 Uhr: Kinder</strong>, die Anwesenheit eines Erwachsenen ist Pflicht.
        </li>
      </ul>
      <p>
        Kostenlos, mit Anmeldung, 2 bis 20 Personen pro Gruppe. Skikleidung und Helm sind
        Pflicht.
      </p>

      <h3>18 Uhr: Begrüßungsumtrunk</h3>
      <p>
        Place Opinel, im Chef-lieu. Das Animationsteam stellt die Aktivitäten der Woche
        vor, veranstaltet ein Quiz und spendiert dann Glühwein und Apfelsaft. Kostenlos,
        keine Anmeldung angegeben. 1 € Pfand für das Glas einplanen oder das eigene
        mitbringen. Er findet vom 21. Dezember bis <strong>15. März</strong> statt.
      </p>
      <p>
        Am ersten Montag ist die Abfolge einfach: Rodeln um 17 Uhr, Umtrunk um 18 Uhr, beides
        im Chef-lieu. Und der Umtrunk dient ja gerade dazu, die Aktivitäten der Woche
        vorzustellen.
      </p>

      <h2>Dienstag: vom Mollard in den Chef-lieu</h2>

      <h3>9 bis 12 Uhr: Yooner zum Kennenlernen</h3>
      <p>
        Der Yooner ist ein Gerät zwischen Schlitten und Ski, auf dem man sitzend abfährt.
        Start am <strong>Col du Mollard</strong>, am Ausgangspunkt des Tour du Châtel, am
        Ortsausgang des Weilers. Ankunft im Chef-lieu, unten im Dorf, mit möglichem Shuttle
        für den Rückweg nach oben.
      </p>
      <p>
        Kostenlos, mit Anmeldung, ab 8 Jahren, 2 bis 15 Personen, fünf Personen pro
        Abfahrt. Skikleidung, Helm Pflicht, abhängig von der Schneelage.
      </p>

      <h3>16 bis 17 Uhr: FabriK'Igloo</h3>
      <p>
        In weniger als einer Stunde mit der Familie ein Iglu bauen, am Badesee des Col du
        Mollard, 350 m von der Wohnung. Schaufeln werden gestellt; Handschuhe und Mütze
        mitbringen. Kostenlos, mit Anmeldung, 2 bis 30 Personen. Kinder müssen von einem
        Elternteil begleitet werden. Es braucht genug Schnee.
      </p>

      <h3>Am späten Nachmittag: Albiez C'Show und Fackelabfahrt</h3>
      <p>
        Am Pistenzugang des Mollard, 250 m entfernt. Kinder und Jugendliche ab dem Niveau
        „flocon“ fahren mit der ESF hinunter, die Fackel in der Hand; die Fackel kauft man
        vor Ort für 5 €, und mit dem Kauf ist man angemeldet. Das ist kein Termin für die
        ganze Saison: Das Infoblatt des Tourismusbüros kündigt die Abfahrt vom 19. Dezember
        bis 3. Januar und vom 2. bis 23. Februar an, je nach Datum um 17:45 oder 18 Uhr.
        Alles Weitere zum Abend steht in unserem Artikel über die{" "}
        <Link href="/de/guide/albiez-c-show">Albiez C'Show</Link>.
      </p>

      <h3>21 Uhr: Karaoke</h3>
      <p>
        Im Festsaal, im Chef-lieu. Kostenlos, Getränkeausschank vor Ort (1 € Pfand auf das
        Glas, Bankkarte akzeptiert). Nur vom 22. bis 29. Dezember, dann vom 2. Februar bis
        16. März.
      </p>

      <h2>Mittwoch</h2>
      <p>
        Wieder <strong>Yooner</strong>, von 9 bis 12 Uhr, zu denselben Bedingungen wie am
        Dienstag.
      </p>
      <p>
        An zwei Mittwochen am Saisonende, dem <strong>3. und 10. März</strong>, kündigt das
        Infoblatt des Tourismusbüros außerdem eine Fackelabfahrt mit der ESF um 18:15 Uhr
        an, am Pistenzugang des Mollard.
      </p>

      <h2>Dienstag bis Freitag: die Escape Games</h2>
      <p>
        Im Kino von Albiez-Montrond, im Chef-lieu, 1,4 km von der Wohnung, bietet das
        Tourismusbüro Escape Games als Brettspiel an: eine Stunde, um die Rätsel im Team zu
        lösen.
      </p>
      <ul>
        <li>
          <strong>Preis</strong>: 6 € pro Gruppe, nicht pro Person. Neben der Fackel der
          einzige kostenpflichtige Termin der Woche.
        </li>
        <li>
          <strong>Buchung</strong>: Pflicht bis 17:30 Uhr am Vortag, mit Bezahlung bei der
          Anmeldung. Vor Ort nur Bankkarte.
        </li>
        <li>
          <strong>Neun Szenarien</strong>, je nach Alter des jüngsten Spielers:
          <ul>
            <li>ab 6 Jahren: L'école ensorcelée, Quête du diamant magique;</li>
            <li>ab 7 Jahren: Super héros contre docteur vilain, Enquête au musée;</li>
            <li>ab 8 Jahren: Le trésor maudit;</li>
            <li>ab 10 Jahren: Panique dans l'espace;</li>
            <li>ab 14 Jahren: Arsène Lupin, Mission Z - Urgence Zombies;</li>
            <li>ab 16 Jahren: Braquage du siècle.</li>
          </ul>
        </li>
      </ul>
      <p>
        Das ist die Option für einen Spätnachmittag bei schlechtem Wetter oder einen Tag
        ohne Ski.
      </p>

      <h2>Das Wochenende</h2>
      <p>
        Keine Veranstaltung dieser Liste ist für Samstag oder Sonntag angesetzt. In der
        Hochsaison wird die Wohnung von Samstag bis Samstag vermietet: Das Programm beginnt
        also am Montag nach der Ankunft, mit dem Begrüßungsumtrunk.
      </p>

      <h2>Die Woche vom 1. bis 7. Februar 2027: Pause</h2>
      <p>
        Die Infoblätter des Tourismusbüros zeigen es: Das <strong>Tubing-Rodeln</strong>{" "}
        endet Ende Januar und beginnt wieder am 8. Februar, ebenso der{" "}
        <strong>Yooner</strong>. Kein Rodeln am Montag, 1. Februar, kein Yooner am 2. und 3.
        Gerade in dieser Woche kehren die Fackelabfahrt und das Karaoke zurück, am Dienstag,
        2. Februar. FabriK'Igloo, Frühgymnastik und Begrüßungsumtrunk kündigen keine
        Unterbrechung an.
      </p>

      <div className="facts">
        <p>
          <strong>Tourismusbüro</strong>: im Chef-lieu —{" "}
          <a href="tel:+33479593048">04 79 59 30 48</a>
          <br />
          <strong>Buchen</strong>: im Tourismusbüro oder online, über das Infoblatt der
          jeweiligen Veranstaltung auf{" "}
          <a
            href="https://www.explore-maurienne.com/stations-villages/albiez-montrond/le-plein-danimations/"
            target="_blank"
            rel="noopener noreferrer"
          >
            explore-maurienne.com
          </a>
          <br />
          <strong>Fristen</strong>: am selben Tag vor 12 Uhr für Rodeln, Yooner, Iglu und
          Frühgymnastik; am Vortag vor 17:30 Uhr für die Escape Games
          <br />
          <strong>Kostenpflichtig</strong>: Escape Game (6 € pro Gruppe), Fackel (5 €). Alles
          andere ist kostenlos.
          <br />
          Zeiten vom Tourismusbüro ohne Gewähr: Das Programm kann sich im Lauf der Saison
          ändern.
        </p>
      </div>

      <h2>Jeden Tag nach dem Skifahren: die Rodelbahnen</h2>
      <p>
        Der eigentliche Treffpunkt am späten Nachmittag steht in keinem Programm: Wenn die
        Pisten schließen, treffen sich die Familien auf den Rodelbahnen. Auf jeder Seite gibt
        es eine: am <strong>Mollard</strong>, direkt neben der Residenz, und im{" "}
        <strong>Chef-lieu</strong>, nahe der Kirche. Frei zugänglich, kostenlos, ohne
        Anmeldung — nur der Schnee entscheidet (die Schneelage ist dort nicht garantiert).
      </p>

      <h2>Um die Woche zu ergänzen</h2>
      <p>
        Mit Kindern siehe auch unseren Ratgeber{" "}
        <Link href="/de/guide/albiez-en-famille">Albiez mit der Familie</Link>. Bei den
        kostenpflichtigen Aktivitäten bucht man die{" "}
        <Link href="/de/guide/chiens-de-traineau-albiez">Hundeschlitten</Link> und den{" "}
        <Link href="/de/guide/motoneige-igloo-albiez">Motorschlitten</Link> am besten weit im
        Voraus. Und für das Skifahren selbst geht alles von der{" "}
        <Link href="/de/ski">Winterseite der Wohnung</Link> aus.
      </p>
    </>
  );
}
