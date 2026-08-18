import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond ha avuto la buona idea di segnalare i suoi itinerari e di distribuirli su tutti i livelli. Sei di
        essi partono dal paese, da Le Mollard o da un parcheggio a pochi minuti in auto. Ecco i sei, dal più corto al più
        lungo, con quello che c'è da sapere prima di infilare gli scarponi.
      </p>

      <h2>1. La croix du Châtel — 30 minuti di salita</h2>
      <p>
        È la passeggiata che comincia letteralmente dietro la residenza. La croix du Châtel culmina a{" "}
        <strong>1754 m</strong>, cioè 124 m sopra il parcheggio (1630 m), e si guadagna in mezz'ora di salita.
      </p>
      <p>
        Dal parcheggio, seguite il chemin du Châtel fino alla sua estremità: gira verso destra e continua sul fianco della
        piccola montagna. In fondo alla stradina, prendete il sentiero di destra che sale fino alla croce.
      </p>
      <div className="facts">
        <p>
          <strong>Partenza</strong>: chemin du Châtel, a Le Mollard · <strong>Durata</strong>: 30 min di salita ·{" "}
          <strong>Dislivello</strong>: 124 m
        </p>
      </div>

      <h2>2. Il giro delle Contamines — 40 minuti</h2>
      <p>
        Un anello molto pianeggiante con partenza dal centro del paese, che basta per uscire dall'abitato e aprire il
        paesaggio. La partenza è in rue Froide, di fronte al bar tabacchi Constantin; prendete la via fino
        all'incrocio, poi a destra, e seguite il sentiero che gira attorno alla collinetta delle Contamines.
      </p>
      <p>
        Attenzione, <strong>l'itinerario è condiviso</strong>: vi si incrociano biciclette e, d'inverno, tiri di cani da
        slitta. Restate attenti e lasciate passare.
      </p>
      <div className="facts">
        <p>
          <strong>Partenza</strong>: rue Froide, centro del paese · <strong>Durata</strong>: 40 min ·{" "}
          <strong>Dislivello</strong>: 37 m · <strong>Distanza</strong>: 2,2 km
        </p>
      </div>

      <h2>3. L'anello dello specchio d'acqua del Mollard — 30 minuti</h2>
      <p>
        Anello per famiglie attorno allo specchio d'acqua, molto ben esposto, con partenza diretta dall'alloggio. Offre
        una vista libera sulle{" "}
        <Link href="/it/guide/aiguilles-arves">Aiguilles d'Arves</Link>, sul ghiacciaio de l'Étendard e sulla valle
        dell'Arvan, per appena 30 minuti di cammino e quasi nessun dislivello.
      </p>
      <p>
        Lo specchio d'acqua ha due vite: riserva d'acqua per la neve artificiale d'inverno,{" "}
        <Link href="/it/guide/lac-du-mollard-baignade">zona balneabile d'estate</Link>.
      </p>

      <h2>4. Il sentiero di La Plaigne — 2 ore</h2>
      <p>
        Un andata e ritorno facile che parte a destra della seggiovia des Échaux, a Le Mollard, nel parcheggio di fronte
        alla casa per vacanze La Pierre aux Fées. Poco dislivello, e una vista continua sulle Aiguilles d'Arves,
        sull'altopiano di Montrond, sul Mont Emy e sulla Grande Chible.
      </p>
      <ol>
        <li>
          Seguite la pista fino all'incrocio con il sentiero che raggiunge il ristorante d'altura Le Trapanel, poi
          continuate diritti sul sentiero di La Plaigne.
        </li>
        <li>
          Attraversate diverse conche fino ai piedi di una croce, con un tavolo da picnic di fronte: l'itinerario si
          ferma lì.
        </li>
        <li>Rientro per lo stesso percorso.</li>
      </ol>
      <p>
        <strong>Sicurezza</strong>: è sconsigliato avventurarsi oltre il capolinea. Le conche da attraversare rendono il
        settore potenzialmente valanghivo.
      </p>
      <div className="facts">
        <p>
          <strong>Partenza</strong>: seggiovia des Échaux, a Le Mollard · <strong>Durata</strong>: 2 h ·{" "}
          <strong>Dislivello</strong>: 200 m · <strong>Distanza</strong>: 5 km
        </p>
      </div>

      <h2>5. Il giro della Cochette — 3 ore</h2>
      <p>
        Un anello di 8 km con partenza dal centro del paese, con vista sulle creste di Lâcha, sul paese di
        Albiez-le-Jeune e sulle piramidi di terra. È anche il più ricco dei sei sul piano del patrimonio: si attraversa un
        piano montano dove ogni angolo di terra era un tempo coltivato — orzo, segale, patate, lino, barbabietola — e dove
        le <em>broues</em>, quelle scarpate di terrazzamento spesso bordate di aceri, segnavano i limiti delle parcelle.
      </p>
      <ol>
        <li>Dal centro del paese, prendete la RD80 in direzione di Albiez-le-Jeune per 100 m.</li>
        <li>Lasciate la RD80 imboccando una strada sulla sinistra.</li>
        <li>All'incrocio, a destra direzione Les Crozets, fino al bivio de La Côte.</li>
        <li>A sinistra, il cammino scende fino al bivio del Bois du Nez.</li>
        <li>
          Diritti sul sentiero erboso che porta alla borgata di La Cochette — la vista su Le Moine de Champlan torna più
          volte.
        </li>
        <li>Da La Cochette, seguite la direzione Le Villard Sambuis.</li>
        <li>
          100 m di strada, poi il sentiero sulla sinistra. A Villard Sambuis, aggirate il piccolo monte, tornate verso La
          Cochette e raggiungete il bivio di Les Crozets.
        </li>
        <li>Rientro in paese per il percorso dell'andata.</li>
      </ol>
      <div className="facts">
        <p>
          <strong>Partenza</strong>: centro di Albiez-Montrond · <strong>Durata</strong>: 3 h ·{" "}
          <strong>Dislivello</strong>: 245 m · <strong>Distanza</strong>: 8 km
        </p>
      </div>

      <h2>6. L'altopiano di Montrond da Le Chalmieu — 3 h 30</h2>
      <p>
        Il più lungo dei sei, e il solo che richiede di prendere l'auto: 7,5 km dall'alloggio, circa 15 minuti. È anche un
        itinerario da <strong>ciaspole e sci nordico</strong> d'inverno.
      </p>
      <p>
        Dal parcheggio della borgata di Le Chalmieu, individuate il cartello di partenza viola. Il sentiero sale in
        direzione del «Relai TV», alternando tratti di sentiero e brevi passaggi su strada (10 m ogni volta): Combet du
        dessus, l'Oratoire, Ordière dessous poi Ordière dessus, la fontaine de l'Âne. Al Relai TV, seguite la pista verso
        Les Chabottes, dove la passeggiata comoda forma un anello. Il rientro avviene per lo stesso itinerario.
      </p>
      <p>
        Alcune tavole di orientamento sul posto permettono di identificare le cime. Il sentiero serpeggia in pieno
        alpeggio, ai piedi delle Aiguilles d'Arves.
      </p>
      <div className="facts">
        <p>
          <strong>Partenza</strong>: parcheggio della borgata di Le Chalmieu (7,5 km) · <strong>Durata</strong>: 3 h 30 ·{" "}
          <strong>Dislivello</strong>: 424 m
        </p>
      </div>

      <h2>Camminare accompagnati</h2>
      <p>
        Yves Vionnet, accompagnatore di montagna con base ad Albiez, propone escursioni guidate ad Albiez, nella Vanoise e
        altrove — in primavera come in autunno, d'estate come d'inverno, con o senza ciaspole. È la scelta giusta per la
        fauna, la flora e la storia dei luoghi, che una guida cartacea non racconta.
      </p>
      <p>
        Soprattutto, <strong>è attivo tutto l'anno, bassa stagione compresa</strong>. È un'eccezione nella località:
        quando gli impianti sono chiusi e una parte dei negozi abbassa la serranda, in aprile o in ottobre, resta un modo
        per occupare una giornata di montagna.
      </p>
      <div className="facts">
        <p>
          <strong>Albiez Randonnée Patrimoine — Yves Vionnet</strong>
          <br />
          <a href={PROPERTY.links.mountainGuide} target="_blank" rel="noopener noreferrer">
            albiezrandopatrimoine.com
          </a>
        </p>
      </div>
      <p>
        L'ufficio del turismo di Albiez-Montrond, nel centro del paese, vende inoltre guide escursionistiche che coprono
        quattro settori, tra cui quello di Albiez-Montrond e Albiez-le-Jeune.
      </p>

      <h2>E d'inverno?</h2>
      <p>
        Tre di questi itinerari (Contamines, La Plaigne, Le Chalmieu) sono percorribili con le ciaspole. Per il resto
        della stagione fredda, tutto si svolge sul{" "}
        <Link href="/it/sci">comprensorio sciistico</Link>, a 250 m dall'alloggio.
      </p>
    </>
  );
}
