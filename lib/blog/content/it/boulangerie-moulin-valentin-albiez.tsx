import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Nel centro di Albiez-Montrond, Le Moulin Valentin prepara tutto sul posto: pane,
        viennoiserie, torte, quiche, panini. E dietro la vetrina, una storia che comincia nel
        1694 — forse prima.
      </p>

      <h2>Una storia che comincia nel 1694</h2>
      <p>
        Le Moulin Valentin non è cosa di ieri. La storia del luogo risale al{" "}
        <strong>1694</strong> ad Albiez-Montrond, e probabilmente a prima ancora. Il resto si
        racconta spingendo la porta: è il tipo di negozio da cui si esce con più informazioni
        che pane.
      </p>

      <h2>Cosa si trova</h2>
      <p>Tutte le ricette sono artigianali e preparate sul posto:</p>
      <ul>
        <li>
          <strong>Pani</strong> artigianali e pani speciali
        </li>
        <li>
          <strong>Viennoiserie</strong> e dolci
        </li>
        <li>
          <strong>Torte dolci</strong> e dessert
        </li>
        <li>
          <strong>Tartine, quiche e panini</strong>
        </li>
        <li>
          <strong>Bevande calde e fresche</strong> (senza alcol)
        </li>
      </ul>

      <h2>Le specialità per il picnic e l'aperitivo</h2>
      <p>
        È qui che il panificio diventa utile oltre la colazione. Tre cose da sapere:
      </p>
      <ul>
        <li>
          <strong>Il pâté en croûte</strong> — il pranzo di un'
          <Link href="/it/guide/randonnees-balisees-albiez">escursione</Link> risolto con un
          solo acquisto.
        </li>
        <li>
          <strong>Il pain yéti</strong>: una baguette con pancetta e formaggio. Non serve
          aggiungere altro.
        </li>
        <li>
          <strong>Le crostatine alle mandorle e alle mele</strong>, per il rientro.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Panificio Moulin Valentin</strong>
          <br />
          50 route du Mollard, Chef-lieu, 73300 Albiez-Montrond
          <br />
          <a href="tel:+33479593397">04 79 59 33 97</a>
        </p>
        <p>
          <strong>Orari</strong> (soggetti a variazioni): dal 17/12 al 19/03 e dal 01/07 al
          21/08, tutti i giorni dalle 7 alle 19. Dal 25/03 al 25/06, sabato e domenica.
        </p>
      </div>

      <h2>Non avete voglia di scendere in paese?</h2>
      <p>
        Il pane fresco del Moulin Valentin viene consegnato ogni giorno all'
        <Link href="/it/guide/faire-ses-courses-a-albiez">
          alimentari Sambuis Dufreney
        </Link>
        , e lo Sherpa dell'accesso alle piste — a 250 m dall'alloggio — funge da rivendita di
        pane. Si può quindi passare una settimana senza prendere l'auto.
      </p>
    </>
  );
}
