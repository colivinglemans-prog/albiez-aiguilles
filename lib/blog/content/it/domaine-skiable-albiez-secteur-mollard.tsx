import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez è una località per famiglie della valle della Maurienne: 40 km di piste, 13 impianti di risalita,
        22 piste tra 1500 e 2060 metri. Si divide in tre settori — Montrond, Chef-lieu e Le Mollard — a cui si
        aggiunge il paese vicino di Albiez-le-Jeune. Il nostro appartamento è a Le Mollard, il più alto dei tre.
      </p>

      <h2>Il comprensorio in numeri</h2>
      <ul>
        <li>
          <strong>40 km di piste</strong> distribuiti su <strong>22 piste</strong>
        </li>
        <li>
          <strong>13 impianti di risalita</strong>
        </li>
        <li>
          Quota: da <strong>1500 m</strong> a <strong>2060 m</strong>
        </li>
        <li>
          <strong>50 cannoni da neve</strong> a integrazione dell'innevamento naturale
        </li>
      </ul>
      <p>
        L'altopiano di Montrond beneficia di una piovosità ridotta e di una luminosità notevole, con innevamento
        continuo per quasi sei mesi all'anno. Le piste sono soleggiate e ampie: è un comprensorio dove si impara a
        sciare con comodità, non un comprensorio dove si vengono a cercare muri.
      </p>

      <h2>Partire da Le Mollard: i tre impianti da conoscere</h2>

      <h3>La seggiovia des Échaux — la porta d'ingresso</h3>
      <p>
        A <strong>250-300 m dall'alloggio</strong>, sale da 1600 m a 1800 m. È l'impianto che permette di
        raggiungere più rapidamente l'insieme del comprensorio: lo si prende la mattina, e dietro si apre tutto.
      </p>

      <h3>Lo skilift des Aplanes — il punto più alto</h3>
      <p>
        Dalla cima delle Échaux si prende lo skilift Les Aplanes, che culmina a{" "}
        <strong>2100 m</strong>. È il punto più alto raggiungibile dal settore.
      </p>

      <h3>Coucou e Polytre — per iniziare</h3>
      <p>
        Lo <strong>skilift Coucou</strong> è quello dei principianti. Lo{" "}
        <strong>skilift Polytre</strong>, invece, è usato in particolare dalla{" "}
        <Link href="/it/guide/cours-de-ski-esf-albiez">scuola di sci</Link>: offre più punti in cui lasciare
        l'asta, con livelli di difficoltà crescenti. È esattamente ciò che serve per far progredire un bambino
        senza metterlo in difficoltà tutto d'un colpo.
      </p>

      <h2>In quale ordine per una prima giornata?</h2>
      <ol>
        <li>
          <strong>Principiante assoluto</strong>: Coucou la mattina, poi Polytre il pomeriggio per concatenare
          vere discese.
        </li>
        <li>
          <strong>Sciatore medio</strong>: Échaux all'apertura per prendere le misure al settore, poi
          spostamento verso il Chef-lieu e Montrond in giornata.
        </li>
        <li>
          <strong>Buon sciatore</strong>: Échaux e poi Aplanes, e il comprensorio si srotola dai 2100 m.
        </li>
        <li>
          <strong>Sciatore molto forte</strong>: partendo dalle Aplanes e secondo le condizioni di innevamento,
          diversi itinerari fuoripista scendono nella neve fresca da{" "}
          <strong>2100 m a 1500 m</strong>, fino alla seggiovia du Loup: 600 m di dislivello tutti d'un fiato.
          Fuoripista vuol dire fuori dalla messa in sicurezza: attrezzatura, bollettino valanghe e, al minimo
          dubbio, una guida.
        </li>
      </ol>

      <h2>Il vantaggio di essere alloggiati a Le Mollard</h2>
      <p>
        L'accesso alle piste del Mollard riunisce a 250 m la partenza delle piste, i{" "}
        <Link href="/it/guide/louer-ses-skis-a-albiez">noleggi di attrezzatura</Link>, il supermercato e il punto
        di ritrovo della scuola di sci. In concreto: nessuna navetta, nessuno sci da portare per centinaia di
        metri, e la possibilità di rientrare a pranzo. Con i bambini è la differenza tra una settimana piacevole e
        una settimana di logistica.
      </p>
      <p>
        È anche qui che si tiene l'
        <Link href="/it/guide/albiez-c-show">Albiez C'Show</Link>, la serata del martedì durante le vacanze
        scolastiche.
      </p>

      <h2>Fuori dalle piste</h2>
      <p>
        La <Link href="/it/guide/albiez-en-famille">pista da slittino del Mollard</Link> è proprio accanto alla
        residenza, molto ben esposta al sole (l'innevamento non è garantito). Per il resto, la località propone
        ciaspole, sci di fondo,{" "}
        <Link href="/it/guide/chiens-de-traineau-albiez">cani da slitta</Link>, motoslitta e serate igloo.
      </p>

      <p>
        Il dettaglio delle distanze, del deposito sci e dell'accesso alle piste è sulla{" "}
        <Link href="/it/sci">pagina inverno dell'alloggio</Link>.
      </p>
    </>
  );
}
