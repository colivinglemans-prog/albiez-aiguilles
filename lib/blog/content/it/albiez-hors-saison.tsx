import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Fatti rilevati l'8 novembre 2026: fonti e nota sull'aggiornamento annuale nella versione
 * francese.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        In primavera e in autunno, Albiez-Montrond torna a essere un paese di montagna. Gli
        impianti sono fermi, una parte dei negozi ha abbassato la saracinesca, e sui sentieri
        non c'è quasi nessuno. Ecco che cosa resta aperto, che cosa no, e come organizzare un
        soggiorno al Mollard tra due stagioni.
      </p>

      <h2>Che cosa è chiuso</h2>
      <ul>
        <li>
          <strong>Gli impianti di risalita</strong>. Il comprensorio sciistico funziona dal 19
          dicembre 2026 al 21 marzo 2027. Prima e dopo, la seggiovia des Échaux, a 250 m
          dall'appartamento, non è in funzione.
        </li>
        <li>
          <strong>Lo Sherpa all'accesso alle piste</strong>, il negozio più vicino
          all'alloggio. La sua scheda indica che apre 7 giorni su 7 «in stagione»; quest'anno
          riapre il <strong>12 dicembre</strong>. Per la primavera, la data di chiusura non è
          pubblicata: informatevi prima di contarci.
        </li>
        <li>
          <strong>Il negozio della cooperativa casearia ad Albiez</strong>: è un negozio
          stagionale, aperto solo d'estate e d'inverno.
        </li>
        <li>
          Una parte dei <strong>ristoranti</strong> (quelli che restano aperti sono piuttosto
          dalle parti del Chef-lieu: informatevi prima di salire), i noleggi di sci e l'ESF.
          Anche le attività estive: la balneazione al{" "}
          <Link href="/it/guide/lac-du-mollard-baignade">lago del Mollard</Link> è sorvegliata
          solo a luglio e agosto, e il{" "}
          <Link href="/it/guide/refuge-chalet-la-croe">rifugio Chalet d'la Croë</Link> apre
          solo da metà giugno a metà settembre.
        </li>
      </ul>

      <h2>Che cosa resta aperto</h2>

      <h3>L'alimentari del Chef-lieu, tutti i giorni dell'anno</h3>
      <p>
        L'alimentari Sambuis Dufreney, al Chef-lieu, a circa 2 km dall'appartamento, è{" "}
        <strong>aperto tutti i giorni dell'anno</strong>. Alimentari generici, formaggio e
        salumi al taglio, gas, ferramenta, primo soccorso. Il pane del Moulin Valentin vi
        arriva ogni giorno: è la soluzione per avere pane fresco fuori stagione.
      </p>
      <div className="facts">
        <p>
          <strong>Alimentari Sambuis Dufreney</strong>, Chef-lieu
          <br />
          <strong>Orari</strong> (soggetti a variazioni): tutti i giorni dalle 7:30 alle 12:30
          e dalle 17:00 alle 19:00.
        </p>
      </div>

      <h3>Il panificio, nel weekend in primavera</h3>
      <p>
        Il{" "}
        <Link href="/it/guide/boulangerie-moulin-valentin-albiez">Moulin Valentin</Link>, al
        Chef-lieu, apre tutti i giorni d'inverno e d'estate. In primavera, dal 25 marzo al 25
        giugno, apre solo il <strong>sabato e la domenica</strong>. Per l'autunno, chiamate
        prima di scendere: <a href="tel:+33479593397">04 79 59 33 97</a>.
      </p>

      <h3>Saint-Jean-de-Maurienne, per la spesa grossa</h3>
      <p>
        Saint-Jean-de-Maurienne è sulla strada, a <strong>18 km</strong> e 20-25 minuti
        dall'appartamento. Fuori stagione, è lì che bisogna riempire il bagagliaio{" "}
        <strong>prima di salire</strong>: Carrefour Market (con drive, distributore di
        carburante e lavanderia) e Lidl. I dettagli sono nel nostro articolo{" "}
        <Link href="/it/guide/faire-ses-courses-a-albiez">fare la spesa ad Albiez</Link>.
      </p>
      <p>
        Per il formaggio, la cooperativa della valle des Arves ha un negozio{" "}
        <strong>aperto tutto l'anno</strong> nel centro di Saint-Jean, 52 rue de la
        République.
      </p>
      <div className="facts">
        <p>
          <strong>Fromagerie Aux Produits Savoyards</strong> (cooperativa della valle des
          Arves)
          <br />
          52 rue de la République, 73300 Saint-Jean-de-Maurienne ·{" "}
          <a href="tel:+33479642245">04 79 64 22 45</a>
          <br />
          Dal lunedì al sabato dalle 8:30 alle 12:30 e dalle 14:30 alle 19:00, la domenica
          dalle 9:00 alle 12:00 (orari indicati dalla{" "}
          <a href={PROPERTY.links.cheeseCoop} target="_blank" rel="noopener noreferrer">
            cooperativa
          </a>
          , soggetti a variazioni).
        </p>
      </div>

      <h2>Il meteo: mettere in conto il freddo, a volte la neve</h2>
      <p>
        A 1 600 m, le notti sono fredde già in autunno, e ancora fresche in primavera.
        L'appartamento è dotato di un <strong>riscaldamento elettrico regolabile
        liberamente</strong>: accendetelo appena arrivati se serve, senza chiedere.
      </p>
      <p>
        La prima neve può cadere <strong>già a metà ottobre</strong>, ben prima dell'apertura
        del comprensorio. In Savoia, gomme invernali o catene sono obbligatorie dal{" "}
        <strong>1° novembre al 31 marzo</strong> (legge Montagna). Per un soggiorno a ottobre
        o ad aprile, meglio avere catene o calze da neve nel bagagliaio. Tutto è spiegato nel
        nostro articolo{" "}
        <Link href="/it/guide/pneus-neige-chaines-albiez">
          gomme da neve e catene per salire ad Albiez
        </Link>
        .
      </p>

      <h2>Che cosa fare in primavera e in autunno</h2>

      <h3>Camminare dall'alloggio</h3>
      <p>
        Diversi{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">sentieri segnalati</Link> si
        percorrono in ogni stagione finché non c'è neve:
      </p>
      <ul>
        <li>
          <strong>La croce del Châtel</strong>, 30 minuti di salita dal chemin du Châtel,
          dietro la residenza.
        </li>
        <li>
          <strong>L'anello del lago del Mollard</strong>, 30 minuti, con partenza
          dall'alloggio, di fronte alle Aiguilles d'Arves.
        </li>
        <li>
          <strong>Il giro delle Contamines</strong> (40 min) e{" "}
          <strong>il giro della Cochette</strong> (3 h), con partenza dal Chef-lieu.
        </li>
      </ul>
      <p>
        In primavera la neve resta a lungo in quota. Il sentiero della Plaigne attraversa
        canaloni soggetti a valanghe: non prendetelo finché c'è neve a terra.
      </p>

      <h3>La foresta del Rival</h3>
      <p>
        La{" "}
        <Link href="/it/guide/foret-du-rival">foresta del Rival</Link>, che si attraversa
        salendo alla località, è l'uscita della mezza stagione. In primavera i torrenti sono
        pieni e le cascate al massimo. In autunno, i colori, i funghi e il bramito del cervo.
      </p>

      <h3>Partire con un accompagnatore</h3>
      <p>
        Yves Vionnet, accompagnatore di media montagna che vive ad Albiez, lavora{" "}
        <strong>tutto l'anno</strong>, fuori stagione compresa: escursioni a piedi o con le
        ciaspole, fauna, flora e patrimonio. È il modo più sicuro per uscire dai sentieri del
        paese quando le condizioni cambiano da un giorno all'altro.
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

      <h3>Guardare le Aiguilles d'Arves</h3>
      <p>
        Il balcone dell'appartamento, esposto a sud-ovest, dà sulle{" "}
        <Link href="/it/guide/aiguilles-arves">Aiguilles d'Arves</Link>. Il col du Mollard e
        l'anello del lago offrono la stessa vista senza fatica. La salita verso la Basse du
        Gerbier (2 578 m) è un itinerario estivo: fuori stagione, la neve e il freddo la
        rendono molto più impegnativa. Chiedete consiglio all'accompagnatore prima di partire.
      </p>

      <h3>Il col du Mollard in bici</h3>
      <p>
        Il{" "}
        <Link href="/it/guide/col-du-mollard-velo">col du Mollard</Link> (1 638 m) è
        all'uscita della borgata: 17 km di salita da Saint-Jean-de-Maurienne, e l'arrivo è a
        casa vostra. I grandi colli più alti, come la Croix de Fer e il Glandon, sono chiusi
        dalla neve per una parte dell'anno: verificate che siano aperti prima di metterli in
        programma. La bici si lega sul pianerottolo coperto o si ripone sul balcone
        (l'armadietto per gli sci è troppo piccolo).
      </p>

      <h3>Una giornata a Torino</h3>
      <p>
        Fuori stagione è una buona idea di gita:{" "}
        <Link href="/it/guide/turin-depuis-albiez">Torino</Link> è a circa 2 h in auto dal
        traforo del Fréjus, o a 1 h 56 in treno diretto da Saint-Jean-de-Maurienne.
      </p>

      <h2>La calma, e soggiorni più brevi</h2>
      <p>
        Fuori stagione si viene ad Albiez per la calma: nessuna fila al parcheggio, nessun
        rumore, i sentieri tutti per sé. Anche i prezzi sono spesso i più bassi dell'anno.
      </p>
      <p>
        I soggiorni sono più flessibili: <strong>in genere minimo 2 notti</strong>, dal 20
        marzo a metà dicembre (tranne dal 2 luglio al 20 agosto, quando ne servono 3). Basta un
        weekend lungo. L'arrivo è <strong>dalle 16:00</strong>.
      </p>

      <div className="facts">
        <p>
          <strong>Prenotare</strong> — disponibilità e prezzi in tempo reale sulla{" "}
          <Link href="/it#reserver">pagina dell'alloggio</Link>.
          <br />
          <strong>Prima di salire</strong>: spesa a Saint-Jean-de-Maurienne, catene o calze da
          neve nel bagagliaio da ottobre.
          <br />
          <strong>Ufficio del turismo</strong>:{" "}
          <a href="tel:+33479593048">04 79 59 30 48</a>, raggiungibile tutto l'anno.
        </p>
      </div>

      <p>
        Vedi anche:{" "}
        <Link href="/it/guide/quelle-semaine-skier-albiez">
          quale settimana scegliere per sciare ad Albiez
        </Link>
        , <Link href="/it/estate">la pagina estate</Link> e{" "}
        <Link href="/it/sci">la pagina inverno dell'alloggio</Link>.
      </p>
    </>
  );
}
