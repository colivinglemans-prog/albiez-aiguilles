import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Es ist die unumgängliche Station für alle, die etwas aus der Maurienne mitbringen wollen – oder einfach vor
        Ort gut essen. Die Genossenschaftssennerei des Arves-Tals stellt einen ausgesprochen guten Beaufort AOP her
        und hat einen Laden in Albiez-Montrond.
      </p>

      <h2>Wer diesen Käse herstellt</h2>
      <p>
        Die Genossenschaft liegt im Ortsteil Belluard in{" "}
        <strong>Saint-Sorlin-d'Arves</strong>, auf der anderen Seite des Massivs. Sie sammelt die Milch der Betriebe
        des Arves-Tals und verarbeitet sie vor Ort.
      </p>
      <p>
        Der <strong>Beaufort AOP</strong> wird aus <strong>roher Vollmilch</strong> hergestellt, gesammelt auf Almen,
        die bis <strong>2.500 Meter</strong> hinaufreichen, und dann <strong>6 bis 12 Monate</strong> in kühlem,
        feuchtem Keller gereift. Die Herkunftsbezeichnung ist fünfzig Jahre alt, und das Haus ist beim Concours
        Général Agricole in Paris mit Gold ausgezeichnet.
      </p>

      <h2>Sommer- oder Winter-Beaufort: nicht derselbe Käse</h2>
      <p>
        Das sollte man wissen, bevor man an die Theke tritt. Der Beaufort existiert in{" "}
        <strong>zwei saisonalen Versionen</strong>, je nach Zeitraum, in dem die Milch gesammelt wurde:
      </p>
      <ul>
        <li>
          <strong>Der Sommer-Beaufort</strong> stammt aus Almmilch, wenn die Kühe in der Höhe auf einer sehr
          vielfältigen Flora weiden. Er ist farbiger, aromatischer, komplexer.
        </li>
        <li>
          <strong>Der Winter-Beaufort</strong> stammt aus im Tal erzeugter Milch. Er ist milder, gleichmäßiger.
        </li>
      </ul>
      <p>
        Keiner von beiden ist absolut „besser“: den ersten genießt man pur, der zweite eignet sich sehr gut zum Kochen.
        Fragen Sie an der Theke nach beiden – man lässt Sie probieren.
      </p>

      <h2>Was es sonst gibt</h2>
      <p>Der Laden hört nicht beim Beaufort auf. In der Käseabteilung:</p>
      <ul>
        <li>
          <strong>Raclette de Savoie IGP</strong>, darunter eine geräucherte Variante („Brezain“) und eine mit
          Bärlauch
        </li>
        <li>
          <strong>Geriebenes Fondue aus 100 % Beaufort AOP</strong> – die fertige Mischung, die das Abwägen von drei
          Käsesorten erspart
        </li>
        <li>
          <strong>Tome des Bauges AOP</strong> und <strong>Reblochon laitier AOP</strong>
        </li>
        <li>
          <strong>Butter aus dem Arves-Tal</strong>
        </li>
      </ul>
      <p>
        Dazu kommen Wurstwaren, Konfitüren und Honig – genug, um eine vollständige Platte zusammenzustellen, ohne
        anderswo halten zu müssen.
      </p>

      <h2>Der Vorteil, wenn man in Albiez wohnt</h2>
      <p>
        Die Wohnung ist mit einem <strong>Raclette-Gerät, einem Fondue-Caquelon, einer Pierrade und einem
        Crêpes-Gerät</strong> ausgestattet. Anders gesagt: alles, was nötig ist, um einen Einkauf bei der
        Genossenschaft am selben Abend in ein Abendessen zu verwandeln – und das ist deutlich besser als eine
        Supermarktpackung.
      </p>
      <p>
        Die Logik des Aufenthalts wird einfach: der{" "}
        <Link href="/de/guide/faire-ses-courses-a-albiez">Alltagseinkauf</Link> beim Sherpa am Pistenzugang oder beim
        Carrefour Market in Saint-Jean, und der Käse bei der Genossenschaft.
      </p>

      <h2>Wo man ihn kauft</h2>
      <p>
        Die Genossenschaft betreibt <strong>acht Läden</strong> in der Region, davon zwei, die von Albiez aus direkt
        nützlich sind:
      </p>
      <ul>
        <li>
          <strong>Albiez-Montrond</strong> — der nächste, ohne die Gemeinde zu verlassen.
        </li>
        <li>
          <strong>Saint-Jean-de-Maurienne</strong> — auf dem Weg, zu verbinden mit dem Großeinkauf bei der Auf- oder
          Abfahrt.
        </li>
      </ul>
      <p>
        Die sechs anderen sind in Saint-Sorlin-d'Arves (in der Sennerei selbst), in Le Corbier, La Toussuire,
        Saint-Michel-de-Maurienne, Valloire und am Col du Galibier – praktisch, wenn Sie auf einer{" "}
        <Link href="/de/guide/col-du-mollard-velo">Radausfahrt</Link> vorbeikommen.
      </p>

      <h2>Nach dem Aufenthalt liefern lassen</h2>
      <p>
        Die Genossenschaft versendet ins französische Mutterland (Korsika ausgenommen). Die Bestellungen werden am{" "}
        <strong>Montag</strong> bearbeitet, und der Versand mit Chronofresh geht ab <strong>Dienstag</strong> raus. Ab{" "}
        <strong>100 €</strong> ist der Versand kostenlos.
      </p>
      <p>
        Das ist die Lösung, um den Urlaub zu verlängern, ohne den Kofferraum zu überladen – oder um im Dezember den
        Vorrat aufzufüllen.
      </p>

      <div className="facts">
        <p>
          <strong>Fromagerie Coopérative de la vallée des Arves</strong>
          <br />
          Belluard, 73530 Saint-Sorlin-d'Arves
          <br />
          <a href="tel:+33479597016">04 79 59 70 16</a> · boutique@beaufortdesarves.com
          <br />
          <a href={PROPERTY.links.cheeseCoop} target="_blank" rel="noopener noreferrer">
            beaufortdesarves.com
          </a>{" "}
          — Adressen und Öffnungszeiten der acht Läden und Onlineshop
        </p>
      </div>
    </>
  );
}
