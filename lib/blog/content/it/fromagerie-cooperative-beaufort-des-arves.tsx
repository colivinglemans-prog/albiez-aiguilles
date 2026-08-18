import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        È la tappa immancabile per chi vuole portarsi a casa qualcosa della Maurienne — o semplicemente mangiare bene
        sul posto. Il Caseificio Cooperativo della valle degli Arves produce un Beaufort AOP francamente buono, e ha un
        negozio ad Albiez-Montrond.
      </p>

      <h2>Chi produce questo formaggio</h2>
      <p>
        La cooperativa si trova in località Belluard, a{" "}
        <strong>Saint-Sorlin-d'Arves</strong>, dall'altro lato del massiccio. Raccoglie il latte delle aziende della
        valle degli Arves e lo trasforma sul posto.
      </p>
      <p>
        Il <strong>Beaufort AOP</strong> è prodotto con <strong>latte crudo e intero</strong>, raccolto su alpeggi che
        salgono fino a <strong>2500 metri</strong>, poi stagionato <strong>da 6 a 12 mesi</strong> in cantina fresca e
        umida. La denominazione ha cinquant'anni, e la casa è medaglia d'oro al Concours Général Agricole di Parigi.
      </p>

      <h2>Beaufort d'estate o d'inverno: non è lo stesso formaggio</h2>
      <p>
        È la cosa da sapere prima di arrivare al banco. Il Beaufort esiste in{" "}
        <strong>due versioni stagionali</strong>, secondo il periodo in cui il latte è stato raccolto:
      </p>
      <ul>
        <li>
          <strong>Il Beaufort d'estate</strong> viene dal latte d'alpeggio, quando le vacche pascolano in quota su una
          flora molto varia. È più colorato, più profumato, più complesso.
        </li>
        <li>
          <strong>Il Beaufort d'inverno</strong> viene dal latte prodotto in valle. È più dolce, più regolare.
        </li>
      </ul>
      <p>
        Nessuno dei due è «migliore» in assoluto: il primo si degusta così com'è, il secondo va benissimo in cucina.
        Chiedete entrambi al banco: ve li faranno assaggiare.
      </p>

      <h2>Cosa c'è oltre</h2>
      <p>Il negozio non si ferma al Beaufort. Nel banco formaggi:</p>
      <ul>
        <li>
          <strong>Raclette de Savoie IGP</strong>, di cui una versione affumicata («Brezain») e una all'aglio orsino
        </li>
        <li>
          <strong>Fonduta grattugiata 100 % Beaufort AOP</strong> — la miscela già pronta, che evita di dosare tre
          formaggi
        </li>
        <li>
          <strong>Tome des Bauges AOP</strong> e <strong>Reblochon laitier AOP</strong>
        </li>
        <li>
          <strong>Burro degli Arves</strong>
        </li>
      </ul>
      <p>
        A questo si aggiungono salumi, marmellate e miele: quanto basta per comporre un tagliere completo senza passare
        altrove.
      </p>

      <h2>L'interesse quando si alloggia ad Albiez</h2>
      <p>
        L'appartamento è dotato di <strong>apparecchio per raclette, caquelon per fonduta, pietra ollare e apparecchio
        per crêpe</strong>. In altre parole, tutto il necessario per trasformare un acquisto alla cooperativa nella cena
        della stessa sera — e il risultato è decisamente migliore di una bustina da supermercato.
      </p>
      <p>
        La logica del soggiorno diventa semplice: la{" "}
        <Link href="/it/guide/faire-ses-courses-a-albiez">spesa quotidiana</Link> allo Sherpa dell'accesso alle piste o
        al Carrefour Market di Saint-Jean, e il formaggio alla cooperativa.
      </p>

      <h2>Dove acquistarlo</h2>
      <p>
        La cooperativa gestisce <strong>otto negozi</strong> nella regione, due dei quali direttamente utili da Albiez:
      </p>
      <ul>
        <li>
          <strong>Albiez-Montrond</strong> — il più vicino, senza lasciare il comune.
        </li>
        <li>
          <strong>Saint-Jean-de-Maurienne</strong> — sulla strada, da combinare con la spesa grossa salendo o scendendo.
        </li>
      </ul>
      <p>
        Gli altri sei sono a Saint-Sorlin-d'Arves (nel caseificio stesso), a Le Corbier, La Toussuire,
        Saint-Michel-de-Maurienne, Valloire e al col du Galibier — comodo se passate da lì durante un'
        <Link href="/it/guide/col-du-mollard-velo">uscita in bici</Link>.
      </p>

      <h2>Farsi consegnare dopo il soggiorno</h2>
      <p>
        La cooperativa spedisce nella Francia metropolitana (Corsica esclusa). Gli ordini sono trattati il{" "}
        <strong>lunedì</strong> e le spedizioni partono con Chronofresh dal <strong>martedì</strong>. La spedizione è
        gratuita oltre i <strong>100 €</strong>.
      </p>
      <p>
        È la soluzione per prolungare le vacanze senza sovraccaricare il bagagliaio — o per rifare la provvista a
        dicembre.
      </p>

      <div className="facts">
        <p>
          <strong>Fromagerie Coopérative de la vallée des Arves</strong>
          <br />
          Belluard, 73530 Saint-Sorlin-d'Arves
          <br />
          <a href="tel:+33479597016">04 79 59 70 16</a> · boutique@beaufortdesarves.com
          <br />
          <a href={PROPERTY.links.cheeseCoop} target="_blank" rel="noopener noreferrer">
            beaufortdesarves.com
          </a>{" "}
          — indirizzi e orari degli otto negozi, e negozio online
        </p>
      </div>
    </>
  );
}
