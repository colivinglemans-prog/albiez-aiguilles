import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        La Scuola di Sci Francese di Albiez-Montrond copre tutte le età, dal club Piou-Piou dai 3 anni e mezzo ai
        corsi per adulti. Un dettaglio conta più di tutti gli altri al momento di prenotare: la località ha{" "}
        <strong>due punti di ritrovo</strong>, e da Le Mollard è quello del Mollard che bisogna scegliere.
      </p>

      <h2>La trappola del punto di ritrovo</h2>
      <p>
        La ESF di Albiez raduna i suoi corsi su due settori. Se alloggiate a Le Mollard — è il caso del nostro
        appartamento, a 250 m dall'accesso alle piste — bisogna assolutamente selezionare il{" "}
        <strong>ritrovo ESF Mollard</strong> al momento della prenotazione. Sbagliare significa iniziare ogni mattina
        con un tragitto in auto con i bambini negli scarponi da sci. Il tipo di errore che costa una settimana.
      </p>
      <p>
        Detto questo, un Mollard al completo non è un vicolo cieco:{" "}
        <strong>il settore del Chef-lieu è raggiungibile con gli sci</strong>. Se il vostro livello lo permette,
        prendete la seggiovia des Échaux e scendete al Chef-lieu: sarete riscaldati ancora prima dell'inizio del
        corso, cosa che non vale per chi arriva in auto.
      </p>
      <p>
        La riserva è importante: presuppone di saper già scendere. Per un bambino del club Piou-Piou o un principiante
        assoluto, il ritrovo del Mollard resta l'unico comodo, e l'auto l'unica alternativa.
      </p>

      <h2>Le formule per età</h2>

      <h3>Club Piou-Piou — dai 3 anni e mezzo</h3>
      <p>
        Il giardino delle nevi accoglie i bambini a partire da 3 anni e mezzo, 4 anni o 5 anni secondo la formula. Si
        può aggiungere un <strong>servizio di custodia</strong>, che allunga utilmente la fascia di presa in carico
        oltre il solo corso.
      </p>

      <h3>Corsi per bambini — dai 6 ai 12 anni</h3>
      <p>
        La formula classica, anch'essa con possibilità di custodia complementare. È l'età in cui lo{" "}
        <Link href="/it/guide/domaine-skiable-albiez-secteur-mollard">
          skilift Polytre
        </Link>{" "}
        acquista tutto il suo senso: più punti in cui lasciare l'asta, con difficoltà crescenti.
      </p>

      <h3>Corsi per ragazzi — dai 12 anni</h3>
      <p>Gruppi separati, il che evita di mescolare un adolescente con bambini di 7 anni.</p>

      <h3>Corsi per adulti</h3>
      <p>Collettivi o privati, per riprendere o per migliorare.</p>

      <h2>Oltre lo sci alpino</h2>
      <p>La ESF di Albiez organizza anche attività che non si aspettano da una scuola di sci:</p>
      <ul>
        <li>
          <strong>Sci seduto</strong>
        </li>
        <li>
          <strong>Ciaspole</strong>
        </li>
        <li>
          <strong>Snake-gliss</strong> (discesa su slittini agganciati)
        </li>
        <li>
          <strong>Iniziazione al biathlon</strong>
        </li>
        <li>
          <strong>Iniziazione alla ricerca di travolti da valanga (ARTVA)</strong> — un'ora che cambia lo sguardo
          sulla montagna, anche quando non si esce mai dalle piste
        </li>
        <li>
          <strong>Fiaccolata</strong>, in particolare durante l'
          <Link href="/it/guide/albiez-c-show">Albiez C'Show</Link>
        </li>
      </ul>

      <h2>Prenotare, e quando</h2>
      <p>
        I corsi della ESF vanno prenotati <strong>in anticipo</strong>, per due motivi: il posto e, soprattutto,
        l'orario. Gli slot del mattino vanno via per primi, e un corso di fine pomeriggio con un bambino di 5 anni
        stanco non ha la stessa resa.
      </p>
      <p>
        Gli skipass possono essere acquistati <strong>insieme ai corsi</strong>, evitando una coda in più il primo
        giorno. Altra opzione: ordinarli online e riceverli per posta prima della partenza.
      </p>

      <div className="facts">
        <p>
          <strong>ESF Albiez-Montrond</strong> — ritrovo Mollard, a 250 m dall'alloggio.{" "}
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
        </p>
      </div>

      <h2>E la custodia dei più piccoli?</h2>
      <p>
        Oltre al servizio di custodia della ESF, la località dispone di un centro ricreativo e di un asilo nido:
        quanto basta per coprire i bambini troppo piccoli per sciare. Il dettaglio è nel nostro articolo{" "}
        <Link href="/it/guide/albiez-en-famille">Albiez-Montrond in famiglia</Link>.
      </p>
    </>
  );
}
