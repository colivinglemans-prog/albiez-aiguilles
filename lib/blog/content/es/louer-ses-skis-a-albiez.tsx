import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond cuenta con cuatro tiendas de alquiler de material: tres en el acceso a pistas del
        Mollard, a 250 m del alojamiento, y una en el centro del pueblo. Todas ofrecen un descuento a quien
        reserva en línea antes de llegar. Esto es lo que cubre cada una.
      </p>

      <h2>En el acceso a pistas del Mollard (250 m del alojamiento)</h2>

      <h3>Sport 2000 Aux Deux Frères — nuestra tienda</h3>
      <p>
        <strong>Es donde alquilamos nuestro propio material</strong>, y es la que recomendamos en primer
        lugar. El consejo es bueno, la acogida también, y todo se resuelve allí mismo sin subir al pueblo.
      </p>
      <p>
        La más grande de las tres: <strong>135 m²</strong> de alquiler, taller de esquís y espacio de venta
        (material, accesorios, ropa). El catálogo es amplio: esquí alpino, freeride, esquí de travesía, esquí
        de fondo, snowboard, raquetas, botas, trineo para adultos, snowscoot, portabebés.
      </p>
      <p>
        Es la dirección que hay que recordar si busca algo un poco especial, o si tiene que equipar a un grupo
        entero con necesidades distintas.
      </p>
      <div className="facts">
        <p>
          <strong>Reservar en línea</strong> —{" "}
          <a href={PROPERTY.links.skiRental} target="_blank" rel="noopener noreferrer">
            location-ski.sport2000.fr — Aux Deux Frères
          </a>
          <br />
          La tarifa en línea es más ventajosa que en el mostrador, y solo queda probarse las botas en la
          tienda.
        </p>
      </div>

      <h3>Skiset Ski Attitude</h3>
      <p>
        El Skiset más cercano al alojamiento. Alquiler y mantenimiento de esquís y snowboard, con espacio de
        venta: material de esquí en invierno, de senderismo en verano. Descuento interesante reservando en
        línea.
      </p>

      <h3>Skimium — Mustang Sports</h3>
      <p>
        Con base en el centro del pueblo pero presente por la tarde en el acceso a pistas del Mollard, lo que
        lo convierte en una opción práctica al volver de la pista. Más allá del esquí, Mustang Sports ofrece
        moto de nieve, tardes en iglú, una escuela de ciclismo y BTT eléctricas.
      </p>

      <h2>En el centro del pueblo (2 km)</h2>

      <h3>Skiset — Albiez Sports</h3>
      <p>
        Un espacio de venta de <strong>100 m²</strong>, alquiler y mantenimiento de esquís. Es también la
        tienda que conviene conocer para el verano: BMX, patinetes eléctricos y salidas con acompañantes.
      </p>

      <h2>Reservar en línea: el único truco de verdad</h2>
      <p>
        Las cuatro tiendas aplican un descuento a las reservas hechas en línea antes de llegar. La diferencia
        no es anecdótica en una semana para cuatro o seis personas, y el beneficio es doble:
      </p>
      <ul>
        <li>
          <strong>La tarifa</strong>, reducida en todos los casos.
        </li>
        <li>
          <strong>El tiempo</strong>: el primer día de vacaciones, la cola en la tienda de alquiler es el peor
          momento de la semana. Material reservado = paso rápido para probarse las botas.
        </li>
      </ul>
      <p>
        La misma lógica sirve para los forfaits: pueden comprarse con las{" "}
        <Link href="/es/guide/cours-de-ski-esf-albiez">clases de esquí</Link> o pedirse en línea y recibirse
        por correo, lo que evita la carrera de la primera mañana.
      </p>

      <h2>Lo que queda por decidir en la tienda</h2>
      <p>
        Lo único que se resuelve realmente en el local son las botas — una prueba vale más que cualquier tabla
        de tallas — y el ajuste de las fijaciones, que necesita su peso y su nivel. Cuente veinte minutos, no
        una mañana.
      </p>

      <p>
        Vea también:{" "}
        <Link href="/es/guide/domaine-skiable-albiez-secteur-mollard">
          esquiar en Albiez desde el sector Le Mollard
        </Link>{" "}
        y <Link href="/es/esqui">la página de invierno del alojamiento</Link>.
      </p>
    </>
  );
}
