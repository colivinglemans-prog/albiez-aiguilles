import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Der Trail de l'Étendard überquert Anfang August das Massiv der Grandes Rousses, von
        Bourg-d'Oisans nach Saint-Sorlin-d'Arves — eine Viertelstunde von Albiez. Und seine
        Strecke verschwindet am Montag nicht: Es gibt sie auch als{" "}
        <strong>dauerhaft markierten Weg</strong>, den man an jedem Sommertag laufen kann,
        ganz ohne Startnummer.
      </p>

      <h2>Das Rennen</h2>
      <p>
        Vier Strecken — <strong>17, 22, 44 und 65 km</strong> — mitten in den Grandes
        Rousses, über zwei Tage Anfang August. Die Ausgabe 2026 war die dreizehnte.
      </p>
      <p>
        Die <strong>65 km</strong> geben dem Rennen seinen Sinn:{" "}
        <strong>3 624 Höhenmeter im Anstieg</strong>, eine Überquerung des Massivs ab
        Bourg-d'Oisans, ein Abschnitt am Fuß des Étendard-Gletschers und rund ein Dutzend
        bemerkenswerter Seen unterwegs — Lac Blanc, Lac Bramant, Lac de Grand-Maison. Eine
        Schleife unterhalb des Pic de l'Étendard, dann der Abstieg nach
        Saint-Sorlin-d'Arves.
      </p>
      <p>
        Die <strong>44 km</strong> folgen derselben Logik in kürzer: Start in
        Bourg-d'Oisans, Ziel Saint-Sorlin. Die beiden kurzen Formate bleiben auf der
        savoyischen Seite.
      </p>

      <div className="facts">
        <p>
          <strong>Wann</strong>: zwei Tage ganz am Anfang des August
          <br />
          <strong>Strecken</strong>: 17, 22, 44 und 65 km
          <br />
          <strong>Die 65 km</strong>: 3 624 Höhenmeter, Bourg-d'Oisans →
          Saint-Sorlin-d'Arves
          <br />
          <strong>Ziel</strong>: Saint-Sorlin-d'Arves, 12 km von Albiez
          <br />
          <strong>Den Rest des Jahres</strong>: Strecke Nr. 7 des Espace Trail, dauerhaft
          markiert
        </p>
      </div>

      <h2>Dieselbe Strecke, ohne Startnummer</h2>
      <p>
        Das macht die Gegend auch außerhalb des Rennwochenendes interessant. Der{" "}
        <strong>Espace Trail Pays des Aiguilles d'Arves</strong> markiert dauerhaft{" "}
        <strong>550 Kilometer Wege</strong>, verteilt auf über vierzig nummerierte Strecken:
        von 3 km für eine Familienrunde bis fast 38 km, mit Anstiegen bis 2 380 Höhenmetern.
      </p>
      <p>
        <strong>Strecke Nummer 7 ist der Trail de l'Étendard selbst.</strong> Man kann ihn
        also im Juli besichtigen, im September wiederholen oder schlicht laufen, ohne sich
        je irgendwo anzumelden. Angeleinte Hunde sind auf den markierten Strecken erlaubt.
      </p>

      <h2>Was man wissen sollte, wenn man in Albiez wohnt</h2>
      <p>
        Sagen wir es offen:{" "}
        <strong>
          Keine Strecke des Espace Trail startet in Albiez-Montrond.
        </strong>{" "}
        Sie beginnen in Saint-Sorlin-d'Arves, Saint-Jean-d'Arves, La Toussuire, Le Corbier,
        im Villards-Tal und im Gebiet von La Tour-en-Maurienne. Albiez liegt in derselben
        Gegend, aber nicht im selben Netz.
      </p>
      <p>
        In der Praxis heißt das fünfzehn bis zwanzig Minuten Fahrt bis zu einem Start —
        Saint-Sorlin ist 12 km entfernt, ohne Umweg durchs Tal. Wenig für ein Netz von
        550 km, aber nicht null, und man weiß es besser vor der Buchung.
      </p>
      <p>
        Direkt ab dem Dorf gibt es dafür unsere{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">sechs markierten Wanderungen</Link>
        , von 40 Minuten bis 3,5 Stunden. Genug, um an Tagen ohne Auto von der Haustür aus
        zu laufen.
      </p>

      <h2>Dasselbe Massiv, zu Fuß und mit dem Rad</h2>
      <p>
        Eine geografische Kuriosität: Die Läufer der 65 km überqueren die Grandes Rousses zu
        Fuß ab Bourg-d'Oisans, während Radfahrende dasselbe Massiv einen Monat früher auf
        der Straße überwinden, über den Col de la Croix de Fer und den Glandon. Eine
        Barriere, zwei Arten hinüber — und Albiez liegt für beide auf der richtigen Seite.
        Siehe{" "}
        <Link href="/de/guide/albiez-camp-de-base-grands-cols">
          Albiez, Basislager der großen Pässe
        </Link>
        .
      </p>

      <h2>Rund um das Rennen</h2>
      <p>
        Anfang August hat auch das Dorf sein Fest —{" "}
        <Link href="/de/guide/tradi-cimes-albiez">Tradi'Cimes</Link>, kostenlos, am
        Wochenende. Mitte Juli findet der{" "}
        <Link href="/de/guide/cross-triathlon-swimrun-albiez">
          Cross-Triathlon und Swimrun
        </Link>{" "}
        am Badesee des Dorfes statt. Und zur Erholung das bewachte Baden am{" "}
        <Link href="/de/guide/lac-du-mollard-baignade">Badesee von Le Mollard</Link>.
      </p>
      <p>
        Der Rest der Saison steht auf unserer{" "}
        <Link href="/de/sommer">Sommerseite</Link>.
      </p>
    </>
  );
}
