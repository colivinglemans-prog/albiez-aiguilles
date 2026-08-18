import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        È l'attività che si prenota troppo tardi. I giri in slitta con i cani di Albiez partono
        dalla base ricreativa delle Contamines, nel centro del paese, e gli slot si riempiono
        molto prima dell'arrivo dei vacanzieri.
      </p>

      <h2>Di cosa si tratta</h2>
      <p>
        Sistemati su una slitta, ci si lascia trasportare da un grande tiro di cani. Il musher
        spiega come è organizzato il lavoro degli animali — chi tira, chi guida, come la
        squadra si distribuisce lo sforzo — e la complicità tra l'uomo e i cani è la vera
        sorpresa dell'uscita.
      </p>
      <p>
        Due formati: <strong>mezz'ora</strong> o <strong>un'ora</strong>.
      </p>

      <div className="facts">
        <p>
          <strong>Partenza</strong>: base ricreativa delle Contamines, centro di
          Albiez-Montrond
          <br />
          <strong>Periodo</strong>: dal 17/12 al 01/04, tutti i giorni, salvo le condizioni di
          innevamento
          <br />
          <strong>Tariffe</strong>: a partire da 45 € adulti, 40 € bambini
          <br />
          <strong>Prenotazione</strong>: indispensabile —{" "}
          <a href="tel:+33682759926">06 82 75 99 26</a>
        </p>
      </div>

      <h2>Prenotate appena avete le date</h2>
      <p>
        È il punto più importante di questo articolo. La prenotazione è indispensabile, ed è
        consigliabile farla <strong>il prima possibile</strong>. In una settimana di vacanze
        scolastiche gli slot disponibili si esauriscono in pochi giorni.
      </p>
      <p>
        Il riflesso utile: prenotare la slitta insieme ai{" "}
        <Link href="/it/guide/cours-de-ski-esf-albiez">corsi di sci</Link> e all'
        <Link href="/it/guide/louer-ses-skis-a-albiez">attrezzatura</Link>, cioè diverse
        settimane prima della partenza.
      </p>

      <h2>Salvo innevamento</h2>
      <p>
        L'attività dipende dalla neve al suolo, e non solo da quella delle piste: il centro del
        paese è più in basso di Le Mollard. A inizio o fine stagione prevedete un piano B: le{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">ciaspole</Link>, la pista da slittino
        del Mollard o l'
        <Link href="/it/guide/albiez-c-show">Albiez C'Show</Link> del martedì sera.
      </p>

      <h2>Sullo stesso itinerario</h2>
      <p>
        Il <strong>giro delle Contamines</strong>, anello di 2,2 km con partenza da rue Froide,
        è un itinerario condiviso: vi si incrociano proprio i tiri di cani da slitta, oltre
        alle biciclette. Restate attenti e lasciate loro la traccia.
      </p>

      <h2>Le altre attività senza sci</h2>
      <p>
        Albiez propone anche la motoslitta e le serate igloo (Skimium / Mustang Sports), le
        ciaspole e lo sci nordico. Il dettaglio dei noleggi è nel nostro articolo{" "}
        <Link href="/it/guide/louer-ses-skis-a-albiez">
          noleggiare gli sci ad Albiez-Montrond
        </Link>
        .
      </p>
    </>
  );
}
