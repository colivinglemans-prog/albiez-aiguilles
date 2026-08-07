import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        L'École du Ski Français d'Albiez-Montrond couvre tous les âges, du club Piou-Piou
        dès 3 ans et demi aux cours adultes. Un détail compte plus que tous les autres au
        moment de réserver : la station a{" "}
        <strong>deux points de rassemblement</strong>, et depuis le Mollard, c'est celui du
        Mollard qu'il faut choisir.
      </p>

      <h2>Le piège du point de rendez-vous</h2>
      <p>
        L'ESF d'Albiez rassemble ses cours sur deux secteurs. Si vous logez au Mollard —
        c'est le cas de notre appartement, à 250 m du front de neige — il faut
        impérativement sélectionner le <strong>rassemblement ESF Mollard</strong> lors de
        la réservation. Se tromper, c'est commencer chaque matin par un trajet en voiture
        avec des enfants en chaussures de ski. Le genre d'erreur qui coûte une semaine.
      </p>
      <p>
        Cela dit, un Mollard complet n'est pas une impasse :{" "}
        <strong>le secteur du Chef-lieu est accessible à ski</strong>. Si votre niveau le
        permet, prenez le télésiège des Échaux et redescendez sur le Chef-lieu — vous serez
        échauffé avant même le début du cours, ce qui n'est pas le cas de ceux qui arrivent
        en voiture.
      </p>
      <p>
        La réserve est de taille : cela suppose de savoir déjà descendre. Pour un enfant du
        club Piou-Piou ou un débutant complet, le rendez-vous du Mollard reste le seul
        confortable — et la voiture, le seul repli.
      </p>

      <h2>Les formules par âge</h2>

      <h3>Club Piou-Piou — dès 3 ans et demi</h3>
      <p>
        Le jardin des neiges accueille les enfants à partir de 3 ans et demi, 4 ans ou
        5 ans selon la formule. Une <strong>garderie</strong> peut être ajoutée, ce qui
        allonge utilement la plage de prise en charge au-delà du seul cours.
      </p>

      <h3>Cours enfants — 6 à 12 ans</h3>
      <p>
        La formule classique, elle aussi avec possibilité de garderie complémentaire.
        C'est l'âge où le{" "}
        <Link href="/fr/guide/domaine-skiable-albiez-secteur-mollard">
          téléski Polytre
        </Link>{" "}
        prend tout son sens : plusieurs endroits où lâcher la perche, avec des difficultés
        croissantes.
      </p>

      <h3>Cours ados et jeunes — dès 12 ans</h3>
      <p>Groupes séparés, ce qui évite de mélanger un ado avec des enfants de 7 ans.</p>

      <h3>Cours adultes</h3>
      <p>Collectifs ou particuliers, pour reprendre ou pour progresser.</p>

      <h2>Au-delà du ski alpin</h2>
      <p>L'ESF d'Albiez encadre aussi des activités qu'on n'attend pas d'une école de ski :</p>
      <ul>
        <li>
          <strong>Ski assis</strong>
        </li>
        <li>
          <strong>Raquettes</strong>
        </li>
        <li>
          <strong>Snake-gliss</strong> (descente en luges attelées)
        </li>
        <li>
          <strong>Initiation au biathlon</strong>
        </li>
        <li>
          <strong>Initiation à la détection de victimes d'avalanche (DVA)</strong> — une
          heure qui change le regard sur la montagne, même quand on ne sort jamais des
          pistes
        </li>
        <li>
          <strong>Descente aux flambeaux</strong>, notamment lors de l'
          <Link href="/fr/guide/albiez-c-show">Albiez C'Show</Link>
        </li>
      </ul>

      <h2>Réserver, et quand</h2>
      <p>
        Il faut réserver les cours ESF <strong>en avance</strong>, pour deux raisons : la
        place, et surtout l'horaire. Les créneaux du matin partent en premier, et un cours
        de fin d'après-midi avec un enfant de 5 ans fatigué n'a pas le même rendement.
      </p>
      <p>
        Les forfaits peuvent être pris <strong>en même temps que les cours</strong>, ce qui
        évite une file supplémentaire le premier jour. Autre option : les commander en
        ligne et les recevoir par la poste avant le départ.
      </p>

      <div className="facts">
        <p>
          <strong>ESF Albiez-Montrond</strong> — rassemblement Mollard, à 250 m du
          logement.{" "}
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
        </p>
      </div>

      <h2>Et la garde des plus petits ?</h2>
      <p>
        En dehors de la garderie ESF, la station dispose d'un centre de loisirs et d'une
        halte-garderie — de quoi couvrir les enfants trop jeunes pour skier. Le détail est
        dans notre article{" "}
        <Link href="/fr/guide/albiez-en-famille">Albiez-Montrond en famille</Link>.
      </p>
    </>
  );
}
