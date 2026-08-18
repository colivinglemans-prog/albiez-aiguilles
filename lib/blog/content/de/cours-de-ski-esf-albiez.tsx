import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Die französische Skischule (ESF) von Albiez-Montrond deckt alle Altersgruppen ab, vom Club Piou-Piou ab
        3½ Jahren bis zu den Erwachsenenkursen. Ein Detail zählt bei der Buchung mehr als alle anderen: der Ort hat{" "}
        <strong>zwei Treffpunkte</strong>, und von Le Mollard aus ist es der von Le Mollard, den man wählen muss.
      </p>

      <h2>Die Falle des Treffpunkts</h2>
      <p>
        Die ESF von Albiez bündelt ihre Kurse an zwei Sektoren. Wenn Sie in Le Mollard wohnen – das ist bei unserer
        Wohnung der Fall, 250 m vom Pistenzugang –, müssen Sie bei der Buchung unbedingt den{" "}
        <strong>Treffpunkt ESF Mollard</strong> auswählen. Sich zu vertun heißt, jeden Morgen mit einer Autofahrt zu
        beginnen, mit Kindern in Skischuhen. Die Sorte Fehler, die eine Woche kostet.
      </p>
      <p>
        Ein ausgebuchter Mollard ist allerdings keine Sackgasse:{" "}
        <strong>der Sektor Chef-lieu ist auf Skiern erreichbar</strong>. Wenn Ihr Niveau es erlaubt, nehmen Sie den
        Sessellift Les Échaux und fahren zum Chef-lieu hinunter – Sie sind aufgewärmt, noch bevor der Kurs beginnt,
        was für die, die mit dem Auto kommen, nicht gilt.
      </p>
      <p>
        Der Vorbehalt ist groß: das setzt voraus, dass man schon abfahren kann. Für ein Kind des Clubs Piou-Piou oder
        einen absoluten Anfänger bleibt der Treffpunkt Le Mollard der einzige bequeme – und das Auto der einzige
        Rückfallplan.
      </p>

      <h2>Die Angebote nach Alter</h2>

      <h3>Club Piou-Piou — ab 3½ Jahren</h3>
      <p>
        Das Kinderskigelände nimmt Kinder ab 3½, 4 oder 5 Jahren auf, je nach Angebot. Eine{" "}
        <strong>Betreuung</strong> kann hinzugefügt werden, was die Betreuungszeit über den Kurs hinaus sinnvoll
        verlängert.
      </p>

      <h3>Kinderkurse — 6 bis 12 Jahre</h3>
      <p>
        Das klassische Angebot, ebenfalls mit der Möglichkeit ergänzender Betreuung. In diesem Alter entfaltet der{" "}
        <Link href="/de/guide/domaine-skiable-albiez-secteur-mollard">
          Schlepplift Polytre
        </Link>{" "}
        seinen ganzen Sinn: mehrere Stellen zum Aussteigen, mit steigenden Schwierigkeiten.
      </p>

      <h3>Kurse für Jugendliche — ab 12 Jahren</h3>
      <p>Getrennte Gruppen, was vermeidet, einen Jugendlichen mit Siebenjährigen zu mischen.</p>

      <h3>Erwachsenenkurse</h3>
      <p>In Gruppen oder als Privatunterricht, zum Wiedereinstieg oder zum Weiterkommen.</p>

      <h2>Über den Alpinski hinaus</h2>
      <p>Die ESF von Albiez leitet auch Aktivitäten an, die man von einer Skischule nicht erwartet:</p>
      <ul>
        <li>
          <strong>Sitzski</strong>
        </li>
        <li>
          <strong>Schneeschuhe</strong>
        </li>
        <li>
          <strong>Snake-Gliss</strong> (Abfahrt in aneinandergehängten Schlitten)
        </li>
        <li>
          <strong>Biathlon-Schnupperkurs</strong>
        </li>
        <li>
          <strong>Einführung in die Lawinenverschütteten-Suche (LVS)</strong> – eine Stunde, die den Blick auf die
          Berge verändert, selbst wenn man die Pisten nie verlässt
        </li>
        <li>
          <strong>Fackelabfahrt</strong>, insbesondere bei der{" "}
          <Link href="/de/guide/albiez-c-show">Albiez C'Show</Link>
        </li>
      </ul>

      <h2>Buchen, und wann</h2>
      <p>
        Die ESF-Kurse muss man <strong>im Voraus</strong> buchen, aus zwei Gründen: der Platz, und vor allem die
        Uhrzeit. Die Vormittagstermine gehen zuerst weg, und ein Kurs am späten Nachmittag mit einem müden
        Fünfjährigen bringt nicht dasselbe.
      </p>
      <p>
        Die Skipässe können <strong>gleichzeitig mit den Kursen</strong> gekauft werden, was am ersten Tag eine
        zusätzliche Schlange erspart. Andere Möglichkeit: sie online bestellen und vor der Abreise per Post erhalten.
      </p>

      <div className="facts">
        <p>
          <strong>ESF Albiez-Montrond</strong> — Treffpunkt Mollard, 250 m von der Wohnung.{" "}
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
        </p>
      </div>

      <h2>Und die Betreuung der Kleinsten?</h2>
      <p>
        Neben der ESF-Betreuung verfügt der Ort über einen Ferienclub und eine Kinderkrippe – genug, um Kinder
        abzudecken, die zu jung zum Skifahren sind. Die Einzelheiten stehen in unserem Artikel{" "}
        <Link href="/de/guide/albiez-en-famille">Albiez-Montrond mit Kindern</Link>.
      </p>
    </>
  );
}
