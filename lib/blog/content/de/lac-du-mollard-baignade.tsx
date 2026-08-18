import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        350 Meter von der Wohnung führt der See am Mollard ein Doppelleben: Wasserspeicher für
        die Beschneiung im Winter, Freizeit- und Badegelände im Sommer. Zwischen Juli und August
        ist er der Treffpunkt des Sektors.
      </p>

      <h2>Das Baden</h2>
      <p>
        Der See ist im Sommer zum Baden geöffnet und{" "}
        <strong>vom 1. Juli bis 31. August täglich von 12 bis 18 Uhr bewacht</strong>. Außerhalb
        dieses Zeitfensters findet keine Aufsicht statt.
      </p>
      <p>
        Es ist Bergwasser auf 1.630 Metern: zu Saisonbeginn muss man es sich verdienen, und
        mitten im Sommer wird es ausgesprochen angenehm.
      </p>

      <h2>Was es drumherum gibt</h2>
      <ul>
        <li>
          <strong>Ein aufblasbares Spielgerät</strong> auf dem Wasser – das beschäftigt die
          Kinder einen ganzen Nachmittag.
        </li>
        <li>
          <strong>Ein Planschbecken</strong> für die Kleinsten.
        </li>
        <li>
          <strong>Picknicktische.</strong>
        </li>
        <li>
          <strong>Eine Boulebahn</strong> und ein <strong>Volleyballfeld</strong>.
        </li>
        <li>
          <strong>Öffentliche Toiletten.</strong>
        </li>
      </ul>
      <p>
        Ein zweites Freizeitgelände liegt auf der anderen Straßenseite am{" "}
        <Link href="/de/guide/col-du-mollard-velo">Col du Mollard</Link>, mit bewachtem
        Badebereich und Planschbecken, Sanitäranlagen, Boulebahn, Spielplatz und Picknickplatz.
      </p>

      <h2>Die Runde zu Fuß: 30 Minuten</h2>
      <p>
        Die Umrundung des Sees ist eine Familienrunde direkt ab der Wohnung, sehr sonnig, mit{" "}
        <strong>wenig Höhenunterschied und 30 Minuten Gehzeit</strong>. Der Blick reicht auf die{" "}
        <Link href="/de/guide/aiguilles-arves">Aiguilles d'Arves</Link>, den Gletscher de
        l'Étendard und das Arvan-Tal.
      </p>
      <p>
        Es ist der Spaziergang für den späten Tag schlechthin und der beste Ort des Sektors, um
        die Aiguilles im Sonnenuntergang zu fotografieren: der See spiegelt sie.
      </p>
      <p>
        Die fünf anderen markierten Routen der Gemeinde sind in unserem Artikel{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">
          die sechs markierten Wanderungen von Albiez-Montrond
        </Link>{" "}
        beschrieben.
      </p>

      <h2>Im Winter derselbe See</h2>
      <p>
        Von Dezember bis März dient das Gewässer als{" "}
        <strong>Wasserspeicher für die 50 Schneekanonen</strong> des Skigebiets. Er sichert einen
        Teil der Beschneiung der Pisten. Der Spaziergang rundherum bleibt möglich, in einer ganz
        anderen Kulisse.
      </p>

      <div className="facts">
        <p>
          <strong>Entfernung von der Wohnung</strong>: 350 m
          <br />
          <strong>Bewachter Badebetrieb</strong>: vom 01.07. bis 31.08., täglich von 12 bis
          18 Uhr
          <br />
          <strong>Seeumrundung</strong>: 30 Min., wenig Höhenunterschied
        </p>
      </div>

      <p>
        Die übrigen Sommeraktivitäten —{" "}
        <Link href="/de/guide/equitation-le-kavalkada">Ponys</Link>,{" "}
        <Link href="/de/guide/bmx-vtt-trottinette-albiez">BMX und Mountainbike</Link> — liegen
        wenige Hundert Meter entfernt. Das vollständige Programm steht auf{" "}
        <Link href="/de/sommer">der Sommerseite der Wohnung</Link>.
      </p>
    </>
  );
}
