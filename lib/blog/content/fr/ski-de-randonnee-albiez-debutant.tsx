import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Faits relevés le 8 novembre 2026 sur explore-maurienne.com (page ski de rando, fiches
 * des deux itinéraires et des quatre sorties encadrées) et sur le topo PDF de l'office
 * de tourisme (bureau d'Albiez-Montrond). Les chiffres des itinéraires diffèrent entre
 * la fiche en ligne et le topo PDF : on garde des valeurs arrondies. Aucun prix de
 * sortie encadrée n'est publié pour la saison 2026-2027 : à reprendre si l'ESF en affiche.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Le ski de randonnée, c'est monter à la force des jambes, peaux de phoque sous les
        skis, puis redescendre à ski. Albiez a deux itinéraires balisés, dont un qui part
        du front de neige du Mollard, à 250 m de l'appartement, et que l'office de tourisme
        présente comme une première expérience. Voici comment s'y prendre quand on n'en a
        jamais fait.
      </p>

      <h2>Le niveau qu'il faut avoir</h2>
      <p>
        La montée demande du souffle plus que de la technique. La descente, elle, se fait à
        ski : l'ESF demande pour ses sorties de{" "}
        <strong>savoir descendre une piste rouge dans tous types de neige</strong>. C'est un
        bon repère avant de se lancer, même seul. Pour un skieur qui débute encore sur les
        pistes, mieux vaut attendre une saison.
      </p>

      <h2>Les deux itinéraires balisés</h2>

      <h3>Montée aux Aplanes — la première sortie, au pied de l'appartement</h3>
      <p>
        Départ au <strong>front de neige du Mollard</strong> (1 619 m), à 250 m à pied. On
        longe le domaine skiable en direction des Aplanes, sur{" "}
        <strong>environ 2 km</strong> et <strong>environ 250 m de dénivelé</strong>. Comptez{" "}
        <strong>1 h 30</strong>. La montée passe par des zones peu exposées aux avalanches,
        et la descente se fait par les pistes. À l'arrivée, vue sur les Aiguilles d'Arves et
        le glacier de l'Étendard.
      </p>
      <p>
        On ne monte pas au sommet du téléski des Aplanes (2 100 m) : l'itinéraire s'arrête
        bien plus bas, et au-delà le dénivelé devient nettement plus sportif. C'est ce qui
        en fait une bonne sortie de découverte, à caser une
        matinée ou en fin de journée de ski, et que l'on peut faire avec des skieurs alpins
        qui vous attendent en haut.
      </p>

      <h3>Montée au Crêt de l'âne — un secteur plus sauvage</h3>
      <p>
        Départ au <strong>parking du Crêt de l'âne</strong>, sur la route d'Albiez-le-Jeune
        (1 497 m). Il faut prendre la voiture depuis le Mollard. Le parcours fait{" "}
        <strong>3,6 à 3,7 km</strong>, pour environ <strong>400 m de dénivelé</strong> selon
        le topo de l'office de tourisme, en <strong>2 h 30</strong>. Il monte en lacets sous
        les pentes de Casse Massion, sur l'ancien secteur de La Blanche, dont la remontée a
        été démontée en 2020. Peu de monde, et une vue sur les couloirs nord du mont Emy, le
        village et le glacier de l'Étendard.
      </p>
      <p>
        Plus long et plus raide que les Aplanes : à garder pour une deuxième sortie. Pour
        redescendre, quand ce secteur est ouvert, on peut rejoindre à ski le bas du
        télésiège du Crêt de l'âne. C'est une zone basse du domaine, qui n'ouvre pas toute
        la saison : tout dépend de l'enneigement.
      </p>

      <div className="facts">
        <p>
          <strong>Itinéraires</strong> : ouverts tous les jours, selon l'enneigement et la
          météo
          <br />
          <strong>Descente</strong> : par les pistes, uniquement pendant l'ouverture du
          domaine (9 h - 17 h)
          <br />
          <strong>Topo et tracé GPX</strong> :{" "}
          <a
            href="https://www.explore-maurienne.com/activites/activites-neige/ski-de-rando/"
            target="_blank"
            rel="noopener noreferrer"
          >
            explore-maurienne.com
          </a>{" "}
          et application Explore Maurienne
          <br />
          <strong>Office de tourisme</strong> :{" "}
          <a href="tel:+33479593048">04 79 59 30 48</a>
        </p>
      </div>

      <h2>Les règles sur le domaine</h2>
      <p>Le topo de l'office de tourisme les résume ainsi :</p>
      <ul>
        <li>
          <strong>La montée suit les balises</strong> « ski de randonnée », pas les pistes.
        </li>
        <li>
          <strong>La descente se fait par les pistes de ski alpin</strong>, pendant les
          horaires d'ouverture du domaine, de 9 h à 17 h.
        </li>
        <li>
          <strong>Hors de ces horaires, les pistes sont interdites</strong>, et la nuit plus
          encore : c'est le moment où passent les dameuses, parfois retenues par un câble de
          treuil tendu en travers de la pente. Pas de montée à la frontale le soir sur les
          pistes, tout simplement pour ne pas croiser une dameuse dans le noir.
        </li>
      </ul>
      <p>
        Le domaine ouvre du 19 décembre 2026 au 21 mars 2027. En dehors de ces dates, il n'y
        a plus de pistes damées ni de surveillance pour la descente.
      </p>

      <h2>La sécurité, même sur un itinéraire balisé</h2>
      <p>
        Les deux itinéraires sont <strong>balisés mais non sécurisés</strong> : aucun
        déclenchement préventif d'avalanche n'y est fait. Vous y êtes sous votre propre
        responsabilité. Avant chaque sortie :
      </p>
      <ul>
        <li>
          Lire la météo, l'état de la neige et le{" "}
          <strong>bulletin de risque d'avalanche</strong> (BRA) ; se renseigner auprès du
          service des pistes et suivre ses consignes.
        </li>
        <li>
          Emporter le matériel minimum : <strong>DVA, pelle et sonde</strong>, et savoir
          s'en servir.
        </li>
        <li>
          Dire à quelqu'un quel itinéraire vous prenez et à quelle heure vous comptez
          rentrer. Ne pas se faire surprendre par la nuit.
        </li>
        <li>
          Reporter la sortie si le temps se gâte.
        </li>
        <li>
          En cas d'accident : <a href="tel:112">112</a>.
        </li>
      </ul>

      <h2>Le matériel</h2>
      <p>
        Il faut des skis de randonnée avec leurs fixations, des peaux de phoque, des
        chaussures adaptées et des bâtons télescopiques, plus le trio DVA, pelle, sonde.
        Inutile d'acheter pour une première fois :{" "}
        <strong>Sport 2000 Aux Deux Frères</strong>, au front de neige du Mollard à 250 m,
        loue du matériel de ski de randonnée. Voir{" "}
        <Link href="/fr/guide/louer-ses-skis-a-albiez">louer ses skis à Albiez</Link> ;
        demandez au comptoir ce qui est compris dans la location.
      </p>
      <p>
        Les skis rentrent le soir dans le casier privatif, sur le palier, juste à côté de la
        porte de l'appartement.
      </p>

      <h2>Commencer avec un professionnel</h2>
      <p>
        C'est le plus simple pour une première fois : on apprend à poser les peaux, à faire
        une conversion dans une pente et à se servir d'un DVA. Quatre formules sont
        proposées au départ d'Albiez.
      </p>

      <h3>Initiation ski de randonnée avec l'ESF</h3>
      <p>
        Pour découvrir le matériel et sa mise en œuvre : peaux, DVA, sonde et pelle,
        orientation, descente maîtrisée, en commençant par de petits dénivelés. Groupe de{" "}
        <strong>2 à 6 personnes</strong>, matériel de sécurité fourni (DVA, pelle, sonde).
        L'office de tourisme l'annonce du 19 décembre 2026 au 21 mars 2027, tous les jours de
        15 h à 17 h ou sur demande.
      </p>

      <h3>Sortie ski de randonnée à la carte avec l'ESF</h3>
      <p>
        La suite logique, dans un terrain plus sauvage, avec un itinéraire choisi selon la
        météo et le niveau du groupe (<strong>3 à 6 personnes</strong>). Même niveau demandé,
        même matériel de sécurité fourni. Annoncée tous les jours de 15 h à 18 h ou sur
        demande, sur la même période.
      </p>
      <p>
        Les deux formules de l'ESF partent du chalet ESF du Mollard, au front de neige, à
        250 m de l'appartement. Le site de l'ESF ne précise pas si les skis de randonnée sont
        compris : à demander à la réservation.
      </p>
      <div className="facts">
        <p>
          <strong>ESF Albiez</strong> — tarif sur demande
          <br />
          Bureau du Mollard : <a href="tel:+33479593180">04 79 59 31 80</a>
          <br />
          Bureau du Chef-lieu : <a href="tel:+33479593177">04 79 59 31 77</a>
          <br />
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
        </p>
      </div>

      <h3>Leçon avec Valentin Jullien, moniteur indépendant</h3>
      <p>
        Une journée de ski de randonnée pour <strong>5 personnes au maximum</strong>, pour
        découvrir ou pour pratiquer, à Albiez, aux Sybelles, aux Karellis ou ailleurs en
        Maurienne. Annoncée tous les jours du 19 décembre 2026 au 28 mars 2027, ou sur
        demande.
      </p>
      <div className="facts">
        <p>
          <strong>Valentin Jullien</strong> — tarif sur demande
          <br />
          <a href="tel:+33618092418">06 18 09 24 18</a>
        </p>
      </div>

      <h3>Sortie avec Ludovic, guide de haute montagne</h3>
      <p>
        En demi-journée ou en journée, sur les itinéraires hors-piste de la vallée, avec le
        matériel de sécurité fourni (DVA, pelle, sonde). Plutôt pour une deuxième ou une
        troisième sortie, une fois les bases acquises. Sur demande, réservation obligatoire.
      </p>
      <div className="facts">
        <p>
          <strong>Ludovic Gaboriaud, guide de haute montagne</strong> — tarif sur demande
          <br />
          <a href="tel:+33613845277">06 13 84 52 77</a>
        </p>
      </div>

      <p>
        Les horaires publiés par l'office de tourisme ne sont pas garantis et le programme
        peut changer : confirmez auprès du prestataire ou de l'office
        (<a href="tel:+33479593048">04 79 59 30 48</a>) avant de vous organiser.
      </p>

      <p>
        Voir aussi :{" "}
        <Link href="/fr/guide/domaine-skiable-albiez-secteur-mollard">
          skier à Albiez depuis le secteur Mollard
        </Link>
        , <Link href="/fr/guide/louer-ses-skis-a-albiez">louer ses skis à Albiez</Link>,{" "}
        <Link href="/fr/guide/cours-de-ski-esf-albiez">les cours de l'ESF</Link> et{" "}
        <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
