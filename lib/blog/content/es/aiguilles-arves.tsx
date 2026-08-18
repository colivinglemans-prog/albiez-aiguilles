import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Tres agujas de roca a 3514 metros, que dominan el valle del Arvan y que se ven desde el
        balcón del alojamiento: las Aiguilles d'Arves son el emblema de la Maurienne. El alpinista
        inglés Coolidge, que hizo oficialmente la primera ascensión en 1878, veía en ellas «la
        trilogía más bella de los Alpes».
      </p>

      <h2>Lo que se mira exactamente</h2>
      <p>
        Las Aiguilles d'Arves son tres cumbres alineadas que culminan a{" "}
        <strong>3514 m</strong>. Dominan el valle del Arvan y se ven desde buena parte del sector:
        el balcón, el{" "}
        <Link href="/es/guide/lac-du-mollard-baignade">lago del Mollard</Link>, el{" "}
        <Link href="/es/guide/col-du-mollard-velo">col du Mollard</Link> y la mayoría de los{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">senderos señalizados</Link> del municipio.
      </p>
      <p>
        Son una referencia práctica tanto como un decorado: cuando se tienen de frente, se sabe dónde
        se está.
      </p>

      <h2>Acercarse con calma: la Promenade Savoyarde de Découverte</h2>
      <p>
        La <strong>PSD de las Aiguilles d'Arves</strong> es la forma más accesible de acercarse. Está
        clasificada como fácil, dura <strong>de 1 h 30 a 2 h</strong> y es{" "}
        <strong>accesible con carrito y para personas con movilidad reducida</strong>, algo poco
        frecuente a esta altitud.
      </p>
      <p>
        El recorrido está jalonado de hitos interactivos que cuentan los pastos de altura y la vida de
        quienes trabajan en ellos. Es un paseo de descubrimiento, no una prueba de rendimiento.
      </p>

      <h2>Acercarse en serio: la Basse du Gerbier</h2>
      <p>
        Para llegar al pie de las Aiguilles, el itinerario de verano sale del{" "}
        <strong>aparcamiento del repetidor de televisión</strong>, en la aldea del Chalmieu (1900 m),
        en Albiez-Montrond. Hay que contar <strong>+700 m de desnivel</strong> para alcanzar la{" "}
        <strong>Basse du Gerbier</strong>, a 2578 m.
      </p>
      <p>
        Esto ya no es un paseo: botas de montaña, agua, cortavientos, y una salida bastante temprana
        para evitar las tormentas de final de tarde.
      </p>
      <div className="facts">
        <p>
          <strong>Promenade Savoyarde de Découverte</strong>: fácil, de 1 h 30 a 2 h, accesible con
          carrito y para personas con movilidad reducida.
          <br />
          <strong>Basse du Gerbier</strong>: salida del aparcamiento del repetidor de televisión,
          aldea del Chalmieu (1900 m), +700 m hasta los 2578 m.
        </p>
      </div>

      <h2>Verlas sin caminar</h2>
      <p>Tres miradores no exigen ningún esfuerzo particular:</p>
      <ul>
        <li>
          <strong>El balcón del alojamiento</strong>, orientado al suroeste, frente a las Aiguilles.
        </li>
        <li>
          <strong>El col du Mollard</strong> (1638 m), que ofrece un panorama sobre el macizo
          Arvan-Villards y Les Sybelles: Albiez, los pastos, Albiez-le-Jeune, el Mont Emy, las
          Aiguilles d'Arves, el glaciar de l'Étendard, la combe Genin y las estaciones de Le Corbier y
          La Toussuire.
        </li>
        <li>
          <strong>La vuelta al lago</strong>, 30 minutos a pie desde el apartamento, con las Aiguilles
          y el glaciar de l'Étendard al fondo.
        </li>
      </ul>

      <h2>Dormir a sus pies</h2>
      <p>
        El{" "}
        <Link href="/es/guide/refuge-chalet-la-croe">Chalet d'la Croë</Link>, refugio privado a
        2076 m, se encuentra al pie de las Aiguilles. Restauración de día, alojamiento en domos para
        la noche.
      </p>

      <p>
        La vista desde el alojamiento está detallada en{" "}
        <Link href="/es/verano">la página de verano</Link> y{" "}
        <Link href="/es/esqui">la página de invierno</Link>.
      </p>
    </>
  );
}
