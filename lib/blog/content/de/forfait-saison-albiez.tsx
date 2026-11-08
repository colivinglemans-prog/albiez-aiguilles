import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Preise 2026-2027, am 8. November 2026 auf station-albiez.com erhoben (Startseite und
 * /fr/tarifs2). Hinweis zur jährlichen Aktualisierung: siehe französische Fassung.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Bis zum <strong>2. Dezember 2026 um 23:59 Uhr</strong> verkauft das Skigebiet
        Albiez seinen Saisonpass zum halben Preis: 249 € für Erwachsene statt 497 €. Das
        Skigebiet ist von Samstag, 19. Dezember 2026, bis Sonntag, 21. März 2027, geöffnet.
        Bleibt die Frage, ab wie vielen Tagen er sich lohnt — die Tages- und Wochenpreise
        geben die Antwort.
      </p>

      <h2>Die Preise des Saisonpasses 2026-2027</h2>
      <ul>
        <li>
          <strong>Erwachsene</strong> (12 bis 64 Jahre): <strong>249 €</strong> statt 497 €
        </li>
        <li>
          <strong>Kinder</strong> (5 bis 11 Jahre): <strong>178 €</strong> statt 355 €
        </li>
        <li>
          <strong>Senioren</strong> (65 bis 74 Jahre): <strong>228 €</strong> statt 457 €
        </li>
        <li>
          <strong>Unter 5 und ab 75 Jahren</strong>: kostenloser Skipass, an der Kasse mit
          Altersnachweis abzuholen
        </li>
      </ul>
      <p>
        Wichtig: Schon ein Zwölfjähriger zahlt den Erwachsenentarif. Der Rabatt wird bis
        zum Stichtag online automatisch im Warenkorb abgezogen.
      </p>

      <h2>Womit man vergleichen muss</h2>
      <p>Die Vergleichspässe, jeweils Erwachsene / Kinder / Senioren:</p>
      <ul>
        <li>
          <strong>Tag</strong>: 32,50 € / 27,50 € / 30 €
        </li>
        <li>
          <strong>6 Tage</strong>: 177 € / 140 € / 158 €
        </li>
        <li>
          <strong>8 Tage</strong>: 215 € / 168 € / 192 €
        </li>
        <li>
          <strong>Wochenende</strong> (Samstag und Sonntag): 40,50 € / 36,50 € / 38,50 €
        </li>
        <li>
          <strong>Samstag</strong>: 14 € für alle, online gekauft vor Mittwoch 0 Uhr
          (also spätestens Dienstagabend), sonst 16 €
        </li>
      </ul>

      <h2>Ab wann er sich lohnt</h2>

      <h3>Zum Aktionspreis: zwei Wochen genügen</h3>
      <p>
        Mit 249 € entspricht der Erwachsenenpass knapp <strong>acht Tagen</strong> zum
        vollen Tagespreis. Konkret:
      </p>
      <ul>
        <li>
          <strong>Eine Woche</strong> (6 Tage, 177 €): Der Saisonpass lohnt sich nicht.
        </li>
        <li>
          <strong>Eine Woche plus ein Wochenende</strong> (177 + 40,50 = 217,50 €): immer
          noch nicht.
        </li>
        <li>
          <strong>Zwei Wochen</strong> (2 × 177 = 354 €): Der Saisonpass spart 105 € pro
          Erwachsenem.
        </li>
        <li>
          <strong>Sieben Wochenenden</strong> (7 × 40,50 = 283,50 €): Ab dem siebten lohnt
          er sich — sechs Wochenenden kosten 243 €.
        </li>
      </ul>
      <p>
        Für Kinder gilt dieselbe Rechnung: 178 € gegenüber 140 € pro Woche, also lohnend ab
        der zweiten Woche (280 €). Für Senioren 228 € gegenüber 158 € — gleiches Ergebnis.
      </p>

      <h3>Zum vollen Preis: drei Wochen</h3>
      <p>
        Bei 497 € reichen zwei Wochen (354 €) nicht mehr, es braucht drei (531 €). Der
        Saisonpass zum vollen Preis ist für Leute, die praktisch vor Ort wohnen. Der
        2. Dezember ist also kein Detail: Er halbiert die Rentabilitätsschwelle.
      </p>

      <h3>Wann er nichts bringt: ein einziger Wochenaufenthalt</h3>
      <p>
        Für <strong>einen einzigen Aufenthalt</strong> von einer Woche oder etwas mehr
        rechnet sich der Saisonpass nicht: Acht Tage am Stück kosten mit dem 8-Tage-Pass
        215 €, neun Tage 247,50 € (8 Tage + ein Tag), weniger als die 249 € des
        Saisonpasses. Darüber hinaus, oder sobald sich die Skitage auf mehrere Aufenthalte
        verteilen, liegt er wieder vorn. Und für ein paar einzelne
        Samstage schlägt der Samstag zu 14 € online alles andere.
      </p>

      <h2>Für Familien</h2>
      <p>
        Das Skigebiet bietet ein <strong>Familienpaket 6 Tage</strong> (zwei Erwachsene und
        zwei Jugendliche von 5 bis 17 Jahren) für 604 € online — spätestens drei Tage vor dem
        ersten Skitag gekauft — und 619 € an der Kasse. Damit muss man den Saisonpass
        vergleichen:
      </p>
      <ul>
        <li>
          Zwei Erwachsene und zwei Kinder von 5 bis 11 Jahren mit Saisonpass zum
          Aktionspreis: 2 × 249 + 2 × 178 = <strong>854 €</strong>.
        </li>
        <li>
          Dieselbe Familie mit dem Familienpaket: 604 € für eine Woche,{" "}
          <strong>1.208 € für zwei</strong>.
        </li>
      </ul>
      <p>
        Eine Woche: das Paket. Zwei Wochen oder mehr: der Saisonpass, mit gut 350 €
        Unterschied. Mit zwei Jugendlichen von 12 bis 17 Jahren, die beim Saisonpass als
        Erwachsene zählen (4 × 249 = 996 €), ändert sich das Ergebnis nicht.
      </p>

      <h2>Vor der Bestellung</h2>
      <ul>
        <li>
          Ein <strong>aktuelles Passfoto</strong> (ohne Kopfbedeckung und Sonnenbrille) und
          ein <strong>Altersnachweis</strong> werden bei der Bestellung verlangt, online wie
          an der Kasse.
        </li>
        <li>
          Der Skipass liegt auf einer Freihandkarte, die online aufgeladen werden kann.
          Abholung an den Kassen im <strong>Chef-lieu</strong> oder am{" "}
          <strong>Mollard</strong> — die am Mollard liegt am Pistenzugang, 250 m von der
          Wohnung.
        </li>
        <li>Die Versicherung Carré Neige gibt es optional im Warenkorb.</li>
        <li>
          Die Seite des Skigebiets setzt ein Sternchen hinter „Skigebiet“, ohne zu sagen,
          was es bedeutet. Der Saisonpass gilt im Skigebiet von Albiez; für einen Tag in{" "}
          <a href={PROPERTY.links.sybelles} target="_blank" rel="noopener noreferrer">
            Les Sybelles
          </a> verkauft das Skigebiet einen eigenen Pass „5 Tage Albiez + 1 Tag Sybelles“ (200 € Erwachsene, 166 € Kinder), Zugang über Saint-Jean-d'Arves.
        </li>
      </ul>
      <div className="facts">
        <p>
          <strong>Online kaufen</strong> —{" "}
          <a href={PROPERTY.links.resort} target="_blank" rel="noopener noreferrer">
            station-albiez.com
          </a>
          <br />
          Die obigen Preise sind die, die das Skigebiet am 8. November 2026 anzeigte:
          Maßgeblich ist der Betrag im Warenkorb.
        </p>
      </div>

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
