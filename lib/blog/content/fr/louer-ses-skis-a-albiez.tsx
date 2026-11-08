import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond compte quatre loueurs de matériel, répartis entre les deux
        secteurs de la station : deux au front de neige du Mollard, à 250 m du logement, et
        deux au Chef-lieu, le village historique. Tous proposent une réduction à qui
        réserve en ligne avant d'arriver. Voici ce que chacun couvre.
      </p>

      <h2>Au front de neige du Mollard (250 m du logement)</h2>

      <h3>Sport 2000 Aux Deux Frères — notre loueur</h3>
      <p>
        <strong>C'est là que nous louons notre propre matériel</strong>, et c'est celui que
        nous recommandons en premier. Le conseil est bon, l'accueil aussi, et tout se règle
        sur place sans remonter dans la station.
      </p>
      <p>
        <strong>135 m²</strong> de location, entretien de ski et
        espace de vente (matériel, accessoires, vêtements). Le catalogue est large — ski
        alpin, ski freeride, ski de randonnée, ski de fond, snowboard, raquettes,
        chaussures, luge adulte, snowscoot, porte-bébé.
      </p>
      <p>
        C'est l'adresse à retenir si vous cherchez quelque chose d'un peu particulier, ou
        si vous devez équiper un groupe entier avec des besoins différents.
      </p>
      <div className="facts">
        <p>
          <strong>Réserver en ligne</strong> —{" "}
          <a href={PROPERTY.links.skiRental} target="_blank" rel="noopener noreferrer">
            location-ski.sport2000.fr — Aux Deux Frères
          </a>
          <br />
          Le tarif en ligne est plus avantageux qu'au comptoir, et il ne reste que
          l'essayage des chaussures à faire sur place.
        </p>
      </div>

      <h3>Mustang 1650 — Skiset</h3>
      <p>
        L'ancien magasin Ski Attitude, repris par Mustang, au cœur du front de neige et
        ouvert toute l'année. Location et vente de ski et snowboard, conseil chaussures
        avec un scanner 3D (Bootdoc), atelier d'entretien : affûtage, fartage, réglages.
        Réduction en réservant en ligne.
      </p>
      <p>
        C'est aussi là que se réservent les sorties de Mustang : motoneige, soirées igloo
        et trappeur, <Link href="/fr/guide/sunset-ride-albiez-vtt-pistes">Sunset Ride</Link>{" "}
        en VTT sur les pistes. Le détail est dans notre article sur la{" "}
        <Link href="/fr/guide/motoneige-igloo-albiez">motoneige et les soirées igloo</Link>.
      </p>

      <h2>Au Chef-lieu (2 km)</h2>

      <h3>Mustang 1550 — Skimium</h3>
      <p>
        Le plus grand magasin de sport de la station, ouvert toute l'année depuis 1980,
        près de la place Opinel. Location et vente de ski et snowboard, atelier ski et vélo,
        location de VTT et de VTT électriques. Il travaille avec Mustang 1650 : mêmes
        sorties, même équipe.
      </p>

      <h3>Skiset — Albiez Sports</h3>
      <p>
        Un espace de vente de <strong>100 m²</strong>, location et entretien de ski. C'est
        aussi le loueur à connaître pour l'été : BMX, trottinettes électriques et balades
        avec accompagnateurs.
      </p>

      <h2>Réserver en ligne : la seule vraie astuce</h2>
      <p>
        Les quatre loueurs appliquent une remise sur les réservations faites en ligne
        avant l'arrivée. L'écart n'est pas anecdotique sur une semaine à quatre ou six
        personnes, et le bénéfice est double :
      </p>
      <ul>
        <li>
          <strong>Le tarif</strong>, réduit dans tous les cas.
        </li>
        <li>
          <strong>Le temps</strong> : le premier jour de vacances, la file au magasin de
          location est le pire moment de la semaine. Matériel réservé = passage éclair
          pour l'essayage des chaussures.
        </li>
      </ul>
      <p>
        Même logique pour les forfaits : ils peuvent être achetés avec les{" "}
        <Link href="/fr/guide/cours-de-ski-esf-albiez">cours de ski</Link> ou commandés en
        ligne et reçus par la poste, ce qui évite la course du premier matin. Pour qui
        revient plusieurs fois dans l'hiver, voir{" "}
        <Link href="/fr/guide/forfait-saison-albiez">quand le forfait saison est rentable</Link>.
      </p>

      <h2>Ce qu'il reste à décider sur place</h2>
      <p>
        Les seules choses qui se règlent vraiment au magasin sont les chaussures — un
        essayage vaut tous les tableaux de pointures — et le réglage des fixations, qui
        demande votre poids et votre niveau. Comptez vingt minutes, pas une matinée.
      </p>

      <p>
        Voir aussi :{" "}
        <Link href="/fr/guide/domaine-skiable-albiez-secteur-mollard">
          skier à Albiez depuis le secteur Mollard
        </Link>{" "}
        et <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
