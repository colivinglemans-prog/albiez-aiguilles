import Link from "next/link";
import ArticleImage from "@/lib/blog/ArticleImage";

/*
 * Fonti rilevate l'8 novembre 2026 (schede dell'ufficio del turismo e condizioni
 * generali di Mustang): vedi la versione francese.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Una volta chiuse le piste, la serata può continuare all'aperto. Ad Albiez, quattro uscite
        accompagnate si svolgono al calar della notte: guidare una motoslitta, raggiungere un
        igloo in slitta, abbinare motoslitta e fonduta al ristorante, o pedalare su una fat bike
        elettrica. Tre partono dal Mollard, a pochi minuti a piedi dall'appartamento.
      </p>

      <h2>Chi organizza cosa</h2>
      <ul>
        <li>
          <strong>Motoslitta, serata igloo, serata motoslitta e ristorante, serata
          trapper</strong>: Mustang, noleggio sci della località, con due negozi aperti tutto
          l'anno. <strong>Mustang 1650 (Skiset)</strong> è nel cuore dell'accesso alle piste del
          Mollard, vicino all'appartamento; <strong>Mustang 1550 (Skimium)</strong>, il più
          grande negozio di sport della località dal 1980, è al Chef-lieu, vicino a piazza
          Opinel.
        </li>
        <li>
          <strong>Fat bike</strong>: la ESF di Albiez, con partenza dallo chalet ESF del
          Chef-lieu.
        </li>
      </ul>
      <p>
        Tutte queste uscite si svolgono dal <strong>19 dicembre 2026 al 21 marzo 2027</strong>,
        su prenotazione. L'ufficio del turismo precisa che gli orari non sono garantiti: il
        programma può cambiare con il meteo o l'innevamento.
      </p>

      <h2>Guidare una motoslitta</h2>
      <p>
        Dopo un briefing, si prende personalmente il manubrio e si segue la guida su un percorso
        riservato di 4 ettari, di fronte alle Aiguilles d'Arves. I gruppi sono di 5 persone al
        massimo. In due sulla stessa macchina, pilota e passeggero possono scambiarsi il posto a
        metà percorso.
      </p>
      <ul>
        <li>
          <strong>Svolgimento</strong>: accoglienza e briefing 10-15 min, guida 30-35 min,
          rientro e svestizione 10-15 min.
        </li>
        <li>
          <strong>Partenze</strong>: 18:00, 19:00, 20:00, 21:00 e 22:00, tutti i giorni. Sono
          annunciati dei battesimi a partire dalle 17:30.
        </li>
        <li>
          <strong>Per guidare</strong>: 18 anni compiuti e la patente B, secondo le condizioni
          generali di Mustang. Il casco fornito è obbligatorio.
        </li>
        <li>
          <strong>Passeggero</strong>: 1,30 m minimo, in grado di appoggiare i piedi sui
          poggiapiedi e di tenersi al pilota.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Partenza</strong>: accesso alle piste del Mollard, 125 rue du Ravarin, a circa
          250 m dall'appartamento
          <br />
          <strong>Tariffe</strong> (condizioni generali Mustang): 75 € a motoslitta, 35 € per un
          passeggero dietro la guida, 10 € a bambino per un battesimo
          <br />
          <strong>Cauzione</strong>: 1 000 €, tramite preautorizzazione della carta di credito al
          negozio Mustang 1550 o 1650 (aperti dalle 9:00 alle 19:00)
          <br />
          <strong>Prenotazione</strong>: Mustang Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a>, Mustang Chef-lieu{" "}
          <a href="tel:+33788439696">07 88 43 96 96</a>
        </p>
      </div>
      <p>
        Leggete le condizioni prima di prenotare: secondo Mustang, un'uscita in motoslitta non può
        essere <strong>né annullata né rinviata</strong> dal cliente, e l'iscrizione è effettiva
        solo con il pagamento e la cauzione, 24 ore prima dell'uscita. Solo Mustang può annullare
        o spostare, in particolare in caso di maltempo.
      </p>

      <h2>La serata inuit in igloo</h2>
      <p>
        È l'uscita adatta a tutti, bambini compresi, perché nessuno guida. Si parte dall'accesso
        alle piste su una <strong>slitta trainata da una motoslitta</strong>, su un circuito
        riservato. Segue una breve passeggiata facile nel bosco fino all'igloo, dove ognuno riceve
        un apericena di prodotti locali, con vista sulle Aiguilles d'Arves e sul mont Émy. La guida
        racconta il paese e la sua storia, poi la slitta riporta il gruppo in stazione, col buio.
      </p>
      <ul>
        <li>
          L'ufficio del turismo la descrive come accessibile a tutte le età. Le persone anziane o
          a mobilità ridotta possono essere portate direttamente all'igloo.
        </li>
        <li>
          Menu specifici e regimi alimentari adattati su richiesta: segnalatelo al momento della
          prenotazione.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Partenza</strong>: accesso alle piste del Mollard, a circa 250 m
          dall'appartamento
          <br />
          <strong>Orari</strong>: due turni a sera, 18:30 - 20:00 o 20:30 - 22:00, tutti i giorni
          <br />
          <strong>Durata</strong>: 1 h 30
          <br />
          <strong>Tariffe</strong>: 59 € dagli 11 anni, 49 € sotto gli 11 anni
          <br />
          <strong>Prenotazione</strong>:{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          («Soirée Inuit Igloo»), o per telefono, Mustang Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a>
        </p>
      </div>
      <p>
        Per questa serata, le condizioni di Mustang prevedono che ogni annullamento a meno di 24
        ore venga fatturato per intero. I minorenni devono essere accompagnati da un adulto
        responsabile.
      </p>

      <h2>La serata eskimo: motoslitta e ristorante</h2>
      <p>
        La versione lunga, <strong>solo il mercoledì</strong>. Un'iniziazione alla guida sullo
        stesso percorso di 4 ettari, poi una cena in un ristorante savoiardo ai piedi delle piste,
        scelto da Mustang. Il nome del ristorante non è pubblicato.
      </p>
      <ul>
        <li>
          <strong>Nel menu</strong>: kir come aperitivo, fonduta o raclette a scelta con salumi e
          insalata, dessert a scelta.
        </li>
        <li>
          <strong>In coppia</strong>, pilota e passeggero si scambiano a metà percorso.
        </li>
        <li>
          <strong>Pilota</strong>: 18 anni minimo; <strong>passeggero</strong>: 1,30 m minimo.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Quando</strong>: il mercoledì, dalle 19:00 alle 22:00
          <br />
          <strong>Ritrovo</strong>: secondo l'ufficio del turismo, al negozio Mustang 1550, al
          Chef-lieu; fatevelo confermare al momento della prenotazione
          <br />
          <strong>Tariffe</strong>: 130 € in singolo, 175 € in coppia (una motoslitta per due),
          uscita in motoslitta e cena comprese
          <br />
          <strong>Prenotazione</strong>:{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          («Soirée Eskimo»), o Mustang 1650 al Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a> (in alternativa, Mustang 1550:{" "}
          <a href="tel:+33788439696">07 88 43 96 96</a>)
        </p>
      </div>

      <h2>La fat bike elettrica di notte, con la ESF</h2>
      <p>
        La fat bike è una mountain bike con pneumatici molto larghi; questa ha una pedalata
        assistita potente e le luci. L'uscita segue i sentieri di Albiez al calar della notte,
        accompagnata da Arnaud, istruttore diplomato, in gruppi di 6 al massimo.
      </p>
      <ul>
        <li>
          <strong>Altezza minima</strong>: 1,40 m. Non è indicata un'età minima.
        </li>
        <li>
          <strong>Abbigliamento</strong>: abbigliamento da sci, doposci o scarpe da escursionismo,
          guanti (per cambiare le marce e comandare il motore). Il casco da sci è consigliato.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Partenza</strong>: chalet ESF del Chef-lieu, 97 chemin de la Rua, a circa 2 km
          dall'appartamento
          <br />
          <strong>Orari</strong>: 17:30 - 19:00, tutti i giorni
          <br />
          <strong>Tariffa</strong>: su richiesta
          <br />
          <strong>Prenotazione</strong>: ESF, ufficio del Chef-lieu{" "}
          <a href="tel:+33479593177">04 79 59 31 77</a>
        </p>
      </div>
      <p>
        La fat bike percorre i sentieri; il{" "}
        <Link href="/it/guide/sunset-ride-albiez-vtt-pistes">Sunset Ride des Aiguilles</Link>,
        invece, scende le piste in mountain bike elettrica dopo l'ultima seggiovia del giovedì.
        Sono due uscite diverse, con due organizzatori diversi.
      </p>

      <h2>E la serata trapper</h2>
      <ArticleImage
        src="blog/soiree-trappeur-mustang.jpg"
        alt="Carne alla griglia su una piastra a fuoco di legna, di notte, durante la serata trapper"
        caption="La serata trapper di Mustang. Foto: Mustang Albiez."
      />
      <p>
        Mustang propone anche, il mercoledì e il giovedì sera, una serata con le ciaspole: navetta
        da Albiez a Montrond, salita di circa 45 minuti con un accompagnatore di media montagna
        fino all'alpeggio della Broue (1 800 m), apericena intorno ai bracieri, poi 3 km di
        discesa in slittino con la frontale. Partenza alle 18:00, rientro verso le 22:30. Dagli 8
        anni, da 4 a 7 persone, 99 € per adulto e 79 € sotto gli 11 anni, su{" "}
        <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
          mustangsport.lokki.rent
        </a>
        . In questa niente motoslitta.
      </p>

      <h2>Quale scegliere</h2>
      <ul>
        <li>
          <strong>Con bambini piccoli</strong>: la serata igloo, l'unica aperta a tutte le età, e
          con partenza dal Mollard.
        </li>
        <li>
          <strong>Tra adulti, per le emozioni forti</strong>: la motoslitta da sola, o la serata
          eskimo se volete cenare fuori il mercoledì.
        </li>
        <li>
          <strong>Con ragazzi oltre 1,40 m</strong>: la fat bike. Non possono guidare una
          motoslitta prima dei 18 anni, solo salire dietro.
        </li>
        <li>
          <strong>Per camminare un po'</strong>: la serata trapper.
        </li>
      </ul>
      <p>
        I più piccoli hanno anche i{" "}
        <Link href="/it/guide/chiens-de-traineau-albiez">cani da slitta</Link> delle
        Contamines, di giorno, e l'<Link href="/it/guide/albiez-c-show">Albiez C'Show</Link>{" "}
        del martedì sera durante le vacanze scolastiche, gratuito. Altre idee in{" "}
        <Link href="/it/guide/albiez-en-famille">Albiez in famiglia</Link>.
      </p>

      <h2>Prenotare prima del soggiorno</h2>
      <p>
        I gruppi sono piccoli: 5 persone per partenza in motoslitta, 6 per la fat bike, una sola
        serata eskimo a settimana. In una settimana di vacanze scolastiche, prenotate insieme
        agli <Link href="/it/guide/louer-ses-skis-a-albiez">sci</Link> e ai{" "}
        <Link href="/it/guide/cours-de-ski-esf-albiez">corsi</Link>. Vestitevi come per sciare:
        la sera, a 1 600 m, fa subito molto freddo.
      </p>
      <p>
        Queste attività dipendono dal meteo e dalla neve, e i loro orari possono cambiare. In caso
        di dubbio, chiamate il fornitore o l'ufficio del turismo al{" "}
        <a href="tel:+33479593048">04 79 59 30 48</a>.
      </p>

      <p>
        Vedete anche:{" "}
        <Link href="/it/guide/chiens-de-traineau-albiez">i cani da slitta</Link>,{" "}
        <Link href="/it/guide/sunset-ride-albiez-vtt-pistes">
          il Sunset Ride in mountain bike sulle piste
        </Link>
        , <Link href="/it/guide/albiez-en-famille">Albiez in famiglia</Link> e{" "}
        <Link href="/it/sci">la pagina inverno dell'alloggio</Link>.
      </p>
    </>
  );
}
