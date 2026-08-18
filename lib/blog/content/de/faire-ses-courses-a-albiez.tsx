import Link from "next/link";
import { PROPERTY } from "@/lib/property";
import ArticleImage from "@/lib/blog/ArticleImage";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond hat genug, um ohne Talfahrt zu leben: einen Supermarkt am Pistenzugang, einen
        Lebensmittelladen und eine Bäckerei im Dorfkern. Aber um nach Albiez zu kommen, fährt man zwangsläufig durch
        Saint-Jean-de-Maurienne – und genau dort sollte man den Großeinkauf machen.
      </p>

      <h2>Die richtige Reihenfolge: das Große in Saint-Jean, der Rest im Dorf</h2>
      <p>
        Saint-Jean-de-Maurienne liegt auf dem Weg, etwa <strong>30 km</strong> und{" "}
        <strong>20 Minuten</strong> von Albiez. Dort gibt es einen{" "}
        <strong>Carrefour Market</strong> (mit Abholservice, sodass man von daheim bestellen und in zehn Minuten
        einladen kann) und einen <strong>Lidl</strong>.
      </p>
      <p>
        Gut zu wissen: <strong>Tankstelle und Waschsalon</strong> beim Carrefour Market. Bei einer Woche mit
        Skisachen ist der Waschsalon kein Detail.
      </p>
      <p>
        Oben angekommen deckt der Dorfhandel alles Übrige ab: das Brot, das Vergessene, den Käse, den Aperitif.
      </p>

      <h2>Am Pistenzugang von Le Mollard — der Sherpa</h2>
      <p>
        Es ist <strong>der Laden, der der Wohnung am nächsten liegt</strong>, 250 m entfernt, und er liegt{" "}
        <strong>direkt am Pistenzugang</strong>. Das verändert seinen Gebrauch völlig: es ist kein Einkauf, den man
        plant, sondern ein Zweiminutenhalt{" "}
        <strong>auf dem Rückweg von der Piste</strong>, die Ski in der Hand, für das Brot von morgen oder das, was
        beim Abendessen fehlt.
      </p>
      <p>
        Lebensmittel und Drogerie, mit <strong>möglicher Lieferung</strong>. Vor Ort: Brotverkauf, Metzgerei und
        Wurstwaren, Käse von der Theke, regionale Erzeugnisse.
      </p>
      <ArticleImage
        src="blog/sherpa-albiez-montrond-interieur.jpg"
        alt="Innenraum des Sherpa in Albiez-Montrond: die Fleisch- und Wursttheke und die Regalgänge"
        caption="Die Frischetheke des Sherpa in Albiez-Montrond, am Pistenzugang von Le Mollard."
      />
      <div className="facts">
        <p>
          <strong>Öffnungszeiten</strong> — sie wechseln je nach Saison und werden auf der Seite des Ladens aktuell
          gehalten:{" "}
          <a href={PROPERTY.links.sherpa} target="_blank" rel="noopener noreferrer">
            sherpa.net — Albiez-Montrond
          </a>
        </p>
      </div>
      <p>
        Es ist auch die beste Adresse, um etwas mitzubringen, das man im Supermarkt nicht findet:
      </p>
      <ul>
        <li>
          <strong>Die hausgemachten getrockneten Rindswürste</strong> von Sandrine, vor Ort hergestellt – die
          Spezialität des Ladens, gefährlich gut zum Aperitif.
        </li>
        <li>Der Buchweizen aus Saint-Jean.</li>
        <li>Der Honig eines Imkers aus Albiez.</li>
        <li>Die Biere aus Modane und Valloire.</li>
        <li>Der Génépi einer kleinen Destillerie.</li>
      </ul>

      <h2>Im Dorfkern — der Laden Sambuis Dufreney</h2>
      <p>
        Ein Lebensmittelladen im Herzen des Dorfes, untergebracht in einem einstigen Bauernhof, der zum traditionellen
        Krämerladen umgebaut wurde. Dieses Familiengeschäft ist{" "}
        <strong>an allen Tagen des Jahres geöffnet</strong> – ein Satz, der in den Bergen etwas bedeutet.
      </p>
      <p>
        Es gibt Lebensmittel aller Art, Wurstwaren und Käse von der Theke, Kolonialwaren, regionale Erzeugnisse, Gas,
        Eisenwaren und Erste-Hilfe-Artikel. Das frische Brot vom{" "}
        <Link href="/de/guide/boulangerie-moulin-valentin-albiez">Moulin Valentin</Link> wird täglich geliefert.
      </p>
      <div className="facts">
        <p>
          <strong>Öffnungszeiten</strong> (Änderungen möglich): täglich von 7:30 bis 12:30 Uhr, dann von 17 bis
          19 Uhr — und vom 3. Juli bis 3. September von 16 bis 19 Uhr.
        </p>
      </div>

      <h2>Im Dorfkern — die Bäckerei</h2>
      <p>
        Le Moulin Valentin bietet Brot, Gebäck, süße Tartes, warme und kalte Getränke, belegte Brote, Quiches und
        Sandwiches.{" "}
        <Link href="/de/guide/boulangerie-moulin-valentin-albiez">
          Seine Geschichte verdient einen eigenen Artikel.
        </Link>
      </p>

      <h2>Käse mitnehmen: die Genossenschaft</h2>
      <p>
        Um mit etwas abzureisen, das den Urlaub verlängert, ist die Station die{" "}
        <Link href="/de/guide/fromagerie-cooperative-beaufort-des-arves">
          Genossenschaftssennerei des Arves-Tals
        </Link>
        , die einen Laden in Albiez-Montrond hat. Ihr <strong>Beaufort AOP</strong> ist ausgezeichnet, und die Auswahl
        geht weit darüber hinaus: Käse, Wurstwaren, Konfitüren, Honig.
      </p>

      <h2>Was man mitbringen sollte</h2>
      <p>
        Einige Verbrauchsartikel sind in der Wohnung nicht gestellt und im Tal deutlich günstiger:
        Geschirrspültabs, Müllsäcke 50 L, Toilettenpapier und Nespresso-Kapseln. Vor der Auffahrt in den Kofferraum –
        die Einzelheiten stehen auf{" "}
        <Link href="/de#appartement">der Seite der Wohnung</Link>.
      </p>
    </>
  );
}
