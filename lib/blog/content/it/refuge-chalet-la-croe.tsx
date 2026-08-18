import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        A 2076 metri, ai piedi delle Aiguilles d'Arves, il Chalet d'la Croë è un rifugio di
        montagna privato ristrutturato nel 2013. Si sale per una crêpe a metà escursione, per una
        raclette, o per dormire in un domo sotto il cielo stellato degli alpeggi.
      </p>

      <h2>Dove e quando</h2>
      <p>
        Il rifugio si trova nel comune di Albiez-Montrond, nella valle della Maurienne, ai piedi
        delle{" "}
        <Link href="/it/guide/aiguilles-arves">Aiguilles d'Arves</Link>.
      </p>
      <div className="facts">
        <p>
          <strong>Le Chalet d'la Croë</strong> — rifugio privato, 2076 m
          <br />
          <strong>Apertura 2026</strong>: dal 18 giugno al 13 settembre
          <br />
          <a href="https://www.lechaletdlacroe.fr/" target="_blank" rel="noopener noreferrer">
            lechaletdlacroe.fr
          </a>
        </p>
      </div>

      <h2>Fermarsi a mangiare</h2>
      <p>
        È il motivo principale per salire in giornata. Una pausa crêpe o raclette a metà
        escursione cambia completamente l'uscita — e a questa quota, in mezzo agli alpeggi, allo
        scenario pensa il resto.
      </p>
      <p>
        Il rifugio lavora <strong>in completa autonomia</strong> e essenzialmente con{" "}
        <strong>prodotti locali fatti in casa</strong>. È un vincolo assunto che si ritrova nel
        piatto.
      </p>

      <h2>Dormire in un domo</h2>
      <p>
        Il pernottamento avviene <strong>all'esterno, in domi</strong>, per una notte o più. È
        l'esperienza a parte del luogo: un'immersione completa nel cielo stellato della montagna,
        senza i vincoli del bivacco.
      </p>
      <p>
        Per un'escursione di più giorni è una tappa che struttura l'itinerario: si sale il primo
        giorno, si dorme in quota, si riparte presto il mattino dopo.
      </p>

      <h2>L'atmosfera degli alpeggi</h2>
      <p>
        Il suono dei campanacci anima gli alpeggi nel periodo estivo: è il sottofondo costante
        della stagione, e l'atmosfera in cui il rifugio propone la sua ristorazione e il suo
        pernottamento.
      </p>

      <h2>Come salire</h2>
      <p>
        Il rifugio si raggiunge a piedi, dagli itinerari del settore. Le partenze classiche
        passano per la borgata di Le Chalmieu e l'altopiano di Montrond — lo stesso settore della
        salita alla Basse du Gerbier, descritta nel nostro articolo sulle{" "}
        <Link href="/it/guide/aiguilles-arves">Aiguilles d'Arves</Link>.
      </p>
      <p>
        Prevedete di <strong>verificare gli orari e prenotare</strong> prima di salire, soprattutto
        per la notte in domo: la capienza di un rifugio privato è limitata e l'apertura resta
        stagionale.
      </p>

      <h2>Il resto dei sentieri</h2>
      <p>
        I sei itinerari segnalati con partenza dal paese e da Le Mollard — più corti, più
        accessibili — sono descritti nella{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">
          nostra guida alle escursioni di Albiez
        </Link>
        .
      </p>
    </>
  );
}
