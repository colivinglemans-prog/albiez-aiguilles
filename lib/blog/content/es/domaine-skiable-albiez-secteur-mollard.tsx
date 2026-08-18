import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez es una estación familiar del valle de la Maurienne: 40 km de pistas, 13 remontes mecánicos,
        22 pistas entre 1500 y 2060 metros. Se divide en tres sectores — Montrond, Chef-lieu y Le Mollard — a
        los que se añade el pueblo vecino de Albiez-le-Jeune. Nuestro apartamento está en Le Mollard, el más alto
        de los tres.
      </p>

      <h2>El dominio en cifras</h2>
      <ul>
        <li>
          <strong>40 km de pistas</strong> repartidos en <strong>22 pistas</strong>
        </li>
        <li>
          <strong>13 remontes mecánicos</strong>
        </li>
        <li>
          Altitud: de <strong>1500 m</strong> a <strong>2060 m</strong>
        </li>
        <li>
          <strong>50 cañones de nieve</strong> como complemento de la nieve natural
        </li>
      </ul>
      <p>
        La meseta de Montrond se beneficia de una escasa pluviometría y de una luminosidad notable, con nieve
        continua casi seis meses al año. Las pistas son soleadas y anchas: es un dominio donde se aprende a
        esquiar con comodidad, no un dominio al que se viene a buscar paredes.
      </p>

      <h2>Salir de Le Mollard: los tres remontes que hay que conocer</h2>

      <h3>El telesilla de Les Échaux — la puerta de entrada</h3>
      <p>
        A <strong>250 a 300 m del alojamiento</strong>, sube de 1600 m a 1800 m. Es el remonte que permite
        alcanzar más rápido el conjunto del dominio: se toma por la mañana, y detrás se abre todo.
      </p>

      <h3>El telesquí de Les Aplanes — el punto alto</h3>
      <p>
        Desde la cima de Les Échaux se enlaza con el telesquí Les Aplanes, que culmina a{" "}
        <strong>2100 m</strong>. Es el punto más alto accesible desde el sector.
      </p>

      <h3>Coucou y Polytre — para empezar</h3>
      <p>
        El <strong>telesquí Coucou</strong> es el de los principiantes. El{" "}
        <strong>telesquí Polytre</strong>, en cambio, lo usa especialmente la{" "}
        <Link href="/es/guide/cours-de-ski-esf-albiez">escuela de esquí</Link>: ofrece varios puntos donde soltar
        la percha, con niveles de dificultad crecientes. Es exactamente lo que hace falta para que un niño
        progrese sin ponerlo en dificultad de golpe.
      </p>

      <h2>¿En qué orden para un primer día?</h2>
      <ol>
        <li>
          <strong>Principiante absoluto</strong>: Coucou por la mañana, luego Polytre por la tarde para enlazar
          bajadas de verdad.
        </li>
        <li>
          <strong>Esquiador medio</strong>: Échaux en cuanto abra para tomar la medida del sector, y luego pasar
          al Chef-lieu y a Montrond durante el día.
        </li>
        <li>
          <strong>Buen esquiador</strong>: Échaux y después Aplanes, y el dominio se despliega desde los 2100 m.
        </li>
        <li>
          <strong>Muy buen esquiador</strong>: saliendo de Les Aplanes y según las condiciones de nieve, varios
          itinerarios fuera de pista bajan por la nieve polvo de{" "}
          <strong>2100 m a 1500 m</strong>, hasta el telesilla du Loup: 600 m de desnivel de un tirón. Fuera de
          pista significa fuera de seguridad: equipo, boletín de aludes y, ante la menor duda, un guía.
        </li>
      </ol>

      <h2>La ventaja de alojarse en Le Mollard</h2>
      <p>
        El acceso a pistas del Mollard reúne a 250 m la salida de las pistas, las{" "}
        <Link href="/es/guide/louer-ses-skis-a-albiez">tiendas de alquiler de material</Link>, el supermercado y el
        punto de encuentro de la escuela de esquí. En la práctica: sin lanzadera, sin cargar los esquís cientos de
        metros, y con la posibilidad de volver a comer. Con niños, es la diferencia entre una semana agradable y
        una semana de logística.
      </p>
      <p>
        Es también aquí donde se celebra el{" "}
        <Link href="/es/guide/albiez-c-show">Albiez C'Show</Link>, la fiesta del martes durante las vacaciones
        escolares.
      </p>

      <h2>Fuera de las pistas</h2>
      <p>
        La <Link href="/es/guide/albiez-en-famille">pista de trineos del Mollard</Link> está justo al lado de la
        residencia, muy bien orientada al sol (la nieve no está garantizada). Por lo demás, la estación ofrece
        raquetas, esquí de fondo,{" "}
        <Link href="/es/guide/chiens-de-traineau-albiez">trineos con perros</Link>, moto de nieve y tardes en
        iglú.
      </p>

      <p>
        El detalle de las distancias, del guardaesquís y del acceso a las pistas está en{" "}
        <Link href="/es/esqui">la página de invierno del alojamiento</Link>.
      </p>
    </>
  );
}
