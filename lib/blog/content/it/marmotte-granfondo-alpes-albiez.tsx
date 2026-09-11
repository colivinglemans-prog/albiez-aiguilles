import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        La Marmotte Granfondo Alpes si corre il 27 giugno 2027, da Bourg-d'Oisans all'Alpe
        d'Huez per il Glandon, il Télégraphe e il Galibier. Settemilacinquecento pettorali, a
        numero chiuso, di cui oltre l'88 % assegnati a stranieri — ed esauriti in meno di un
        giorno. Se legge questo prima di ottobre 2026, è in anticipo: è allora che aprono le
        iscrizioni.
      </p>

      <h2>Le date che contano</h2>
      <div className="facts">
        <p>
          <strong>Gara</strong>: domenica 27 giugno 2027
          <br />
          <strong>Partenza</strong>: Le Bourg-d'Oisans — <strong>arrivo</strong>: Alpe
          d'Huez
          <br />
          <strong>Colli</strong>: Glandon, Télégraphe, Galibier, poi la salita finale
          <br />
          <strong>Partecipanti</strong>: 7 500 al massimo, oltre l'88 % internazionali
          <br />
          <strong>Iscrizioni</strong>: apertura attesa a inizio ottobre 2026, esaurite in
          meno di un giorno
        </p>
      </div>

      <h2>Albiez come campo base: la versione onesta</h2>
      <p>
        Diciamolo subito, perché è ciò che decide:{" "}
        <strong>la mattina della gara, Albiez non è il posto giusto dove dormire.</strong>{" "}
        Bourg-d'Oisans si trova dall'altra parte della Croix de Fer, a un'ora e un quarto o
        un'ora e mezza di auto per il colle — solo d'estate, e non alle cinque del mattino
        di un giorno di gara.
      </p>
      <p>
        Ciò per cui Albiez è adatto è <strong>la settimana precedente</strong>. La
        ricognizione, l'adattamento alla quota, le gambe che si costruiscono senza
        svenarsi: tre delle quattro difficoltà del percorso si riconoscono da qui, e le
        prime due senza nemmeno scendere a fondovalle.
      </p>

      <h2>Ricognizione del percorso da Albiez</h2>

      <h3>Il Glandon, versante Maurienne</h3>
      <p>
        Il giorno della gara il Glandon si sale dall'Oisans e si scende verso la Maurienne.
        Da Albiez, quindi, ciò che si riconosce è <strong>la discesa</strong>, quella
        neutralizzata al cronometro e quella su cui si perde più gente. Raggiungerla non
        obbliga a riscendere a valle: si passa per Montrond, Entraigues e La Villette per
        ritrovare la D926.
      </p>

      <h3>Il Télégraphe e il Galibier</h3>
      <p>
        Le due vere difficoltà cronometrate, e sono nella sua valle. Da Albiez si scende a
        Saint-Jean-de-Maurienne — una ventina di minuti — poi si risale fino a
        Saint-Michel-de-Maurienne per attaccare il Télégraphe. Il Galibier segue subito
        dopo. È l'uscita che più assomiglia a ciò che farà il giorno della gara.
      </p>

      <h3>L'Alpe d'Huez</h3>
      <p>
        L'unica che non riconoscerà da qui senza andarci apposta. Si tiene per il giorno
        della gara, o per una giornata intera dedicata all'Oisans.
      </p>

      <h2>Dormire a 1 600 metri durante la preparazione</h2>
      <p>
        La quota a cui si dorme non è un dettaglio di comfort quando si prepara una gara che
        passa due volte oltre i 2 000 metri. Albiez-Montrond è a 1 600 m, ed è la quota a
        cui dorme, non solo quella a cui pedala.
      </p>
      <p>
        A questo si aggiunge il pratico: una cucina attrezzata, per mangiare ciò che si
        vuole quando si vuole invece di aspettare un servizio; un balcone esposto a sud che
        asciuga una maglia in un'ora; e la quiete di un paese di 300 abitanti nella
        settimana in cui Bourg-d'Oisans si riempie.
      </p>
      <p>
        Un punto da prevedere, perché è concreto:{" "}
        <strong>il deposito sci non è dimensionato per una bici</strong>. Due soluzioni sul
        posto: legarla sul pianerottolo, che è coperto e riparato, o portarla sul balcone.
        Dal parcheggio sono una cinquantina di gradini.
      </p>

      <h2>E se non ha il pettorale</h2>
      <p>
        I 7 500 posti se ne vanno in fretta, e molti ciclisti vengono comunque a pedalare
        quei colli nella stessa settimana, senza numero. Le strade sono le stesse, i
        paesaggi anche, e la Maurienne chiude regolarmente alcuni colli alle auto per una
        mattinata. È tutto nel nostro articolo{" "}
        <Link href="/it/guide/albiez-camp-de-base-grands-cols">
          Albiez, campo base dei grandi colli
        </Link>
        , con il col du Mollard che si trova, per inciso, all'uscita della frazione — vedi{" "}
        <Link href="/it/guide/col-du-mollard-velo">il col du Mollard in bici</Link>.
      </p>
      <p>
        Tutto il resto che la stazione offre d'estate è sulla nostra{" "}
        <Link href="/it/estate">pagina estate</Link>.
      </p>
    </>
  );
}
