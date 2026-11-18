import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Non serve saper sciare per godersi la neve ad Albiez. Dall'appartamento del Mollard
        ci sono tre modi di uscire con le ciaspole: da soli sugli itinerari segnalati, con
        un'uscita guidata dell'ESF o di un accompagnatore di media montagna, oppure la sera,
        salendo a cena in un alpeggio.
      </p>

      <h2>Da soli, sugli itinerari segnalati</h2>
      <p>
        Tre degli{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">itinerari segnalati di Albiez</Link>{" "}
        si percorrono con le ciaspole. I tempi indicati sono quelli dell'escursione a piedi:
        sulla neve si va più piano, quindi tenetevi un margine.
      </p>

      <h3>Il sentiero della Plaigne, in partenza dal Mollard</h3>
      <p>
        Il più comodo dall'appartamento: parte a destra della seggiovia delle Échaux, dal
        parcheggio di fronte al centro vacanze della Pierre aux fées. Un andata e ritorno con
        poco dislivello e una vista continua sulle Aiguilles d'Arves, l'altopiano di
        Montrond, il Mont Emy e la Grande Chible. L'itinerario finisce ai piedi di una croce,
        davanti a un tavolo da picnic.
      </p>
      <p>
        <strong>Non andate oltre la croce</strong>: più avanti, i canaloni da attraversare
        rendono la zona potenzialmente esposta alle valanghe.
      </p>
      <div className="facts">
        <p>
          <strong>Partenza</strong>: seggiovia delle Échaux, al Mollard ·{" "}
          <strong>Tempo a piedi</strong>: 2 h andata e ritorno · <strong>Dislivello</strong>:
          200 m · <strong>Distanza</strong>: 5 km
        </p>
      </div>

      <h3>Il giro delle Contamines, al Chef-lieu</h3>
      <p>
        Un anello molto pianeggiante attorno alla collinetta delle Contamines, con partenza
        da rue Froide, di fronte al bar tabacchi Constantin. È il più breve e il più facile
        dei tre. L'itinerario è condiviso: d'inverno vi si incrociano le{" "}
        <Link href="/it/guide/chiens-de-traineau-albiez">mute di cani da slitta</Link>, a cui
        si lascia la traccia. Il Chef-lieu è più in basso del Mollard: a inizio o fine
        stagione la neve può mancare.
      </p>
      <div className="facts">
        <p>
          <strong>Partenza</strong>: rue Froide, Chef-lieu · <strong>Tempo a piedi</strong>:
          40 min · <strong>Dislivello</strong>: 37 m · <strong>Distanza</strong>: 2,2 km
        </p>
      </div>

      <h3>L'altopiano di Montrond, dal Chalmieu</h3>
      <p>
        La grande uscita della settimana, e d'inverno un itinerario per ciaspole e sci
        nordico. Si parte dal parcheggio della frazione del Chalmieu, a 7,5 km
        dall'appartamento (circa 15 minuti di auto). Il sentiero sale verso il Relai TV e
        poi les Chabottes, in pieno alpeggio ai piedi delle Aiguilles d'Arves, con tavole
        di orientamento per riconoscere le cime. Ritorno per la stessa strada.
      </p>
      <div className="facts">
        <p>
          <strong>Partenza</strong>: parcheggio del Chalmieu (7,5 km) ·{" "}
          <strong>Tempo a piedi</strong>: 3 h 30 · <strong>Dislivello</strong>: 424 m
        </p>
      </div>

      <h3>E la foresta del Rival</h3>
      <p>
        La <Link href="/it/guide/foret-du-rival">foresta del Rival</Link>, che si attraversa
        salendo verso la località, si percorre d'inverno anche con le ciaspole, purché si
        resti sugli itinerari segnalati.
      </p>
      <p>
        L'ufficio del turismo, al Chef-lieu, vende guide escursionistiche del settore di
        Albiez-Montrond e Albiez-le-Jeune. È anche lì che conviene chiedere lo stato degli
        itinerari prima di partire.
      </p>

      <h2>Con un'uscita guidata</h2>

      <h3>Con l'ESF</h3>
      <p>
        La{" "}
        <Link href="/it/guide/cours-de-ski-esf-albiez">scuola di sci ESF di Albiez</Link> non
        fa solo sci: organizza anche uscite con le ciaspole, guidate da un maestro che
        conosce i panorami e la fauna della zona. A novembre 2026 il suo sito proponeva:
      </p>
      <ul>
        <li>
          <strong>uscite a tema</strong> ogni settimana — nella foresta, panorama e fauna,
          un'uscita golosa con merenda — per lo più con ritrovo all'ESF del Mollard, a 250 m
          dall'appartamento, con un minimo di cinque partecipanti;
        </li>
        <li>
          un'<strong>uscita su misura</strong>, tutti i giorni, al mattino o al pomeriggio, a
          partire da quattro persone: perfetta per una famiglia o un gruppo di amici, al
          ritmo del gruppo.
        </li>
      </ul>
      <p>
        Due cose da sapere: <strong>il noleggio delle ciaspole non è compreso</strong>, e
        l'uscita panorama usa gli impianti, quindi serve uno skipass (a meno di salire a
        piedi). Programma, giorni e orari della stagione vanno verificati su{" "}
        <a href={PROPERTY.links.esf + "raquettes/"} target="_blank" rel="noopener noreferrer">
          esfalbiez.fr/raquettes
        </a>
        .
      </p>

      <h3>Con un accompagnatore di media montagna</h3>
      <p>
        Yves Vionnet, accompagnatore di media montagna che vive ad Albiez, propone
        escursioni guidate con le ciaspole ad Albiez e dintorni, alla scoperta di fauna,
        flora e patrimonio. Lavora <strong>tutto l'anno</strong>, bassa stagione compresa: è
        il modo più sicuro per uscire dai sentieri del paese quando le condizioni cambiano
        da un giorno all'altro.
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

      <p>
        Alain Mollaret, nato in Maurienne, vive nella frazione di la Saussaz, ad
        Albiez-Montrond. Accompagnatore di media montagna, e maestro di sci all'ESF di Albiez,
        accompagna bambini e adulti con le ciaspole per <strong>mezza giornata o una giornata
        intera</strong>, su una neve spesso senza altre tracce che quelle degli animali.
      </p>
      <div className="facts">
        <p>
          <strong>Alain Mollaret — escursioni ad Albiez-Montrond</strong>
          <br />
          <a href="https://www.alain-mollaret-randonnees.fr/pr%C3%A9sentation/activit%C3%A9s-hivernales/raquettes/" target="_blank" rel="noopener noreferrer">
            alain-mollaret-randonnees.fr
          </a>
        </p>
      </div>

      <h3>La sera: la serata trapper di Mustang</h3>
      <p>
        Il mercoledì e il giovedì sera, Mustang porta piccoli gruppi da Montrond fino
        all'alpeggio della Broue (1.800 m): circa 45 minuti di salita con le ciaspole
        insieme a un accompagnatore di media montagna, apericena attorno ai bracieri, poi
        discesa in slittino con la frontale. Dagli 8 anni. I dettagli sono nel nostro
        articolo su{" "}
        <Link href="/it/guide/motoneige-igloo-albiez">motoslitta e serate igloo</Link>.
      </p>

      <h2>Noleggiare le ciaspole</h2>
      <p>
        Sul fronte neve del Mollard, a 250 m, <strong>Sport 2000 Aux Deux Frères</strong> —
        il negozio dove noleggiamo la nostra attrezzatura — ha le ciaspole in catalogo,
        insieme ai porta-bebè. Per gli altri negozi della località, chiedete sul posto. Come
        per gli sci, prenotare online prima di arrivare costa meno: tutto è nel nostro
        articolo su{" "}
        <Link href="/it/guide/louer-ses-skis-a-albiez">noleggiare gli sci ad Albiez</Link>.
      </p>
      <p>
        Al rientro, ciaspole e bastoncini si ripongono nell'
        <strong>armadietto per sci privato, sul pianerottolo</strong>, proprio accanto alla
        porta dell'appartamento.
      </p>

      <h2>Le regole di prudenza</h2>
      <ul>
        <li>
          <strong>Restate sugli itinerari segnalati</strong> e fermatevi dove finiscono: il
          capolinea della Plaigne non è lì per caso.
        </li>
        <li>
          <strong>Informatevi prima di partire</strong> all'ufficio del turismo sullo stato
          degli itinerari, e uscite con un professionista se volete lasciare i sentieri del
          paese.
        </li>
        <li>
          <strong>Condividete la traccia</strong>: cani da slitta alle Contamines, fondisti
          al Chalmieu.
        </li>
        <li>
          Per capire il rischio valanghe, l'ESF propone un'
          <strong>iniziazione all'ARTVA</strong>: un'ora che cambia lo sguardo sulla
          montagna.
        </li>
      </ul>

      <h2>Con i bambini</h2>
      <p>
        Il giro delle Contamines, pianeggiante e breve, è la prova ideale per cominciare.
        Per un'uscita su misura con l'ESF basta una famiglia di quattro persone. La serata
        trapper è aperta dagli 8 anni. E se le gambe si stancano, gli slittini per bambini
        (compreso quello per neonati) aspettano nell'armadietto per sci, a due passi dalla
        pista da slittino del Mollard. Tutte le idee per i più piccoli sono in{" "}
        <Link href="/it/guide/albiez-en-famille">Albiez-Montrond in famiglia</Link>.
      </p>

      <p>
        Vedi anche:{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">le escursioni segnalate</Link>,{" "}
        <Link href="/it/guide/ski-de-randonnee-albiez-debutant">
          iniziare lo sci alpinismo
        </Link>{" "}
        e <Link href="/it/sci">la pagina invernale dell'alloggio</Link>.
      </p>
    </>
  );
}
