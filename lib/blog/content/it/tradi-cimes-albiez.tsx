import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Tradi'Cimes è la festa del paese, a inizio agosto, ed è gratuita. Due giorni di
        musiche e danze tradizionali, mestieri artigiani e dimostrazioni agricole,
        distribuiti su <strong>due luoghi</strong>: piazza Opinel al Chef-lieu e il laghetto
        del Mollard. È la seconda metà di una quindicina che ne conta due:{" "}
        <Link href="/it/guide/celti-cimes-festival-albiez">Celti'Cimes</Link> si tiene
        quindici giorni prima, nello stesso paese.
      </p>

      <h2>Due luoghi, due atmosfere</h2>
      <p>
        <strong>Piazza Opinel</strong>, al Chef-lieu, è l'incrocio delle strade di
        Saint-Jean-de-Maurienne, Albiez-le-Jeune e Le Mollard. È lì che si svolge la
        domenica, dalle 9 alle 18: il mercato, le dimostrazioni, i balli.
      </p>
      <p>
        <strong>Il laghetto del Mollard</strong>, a 300 metri dall'appartamento, accoglie
        l'altro versante della festa, quello musicale, sull'erba e di fronte alle Aiguilles
        d'Arves. Ci si va a piedi dalla nostra porta, e si risale quando si vuole.
      </p>

      <h2>Il programma</h2>

      <h3>Il mercato artigianale</h3>
      <p>
        Mestieri, non banchi di rivendita: saponeria, prodotti aromatici, torrefazione del
        caffè, scultura su legno, gioielli, ceramica, mieli. Vi si aggiunge un{" "}
        <strong>concorso di scultura a bassorilievo</strong>, che si può seguire nel corso
        della giornata.
      </p>

      <h3>Le dimostrazioni agricole</h3>
      <p>
        È ciò che distingue Tradi'Cimes da un mercato di paese: la mungitura, i cani da
        pastore al lavoro, la presentazione dei bovini, le macchine agricole. La montagna
        che lavora, mostrata da chi ci lavora.
      </p>

      <h3>Musiche e danze</h3>
      <p>
        Danze folcloristiche e musica tradizionale — il repertorio alpino anziché quello
        irlandese, ed è lì la differenza con Celti'Cimes. Chiosco e piccola ristorazione sul
        posto.
      </p>

      <h3>Per i bambini</h3>
      <p>
        Attività intorno al legno, in continuità con il concorso di scultura. Il formato si
        presta bene ai bambini piccoli: si entra, si esce, e nulla è a pagamento.
      </p>

      <div className="facts">
        <p>
          <strong>Quando</strong>: due giorni a inizio agosto — pomeriggio e sera il sabato,
          domenica dalle 9 alle 18
          <br />
          <strong>Dove</strong>: piazza Opinel al Chef-lieu e il laghetto del Mollard
          <br />
          <strong>Prezzo</strong>: ingresso libero
          <br />
          <strong>Sul posto</strong>: chiosco, piccola ristorazione, servizi pubblici,
          parcheggio gratuito
          <br />
          <strong>Accessibilità</strong>: accessibile in sedia a rotelle
          <br />
          <strong>Animali</strong>: ammessi, al guinzaglio
          <br />
          <strong>Contatto</strong>: +33 6 72 08 37 88 — tradicimesalbiezmontrond@gmail.com
        </p>
      </div>

      <h2>Due festival in quindici giorni</h2>
      <p>
        È una particolarità di Albiez che non si immagina guardando la dimensione del paese:
        due festival in quindici giorni, fine luglio e inizio agosto, entrambi nel comune.{" "}
        <Link href="/it/guide/celti-cimes-festival-albiez">Celti'Cimes</Link> è un festival
        di musica irlandese con stage di strumento; Tradi'Cimes è la festa del posto,
        gratuita e senza iscrizione.
      </p>
      <p>
        Per chi colloca le proprie date su quelle due settimane, c'è di che riempire due
        serate a settimana senza lasciare il comune — cosa che, in una stazione di questa
        taglia, non è scontata.
      </p>

      <h2>Prolungare la giornata</h2>
      <p>
        I saperi mostrati in piazza Opinel si visitano anche nel resto dell'anno. A venti
        minuti, la{" "}
        <Link href="/it/guide/fromagerie-cooperative-beaufort-des-arves">
          cooperativa lattiera della Vallée des Arves
        </Link>{" "}
        produce il Beaufort e si può visitare. In paese, la{" "}
        <Link href="/it/guide/boulangerie-moulin-valentin-albiez">
          panetteria del Moulin Valentin
        </Link>{" "}
        e i{" "}
        <Link href="/it/guide/faire-ses-courses-a-albiez">negozi di Albiez</Link>.
      </p>
      <p>
        E per il resto della settimana, le{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">sei escursioni segnalate</Link> che
        partono dal paese, o la <Link href="/it/estate">pagina estate</Link> nel suo
        insieme.
      </p>
    </>
  );
}
