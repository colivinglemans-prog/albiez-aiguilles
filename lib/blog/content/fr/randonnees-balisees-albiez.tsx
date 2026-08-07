import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond a la bonne idée d'avoir balisé ses itinéraires et de les avoir
        répartis sur tous les niveaux. Six d'entre eux partent du village, du Mollard ou
        d'un parking à quelques minutes de voiture. Voici les six, du plus court au plus
        long, avec ce qu'il faut savoir avant de mettre les chaussures.
      </p>

      <h2>1. La croix du Châtel — 30 minutes de montée</h2>
      <p>
        C'est la balade qui commence littéralement derrière la résidence. La croix du
        Châtel culmine à <strong>1 754 m</strong>, soit 124 m au-dessus du parking
        (1 630 m), et se gagne en une demi-heure de montée.
      </p>
      <p>
        Depuis le parking, suivez le chemin du Châtel jusqu'à son extrémité : il tourne
        vers la droite et continue dans le flanc de la petite montagne. Au bout de la
        petite route, prenez le sentier de droite qui monte jusqu'à la croix.
      </p>
      <div className="facts">
        <p>
          <strong>Départ</strong> : chemin du Châtel, au Mollard · <strong>Durée</strong>{" "}
          : 30 min de montée · <strong>Dénivelé</strong> : 124 m
        </p>
      </div>

      <h2>2. Le tour des Contamines — 40 minutes</h2>
      <p>
        Une boucle très plate au départ du Chef-lieu, qui suffit à sortir du centre du
        village et à ouvrir le paysage. Le départ se prend rue Froide, en face du bar
        tabac Constantin ; prenez la rue jusqu'à l'intersection, puis à droite, et suivez
        le sentier qui fait le tour de la butte des Contamines.
      </p>
      <p>
        Attention, <strong>l'itinéraire est partagé</strong> : on y croise des vélos et,
        l'hiver, des attelages de chiens de traîneaux. Restez attentif et laissez passer.
      </p>
      <div className="facts">
        <p>
          <strong>Départ</strong> : rue Froide, Chef-lieu · <strong>Durée</strong> :
          40 min · <strong>Dénivelé</strong> : 37 m · <strong>Distance</strong> : 2,2 km
        </p>
      </div>

      <h2>3. La boucle du plan d'eau du Mollard — 30 minutes</h2>
      <p>
        Boucle familiale autour du plan d'eau, très bien exposée, au départ direct du
        logement. Elle offre une vue dégagée sur les{" "}
        <Link href="/fr/guide/aiguilles-arves">Aiguilles d'Arves</Link>, le glacier de
        l'Étendard et la vallée de l'Arvan, pour à peine 30 minutes de marche et presque
        aucun dénivelé.
      </p>
      <p>
        Le plan d'eau a deux vies : réserve d'eau pour la neige de culture l'hiver,{" "}
        <Link href="/fr/guide/lac-du-mollard-baignade">base de baignade l'été</Link>.
      </p>

      <h2>4. Le sentier de la Plaigne — 2 heures</h2>
      <p>
        Un aller-retour facile qui part à droite du télésiège des Échaux, au Mollard, sur
        le parking en face du centre de vacances de la Pierre aux fées. Peu de dénivelé,
        et une vue continue sur les Aiguilles d'Arves, le plateau de Montrond, le Mont Emy
        et la Grande Chible.
      </p>
      <ol>
        <li>
          Suivez la piste jusqu'à l'intersection avec le sentier qui rejoint le restaurant
          d'altitude le Trapanel, puis continuez tout droit sur le sentier de la Plaigne.
        </li>
        <li>
          Sillonnez plusieurs combes jusqu'au pied d'une croix, avec une table de
          pique-nique en face : l'itinéraire s'arrête là.
        </li>
        <li>Retour par le même chemin.</li>
      </ol>
      <p>
        <strong>Sécurité</strong> : il est déconseillé de s'aventurer au-delà du terminus.
        Les combes à traverser rendent le secteur potentiellement avalancheux.
      </p>
      <div className="facts">
        <p>
          <strong>Départ</strong> : télésiège des Échaux, au Mollard ·{" "}
          <strong>Durée</strong> : 2 h · <strong>Dénivelé</strong> : 200 m ·{" "}
          <strong>Distance</strong> : 5 km
        </p>
      </div>

      <h2>5. Le tour de la Cochette — 3 heures</h2>
      <p>
        Une boucle de 8 km au départ du Chef-lieu, avec vue sur les crêtes de Lâcha, le
        village d'Albiez-le-Jeune et les cheminées de fées. C'est aussi la plus riche des
        six sur le plan du patrimoine : on traverse un étage montagnard où chaque coin de
        terre était autrefois cultivé — orge, seigle, pomme de terre, lin, betterave — et
        où les <em>broues</em>, ces talus de terrasses souvent bordés d'érables, marquaient
        les limites de parcelles.
      </p>
      <ol>
        <li>Depuis le Chef-lieu, prenez la RD80 en direction d'Albiez-le-Jeune sur 100 m.</li>
        <li>Quittez la RD80 par une route sur la gauche.</li>
        <li>Au croisement, à droite direction Les Crozets, jusqu'au carrefour La Côte.</li>
        <li>À gauche, le chemin descend jusqu'au carrefour du Bois du Nez.</li>
        <li>
          Tout droit sur le chemin enherbé qui mène au hameau de La Cochette — la vue sur
          Le Moine de Champlan revient à plusieurs reprises.
        </li>
        <li>De La Cochette, suivez la direction Le Villard Sambuis.</li>
        <li>
          100 m de route, puis le chemin sur la gauche. À Villard Sambuis, contournez le
          petit mont, revenez vers La Cochette et rejoignez le carrefour Les Crozets.
        </li>
        <li>Retour au village par le chemin de l'aller.</li>
      </ol>
      <div className="facts">
        <p>
          <strong>Départ</strong> : Chef-lieu d'Albiez-Montrond · <strong>Durée</strong> :
          3 h · <strong>Dénivelé</strong> : 245 m · <strong>Distance</strong> : 8 km
        </p>
      </div>

      <h2>6. Le plateau de Montrond depuis le Chalmieu — 3 h 30</h2>
      <p>
        Le plus long des six, et le seul qui demande de prendre la voiture : 7,5 km depuis
        le logement, environ 15 minutes. C'est aussi un itinéraire de{" "}
        <strong>raquettes et de ski nordique</strong> l'hiver.
      </p>
      <p>
        Depuis le parking du hameau du Chalmieu, repérez le panneau de départ violet. Le
        sentier monte en direction du « Relai TV », alternant portions de sentier et courts
        passages sur la route (10 m à chaque fois) : Combet du dessus, l'Oratoire, Ordière
        dessous puis Ordière dessus, la fontaine de l'Âne. Au Relai TV, suivez la piste
        vers les Chabottes, où la promenade confort fait une boucle. Le retour se fait par
        le même itinéraire.
      </p>
      <p>
        Des tables d'orientation sur place permettent d'identifier les sommets. Le sentier
        serpente en plein cœur d'alpage, au pied des Aiguilles d'Arves.
      </p>
      <div className="facts">
        <p>
          <strong>Départ</strong> : parking du hameau du Chalmieu (7,5 km) ·{" "}
          <strong>Durée</strong> : 3 h 30 · <strong>Dénivelé</strong> : 424 m
        </p>
      </div>

      <h2>Marcher accompagné</h2>
      <p>
        Yves Vionnet, accompagnateur en montagne installé à Albiez, propose des randonnées
        guidées sur Albiez, en Vanoise et ailleurs — au printemps comme en automne, en été
        comme en hiver, en raquettes ou non. C'est la bonne option pour la faune, la flore
        et l'histoire des lieux, qu'un topo-guide ne raconte pas.
      </p>
      <p>
        Surtout, <strong>il est actif toute l'année, hors saison comprise</strong>. C'est
        une exception dans la station : quand les remontées sont fermées et qu'une partie
        des commerces baisse le rideau, en avril ou en octobre, il reste une façon
        d'occuper une journée de montagne.
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
        L'office de tourisme d'Albiez-Montrond, au Chef-lieu, vend par ailleurs des
        topo-guides couvrant quatre secteurs, dont celui d'Albiez-Montrond et
        Albiez-le-Jeune.
      </p>

      <h2>Et l'hiver ?</h2>
      <p>
        Trois de ces itinéraires (Contamines, la Plaigne, le Chalmieu) sont praticables en
        raquettes. Pour le reste de la saison froide, tout se passe sur{" "}
        <Link href="/fr/ski">le domaine skiable</Link>, à 250 m du logement.
      </p>
    </>
  );
}
