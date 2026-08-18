import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond ha tenido la buena idea de señalizar sus itinerarios y de repartirlos entre todos los niveles.
        Seis de ellos salen del pueblo, de Le Mollard o de un aparcamiento a unos minutos en coche. Aquí están los seis,
        del más corto al más largo, con lo que hay que saber antes de ponerse las botas.
      </p>

      <h2>1. La croix du Châtel — 30 minutos de subida</h2>
      <p>
        Es el paseo que empieza literalmente detrás de la residencia. La croix du Châtel culmina a{" "}
        <strong>1754 m</strong>, es decir 124 m por encima del aparcamiento (1630 m), y se gana en media hora de
        subida.
      </p>
      <p>
        Desde el aparcamiento, siga el chemin du Châtel hasta su final: gira hacia la derecha y continúa por la ladera
        de la pequeña montaña. Al final de la carretera estrecha, tome el sendero de la derecha que sube hasta la cruz.
      </p>
      <div className="facts">
        <p>
          <strong>Salida</strong>: chemin du Châtel, en Le Mollard · <strong>Duración</strong>: 30 min de subida ·{" "}
          <strong>Desnivel</strong>: 124 m
        </p>
      </div>

      <h2>2. La vuelta de las Contamines — 40 minutos</h2>
      <p>
        Un circuito muy llano que sale del centro del pueblo y basta para salir del casco urbano y abrir el paisaje. La
        salida se toma en la rue Froide, frente al bar tabaco Constantin; siga la calle hasta el cruce, luego a la
        derecha, y siga el sendero que rodea el cerro de las Contamines.
      </p>
      <p>
        Atención, <strong>el itinerario es compartido</strong>: se cruzan bicicletas y, en invierno, tiros de perros de
        trineo. Esté atento y déjeles pasar.
      </p>
      <div className="facts">
        <p>
          <strong>Salida</strong>: rue Froide, centro del pueblo · <strong>Duración</strong>: 40 min ·{" "}
          <strong>Desnivel</strong>: 37 m · <strong>Distancia</strong>: 2,2 km
        </p>
      </div>

      <h2>3. La vuelta al lago del Mollard — 30 minutos</h2>
      <p>
        Circuito familiar alrededor de la lámina de agua, muy bien orientado, con salida directa del alojamiento. Ofrece
        una vista despejada de las{" "}
        <Link href="/es/guide/aiguilles-arves">Aiguilles d'Arves</Link>, del glaciar de l'Étendard y del valle del
        Arvan, por apenas 30 minutos de marcha y casi ningún desnivel.
      </p>
      <p>
        La lámina de agua tiene dos vidas: reserva de agua para la nieve artificial en invierno,{" "}
        <Link href="/es/guide/lac-du-mollard-baignade">zona de baño en verano</Link>.
      </p>

      <h2>4. El sendero de La Plaigne — 2 horas</h2>
      <p>
        Una ida y vuelta fácil que sale a la derecha del telesilla de Les Échaux, en Le Mollard, en el aparcamiento
        frente al centro de vacaciones de La Pierre aux Fées. Poco desnivel y una vista continua de las Aiguilles
        d'Arves, la meseta de Montrond, el Mont Emy y la Grande Chible.
      </p>
      <ol>
        <li>
          Siga la pista hasta el cruce con el sendero que llega al restaurante de altura Le Trapanel, y después continúe
          recto por el sendero de La Plaigne.
        </li>
        <li>
          Recorra varias vaguadas hasta el pie de una cruz, con una mesa de picnic enfrente: el itinerario acaba ahí.
        </li>
        <li>Regreso por el mismo camino.</li>
      </ol>
      <p>
        <strong>Seguridad</strong>: no se recomienda aventurarse más allá del final del recorrido. Las vaguadas que hay
        que atravesar hacen que el sector sea potencialmente propenso a los aludes.
      </p>
      <div className="facts">
        <p>
          <strong>Salida</strong>: telesilla de Les Échaux, en Le Mollard · <strong>Duración</strong>: 2 h ·{" "}
          <strong>Desnivel</strong>: 200 m · <strong>Distancia</strong>: 5 km
        </p>
      </div>

      <h2>5. La vuelta de la Cochette — 3 horas</h2>
      <p>
        Un circuito de 8 km que sale del centro del pueblo, con vistas a las crestas de Lâcha, el pueblo de
        Albiez-le-Jeune y las chimeneas de hadas. Es también el más rico de los seis en el plano del patrimonio: se
        atraviesa un piso montano donde antaño se cultivaba cada rincón de tierra — cebada, centeno, patata, lino,
        remolacha — y donde las <em>broues</em>, esos taludes de terrazas a menudo bordeados de arces, marcaban los
        límites de las parcelas.
      </p>
      <ol>
        <li>Desde el centro del pueblo, tome la RD80 en dirección a Albiez-le-Jeune durante 100 m.</li>
        <li>Deje la RD80 por una carretera a la izquierda.</li>
        <li>En el cruce, a la derecha dirección Les Crozets, hasta el cruce de La Côte.</li>
        <li>A la izquierda, el camino baja hasta el cruce del Bois du Nez.</li>
        <li>
          Recto por el camino herboso que lleva a la aldea de La Cochette: la vista de Le Moine de Champlan reaparece
          varias veces.
        </li>
        <li>Desde La Cochette, siga la dirección Le Villard Sambuis.</li>
        <li>
          100 m de carretera, después el camino a la izquierda. En Villard Sambuis, rodee el pequeño monte, vuelva hacia
          La Cochette y llegue al cruce de Les Crozets.
        </li>
        <li>Regreso al pueblo por el camino de ida.</li>
      </ol>
      <div className="facts">
        <p>
          <strong>Salida</strong>: centro de Albiez-Montrond · <strong>Duración</strong>: 3 h ·{" "}
          <strong>Desnivel</strong>: 245 m · <strong>Distancia</strong>: 8 km
        </p>
      </div>

      <h2>6. La meseta de Montrond desde el Chalmieu — 3 h 30</h2>
      <p>
        El más largo de los seis, y el único que exige coger el coche: 7,5 km desde el alojamiento, unos 15 minutos. Es
        también un itinerario de <strong>raquetas de nieve y de esquí nórdico</strong> en invierno.
      </p>
      <p>
        Desde el aparcamiento de la aldea del Chalmieu, localice el panel de salida violeta. El sendero sube en dirección
        al «Relai TV», alternando tramos de sendero y cortos pasos por la carretera (10 m cada vez): Combet du dessus,
        l'Oratoire, Ordière dessous y luego Ordière dessus, la fontaine de l'Âne. En el Relai TV, siga la pista hacia
        Les Chabottes, donde el paseo cómodo hace un circuito. El regreso se hace por el mismo itinerario.
      </p>
      <p>
        Unas mesas de orientación en el sitio permiten identificar las cumbres. El sendero serpentea en plenos pastos de
        altura, al pie de las Aiguilles d'Arves.
      </p>
      <div className="facts">
        <p>
          <strong>Salida</strong>: aparcamiento de la aldea del Chalmieu (7,5 km) · <strong>Duración</strong>: 3 h 30 ·{" "}
          <strong>Desnivel</strong>: 424 m
        </p>
      </div>

      <h2>Caminar acompañado</h2>
      <p>
        Yves Vionnet, guía de montaña establecido en Albiez, propone rutas guiadas en Albiez, en la Vanoise y en otros
        lugares — en primavera como en otoño, en verano como en invierno, con raquetas o sin ellas. Es la buena opción
        para la fauna, la flora y la historia de los lugares, que ninguna guía cuenta.
      </p>
      <p>
        Sobre todo, <strong>está activo todo el año, temporada baja incluida</strong>. Es una excepción en la estación:
        cuando los remontes están cerrados y parte de los comercios baja la persiana, en abril o en octubre, queda una
        forma de ocupar un día de montaña.
      </p>
      <div className="facts">
        <p>
          <strong>Albiez Randonnée Patrimoine — Yves Vionnet</strong>
          <br />
          <a href={PROPERTY.links.mountainGuide} target="_blank" rel="noopener noreferrer">
            albiezrandopatrimoine.com
          </a>
        </p>
      </div>
      <p>
        La oficina de turismo de Albiez-Montrond, en el centro del pueblo, vende además guías de senderismo que cubren
        cuatro sectores, entre ellos el de Albiez-Montrond y Albiez-le-Jeune.
      </p>

      <h2>¿Y en invierno?</h2>
      <p>
        Tres de estos itinerarios (Contamines, La Plaigne, el Chalmieu) son practicables con raquetas. Para el resto de
        la estación fría, todo ocurre en{" "}
        <Link href="/es/esqui">el dominio esquiable</Link>, a 250 m del alojamiento.
      </p>
    </>
  );
}
