import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        No hace falta saber esquiar para disfrutar de la nieve en Albiez. Desde el
        apartamento del Mollard hay tres maneras de salir con raquetas: por libre en los
        itinerarios balizados, en una salida guiada con la ESF o un guía de media montaña, o
        de noche, subiendo a cenar a un refugio de montaña.
      </p>

      <h2>Por libre, en los itinerarios balizados</h2>
      <p>
        Tres de los{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">itinerarios balizados de Albiez</Link>{" "}
        se pueden hacer con raquetas. Los tiempos indicados son los de la ruta a pie: en la
        nieve se avanza más despacio, así que conviene dejar margen.
      </p>

      <h3>El sendero de la Plaigne, desde el Mollard</h3>
      <p>
        El más práctico desde el apartamento: sale a la derecha del telesilla de las
        Échaux, en el aparcamiento frente al centro vacacional de la Pierre aux fées. Una ida
        y vuelta con poco desnivel y vistas continuas a las Aiguilles d'Arves, la meseta de
        Montrond, el Mont Emy y la Grande Chible. El itinerario termina al pie de una cruz,
        frente a una mesa de pícnic.
      </p>
      <p>
        <strong>No pase de la cruz</strong>: más allá, las hondonadas que hay que cruzar
        hacen que la zona sea potencialmente propensa a aludes.
      </p>
      <div className="facts">
        <p>
          <strong>Salida</strong>: telesilla de las Échaux, en el Mollard ·{" "}
          <strong>Tiempo a pie</strong>: 2 h ida y vuelta · <strong>Desnivel</strong>:
          200 m · <strong>Distancia</strong>: 5 km
        </p>
      </div>

      <h3>La vuelta a las Contamines, en el Chef-lieu</h3>
      <p>
        Un circuito muy llano alrededor del cerro de las Contamines, con salida en la rue
        Froide, frente al bar estanco Constantin. Es el más corto y el más fácil de los
        tres. El itinerario es compartido: en invierno se cruzan{" "}
        <Link href="/es/guide/chiens-de-traineau-albiez">trineos tirados por perros</Link>, a
        los que hay que dejar la huella. El Chef-lieu está más bajo que el Mollard: a
        principio o a final de temporada puede faltar nieve.
      </p>
      <div className="facts">
        <p>
          <strong>Salida</strong>: rue Froide, Chef-lieu · <strong>Tiempo a pie</strong>:
          40 min · <strong>Desnivel</strong>: 37 m · <strong>Distancia</strong>: 2,2 km
        </p>
      </div>

      <h3>La meseta de Montrond, desde el Chalmieu</h3>
      <p>
        La gran salida de la semana, y en invierno un itinerario de raquetas y esquí
        nórdico. Se sale del aparcamiento de la aldea del Chalmieu, a 7,5 km del apartamento
        (unos 15 minutos en coche). El sendero sube hacia el Relai TV y luego les Chabottes,
        en pleno pasto de altura al pie de las Aiguilles d'Arves, con mesas de orientación
        para identificar las cumbres. Vuelta por el mismo camino.
      </p>
      <div className="facts">
        <p>
          <strong>Salida</strong>: aparcamiento del Chalmieu (7,5 km) ·{" "}
          <strong>Tiempo a pie</strong>: 3 h 30 · <strong>Desnivel</strong>: 424 m
        </p>
      </div>

      <h3>Y el bosque del Rival</h3>
      <p>
        El <Link href="/es/guide/foret-du-rival">bosque del Rival</Link>, que se atraviesa
        al subir a la estación, también se recorre con raquetas en invierno, siempre que se
        siga por los itinerarios balizados.
      </p>
      <p>
        La oficina de turismo, en el Chef-lieu, vende guías de senderismo del sector de
        Albiez-Montrond y Albiez-le-Jeune. Es también donde conviene preguntar por el estado
        de los itinerarios antes de salir.
      </p>

      <h2>En salida guiada</h2>

      <h3>Con la ESF</h3>
      <p>
        La{" "}
        <Link href="/es/guide/cours-de-ski-esf-albiez">escuela de esquí ESF de Albiez</Link>{" "}
        no solo da clases de esquí: también organiza salidas con raquetas, guiadas por un
        monitor que conoce los miradores y la fauna de la zona. En noviembre de 2026, su web
        ofrecía:
      </p>
      <ul>
        <li>
          <strong>salidas temáticas</strong> cada semana — por el bosque, panorama y fauna,
          una salida gourmet con merienda —, la mayoría con punto de encuentro en la ESF del
          Mollard, a 250 m del apartamento, con un mínimo de cinco participantes;
        </li>
        <li>
          una <strong>salida a medida</strong>, todos los días, por la mañana o por la tarde,
          a partir de cuatro personas: ideal para una familia o un grupo de amigos, al ritmo
          del grupo.
        </li>
      </ul>
      <p>
        Dos cosas que conviene saber: <strong>el alquiler de las raquetas no está
        incluido</strong>, y la salida panorama usa los remontes, lo que exige un forfait
        (salvo que se suba a pie). El programa, los días y los horarios de la temporada hay
        que comprobarlos en{" "}
        <a href={PROPERTY.links.esf + "raquettes/"} target="_blank" rel="noopener noreferrer">
          esfalbiez.fr/raquettes
        </a>
        .
      </p>

      <h3>Con un guía de media montaña</h3>
      <p>
        Yves Vionnet, guía de media montaña (accompagnateur en montagne) instalado en
        Albiez, propone rutas guiadas con raquetas por Albiez y alrededores, en torno a la
        fauna, la flora y el patrimonio. Trabaja <strong>todo el año</strong>, temporada
        baja incluida: es la forma más segura de salir de los senderos del pueblo cuando las
        condiciones cambian de un día para otro.
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
        Alain Mollaret, nacido en la Maurienne, vive en la aldea de la Saussaz, en
        Albiez-Montrond. Guía de media montaña, y monitor de esquí en la ESF de Albiez, lleva a niños y
        adultos con raquetas durante <strong>media jornada o una jornada completa</strong>,
        sobre una nieve a menudo sin más huellas que las de los animales.
      </p>
      <div className="facts">
        <p>
          <strong>Alain Mollaret — senderismo en Albiez-Montrond</strong>
          <br />
          <a href="https://www.alain-mollaret-randonnees.fr/pr%C3%A9sentation/activit%C3%A9s-hivernales/raquettes/" target="_blank" rel="noopener noreferrer">
            alain-mollaret-randonnees.fr
          </a>
        </p>
      </div>

      <h3>De noche: la velada trampero de Mustang</h3>
      <p>
        Los miércoles y jueves por la noche, Mustang lleva a grupos reducidos desde Montrond
        hasta el refugio de montaña de la Broue (1.800 m): unos 45 minutos de subida con
        raquetas junto a un guía de media montaña, aperitivo cena alrededor de los
        braseros y bajada en trineo con frontal. A partir de 8 años. Todos los detalles en
        nuestro artículo sobre{" "}
        <Link href="/es/guide/motoneige-igloo-albiez">motos de nieve y veladas en iglú</Link>.
      </p>

      <h2>Alquilar raquetas</h2>
      <p>
        En el frente de nieve del Mollard, a 250 m, <strong>Sport 2000 Aux Deux Frères</strong>{" "}
        — la tienda donde alquilamos nuestro propio material — tiene raquetas en su
        catálogo, además de portabebés. En las demás tiendas de la estación, pregunte allí
        mismo. Como con los esquís, reservar en línea antes de llegar sale más barato: todo
        está en nuestro artículo sobre{" "}
        <Link href="/es/guide/louer-ses-skis-a-albiez">alquilar esquís en Albiez</Link>.
      </p>
      <p>
        A la vuelta, raquetas y bastones se guardan en el{" "}
        <strong>guardaesquís privado del rellano</strong>, justo al lado de la puerta del
        apartamento.
      </p>

      <h2>Normas de prudencia</h2>
      <ul>
        <li>
          <strong>Quédese en los itinerarios balizados</strong> y deténgase donde terminan: el
          final de la Plaigne no está ahí por casualidad.
        </li>
        <li>
          <strong>Infórmese antes de salir</strong> en la oficina de turismo sobre el estado
          de los itinerarios, y salga con un profesional si quiere dejar los senderos del
          pueblo.
        </li>
        <li>
          <strong>Comparta la huella</strong>: trineos de perros en las Contamines,
          esquiadores de fondo en el Chalmieu.
        </li>
        <li>
          Para entender el riesgo de aludes, la ESF propone una{" "}
          <strong>iniciación al ARVA</strong>: una hora que cambia la manera de mirar la
          montaña.
        </li>
      </ul>

      <h2>Con niños</h2>
      <p>
        La vuelta a las Contamines, llana y corta, es el mejor primer intento. Para una
        salida a medida con la ESF basta una familia de cuatro. La velada trampero está
        abierta a partir de 8 años. Y si las piernas se cansan, los trineos infantiles
        (trineo para bebé incluido) esperan en el guardaesquís, a dos pasos de la pista de
        trineo del Mollard. Todas las ideas para los más pequeños están en{" "}
        <Link href="/es/guide/albiez-en-famille">Albiez-Montrond en familia</Link>.
      </p>

      <p>
        Ver también:{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">las rutas balizadas</Link>,{" "}
        <Link href="/es/guide/ski-de-randonnee-albiez-debutant">
          empezar con el esquí de travesía
        </Link>{" "}
        y <Link href="/es/esqui">la página de invierno del alojamiento</Link>.
      </p>
    </>
  );
}
