import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond beherbergt die höchstgelegene BMX-Bahn Frankreichs. Sie ist frei
        zugänglich, liegt im Dorfkern und ist von Sportplätzen und einem Picknickplatz umgeben.
        Und für alles, was rollt, verleiht der Ort E-Mountainbikes, BMX-Räder und E-Scooter.
      </p>

      <h2>Die BMX-Race-Bahn</h2>
      <p>
        Sie liegt im Dorfkern und ist <strong>frei benutzbar</strong>: keine Reservierung, keine
        vorgeschriebene Betreuung. Die Elemente haben{" "}
        <strong>unterschiedliche Schwierigkeitsgrade</strong>, sodass Anfänger und
        Fortgeschrittene auf derselben Bahn fahren können.
      </p>
      <p>
        Die Kulisse macht viel aus: es ist die höchstgelegene BMX-Bahn Frankreichs, und das merkt
        man, wenn man den Blick hebt.
      </p>

      <h2>Was es drumherum gibt</h2>
      <p>
        Die Bahn steht nicht allein – das Ganze bildet ein vollständiges Freizeitgelände:
      </p>
      <ul>
        <li>Fußball- und Basketballplätze</li>
        <li>Tennisplatz</li>
        <li>Boulebahn</li>
        <li>Spielplatz für Kinder</li>
        <li>Picknicktische</li>
      </ul>
      <p>
        Der richtige Plan für einen Familiennachmittag, an dem nicht alle dasselbe machen wollen.
      </p>

      <h2>Ein Rad leihen</h2>

      <h3>Skiset — Albiez Sports (Dorfkern)</h3>
      <p>
        Verleih von <strong>BMX-Rädern</strong> und <strong>E-Scootern</strong>, dazu geführte
        Ausfahrten. Verkaufsfläche von 100 m², Skiausrüstung im Winter und Wanderausrüstung im
        Sommer.
      </p>

      <h3>Skimium — Mustang Sports (Dorfkern)</h3>
      <p>
        <strong>Radschule</strong> und <strong>E-Mountainbikes</strong>. Man findet sie abends
        auch am Pistenzugang von Le Mollard, 250 m von der Wohnung.
      </p>

      <h3>Skiset Ski Attitude und Sport 2000 (Pistenzugang Le Mollard)</h3>
      <p>
        Die beiden Verleihe, die der Wohnung am nächsten liegen, stellen im Sommer auf Wandern
        um. Die Einzelheiten zu jedem stehen in unserem Artikel{" "}
        <Link href="/de/guide/louer-ses-skis-a-albiez">
          Ausrüstung leihen in Albiez-Montrond
        </Link>
        .
      </p>

      <h2>Mountainbiken auf den Wegen</h2>
      <p>
        Mehrere <strong>Mountainbike-Strecken</strong> durchqueren den{" "}
        <Link href="/de/guide/foret-du-rival">Wald von Le Rival</Link>, zwischen 1.300 m und dem
        Col du Mollard. Achtung bei gemeinsam genutzten Wegen: der{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">Rundweg der Contamines</Link> nimmt
        auch Fußgänger auf und im Winter Hundegespanne.
      </p>

      <h2>Und das Rennrad</h2>
      <p>
        Für Rennradfahrer liegt das Thema anderswo: der{" "}
        <Link href="/de/guide/col-du-mollard-velo">Col du Mollard</Link>, seine drei Auffahrten
        und die Runde Arvan-Villards, die Glandon, Croix de Fer und Mollard verbindet.
      </p>
      <p>
        Das Tourismusbüro im Dorfkern stellt Karten und Routen für Rennrad, Gravel und
        Mountainbike bereit, mit oder ohne elektrische Unterstützung.
      </p>
    </>
  );
}
