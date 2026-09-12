import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        El Trail de l'Étendard atraviesa el macizo de las Grandes Rousses a principios de
        agosto, de Bourg-d'Oisans a Saint-Sorlin-d'Arves, a un cuarto de hora de Albiez. Y
        su recorrido no desaparece el lunes: existe también como{" "}
        <strong>itinerario permanente señalizado</strong>, que puede correrse cualquier día
        del verano, sin dorsal.
      </p>

      <h2>La prueba</h2>
      <p>
        Cuatro recorridos — <strong>17, 22, 44 y 65 km</strong> — en pleno corazón de las
        Grandes Rousses, en dos días de principios de agosto. La edición de 2026 fue la
        decimotercera.
      </p>
      <p>
        El <strong>65 km</strong> es el que da sentido a la prueba:{" "}
        <strong>3 624 metros de desnivel positivo</strong>, una travesía del macizo con
        salida en Bourg-d'Oisans, un paso al pie del glaciar del Étendard y una docena de
        lagos notables por el camino: el Lac Blanc, el lago Bramant, el lago de
        Grand-Maison. Un bucle al pie del pico del Étendard, y luego la bajada a
        Saint-Sorlin-d'Arves.
      </p>
      <p>
        El <strong>44 km</strong> sigue la misma lógica en más corto: salida de
        Bourg-d'Oisans, meta en Saint-Sorlin. Los dos formatos cortos se quedan del lado
        saboyano.
      </p>

      <div className="facts">
        <p>
          <strong>Cuándo</strong>: dos días a principios de agosto
          <br />
          <strong>Recorridos</strong>: 17, 22, 44 y 65 km
          <br />
          <strong>El 65 km</strong>: 3 624 m de desnivel positivo, Bourg-d'Oisans →
          Saint-Sorlin-d'Arves
          <br />
          <strong>Meta</strong>: Saint-Sorlin-d'Arves, a 12 km de Albiez
          <br />
          <strong>El resto del año</strong>: recorrido n.º 7 del Espace Trail, señalizado de
          forma permanente
        </p>
      </div>

      <h2>El mismo recorrido, sin dorsal</h2>
      <p>
        Es lo que hace interesante la zona incluso fuera del fin de semana de carrera. El{" "}
        <strong>Espace Trail Pays des Aiguilles d'Arves</strong> señaliza de forma
        permanente <strong>550 kilómetros de itinerarios</strong>, repartidos en más de
        cuarenta recorridos numerados: desde 3 km para una salida en familia hasta casi
        38 km, con desniveles que llegan a los 2 380 metros.
      </p>
      <p>
        <strong>El recorrido número 7 es el propio Trail de l'Étendard.</strong> Se puede
        por tanto reconocer en julio, repetir en septiembre o simplemente correrlo sin
        inscribirse nunca a nada. Los perros con correa están admitidos en los recorridos
        señalizados.
      </p>

      <h2>Lo que conviene saber si se aloja en Albiez</h2>
      <p>
        Digámoslo con franqueza:{" "}
        <strong>ningún recorrido del Espace Trail sale de Albiez-Montrond.</strong> Salen de
        Saint-Sorlin-d'Arves, de Saint-Jean-d'Arves, de La Toussuire, de Le Corbier, del
        valle de los Villards y de la zona de La Tour-en-Maurienne. Albiez está en el mismo
        país, no en la misma red.
      </p>
      <p>
        En la práctica, eso significa entre quince y veinte minutos de coche para llegar a
        una salida: Saint-Sorlin está a 12 km, sin volver a pasar por el valle. Poco para
        una red de 550 km, pero no es nada, y más vale saberlo antes de reservar.
      </p>
      <p>
        Desde el propio pueblo, en cambio, están nuestras{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">seis rutas señalizadas</Link>, de
        40 minutos a 3 h 30. Suficiente para correr desde la puerta los días en que no se
        quiere coger el coche.
      </p>

      <h2>El mismo macizo, a pie y en bici</h2>
      <p>
        Curiosidad geográfica: los corredores del 65 km atraviesan las Grandes Rousses a pie
        desde Bourg-d'Oisans, mientras los ciclistas cruzan el mismo macizo por carretera un
        mes antes, por el col de la Croix de Fer y el Glandon. Una misma barrera, dos formas
        de pasarla, y Albiez está del lado bueno para las dos. Ver{" "}
        <Link href="/es/guide/albiez-camp-de-base-grands-cols">
          Albiez, campo base de los grandes puertos
        </Link>
        .
      </p>

      <h2>Alrededor de la carrera</h2>
      <p>
        A principios de agosto el pueblo tiene también su fiesta:{" "}
        <Link href="/es/guide/tradi-cimes-albiez">Tradi'Cimes</Link>, gratuita, el fin de
        semana. A mediados de julio, el{" "}
        <Link href="/es/guide/cross-triathlon-swimrun-albiez">
          cross triatlón y swimrun
        </Link>{" "}
        se corre en el lago del pueblo. Y para recuperar, el baño vigilado del{" "}
        <Link href="/es/guide/lac-du-mollard-baignade">lago del Mollard</Link>.
      </p>
      <p>
        El resto de la temporada está en nuestra{" "}
        <Link href="/es/verano">página de verano</Link>.
      </p>
    </>
  );
}
