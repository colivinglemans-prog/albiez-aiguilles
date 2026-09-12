import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Der Cross-Triathlon und Swimrun des Aiguilles d'Arves findet Mitte Juli am Badesee
        von Albiez statt — 300 Meter von der Wohnung. Zwei Wettkämpfe am selben Tag,{" "}
        <strong>ab 8 Jahren</strong>, in einer Kulisse, in der man mit Blick auf die
        Aiguilles schwimmt. Es ist die Sache eines Vormittags und eines Nachmittags; der
        Rest der Woche gehört Ihnen.
      </p>

      <h2>Zwei Wettkämpfe, ein Tag</h2>

      <h3>Der Cross-Triathlon, am Vormittag</h3>
      <p>
        Schwimmen, Mountainbike, dann Laufen im Trail-Stil. Drei Formate, nach Alter
        getrennt:
      </p>
      <ul>
        <li>
          <strong>Format S, ab 16 Jahren</strong> — 500 m Schwimmen, 11,97 km Mountainbike,
          4,8 km Laufen. Start um 9.30 Uhr.
        </li>
        <li>
          <strong>12-15 Jahre</strong> — 200 m, 5,4 km, 2,4 km. Start um 12 Uhr.
        </li>
        <li>
          <strong>8-11 Jahre</strong> — 100 m, 5,4 km, 1 km. Start um 12.45 Uhr.
        </li>
      </ul>

      <h3>Der Swimrun, am Nachmittag</h3>
      <p>
        Schwimmen und Laufen im Wechsel, ohne Rad. Fünf Formate, eines davon im Zweierteam:
      </p>
      <ul>
        <li>
          <strong>Format S, ab 16 Jahren</strong> — 900 m Schwimmen, 8,8 km Laufen.
        </li>
        <li>
          <strong>12-19 Jahre</strong>, zu zweit oder allein — 450 m, 4,8 km.
        </li>
        <li>
          <strong>10-11 Jahre</strong> — 360 m, 640 m.
        </li>
        <li>
          <strong>8-9 Jahre</strong> — 60 m, 580 m.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Wann</strong>: ein Wochenende Mitte Juli
          <br />
          <strong>Wo</strong>: der Badesee von Albiez-Montrond, 300 m von der Wohnung
          <br />
          <strong>Ab</strong>: 8 Jahren
          <br />
          <strong>Vormittags</strong>: Cross-Triathlon — Schwimmen, Mountainbike, Trail
          <br />
          <strong>Nachmittags</strong>: Swimrun — Schwimmen und Laufen
          <br />
          <strong>Anmeldung</strong>: über den Kalender des französischen
          Triathlon-Verbands
        </p>
      </div>

      <h2>Ab 8 Jahren — und das ändert alles</h2>
      <p>
        Die meisten Bergwettkämpfe beginnen mit sechzehn, womit die Frage des
        Familienurlaubs geklärt wäre: Die Eltern starten, die Kinder schauen zu. Hier hat
        jede der vier Altersklassen ihre eigene Distanz, am selben See und am selben Tag.
        Ein Achtjähriger schwimmt seine 60 Meter und läuft seine 580, und trägt eine
        Startnummer wie alle anderen.
      </p>
      <p>
        Es ist auch ganz konkret der Grund, warum es besser ist, nebenan zu schlafen als
        vierzig Autominuten entfernt: ein Start um 9.30 Uhr für die Großen und einer um
        12.45 Uhr für die Kleinen ergeben einen ganzen Tag vor Ort, mit nasser Ausrüstung
        dazwischen.
      </p>

      <h2>Der Badesee, 300 Meter entfernt</h2>
      <p>
        Es ist derselbe See wie den ganzen Sommer über: bewachtes Baden, Planschbecken,
        Tretboote, Wasserspielgerät, Spielplatz und Picknickwiese. Die Einzelheiten stehen
        in unserem Artikel zum{" "}
        <Link href="/de/guide/lac-du-mollard-baignade">Badesee von Le Mollard</Link>.
      </p>
      <p>
        Von der Wohnung geht man zu Fuß hin. Kein Auto abzustellen an einem vollen Tag,
        keine Tasche für den ganzen Tag zu schleppen: Man geht zwischen zwei Starts hinauf
        und zieht sich um, und der Südbalkon trocknet einen Neoprenanzug in einer Stunde.
      </p>

      <h2>Die Woche bleiben</h2>
      <p>
        Der Wettkampf dauert einen Tag. Was ihn umgibt, dauert länger — und dort entscheidet
        sich ein Aufenthalt:
      </p>
      <ul>
        <li>
          Die{" "}
          <Link href="/de/guide/randonnees-balisees-albiez">sechs markierten Wanderungen</Link>{" "}
          ab dem Dorf, von 40 Minuten bis 3,5 Stunden — genug, um eine Strecke zu erkunden
          oder sich im Gehen zu erholen.
        </li>
        <li>
          Mountainbike und E-Bike, mit der{" "}
          <Link href="/de/guide/bmx-vtt-trottinette-albiez">
            BMX-Race-Strecke mitten im Dorf
          </Link>
          .
        </li>
        <li>
          Der <Link href="/de/guide/col-du-mollard-velo">Col du Mollard</Link> am
          Ortsausgang, wenn das Rennrad mitgekommen ist.
        </li>
        <li>
          Und alles, was daraus Urlaub statt einer Sportreise macht:{" "}
          <Link href="/de/guide/albiez-en-famille">Albiez mit Kindern</Link>.
        </li>
      </ul>
      <p>
        Das ganze Sommerprogramm steht auf unserer{" "}
        <Link href="/de/sommer">Sommerseite</Link>.
      </p>
    </>
  );
}
