import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Vorbereitungsartikel, der die Artikel zu ESF-Kursen, Skiverleih und Saisonpass
 * verbindet. Skipass-Daten am 8. November 2026 erhoben: siehe französische Fassung.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Eine Skiwoche in Albiez bereitet man mit drei Buchungen vor: Kurse, Ausrüstung,
        Skipass. Sie sind nicht gleich schnell vergeben. Wer sie in der richtigen
        Reihenfolge erledigt, vermeidet den Kurs am späten Nachmittag, die Schlange am ersten
        Morgen und den vollen Preis.
      </p>

      <h2>1. Die ESF-Kurse, sobald die Termine feststehen</h2>
      <p>
        Das ist die Buchung, die sich am schnellsten füllt. In den Schulferien fehlen weniger
        die Plätze als die guten Uhrzeiten:{" "}
        <strong>Die Vormittagszeiten sind zuerst weg</strong>, die des Clubs Piou-Piou (ab
        3½ Jahren) ebenfalls, am Mollard noch schneller als im Chef-lieu. Die Gruppenkurse
        laufen von Samstag bis Samstag; nur Privatstunden sind frei buchbar. Ein
        Vormittagskurs mit einem ausgeruhten Kind ist mehr wert als ein Kurs am Ende des
        Tages.
      </p>
      <p>
        Die einzige Falle: den <strong>Treffpunkt Mollard</strong> wählen, den am
        Pistenzugang, 250 m von der Wohnung. Die Angebote nach Alter stehen in unserem
        Artikel über die{" "}
        <Link href="/de/guide/cours-de-ski-esf-albiez">Kurse der ESF Albiez</Link>.
      </p>
      <p>
        Kein Platz mehr am Mollard? Dann bleibt der <strong>Treffpunkt Chef-lieu</strong>.
        Man kann mit dem Auto hinfahren, aber für Kinder, die keine Anfänger mehr sind, ist
        es am angenehmsten, <strong>auf Skiern</strong> hinzukommen: mit dem Sessellift Les
        Échaux am Pistenzugang des Mollard hinauf und hinunter bis zum Treffpunkt. Ein
        Aufwärmen vor dem Kurs und eine Abfahrt gemeinsam mit den Kindern. Man muss nur etwas
        früher von der Wohnung aufbrechen.
      </p>
      <p>
        Dasselbe gilt für die <strong>Betreuung der Kleinsten</strong>: Kinderbetreuung der
        ESF, Ferienclub „Le Petit Montagnard“ (4-12 Jahre) in den Ferien, Kinderkrippe „Le
        Chat Perché“ (3 Monate bis 6 Jahre). Auch diese Plätze sind schnell vergeben: Buchen
        Sie sie zusammen mit den Kursen. Die Einzelheiten stehen in{" "}
        <Link href="/de/guide/albiez-en-famille">Albiez mit der Familie</Link>.
      </p>
      <p>
        Dieselbe Logik gilt für Aktivitäten mit festen Zeiten wie die{" "}
        <Link href="/de/guide/chiens-de-traineau-albiez">Hundeschlitten</Link>: Man plant sie
        um die Kurse herum, also direkt danach.
      </p>

      <h2>2. Die Ausrüstung, online, einige Wochen vorher</h2>
      <p>
        Die vier Verleiher des Skiorts — zwei am Pistenzugang des Mollard, 250 m entfernt,
        und zwei im Chef-lieu — gewähren einen Rabatt, wenn man vor der Ankunft online
        bucht. Der Bestand ist nicht so knapp wie die ESF-Zeiten, aber frühes Buchen hat zwei
        Vorteile:
      </p>
      <ul>
        <li>
          <strong>der Preis</strong>: Der Online-Preis ist niedriger als am Schalter, und die
          Verleiher starten im Herbst oft Online-Aktionen, nur für registrierte Kunden: Legen
          Sie ein Konto auf ihrer Website an, um sie zu erhalten;
        </li>
        <li>
          <strong>die Zeit</strong>: Vor Ort bleiben nur die Anprobe der Schuhe und die
          Einstellung der Bindungen, etwa zwanzig Minuten.
        </li>
      </ul>
      <p>
        Warum nach den Kursen? Weil die Uhrzeiten der ESF bestimmen, wann Sie ins Geschäft
        gehen, und weil ein Kind im Piou-Piou nicht dieselbe Ausrüstung braucht wie ein
        Jugendlicher im Gruppenkurs. Wer was verleiht, und wo: siehe{" "}
        <Link href="/de/guide/louer-ses-skis-a-albiez">Skiverleih in Albiez</Link>.
      </p>

      <h2>3. Der Skipass, zuletzt, aber nicht zu spät</h2>
      <p>
        Der Skipass ist nie ausverkauft. Man kann ihn also bis zum Schluss aufheben, mit zwei
        Ausnahmen, die an Daten hängen:
      </p>
      <ul>
        <li>
          <strong>Der Saisonpass</strong> kostet online bis zum{" "}
          <strong>2. Dezember 2026 um 23:59 Uhr</strong> die Hälfte. Er lohnt sich erst ab
          zwei Skiwochen im Winter: Wenn das auf Sie zutrifft, kaufen Sie ihn zuerst, noch vor
          den Kursen. Die Rechnung steht in unserem Artikel{" "}
          <Link href="/de/guide/forfait-saison-albiez">
            ab wann sich der Saisonpass lohnt
          </Link>
          .
        </li>
        <li>
          <strong>Das Familienpaket 6 Tage</strong> (zwei Erwachsene und zwei Jugendliche von
          5 bis 17 Jahren) ist online günstiger, wenn es spätestens drei Tage vor dem ersten
          Skitag gekauft wird.
        </li>
      </ul>
      <p>
        Ansonsten kann der Skipass zusammen mit den ESF-Kursen oder online auf der Website
        des Skigebiets gekauft werden. Halten Sie pro Skifahrer ein aktuelles Passfoto und
        einen Altersnachweis bereit. Abgeholt wird an der Kasse am Mollard, am Pistenzugang,
        250 m von der Wohnung.
      </p>

      <h2>Was bis zum letzten Moment warten kann</h2>
      <p>
        Außerhalb der Schulferien, vor allem im Januar, ist auf den Pisten weniger los und
        der Druck lässt nach. Die ESF-Vormittagszeiten sollte man weiterhin nicht
        aufschieben, aber der Rest lässt sich freier entscheiden:
      </p>
      <ul>
        <li>
          <strong>der Skipass</strong>: tageweise, von Tag zu Tag, je nach Wetter;
        </li>
        <li>
          <strong>die Erwachsenenkurse</strong>, die man nach ein oder zwei Tagen auf der
          Piste hinzubuchen kann, sobald man sein Niveau eingeschätzt hat;
        </li>
        <li>
          <strong>einzelne Ausflüge</strong>, etwa ein Tag in Les Sybelles oder eine
          Aktivität abseits der Piste.
        </li>
      </ul>
      <p>
        Auch die Ausrüstung kann warten, aber der Online-Rabatt setzt voraus, dass man vor
        der Ankunft bucht: Selbst im Januar lohnt es sich, das in der Woche davor zu
        erledigen. Wenn Sie beim Termin des Aufenthalts noch zögern, siehe{" "}
        <Link href="/de/guide/quelle-semaine-skier-albiez">
          welche Woche zum Skifahren in Albiez
        </Link>
        .
      </p>

      <div className="facts">
        <p>
          <strong>Gleich nach der Buchung der Wohnung</strong>
          <br />
          — ESF-Kurse, Treffpunkt Mollard, Vormittagszeiten:{" "}
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
          <br />
          — Hundeschlitten oder eine andere Aktivität mit festen Zeiten, falls gewünscht
          <br />
          — Saisonpass, nur wenn Sie im Winter zwei Wochen oder mehr Ski fahren, und vor dem
          2. Dezember 2026
          <br />
          — Baby-Set gegebenenfalls beim Gastgeber anmelden
        </p>
        <p>
          <strong>Einen Monat vorher</strong>
          <br />
          — Ausrüstung online, Schuhgrößen, Körpergrößen und Gewicht aller zur Hand:{" "}
          <a href={PROPERTY.links.skiRental} target="_blank" rel="noopener noreferrer">
            Sport 2000 Aux Deux Frères
          </a>{" "}
          oder ein anderer Verleiher des Skiorts
          <br />
          — Wochenpässe oder Familienpaket online (für das Paket spätestens drei Tage vor dem
          ersten Skitag):{" "}
          <a href={PROPERTY.links.resort} target="_blank" rel="noopener noreferrer">
            station-albiez.com
          </a>
          <br />
          — Aktuelle Passfotos und Altersnachweise für die Skipässe
          <br />
          — Winterreifen oder Schneeketten: in Savoyen vom 1. November bis 31. März Pflicht (
          <Link href="/de/guide/pneus-neige-chaines-albiez">unser Artikel</Link>)
        </p>
        <p>
          <strong>Am Vorabend der Abfahrt</strong>
          <br />
          — Bestätigungen von ESF, Verleih und Skipässen auf einem Telefon gesammelt
          <br />
          — Niveau, Gewicht und Schuhgröße aller für die Einstellung der Bindungen notiert
          <br />
          — Anreise in der Wohnung ab 16 Uhr: Geschäft und Kasse am Mollard liegen 250 m
          entfernt
        </p>
      </div>

      <p>
        Siehe auch:{" "}
        <Link href="/de/guide/domaine-skiable-albiez-secteur-mollard">
          Skifahren in Albiez ab dem Sektor Le Mollard
        </Link>
        , <Link href="/de/guide/albiez-en-famille">Albiez-Montrond mit der Familie</Link> und{" "}
        <Link href="/de/ski">die Winterseite der Wohnung</Link>.
      </p>
    </>
  );
}
