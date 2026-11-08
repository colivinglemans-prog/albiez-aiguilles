import Link from "next/link";
import ArticleImage from "@/lib/blog/ArticleImage";

/*
 * Datos tomados el 8 de noviembre de 2026 (fichas de la oficina de turismo y condiciones
 * generales de Mustang). Fuentes y puntos no retomados: ver la versión francesa.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Una vez cerradas las pistas, la velada puede continuar al aire libre. En Albiez, cuatro
        salidas guiadas se hacen al caer la noche: pilotar una moto de nieve, llegar a un iglú
        en trineo, encadenar moto de nieve y fondue en el restaurante, o rodar en fat bike
        eléctrica. Tres salen del Mollard, a pocos minutos a pie del apartamento.
      </p>

      <h2>Quién organiza qué</h2>
      <ul>
        <li>
          <strong>Moto de nieve, velada en iglú, velada moto de nieve y restaurante, velada
          trampero</strong>: Mustang, tienda de alquiler de esquís de la estación, con dos
          tiendas abiertas todo el año. <strong>Mustang 1650 (Skiset)</strong> está en pleno
          acceso a pistas del Mollard, cerca del apartamento; <strong>Mustang 1550
          (Skimium)</strong>, la tienda de deportes más grande de la estación desde 1980, está
          en el Chef-lieu, cerca de la place Opinel.
        </li>
        <li>
          <strong>Fat bike</strong>: la ESF de Albiez, con salida desde el chalet ESF del
          Chef-lieu.
        </li>
      </ul>
      <p>
        Todas estas salidas funcionan del <strong>19 de diciembre de 2026 al 21 de marzo de
        2027</strong>, con reserva. La oficina de turismo precisa que los horarios no están
        garantizados: el programa puede cambiar con la meteorología o la innivación.
      </p>

      <h2>Pilotar una moto de nieve</h2>
      <p>
        Tras una explicación previa, uno mismo toma el manillar y sigue al guía por un recorrido
        reservado de 4 hectáreas, frente a las Aiguilles d'Arves. Los grupos son de 5 personas
        como máximo. De dos en la misma máquina, piloto y pasajero pueden intercambiarse a mitad
        de recorrido.
      </p>
      <ul>
        <li>
          <strong>Desarrollo</strong>: acogida y explicación de 10 a 15 min, pilotaje de 30 a
          35 min, regreso y retirada del equipo de 10 a 15 min.
        </li>
        <li>
          <strong>Salidas</strong>: 18 h, 19 h, 20 h, 21 h y 22 h, todos los días. Se anuncian
          bautismos a partir de las 17.30 h.
        </li>
        <li>
          <strong>Para pilotar</strong>: 18 años cumplidos y el permiso B, según las
          condiciones generales de Mustang. El casco proporcionado es obligatorio.
        </li>
        <li>
          <strong>Pasajero</strong>: 1,30 m como mínimo, capaz de apoyar los pies en los
          reposapiés y de sujetarse al piloto.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Salida</strong>: acceso a pistas del Mollard, 125 rue du Ravarin, a unos
          250 m del apartamento
          <br />
          <strong>Tarifas</strong> (condiciones generales de Mustang): 75 € por moto de nieve,
          35 € por un pasajero detrás del guía, 10 € por niño para un bautismo
          <br />
          <strong>Fianza</strong>: 1 000 €, mediante preautorización de tarjeta bancaria en la
          tienda Mustang 1550 o 1650 (abiertas de 9 h a 19 h)
          <br />
          <strong>Reserva</strong>: Mustang Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a>, Mustang Chef-lieu{" "}
          <a href="tel:+33788439696">07 88 43 96 96</a>
        </p>
      </div>
      <p>
        Lea las condiciones antes de reservar: según Mustang, el cliente no puede{" "}
        <strong>ni anular ni aplazar</strong> una salida en moto de nieve, y la inscripción solo
        es efectiva con el pago y la fianza, 24 horas antes de la salida. Solo Mustang puede
        anular o cambiar la fecha, sobre todo en caso de mal tiempo.
      </p>

      <h2>La velada inuit en iglú</h2>
      <p>
        Es la salida que conviene a todo el mundo, niños incluidos, porque nadie conduce. Se
        sale del acceso a pistas en un <strong>trineo remolcado por una moto de
        nieve</strong>, por un circuito reservado. Sigue un paseo corto y fácil por el bosque
        hasta el iglú, donde cada uno recibe un aperitivo-cena de productos locales, con vistas
        a las Aiguilles d'Arves y al mont Émy. El guía cuenta el pueblo y su historia, y luego
        el trineo devuelve al grupo a la estación, de noche.
      </p>
      <ul>
        <li>
          La oficina de turismo la describe como accesible a todas las edades. Las personas
          mayores o con movilidad reducida pueden ser llevadas directamente al iglú.
        </li>
        <li>
          Menús específicos y dietas adaptadas bajo petición: indíquelo al reservar.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Salida</strong>: acceso a pistas del Mollard, a unos 250 m del apartamento
          <br />
          <strong>Horarios</strong>: dos sesiones por noche, 18.30 h - 20 h o 20.30 h - 22 h,
          todos los días
          <br />
          <strong>Duración</strong>: 1 h 30
          <br />
          <strong>Tarifas</strong>: 59 € a partir de 11 años, 49 € para los menores de 11 años
          <br />
          <strong>Reserva</strong>:{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          («Soirée Inuit Igloo»), o por teléfono, Mustang Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a>
        </p>
      </div>
      <p>
        Para esta velada, las condiciones de Mustang establecen que toda anulación con menos de
        24 horas de antelación se factura íntegramente. Los menores deben ir acompañados de un
        adulto responsable.
      </p>

      <h2>La velada esquimal: moto de nieve y restaurante</h2>
      <p>
        La versión larga, <strong>solo los miércoles</strong>. Una iniciación al pilotaje en el
        mismo recorrido de 4 hectáreas, y luego una cena en un restaurante saboyano al pie de las
        pistas, elegido por Mustang. El nombre del restaurante no se publica.
      </p>
      <ul>
        <li>
          <strong>En el menú</strong>: kir de aperitivo, fondue o raclette a elegir con
          embutidos y ensalada, postre a elegir.
        </li>
        <li>
          <strong>En dúo</strong>, conductor y pasajero se intercambian a mitad de recorrido.
        </li>
        <li>
          <strong>Conductor</strong>: 18 años como mínimo; <strong>pasajero</strong>: 1,30 m
          como mínimo.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Cuándo</strong>: los miércoles, de 19 h a 22 h
          <br />
          <strong>Punto de encuentro</strong>: según la oficina de turismo, en la tienda
          Mustang 1550, en el Chef-lieu; pida que se lo confirmen al reservar
          <br />
          <strong>Tarifas</strong>: 130 € en solitario, 175 € en dúo (una moto de nieve para
          dos), salida en moto de nieve y comida incluidas
          <br />
          <strong>Reserva</strong>:{" "}
          <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
            mustangsport.lokki.rent
          </a>{" "}
          («Soirée Eskimo»), o Mustang 1650 en el Mollard{" "}
          <a href="tel:+33786344212">07 86 34 42 12</a> (si no, Mustang 1550:{" "}
          <a href="tel:+33788439696">07 88 43 96 96</a>)
        </p>
      </div>

      <h2>La fat bike eléctrica de noche, con la ESF</h2>
      <p>
        La fat bike es una BTT de neumáticos muy anchos; esta tiene una asistencia eléctrica
        potente e iluminación. La salida recorre los senderos de Albiez al caer la noche, guiada
        por Arnaud, monitor titulado, en grupos de 6 como máximo.
      </p>
      <ul>
        <li>
          <strong>Estatura mínima</strong>: 1,40 m. No se indica edad mínima.
        </li>
        <li>
          <strong>Ropa</strong>: ropa de esquí, botas de après-ski o de marcha, guantes (para
          cambiar de marcha y manejar el motor). Se aconseja el casco de esquí.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Salida</strong>: chalet ESF del Chef-lieu, 97 chemin de la Rua, a unos 2 km
          del apartamento
          <br />
          <strong>Horarios</strong>: 17.30 h - 19 h, todos los días
          <br />
          <strong>Tarifa</strong>: bajo petición
          <br />
          <strong>Reserva</strong>: ESF, oficina del Chef-lieu{" "}
          <a href="tel:+33479593177">04 79 59 31 77</a>
        </p>
      </div>
      <p>
        La fat bike rueda por los senderos; el{" "}
        <Link href="/es/guide/sunset-ride-albiez-vtt-pistes">Sunset Ride des Aiguilles</Link>,
        en cambio, baja por las pistas en BTT eléctrica después del último telesilla del jueves.
        Son dos salidas distintas, con dos organizadores distintos.
      </p>

      <h2>Y la velada trampero</h2>
      <ArticleImage
        src="blog/soiree-trappeur-mustang.jpg"
        alt="Carne a la brasa en una plancha con fuego de leña, de noche, durante la velada trampero"
        caption="La velada trampero de Mustang. Foto: Mustang Albiez."
      />
      <p>
        Mustang propone también, los miércoles y jueves por la noche, una velada con raquetas:
        lanzadera desde Albiez hasta Montrond, subida de unos 45 minutos con un acompañante de
        montaña hasta el chalet de alpage de la Broue (1 800 m), aperitivo-cena alrededor de los
        braseros y luego 3 km de bajada en trineo con frontal. Salida a las 18 h, regreso hacia
        las 22.30 h. A partir de 8 años, de 4 a 7 personas, 99 € por adulto y 79 € para los
        menores de 11 años, en{" "}
        <a href="https://mustangsport.lokki.rent/" target="_blank" rel="noopener noreferrer">
          mustangsport.lokki.rent
        </a>
        . En esta no hay moto de nieve.
      </p>

      <h2>Cuál elegir</h2>
      <ul>
        <li>
          <strong>Con niños pequeños</strong>: la velada en iglú, la única abierta a todas las
          edades, y con salida desde el Mollard.
        </li>
        <li>
          <strong>Entre adultos, para las sensaciones</strong>: la moto de nieve sola, o la
          velada esquimal si quiere cenar fuera el miércoles.
        </li>
        <li>
          <strong>Con adolescentes de más de 1,40 m</strong>: la fat bike. No pueden pilotar una
          moto de nieve antes de los 18 años, solo ir detrás.
        </li>
        <li>
          <strong>Para caminar un poco</strong>: la velada trampero.
        </li>
      </ul>
      <p>
        Los más pequeños tienen también los{" "}
        <Link href="/es/guide/chiens-de-traineau-albiez">trineos con perros</Link> de Les
        Contamines, durante el día, y el{" "}
        <Link href="/es/guide/albiez-c-show">Albiez C'Show</Link> del martes por la tarde
        durante las vacaciones escolares, gratis. Más ideas en{" "}
        <Link href="/es/guide/albiez-en-famille">Albiez en familia</Link>.
      </p>

      <h2>Reservar antes de la estancia</h2>
      <p>
        Los grupos son pequeños: 5 personas por salida de moto de nieve, 6 para la fat bike, una
        sola velada esquimal por semana. En una semana de vacaciones escolares, reserve al mismo
        tiempo que los <Link href="/es/guide/louer-ses-skis-a-albiez">esquís</Link> y las{" "}
        <Link href="/es/guide/cours-de-ski-esf-albiez">clases</Link>. Vístase como para
        esquiar: por la noche, a 1 600 m, enseguida hace mucho frío.
      </p>
      <p>
        Estas actividades dependen de la meteorología y de la nieve, y sus horarios pueden
        cambiar. En caso de duda, llame al profesional o a la oficina de turismo al{" "}
        <a href="tel:+33479593048">04 79 59 30 48</a>.
      </p>

      <p>
        Vea también:{" "}
        <Link href="/es/guide/chiens-de-traineau-albiez">los trineos con perros</Link>,{" "}
        <Link href="/es/guide/sunset-ride-albiez-vtt-pistes">
          el Sunset Ride en BTT por las pistas
        </Link>
        , <Link href="/es/guide/albiez-en-famille">Albiez en familia</Link> y{" "}
        <Link href="/es/esqui">la página de invierno del alojamiento</Link>.
      </p>
    </>
  );
}
