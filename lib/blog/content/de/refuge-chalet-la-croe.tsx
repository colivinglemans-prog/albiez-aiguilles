import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Auf 2.076 Metern, am Fuß der Aiguilles d'Arves, ist das Chalet d'la Croë eine private
        Berghütte, die 2013 renoviert wurde. Man steigt hinauf für eine Crêpe mitten in der
        Wanderung, für ein Raclette, oder um in einem Kuppelzelt unter dem Sternenhimmel der
        Almen zu schlafen.
      </p>

      <h2>Wo und wann</h2>
      <p>
        Die Hütte liegt auf dem Gemeindegebiet von Albiez-Montrond, im Tal der Maurienne, am
        Fuß der{" "}
        <Link href="/de/guide/aiguilles-arves">Aiguilles d'Arves</Link>.
      </p>
      <div className="facts">
        <p>
          <strong>Le Chalet d'la Croë</strong> — private Hütte, 2.076 m
          <br />
          <strong>Öffnung 2026</strong>: vom 18. Juni bis 13. September
          <br />
          <a href="https://www.lechaletdlacroe.fr/" target="_blank" rel="noopener noreferrer">
            lechaletdlacroe.fr
          </a>
        </p>
      </div>

      <h2>Einkehren zum Essen</h2>
      <p>
        Das ist der Hauptgrund, tagsüber hinaufzusteigen. Eine Crêpe- oder Raclette-Pause
        mitten in der Wanderung verändert den Ausflug vollständig – und auf dieser Höhe,
        mitten in den Almen, erledigt die Kulisse den Rest.
      </p>
      <p>
        Die Hütte arbeitet <strong>völlig autark</strong> und im Wesentlichen mit{" "}
        <strong>hausgemachten regionalen Erzeugnissen</strong>. Eine bewusst in Kauf genommene
        Einschränkung, die man auf dem Teller wiederfindet.
      </p>

      <h2>In einem Kuppelzelt schlafen</h2>
      <p>
        Die Übernachtung findet <strong>im Freien, in Kuppelzelten</strong> statt, für eine
        Nacht oder länger. Das ist das Besondere an diesem Ort: völliges Eintauchen in den
        Sternenhimmel der Berge, ohne die Zwänge des Biwaks.
      </p>
      <p>
        Für eine mehrtägige Tour ist es eine Etappe, die die Route strukturiert: man steigt am
        ersten Tag auf, schläft in der Höhe und bricht am nächsten Morgen früh wieder auf.
      </p>

      <h2>Die Stimmung der Almen</h2>
      <p>
        Der Klang der Glocken belebt die Almen im Sommer – er ist die ständige Geräuschkulisse
        der Saison und die Atmosphäre, in der die Hütte ihre Bewirtung und Übernachtung
        anbietet.
      </p>

      <h2>Der Aufstieg</h2>
      <p>
        Die Hütte erreicht man zu Fuß über die Wege des Sektors. Die klassischen Anstiege
        führen über den Weiler Le Chalmieu und das Plateau von Montrond – derselbe Sektor wie
        der Aufstieg zur Basse du Gerbier, beschrieben in unserem Artikel über die{" "}
        <Link href="/de/guide/aiguilles-arves">Aiguilles d'Arves</Link>.
      </p>
      <p>
        Planen Sie ein, <strong>die Öffnungszeiten zu prüfen und zu reservieren</strong>, bevor
        Sie aufsteigen, besonders für die Nacht im Kuppelzelt: die Kapazität einer privaten
        Hütte ist begrenzt, und die Öffnung bleibt saisonal.
      </p>

      <h2>Die übrigen Wege</h2>
      <p>
        Die sechs markierten Routen ab dem Dorf und ab Le Mollard – kürzer, leichter
        zugänglich – sind in{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">
          unserem Wanderführer für Albiez
        </Link>{" "}
        beschrieben.
      </p>
    </>
  );
}
