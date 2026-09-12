import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Il Trail de l'Étendard attraversa il massiccio delle Grandes Rousses a inizio agosto,
        da Bourg-d'Oisans a Saint-Sorlin-d'Arves — a un quarto d'ora da Albiez. E il suo
        percorso non sparisce il lunedì: esiste anche come{" "}
        <strong>itinerario permanente segnalato</strong>, che si può correre in qualsiasi
        giorno d'estate, senza pettorale.
      </p>

      <h2>La gara</h2>
      <p>
        Quattro percorsi — <strong>17, 22, 44 e 65 km</strong> — nel cuore delle Grandes
        Rousses, su due giorni a inizio agosto. L'edizione 2026 è stata la tredicesima.
      </p>
      <p>
        I <strong>65 km</strong> sono quelli che danno senso alla gara:{" "}
        <strong>3 624 metri di dislivello positivo</strong>, una traversata del massiccio con
        partenza da Bourg-d'Oisans, un passaggio ai piedi del ghiacciaio dell'Étendard e una
        dozzina di laghi notevoli lungo il cammino — il Lac Blanc, il lago Bramant, il lago
        di Grand-Maison. Un anello ai piedi del pic de l'Étendard, poi la discesa su
        Saint-Sorlin-d'Arves.
      </p>
      <p>
        I <strong>44 km</strong> seguono la stessa logica in più corto: partenza da
        Bourg-d'Oisans, arrivo a Saint-Sorlin. I due formati brevi restano sul versante
        savoiardo.
      </p>

      <div className="facts">
        <p>
          <strong>Quando</strong>: due giorni all'inizio di agosto
          <br />
          <strong>Percorsi</strong>: 17, 22, 44 e 65 km
          <br />
          <strong>I 65 km</strong>: 3 624 m di dislivello, Bourg-d'Oisans →
          Saint-Sorlin-d'Arves
          <br />
          <strong>Arrivo</strong>: Saint-Sorlin-d'Arves, a 12 km da Albiez
          <br />
          <strong>Il resto dell'anno</strong>: percorso n. 7 dell'Espace Trail, segnalato in
          permanenza
        </p>
      </div>

      <h2>Lo stesso percorso, senza pettorale</h2>
      <p>
        È ciò che rende la zona interessante anche fuori dal fine settimana di gara. L'
        <strong>Espace Trail Pays des Aiguilles d'Arves</strong> segnala in permanenza{" "}
        <strong>550 chilometri di itinerari</strong>, ripartiti in oltre quaranta percorsi
        numerati: da 3 km per un'uscita in famiglia fino a quasi 38 km, con dislivelli che
        arrivano a 2 380 metri.
      </p>
      <p>
        <strong>Il percorso numero 7 è il Trail de l'Étendard stesso.</strong> Lo si può
        quindi ricognire a luglio, rifare a settembre, o semplicemente correrlo senza mai
        iscriversi a nulla. I cani al guinzaglio sono ammessi sui percorsi segnalati.
      </p>

      <h2>Che cosa sapere se si alloggia ad Albiez</h2>
      <p>
        Diciamolo con franchezza:{" "}
        <strong>nessun percorso dell'Espace Trail parte da Albiez-Montrond.</strong> Partono
        da Saint-Sorlin-d'Arves, Saint-Jean-d'Arves, La Toussuire, Le Corbier, dalla valle
        dei Villards e dalla zona di La Tour-en-Maurienne. Albiez è nello stesso paese, ma
        non nella stessa rete.
      </p>
      <p>
        In pratica significa quindici o venti minuti d'auto per raggiungere una partenza:
        Saint-Sorlin è a 12 km, senza ripassare per la valle. Poco per una rete di 550 km,
        ma non zero, e meglio saperlo prima di prenotare.
      </p>
      <p>
        Dal paese stesso ci sono invece le nostre{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">sei escursioni segnalate</Link>, da
        40 minuti a 3 ore e mezza. Quanto basta per correre dalla porta nei giorni in cui non
        si vuole prendere l'auto.
      </p>

      <h2>Lo stesso massiccio, a piedi e in bici</h2>
      <p>
        Curiosità geografica: i corridori dei 65 km attraversano le Grandes Rousses a piedi
        da Bourg-d'Oisans, mentre i ciclisti valicano lo stesso massiccio su strada un mese
        prima, al col de la Croix de Fer e al Glandon. Una stessa barriera, due modi di
        passarla — e Albiez sta dal lato giusto per entrambi. Vedi{" "}
        <Link href="/it/guide/albiez-camp-de-base-grands-cols">
          Albiez, campo base dei grandi colli
        </Link>
        .
      </p>

      <h2>Intorno alla gara</h2>
      <p>
        A inizio agosto anche il paese ha la sua festa:{" "}
        <Link href="/it/guide/tradi-cimes-albiez">Tradi'Cimes</Link>, gratuita, nel fine
        settimana. A metà luglio, il{" "}
        <Link href="/it/guide/cross-triathlon-swimrun-albiez">
          cross triathlon e swimrun
        </Link>{" "}
        si corre al laghetto del paese. E per recuperare, la balneazione sorvegliata del{" "}
        <Link href="/it/guide/lac-du-mollard-baignade">laghetto del Mollard</Link>.
      </p>
      <p>
        Il resto della stagione è sulla nostra{" "}
        <Link href="/it/estate">pagina estate</Link>.
      </p>
    </>
  );
}
