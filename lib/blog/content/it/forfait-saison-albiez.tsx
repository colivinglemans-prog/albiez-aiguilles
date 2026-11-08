import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Prezzi 2026-2027, rilevati l'8 novembre 2026 su station-albiez.com (home page e
 * /fr/tarifs2). Nota sull'aggiornamento annuale: vedi la versione francese.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Fino al <strong>2 dicembre 2026 alle 23:59</strong>, la stazione di Albiez vende lo
        skipass stagionale a metà prezzo: 249 € per un adulto invece di 497 €. Il
        comprensorio è aperto da sabato 19 dicembre 2026 a domenica 21 marzo 2027. Resta da
        capire da quanti giorni conviene — i prezzi giornalieri e settimanali rispondono.
      </p>

      <h2>I prezzi dello skipass stagionale 2026-2027</h2>
      <ul>
        <li>
          <strong>Adulto</strong> (da 12 a 64 anni): <strong>249 €</strong> invece di 497 €
        </li>
        <li>
          <strong>Bambino</strong> (da 5 a 11 anni): <strong>178 €</strong> invece di 355 €
        </li>
        <li>
          <strong>Senior</strong> (da 65 a 74 anni): <strong>228 €</strong> invece di 457 €
        </li>
        <li>
          <strong>Sotto i 5 anni e dai 75 anni</strong>: skipass gratuito, da ritirare in
          cassa con un documento che attesti l'età
        </li>
      </ul>
      <p>
        Attenzione: un ragazzo di 12 anni paga già la tariffa adulti. Lo sconto si applica
        automaticamente nel carrello online fino alla scadenza.
      </p>

      <h2>Con che cosa confrontarlo</h2>
      <p>Gli skipass di riferimento, in tariffa adulto / bambino / senior:</p>
      <ul>
        <li>
          <strong>Giornaliero</strong>: 32,50 € / 27,50 € / 30 €
        </li>
        <li>
          <strong>6 giorni</strong>: 177 € / 140 € / 158 €
        </li>
        <li>
          <strong>8 giorni</strong>: 215 € / 168 € / 192 €
        </li>
        <li>
          <strong>Weekend</strong> (sabato e domenica): 40,50 € / 36,50 € / 38,50 €
        </li>
        <li>
          <strong>Sabato</strong>: 14 € per tutti se acquistato online prima delle 0:00 di
          mercoledì (quindi entro martedì sera), altrimenti 16 €
        </li>
      </ul>

      <h2>Da quando conviene</h2>

      <h3>Al prezzo promozionale: bastano due settimane</h3>
      <p>
        A 249 €, lo skipass adulto vale poco meno di <strong>otto giornate</strong> a tariffa
        piena. In pratica:
      </p>
      <ul>
        <li>
          <strong>Una settimana</strong> (6 giorni, 177 €): lo stagionale non conviene.
        </li>
        <li>
          <strong>Una settimana più un weekend</strong> (177 + 40,50 = 217,50 €): ancora no.
        </li>
        <li>
          <strong>Due settimane</strong> (2 × 177 = 354 €): lo stagionale fa risparmiare
          105 € per adulto.
        </li>
        <li>
          <strong>Sette weekend</strong> (7 × 40,50 = 283,50 €): conviene dal settimo — sei
          weekend costano 243 €.
        </li>
      </ul>
      <p>
        Stessa logica per un bambino: 178 € contro 140 € la settimana, quindi conviene dalla
        seconda settimana (280 €). Per un senior, 228 € contro 158 €: stessa conclusione.
      </p>

      <h3>A prezzo pieno: servono tre settimane</h3>
      <p>
        A 497 €, due settimane (354 €) non bastano più; ne servono tre (531 €). Lo
        stagionale a prezzo pieno è per chi vive sul posto o quasi. La data del 2 dicembre
        non è un dettaglio: dimezza la soglia di convenienza.
      </p>

      <h3>Quando non serve: un solo soggiorno di una settimana</h3>
      <p>
        Per <strong>un solo soggiorno</strong> di una settimana, o poco più, lo stagionale
        non conviene: otto giorni di fila costano 215 € con lo skipass 8 giorni, nove giorni
        247,50 € (8 giorni + una giornata), meno dei 249 € dello stagionale. Oltre, o appena
        i giorni sono distribuiti su più soggiorni, torna in vantaggio. E per qualche sabato isolato, il sabato a 14 € online batte
        tutto il resto.
      </p>

      <h2>Per una famiglia</h2>
      <p>
        La stazione propone un <strong>Pack Famiglia 6 giorni</strong> (due adulti e due
        ragazzi da 5 a 17 anni) a 604 € online — acquistato almeno tre giorni prima del
        primo giorno di sci — e 619 € in cassa. È con questo che va confrontato lo
        stagionale:
      </p>
      <ul>
        <li>
          Due adulti e due bambini da 5 a 11 anni con lo stagionale in promozione: 2 × 249 +
          2 × 178 = <strong>854 €</strong>.
        </li>
        <li>
          La stessa famiglia con il Pack Famiglia: 604 € per una settimana,{" "}
          <strong>1.208 € per due</strong>.
        </li>
      </ul>
      <p>
        Una settimana: il pack. Due settimane o più: lo stagionale, con poco più di 350 € di
        differenza. Con due ragazzi da 12 a 17 anni, che nello stagionale contano come adulti
        (4 × 249 = 996 €), la conclusione non cambia.
      </p>

      <h2>Prima di ordinare</h2>
      <ul>
        <li>
          Una <strong>fototessera recente</strong> (senza cappello né occhiali da sole) e un{" "}
          <strong>documento che attesti l'età</strong> sono richiesti all'ordine, online e
          in cassa.
        </li>
        <li>
          Lo skipass è su una tessera mani libere ricaricabile online. Si ritira alle casse
          del <strong>Chef-lieu</strong> o di <strong>Le Mollard</strong> — quella di Le
          Mollard è all'accesso alle piste, a 250 m dall'appartamento.
        </li>
        <li>L'assicurazione Carré Neige è facoltativa, nel carrello.</li>
        <li>
          La pagina della stazione mette un asterisco su «comprensorio» senza dire che cosa
          comprenda. Lo stagionale vale sul comprensorio di Albiez; per una giornata a{" "}
          <a href={PROPERTY.links.sybelles} target="_blank" rel="noopener noreferrer">
            Les Sybelles
          </a>
          , la stazione vende a parte uno skipass «5 giorni Albiez + 1 giorno Sybelles» (200 € adulto, 166 € bambino), con accesso da Saint-Jean-d'Arves.
        </li>
      </ul>
      <div className="facts">
        <p>
          <strong>Acquistare online</strong> —{" "}
          <a href={PROPERTY.links.resort} target="_blank" rel="noopener noreferrer">
            station-albiez.com
          </a>
          <br />
          I prezzi qui sopra sono quelli mostrati dalla stazione l'8 novembre 2026: fa fede
          l'importo nel carrello.
        </p>
      </div>

      <p>
        Vedi anche:{" "}
        <Link href="/it/guide/domaine-skiable-albiez-secteur-mollard">
          sciare ad Albiez dal settore Le Mollard
        </Link>
        , <Link href="/it/guide/louer-ses-skis-a-albiez">noleggiare gli sci ad Albiez</Link>
        , <Link href="/it/guide/cours-de-ski-esf-albiez">le lezioni dell'ESF</Link> e{" "}
        <Link href="/it/sci">la pagina inverno dell'alloggio</Link>.
      </p>
    </>
  );
}
