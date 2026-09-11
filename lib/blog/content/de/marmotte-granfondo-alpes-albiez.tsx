import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Die Marmotte Granfondo Alpes findet am 27. Juni 2027 statt, von Bourg-d'Oisans nach
        Alpe d'Huez über Glandon, Télégraphe und Galibier. Siebentausendfünfhundert
        Startplätze, begrenzt, davon über 88 % an Fahrerinnen und Fahrer aus dem Ausland —
        und sie sind in weniger als einem Tag vergeben. Wer dies vor Oktober 2026 liest, ist
        früh dran: dann öffnet die Anmeldung.
      </p>

      <h2>Die Termine</h2>
      <div className="facts">
        <p>
          <strong>Rennen</strong>: Sonntag, 27. Juni 2027
          <br />
          <strong>Start</strong>: Le Bourg-d'Oisans — <strong>Ziel</strong>: Alpe d'Huez
          <br />
          <strong>Pässe</strong>: Glandon, Télégraphe, Galibier, dann der Schlussanstieg
          <br />
          <strong>Teilnehmerfeld</strong>: maximal 7 500, über 88 % international
          <br />
          <strong>Anmeldung</strong>: Öffnung Anfang Oktober 2026 erwartet, in weniger als
          einem Tag ausgebucht
        </p>
      </div>

      <h2>Albiez als Basislager — die ehrliche Fassung</h2>
      <p>
        Sagen wir es gleich, denn daran entscheidet sich alles:{" "}
        <strong>
          Am Rennmorgen ist Albiez nicht der richtige Ort zum Übernachten.
        </strong>{" "}
        Bourg-d'Oisans liegt jenseits der Croix de Fer, eineinviertel bis eineinhalb Stunden
        Fahrt über den Pass — nur im Sommer, und nicht um fünf Uhr früh an einem Renntag.
      </p>
      <p>
        Wofür Albiez taugt, ist <strong>die Woche davor</strong>. Streckenbesichtigung,
        Höhenanpassung, Formaufbau ohne Vermögen: Drei der vier Schwierigkeiten der Strecke
        lassen sich von hier aus besichtigen, die ersten beiden sogar, ohne in ein Tal
        hinabzufahren.
      </p>

      <h2>Die Strecke von Albiez aus besichtigen</h2>

      <h3>Der Glandon, Maurienne-Seite</h3>
      <p>
        Am Renntag wird der Glandon vom Oisans aus erklommen und Richtung Maurienne
        abgefahren. Von Albiez aus besichtigen Sie also <strong>die Abfahrt</strong> — jene,
        die aus der Zeitwertung genommen ist und auf der die meisten Fahrer Probleme
        bekommen. Sie zu erreichen heißt nicht, wieder ins Tal zu müssen: Man fährt über
        Montrond, Entraigues und La Villette zur D926.
      </p>

      <h3>Télégraphe und Galibier</h3>
      <p>
        Die beiden wirklich gewerteten Schwierigkeiten — und sie liegen in Ihrem Tal. Von
        Albiez geht es hinunter nach Saint-Jean-de-Maurienne, etwa zwanzig Minuten, dann das
        Tal hinauf bis Saint-Michel-de-Maurienne zum Fuß des Télégraphe. Der Galibier
        schließt direkt an. Diese Ausfahrt kommt dem Renntag am nächsten.
      </p>

      <h3>Alpe d'Huez</h3>
      <p>
        Der einzige Anstieg, den Sie von hier aus nicht nebenbei besichtigen. Er bleibt dem
        Renntag vorbehalten — oder einem ganzen Tag im Oisans.
      </p>

      <h2>Auf 1 600 Metern schlafen, während man sich vorbereitet</h2>
      <p>
        Die Schlafhöhe ist kein Komfortdetail, wenn man ein Rennen vorbereitet, das zweimal
        über 2 000 Meter führt. Albiez-Montrond liegt auf 1 600 m, und das ist die Höhe, auf
        der Sie schlafen, nicht nur die, auf der Sie fahren.
      </p>
      <p>
        Dazu das Praktische: eine richtige Küche, um zu essen, was man will, wann man will,
        statt auf einen Service zu warten; ein Südbalkon, der ein Trikot in einer Stunde
        trocknet; und die Ruhe eines Dorfs mit 300 Einwohnern in der Woche, in der
        Bourg-d'Oisans volläuft.
      </p>
      <p>
        Eines ist einzuplanen, ganz konkret:{" "}
        <strong>Der Skiraum ist nicht für ein Fahrrad bemessen</strong>. Zwei Möglichkeiten
        vor Ort: es auf dem überdachten, geschützten Treppenabsatz anschließen oder auf den
        Balkon stellen. Vom Parkplatz sind es rund fünfzig Stufen.
      </p>

      <h2>Und ohne Startplatz</h2>
      <p>
        Die 7 500 Plätze gehen schnell weg, und viele Radfahrende kommen trotzdem in
        derselben Woche, um diese Pässe ohne Startnummer zu fahren. Die Straßen sind
        dieselben, die Landschaften auch, und die Maurienne sperrt regelmäßig einzelne Pässe
        für einen Vormittag für Autos. Alles dazu steht in unserem Artikel{" "}
        <Link href="/de/guide/albiez-camp-de-base-grands-cols">
          Albiez, Basislager der großen Pässe
        </Link>
        , mit dem Col du Mollard, der schlicht am Ortsausgang liegt — siehe{" "}
        <Link href="/de/guide/col-du-mollard-velo">der Col du Mollard mit dem Rad</Link>.
      </p>
      <p>
        Alles Weitere, was der Ort im Sommer bietet, steht auf unserer{" "}
        <Link href="/de/sommer">Sommerseite</Link>.
      </p>
    </>
  );
}
