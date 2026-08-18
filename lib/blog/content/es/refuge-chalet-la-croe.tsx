import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        A 2076 metros, al pie de las Aiguilles d'Arves, el Chalet d'la Croë es un refugio de
        montaña privado renovado en 2013. Se sube para una crepe en mitad de una ruta, para una
        raclette, o para dormir en un domo bajo el cielo estrellado de los pastos de altura.
      </p>

      <h2>Dónde y cuándo</h2>
      <p>
        El refugio se encuentra en el término municipal de Albiez-Montrond, en el valle de la
        Maurienne, al pie de las{" "}
        <Link href="/es/guide/aiguilles-arves">Aiguilles d'Arves</Link>.
      </p>
      <div className="facts">
        <p>
          <strong>Le Chalet d'la Croë</strong> — refugio privado, 2076 m
          <br />
          <strong>Apertura 2026</strong>: del 18 de junio al 13 de septiembre
          <br />
          <a href="https://www.lechaletdlacroe.fr/" target="_blank" rel="noopener noreferrer">
            lechaletdlacroe.fr
          </a>
        </p>
      </div>

      <h2>Pararse a comer</h2>
      <p>
        Es la razón principal para subir si se va de excursión en el día. Una pausa de crepe o
        de raclette en mitad de una ruta cambia por completo la salida — y a esta altitud, en
        los pastos, el paisaje hace el resto.
      </p>
      <p>
        El refugio funciona <strong>de forma totalmente autónoma</strong> y esencialmente con{" "}
        <strong>productos locales caseros</strong>. Es una limitación asumida que se nota en el
        plato.
      </p>

      <h2>Dormir en un domo</h2>
      <p>
        El alojamiento se hace <strong>al aire libre, en domos</strong>, por una noche o más. Es
        la experiencia singular del lugar: una inmersión completa en el cielo estrellado de la
        montaña, sin las incomodidades del bivac.
      </p>
      <p>
        Para una ruta de varios días es una etapa que estructura el itinerario: se sube el
        primer día, se duerme en altura y se sale temprano al día siguiente.
      </p>

      <h2>El ambiente de los pastos de altura</h2>
      <p>
        El sonido de los cencerros da vida a los pastos durante el verano: es el fondo sonoro
        constante de la temporada, y la atmósfera en la que el refugio ofrece su restauración y
        su alojamiento.
      </p>

      <h2>Cómo subir</h2>
      <p>
        Al refugio se llega a pie, desde los itinerarios del sector. Las salidas clásicas pasan
        por la aldea del Chalmieu y la meseta de Montrond — el mismo sector que la subida a la
        Basse du Gerbier, descrita en nuestro artículo sobre las{" "}
        <Link href="/es/guide/aiguilles-arves">Aiguilles d'Arves</Link>.
      </p>
      <p>
        Prevea <strong>comprobar los horarios y reservar</strong> antes de subir, sobre todo
        para la noche en domo: la capacidad de un refugio privado es limitada y la apertura es
        estacional.
      </p>

      <h2>El resto de los senderos</h2>
      <p>
        Los seis itinerarios señalizados que salen del pueblo y del Mollard — más cortos, más
        accesibles — están detallados en{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">
          nuestra guía de rutas de Albiez
        </Link>
        .
      </p>
    </>
  );
}
