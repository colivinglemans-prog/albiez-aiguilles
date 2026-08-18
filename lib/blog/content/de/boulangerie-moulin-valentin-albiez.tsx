import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Im Dorfkern von Albiez-Montrond stellt Le Moulin Valentin alles selbst her: Brot,
        Gebäck, Kuchen, Quiches, Sandwiches. Und hinter der Auslage eine Geschichte, die
        1694 beginnt – vielleicht früher.
      </p>

      <h2>Eine Geschichte, die 1694 beginnt</h2>
      <p>
        Le Moulin Valentin ist nicht von gestern. Die Geschichte des Ortes reicht in
        Albiez-Montrond bis{" "}
        <strong>1694</strong> zurück, und wohl noch weiter. Den Rest erfährt man, wenn man
        die Tür aufstößt: es ist die Sorte Laden, aus dem man mit mehr Informationen als
        Brot herauskommt.
      </p>

      <h2>Was es dort gibt</h2>
      <p>Alle Rezepte sind handwerklich und werden vor Ort zubereitet:</p>
      <ul>
        <li>
          <strong>Brote</strong> aus handwerklicher Herstellung und Spezialbrote
        </li>
        <li>
          <strong>Gebäck</strong> und Kuchen
        </li>
        <li>
          <strong>Süße Tartes</strong> und Desserts
        </li>
        <li>
          <strong>Belegte Brote, Quiches und Sandwiches</strong>
        </li>
        <li>
          <strong>Warme und kalte Getränke</strong> (ohne Alkohol)
        </li>
      </ul>

      <h2>Die Spezialitäten für Picknick und Aperitif</h2>
      <p>
        Hier wird die Bäckerei über das Frühstück hinaus nützlich. Drei Dinge, die man
        wissen sollte:
      </p>
      <ul>
        <li>
          <strong>Der pâté en croûte</strong> — das Mittagessen einer{" "}
          <Link href="/de/guide/randonnees-balisees-albiez">Wanderung</Link> mit einem
          einzigen Einkauf erledigt.
        </li>
        <li>
          <strong>Das pain yéti</strong>: ein Baguette mit Speck und Käse. Das erklärt sich
          von selbst.
        </li>
        <li>
          <strong>Die Mandel- und Apfeltörtchen</strong>, für die Rückkehr.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Bäckerei Moulin Valentin</strong>
          <br />
          50 route du Mollard, Chef-lieu, 73300 Albiez-Montrond
          <br />
          <a href="tel:+33479593397">04 79 59 33 97</a>
        </p>
        <p>
          <strong>Öffnungszeiten</strong> (Änderungen möglich): vom 17.12. bis 19.03. und
          vom 01.07. bis 21.08. täglich von 7 bis 19 Uhr. Vom 25.03. bis 25.06. samstags
          und sonntags.
        </p>
      </div>

      <h2>Keine Lust, ins Dorf hinunterzufahren?</h2>
      <p>
        Das frische Brot vom Moulin Valentin wird jeden Tag an den{" "}
        <Link href="/de/guide/faire-ses-courses-a-albiez">
          Lebensmittelladen Sambuis Dufreney
        </Link>{" "}
        geliefert, und der Sherpa am Pistenzugang – 250 m von der Wohnung – führt ebenfalls
        Brot. Man kann also durchaus eine Woche verbringen, ohne ins Auto zu steigen.
      </p>
    </>
  );
}
