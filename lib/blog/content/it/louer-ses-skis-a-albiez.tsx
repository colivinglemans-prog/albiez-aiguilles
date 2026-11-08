import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond conta quattro noleggi di attrezzatura, distribuiti tra i due settori della località:
        due all'accesso alle piste del Mollard, a 250 m dall'alloggio, e due al Chef-lieu, il borgo storico.
        Tutti offrono uno sconto a chi prenota online prima di
        arrivare. Ecco cosa copre ciascuno.
      </p>

      <h2>All'accesso alle piste del Mollard (250 m dall'alloggio)</h2>

      <h3>Sport 2000 Aux Deux Frères — il nostro noleggio</h3>
      <p>
        <strong>È qui che noleggiamo la nostra attrezzatura</strong>, ed è quello che consigliamo per primo. Il
        consiglio è buono, l'accoglienza anche, e tutto si risolve sul posto senza risalire in paese.
      </p>
      <p>
        <strong>135 m²</strong> di noleggio, officina sci e spazio vendita
        (attrezzatura, accessori, abbigliamento). Il catalogo è ampio: sci alpino, freeride, scialpinismo, sci
        di fondo, snowboard, ciaspole, scarponi, slittino per adulti, snowscoot, zaino porta-bebè.
      </p>
      <p>
        È l'indirizzo da ricordare se cercate qualcosa di un po' particolare, o se dovete attrezzare un gruppo
        intero con esigenze diverse.
      </p>
      <div className="facts">
        <p>
          <strong>Prenotare online</strong> —{" "}
          <a href={PROPERTY.links.skiRental} target="_blank" rel="noopener noreferrer">
            location-ski.sport2000.fr — Aux Deux Frères
          </a>
          <br />
          La tariffa online è più vantaggiosa che al banco, e sul posto resta solo la prova degli scarponi.
        </p>
      </div>

      <h3>Mustang 1650 — Skiset</h3>
      <p>
        L'ex negozio Ski Attitude, rilevato da Mustang, nel cuore dell'accesso alle piste e aperto tutto
        l'anno. Noleggio e vendita di sci e snowboard, consulenza sugli scarponi con uno scanner 3D (Bootdoc),
        laboratorio di manutenzione: affilatura, sciolinatura, regolazioni. Sconto prenotando online.
      </p>
      <p>
        È anche qui che si prenotano le uscite di Mustang: motoslitta, serate igloo e trapper,{" "}
        <Link href="/it/guide/sunset-ride-albiez-vtt-pistes">Sunset Ride</Link> in mountain bike sulle piste.
        Il dettaglio è nel nostro articolo sulla{" "}
        <Link href="/it/guide/motoneige-igloo-albiez">motoslitta e le serate igloo</Link>.
      </p>

      <h2>Al Chef-lieu (2 km)</h2>

      <h3>Mustang 1550 — Skimium</h3>
      <p>
        Il più grande negozio di sport della località, aperto tutto l'anno dal 1980, vicino a piazza Opinel.
        Noleggio e vendita di sci e snowboard, laboratorio sci e bici, noleggio di mountain bike e di mountain
        bike elettriche. Lavora con Mustang 1650: stesse uscite, stessa squadra.
      </p>

      <h3>Skiset — Albiez Sports</h3>
      <p>
        Uno spazio vendita di <strong>100 m²</strong>, noleggio e manutenzione sci. È anche il noleggio da
        conoscere per l'estate: BMX, monopattini elettrici e uscite con accompagnatori.
      </p>

      <h2>Prenotare online: l'unico vero trucco</h2>
      <p>
        I quattro noleggi applicano uno sconto sulle prenotazioni effettuate online prima dell'arrivo. La
        differenza non è trascurabile su una settimana per quattro o sei persone, e il vantaggio è doppio:
      </p>
      <ul>
        <li>
          <strong>La tariffa</strong>, ridotta in ogni caso.
        </li>
        <li>
          <strong>Il tempo</strong>: il primo giorno di vacanza, la coda al negozio di noleggio è il momento
          peggiore della settimana. Attrezzatura prenotata = passaggio lampo per la prova degli scarponi.
        </li>
      </ul>
      <p>
        I noleggiatori lanciano spesso delle <strong>promozioni online già dall'autunno</strong>, ben
        prima dell'apertura del comprensorio, spesso riservate agli iscritti: create un account sul loro
        sito per riceverle. È il momento migliore per prenotare una settimana di vacanze scolastiche.
        L'ordine da seguire tra lezioni, attrezzatura e skipass è nel nostro articolo{" "}
        <Link href="/it/guide/reserver-ski-esf-en-avance">prenotare in anticipo</Link>.
      </p>
      <p>
        Stessa logica per gli skipass: possono essere acquistati con i{" "}
        <Link href="/it/guide/cours-de-ski-esf-albiez">corsi di sci</Link> oppure ordinati online e ricevuti per
        posta, evitando la corsa della prima mattina. Se tornate più volte in inverno,
        vedete{" "}
        <Link href="/it/guide/forfait-saison-albiez">quando conviene lo skipass stagionale</Link>.
      </p>

      <h2>Cosa resta da decidere sul posto</h2>
      <p>
        Le uniche cose che si risolvono davvero in negozio sono gli scarponi — una prova vale più di qualsiasi
        tabella di taglie — e la regolazione degli attacchi, che richiede il vostro peso e il vostro livello.
        Calcolate venti minuti, non una mattinata.
      </p>

      <p>
        Vedete anche:{" "}
        <Link href="/it/guide/domaine-skiable-albiez-secteur-mollard">
          sciare ad Albiez dal settore Le Mollard
        </Link>{" "}
        e <Link href="/it/sci">la pagina inverno dell'alloggio</Link>.
      </p>
    </>
  );
}
