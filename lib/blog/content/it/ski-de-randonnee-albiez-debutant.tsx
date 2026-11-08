import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Dati rilevati l'8 novembre 2026 su explore-maurienne.com e sul topo PDF dell'ufficio
 * del turismo: vedi la versione francese.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Lo scialpinismo significa salire con la forza delle gambe, pelli di foca sotto gli sci,
        poi riscendere sciando. Albiez ha due itinerari segnalati, di cui uno parte dall'accesso
        alle piste del Mollard, a 250 m dall'appartamento, e l'ufficio del turismo lo presenta
        come una prima esperienza. Ecco come fare quando non lo si è mai praticato.
      </p>

      <h2>Il livello necessario</h2>
      <p>
        La salita richiede fiato più che tecnica. La discesa, invece, si fa con gli sci: per le
        sue uscite la ESF chiede di{" "}
        <strong>saper scendere una pista rossa con ogni tipo di neve</strong>. È un buon
        riferimento prima di lanciarsi, anche da soli. Per uno sciatore ancora principiante in
        pista, meglio aspettare una stagione.
      </p>

      <h2>I due itinerari segnalati</h2>

      <h3>Salita agli Aplanes — la prima uscita, ai piedi dell'appartamento</h3>
      <p>
        Partenza dall'<strong>accesso alle piste del Mollard</strong> (1 619 m), a 250 m a piedi.
        Si costeggia il comprensorio sciistico in direzione degli Aplanes, per{" "}
        <strong>circa 2 km</strong> e <strong>circa 250 m di dislivello</strong>. Calcolate{" "}
        <strong>1 h 30</strong>. La salita passa per zone poco esposte alle valanghe, e la
        discesa si fa lungo le piste. All'arrivo, vista sulle Aiguilles d'Arves e sul ghiacciaio
        dell'Étendard.
      </p>
      <p>
        Non si sale fino in cima allo skilift degli Aplanes (2 100 m): l'itinerario si ferma molto
        più in basso, e oltre il dislivello diventa decisamente più impegnativo. È ciò che ne fa
        una buona uscita di scoperta, da inserire in una mattinata o a fine giornata di sci, e che
        si può fare con sciatori alpini che vi aspettano in cima.
      </p>

      <h3>Salita al Crêt de l'âne — un settore più selvaggio</h3>
      <p>
        Partenza dal <strong>parcheggio del Crêt de l'âne</strong>, sulla strada per
        Albiez-le-Jeune (1 497 m). Bisogna prendere l'auto dal Mollard. Il percorso misura{" "}
        <strong>da 3,6 a 3,7 km</strong>, per circa <strong>400 m di dislivello</strong> secondo
        il topo dell'ufficio del turismo, in <strong>2 h 30</strong>. Sale a tornanti sotto i
        pendii di Casse Massion, nell'ex settore di La Blanche, il cui impianto è stato smontato
        nel 2020. Poca gente, e una vista sui canali nord del mont Emy, sul paese e sul ghiacciaio
        dell'Étendard.
      </p>
      <p>
        Più lungo e più ripido degli Aplanes: da tenere per una seconda uscita. Per riscendere,
        quando questo settore è aperto, si può raggiungere con gli sci la base della seggiovia del
        Crêt de l'âne. È una zona bassa del comprensorio, che non apre per tutta la stagione:
        tutto dipende dall'innevamento.
      </p>

      <div className="facts">
        <p>
          <strong>Itinerari</strong>: aperti tutti i giorni, secondo l'innevamento e il meteo
          <br />
          <strong>Discesa</strong>: lungo le piste, solo durante l'apertura del comprensorio
          (9:00 - 17:00)
          <br />
          <strong>Topo e traccia GPX</strong>:{" "}
          <a
            href="https://www.explore-maurienne.com/activites/activites-neige/ski-de-rando/"
            target="_blank"
            rel="noopener noreferrer"
          >
            explore-maurienne.com
          </a>{" "}
          e app Explore Maurienne
          <br />
          <strong>Ufficio del turismo</strong>:{" "}
          <a href="tel:+33479593048">04 79 59 30 48</a>
        </p>
      </div>

      <h2>Le regole nel comprensorio</h2>
      <p>Il topo dell'ufficio del turismo le riassume così:</p>
      <ul>
        <li>
          <strong>La salita segue i segnali</strong> «scialpinismo», non le piste.
        </li>
        <li>
          <strong>La discesa si fa lungo le piste di sci alpino</strong>, negli orari di apertura
          del comprensorio, dalle 9:00 alle 17:00.
        </li>
        <li>
          <strong>Fuori da questi orari le piste sono vietate</strong>, e di notte ancora di più:
          è il momento in cui passano i gatti delle nevi, a volte trattenuti da un cavo di verricello
          teso di traverso sul pendio. Niente salite con la frontale la sera sulle piste,
          semplicemente per non incrociare un gatto delle nevi al buio.
        </li>
      </ul>
      <p>
        Il comprensorio è aperto dal 19 dicembre 2026 al 21 marzo 2027. Fuori da queste date non
        ci sono più piste battute né sorveglianza per la discesa.
      </p>

      <h2>La sicurezza, anche su un itinerario segnalato</h2>
      <p>
        I due itinerari sono <strong>segnalati ma non messi in sicurezza</strong>: non vi viene
        effettuato alcun distacco preventivo di valanghe. Li percorrete sotto la vostra
        responsabilità. Prima di ogni uscita:
      </p>
      <ul>
        <li>
          Consultare il meteo, lo stato della neve e il{" "}
          <strong>bollettino del rischio valanghe</strong> (BRA); informarsi presso il servizio
          piste e seguirne le indicazioni.
        </li>
        <li>
          Portare il materiale minimo: <strong>ARTVA, pala e sonda</strong>, e saperli usare.
        </li>
        <li>
          Dire a qualcuno quale itinerario prendete e a che ora contate di rientrare. Non farsi
          sorprendere dal buio.
        </li>
        <li>
          Rimandare l'uscita se il tempo peggiora.
        </li>
        <li>
          In caso di incidente: <a href="tel:112">112</a>.
        </li>
      </ul>

      <h2>L'attrezzatura</h2>
      <p>
        Servono sci da scialpinismo con i loro attacchi, pelli di foca, scarponi adatti e
        bastoncini telescopici, più il trio ARTVA, pala, sonda. Inutile comprare per una prima
        volta: <strong>Sport 2000 Aux Deux Frères</strong>, all'accesso alle piste del Mollard a
        250 m, noleggia attrezzatura da scialpinismo. Vedete{" "}
        <Link href="/it/guide/louer-ses-skis-a-albiez">noleggiare gli sci ad Albiez</Link>;
        chiedete al banco cosa è compreso nel noleggio.
      </p>
      <p>
        La sera gli sci si ripongono nell'armadietto privato, sul pianerottolo, proprio accanto
        alla porta dell'appartamento.
      </p>

      <h2>Cominciare con un professionista</h2>
      <p>
        È la soluzione più semplice per una prima volta: si impara a mettere le pelli, a fare
        un'inversione su un pendio e a usare un ARTVA. Quattro formule sono proposte con partenza
        da Albiez.
      </p>

      <h3>Iniziazione allo scialpinismo con la ESF</h3>
      <p>
        Per scoprire l'attrezzatura e come usarla: pelli, ARTVA, sonda e pala, orientamento,
        discesa controllata, cominciando con piccoli dislivelli. Gruppo da{" "}
        <strong>2 a 6 persone</strong>, materiale di sicurezza fornito (ARTVA, pala, sonda).
        L'ufficio del turismo la annuncia dal 19 dicembre 2026 al 21 marzo 2027, tutti i giorni
        dalle 15:00 alle 17:00 o su richiesta.
      </p>

      <h3>Uscita di scialpinismo à la carte con la ESF</h3>
      <p>
        Il seguito logico, su un terreno più selvaggio, con un itinerario scelto secondo il meteo
        e il livello del gruppo (<strong>da 3 a 6 persone</strong>). Stesso livello richiesto,
        stesso materiale di sicurezza fornito. Annunciata tutti i giorni dalle 15:00 alle 18:00 o
        su richiesta, nello stesso periodo.
      </p>
      <p>
        Le due formule della ESF partono dallo chalet ESF del Mollard, all'accesso alle piste, a
        250 m dall'appartamento. Il sito della ESF non precisa se gli sci da scialpinismo siano
        compresi: da chiedere alla prenotazione.
      </p>
      <div className="facts">
        <p>
          <strong>ESF Albiez</strong> — tariffa su richiesta
          <br />
          Ufficio del Mollard: <a href="tel:+33479593180">04 79 59 31 80</a>
          <br />
          Ufficio del Chef-lieu: <a href="tel:+33479593177">04 79 59 31 77</a>
          <br />
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
        </p>
      </div>

      <h3>Lezione con Valentin Jullien, maestro indipendente</h3>
      <p>
        Una giornata di scialpinismo per <strong>5 persone al massimo</strong>, per scoprire o per
        praticare, ad Albiez, nelle Sybelles, a Les Karellis o altrove in Maurienne. Annunciata
        tutti i giorni dal 19 dicembre 2026 al 28 marzo 2027, o su richiesta.
      </p>
      <div className="facts">
        <p>
          <strong>Valentin Jullien</strong> — tariffa su richiesta
          <br />
          <a href="tel:+33618092418">06 18 09 24 18</a>
        </p>
      </div>

      <h3>Uscita con Ludovic, guida alpina</h3>
      <p>
        In mezza giornata o in giornata intera, sugli itinerari fuoripista della valle, con il
        materiale di sicurezza fornito (ARTVA, pala, sonda). Piuttosto per una seconda o una terza
        uscita, una volta acquisite le basi. Su richiesta, prenotazione obbligatoria.
      </p>
      <div className="facts">
        <p>
          <strong>Ludovic Gaboriaud, guida alpina</strong> — tariffa su richiesta
          <br />
          <a href="tel:+33613845277">06 13 84 52 77</a>
        </p>
      </div>

      <p>
        Gli orari pubblicati dall'ufficio del turismo non sono garantiti e il programma può
        cambiare: confermate con il fornitore o con l'ufficio del turismo
        (<a href="tel:+33479593048">04 79 59 30 48</a>) prima di organizzarvi.
      </p>

      <p>
        Vedete anche:{" "}
        <Link href="/it/guide/domaine-skiable-albiez-secteur-mollard">
          sciare ad Albiez dal settore Le Mollard
        </Link>
        , <Link href="/it/guide/louer-ses-skis-a-albiez">noleggiare gli sci ad Albiez</Link>,{" "}
        <Link href="/it/guide/cours-de-ski-esf-albiez">i corsi della ESF</Link> e{" "}
        <Link href="/it/sci">la pagina inverno dell'alloggio</Link>.
      </p>
    </>
  );
}
