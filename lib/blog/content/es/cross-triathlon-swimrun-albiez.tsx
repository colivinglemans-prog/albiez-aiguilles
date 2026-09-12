import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        El Cross Triatlón y Swimrun des Aiguilles d'Arves se celebra a mediados de julio en
        el lago de Albiez, a 300 metros del apartamento. Dos pruebas el mismo día, abiertas{" "}
        <strong>desde los 8 años</strong>, en un escenario donde se nada frente a las
        Aiguilles. Es cosa de una mañana y una tarde; el resto de la semana queda para
        usted.
      </p>

      <h2>Dos pruebas, un día</h2>

      <h3>El cross triatlón, por la mañana</h3>
      <p>Natación, BTT y carrera a pie de tipo trail. Tres formatos, separados por edad:</p>
      <ul>
        <li>
          <strong>Formato S, a partir de 16 años</strong> — 500 m de natación, 11,97 km de
          BTT, 4,8 km de carrera. Salida a las 9.30 h.
        </li>
        <li>
          <strong>12-15 años</strong> — 200 m, 5,4 km, 2,4 km. Salida a mediodía.
        </li>
        <li>
          <strong>8-11 años</strong> — 100 m, 5,4 km, 1 km. Salida a las 12.45 h.
        </li>
      </ul>

      <h3>El swimrun, por la tarde</h3>
      <p>Natación y carrera, alternadas, sin bici. Cinco formatos, uno de ellos por parejas:</p>
      <ul>
        <li>
          <strong>Formato S, a partir de 16 años</strong> — 900 m de natación, 8,8 km de
          carrera.
        </li>
        <li>
          <strong>12-19 años</strong>, en pareja o en solitario — 450 m, 4,8 km.
        </li>
        <li>
          <strong>10-11 años</strong> — 360 m, 640 m.
        </li>
        <li>
          <strong>8-9 años</strong> — 60 m, 580 m.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Cuándo</strong>: un fin de semana de mediados de julio
          <br />
          <strong>Dónde</strong>: el lago de Albiez-Montrond, a 300 m del apartamento
          <br />
          <strong>Desde</strong>: los 8 años
          <br />
          <strong>Por la mañana</strong>: cross triatlón — natación, BTT, trail
          <br />
          <strong>Por la tarde</strong>: swimrun — natación y carrera
          <br />
          <strong>Inscripciones</strong>: en el calendario de la Federación Francesa de
          Triatlón
        </p>
      </div>

      <h2>Desde los 8 años, y eso lo cambia todo</h2>
      <p>
        La mayoría de las pruebas de montaña empiezan a los dieciséis, lo que zanja la
        cuestión de las vacaciones en familia: los padres corren, los niños miran. Aquí las
        cuatro franjas de edad tienen su propia distancia, en el mismo lago y el mismo día.
        Un niño de ocho años nada sus 60 metros y corre sus 580, y lleva dorsal como los
        demás.
      </p>
      <p>
        Es también, muy concretamente, la razón por la que conviene dormir al lado y no a
        cuarenta minutos de coche: una salida a las 9.30 h para los mayores y otra a las
        12.45 h para los pequeños hacen un día entero in situ, con el material mojado entre
        medias.
      </p>

      <h2>El lago, a 300 metros</h2>
      <p>
        Es el mismo lago que el resto del verano: baño vigilado, piscina infantil, patines,
        estructura hinchable, zona de juegos y área de picnic. El detalle está en nuestro
        artículo sobre el{" "}
        <Link href="/es/guide/lac-du-mollard-baignade">lago del Mollard</Link>.
      </p>
      <p>
        Desde el apartamento se va andando. Ningún coche que aparcar un día de afluencia,
        ninguna bolsa que cargar para la jornada entera: se sube a cambiarse entre dos
        salidas, y el balcón orientado al sur seca un neopreno en una hora.
      </p>

      <h2>Quedarse la semana</h2>
      <p>
        La prueba dura un día. Lo que la rodea dura más, y ahí es donde se juega una
        estancia:
      </p>
      <ul>
        <li>
          Las{" "}
          <Link href="/es/guide/randonnees-balisees-albiez">seis rutas señalizadas</Link>{" "}
          que salen del pueblo, de 40 minutos a 3 h 30 — suficiente para reconocer un
          terreno o para recuperar andando.
        </li>
        <li>
          La BTT y las bicis eléctricas, con la{" "}
          <Link href="/es/guide/bmx-vtt-trottinette-albiez">
            pista de BMX race en el centro del pueblo
          </Link>
          .
        </li>
        <li>
          El <Link href="/es/guide/col-du-mollard-velo">col du Mollard</Link>, a la salida
          del caserío, para quien se haya traído la bici de carretera.
        </li>
        <li>
          Y todo lo que hace que sean vacaciones y no un desplazamiento deportivo:{" "}
          <Link href="/es/guide/albiez-en-famille">Albiez en familia</Link>.
        </li>
      </ul>
      <p>
        El programa completo de la temporada está en nuestra{" "}
        <Link href="/es/verano">página de verano</Link>.
      </p>
    </>
  );
}
