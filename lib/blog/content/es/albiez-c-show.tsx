import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        El Albiez C'Show es la fiesta de la estación: todos los martes por la tarde durante las
        vacaciones escolares, en el acceso a pistas del Mollard. Bajada de antorchas, espectáculo
        de máquinas pisanieves, demostraciones de los monitores, fuegos artificiales y vino
        caliente. Es gratis o casi, y está a 250 m del alojamiento.
      </p>

      <h2>El programa</h2>

      <h3>La bajada de antorchas</h3>
      <p>
        Dirigida por los monitores de la{" "}
        <Link href="/es/guide/cours-de-ski-esf-albiez">Escuela de Esquí Francesa</Link>, está{" "}
        <strong>abierta a niños y adolescentes a partir del nivel «flocon»</strong>. Los
        veraneantes que quieran bajan con los monitores, antorcha en mano.
      </p>
      <p>
        Inscripción en el sitio, hay que venir equipado. La antorcha cuesta unos pocos euros
        (cuente 5 €).
      </p>

      <h3>Las demostraciones</h3>
      <p>
        Presentación y espectáculo de las <strong>máquinas pisanieves</strong> — ver estas
        máquinas maniobrar de cerca impresiona tanto a los adultos como a los niños — y
        demostraciones de esquí de los monitores de la ESF y del club deportivo.
      </p>

      <h3>Los fuegos artificiales</h3>
      <p>Un espectáculo pirotécnico que ilumina la estación al final de la tarde.</p>

      <h3>El aperitivo de la amistad</h3>
      <p>
        Vino caliente para los adultos, zumo de frutas para los niños, ofrecidos a la llegada por
        la ESF.
      </p>

      <div className="facts">
        <p>
          <strong>Cuándo</strong>: todos los martes por la tarde durante las vacaciones escolares
          <br />
          <strong>Dónde</strong>: acceso a pistas del Mollard, a 250 m del alojamiento
          <br />
          <strong>Tarifa</strong>: gratis — solo la antorcha se paga (≈ 5 €)
          <br />
          <strong>Horario exacto</strong>: publicado cada temporada por la oficina de turismo y la
          ESF
        </p>
      </div>

      <h2>Por qué es una ventaja real alojarse en Le Mollard</h2>
      <p>
        El evento se celebra <strong>en el acceso a pistas del Mollard</strong>, a 250 m del
        apartamento. En la práctica, eso significa:
      </p>
      <ul>
        <li>Nada de coche ni de buscar aparcamiento una tarde de mucha afluencia.</li>
        <li>
          Un niño cansado puede volver a acostarse en cinco minutos, sin estropear la tarde a los
          demás.
        </li>
        <li>
          Los fuegos artificiales se ven muy bien desde el{" "}
          <Link href="/es#appartement">balcón</Link> si se prefiere quedarse al calor.
        </li>
      </ul>

      <h2>Comprobar los horarios</h2>
      <p>
        Las fechas y horarios exactos cambian de una temporada a otra: siguen el calendario de las
        vacaciones escolares y la noche cae más tarde al final del invierno. El programa de
        animaciones está disponible en la oficina de turismo de Albiez-Montrond, en el centro del
        pueblo, donde también se encuentran el plano de la estación y la programación del cine.
      </p>

      <h2>El resto de la semana</h2>
      <p>
        Para completar: la pista de trineos del Mollard justo al lado de la residencia, los{" "}
        <Link href="/es/guide/chiens-de-traineau-albiez">trineos con perros</Link> en Les
        Contamines, y las tardes en iglú que propone Mustang Sports.
      </p>
    </>
  );
}
