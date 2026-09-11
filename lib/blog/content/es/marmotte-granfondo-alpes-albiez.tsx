import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        La Marmotte Granfondo Alpes se corre el 27 de junio de 2027, de Bourg-d'Oisans a
        Alpe d'Huez por el Glandon, el Télégraphe y el Galibier. Siete mil quinientos
        dorsales, con tope, de los cuales más del 88 % van a ciclistas extranjeros — y se
        agotan en menos de un día. Si lee esto antes de octubre de 2026, va con ventaja: es
        cuando abren las inscripciones.
      </p>

      <h2>Las fechas que cuentan</h2>
      <div className="facts">
        <p>
          <strong>Prueba</strong>: domingo 27 de junio de 2027
          <br />
          <strong>Salida</strong>: Le Bourg-d'Oisans — <strong>llegada</strong>: Alpe
          d'Huez
          <br />
          <strong>Puertos</strong>: Glandon, Télégraphe, Galibier y la subida final
          <br />
          <strong>Participantes</strong>: 7 500 como máximo, más del 88 % internacionales
          <br />
          <strong>Inscripciones</strong>: apertura prevista a principios de octubre de 2026,
          agotadas en menos de un día
        </p>
      </div>

      <h2>Albiez como campo base: la versión honesta</h2>
      <p>
        Digámoslo de entrada, porque es lo que decide:{" "}
        <strong>la mañana de la carrera, Albiez no es el sitio donde dormir.</strong>{" "}
        Bourg-d'Oisans está al otro lado de la Croix de Fer, a una hora y cuarto o una hora
        y media de coche por el puerto —solo en verano, y no a las cinco de la mañana de un
        día de prueba.
      </p>
      <p>
        Para lo que Albiez sirve es para <strong>la semana anterior</strong>. El
        reconocimiento, la aclimatación a la altitud, las piernas que se preparan sin
        arruinarse: tres de las cuatro dificultades del recorrido se reconocen desde aquí, y
        las dos primeras sin siquiera bajar a un valle.
      </p>

      <h2>Reconocer el recorrido desde Albiez</h2>

      <h3>El Glandon, vertiente Maurienne</h3>
      <p>
        El día de la carrera el Glandon se sube desde el Oisans y se baja hacia la
        Maurienne. Desde Albiez, por tanto, lo que reconoce es <strong>la bajada</strong>,
        la que está neutralizada en el crono y donde más gente se deja ir. Llegar a ella no
        obliga a bajar al valle: se pasa por Montrond, Entraigues y La Villette para
        enlazar con la D926.
      </p>

      <h3>El Télégraphe y el Galibier</h3>
      <p>
        Las dos verdaderas dificultades cronometradas, y están en su valle. Desde Albiez se
        baja a Saint-Jean-de-Maurienne —unos veinte minutos— y se remonta hasta
        Saint-Michel-de-Maurienne para atacar el Télégraphe. El Galibier encadena detrás. Es
        la salida que más se parece a lo que hará el día señalado.
      </p>

      <h3>Alpe d'Huez</h3>
      <p>
        La única que no reconocerá desde aquí sin ir a propósito. Se guarda para el día de
        la carrera, o para una jornada entera dedicada al Oisans.
      </p>

      <h2>Dormir a 1 600 metros durante la preparación</h2>
      <p>
        La altitud a la que se duerme no es un detalle de confort cuando se prepara una
        prueba que pasa dos veces por encima de los 2 000 metros. Albiez-Montrond está a
        1 600 m, y es la altitud a la que duerme, no solo aquella a la que pedalea.
      </p>
      <p>
        A eso se añade lo prosaico: una cocina equipada, para comer lo que se quiere a la
        hora que se quiere en lugar de esperar un servicio; un balcón orientado al sur que
        seca un maillot en una hora; y la calma de un pueblo de 300 habitantes la semana en
        que Bourg-d'Oisans se llena.
      </p>
      <p>
        Un punto que conviene anticipar, porque es concreto:{" "}
        <strong>el guardaesquís no está dimensionado para una bicicleta</strong>. Dos
        soluciones in situ: atarla en el rellano, que está cubierto y protegido, o meterla
        en el balcón. Cuente unos cincuenta escalones desde el aparcamiento.
      </p>

      <h2>Y si no tiene dorsal</h2>
      <p>
        Las 7 500 plazas vuelan, y muchos ciclistas vienen igualmente a rodar esos puertos
        esa misma semana, sin placa. Las carreteras son las mismas, los paisajes también, y
        la Maurienne cierra con regularidad ciertos puertos al coche durante una mañana.
        Todo está en nuestro artículo{" "}
        <Link href="/es/guide/albiez-camp-de-base-grands-cols">
          Albiez, campo base de los grandes puertos
        </Link>
        , con el col du Mollard que está, por cierto, a la salida del caserío — ver{" "}
        <Link href="/es/guide/col-du-mollard-velo">el col du Mollard en bici</Link>.
      </p>
      <p>
        El resto de lo que ofrece la estación en verano está en nuestra{" "}
        <Link href="/es/verano">página de verano</Link>.
      </p>
    </>
  );
}
