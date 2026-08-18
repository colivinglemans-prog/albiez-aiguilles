import Link from "next/link";
import { PROPERTY } from "@/lib/property";
import ArticleImage from "@/lib/blog/ArticleImage";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond ha di che vivere senza riscendere: un supermercato all'accesso alle piste, un alimentari e un
        panificio nel centro del paese. Ma per arrivare ad Albiez si passa necessariamente da
        Saint-Jean-de-Maurienne — ed è lì che conviene fare la spesa grossa.
      </p>

      <h2>Il metodo giusto: il grosso a Saint-Jean, il resto in paese</h2>
      <p>
        Saint-Jean-de-Maurienne è sulla strada, a circa <strong>30 km</strong> e{" "}
        <strong>20 minuti</strong> da Albiez. Vi si trovano un <strong>Carrefour Market</strong> (con servizio drive,
        che permette di ordinare da casa e caricare in dieci minuti) e un <strong>Lidl</strong>.
      </p>
      <p>
        Buono a sapersi: <strong>distributore di benzina e lavanderia</strong> al Carrefour Market. Su un soggiorno di
        una settimana con l'abbigliamento da sci, la lavanderia non è un dettaglio.
      </p>
      <p>
        Una volta arrivati in quota, i negozi del paese coprono tutto il resto: il pane, le dimenticanze, il formaggio,
        l'aperitivo.
      </p>

      <h2>All'accesso alle piste del Mollard — lo Sherpa</h2>
      <p>
        È <strong>il negozio più vicino all'alloggio</strong>, a 250 m, e si trova{" "}
        <strong>direttamente all'accesso alle piste</strong>. Questo ne cambia completamente l'uso: non è una spesa
        che si pianifica, è una sosta di due minuti{" "}
        <strong>sulla via del rientro dagli sci</strong>, sci in mano, per il pane del giorno dopo o per ciò che manca
        a cena.
      </p>
      <p>
        Alimentari e casalinghi, con <strong>consegna possibile</strong>. Sul posto: rivendita di pane, macelleria e
        salumeria, formaggio al taglio, prodotti regionali.
      </p>
      <ArticleImage
        src="blog/sherpa-albiez-montrond-interieur.jpg"
        alt="Interno dello Sherpa di Albiez-Montrond: il banco macelleria e salumeria e le corsie dell'alimentari"
        caption="Il banco fresco dello Sherpa di Albiez-Montrond, all'accesso alle piste del Mollard."
      />
      <div className="facts">
        <p>
          <strong>Orari</strong> — variano secondo la stagione e sono aggiornati sulla scheda del negozio:{" "}
          <a href={PROPERTY.links.sherpa} target="_blank" rel="noopener noreferrer">
            sherpa.net — Albiez-Montrond
          </a>
        </p>
      </div>
      <p>
        È anche il miglior indirizzo per portarsi a casa qualcosa che non si trova nella grande distribuzione:
      </p>
      <ul>
        <li>
          <strong>Le salsicce di bovino essiccate fatte in casa</strong> di Sandrine, prodotte sul posto: la specialità
          del negozio, temibile all'aperitivo.
        </li>
        <li>Il grano saraceno di Saint-Jean.</li>
        <li>Il miele di un apicoltore di Albiez.</li>
        <li>Le birre di Modane e di Valloire.</li>
        <li>Il génépi di una piccola distilleria.</li>
      </ul>

      <h2>Nel centro del paese — l'alimentari Sambuis Dufreney</h2>
      <p>
        Un piccolo market nel cuore del paese, ricavato in ciò che era una fattoria, riabilitata come alimentari
        tradizionale. Questo negozio di famiglia è{" "}
        <strong>aperto tutti i giorni dell'anno</strong> — una frase che in montagna ha un senso.
      </p>
      <p>
        Vi si trovano alimentari generici, salumi e formaggio al taglio, dispensa, prodotti regionali, gas, ferramenta
        e primo soccorso. Il pane fresco del{" "}
        <Link href="/it/guide/boulangerie-moulin-valentin-albiez">Moulin Valentin</Link> vi viene consegnato ogni
        giorno.
      </p>
      <div className="facts">
        <p>
          <strong>Orari</strong> (soggetti a variazioni): tutti i giorni dalle 7.30 alle 12.30, poi dalle 17 alle 19 —
          e dalle 16 alle 19 dal 3 luglio al 3 settembre.
        </p>
      </div>

      <h2>Nel centro del paese — il panificio</h2>
      <p>
        Le Moulin Valentin propone pane, viennoiserie, torte dolci, bevande calde e fresche, tartine, quiche e panini.{" "}
        <Link href="/it/guide/boulangerie-moulin-valentin-albiez">
          La sua storia merita un articolo a sé.
        </Link>
      </p>

      <h2>Portarsi via del formaggio: la cooperativa</h2>
      <p>
        Per ripartire con qualcosa che prolunghi le vacanze, la tappa è il{" "}
        <Link href="/it/guide/fromagerie-cooperative-beaufort-des-arves">
          Caseificio Cooperativo della valle degli Arves
        </Link>
        , che ha un negozio ad Albiez-Montrond. Il loro <strong>Beaufort AOP</strong> è eccellente, e la scelta va ben
        oltre: formaggi, salumi, marmellate, miele.
      </p>

      <h2>Cosa portare</h2>
      <p>
        Alcuni materiali di consumo non sono forniti nell'appartamento e si trovano molto meno cari in pianura: tabs
        per la lavastoviglie, sacchi della spazzatura da 50 L, carta igienica e capsule Nespresso. Da infilare nel
        bagagliaio prima di salire — il dettaglio è sulla{" "}
        <Link href="/it#appartement">pagina dell'alloggio</Link>.
      </p>
    </>
  );
}
