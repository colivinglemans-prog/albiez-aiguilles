import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez ist ein familiäres Skigebiet im Tal der Maurienne: 40 km Pisten, 13 Bergbahnen, 22 Abfahrten
        zwischen 1.500 und 2.060 Metern. Es teilt sich in drei Sektoren – Montrond, Chef-lieu und Le Mollard –,
        zu denen das Nachbardorf Albiez-le-Jeune hinzukommt. Unsere Wohnung liegt in Le Mollard, dem höchsten der
        drei.
      </p>

      <h2>Das Skigebiet in Zahlen</h2>
      <ul>
        <li>
          <strong>40 km Pisten</strong> verteilt auf <strong>22 Abfahrten</strong>
        </li>
        <li>
          <strong>13 Bergbahnen</strong>
        </li>
        <li>
          Höhe: von <strong>1.500 m</strong> bis <strong>2.060 m</strong>
        </li>
        <li>
          <strong>50 Schneekanonen</strong> zur Ergänzung des Naturschnees
        </li>
      </ul>
      <p>
        Das Plateau von Montrond profitiert von geringen Niederschlägen und einer bemerkenswerten Helligkeit, mit
        durchgehender Schneelage fast sechs Monate im Jahr. Die Pisten sind sonnig und breit – es ist ein Gebiet,
        in dem man bequem Skifahren lernt, kein Gebiet, in dem man steile Wände sucht.
      </p>

      <h2>Von Le Mollard starten: die drei Bahnen, die man kennen muss</h2>

      <h3>Der Sessellift Les Échaux — das Eingangstor</h3>
      <p>
        <strong>250 bis 300 m von der Wohnung</strong> entfernt führt er von 1.600 m auf 1.800 m. Es ist die
        Bahn, mit der man am schnellsten das gesamte Skigebiet erreicht: man nimmt sie morgens, und dahinter
        öffnet sich alles.
      </p>

      <h3>Der Schlepplift Les Aplanes — der höchste Punkt</h3>
      <p>
        Vom Gipfel der Échaux nimmt man den Schlepplift Les Aplanes, der auf{" "}
        <strong>2.100 m</strong> endet. Es ist der höchste vom Sektor aus erreichbare Punkt.
      </p>

      <h3>Coucou und Polytre — für den Anfang</h3>
      <p>
        Der <strong>Schlepplift Coucou</strong> ist der der Anfänger. Der{" "}
        <strong>Schlepplift Polytre</strong> wird unter anderem von der{" "}
        <Link href="/de/guide/cours-de-ski-esf-albiez">Skischule</Link> genutzt: er bietet mehrere Stellen zum
        Aussteigen, mit steigenden Schwierigkeitsgraden. Genau das Richtige, um ein Kind voranzubringen, ohne es
        auf einen Schlag zu überfordern.
      </p>

      <h2>Welche Reihenfolge für einen ersten Tag?</h2>
      <ol>
        <li>
          <strong>Absoluter Anfänger</strong>: Coucou am Morgen, dann Polytre am Nachmittag für richtige
          Abfahrten.
        </li>
        <li>
          <strong>Mittlerer Skifahrer</strong>: Échaux ab Öffnung, um den Sektor kennenzulernen, dann im Laufe
          des Tages hinüber zum Chef-lieu und nach Montrond.
        </li>
        <li>
          <strong>Guter Skifahrer</strong>: Échaux, dann Aplanes – und das Gebiet entfaltet sich ab 2.100 m.
        </li>
        <li>
          <strong>Sehr guter Skifahrer</strong>: ab den Aplanes und je nach Schneeverhältnissen führen mehrere
          Varianten abseits der Piste durch den Pulverschnee von{" "}
          <strong>2.100 m auf 1.500 m</strong> hinunter, bis zum Sessellift du Loup – 600 Höhenmeter in einem Zug.
          Abseits der Piste heißt ohne Sicherung: Ausrüstung, Lawinenlagebericht und, beim geringsten Zweifel, ein
          Bergführer.
        </li>
      </ol>

      <h2>Der Vorteil, in Le Mollard zu wohnen</h2>
      <p>
        Der Pistenzugang von Le Mollard vereint auf 250 m den Pistenstart, die{" "}
        <Link href="/de/guide/louer-ses-skis-a-albiez">Ausrüstungsverleihe</Link>, den Supermarkt und den
        Treffpunkt der Skischule. Konkret: kein Skibus, kein Skitragen über Hunderte von Metern, und die
        Möglichkeit, zum Mittagessen heimzukommen. Mit Kindern ist das der Unterschied zwischen einer angenehmen
        Woche und einer Woche Logistik.
      </p>
      <p>
        Hier findet auch die{" "}
        <Link href="/de/guide/albiez-c-show">Albiez C'Show</Link> statt, der Dienstagabend in den Schulferien.
      </p>

      <h2>Abseits der Pisten</h2>
      <p>
        Die <Link href="/de/guide/albiez-en-famille">Rodelbahn am Mollard</Link> liegt direkt neben der Residenz,
        sehr sonnig ausgerichtet (die Schneelage ist nicht garantiert). Ansonsten bietet der Ort Schneeschuhe,
        Langlauf,{" "}
        <Link href="/de/guide/chiens-de-traineau-albiez">Hundeschlitten</Link>, Motorschlitten und Igluabende.
      </p>

      <p>
        Die Einzelheiten zu den Entfernungen, zum Skiraum und zum Zugang zur Piste stehen auf{" "}
        <Link href="/de/ski">der Winterseite der Wohnung</Link>.
      </p>
    </>
  );
}
