import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Externe Fakten am 8. November 2026 erhoben. Quellen und Hinweis zur jährlichen
 * Aktualisierung: siehe französische Fassung.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Im Frühling und im Herbst wird Albiez-Montrond wieder zu einem Bergdorf. Die Lifte
        stehen still, ein Teil der Geschäfte hat die Rollläden heruntergelassen, und auf den
        Wegen ist fast niemand unterwegs. Hier steht, was geöffnet bleibt, was nicht, und wie
        man einen Aufenthalt am Mollard zwischen zwei Saisons organisiert.
      </p>

      <h2>Was geschlossen ist</h2>
      <ul>
        <li>
          <strong>Die Lifte</strong>. Das Skigebiet ist vom 19. Dezember 2026 bis 21. März
          2027 in Betrieb. Davor und danach steht der Sessellift Les Échaux, 250 m von der
          Wohnung, still.
        </li>
        <li>
          <strong>Der Sherpa am Pistenzugang</strong>, das nächstgelegene Geschäft. Laut
          seiner Seite ist er „in der Saison“ 7 Tage die Woche geöffnet; dieses Jahr öffnet
          er wieder am <strong>12. Dezember</strong>. Für das Frühjahr ist kein
          Schließungsdatum veröffentlicht: Erkundigen Sie sich, bevor Sie darauf zählen.
        </li>
        <li>
          <strong>Der Laden der Käsereigenossenschaft in Albiez</strong>: ein saisonales
          Geschäft, nur im Sommer und im Winter geöffnet.
        </li>
        <li>
          Ein Teil der <strong>Restaurants</strong> (die geöffneten liegen eher im Chef-lieu:
          Erkundigen Sie sich, bevor Sie hinauffahren), die Skiverleiher und die ESF. Auch
          die Sommeraktivitäten: Das Baden im{" "}
          <Link href="/de/guide/lac-du-mollard-baignade">See am Mollard</Link> ist nur im Juli
          und August bewacht, und die{" "}
          <Link href="/de/guide/refuge-chalet-la-croe">Hütte Chalet d'la Croë</Link> ist nur
          von Mitte Juni bis Mitte September geöffnet.
        </li>
      </ul>

      <h2>Was geöffnet bleibt</h2>

      <h3>Der Lebensmittelladen im Chef-lieu, an allen Tagen des Jahres</h3>
      <p>
        Der Lebensmittelladen Sambuis Dufreney im Chef-lieu, etwa 2 km von der Wohnung, ist{" "}
        <strong>an allen Tagen des Jahres geöffnet</strong>. Lebensmittel aller Art, Käse und
        Wurstwaren von der Theke, Gas, Haushaltswaren, Erste Hilfe. Das Brot von Moulin
        Valentin wird jeden Tag geliefert: die Lösung für frisches Brot außerhalb der Saison.
      </p>
      <div className="facts">
        <p>
          <strong>Lebensmittelladen Sambuis Dufreney</strong>, Chef-lieu
          <br />
          <strong>Öffnungszeiten</strong> (Änderungen vorbehalten): täglich von 7:30 bis
          12:30 Uhr und von 17 bis 19 Uhr.
        </p>
      </div>

      <h3>Die Bäckerei, im Frühling am Wochenende</h3>
      <p>
        Die{" "}
        <Link href="/de/guide/boulangerie-moulin-valentin-albiez">Bäckerei Moulin Valentin</Link>{" "}
        im Chef-lieu ist im Winter und im Sommer täglich geöffnet. Im Frühling, vom 25. März
        bis 25. Juni, öffnet sie nur <strong>samstags und sonntags</strong>. Für den Herbst
        rufen Sie an, bevor Sie hinunterfahren:{" "}
        <a href="tel:+33479593397">04 79 59 33 97</a>.
      </p>

      <h3>Saint-Jean-de-Maurienne, für den Großeinkauf</h3>
      <p>
        Saint-Jean-de-Maurienne liegt auf dem Weg, <strong>18 km</strong> und 20 bis 25
        Minuten von der Wohnung. Außerhalb der Saison füllt man dort den Kofferraum,{" "}
        <strong>bevor man hinauffährt</strong>: Carrefour Market (Tankstelle und
        Waschsalon) und Lidl. Die Einzelheiten stehen in unserem Artikel{" "}
        <Link href="/de/guide/faire-ses-courses-a-albiez">Einkaufen in Albiez</Link>.
      </p>
      <p>
        Für Käse hat die Genossenschaft des Tals der Arves einen{" "}
        <strong>ganzjährig geöffneten</strong> Laden im Zentrum von Saint-Jean, 52 rue de la
        République.
      </p>
      <div className="facts">
        <p>
          <strong>Fromagerie Aux Produits Savoyards</strong> (Genossenschaft des Tals der
          Arves)
          <br />
          52 rue de la République, 73300 Saint-Jean-de-Maurienne ·{" "}
          <a href="tel:+33479642245">04 79 64 22 45</a>
          <br />
          Montag bis Samstag von 8:30 bis 12:30 Uhr und von 14:30 bis 19 Uhr, Sonntag von 9
          bis 12 Uhr (Öffnungszeiten laut{" "}
          <a href={PROPERTY.links.cheeseCoop} target="_blank" rel="noopener noreferrer">
            Genossenschaft
          </a>
          , Änderungen vorbehalten).
        </p>
      </div>

      <h2>Das Wetter: mit Kälte rechnen, manchmal mit Schnee</h2>
      <p>
        Auf 1.600 m sind die Nächte schon im Herbst kalt und im Frühling noch frisch. Die
        Wohnung ist mit einer <strong>frei regelbaren Elektroheizung</strong> ausgestattet:
        Schalten Sie sie bei Bedarf gleich bei der Ankunft ein, ohne zu fragen.
      </p>
      <p>
        Der erste Schnee kann <strong>schon Mitte Oktober</strong> fallen, lange vor der
        Öffnung des Skigebiets. In Savoyen sind Winterreifen oder Schneeketten vom{" "}
        <strong>1. November bis 31. März</strong> Pflicht (Loi Montagne). Für einen
        Aufenthalt im Oktober oder April hat man besser Schneeketten oder Schneesocken im
        Kofferraum. Alles wird in unserem Artikel{" "}
        <Link href="/de/guide/pneus-neige-chaines-albiez">
          Winterreifen und Schneeketten für die Fahrt nach Albiez
        </Link>{" "}
        erklärt.
      </p>

      <h2>Was man im Frühling und im Herbst unternehmen kann</h2>

      <h3>Zu Fuß ab der Wohnung</h3>
      <p>
        Mehrere der{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">markierten Wanderwege</Link> sind
        zu jeder Jahreszeit machbar, solange kein Schnee liegt:
      </p>
      <ul>
        <li>
          <strong>Die Croix du Châtel</strong>, 30 Minuten Aufstieg ab dem chemin du Châtel,
          hinter der Residenz.
        </li>
        <li>
          <strong>Der Rundweg um den See am Mollard</strong>, 30 Minuten, ab der Wohnung, mit
          Blick auf die Aiguilles d'Arves.
        </li>
        <li>
          <strong>Der Rundweg der Contamines</strong> (40 Min.) und{" "}
          <strong>der Rundweg der Cochette</strong> (3 Std.), ab dem Chef-lieu.
        </li>
      </ul>
      <p>
        Im Frühling bleibt der Schnee lange in den Höhenlagen. Der Weg von La Plaigne
        durchquert lawinengefährdete Mulden: Gehen Sie ihn nicht, solange Schnee liegt.
      </p>

      <h3>Der Wald von Le Rival</h3>
      <p>
        Der{" "}
        <Link href="/de/guide/foret-du-rival">Wald von Le Rival</Link>, den man auf der Fahrt
        hinauf zum Skiort durchquert, ist der Ausflug der Zwischensaison. Im Frühling führen
        die Bäche viel Wasser und die Wasserfälle sind am stärksten. Im Herbst die Farben,
        die Pilze und das Röhren des Hirsches.
      </p>

      <h3>Mit einem Bergwanderführer losziehen</h3>
      <p>
        Yves Vionnet, Bergwanderführer mit Sitz in Albiez, arbeitet{" "}
        <strong>das ganze Jahr</strong>, Nebensaison inbegriffen: Wanderungen zu Fuß oder mit
        Schneeschuhen, Tierwelt, Pflanzen und Kulturerbe. Es ist die sicherste Art, die Wege
        des Dorfes zu verlassen, wenn sich die Bedingungen von einem Tag auf den anderen
        ändern.
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

      <h3>Die Aiguilles d'Arves betrachten</h3>
      <p>
        Der nach Südwesten ausgerichtete Balkon der Wohnung blickt auf die{" "}
        <Link href="/de/guide/aiguilles-arves">Aiguilles d'Arves</Link>. Der Col du Mollard
        und der Rundweg um den See bieten denselben Blick ohne Anstrengung. Der Aufstieg zur
        Basse du Gerbier (2.578 m) ist eine Sommerroute: Außerhalb der Saison machen Schnee
        und Kälte sie deutlich anspruchsvoller. Fragen Sie den Bergwanderführer um Rat, bevor
        Sie losgehen.
      </p>

      <h3>Der Col du Mollard mit dem Rad</h3>
      <p>
        Der{" "}
        <Link href="/de/guide/col-du-mollard-velo">Col du Mollard</Link> (1.638 m) liegt am
        Ortsausgang des Weilers: 17 km Anstieg ab Saint-Jean-de-Maurienne, und das Ziel ist
        bei Ihnen zu Hause. Die höheren großen Pässe wie Croix de Fer und Glandon sind einen
        Teil des Jahres wegen Schnee gesperrt: Prüfen Sie, ob sie offen sind, bevor Sie sie
        einplanen. Das Rad wird auf dem überdachten Treppenabsatz angeschlossen oder auf dem
        Balkon abgestellt (der Skischrank ist zu klein).
      </p>

      <h3>Ein Tag in Turin</h3>
      <p>
        Außerhalb der Saison eine gute Idee für einen Ausflug:{" "}
        <Link href="/de/guide/turin-depuis-albiez">Turin</Link> liegt rund 2 Std. mit dem
        Auto entfernt, durch den Fréjus-Tunnel, oder 1 Std. 56 Min. mit dem Direktzug ab
        Saint-Jean-de-Maurienne.
      </p>

      <h2>Ruhe, und kürzere Aufenthalte</h2>
      <p>
        Außerhalb der Saison kommt man der Ruhe wegen nach Albiez: keine Schlange am
        Parkplatz, kein Lärm, die Wege für sich allein. Die Preise sind zudem oft die
        niedrigsten des Jahres.
      </p>
      <p>
        Die Aufenthalte sind flexibler: <strong>in der Regel mindestens 2 Nächte</strong>,
        vom 20. März bis Mitte Dezember (außer vom 2. Juli bis 20. August, dann sind 3
        Nächte nötig). Ein verlängertes Wochenende genügt. Die Anreise erfolgt{" "}
        <strong>ab 16 Uhr</strong>.
      </p>

      <div className="facts">
        <p>
          <strong>Buchen</strong> — Verfügbarkeit und Preise in Echtzeit auf{" "}
          <Link href="/de#reserver">der Seite der Wohnung</Link>.
          <br />
          <strong>Vor der Fahrt hinauf</strong>: Einkaufen in Saint-Jean-de-Maurienne,
          Schneeketten oder Schneesocken im Kofferraum ab Oktober.
          <br />
          <strong>Tourismusbüro</strong>: <a href="tel:+33479593048">04 79 59 30 48</a>,
          ganzjährig erreichbar.
        </p>
      </div>

      <p>
        Siehe auch:{" "}
        <Link href="/de/guide/quelle-semaine-skier-albiez">
          welche Woche zum Skifahren in Albiez
        </Link>
        , <Link href="/de/sommer">die Sommerseite</Link> und{" "}
        <Link href="/de/ski">die Winterseite der Wohnung</Link>.
      </p>
    </>
  );
}
