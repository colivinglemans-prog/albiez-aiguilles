import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Tre punte di roccia a 3514 metri, che dominano la valle dell'Arvan e che si vedono dal balcone
        dell'alloggio: le Aiguilles d'Arves sono l'emblema della Maurienne. L'alpinista inglese
        Coolidge, che ne compì ufficialmente la prima ascensione nel 1878, vi vedeva «la più bella
        trilogia delle Alpi».
      </p>

      <h2>Cosa si guarda esattamente</h2>
      <p>
        Le Aiguilles d'Arves sono tre cime allineate, che culminano a{" "}
        <strong>3514 m</strong>. Dominano la valle dell'Arvan e si vedono da gran parte del settore:
        il balcone, lo{" "}
        <Link href="/it/guide/lac-du-mollard-baignade">specchio d'acqua del Mollard</Link>, il{" "}
        <Link href="/it/guide/col-du-mollard-velo">col du Mollard</Link> e la maggior parte dei{" "}
        <Link href="/it/guide/randonnees-balisees-albiez">sentieri segnalati</Link> del comune.
      </p>
      <p>
        Sono un punto di riferimento pratico tanto quanto uno scenario: quando le si ha di fronte, si sa
        dove si è.
      </p>

      <h2>Avvicinarsi con calma: la Promenade Savoyarde de Découverte</h2>
      <p>
        La <strong>PSD delle Aiguilles d'Arves</strong> è il modo più accessibile per avvicinarsi. È
        classificata facile, dura <strong>da 1 h 30 a 2 h</strong> ed è{" "}
        <strong>accessibile ai passeggini e alle persone con mobilità ridotta</strong>, cosa rara a
        questa quota.
      </p>
      <p>
        Il percorso è scandito da postazioni interattive che raccontano gli alpeggi e la vita di chi vi
        lavora. È una passeggiata di scoperta, non una prestazione.
      </p>

      <h2>Avvicinarsi seriamente: la Basse du Gerbier</h2>
      <p>
        Per arrivare ai piedi delle Aiguilles, l'itinerario estivo parte dal{" "}
        <strong>parcheggio del ripetitore TV</strong>, alla borgata di Le Chalmieu (1900 m), ad
        Albiez-Montrond. Bisogna calcolare <strong>+700 m di dislivello</strong> per raggiungere la{" "}
        <strong>Basse du Gerbier</strong>, a 2578 m.
      </p>
      <p>
        Non è più una passeggiata: scarponi da montagna, acqua, giacca a vento e una partenza abbastanza
        presto per evitare i temporali di fine pomeriggio.
      </p>
      <div className="facts">
        <p>
          <strong>Promenade Savoyarde de Découverte</strong>: facile, da 1 h 30 a 2 h, accessibile ai
          passeggini e alle persone con mobilità ridotta.
          <br />
          <strong>Basse du Gerbier</strong>: partenza dal parcheggio del ripetitore TV, borgata di Le
          Chalmieu (1900 m), +700 m fino a 2578 m.
        </p>
      </div>

      <h2>Vederle senza camminare</h2>
      <p>Tre punti panoramici non richiedono alcuno sforzo particolare:</p>
      <ul>
        <li>
          <strong>Il balcone dell'alloggio</strong>, esposto a sud-ovest, di fronte alle Aiguilles.
        </li>
        <li>
          <strong>Il col du Mollard</strong> (1638 m), che offre un panorama sul massiccio
          Arvan-Villards e su Les Sybelles: Albiez, gli alpeggi, Albiez-le-Jeune, il Mont Emy, le
          Aiguilles d'Arves, il ghiacciaio de l'Étendard, la combe Genin e le località di Le Corbier e
          La Toussuire.
        </li>
        <li>
          <strong>L'anello dello specchio d'acqua</strong>, 30 minuti a piedi dall'appartamento, con le
          Aiguilles e il ghiacciaio de l'Étendard sullo sfondo.
        </li>
      </ul>

      <h2>Dormire ai loro piedi</h2>
      <p>
        Il{" "}
        <Link href="/it/guide/refuge-chalet-la-croe">Chalet d'la Croë</Link>, rifugio privato a
        2076 m, si trova ai piedi delle Aiguilles. Ristorazione in giornata, pernottamento in domi.
      </p>

      <p>
        La vista dall'alloggio è descritta sulla{" "}
        <Link href="/it/estate">pagina estate</Link> e sulla{" "}
        <Link href="/it/sci">pagina inverno</Link>.
      </p>
    </>
  );
}
