import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Das ist die Aktivität, die man zu spät bucht. Die Hundeschlittenfahrten von Albiez
        starten am Freizeitgelände Les Contamines im Dorfkern, und die Termine füllen sich
        lange vor der Ankunft der Urlaubsgäste.
      </p>

      <h2>Worum es geht</h2>
      <p>
        Im Schlitten sitzend lässt man sich von einem großen Gespann ziehen. Der Musher
        erklärt, wie die Arbeit der Hunde organisiert ist – welcher zieht, welcher führt, wie
        das Team die Anstrengung verteilt – und die Verbundenheit zwischen Mensch und Tier ist
        die eigentliche Überraschung des Ausflugs.
      </p>
      <p>
        Zwei Formate: <strong>eine halbe Stunde</strong> oder <strong>eine Stunde</strong>.
      </p>

      <div className="facts">
        <p>
          <strong>Start</strong>: Freizeitgelände Les Contamines, Dorfkern von
          Albiez-Montrond
          <br />
          <strong>Zeitraum</strong>: vom 17.12. bis 01.04., täglich, abhängig von den
          Schneeverhältnissen
          <br />
          <strong>Preise</strong>: ab 45 € für Erwachsene, 40 € für Kinder
          <br />
          <strong>Buchung</strong>: unbedingt erforderlich —{" "}
          <a href="tel:+33682759926">06 82 75 99 26</a>
        </p>
      </div>

      <h2>Buchen Sie, sobald Ihre Daten feststehen</h2>
      <p>
        Das ist der wichtigste Punkt dieses Artikels. Die Buchung ist unbedingt erforderlich,
        und es empfiehlt sich, sie <strong>so früh wie möglich</strong> vorzunehmen. In einer
        Schulferienwoche schmelzen die freien Termine innerhalb weniger Tage.
      </p>
      <p>
        Der nützliche Reflex: den Schlitten gleichzeitig mit den{" "}
        <Link href="/de/guide/cours-de-ski-esf-albiez">Skikursen</Link> und der{" "}
        <Link href="/de/guide/louer-ses-skis-a-albiez">Ausrüstung</Link> buchen, also mehrere
        Wochen vor der Abreise.
      </p>

      <h2>Abhängig von der Schneelage</h2>
      <p>
        Die Aktivität hängt vom Schnee am Boden ab, und nicht nur von dem auf den Pisten: der
        Dorfkern liegt tiefer als Le Mollard. Zu Saisonbeginn oder -ende sollten Sie einen
        Plan B haben – die{" "}
        <Link href="/de/guide/randonnees-balisees-albiez">Schneeschuhtour</Link>, die
        Rodelbahn am Mollard oder die{" "}
        <Link href="/de/guide/albiez-c-show">Albiez C'Show</Link> am Dienstagabend.
      </p>

      <h2>Auf derselben Route</h2>
      <p>
        Der <strong>Rundweg der Contamines</strong>, eine 2,2 km lange Runde ab der Rue
        Froide, ist eine gemeinsam genutzte Strecke: dort begegnet man eben auch
        Hundegespannen und Radfahrern. Bleiben Sie aufmerksam und lassen Sie ihnen die Spur.
      </p>

      <h2>Die anderen Aktivitäten abseits des Skifahrens</h2>
      <p>
        Albiez bietet außerdem Motorschlittenfahrten und Igluabende (Skimium / Mustang
        Sports), Schneeschuhwandern und Langlauf. Die Einzelheiten zu den Verleihen stehen in
        unserem Artikel{" "}
        <Link href="/de/guide/louer-ses-skis-a-albiez">
          Skiverleih in Albiez-Montrond
        </Link>
        .
      </p>
    </>
  );
}
