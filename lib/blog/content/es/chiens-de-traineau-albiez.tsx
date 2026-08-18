import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Es la actividad que se reserva demasiado tarde. Los paseos en trineo tirado por perros
        de Albiez salen de la base de ocio de Les Contamines, en el centro del pueblo, y los
        turnos se llenan mucho antes de la llegada de los veraneantes.
      </p>

      <h2>En qué consiste</h2>
      <p>
        Sentado en un trineo, uno se deja llevar por un gran tiro de perros. El musher explica
        cómo se organiza el trabajo de los animales — quién tira, quién guía, cómo se reparte
        el esfuerzo el equipo — y la complicidad entre el hombre y los perros es la verdadera
        sorpresa de la salida.
      </p>
      <p>
        Dos formatos: <strong>media hora</strong> o <strong>una hora</strong>.
      </p>

      <div className="facts">
        <p>
          <strong>Salida</strong>: base de ocio de Les Contamines, centro de
          Albiez-Montrond
          <br />
          <strong>Periodo</strong>: del 17/12 al 01/04, todos los días, según las condiciones
          de nieve
          <br />
          <strong>Tarifas</strong>: desde 45 € adulto, 40 € niño
          <br />
          <strong>Reserva</strong>: imprescindible —{" "}
          <a href="tel:+33682759926">06 82 75 99 26</a>
        </p>
      </div>

      <h2>Reserve en cuanto tenga las fechas</h2>
      <p>
        Es el punto más importante de este artículo. La reserva es imprescindible, y conviene
        hacerla <strong>cuanto antes</strong>. En una semana de vacaciones escolares, los
        turnos disponibles se agotan en pocos días.
      </p>
      <p>
        El reflejo útil: reservar el trineo al mismo tiempo que las{" "}
        <Link href="/es/guide/cours-de-ski-esf-albiez">clases de esquí</Link> y el{" "}
        <Link href="/es/guide/louer-ses-skis-a-albiez">material</Link>, es decir, varias
        semanas antes de salir.
      </p>

      <h2>Según la nieve</h2>
      <p>
        La actividad depende de la nieve en el suelo, y no solo de la de las pistas: el centro
        del pueblo está más bajo que Le Mollard. A principio o a final de temporada, prevea un
        plan B: las{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">raquetas de nieve</Link>, la pista de
        trineos del Mollard o el{" "}
        <Link href="/es/guide/albiez-c-show">Albiez C'Show</Link> del martes por la tarde.
      </p>

      <h2>En el mismo itinerario</h2>
      <p>
        La <strong>vuelta de las Contamines</strong>, un circuito de 2,2 km que sale de la rue
        Froide, es un itinerario compartido: allí se cruzan precisamente tiros de perros de
        trineo y también bicicletas. Esté atento y déjeles la huella.
      </p>

      <h2>Las otras actividades sin esquís</h2>
      <p>
        Albiez ofrece también moto de nieve y tardes en iglú (Skimium / Mustang Sports),
        raquetas de nieve y esquí nórdico. El detalle de las tiendas de alquiler está en
        nuestro artículo{" "}
        <Link href="/es/guide/louer-ses-skis-a-albiez">
          alquilar los esquís en Albiez-Montrond
        </Link>
        .
      </p>
    </>
  );
}
