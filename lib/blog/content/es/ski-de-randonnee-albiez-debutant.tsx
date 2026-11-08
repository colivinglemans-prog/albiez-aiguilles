import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Datos tomados el 8 de noviembre de 2026 en explore-maurienne.com y en la guía PDF de la
 * oficina de turismo. Fuentes y notas de actualización: ver la versión francesa.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        El esquí de travesía consiste en subir a fuerza de piernas, con pieles de foca bajo los
        esquís, y luego volver a bajar esquiando. Albiez tiene dos itinerarios balizados, uno de
        los cuales sale del acceso a pistas del Mollard, a 250 m del apartamento, y que la
        oficina de turismo presenta como una primera experiencia. Así es como hay que plantearlo
        cuando nunca se ha hecho.
      </p>

      <h2>El nivel necesario</h2>
      <p>
        La subida pide más fondo que técnica. La bajada, en cambio, se hace esquiando: para sus
        salidas, la ESF exige{" "}
        <strong>saber bajar una pista roja con cualquier tipo de nieve</strong>. Es una buena
        referencia antes de lanzarse, incluso solo. Para un esquiador que todavía es
        principiante en pista, más vale esperar una temporada.
      </p>

      <h2>Los dos itinerarios balizados</h2>

      <h3>Subida a les Aplanes — la primera salida, al pie del apartamento</h3>
      <p>
        Salida en el <strong>acceso a pistas del Mollard</strong> (1 619 m), a 250 m a pie. Se
        bordea el dominio esquiable en dirección a les Aplanes, a lo largo de{" "}
        <strong>unos 2 km</strong> y <strong>unos 250 m de desnivel</strong>. Cuente{" "}
        <strong>1 h 30</strong>. La subida pasa por zonas poco expuestas a los aludes, y la
        bajada se hace por las pistas. A la llegada, vistas a las Aiguilles d'Arves y al glaciar
        de l'Étendard.
      </p>
      <p>
        No se sube a lo alto del telesquí de les Aplanes (2 100 m): el itinerario se detiene
        mucho más abajo, y más allá el desnivel se vuelve claramente más deportivo. Eso es lo
        que la convierte en una buena salida de descubrimiento, para encajar una mañana o al
        final de una jornada de esquí, y que se puede hacer con esquiadores alpinos que le
        esperan arriba.
      </p>

      <h3>Subida al Crêt de l'âne — un sector más salvaje</h3>
      <p>
        Salida en el <strong>aparcamiento del Crêt de l'âne</strong>, en la carretera de
        Albiez-le-Jeune (1 497 m). Hay que coger el coche desde el Mollard. El recorrido mide{" "}
        <strong>de 3,6 a 3,7 km</strong>, para unos <strong>400 m de desnivel</strong> según la
        guía de la oficina de turismo, en <strong>2 h 30</strong>. Sube en zigzag bajo las
        laderas de Casse Massion, por el antiguo sector de La Blanche, cuyo remonte se desmontó
        en 2020. Poca gente, y vistas a los corredores norte del mont Emy, el pueblo y el
        glaciar de l'Étendard.
      </p>
      <p>
        Más largo y más empinado que les Aplanes: mejor guardarlo para una segunda salida. Para
        bajar, cuando este sector está abierto, se puede llegar esquiando a la parte baja del
        telesilla del Crêt de l'âne. Es una zona baja del dominio, que no abre toda la
        temporada: todo depende de la innivación.
      </p>

      <div className="facts">
        <p>
          <strong>Itinerarios</strong>: abiertos todos los días, según la innivación y la
          meteorología
          <br />
          <strong>Bajada</strong>: por las pistas, únicamente durante la apertura del dominio
          (9 h - 17 h)
          <br />
          <strong>Guía y trazado GPX</strong>:{" "}
          <a
            href="https://www.explore-maurienne.com/activites/activites-neige/ski-de-rando/"
            target="_blank"
            rel="noopener noreferrer"
          >
            explore-maurienne.com
          </a>{" "}
          y aplicación Explore Maurienne
          <br />
          <strong>Oficina de turismo</strong>:{" "}
          <a href="tel:+33479593048">04 79 59 30 48</a>
        </p>
      </div>

      <h2>Las normas en el dominio</h2>
      <p>La guía de la oficina de turismo las resume así:</p>
      <ul>
        <li>
          <strong>La subida sigue las balizas</strong> «esquí de travesía», no las pistas.
        </li>
        <li>
          <strong>La bajada se hace por las pistas de esquí alpino</strong>, durante el horario
          de apertura del dominio, de 9 h a 17 h.
        </li>
        <li>
          <strong>Fuera de ese horario, las pistas están prohibidas</strong>, y de noche aún
          más: es el momento en que pasan las máquinas pisanieves, a veces sujetas por un cable
          de cabrestante tendido de través en la pendiente. Nada de subir con frontal por la
          noche por las pistas, sencillamente para no cruzarse con una pisanieves en la
          oscuridad.
        </li>
      </ul>
      <p>
        El dominio abre del 19 de diciembre de 2026 al 21 de marzo de 2027. Fuera de esas
        fechas, ya no hay pistas pisadas ni vigilancia para la bajada.
      </p>

      <h2>La seguridad, incluso en un itinerario balizado</h2>
      <p>
        Los dos itinerarios están <strong>balizados pero no asegurados</strong>: no se realiza
        en ellos ningún desencadenamiento preventivo de aludes. Va usted bajo su propia
        responsabilidad. Antes de cada salida:
      </p>
      <ul>
        <li>
          Consultar la meteorología, el estado de la nieve y el{" "}
          <strong>boletín de riesgo de aludes</strong> (BRA); informarse en el servicio de
          pistas y seguir sus indicaciones.
        </li>
        <li>
          Llevar el material mínimo: <strong>ARVA, pala y sonda</strong>, y saber utilizarlos.
        </li>
        <li>
          Decir a alguien qué itinerario toma y a qué hora piensa volver. No dejarse sorprender
          por la noche.
        </li>
        <li>
          Aplazar la salida si el tiempo empeora.
        </li>
        <li>
          En caso de accidente: <a href="tel:112">112</a>.
        </li>
      </ul>

      <h2>El material</h2>
      <p>
        Hacen falta esquís de travesía con sus fijaciones, pieles de foca, botas adecuadas y
        bastones telescópicos, además del trío ARVA, pala, sonda. No hace falta comprar para una
        primera vez: <strong>Sport 2000 Aux Deux Frères</strong>, en el acceso a pistas del
        Mollard a 250 m, alquila material de esquí de travesía. Vea{" "}
        <Link href="/es/guide/louer-ses-skis-a-albiez">alquilar los esquís en Albiez</Link>;
        pregunte en el mostrador qué incluye el alquiler.
      </p>
      <p>
        Por la noche, los esquís se guardan en el armario privado, en el rellano, justo al lado
        de la puerta del apartamento.
      </p>

      <h2>Empezar con un profesional</h2>
      <p>
        Es lo más sencillo para una primera vez: se aprende a poner las pieles, a hacer una
        vuelta María en una pendiente y a utilizar un ARVA. Se proponen cuatro fórmulas con
        salida desde Albiez.
      </p>

      <h3>Iniciación al esquí de travesía con la ESF</h3>
      <p>
        Para descubrir el material y su uso: pieles, ARVA, sonda y pala, orientación, bajada
        controlada, empezando por desniveles pequeños. Grupo de{" "}
        <strong>2 a 6 personas</strong>, material de seguridad incluido (ARVA, pala, sonda). La
        oficina de turismo la anuncia del 19 de diciembre de 2026 al 21 de marzo de 2027, todos
        los días de 15 h a 17 h o bajo petición.
      </p>

      <h3>Salida de esquí de travesía a la carta con la ESF</h3>
      <p>
        La continuación lógica, en un terreno más salvaje, con un itinerario elegido según la
        meteorología y el nivel del grupo (<strong>de 3 a 6 personas</strong>). Mismo nivel
        exigido, mismo material de seguridad incluido. Anunciada todos los días de 15 h a 18 h o
        bajo petición, en el mismo periodo.
      </p>
      <p>
        Las dos fórmulas de la ESF salen del chalet ESF del Mollard, en el acceso a pistas, a
        250 m del apartamento. La web de la ESF no precisa si los esquís de travesía están
        incluidos: hay que preguntarlo al reservar.
      </p>
      <div className="facts">
        <p>
          <strong>ESF Albiez</strong> — tarifa bajo petición
          <br />
          Oficina del Mollard: <a href="tel:+33479593180">04 79 59 31 80</a>
          <br />
          Oficina del Chef-lieu: <a href="tel:+33479593177">04 79 59 31 77</a>
          <br />
          <a href={PROPERTY.links.esf} target="_blank" rel="noopener noreferrer">
            esfalbiez.fr
          </a>
        </p>
      </div>

      <h3>Clase con Valentin Jullien, monitor independiente</h3>
      <p>
        Una jornada de esquí de travesía para <strong>5 personas como máximo</strong>, para
        descubrirlo o para practicar, en Albiez, en Les Sybelles, en Les Karellis o en otro
        lugar de la Maurienne. Anunciada todos los días del 19 de diciembre de 2026 al 28 de
        marzo de 2027, o bajo petición.
      </p>
      <div className="facts">
        <p>
          <strong>Valentin Jullien</strong> — tarifa bajo petición
          <br />
          <a href="tel:+33618092418">06 18 09 24 18</a>
        </p>
      </div>

      <h3>Salida con Ludovic, guía de alta montaña</h3>
      <p>
        Media jornada o jornada completa, por los itinerarios fuera de pista del valle, con el
        material de seguridad incluido (ARVA, pala, sonda). Más bien para una segunda o una
        tercera salida, una vez adquiridas las bases. Bajo petición, reserva obligatoria.
      </p>
      <div className="facts">
        <p>
          <strong>Ludovic Gaboriaud, guía de alta montaña</strong> — tarifa bajo petición
          <br />
          <a href="tel:+33613845277">06 13 84 52 77</a>
        </p>
      </div>

      <p>
        Los horarios publicados por la oficina de turismo no están garantizados y el programa
        puede cambiar: confírmelo con el profesional o con la oficina
        (<a href="tel:+33479593048">04 79 59 30 48</a>) antes de organizarse.
      </p>

      <p>
        Vea también:{" "}
        <Link href="/es/guide/domaine-skiable-albiez-secteur-mollard">
          esquiar en Albiez desde el sector Le Mollard
        </Link>
        , <Link href="/es/guide/louer-ses-skis-a-albiez">alquilar los esquís en Albiez</Link>,{" "}
        <Link href="/es/guide/cours-de-ski-esf-albiez">las clases de la ESF</Link> y{" "}
        <Link href="/es/esqui">la página de invierno del alojamiento</Link>.
      </p>
    </>
  );
}
