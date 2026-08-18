import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond hat vier Ausrüstungsverleihe: drei am Pistenzugang von Le Mollard, 250 m von der
        Wohnung, und einen im Dorfkern. Alle geben einen Rabatt, wenn man vor der Anreise online bucht. Hier
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
        Der größte der drei: <strong>135 m²</strong> Verleih, Skiservice und Verkaufsfläche (Ausrüstung,
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

      <h3>Skiset Ski Attitude</h3>
      <p>
        Der Skiset, der der Wohnung am nächsten liegt. Verleih und Service für Ski und Snowboard, mit
        Verkaufsfläche: Skiausrüstung im Winter, Wanderausrüstung im Sommer. Attraktiver Rabatt bei
        Onlinebuchung.
      </p>

      <h3>Skimium — Mustang Sports</h3>
      <p>
        Im Dorfkern angesiedelt, aber abends am Pistenzugang von Le Mollard präsent, was ihn beim Rückweg von
        der Piste praktisch macht. Über den Ski hinaus bietet Mustang Sports Motorschlittenfahrten,
        Igluabende, eine Radschule und E-Mountainbikes.
      </p>

      <h2>Im Dorfkern (2 km)</h2>

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
        Dieselbe Logik gilt für die Skipässe: sie können mit den{" "}
        <Link href="/de/guide/cours-de-ski-esf-albiez">Skikursen</Link> gekauft oder online bestellt und per
        Post zugeschickt werden, was den Lauf am ersten Morgen erspart.
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
