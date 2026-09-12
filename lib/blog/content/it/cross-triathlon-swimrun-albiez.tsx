import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Il Cross Triathlon e Swimrun des Aiguilles d'Arves si tiene a metà luglio al
        laghetto di Albiez, a 300 metri dall'appartamento. Due gare nella stessa giornata,
        aperte <strong>dagli 8 anni</strong>, in uno scenario in cui si nuota di fronte alle
        Aiguilles. È questione di una mattina e di un pomeriggio; il resto della settimana
        resta a lei.
      </p>

      <h2>Due gare, una giornata</h2>

      <h3>Il cross triathlon, la mattina</h3>
      <p>Nuoto, mountain bike, poi corsa di tipo trail. Tre formati, divisi per età:</p>
      <ul>
        <li>
          <strong>Formato S, dai 16 anni</strong> — 500 m di nuoto, 11,97 km di mountain
          bike, 4,8 km di corsa. Partenza alle 9.30.
        </li>
        <li>
          <strong>12-15 anni</strong> — 200 m, 5,4 km, 2,4 km. Partenza a mezzogiorno.
        </li>
        <li>
          <strong>8-11 anni</strong> — 100 m, 5,4 km, 1 km. Partenza alle 12.45.
        </li>
      </ul>

      <h3>Lo swimrun, il pomeriggio</h3>
      <p>Nuoto e corsa alternati, senza bici. Cinque formati, uno dei quali in coppia:</p>
      <ul>
        <li>
          <strong>Formato S, dai 16 anni</strong> — 900 m di nuoto, 8,8 km di corsa.
        </li>
        <li>
          <strong>12-19 anni</strong>, in coppia o da solo — 450 m, 4,8 km.
        </li>
        <li>
          <strong>10-11 anni</strong> — 360 m, 640 m.
        </li>
        <li>
          <strong>8-9 anni</strong> — 60 m, 580 m.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Quando</strong>: un fine settimana di metà luglio
          <br />
          <strong>Dove</strong>: il laghetto di Albiez-Montrond, a 300 m dall'appartamento
          <br />
          <strong>Dai</strong>: 8 anni
          <br />
          <strong>La mattina</strong>: cross triathlon — nuoto, mountain bike, trail
          <br />
          <strong>Il pomeriggio</strong>: swimrun — nuoto e corsa
          <br />
          <strong>Iscrizioni</strong>: sul calendario della Federazione francese di
          triathlon
        </p>
      </div>

      <h2>Dagli 8 anni, e cambia tutto</h2>
      <p>
        La maggior parte delle gare di montagna parte dai sedici anni, il che risolve la
        questione delle vacanze in famiglia: i genitori gareggiano, i figli guardano. Qui
        tutte e quattro le fasce d'età hanno la loro distanza, sullo stesso laghetto e nella
        stessa giornata. Un bambino di otto anni nuota i suoi 60 metri e corre i suoi 580, e
        porta un pettorale come tutti gli altri.
      </p>
      <p>
        È anche, molto concretamente, il motivo per cui conviene dormire accanto piuttosto
        che a quaranta minuti d'auto: una partenza alle 9.30 per i grandi e un'altra alle
        12.45 per i piccoli fanno una giornata intera sul posto, con il materiale bagnato in
        mezzo.
      </p>

      <h2>Il laghetto, a 300 metri</h2>
      <p>
        È lo stesso laghetto di tutta l'estate: balneazione sorvegliata, vasca per i
        piccoli, pedalò, struttura gonfiabile, area giochi e area picnic. Il dettaglio è nel
        nostro articolo sul{" "}
        <Link href="/it/guide/lac-du-mollard-baignade">laghetto del Mollard</Link>.
      </p>
      <p>
        Dall'appartamento ci si va a piedi. Nessuna auto da parcheggiare in una giornata
        affollata, nessuna borsa da portarsi dietro per l'intera giornata: si risale a
        cambiarsi fra due partenze, e il balcone esposto a sud asciuga una muta in un'ora.
      </p>

      <h2>Restare la settimana</h2>
      <p>
        La gara dura un giorno. Ciò che la circonda dura di più, ed è lì che si gioca un
        soggiorno:
      </p>
      <ul>
        <li>
          Le{" "}
          <Link href="/it/guide/randonnees-balisees-albiez">sei escursioni segnalate</Link>{" "}
          che partono dal paese, da 40 minuti a 3 ore e mezza — quanto basta per ricognire
          un terreno o per recuperare camminando.
        </li>
        <li>
          La mountain bike e le bici elettriche, con la{" "}
          <Link href="/it/guide/bmx-vtt-trottinette-albiez">
            pista di BMX race al centro del paese
          </Link>
          .
        </li>
        <li>
          Il <Link href="/it/guide/col-du-mollard-velo">col du Mollard</Link>, all'uscita
          della frazione, per chi si è portato la bici da strada.
        </li>
        <li>
          E tutto ciò che ne fa una vacanza anziché una trasferta sportiva:{" "}
          <Link href="/it/guide/albiez-en-famille">Albiez in famiglia</Link>.
        </li>
      </ul>
      <p>
        Il programma completo della stagione è sulla nostra{" "}
        <Link href="/it/estate">pagina estate</Link>.
      </p>
    </>
  );
}
