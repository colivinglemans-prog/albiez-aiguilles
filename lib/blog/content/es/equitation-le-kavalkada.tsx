import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        A 300 metros del alojamiento, Le Kavalkada propone descubrir la montaña a caballo o en poni:
        bosques, pastos de altura, praderas. Paseos, clases en pista, cursos por semanas — dirigidos por
        monitores titulados por el Estado.
      </p>

      <h2>Las opciones</h2>

      <h3>Para los más pequeños — 30 min o 1 h</h3>
      <p>
        Paseos en poni de media hora o de una hora <strong>alrededor del Châtel</strong>, es decir, justo
        por encima del alojamiento. Formato ideal para un primer contacto: bastante corto para mantener la
        atención, bastante largo para que sea una salida de verdad.
      </p>
      <p>
        El paseo sigue la <strong>vuelta del Châtel</strong>, y la residencia del Hameau des Aiguilles está
        construida en la ladera del Châtel: en la práctica,{" "}
        <strong>el circuito pasa por delante del chalé</strong>. Se puede ver pasar a los niños desde el
        balcón y llegar hasta ellos a pie en unos minutos.
      </p>
      <p>
        Es además, también a pie,{" "}
        <strong>el paseo más simple y más fácil que sale del chalé</strong> — el punto de partida de todo
        lo demás, detallado en nuestra guía de las{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">rutas señalizadas de Albiez</Link>.
      </p>

      <h3>Para los más experimentados — 1 h 30</h3>
      <p>
        Paseos por los pastos de altura, <strong>al pie de las{" "}
        <Link href="/es/guide/aiguilles-arves">Aiguilles d'Arves</Link></strong>. Es el paisaje el que
        marca la diferencia.
      </p>

      <h3>La media jornada</h3>
      <p>
        Un paseo a través de las <strong>praderas de la Cochette</strong> y del pueblo de Albiez. El mismo
        sector que{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">la vuelta de la Cochette</Link>, visto desde otra
        altura.
      </p>

      <h3>Las clases en pista</h3>
      <p>
        Clases colectivas de todos los niveles, iniciación y perfeccionamiento. También clases
        particulares, sueltas o en curso.
      </p>

      <h3>Los cursos de poni por semanas</h3>
      <p>
        El centro acoge a niños y mayores durante todo el verano para cursos semanales. Es la fórmula que
        estructura una estancia familiar: los niños tienen su actividad, los adultos tienen sus mañanas.
      </p>

      <div className="facts">
        <p>
          <strong>Le Kavalkada</strong> — centro equino, a 300 m del alojamiento
          <br />
          <strong>Horarios</strong> (del 08/07 al 31/08, pueden cambiar): lunes, martes, miércoles,
          jueves, viernes y domingo, de 9 a 12 h y de 14 a 19 h.{" "}
          <strong>Cerrado los sábados.</strong>
          <br />
          <strong>Monitores</strong>: titulados por el Estado — tarifas específicas para grupos
        </p>
      </div>

      <h2>Un segundo centro equino en el puerto</h2>
      <p>
        El <Link href="/es/guide/col-du-mollard-velo">col du Mollard</Link> alberga también un centro
        equino con picadero, en funcionamiento en verano. Está justo al lado de la zona de ocio del puerto
        (lámina de agua, piscina infantil, petanca, zona de juegos y de picnic), suficiente para organizar
        una media jornada completa en el mismo sitio.
      </p>

      <h2>Cerrado los sábados: hay que anticiparlo</h2>
      <p>
        El sábado es el día de llegada y de salida en la mayoría de los alquileres de la estación, y es
        justamente el día de cierre del Kavalkada. En una semana de sábado a sábado quedan seis días
        útiles: basta, siempre que no se cuente con el primero.
      </p>

      <p>
        Las otras actividades de verano a unos cientos de metros:{" "}
        <Link href="/es/guide/lac-du-mollard-baignade">el lago del Mollard</Link> y{" "}
        <Link href="/es/guide/bmx-vtt-trottinette-albiez">la pista de BMX</Link>. El programa completo está
        en <Link href="/es/verano">la página de verano del alojamiento</Link>.
      </p>
    </>
  );
}
