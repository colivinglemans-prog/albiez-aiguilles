import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        La forêt du Rival monte de 1 300 mètres au col du Mollard, à 2 000 mètres. Sept
        cents mètres de dénivelé de conifères, de cascades et de torrents, traversés de
        sentiers pédestres et de parcours VTT — et habités par une faune qu'on croise
        vraiment.
      </p>

      <h2>Où elle se trouve</h2>
      <p>
        La forêt s'étend sur plusieurs hameaux de la commune d'Albiez-Montrond. Elle
        commence au <strong>Collet d'en Haut</strong> et monte jusqu'au{" "}
        <Link href="/fr/guide/col-du-mollard-velo">col du Mollard</Link>, en passant par La
        Colonne, Le Fregny, La Villette et le Chef-lieu.
      </p>
      <p>
        Concrètement, c'est la forêt qu'on traverse en montant à la station : on la longe
        sans forcément la regarder, alors qu'elle vaut une sortie à elle seule.
      </p>

      <h2>Ce qu'on y voit</h2>
      <p>
        Elle est principalement composée de <strong>conifères</strong>, mais on y trouve
        aussi quelques <strong>cascades</strong>, et elle est traversée par plusieurs
        torrents au niveau de La Colonne et de La Villette.
      </p>
      <p>Côté faune, la liste est longue et les rencontres réelles :</p>
      <ul>
        <li>Cerfs et biches</li>
        <li>Chevreuils</li>
        <li>Écureuils</li>
        <li>Renards</li>
      </ul>
      <p>
        Elle regorge également de <strong>champignons</strong> — la saison venue, on croise
        surtout des locaux, panier au bras et discrétion de rigueur sur les coins.
      </p>
      <p>
        L'été, des <strong>troupeaux de vaches</strong> broutent dans ses clairières. C'est
        aussi ce qui donne au fond sonore de la vallée ses cloches d'alpage.
      </p>

      <h2>La parcourir</h2>
      <p>
        Plusieurs <strong>sentiers de randonnée pédestres</strong> et{" "}
        <strong>parcours de VTT</strong> la traversent. On peut s'y balader à toutes
        saisons.
      </p>
      <p>
        <strong>Une précaution</strong> : rester attentif aux chutes d'arbres éventuelles,
        en particulier après un coup de vent ou une forte chute de neige. C'est une forêt
        de montagne, pas un parc entretenu.
      </p>

      <h2>Quand y aller</h2>
      <ul>
        <li>
          <strong>Printemps</strong> : les torrents sont pleins, les cascades au maximum.
        </li>
        <li>
          <strong>Été</strong> : l'ombre des conifères est précieuse quand le plateau tape,
          et les clairières accueillent les troupeaux.
        </li>
        <li>
          <strong>Automne</strong> : les champignons, les couleurs, et le brame du cerf.
        </li>
        <li>
          <strong>Hiver</strong> : en raquettes, en restant sur les itinéraires balisés.
        </li>
      </ul>

      <h2>Y aller accompagné</h2>
      <p>
        Yves Vionnet, accompagnateur en montagne installé à Albiez, propose des sorties
        guidées sur la faune, la flore et le patrimoine local — et il travaille{" "}
        <strong>toute l'année, hors saison comprise</strong>. C'est ce qui transforme une
        forêt en lecture de paysage.
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
        Voir aussi{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">
          les six randonnées balisées d'Albiez-Montrond
        </Link>{" "}
        et <Link href="/fr/ete">la page été du logement</Link>.
      </p>
    </>
  );
}
