import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        A 300 metri dall'alloggio, Le Kavalkada propone di scoprire la montagna a cavallo o in pony:
        boschi, alpeggi, prati. Passeggiate, lezioni in campo, corsi settimanali — con istruttori diplomati
        dallo Stato.
      </p>

      <h2>Le formule</h2>

      <h3>Per i più piccoli — 30 min o 1 h</h3>
      <p>
        Giri in pony di mezz'ora o di un'ora <strong>attorno al Châtel</strong>, cioè proprio sopra
        l'alloggio. Formato ideale per un primo contatto: abbastanza breve per tenere l'attenzione,
        abbastanza lungo perché sia una vera uscita.
      </p>
      <p>
        Il giro segue l'<strong>anello del Châtel</strong>, e la residenza Le Hameau des Aiguilles è
        costruita sul fianco del Châtel: in concreto,{" "}
        <strong>il percorso passa davanti allo chalet</strong>. Si possono quindi vedere passare i bambini
        dal balcone e raggiungerli a piedi in pochi minuti.
      </p>
      <p>
        È del resto, anche a piedi,{" "}
        <strong>la passeggiata più semplice e più facile con partenza dallo chalet</strong> — il punto di
        partenza di tutto il resto, descritto nella nostra guida alle{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">escursioni segnalate di Albiez</Link>.
      </p>

      <h3>Per i più esperti — 1 h 30</h3>
      <p>
        Passeggiate negli alpeggi, <strong>ai piedi delle{" "}
        <Link href="/it/guide/aiguilles-arves">Aiguilles d'Arves</Link></strong>. È lo scenario a fare la
        differenza.
      </p>

      <h3>La mezza giornata</h3>
      <p>
        Una passeggiata attraverso i <strong>prati della Cochette</strong> e il paese di Albiez. Lo stesso
        settore del{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">giro della Cochette</Link>, visto da un'altra
        quota.
      </p>

      <h3>Le lezioni in campo</h3>
      <p>
        Lezioni collettive per tutti i livelli, iniziazione e perfezionamento. Anche lezioni private,
        singole o in corso.
      </p>

      <h3>I corsi di pony settimanali</h3>
      <p>
        Il centro accoglie bambini e ragazzi tutta l'estate per corsi settimanali. È la formula che
        struttura un soggiorno in famiglia: i bambini hanno la loro attività, gli adulti hanno le loro
        mattine.
      </p>

      <div className="facts">
        <p>
          <strong>Le Kavalkada</strong> — centro equestre, a 300 m dall'alloggio
          <br />
          <strong>Orari</strong> (dal 08/07 al 31/08, soggetti a variazioni): lunedì, martedì, mercoledì,
          giovedì, venerdì e domenica, dalle 9 alle 12 e dalle 14 alle 19.{" "}
          <strong>Chiuso il sabato.</strong>
          <br />
          <strong>Istruttori</strong>: diplomati dallo Stato — tariffe specifiche per i gruppi
        </p>
      </div>

      <h2>Un secondo centro equestre al colle</h2>
      <p>
        Anche il <Link href="/it/guide/col-du-mollard-velo">col du Mollard</Link> ospita un centro equestre
        con maneggio, in funzione d'estate. È proprio accanto all'area ricreativa del colle (specchio
        d'acqua, vasca per bambini, bocce, area gioco e picnic) — quanto basta per organizzare una mezza
        giornata completa nello stesso posto.
      </p>

      <h2>Chiuso il sabato: da mettere in conto</h2>
      <p>
        Il sabato è il giorno di arrivo e di partenza nella maggior parte degli affitti della località, ed è
        proprio il giorno di chiusura del Kavalkada. Su una settimana da sabato a sabato restano sei giorni
        utili: bastano, a condizione di non contare sul primo.
      </p>

      <p>
        Le altre attività estive a poche centinaia di metri:{" "}
        <Link href="/it/guide/lac-du-mollard-baignade">lo specchio d'acqua del Mollard</Link> e{" "}
        <Link href="/it/guide/bmx-vtt-trottinette-albiez">la pista di BMX</Link>. Il programma completo è
        sulla <Link href="/it/estate">pagina estate dell'alloggio</Link>.
      </p>
    </>
  );
}
