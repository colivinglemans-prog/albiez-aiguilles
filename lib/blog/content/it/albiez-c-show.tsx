import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        L'Albiez C'Show è la serata della località: ogni martedì sera durante le vacanze
        scolastiche, all'accesso alle piste del Mollard. Fiaccolata, spettacolo dei gatti delle
        nevi, dimostrazioni dei maestri, fuochi d'artificio e vin brulé. È gratuito o quasi, e si
        trova a 250 m dall'alloggio.
      </p>

      <h2>Il programma</h2>

      <h3>La fiaccolata</h3>
      <p>
        Guidata dai maestri della{" "}
        <Link href="/it/guide/cours-de-ski-esf-albiez">Scuola di Sci Francese</Link>, è{" "}
        <strong>aperta a bambini e ragazzi dal livello «flocon»</strong>. I vacanzieri che
        vogliono scendono con i maestri, fiaccola in mano.
      </p>
      <p>
        Iscrizione sul posto, venite attrezzati. La fiaccola costa qualche euro (calcolate 5 €).
      </p>

      <h3>Le dimostrazioni</h3>
      <p>
        Presentazione e spettacolo dei <strong>gatti delle nevi</strong> — vedere queste macchine
        manovrare da vicino colpisce gli adulti quanto i bambini — e dimostrazioni di sci dei
        maestri della ESF e del club sportivo.
      </p>

      <h3>I fuochi d'artificio</h3>
      <p>Uno spettacolo pirotecnico che illumina la località a fine serata.</p>

      <h3>Il brindisi</h3>
      <p>
        Vin brulé per gli adulti, succo di frutta per i bambini, offerti all'arrivo dalla ESF.
      </p>

      <div className="facts">
        <p>
          <strong>Quando</strong>: ogni martedì sera durante le vacanze scolastiche
          <br />
          <strong>Dove</strong>: accesso alle piste del Mollard, a 250 m dall'alloggio
          <br />
          <strong>Tariffa</strong>: gratuito — solo la fiaccola è a pagamento (≈ 5 €)
          <br />
          <strong>Orario preciso</strong>: pubblicato ogni stagione dall'ufficio del turismo e
          dalla ESF
        </p>
      </div>

      <h2>Perché essere alloggiati a Le Mollard è un vero vantaggio</h2>
      <p>
        L'evento si tiene <strong>all'accesso alle piste del Mollard</strong>, a 250 m
        dall'appartamento. In pratica significa:
      </p>
      <ul>
        <li>Nessuna auto, nessun parcheggio da cercare in una sera di grande affluenza.</li>
        <li>
          Un bambino stanco può rientrare a dormire in cinque minuti, senza guastare la serata agli
          altri.
        </li>
        <li>
          I fuochi d'artificio si vedono benissimo dal{" "}
          <Link href="/it#appartement">balcone</Link> se si preferisce restare al caldo.
        </li>
      </ul>

      <h2>Verificare gli orari</h2>
      <p>
        Date e orari esatti cambiano da una stagione all'altra: seguono il calendario delle vacanze
        scolastiche e la notte scende più tardi a fine inverno. Il programma delle animazioni è
        disponibile all'ufficio del turismo di Albiez-Montrond, nel centro del paese, dove si
        trovano anche la mappa della località e il programma del cinema.
      </p>

      <h2>Il resto della settimana</h2>
      <p>
        Per completare: la pista da slittino del Mollard proprio accanto alla residenza, i{" "}
        <Link href="/it/guide/chiens-de-traineau-albiez">cani da slitta</Link> alle Contamines, e le
        serate igloo proposte da Mustang Sports.
      </p>
    </>
  );
}
