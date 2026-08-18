import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Der Wald von Le Rival steigt von 1.300 Metern bis zum Col du Mollard auf 2.000 Metern. Siebenhundert
        Höhenmeter Nadelwald, Wasserfälle und Bergbäche, durchzogen von Wanderwegen und Mountainbike-Strecken
        – und bewohnt von Wildtieren, denen man wirklich begegnet.
      </p>

      <h2>Wo er liegt</h2>
      <p>
        Der Wald erstreckt sich über mehrere Weiler der Gemeinde Albiez-Montrond. Er beginnt am{" "}
        <strong>Collet d'en Haut</strong> und steigt bis zum{" "}
        <Link href="/de/guide/col-du-mollard-velo">Col du Mollard</Link>, über La Colonne, Le Fregny, La
        Villette und den Dorfkern.
      </p>
      <p>
        Konkret ist es der Wald, den man auf der Auffahrt zum Skigebiet durchquert: man fährt daran vorbei,
        ohne ihn unbedingt anzusehen, obwohl er einen eigenen Ausflug wert ist.
      </p>

      <h2>Was man dort sieht</h2>
      <p>
        Er besteht überwiegend aus <strong>Nadelbäumen</strong>, aber es gibt auch einige{" "}
        <strong>Wasserfälle</strong>, und mehrere Bergbäche durchqueren ihn auf Höhe von La Colonne und La
        Villette.
      </p>
      <p>Bei den Tieren ist die Liste lang und die Begegnungen echt:</p>
      <ul>
        <li>Rothirsche und Hirschkühe</li>
        <li>Rehe</li>
        <li>Eichhörnchen</li>
        <li>Füchse</li>
      </ul>
      <p>
        Er ist außerdem voller <strong>Pilze</strong> – zur Saison begegnet man dort vor allem Einheimischen,
        Korb am Arm und Verschwiegenheit über die Stellen.
      </p>
      <p>
        Im Sommer weiden <strong>Kuhherden</strong> auf seinen Lichtungen. Auch das gibt der Geräuschkulisse
        des Tals ihre Almglocken.
      </p>

      <h2>Ihn durchwandern</h2>
      <p>
        Mehrere <strong>Wanderwege</strong> und <strong>Mountainbike-Strecken</strong> durchqueren ihn. Man
        kann dort zu allen Jahreszeiten unterwegs sein.
      </p>
      <p>
        <strong>Eine Vorsichtsmaßnahme</strong>: achten Sie auf möglichen Baumfall, besonders nach einem
        Sturm oder starkem Schneefall. Es ist ein Bergwald, kein gepflegter Park.
      </p>

      <h2>Wann man hingeht</h2>
      <ul>
        <li>
          <strong>Frühling</strong>: die Bäche sind voll, die Wasserfälle auf dem Höchststand.
        </li>
        <li>
          <strong>Sommer</strong>: der Schatten der Nadelbäume ist kostbar, wenn das Plateau brennt, und auf
          den Lichtungen stehen die Herden.
        </li>
        <li>
          <strong>Herbst</strong>: die Pilze, die Farben und das Röhren des Hirsches.
        </li>
        <li>
          <strong>Winter</strong>: mit Schneeschuhen, und auf den markierten Routen bleiben.
        </li>
      </ul>

      <h2>Mit Begleitung hingehen</h2>
      <p>
        Yves Vionnet, Bergwanderführer mit Sitz in Albiez, bietet geführte Touren zu Tierwelt, Pflanzen und
        lokalem Kulturerbe an – und er arbeitet{" "}
        <strong>das ganze Jahr, Nebensaison inbegriffen</strong>. Das ist es, was aus einem Wald eine
        Landschaftslektüre macht.
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
        Siehe auch{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">
          die sechs markierten Wanderungen von Albiez-Montrond
        </Link>{" "}
        und <Link href="/de/sommer">die Sommerseite der Wohnung</Link>.
      </p>
    </>
  );
}
