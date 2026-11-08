import Link from "next/link";
import ArticleImage from "@/lib/blog/ArticleImage";

/*
 * Quellen am 8. November 2026 erhoben: siehe französische Fassung.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Wenn die Pisten geschlossen sind, kann der Abend draußen weitergehen. In Albiez
        finden vier geführte Ausflüge bei Einbruch der Dunkelheit statt: einen
        Motorschlitten selbst fahren, im Schlitten zu einem Iglu fahren, Motorschlitten und
        Fondue im Restaurant verbinden oder mit dem elektrischen Fatbike fahren. Drei davon
        starten am Mollard, wenige Gehminuten von der Wohnung.
      </p>

      <h2>Wer was veranstaltet</h2>
      <ul>
        <li>
          <strong>Motorschlitten, Igluabend, Abend mit Motorschlitten und Restaurant,
          Trapperabend</strong>: Mustang, Skiverleih des Skigebiets, mit zwei ganzjährig
          geöffneten Geschäften. <strong>Mustang 1650 (Skiset)</strong> liegt mitten am
          Pistenzugang des Mollard, nahe der Wohnung; <strong>Mustang 1550
          (Skimium)</strong>, seit 1980 das größte Sportgeschäft des Skigebiets, liegt im
          Chef-lieu, nahe der place Opinel.
        </li>
        <li>
          <strong>Fatbike</strong>: die ESF von Albiez, Start am ESF-Chalet im Chef-lieu.
        </li>
      </ul>
      <p>
        Alle diese Ausflüge finden vom{" "}
        <strong>19. Dezember 2026 bis 21. März 2027</strong> statt, mit Buchung. Das
        Tourismusbüro weist darauf hin, dass die Zeiten nicht garantiert sind: Das Programm
        kann sich je nach Wetter oder Schneelage ändern.
      </p>

      <h2>Einen Motorschlitten fahren</h2>
      <p>
        Nach einer Einweisung übernimmt man selbst den Lenker und folgt dem Guide auf einem
        reservierten Gelände von 4 Hektar, mit Blick auf die Aiguilles d'Arves. Die Gruppen
        umfassen höchstens 5 Personen. Zu zweit auf derselben Maschine können Fahrer und
        Beifahrer auf halber Strecke die Plätze tauschen.
      </p>
      <ul>
        <li>
          <strong>Ablauf</strong>: Empfang und Einweisung 10 bis 15 Min., Fahren 30 bis 35
          Min., Rückkehr und Ablegen der Ausrüstung 10 bis 15 Min.
        </li>
        <li>
          <strong>Starts</strong>: 18, 19, 20, 21 und 22 Uhr, täglich. Schnupperfahrten
          werden ab 17:30 Uhr angekündigt.
        </li>
        <li>
          <strong>Zum Fahren</strong>: vollendetes 18. Lebensjahr und Führerschein Klasse B,
          laut den Allgemeinen Geschäftsbedingungen von Mustang. Der gestellte Helm ist
          Pflicht.
        </li>
        <li>
          <strong>Beifahrer</strong>: mindestens 1,30 m, muss die Füße auf die Fußrasten
          stellen und sich am Fahrer festhalten können.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Start</strong>: Pistenzugang des Mollard, 125 rue du Ravarin, etwa 250 m
          von der Wohnung
          <br />
          <strong>Preise</strong> (AGB von Mustang): 75 € pro Motorschlitten, 35 € für
          einen Beifahrer hinter dem Guide, 10 € pro Kind für eine Schnupperfahrt
          <br />
          <strong>Kaution</strong>: 1.000 €, per Kreditkartenabdruck im Geschäft Mustang
          1550 oder 1650 (geöffnet von 9 bis 19 Uhr)
          <br />
          <strong>Buchung</strong>: Mustang Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a>, Mustang Chef-lieu{" "}
          <a href="tel:+33788439696">07 88 43 96 96</a>
        </p>
      </div>
      <p>
        Lesen Sie die Bedingungen vor der Buchung: Laut Mustang kann eine
        Motorschlittentour vom Kunden <strong>weder storniert noch verschoben</strong>{" "}
        werden, und die Anmeldung wird erst mit Zahlung und Kaution wirksam, 24 Stunden vor
        der Tour. Nur Mustang kann absagen oder verschieben, insbesondere bei schlechtem
        Wetter.
      </p>

      <h2>Der Inuit-Abend im Iglu</h2>
      <p>
        Das ist der Ausflug, der für alle passt, Kinder eingeschlossen, weil niemand fährt.
        Man startet am Pistenzugang in einem{" "}
        <strong>von einem Motorschlitten gezogenen Schlitten</strong>, auf einer reservierten
        Strecke. Es folgt ein kurzer, leichter Spaziergang durch den Wald bis zum Iglu, wo
        jeder einen Aperitif mit Imbiss aus lokalen Produkten bekommt, mit Blick auf die
        Aiguilles d'Arves und den Mont Émy. Der Guide erzählt vom Dorf und seiner
        Geschichte, dann bringt der Schlitten die Gruppe bei Nacht zurück ins Skigebiet.
      </p>
      <ul>
        <li>
          Das Tourismusbüro beschreibt ihn als für alle Altersgruppen geeignet. Ältere oder
          gehbehinderte Personen können direkt am Iglu abgesetzt werden.
        </li>
        <li>
          Besondere Menüs und angepasste Ernährungsformen auf Anfrage: Geben Sie es bei der
          Buchung an.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Start</strong>: Pistenzugang des Mollard, etwa 250 m von der Wohnung
          <br />
          <strong>Zeiten</strong>: zwei Durchgänge pro Abend, 18:30 bis 20 Uhr oder 20:30
          bis 22 Uhr, täglich
          <br />
          <strong>Dauer</strong>: 1 Stunde 30
          <br />
          <strong>Preise</strong>: 59 € ab 11 Jahren, 49 € für unter 11-Jährige
          <br />
          <strong>Buchung</strong>:{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          („Soirée Inuit Igloo“) oder telefonisch, Mustang Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a>
        </p>
      </div>
      <p>
        Für diesen Abend sehen die Bedingungen von Mustang vor, dass jede Stornierung
        weniger als 24 Stunden vorher voll berechnet wird. Minderjährige müssen von einem
        verantwortlichen Erwachsenen begleitet werden.
      </p>

      <h2>Der Eskimo-Abend: Motorschlitten und Restaurant</h2>
      <p>
        Die lange Version, <strong>nur mittwochs</strong>. Eine Einführung ins Fahren auf
        demselben Gelände von 4 Hektar, dann ein Abendessen in einem savoyischen Restaurant
        am Fuß der Pisten, das Mustang auswählt. Der Name des Restaurants wird nicht
        veröffentlicht.
      </p>
      <ul>
        <li>
          <strong>Auf dem Menü</strong>: Kir als Aperitif, Fondue oder Raclette nach Wahl
          mit Wurstwaren und Salat, Dessert nach Wahl.
        </li>
        <li>
          <strong>Zu zweit</strong> tauschen Fahrer und Beifahrer auf halber Strecke.
        </li>
        <li>
          <strong>Fahrer</strong>: mindestens 18 Jahre; <strong>Beifahrer</strong>:
          mindestens 1,30 m.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Wann</strong>: mittwochs von 19 bis 22 Uhr
          <br />
          <strong>Treffpunkt</strong>: laut Tourismusbüro im Geschäft Mustang 1550, im
          Chef-lieu; lassen Sie es sich bei der Buchung bestätigen
          <br />
          <strong>Preise</strong>: 130 € allein, 175 € zu zweit (ein Motorschlitten für
          zwei), Motorschlittentour und Essen inbegriffen
          <br />
          <strong>Buchung</strong>:{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          („Soirée Eskimo“) oder Mustang 1650 am Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a> (ersatzweise Mustang 1550:{" "}
          <a href="tel:+33788439696">07 88 43 96 96</a>)
        </p>
      </div>

      <h2>Mit dem elektrischen Fatbike bei Nacht, mit der ESF</h2>
      <p>
        Das Fatbike ist ein Mountainbike mit sehr breiten Reifen; dieses hat einen starken
        Elektroantrieb und Beleuchtung. Die Tour folgt bei Einbruch der Dunkelheit den Wegen
        von Albiez, geführt von Arnaud, einem diplomierten Guide, in Gruppen von höchstens 6
        Personen.
      </p>
      <ul>
        <li>
          <strong>Mindestgröße</strong>: 1,40 m. Ein Mindestalter ist nicht angegeben.
        </li>
        <li>
          <strong>Kleidung</strong>: Skikleidung, Après-Ski- oder Wanderschuhe, Handschuhe
          (zum Schalten und zur Steuerung des Motors). Ein Skihelm wird empfohlen.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Start</strong>: ESF-Chalet im Chef-lieu, 97 chemin de la Rua, etwa 2 km
          von der Wohnung
          <br />
          <strong>Zeiten</strong>: 17:30 bis 19 Uhr, täglich
          <br />
          <strong>Preis</strong>: auf Anfrage
          <br />
          <strong>Buchung</strong>: ESF, Büro im Chef-lieu{" "}
          <a href="tel:+33479593177">04 79 59 31 77</a>
        </p>
      </div>
      <p>
        Das Fatbike fährt auf den Wegen; der{" "}
        <Link href="/de/guide/sunset-ride-albiez-vtt-pistes">Sunset Ride des Aiguilles</Link>{" "}
        dagegen fährt nach dem letzten Sessellift am Donnerstag mit dem E-Mountainbike die
        Pisten hinunter. Das sind zwei verschiedene Ausflüge mit zwei verschiedenen
        Veranstaltern.
      </p>

      <h2>Und der Trapperabend</h2>
      <ArticleImage
        src="blog/soiree-trappeur-mustang.jpg"
        alt="Grillgut auf einer Plancha über dem Holzfeuer, nachts, während des Trapperabends"
        caption="Der Trapperabend von Mustang. Foto: Mustang Albiez."
      />
      <p>
        Mustang bietet außerdem mittwoch- und donnerstagabends einen Abend mit
        Schneeschuhen an: Shuttle von Albiez nach Montrond, etwa 45 Minuten Aufstieg mit
        einem Bergwanderführer bis zur Almhütte La Broue (1.800 m), Aperitif mit Imbiss an
        den Feuerschalen, dann 3 km Schlittenabfahrt mit Stirnlampe. Start um 18 Uhr,
        Rückkehr gegen 22:30 Uhr. Ab 8 Jahren, 4 bis 7 Personen, 99 € pro Erwachsenem und
        79 € für unter 11-Jährige, auf{" "}
        <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
          mustangsport.lokki.rent
        </a>
        . Bei diesem gibt es keinen Motorschlitten.
      </p>

      <h2>Welchen wählen</h2>
      <ul>
        <li>
          <strong>Mit kleinen Kindern</strong>: der Igluabend, der einzige für alle
          Altersgruppen, und mit Start am Mollard.
        </li>
        <li>
          <strong>Unter Erwachsenen, für den Nervenkitzel</strong>: der Motorschlitten
          allein oder der Eskimo-Abend, wenn Sie mittwochs auswärts essen möchten.
        </li>
        <li>
          <strong>Mit Jugendlichen über 1,40 m</strong>: das Fatbike. Einen Motorschlitten
          dürfen sie vor 18 Jahren nicht fahren, nur hinten mitfahren.
        </li>
        <li>
          <strong>Um ein wenig zu gehen</strong>: der Trapperabend.
        </li>
      </ul>
      <p>
        Für die Jüngsten gibt es außerdem die{" "}
        <Link href="/de/guide/chiens-de-traineau-albiez">Hundeschlitten</Link> in Les
        Contamines, tagsüber, und die{" "}
        <Link href="/de/guide/albiez-c-show">Albiez C'Show</Link> am Dienstagabend in den
        Schulferien, kostenlos. Weitere Ideen in{" "}
        <Link href="/de/guide/albiez-en-famille">Albiez mit der Familie</Link>.
      </p>

      <h2>Vor dem Aufenthalt buchen</h2>
      <p>
        Die Gruppen sind klein: 5 Personen pro Motorschlitten-Start, 6 beim Fatbike, ein
        einziger Eskimo-Abend pro Woche. In einer Schulferienwoche buchen Sie gleichzeitig
        mit den <Link href="/de/guide/louer-ses-skis-a-albiez">Ski</Link> und den{" "}
        <Link href="/de/guide/cours-de-ski-esf-albiez">Kursen</Link>. Ziehen Sie sich an wie
        zum Skifahren: Abends wird es auf 1.600 m schnell sehr kalt.
      </p>
      <p>
        Diese Aktivitäten hängen von Wetter und Schnee ab, und ihre Zeiten können sich
        ändern. Rufen Sie im Zweifel den Anbieter oder das Tourismusbüro unter{" "}
        <a href="tel:+33479593048">04 79 59 30 48</a> an.
      </p>

      <p>
        Siehe auch:{" "}
        <Link href="/de/guide/chiens-de-traineau-albiez">die Hundeschlitten</Link>,{" "}
        <Link href="/de/guide/sunset-ride-albiez-vtt-pistes">
          der Sunset Ride mit dem Mountainbike auf den Pisten
        </Link>
        , <Link href="/de/guide/albiez-en-famille">Albiez mit der Familie</Link> und{" "}
        <Link href="/de/ski">die Winterseite der Wohnung</Link>.
      </p>
    </>
  );
}
