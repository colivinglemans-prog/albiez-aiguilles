import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond hat vier Ausrüstungsverleihe, verteilt auf die beiden Sektoren des Skigebiets:
        zwei am Pistenzugang von Le Mollard, 250 m von der Wohnung, und zwei im Chef-lieu, dem historischen
        Dorfkern. Alle geben einen Rabatt, wenn man vor der Anreise online bucht. Hier
        steht, was jeder abdeckt.
      </p>

      <h2>Am Pistenzugang von Le Mollard (250 m von der Wohnung)</h2>

      <h3>Sport 2000 Aux Deux Frères — unser Verleih</h3>
      <p>
        <strong>Dort leihen wir unsere eigene Ausrüstung</strong>, und diesen empfehlen wir an erster Stelle.
        Die Beratung ist gut, der Empfang auch, und alles wird vor Ort geregelt, ohne wieder hinauf ins Dorf
        zu fahren.
      </p>
      <p>
        <strong>135 m²</strong> Verleih, Skiservice und Verkaufsfläche (Ausrüstung,
        Zubehör, Kleidung). Das Angebot ist breit – Alpinski, Freeride-Ski, Tourenski, Langlaufski, Snowboard,
        Schneeschuhe, Schuhe, Erwachsenenschlitten, Snowscoot, Babytrage.
      </p>
      <p>
        Die Adresse, die man sich merkt, wenn man etwas Besonderes sucht oder eine ganze Gruppe mit
        unterschiedlichen Bedürfnissen ausstatten muss.
      </p>
      <div className="facts">
        <p>
          <strong>Online buchen</strong> —{" "}
          <a href={PROPERTY.links.skiRental} target="_blank" rel="noopener noreferrer">
            location-ski.sport2000.fr — Aux Deux Frères
          </a>
          <br />
          Der Onlinepreis ist günstiger als am Schalter, und vor Ort bleibt nur noch das Anprobieren der
          Schuhe.
        </p>
      </div>

      <h3>Mustang 1650 — Skiset</h3>
      <p>
        Das ehemalige Geschäft Ski Attitude, von Mustang übernommen, mitten am Pistenzugang und das ganze
        Jahr geöffnet. Verleih und Verkauf von Ski und Snowboard, Schuhberatung mit einem 3D-Scanner
        (Bootdoc), Servicewerkstatt: Schleifen, Wachsen, Einstellungen. Rabatt bei Onlinebuchung.
      </p>
      <p>
        Dort bucht man auch die Ausflüge von Mustang: Motorschlitten, Iglu- und Trapperabende,{" "}
        <Link href="/de/guide/sunset-ride-albiez-vtt-pistes">Sunset Ride</Link> mit dem Mountainbike auf
        den Pisten. Die Einzelheiten stehen in unserem Artikel über{" "}
        <Link href="/de/guide/motoneige-igloo-albiez">Motorschlitten und Igluabende</Link>.
      </p>

      <h2>Im Chef-lieu, dem Dorfkern (2 km)</h2>

      <h3>Mustang 1550 — Skimium</h3>
      <p>
        Das größte Sportgeschäft des Skigebiets, seit 1980 ganzjährig geöffnet, nahe der place Opinel.
        Verleih und Verkauf von Ski und Snowboard, Ski- und Radwerkstatt, Verleih von Mountainbikes und
        E-Mountainbikes. Es arbeitet mit Mustang 1650 zusammen: dieselben Ausflüge, dasselbe Team.
      </p>

      <h3>Skiset — Albiez Sports</h3>
      <p>
        Eine Verkaufsfläche von <strong>100 m²</strong>, Verleih und Skiservice. Es ist auch der Verleih, den
        man für den Sommer kennen sollte: BMX, E-Scooter und Ausfahrten mit Begleitung.
      </p>

      <h2>Online buchen: der einzige echte Trick</h2>
      <p>
        Alle vier Verleihe gewähren einen Nachlass auf Buchungen, die vor der Anreise online erfolgen. Der
        Unterschied ist bei einer Woche zu vier oder sechs Personen nicht nebensächlich, und der Vorteil ist
        doppelt:
      </p>
      <ul>
        <li>
          <strong>Der Preis</strong>, in jedem Fall günstiger.
        </li>
        <li>
          <strong>Die Zeit</strong>: am ersten Urlaubstag ist die Schlange im Verleihgeschäft der schlimmste
          Moment der Woche. Ausrüstung reserviert = Blitzbesuch zum Anprobieren der Schuhe.
        </li>
      </ul>
      <p>
        Die Verleiher starten oft schon <strong>ab dem Herbst Online-Aktionen</strong>, lange
        vor der Öffnung des Skigebiets, oft nur für registrierte Kunden: Legen Sie ein Konto auf
        ihrer Website an, um sie zu erhalten. Das ist der beste Zeitpunkt, um eine Woche in den
        Schulferien zu buchen. Die Reihenfolge zwischen Kursen, Ausrüstung und Skipass steht in
        unserem Artikel{" "}
        <Link href="/de/guide/reserver-ski-esf-en-avance">im Voraus buchen</Link>.
      </p>
      <p>
        Dieselbe Logik gilt für die Skipässe: sie können mit den{" "}
        <Link href="/de/guide/cours-de-ski-esf-albiez">Skikursen</Link> gekauft oder online bestellt und per
        Post zugeschickt werden, was den Lauf am ersten Morgen erspart. Wer im Winter
        mehrmals kommt, liest{" "}
        <Link href="/de/guide/forfait-saison-albiez">ab wann sich der Saisonpass lohnt</Link>.
      </p>

      <h2>Was vor Ort zu entscheiden bleibt</h2>
      <p>
        Die einzigen Dinge, die wirklich im Geschäft geregelt werden, sind die Schuhe – eine Anprobe ist mehr
        wert als jede Größentabelle – und die Einstellung der Bindungen, für die Ihr Gewicht und Ihr Niveau
        gebraucht werden. Rechnen Sie mit zwanzig Minuten, nicht mit einem Vormittag.
      </p>

      <p>
        Siehe auch:{" "}
        <Link href="/de/guide/domaine-skiable-albiez-secteur-mollard">
          Skifahren in Albiez ab dem Sektor Le Mollard
        </Link>{" "}
        und <Link href="/de/ski">die Winterseite der Wohnung</Link>.
      </p>
    </>
  );
}
