import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Fakten am 8. November 2026 erhoben: Quellen und Hinweise siehe französische Fassung.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Skitourengehen heißt, aus eigener Kraft aufzusteigen, Steigfelle unter den Ski, und
        dann auf Ski abzufahren. Albiez hat zwei markierte Routen, von denen eine am
        Pistenzugang des Mollard beginnt, 250 m von der Wohnung, und die das Tourismusbüro
        als erste Erfahrung vorstellt. So gehen Sie es an, wenn Sie es noch nie gemacht haben.
      </p>

      <h2>Das nötige Niveau</h2>
      <p>
        Der Aufstieg verlangt mehr Kondition als Technik. Die Abfahrt dagegen erfolgt auf
        Ski: Die ESF verlangt für ihre Touren,{" "}
        <strong>eine rote Piste bei allen Schneeverhältnissen abfahren zu können</strong>.
        Das ist ein guter Anhaltspunkt, bevor man sich daran wagt, auch allein. Wer auf der
        Piste noch Anfänger ist, wartet besser eine Saison.
      </p>

      <h2>Die beiden markierten Routen</h2>

      <h3>Aufstieg zu den Aplanes — die erste Tour, direkt bei der Wohnung</h3>
      <p>
        Start am <strong>Pistenzugang des Mollard</strong> (1.619 m), 250 m zu Fuß. Man
        geht am Skigebiet entlang in Richtung der Aplanes, auf{" "}
        <strong>etwa 2 km</strong> und <strong>etwa 250 Höhenmeter</strong>. Rechnen Sie
        mit <strong>1 Stunde 30</strong>. Der Aufstieg führt durch wenig lawinengefährdete
        Zonen, und die Abfahrt erfolgt über die Pisten. Oben Blick auf die Aiguilles d'Arves
        und den Étendard-Gletscher.
      </p>
      <p>
        Man steigt nicht bis zur Bergstation des Schlepplifts der Aplanes (2.100 m) auf: Die
        Route endet deutlich weiter unten, und darüber hinaus werden die Höhenmeter
        merklich sportlicher. Das macht sie zu einer guten Schnuppertour, die sich an einem
        Vormittag oder am Ende eines Skitags unterbringen lässt und die man mit Alpinskifahrern
        machen kann, die oben auf Sie warten.
      </p>

      <h3>Aufstieg zum Crêt de l'âne — ein wilderer Sektor</h3>
      <p>
        Start am <strong>Parkplatz Crêt de l'âne</strong>, an der Straße nach
        Albiez-le-Jeune (1.497 m). Vom Mollard aus muss man das Auto nehmen. Die Strecke ist{" "}
        <strong>3,6 bis 3,7 km</strong> lang, mit etwa <strong>400 Höhenmetern</strong> laut
        dem Topo des Tourismusbüros, in <strong>2 Stunden 30</strong>. Sie steigt in
        Serpentinen unter den Hängen von Casse Massion an, im ehemaligen Sektor La Blanche,
        dessen Lift 2020 abgebaut wurde. Wenig Betrieb und ein Blick auf die Nordrinnen des
        Mont Emy, das Dorf und den Étendard-Gletscher.
      </p>
      <p>
        Länger und steiler als die Aplanes: für eine zweite Tour aufheben. Für die Abfahrt
        kann man, wenn dieser Sektor geöffnet ist, auf Ski die Talstation des Sessellifts
        Crêt de l'âne erreichen. Es ist ein tief gelegener Bereich des Skigebiets, der nicht
        die ganze Saison geöffnet ist: Alles hängt von der Schneelage ab.
      </p>

      <div className="facts">
        <p>
          <strong>Routen</strong>: täglich geöffnet, je nach Schneelage und Wetter
          <br />
          <strong>Abfahrt</strong>: über die Pisten, nur während der Öffnungszeiten des
          Skigebiets (9 bis 17 Uhr)
          <br />
          <strong>Topo und GPX-Track</strong>:{" "}
          <a
            href="https://www.explore-maurienne.com/activites/activites-neige/ski-de-rando/"
            target="_blank"
            rel="noopener noreferrer"
          >
            explore-maurienne.com
          </a>{" "}
          und App Explore Maurienne
          <br />
          <strong>Tourismusbüro</strong>:{" "}
          <a href="tel:+33479593048">04 79 59 30 48</a>
        </p>
      </div>

      <h2>Die Regeln im Skigebiet</h2>
      <p>Das Topo des Tourismusbüros fasst sie so zusammen:</p>
      <ul>
        <li>
          <strong>Der Aufstieg folgt den Markierungen</strong> „Skitour“, nicht den Pisten.
        </li>
        <li>
          <strong>Die Abfahrt erfolgt über die Alpinpisten</strong>, während der
          Öffnungszeiten des Skigebiets, von 9 bis 17 Uhr.
        </li>
        <li>
          <strong>Außerhalb dieser Zeiten sind die Pisten gesperrt</strong>, nachts erst
          recht: Dann fahren die Pistenraupen, manchmal von einem quer über den Hang
          gespannten Windenseil gehalten. Kein Aufstieg mit Stirnlampe am Abend auf den
          Pisten, ganz einfach, um im Dunkeln keiner Pistenraupe zu begegnen.
        </li>
      </ul>
      <p>
        Das Skigebiet ist vom 19. Dezember 2026 bis 21. März 2027 geöffnet. Außerhalb dieser
        Daten gibt es für die Abfahrt weder präparierte Pisten noch Überwachung.
      </p>

      <h2>Sicherheit, auch auf einer markierten Route</h2>
      <p>
        Die beiden Routen sind <strong>markiert, aber nicht gesichert</strong>: Dort werden
        keine vorbeugenden Lawinensprengungen durchgeführt. Sie sind dort auf eigene
        Verantwortung unterwegs. Vor jeder Tour:
      </p>
      <ul>
        <li>
          Wetter, Schneeverhältnisse und den{" "}
          <strong>Lawinenlagebericht</strong> (BRA) lesen; sich beim Pistendienst
          erkundigen und seine Anweisungen befolgen.
        </li>
        <li>
          Die Mindestausrüstung mitnehmen: <strong>LVS-Gerät, Schaufel und Sonde</strong>,
          und damit umgehen können.
        </li>
        <li>
          Jemandem sagen, welche Route Sie nehmen und wann Sie zurück sein wollen. Sich nicht
          von der Dunkelheit überraschen lassen.
        </li>
        <li>
          Die Tour verschieben, wenn das Wetter schlechter wird.
        </li>
        <li>
          Bei einem Unfall: <a href="tel:112">112</a>.
        </li>
      </ul>

      <h2>Die Ausrüstung</h2>
      <p>
        Man braucht Tourenski mit ihren Bindungen, Steigfelle, passende Schuhe und
        Teleskopstöcke, dazu das Trio LVS-Gerät, Schaufel, Sonde. Für das erste Mal muss man
        nichts kaufen: <strong>Sport 2000 Aux Deux Frères</strong>, am Pistenzugang des
        Mollard, 250 m entfernt, verleiht Skitourenausrüstung. Siehe{" "}
        <Link href="/de/guide/louer-ses-skis-a-albiez">Skiverleih in Albiez</Link>; fragen
        Sie an der Theke, was im Verleih enthalten ist.
      </p>
      <p>
        Die Ski kommen abends in den privaten Skischrank auf dem Treppenabsatz, direkt neben
        der Wohnungstür.
      </p>

      <h2>Mit einem Profi anfangen</h2>
      <p>
        Für das erste Mal ist das am einfachsten: Man lernt, die Felle aufzuziehen, eine
        Spitzkehre im Hang zu machen und ein LVS-Gerät zu benutzen. Ab Albiez werden vier
        Formeln angeboten.
      </p>

      <h3>Einführung ins Skitourengehen mit der ESF</h3>
      <p>
        Um die Ausrüstung und ihren Einsatz kennenzulernen: Felle, LVS-Gerät, Sonde und
        Schaufel, Orientierung, kontrollierte Abfahrt, mit kleinen Höhenunterschieden zum
        Anfang. Gruppe von <strong>2 bis 6 Personen</strong>, Sicherheitsausrüstung gestellt
        (LVS-Gerät, Schaufel, Sonde). Das Tourismusbüro kündigt sie vom 19. Dezember 2026 bis
        21. März 2027 an, täglich von 15 bis 17 Uhr oder auf Anfrage.
      </p>

      <h3>Skitour nach Wahl mit der ESF</h3>
      <p>
        Die logische Fortsetzung, in wilderem Gelände, mit einer Route, die nach Wetter und
        Niveau der Gruppe gewählt wird (<strong>3 bis 6 Personen</strong>). Gleiches
        verlangtes Niveau, gleiche Sicherheitsausrüstung gestellt. Angekündigt täglich von
        15 bis 18 Uhr oder auf Anfrage, im selben Zeitraum.
      </p>
      <p>
        Beide Formeln der ESF starten am ESF-Chalet des Mollard, am Pistenzugang, 250 m von
        der Wohnung. Die Website der ESF sagt nicht, ob die Tourenski inbegriffen sind: bei
        der Buchung nachfragen.
      </p>
      <div className="facts">
        <p>
          <strong>ESF Albiez</strong> — Preis auf Anfrage
          <br />
          Büro am Mollard: <a href="tel:+33479593180">04 79 59 31 80</a>
          <br />
          Büro im Chef-lieu: <a href="tel:+33479593177">04 79 59 31 77</a>
          <br />
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
        </p>
      </div>

      <h3>Unterricht mit Valentin Jullien, unabhängiger Skilehrer</h3>
      <p>
        Ein Skitourentag für <strong>höchstens 5 Personen</strong>, zum Kennenlernen oder
        zum Üben, in Albiez, in Les Sybelles, in Les Karellis oder anderswo in der Maurienne.
        Angekündigt täglich vom 19. Dezember 2026 bis 28. März 2027 oder auf Anfrage.
      </p>
      <div className="facts">
        <p>
          <strong>Valentin Jullien</strong> — Preis auf Anfrage
          <br />
          <a href="tel:+33618092418">06 18 09 24 18</a>
        </p>
      </div>

      <h3>Tour mit Ludovic, Bergführer</h3>
      <p>
        Als halber oder ganzer Tag, auf den Freeride-Routen des Tals, mit gestellter
        Sicherheitsausrüstung (LVS-Gerät, Schaufel, Sonde). Eher für eine zweite oder dritte
        Tour, wenn die Grundlagen sitzen. Auf Anfrage, Buchung erforderlich.
      </p>
      <div className="facts">
        <p>
          <strong>Ludovic Gaboriaud, Bergführer</strong> — Preis auf Anfrage
          <br />
          <a href="tel:+33613845277">06 13 84 52 77</a>
        </p>
      </div>

      <p>
        Die vom Tourismusbüro veröffentlichten Zeiten sind ohne Gewähr, und das Programm
        kann sich ändern: Bestätigen Sie beim Anbieter oder beim Tourismusbüro
        (<a href="tel:+33479593048">04 79 59 30 48</a>), bevor Sie planen.
      </p>

      <p>
        Siehe auch:{" "}
        <Link href="/de/guide/domaine-skiable-albiez-secteur-mollard">
          Skifahren in Albiez ab dem Sektor Le Mollard
        </Link>
        , <Link href="/de/guide/louer-ses-skis-a-albiez">Skiverleih in Albiez</Link>,{" "}
        <Link href="/de/guide/cours-de-ski-esf-albiez">Skikurse der ESF</Link> und{" "}
        <Link href="/de/ski">die Winterseite der Wohnung</Link>.
      </p>
    </>
  );
}
