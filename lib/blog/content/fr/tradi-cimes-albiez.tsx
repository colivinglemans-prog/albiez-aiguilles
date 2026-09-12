import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Tradi'Cimes est la fête du village, début août, et elle est gratuite. Deux jours de
        musiques et de danses traditionnelles, de métiers d'artisanat et de démonstrations
        agricoles, répartis sur <strong>deux lieux</strong> : la place Opinel au Chef-lieu,
        et le plan d'eau du Mollard. C'est la seconde moitié d'un mois de juillet-août qui
        en compte deux — <Link href="/fr/guide/celti-cimes-festival-albiez">Celti'Cimes</Link>{" "}
        se tient quinze jours plus tôt, dans le même village.
      </p>

      <h2>Deux jours, deux lieux</h2>
      <p>
        <strong>Le samedi, au plan d'eau du col du Mollard</strong> — à 300 mètres de
        l'appartement. C'est la journée festive : animations, barbecue, buvette et musique
        autour de l'eau, avec la baignade et la pataugeoire ouvertes et les Aiguilles
        d'Arves en face. On y va à pied depuis chez nous, et l'on remonte quand on veut.
      </p>
      <p>
        <strong>Le dimanche, place Opinel</strong>, au Chef-lieu — le carrefour des routes
        de Saint-Jean-de-Maurienne, d'Albiez-le-Jeune et du Mollard. C'est la journée
        traditionnelle, de 9 h à 18 h : danses folkloriques, ateliers artisanaux et
        fabrication du Beaufort.
      </p>

      <h2>Le programme</h2>

      <h3>Le marché artisanal</h3>
      <p>
        Des métiers, pas des stands de revente : savonnerie, produits aromatiques,
        torréfaction de café, sculpture sur bois, bijoux, poterie, miels. S'y ajoute un{" "}
        <strong>concours de sculpture sur bois en bas-relief</strong>, qu'on peut regarder
        avancer au fil de la journée.
      </p>

      <h3>Les démonstrations agricoles</h3>
      <p>
        C'est ce qui distingue Tradi'Cimes d'un marché de pays : la traite, les chiens de
        berger au travail, la présentation des bovins, les engins agricoles. De la montagne
        qui travaille, montrée par ceux qui y travaillent.
      </p>
      <p>
        Et <strong>la fabrication du Beaufort</strong>, faite devant vous — le geste qu'on
        ne voit d'ordinaire qu'à travers la vitre de la{" "}
        <Link href="/fr/guide/fromagerie-cooperative-beaufort-des-arves">
          coopérative laitière
        </Link>
        .
      </p>

      <h3>Musiques et danses</h3>
      <p>
        Danses folkloriques et musique traditionnelle — le répertoire alpin plutôt
        qu'irlandais, c'est la différence avec Celti'Cimes. Buvette et petite restauration
        sur place.
      </p>

      <h3>Pour les enfants</h3>
      <p>
        Des animations autour du bois, dans le prolongement du concours de sculpture. Le
        format se prête bien aux jeunes enfants : on entre, on sort, rien n'est payant.
      </p>

      <div className="facts">
        <p>
          <strong>Quand</strong> : deux jours début août — après-midi et soirée le samedi,
          dimanche de 9 h à 18 h
          <br />
          <strong>Où</strong> : le samedi au plan d'eau du col du Mollard, le dimanche
          place Opinel au Chef-lieu
          <br />
          <strong>Tarif</strong> : accès libre
          <br />
          <strong>Sur place</strong> : buvette, petite restauration, WC publics, parking
          gratuit
          <br />
          <strong>Accessibilité</strong> : accessible en fauteuil roulant
          <br />
          <strong>Animaux</strong> : acceptés, tenus en laisse
          <br />
          <strong>Contact</strong> : 06 72 08 37 88 — tradicimesalbiezmontrond@gmail.com
        </p>
      </div>

      <h2>Deux festivals en quinze jours</h2>
      <p>
        C'est une particularité d'Albiez qu'on ne soupçonne pas en regardant la taille du
        village : deux festivals en quinze jours, fin juillet et début août, tous deux sur
        la commune. <Link href="/fr/guide/celti-cimes-festival-albiez">Celti'Cimes</Link>{" "}
        est un festival de musique irlandaise avec stages d'instruments ; Tradi'Cimes est la
        fête du pays, gratuite et sans inscription.
      </p>
      <p>
        Pour qui pose ses dates sur ces deux semaines-là, il y a de quoi occuper deux
        soirées par semaine sans quitter la commune — ce qui, dans une station de cette
        taille, ne va pas de soi.
      </p>

      <h2>Prolonger la journée</h2>
      <p>
        Les savoir-faire montrés place Opinel se visitent aussi le reste de l'année. À
        vingt minutes, la{" "}
        <Link href="/fr/guide/fromagerie-cooperative-beaufort-des-arves">
          coopérative laitière de la Vallée des Arves
        </Link>{" "}
        fabrique le Beaufort et se visite. Au village, la{" "}
        <Link href="/fr/guide/boulangerie-moulin-valentin-albiez">
          boulangerie du Moulin Valentin
        </Link>{" "}
        et les{" "}
        <Link href="/fr/guide/faire-ses-courses-a-albiez">commerces d'Albiez</Link>.
      </p>
      <p>
        Et pour le reste de la semaine, les{" "}
        <Link href="/fr/guide/randonnees-balisees-albiez">six randonnées balisées</Link> au
        départ du village, ou la <Link href="/fr/ete">page été</Link> dans son ensemble.
      </p>
    </>
  );
}
