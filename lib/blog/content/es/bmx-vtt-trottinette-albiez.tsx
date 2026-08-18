import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond alberga la pista de BMX más alta de Francia. Es de libre acceso, está en
        el centro del pueblo y la rodean campos de deporte y una zona de picnic. Y para todo lo
        que rueda, la estación alquila BTT eléctricas, BMX y patinetes eléctricos.
      </p>

      <h2>La pista de BMX race</h2>
      <p>
        Se encuentra en el centro del pueblo y se practica <strong>con total libertad</strong>:
        sin reserva y sin monitor obligatorio. Los módulos son de{" "}
        <strong>distintos niveles</strong>, lo que permite que un principiante y un practicante
        experimentado rueden en el mismo terreno.
      </p>
      <p>
        El entorno cuenta mucho: es la pista de BMX más alta de Francia, y se nota al levantar la
        vista.
      </p>

      <h2>Lo que hay alrededor</h2>
      <p>
        La pista no está sola: el conjunto forma una zona de ocio completa:
      </p>
      <ul>
        <li>Campos de fútbol y de baloncesto</li>
        <li>Pista de tenis</li>
        <li>Cancha de petanca</li>
        <li>Zona de juegos para niños</li>
        <li>Mesas de picnic</li>
      </ul>
      <p>
        Es el buen plan para una tarde en familia cuando no todo el mundo quiere hacer lo mismo.
      </p>

      <h2>Alquilar una bicicleta</h2>

      <h3>Skiset — Albiez Sports (centro del pueblo)</h3>
      <p>
        Alquiler de <strong>BMX</strong> y de <strong>patinetes eléctricos</strong>, y salidas con
        acompañantes. Espacio de venta de 100 m², material de esquí en invierno y de senderismo en
        verano.
      </p>

      <h3>Skimium — Mustang Sports (centro del pueblo)</h3>
      <p>
        <strong>Escuela de ciclismo</strong> y <strong>BTT eléctricas</strong>. También se les
        encuentra por la tarde en el acceso a pistas del Mollard, a 250 m del alojamiento.
      </p>

      <h3>Skiset Ski Attitude y Sport 2000 (acceso a pistas del Mollard)</h3>
      <p>
        Las dos tiendas más cercanas al alojamiento pasan a modo senderismo en verano. El detalle
        de cada una está en nuestro artículo{" "}
        <Link href="/es/guide/louer-ses-skis-a-albiez">
          alquilar el material en Albiez-Montrond
        </Link>
        .
      </p>

      <h2>La BTT por los senderos</h2>
      <p>
        Varios <strong>recorridos de BTT</strong> atraviesan el{" "}
        <Link href="/es/guide/foret-du-rival">bosque de Le Rival</Link>, entre los 1300 m y el
        col du Mollard. Atención a los itinerarios compartidos: la{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">vuelta de las Contamines</Link> acoge
        también a peatones y, en invierno, tiros de perros de trineo.
      </p>

      <h2>Y la bicicleta de carretera</h2>
      <p>
        Para los ciclistas de carretera el asunto está en otra parte: el{" "}
        <Link href="/es/guide/col-du-mollard-velo">col du Mollard</Link>, sus tres subidas y la
        vuelta Arvan-Villards que enlaza Glandon, Croix de Fer y Mollard.
      </p>
      <p>
        La oficina de turismo del centro del pueblo facilita mapas e itinerarios para carretera,
        gravel y BTT, con o sin asistencia eléctrica.
      </p>
    </>
  );
}
