import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        A 350 metri dall'alloggio, lo specchio d'acqua del Mollard conduce una doppia vita: riserva
        d'acqua per la neve artificiale d'inverno, base ricreativa e balneabile d'estate. Tra luglio
        e agosto è il punto d'incontro del settore.
      </p>

      <h2>La balneazione</h2>
      <p>
        Il lago è aperto alla balneazione d'estate ed è{" "}
        <strong>sorvegliato dal 1° luglio al 31 agosto, tutti i giorni dalle 12 alle 18</strong>.
        Fuori da questa fascia oraria la balneazione non è sorvegliata.
      </p>
      <p>
        È acqua di montagna a 1630 metri: a inizio stagione va meritata, e diventa francamente
        piacevole nel cuore dell'estate.
      </p>

      <h2>Cosa c'è intorno</h2>
      <ul>
        <li>
          <strong>Una struttura gonfiabile</strong> sullo specchio d'acqua: è ciò che occupa i
          bambini per un intero pomeriggio.
        </li>
        <li>
          <strong>Una vasca per bambini</strong> per i più piccoli.
        </li>
        <li>
          <strong>Tavoli da picnic.</strong>
        </li>
        <li>
          <strong>Un campo da bocce</strong> e un <strong>campo da pallavolo</strong>.
        </li>
        <li>
          <strong>Servizi igienici pubblici.</strong>
        </li>
      </ul>
      <p>
        Una seconda area ricreativa si trova dall'altro lato della strada, al{" "}
        <Link href="/it/guide/col-du-mollard-velo">col du Mollard</Link>, con specchio d'acqua e
        vasca per bambini sorvegliati, servizi, bocce, area gioco e area picnic.
      </p>

      <h2>Il giro a piedi: 30 minuti</h2>
      <p>
        Il giro dello specchio d'acqua è un anello per famiglie con partenza diretta dall'alloggio,
        molto ben esposto, con <strong>poco dislivello e 30 minuti di cammino</strong>. La vista
        arriva alle{" "}
        <Link href="/it/guide/aiguilles-arves">Aiguilles d'Arves</Link>, al ghiacciaio de l'Étendard
        e alla valle dell'Arvan.
      </p>
      <p>
        È la passeggiata di fine giornata per eccellenza, e il posto migliore del settore per
        fotografare le Aiguilles al tramonto: il lago le riflette.
      </p>
      <p>
        Gli altri cinque itinerari segnalati del comune sono descritti nel nostro articolo{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">
          le sei escursioni segnalate di Albiez-Montrond
        </Link>
        .
      </p>

      <h2>D'inverno, lo stesso lago</h2>
      <p>
        Da dicembre a marzo lo specchio d'acqua fa da{" "}
        <strong>riserva per i 50 cannoni da neve</strong> del comprensorio. È lui a garantire una
        parte dell'innevamento delle piste. La passeggiata attorno resta possibile, in uno scenario
        del tutto diverso.
      </p>

      <div className="facts">
        <p>
          <strong>Distanza dall'alloggio</strong>: 350 m
          <br />
          <strong>Balneazione sorvegliata</strong>: dal 01/07 al 31/08, tutti i giorni dalle 12 alle
          18
          <br />
          <strong>Giro del lago</strong>: 30 min, poco dislivello
        </p>
      </div>

      <p>
        Le altre attività estive —{" "}
        <Link href="/it/guide/equitation-le-kavalkada">pony</Link>,{" "}
        <Link href="/it/guide/bmx-vtt-trottinette-albiez">BMX e mountain bike</Link> — sono a poche
        centinaia di metri. Il programma completo è sulla{" "}
        <Link href="/it/estate">pagina estate dell'alloggio</Link>.
      </p>
    </>
  );
}
