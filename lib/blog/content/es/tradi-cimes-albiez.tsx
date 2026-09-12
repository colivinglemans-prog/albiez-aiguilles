import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Tradi'Cimes es la fiesta del pueblo, a principios de agosto, y es gratuita. Dos días
        de músicas y danzas tradicionales, oficios artesanos y demostraciones agrícolas,
        repartidos entre <strong>dos lugares</strong>: la plaza Opinel, en el Chef-lieu, y
        el lago del Mollard. Es la segunda mitad de una quincena que reúne dos festivales:{" "}
        <Link href="/es/guide/celti-cimes-festival-albiez">Celti'Cimes</Link> se celebra
        quince días antes, en el mismo pueblo.
      </p>

      <h2>Dos lugares, dos ambientes</h2>
      <p>
        <strong>La plaza Opinel</strong>, en el Chef-lieu, es el cruce de las carreteras de
        Saint-Jean-de-Maurienne, Albiez-le-Jeune y Le Mollard. Ahí transcurre el domingo, de
        9 a 18 h: el mercado, las demostraciones, los bailes.
      </p>
      <p>
        <strong>El lago del Mollard</strong>, a 300 metros del apartamento, acoge la otra
        vertiente de la fiesta, la musical, sobre la hierba y frente a las Aiguilles
        d'Arves. Se va andando desde nuestra puerta, y se vuelve cuando se quiere.
      </p>

      <h2>El programa</h2>

      <h3>El mercado artesanal</h3>
      <p>
        Oficios, no puestos de reventa: jabonería, productos aromáticos, tueste de café,
        talla de madera, joyería, cerámica, mieles. A ello se suma un{" "}
        <strong>concurso de talla en bajorrelieve</strong>, cuyo avance puede seguirse a lo
        largo del día.
      </p>

      <h3>Las demostraciones agrícolas</h3>
      <p>
        Es lo que distingue a Tradi'Cimes de un mercado rural: el ordeño, los perros
        pastores trabajando, la presentación del ganado, la maquinaria agrícola. La montaña
        que trabaja, mostrada por quienes trabajan en ella.
      </p>

      <h3>Músicas y danzas</h3>
      <p>
        Bailes folclóricos y música tradicional: el repertorio alpino en lugar del irlandés,
        y ahí está la diferencia con Celti'Cimes. Bar y comida ligera in situ.
      </p>

      <h3>Para los niños</h3>
      <p>
        Actividades en torno a la madera, en prolongación del concurso de talla. El formato
        va bien con los niños pequeños: se entra, se sale, y nada es de pago.
      </p>

      <div className="facts">
        <p>
          <strong>Cuándo</strong>: dos días a principios de agosto — tarde y noche el
          sábado, domingo de 9 a 18 h
          <br />
          <strong>Dónde</strong>: plaza Opinel, en el Chef-lieu, y el lago del Mollard
          <br />
          <strong>Precio</strong>: acceso libre
          <br />
          <strong>In situ</strong>: bar, comida ligera, aseos públicos, aparcamiento
          gratuito
          <br />
          <strong>Accesibilidad</strong>: accesible en silla de ruedas
          <br />
          <strong>Animales</strong>: admitidos, con correa
          <br />
          <strong>Contacto</strong>: +33 6 72 08 37 88 — tradicimesalbiezmontrond@gmail.com
        </p>
      </div>

      <h2>Dos festivales en quince días</h2>
      <p>
        Es una particularidad de Albiez que no se adivina mirando el tamaño del pueblo: dos
        festivales en quince días, a finales de julio y principios de agosto, ambos en el
        municipio. <Link href="/es/guide/celti-cimes-festival-albiez">Celti'Cimes</Link> es
        un festival de música irlandesa con cursos de instrumento; Tradi'Cimes es la fiesta
        del lugar, gratuita y sin inscripción.
      </p>
      <p>
        Para quien sitúe sus fechas en esas dos semanas, hay con qué llenar dos veladas por
        semana sin salir del municipio, lo que en una estación de este tamaño no es
        evidente.
      </p>

      <h2>Prolongar la jornada</h2>
      <p>
        Los saberes mostrados en la plaza Opinel también se visitan el resto del año. A
        veinte minutos, la{" "}
        <Link href="/es/guide/fromagerie-cooperative-beaufort-des-arves">
          cooperativa lechera del Valle de los Arves
        </Link>{" "}
        fabrica el Beaufort y puede visitarse. En el pueblo, la{" "}
        <Link href="/es/guide/boulangerie-moulin-valentin-albiez">
          panadería del Moulin Valentin
        </Link>{" "}
        y los{" "}
        <Link href="/es/guide/faire-ses-courses-a-albiez">comercios de Albiez</Link>.
      </p>
      <p>
        Y para el resto de la semana, las{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">seis rutas señalizadas</Link> que
        salen del pueblo, o la <Link href="/es/verano">página de verano</Link> en su
        conjunto.
      </p>
    </>
  );
}
