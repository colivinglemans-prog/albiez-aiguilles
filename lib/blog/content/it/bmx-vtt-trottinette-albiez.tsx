import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond ospita la pista di BMX più alta di Francia. È ad accesso libero, nel centro
        del paese, circondata da campi sportivi e da un'area picnic. E per tutto ciò che rotola, la
        località noleggia mountain bike elettriche, BMX e monopattini elettrici.
      </p>

      <h2>La pista di BMX race</h2>
      <p>
        Si trova nel centro del paese e si pratica <strong>in totale libertà</strong>: nessuna
        prenotazione, nessuna assistenza obbligatoria. I moduli sono di{" "}
        <strong>livelli diversi</strong>, il che permette a un principiante e a un praticante
        esperto di girare sullo stesso terreno.
      </p>
      <p>
        La cornice conta molto: è la pista di BMX più alta di Francia, e lo si capisce alzando lo
        sguardo.
      </p>

      <h2>Cosa c'è intorno</h2>
      <p>
        La pista non è isolata: l'insieme forma una vera area ricreativa:
      </p>
      <ul>
        <li>Campi da calcio e da basket</li>
        <li>Campo da tennis</li>
        <li>Campo da bocce</li>
        <li>Area gioco per i bambini</li>
        <li>Tavoli da picnic</li>
      </ul>
      <p>
        È l'idea giusta per un pomeriggio in famiglia quando non tutti vogliono fare la stessa cosa.
      </p>

      <h2>Noleggiare una bici</h2>

      <h3>Skiset — Albiez Sports (centro del paese)</h3>
      <p>
        Noleggio di <strong>BMX</strong> e di <strong>monopattini elettrici</strong>, e uscite con
        accompagnatori. Spazio vendita di 100 m², attrezzatura da sci d'inverno e da escursionismo
        d'estate.
      </p>

      <h3>Skimium — Mustang Sports (centro del paese)</h3>
      <p>
        <strong>Scuola di ciclismo</strong> e <strong>mountain bike elettriche</strong>. Li si
        ritrova anche la sera all'accesso alle piste del Mollard, a 250 m dall'alloggio.
      </p>

      <h3>Skiset Ski Attitude e Sport 2000 (accesso alle piste del Mollard)</h3>
      <p>
        I due noleggi più vicini all'alloggio passano in modalità escursionismo d'estate. Il
        dettaglio di ciascuno è nel nostro articolo{" "}
        <Link href="/it/guide/louer-ses-skis-a-albiez">
          noleggiare l'attrezzatura ad Albiez-Montrond
        </Link>
        .
      </p>

      <h2>La mountain bike sui sentieri</h2>
      <p>
        Diversi <strong>percorsi per mountain bike</strong> attraversano la{" "}
        <Link href="/it/guide/foret-du-rival">foresta di Le Rival</Link>, tra i 1300 m e il col du
        Mollard. Attenzione agli itinerari condivisi: il{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">giro delle Contamines</Link> accoglie
        anche pedoni e, d'inverno, tiri di cani da slitta.
      </p>

      <h2>E la bici da strada</h2>
      <p>
        Per i ciclisti su strada il tema è altrove: il{" "}
        <Link href="/it/guide/col-du-mollard-velo">col du Mollard</Link>, le sue tre salite e il
        giro Arvan-Villards che collega Glandon, Croix de Fer e Mollard.
      </p>
      <p>
        L'ufficio del turismo nel centro del paese mette a disposizione mappe e itinerari per bici
        da strada, gravel e mountain bike, con o senza assistenza elettrica.
      </p>
    </>
  );
}
