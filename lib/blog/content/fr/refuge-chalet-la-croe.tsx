import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        À 2 076 mètres, aux pieds des Aiguilles d'Arves, le Chalet d'la Croë est un refuge
        de montagne privé rénové en 2013. On y monte pour une crêpe au milieu d'une rando,
        pour une raclette, ou pour dormir dans un dôme sous le ciel étoilé des alpages.
      </p>

      <h2>Où et quand</h2>
      <p>
        Le refuge se trouve sur la commune d'Albiez-Montrond, dans la vallée de la
        Maurienne, au pied des{" "}
        <Link href="/fr/guide/aiguilles-arves">Aiguilles d'Arves</Link>.
      </p>
      <div className="facts">
        <p>
          <strong>Le Chalet d'la Croë</strong> — refuge privé, 2 076 m
          <br />
          <strong>Ouverture 2026</strong> : du 18 juin au 13 septembre
          <br />
          <a href="https://www.lechaletdlacroe.fr/" target="_blank" rel="noopener noreferrer">
            lechaletdlacroe.fr
          </a>
        </p>
      </div>

      <h2>S'arrêter manger</h2>
      <p>
        C'est la raison principale d'y monter quand on est en journée. Une pause crêpe ou
        raclette au milieu d'une randonnée change complètement la sortie — et à cette
        altitude, dans les alpages, le décor fait le reste.
      </p>
      <p>
        Le refuge travaille <strong>en autonomie complète</strong> et essentiellement avec
        des <strong>produits locaux faits maison</strong>. C'est une contrainte assumée qui
        se retrouve dans l'assiette.
      </p>

      <h2>Dormir dans un dôme</h2>
      <p>
        L'hébergement se fait <strong>en extérieur, dans des dômes</strong>, pour une nuit
        ou plus. C'est l'expérience à part du lieu : une immersion complète dans le ciel
        étoilé de la montagne, sans les contraintes du bivouac.
      </p>
      <p>
        Pour une rando sur plusieurs jours, c'est une étape qui structure l'itinéraire : on
        monte le premier jour, on dort en altitude, on repart tôt le lendemain.
      </p>

      <h2>L'ambiance des alpages</h2>
      <p>
        Le son des cloches fait vivre les alpages en période estivale — c'est le fond sonore
        constant de la saison, et l'atmosphère dans laquelle le refuge propose sa
        restauration et son hébergement.
      </p>

      <h2>Y monter</h2>
      <p>
        Le refuge se rejoint à pied, depuis les itinéraires du secteur. Les départs
        classiques passent par le hameau du Chalmieu et le plateau de Montrond — le même
        secteur que la montée à la Basse du Gerbier, décrite dans notre article sur les{" "}
        <Link href="/fr/guide/aiguilles-arves">Aiguilles d'Arves</Link>.
      </p>
      <p>
        Prévoyez de <strong>vérifier les horaires et de réserver</strong> avant de monter,
        surtout pour la nuit en dôme : la capacité d'un refuge privé est limitée, et
        l'ouverture reste saisonnière.
      </p>

      <h2>Le reste des sentiers</h2>
      <p>
        Les six itinéraires balisés au départ du village et du Mollard — plus courts, plus
        accessibles — sont détaillés dans{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">
          notre guide des randonnées d'Albiez
        </Link>
        .
      </p>
    </>
  );
}
