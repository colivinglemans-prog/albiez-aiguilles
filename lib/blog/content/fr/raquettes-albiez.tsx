import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Article de séjour (hiver) : il rassemble ce que les autres articles disent des raquettes
 * (randonnees-balisees-albiez, foret-du-rival, cours-de-ski-esf-albiez, motoneige-igloo-albiez,
 * louer-ses-skis-a-albiez) sans en répéter le détail. Programme ESF relevé sur
 * esfalbiez.fr/raquettes le 18 novembre 2026 : volontairement sans prix ni horaires, ils
 * changent d'une saison à l'autre.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Pas besoin de savoir skier pour profiter de la neige à Albiez. Depuis l'appartement
        du Mollard, il y a trois façons de partir en raquettes : seul sur les itinéraires
        balisés, en sortie encadrée avec l'ESF ou un accompagnateur en montagne, ou le soir,
        pour monter dîner dans un chalet d'alpage.
      </p>

      <h2>Seul, sur les itinéraires balisés</h2>
      <p>
        Trois des{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">itinéraires balisés d'Albiez</Link>{" "}
        se pratiquent en raquettes. Les durées ci-dessous sont celles de la randonnée à
        pied : dans la neige, on avance moins vite, prévoyez de la marge.
      </p>

      <h3>Le sentier de la Plaigne, au départ du Mollard</h3>
      <p>
        Le plus pratique depuis l'appartement : il part à droite du télésiège des Échaux, sur
        le parking en face du centre de vacances de la Pierre aux fées. Un aller-retour avec
        peu de dénivelé et une vue continue sur les Aiguilles d'Arves, le plateau de
        Montrond, le Mont Emy et la Grande Chible. L'itinéraire s'arrête au pied d'une croix,
        face à une table de pique-nique.
      </p>
      <p>
        <strong>N'allez pas plus loin que la croix</strong> : au-delà, les combes à traverser
        rendent le secteur potentiellement avalancheux.
      </p>
      <div className="facts">
        <p>
          <strong>Départ</strong> : télésiège des Échaux, au Mollard ·{" "}
          <strong>Durée à pied</strong> : 2 h aller-retour · <strong>Dénivelé</strong> :
          200 m · <strong>Distance</strong> : 5 km
        </p>
      </div>

      <h3>Le tour des Contamines, au Chef-lieu</h3>
      <p>
        Une boucle très plate autour de la butte des Contamines, au départ de la rue Froide,
        en face du bar tabac Constantin. C'est la plus courte et la plus facile des trois.
        L'itinéraire est partagé : on y croise l'hiver les{" "}
        <Link href="/fr/guide/chiens-de-traineau-albiez">attelages de chiens de traîneau</Link>
        , à qui l'on laisse la trace. Le Chef-lieu est plus bas que le Mollard : en début ou
        en fin de saison, la neige peut y manquer.
      </p>
      <div className="facts">
        <p>
          <strong>Départ</strong> : rue Froide, Chef-lieu · <strong>Durée à pied</strong> :
          40 min · <strong>Dénivelé</strong> : 37 m · <strong>Distance</strong> : 2,2 km
        </p>
      </div>

      <h3>Le plateau de Montrond, depuis le Chalmieu</h3>
      <p>
        La grande sortie de la semaine, et un itinéraire de raquettes et de ski nordique
        l'hiver. Le départ est au parking du hameau du Chalmieu, à 7,5 km de l'appartement
        (environ 15 minutes de voiture). Le sentier monte vers le Relai TV puis les
        Chabottes, en plein cœur d'alpage, au pied des Aiguilles d'Arves, avec des tables
        d'orientation pour identifier les sommets. Retour par le même itinéraire.
      </p>
      <div className="facts">
        <p>
          <strong>Départ</strong> : parking du hameau du Chalmieu (7,5 km) ·{" "}
          <strong>Durée à pied</strong> : 3 h 30 · <strong>Dénivelé</strong> : 424 m
        </p>
      </div>

      <h3>Et la forêt du Rival</h3>
      <p>
        La <Link href="/fr/guide/foret-du-rival">forêt du Rival</Link>, qu'on traverse en
        montant à la station, se parcourt aussi en raquettes l'hiver, à condition de rester
        sur les itinéraires balisés.
      </p>
      <p>
        L'office de tourisme, au Chef-lieu, vend des topo-guides du secteur
        d'Albiez-Montrond et d'Albiez-le-Jeune. C'est aussi là qu'il faut demander l'état des
        itinéraires avant de partir.
      </p>

      <h2>En sortie encadrée</h2>

      <h3>Avec l'ESF</h3>
      <p>
        L'
        <Link href="/fr/guide/cours-de-ski-esf-albiez">École du Ski Français d'Albiez</Link>{" "}
        n'encadre pas que du ski : elle propose aussi des sorties raquettes, menées par un
        moniteur qui connaît les panoramas et la faune du coin. Son site affichait, en novembre
        2026 :
      </p>
      <ul>
        <li>
          des <strong>sorties à thème</strong> chaque semaine — en forêt, panorama et faune,
          sortie gourmande avec goûter — la plupart au rendez-vous de l'ESF du Mollard, à
          250 m de l'appartement, avec un minimum de cinq participants ;
        </li>
        <li>
          une <strong>sortie à la carte</strong>, tous les jours, le matin ou l'après-midi, à
          partir de quatre personnes : de quoi partir en famille ou entre amis, au rythme du
          groupe.
        </li>
      </ul>
      <p>
        Deux points à savoir : <strong>la location des raquettes n'est pas comprise</strong>,
        et la sortie panorama s'appuie sur les remontées, ce qui demande un forfait (sauf à
        monter à pied). Le programme, les jours et les horaires de la saison sont à vérifier
        sur{" "}
        <a href={PROPERTY.links.esf + "raquettes/"} target="_blank" rel="noopener noreferrer">
          esfalbiez.fr/raquettes
        </a>
        .
      </p>

      <h3>Avec un accompagnateur en montagne</h3>
      <p>
        Yves Vionnet, accompagnateur en montagne installé à Albiez, propose des randonnées
        guidées en raquettes sur Albiez et ailleurs, autour de la faune, de la flore et du
        patrimoine. Il travaille <strong>toute l'année</strong>, hors saison comprise :
        c'est la façon la plus sûre de sortir des itinéraires du village quand les
        conditions changent d'un jour à l'autre.
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

      <h3>Le soir : la soirée trappeur de Mustang</h3>
      <p>
        Les mercredis et jeudis soirs, Mustang emmène des petits groupes de Montrond au
        chalet d'alpage de la Broue (1 800 m) : environ 45 minutes de montée en raquettes
        avec un accompagnateur en montagne, apéritif dînatoire autour des braseros, puis
        descente en luge à la frontale. Dès 8 ans. Le détail est dans notre article sur la{" "}
        <Link href="/fr/guide/motoneige-igloo-albiez">motoneige et les soirées igloo</Link>.
      </p>

      <h2>Louer des raquettes</h2>
      <p>
        Au front de neige du Mollard, à 250 m, <strong>Sport 2000 Aux Deux Frères</strong>{" "}
        — le loueur chez qui nous louons notre propre matériel — a les raquettes à son
        catalogue, ainsi que des porte-bébés. Pour les autres magasins de la station,
        demandez sur place. Comme pour les skis, réserver en ligne avant l'arrivée revient
        moins cher : tout est dans notre article{" "}
        <Link href="/fr/guide/louer-ses-skis-a-albiez">louer ses skis à Albiez</Link>.
      </p>
      <p>
        Au retour, raquettes et bâtons se rangent dans le{" "}
        <strong>casier à skis privatif, sur le palier</strong>, juste à côté de la porte de
        l'appartement.
      </p>

      <h2>Les règles de prudence</h2>
      <ul>
        <li>
          <strong>Restez sur les itinéraires balisés</strong>, et arrêtez-vous à leur
          terminus : celui de la Plaigne n'est pas là par hasard.
        </li>
        <li>
          <strong>Renseignez-vous avant de partir</strong> à l'office de tourisme sur l'état
          des itinéraires, et partez avec un professionnel si vous voulez sortir des sentiers
          du village.
        </li>
        <li>
          <strong>Partagez la trace</strong> : chiens de traîneau aux Contamines, skieurs
          nordiques au Chalmieu.
        </li>
        <li>
          Pour comprendre le risque d'avalanche, l'ESF propose une{" "}
          <strong>initiation à la détection de victimes d'avalanche (DVA)</strong> : une
          heure qui change le regard sur la montagne.
        </li>
      </ul>

      <h2>Avec des enfants</h2>
      <p>
        Le tour des Contamines, plat et court, est le meilleur premier essai. Pour une
        sortie à la carte avec l'ESF, le groupe familial suffit dès quatre personnes. La
        soirée trappeur est ouverte dès 8 ans. Et si les jambes fatiguent, les luges
        d'enfants (luge bébé comprise) attendent dans le casier à skis, à deux pas de la
        piste de luge du Mollard. Toutes les idées pour les plus petits sont dans{" "}
        <Link href="/fr/guide/albiez-en-famille">Albiez-Montrond en famille</Link>.
      </p>

      <p>
        Voir aussi :{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">les randonnées balisées</Link>,{" "}
        <Link href="/fr/guide/ski-de-randonnee-albiez-debutant">
          débuter le ski de randonnée
        </Link>{" "}
        et <Link href="/fr/ski">la page hiver du logement</Link>.
      </p>
    </>
  );
}
