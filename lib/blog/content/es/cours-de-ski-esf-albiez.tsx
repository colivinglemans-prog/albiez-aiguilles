import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        La Escuela de Esquí Francesa de Albiez-Montrond cubre todas las edades, del club Piou-Piou desde los 3 años y
        medio a las clases para adultos. Un detalle cuenta más que todos los demás al reservar: la estación tiene{" "}
        <strong>dos puntos de encuentro</strong>, y desde Le Mollard hay que elegir el del Mollard.
      </p>

      <h2>La trampa del punto de encuentro</h2>
      <p>
        La ESF de Albiez reúne sus clases en dos sectores. Si se aloja en Le Mollard — es el caso de nuestro
        apartamento, a 250 m del acceso a pistas — hay que seleccionar obligatoriamente el{" "}
        <strong>encuentro ESF Mollard</strong> al reservar. Equivocarse significa empezar cada mañana con un trayecto
        en coche con niños en botas de esquí. El tipo de error que cuesta una semana.
      </p>
      <p>
        Dicho esto, un Mollard completo no es un callejón sin salida:{" "}
        <strong>el sector del Chef-lieu es accesible esquiando</strong>. Si su nivel lo permite, tome el telesilla de
        Les Échaux y baje hasta el Chef-lieu: estará calentado incluso antes de que empiece la clase, lo que no ocurre
        con quienes llegan en coche.
      </p>
      <p>
        La reserva es importante: eso supone saber bajar ya. Para un niño del club Piou-Piou o un principiante
        absoluto, la cita del Mollard sigue siendo la única cómoda, y el coche, el único recurso.
      </p>

      <h2>Las opciones por edad</h2>

      <h3>Club Piou-Piou — desde los 3 años y medio</h3>
      <p>
        El jardín de nieve acoge a los niños a partir de 3 años y medio, 4 años o 5 años según la fórmula. Se puede
        añadir una <strong>guardería</strong>, lo que amplía útilmente la franja de atención más allá de la clase.
      </p>

      <h3>Clases infantiles — de 6 a 12 años</h3>
      <p>
        La fórmula clásica, también con posibilidad de guardería complementaria. Es la edad en la que el{" "}
        <Link href="/es/guide/domaine-skiable-albiez-secteur-mollard">
          telesquí Polytre
        </Link>{" "}
        adquiere todo su sentido: varios puntos donde soltar la percha, con dificultades crecientes.
      </p>

      <h3>Clases para adolescentes y jóvenes — desde los 12 años</h3>
      <p>Grupos separados, lo que evita mezclar a un adolescente con niños de 7 años.</p>

      <h3>Clases para adultos</h3>
      <p>Colectivas o particulares, para retomar o para progresar.</p>

      <h2>Más allá del esquí alpino</h2>
      <p>La ESF de Albiez dirige también actividades que no se esperan de una escuela de esquí:</p>
      <ul>
        <li>
          <strong>Esquí sentado</strong>
        </li>
        <li>
          <strong>Raquetas de nieve</strong>
        </li>
        <li>
          <strong>Snake-gliss</strong> (bajada en trineos enganchados)
        </li>
        <li>
          <strong>Iniciación al biatlón</strong>
        </li>
        <li>
          <strong>Iniciación a la búsqueda de víctimas de aludes (ARVA)</strong> — una hora que cambia la mirada sobre
          la montaña, incluso cuando no se sale nunca de las pistas
        </li>
        <li>
          <strong>Bajada de antorchas</strong>, en particular durante el{" "}
          <Link href="/es/guide/albiez-c-show">Albiez C'Show</Link>
        </li>
      </ul>

      <h2>Reservar, y cuándo</h2>
      <p>
        Hay que reservar las clases de la ESF <strong>con antelación</strong>, por dos razones: la plaza y, sobre
        todo, el horario. Los turnos de la mañana se agotan primero, y una clase de final de tarde con un niño de
        5 años cansado no tiene el mismo rendimiento.
      </p>
      <p>
        Los forfaits pueden adquirirse <strong>al mismo tiempo que las clases</strong>, lo que evita una cola más el
        primer día. Otra opción: pedirlos en línea y recibirlos por correo antes de salir.
      </p>

      <div className="facts">
        <p>
          <strong>ESF Albiez-Montrond</strong> — encuentro Mollard, a 250 m del alojamiento.{" "}
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
        </p>
      </div>

      <h2>¿Y el cuidado de los más pequeños?</h2>
      <p>
        Además de la guardería de la ESF, la estación dispone de un centro de ocio y de una guardería infantil, lo
        suficiente para cubrir a los niños demasiado pequeños para esquiar. El detalle está en nuestro artículo{" "}
        <Link href="/es/guide/albiez-en-famille">Albiez-Montrond en familia</Link>.
      </p>
    </>
  );
}
