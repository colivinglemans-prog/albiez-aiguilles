import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        La foresta di Le Rival sale dai 1300 metri al col du Mollard, a 2000 metri. Settecento metri di
        dislivello di conifere, cascate e torrenti, attraversati da sentieri e percorsi per mountain bike — e
        abitati da una fauna che si incontra davvero.
      </p>

      <h2>Dove si trova</h2>
      <p>
        La foresta si estende su diverse borgate del comune di Albiez-Montrond. Comincia al{" "}
        <strong>Collet d'en Haut</strong> e sale fino al{" "}
        <Link href="/it/guide/col-du-mollard-velo">col du Mollard</Link>, passando per La Colonne, Le Fregny,
        La Villette e il centro del paese.
      </p>
      <p>
        In concreto, è la foresta che si attraversa salendo verso la località: la si percorre senza
        necessariamente guardarla, mentre merita un'uscita a sé.
      </p>

      <h2>Cosa si vede</h2>
      <p>
        È composta principalmente di <strong>conifere</strong>, ma vi si trovano anche alcune{" "}
        <strong>cascate</strong>, ed è attraversata da diversi torrenti all'altezza di La Colonne e di La
        Villette.
      </p>
      <p>Sul fronte della fauna, l'elenco è lungo e gli incontri reali:</p>
      <ul>
        <li>Cervi e cerve</li>
        <li>Caprioli</li>
        <li>Scoiattoli</li>
        <li>Volpi</li>
      </ul>
      <p>
        Abbonda anche di <strong>funghi</strong>: arrivata la stagione, si incrociano soprattutto gli abitanti
        del posto, cesto al braccio e discrezione d'obbligo sui punti buoni.
      </p>
      <p>
        D'estate, <strong>mandrie di vacche</strong> pascolano nelle sue radure. È anche ciò che dà al
        sottofondo sonoro della valle i suoi campanacci d'alpeggio.
      </p>

      <h2>Percorrerla</h2>
      <p>
        Diversi <strong>sentieri escursionistici</strong> e <strong>percorsi per mountain bike</strong> la
        attraversano. Ci si può camminare in tutte le stagioni.
      </p>
      <p>
        <strong>Una precauzione</strong>: restate attenti a eventuali cadute di alberi, in particolare dopo una
        raffica di vento o una forte nevicata. È una foresta di montagna, non un parco curato.
      </p>

      <h2>Quando andarci</h2>
      <ul>
        <li>
          <strong>Primavera</strong>: i torrenti sono pieni, le cascate al massimo.
        </li>
        <li>
          <strong>Estate</strong>: l'ombra delle conifere è preziosa quando l'altopiano picchia, e le radure
          accolgono le mandrie.
        </li>
        <li>
          <strong>Autunno</strong>: i funghi, i colori e il bramito del cervo.
        </li>
        <li>
          <strong>Inverno</strong>: con le ciaspole, restando sugli itinerari segnalati.
        </li>
      </ul>

      <h2>Andarci accompagnati</h2>
      <p>
        Yves Vionnet, accompagnatore di montagna con base ad Albiez, propone uscite guidate sulla fauna, la
        flora e il patrimonio locale — e lavora{" "}
        <strong>tutto l'anno, bassa stagione compresa</strong>. È ciò che trasforma una foresta in una lettura
        del paesaggio.
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
        Vedete anche{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">
          le sei escursioni segnalate di Albiez-Montrond
        </Link>{" "}
        e <Link href="/it/estate">la pagina estate dell'alloggio</Link>.
      </p>
    </>
  );
}
