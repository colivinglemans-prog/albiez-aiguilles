import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        C'est l'étape incontournable pour qui veut ramener quelque chose de la Maurienne —
        ou simplement bien manger sur place. La Fromagerie Coopérative de la vallée des
        Arves produit un Beaufort AOP franchement bon, et elle a une boutique à
        Albiez-Montrond.
      </p>

      <h2>Qui produit ce fromage</h2>
      <p>
        La coopérative est installée au lieu-dit Belluard, à{" "}
        <strong>Saint-Sorlin-d'Arves</strong>, de l'autre côté du massif. Elle collecte le
        lait des exploitations de la vallée des Arves et le transforme sur place.
      </p>
      <p>
        Le <strong>Beaufort AOP</strong> est fabriqué au <strong>lait cru et entier</strong>,
        collecté sur des alpages qui montent jusqu'à <strong>2 500 mètres</strong>, puis
        affiné <strong>6 à 12 mois</strong> en cave fraîche et humide. L'appellation a
        cinquante ans, et la maison est médaillée d'or au Concours Général Agricole de
        Paris.
      </p>

      <h2>Beaufort d'été ou d'hiver : ce n'est pas le même fromage</h2>
      <p>
        C'est la chose à savoir avant d'arriver au comptoir. Le Beaufort existe en{" "}
        <strong>deux versions saisonnières</strong>, selon la période où le lait a été
        collecté :
      </p>
      <ul>
        <li>
          <strong>Le Beaufort d'été</strong> vient du lait des alpages, quand les vaches
          pâturent en altitude sur une flore très variée. Il est plus coloré, plus
          parfumé, plus complexe.
        </li>
        <li>
          <strong>Le Beaufort d'hiver</strong> vient du lait produit en vallée. Il est plus
          doux, plus régulier.
        </li>
      </ul>
      <p>
        Aucun des deux n'est « meilleur » dans l'absolu : le premier se déguste tel quel,
        le second passe très bien en cuisine. Demandez les deux au comptoir — on vous les
        fera goûter.
      </p>

      <h2>Ce qu'il y a d'autre</h2>
      <p>
        La boutique ne s'arrête pas au Beaufort. Au rayon fromages :
      </p>
      <ul>
        <li>
          <strong>Raclette de Savoie IGP</strong>, dont une version fumée (« Brezain ») et
          une à l'ail des ours
        </li>
        <li>
          <strong>Fondue râpée 100 % Beaufort AOP</strong> — le mélange tout prêt, qui
          évite d'avoir à doser trois fromages
        </li>
        <li>
          <strong>Tome des Bauges AOP</strong> et <strong>Reblochon laitier AOP</strong>
        </li>
        <li>
          <strong>Beurre des Arves</strong>
        </li>
      </ul>
      <p>
        S'y ajoutent la charcuterie, les confitures et le miel — de quoi composer une
        planche complète sans passer ailleurs.
      </p>

      <h2>L'intérêt quand on loge à Albiez</h2>
      <p>
        L'appartement est équipé d'un <strong>appareil à raclette, d'un caquelon à fondue,
        d'une pierrade et d'un appareil à crêpes</strong>. Autrement dit, tout ce qu'il faut
        pour transformer un achat à la coopérative en dîner le soir même — et c'est
        nettement meilleur qu'un sachet de grande surface.
      </p>
      <p>
        La logique du séjour devient simple : les{" "}
        <Link href="/fr/guide/faire-ses-courses-a-albiez">courses du quotidien</Link> au
        Sherpa du front de neige ou au Carrefour Market de Saint-Jean, et le fromage à la
        coopérative.
      </p>

      <h2>Où l'acheter</h2>
      <p>
        La coopérative tient <strong>huit magasins</strong> dans la région, dont deux
        directement utiles depuis Albiez :
      </p>
      <ul>
        <li>
          <strong>Albiez-Montrond</strong> — le plus proche, sans quitter la commune.
        </li>
        <li>
          <strong>Saint-Jean-de-Maurienne</strong> — sur la route, à combiner avec le plein
          de courses en montant ou en redescendant.
        </li>
      </ul>
      <p>
        Les six autres sont à Saint-Sorlin-d'Arves (à la fromagerie même), au Corbier, à La
        Toussuire, à Saint-Michel-de-Maurienne, à Valloire et au col du Galibier — pratique
        si vous êtes de passage lors d'une{" "}
        <Link href="/fr/guide/col-du-mollard-velo">sortie vélo</Link>.
      </p>

      <h2>Se faire livrer après le séjour</h2>
      <p>
        La coopérative expédie en France métropolitaine (Corse exclue). Les commandes sont
        traitées le <strong>lundi</strong> et les expéditions partent en Chronofresh à
        partir du <strong>mardi</strong>. Le port est offert au-delà de{" "}
        <strong>100 €</strong>.
      </p>
      <p>
        C'est la solution pour prolonger les vacances sans surcharger le coffre — ou pour
        refaire le stock en décembre.
      </p>

      <div className="facts">
        <p>
          <strong>Fromagerie Coopérative de la vallée des Arves</strong>
          <br />
          Belluard, 73530 Saint-Sorlin-d'Arves
          <br />
          <a href="tel:+33479597016">04 79 59 70 16</a> · boutique@beaufortdesarves.com
          <br />
          <a href={PROPERTY.links.cheeseCoop} target="_blank" rel="noopener noreferrer">
            beaufortdesarves.com
          </a>{" "}
          — adresses et horaires des huit magasins, et boutique en ligne
        </p>
      </div>
    </>
  );
}
