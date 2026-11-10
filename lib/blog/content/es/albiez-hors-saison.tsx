import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Datos externos tomados el 8 de noviembre de 2026: fuentes y nota de actualización
 * anual en la versión francesa.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        En primavera y en otoño, Albiez-Montrond vuelve a ser un pueblo de montaña. Los
        remontes están parados, parte de los comercios ha bajado la persiana y casi no hay
        nadie en los senderos. Esto es lo que sigue abierto, lo que no, y cómo organizar
        una estancia en el Mollard entre dos temporadas.
      </p>

      <h2>Lo que está cerrado</h2>
      <ul>
        <li>
          <strong>Los remontes</strong>. El dominio esquiable funciona del 19 de diciembre
          de 2026 al 21 de marzo de 2027. Antes y después, el telesilla de Les Échaux, a
          250 m del apartamento, no funciona.
        </li>
        <li>
          <strong>El Sherpa del acceso a pistas</strong>, la tienda más cercana al
          alojamiento. Su ficha indica que abre 7 días de 7 «en temporada»; este año,
          reabre el <strong>12 de diciembre</strong>. Para la primavera, su fecha de cierre
          no está publicada: infórmese antes de contar con ella.
        </li>
        <li>
          <strong>La tienda de la cooperativa quesera en Albiez</strong>: es una tienda de
          temporada, abierta solo en verano y en invierno.
        </li>
        <li>
          Parte de los <strong>restaurantes</strong> (los que siguen abiertos están más bien
          en el Chef-lieu: infórmese antes de subir), las tiendas de alquiler de esquís y
          la ESF. Las actividades de verano también: el baño en el{" "}
          <Link href="/es/guide/lac-du-mollard-baignade">lago del Mollard</Link> solo está
          vigilado en julio y agosto, y el{" "}
          <Link href="/es/guide/refuge-chalet-la-croe">refugio del Chalet d'la Croë</Link>{" "}
          solo abre de mediados de junio a mediados de septiembre.
        </li>
      </ul>

      <h2>Lo que sigue abierto</h2>

      <h3>La tienda de comestibles del Chef-lieu, todos los días del año</h3>
      <p>
        La tienda Sambuis Dufreney, en el Chef-lieu, a unos 2 km del apartamento, está{" "}
        <strong>abierta todos los días del año</strong>. Alimentación general, queso y
        embutidos al corte, gas, ferretería, primeros auxilios. El pan del Moulin Valentin
        se entrega allí cada día: es la solución para tener pan fresco fuera de temporada.
      </p>
      <div className="facts">
        <p>
          <strong>Tienda Sambuis Dufreney</strong>, Chef-lieu
          <br />
          <strong>Horarios</strong> (pueden cambiar): todos los días de 7:30 a 12:30 y de
          17 h a 19 h.
        </p>
      </div>

      <h3>La panadería, el fin de semana en primavera</h3>
      <p>
        El{" "}
        <Link href="/es/guide/boulangerie-moulin-valentin-albiez">Moulin Valentin</Link>,
        en el Chef-lieu, abre todos los días en invierno y en verano. En primavera, del 25
        de marzo al 25 de junio, solo abre el <strong>sábado y el domingo</strong>. Para el
        otoño, llame antes de bajar:{" "}
        <a href="tel:+33479593397">04 79 59 33 97</a>.
      </p>

      <h3>Saint-Jean-de-Maurienne, para la compra grande</h3>
      <p>
        Saint-Jean-de-Maurienne está en el camino, a <strong>18 km</strong> y de 20 a 25
        minutos del apartamento. Fuera de temporada, es allí donde hay que llenar el
        maletero <strong>antes de subir</strong>: Carrefour Market (gasolinera y
        lavandería) y Lidl. El detalle está en nuestro artículo{" "}
        <Link href="/es/guide/faire-ses-courses-a-albiez">hacer la compra en Albiez</Link>.
      </p>
      <p>
        Para el queso, la cooperativa del valle de los Arves tiene una tienda{" "}
        <strong>abierta todo el año</strong> en el centro de Saint-Jean, 52 rue de la
        République.
      </p>
      <div className="facts">
        <p>
          <strong>Fromagerie Aux Produits Savoyards</strong> (cooperativa del valle de los
          Arves)
          <br />
          52 rue de la République, 73300 Saint-Jean-de-Maurienne ·{" "}
          <a href="tel:+33479642245">04 79 64 22 45</a>
          <br />
          De lunes a sábado de 8:30 a 12:30 y de 14:30 a 19 h, el domingo de 9 h a 12 h
          (horarios publicados por la{" "}
          <a href={PROPERTY.links.cheeseCoop} target="_blank" rel="noopener noreferrer">
            cooperativa
          </a>
          , pueden cambiar).
        </p>
      </div>

      <h2>El tiempo: prever frío, a veces nieve</h2>
      <p>
        A 1 600 m, las noches son frías desde el otoño, y todavía frescas en primavera. El
        apartamento cuenta con <strong>calefacción eléctrica que se regula libremente</strong>:
        enciéndala nada más llegar si hace falta, sin preguntar.
      </p>
      <p>
        La primera nieve puede caer <strong>desde mediados de octubre</strong>, mucho antes
        de la apertura del dominio. En Saboya, los neumáticos de invierno o las cadenas son
        obligatorios del <strong>1 de noviembre al 31 de marzo</strong> (loi Montagne, la
        ley francesa de montaña). Para una estancia en octubre o en abril, mejor llevar
        cadenas o fundas de nieve en el maletero. Todo está explicado en nuestro artículo{" "}
        <Link href="/es/guide/pneus-neige-chaines-albiez">
          neumáticos de invierno y cadenas para subir a Albiez
        </Link>
        .
      </p>

      <h2>Qué hacer en primavera y en otoño</h2>

      <h3>Caminar desde el alojamiento</h3>
      <p>
        Varias de las{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">rutas señalizadas</Link> se hacen
        en cualquier estación mientras no haya nieve:
      </p>
      <ul>
        <li>
          <strong>La cruz del Châtel</strong>, 30 minutos de subida desde el chemin du
          Châtel, detrás de la residencia.
        </li>
        <li>
          <strong>La vuelta al lago del Mollard</strong>, 30 minutos, saliendo del
          alojamiento, frente a las Aiguilles d'Arves.
        </li>
        <li>
          <strong>La vuelta de Les Contamines</strong> (40 min) y{" "}
          <strong>la vuelta de La Cochette</strong> (3 h), saliendo del Chef-lieu.
        </li>
      </ul>
      <p>
        En primavera, la nieve se queda mucho tiempo en las alturas. El sendero de La
        Plaigne atraviesa canales de aludes: no lo tome mientras haya nieve en el suelo.
      </p>

      <h3>El bosque del Rival</h3>
      <p>
        El <Link href="/es/guide/foret-du-rival">bosque del Rival</Link>, que se atraviesa
        al subir a la estación, es la salida de la entretemporada. En primavera, los
        torrentes van llenos y las cascadas están en su máximo. En otoño, los colores, las
        setas y la berrea del ciervo.
      </p>

      <h3>Salir con un guía</h3>
      <p>
        Yves Vionnet, guía de media montaña instalado en Albiez, trabaja{" "}
        <strong>todo el año</strong>, también fuera de temporada: rutas a pie o con
        raquetas, fauna, flora y patrimonio. Es la forma más segura de salir de los
        senderos del pueblo cuando las condiciones cambian de un día para otro.
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

      <h3>Contemplar las Aiguilles d'Arves</h3>
      <p>
        El balcón del apartamento, orientado al suroeste, da a las{" "}
        <Link href="/es/guide/aiguilles-arves">Aiguilles d'Arves</Link>. El col du Mollard
        y la vuelta al lago ofrecen la misma vista sin esfuerzo. La subida a la Basse du
        Gerbier (2 578 m) es un itinerario de verano: fuera de temporada, la nieve y el
        frío la hacen mucho más comprometida. Pida consejo al guía antes de salir.
      </p>

      <h3>El col du Mollard en bicicleta</h3>
      <p>
        El <Link href="/es/guide/col-du-mollard-velo">col du Mollard</Link> (1 638 m) está
        a la salida de la aldea: 17 km de subida desde Saint-Jean-de-Maurienne, y la
        llegada está en su casa. Los grandes puertos más altos, como la Croix de Fer y el
        Glandon, están cerrados por la nieve una parte del año: compruebe que están abiertos
        antes de planearlos. La bicicleta se ata en el rellano cubierto o se guarda en el
        balcón (el guardaesquís es demasiado pequeño).
      </p>

      <h3>Un día en Turín</h3>
      <p>
        Fuera de temporada, es una buena idea de excursión:{" "}
        <Link href="/es/guide/turin-depuis-albiez">Turín</Link> está a unas 2 h en coche
        por el túnel del Fréjus, o a 1 h 56 en tren directo desde Saint-Jean-de-Maurienne.
      </p>

      <h2>La calma, y estancias más cortas</h2>
      <p>
        Fuera de temporada, se viene a Albiez por la calma: sin colas en el aparcamiento,
        sin ruido, los senderos para uno mismo. Los precios también suelen ser los más bajos
        del año.
      </p>
      <p>
        Las estancias son más flexibles: <strong>2 noches mínimo en general</strong>, del 20
        de marzo a mediados de diciembre (salvo del 2 de julio al 20 de agosto, cuando hacen
        falta 3 noches). Basta con un fin de semana largo. La llegada es{" "}
        <strong>a partir de las 16 h</strong>.
      </p>

      <div className="facts">
        <p>
          <strong>Reservar</strong> — disponibilidad y precios en tiempo real en{" "}
          <Link href="/es#reserver">la página del alojamiento</Link>.
          <br />
          <strong>Antes de subir</strong>: compra en Saint-Jean-de-Maurienne, cadenas o
          fundas de nieve en el maletero a partir de octubre.
          <br />
          <strong>Oficina de turismo</strong>: <a href="tel:+33479593048">04 79 59 30 48</a>,
          localizable todo el año.
        </p>
      </div>

      <p>
        Vea también:{" "}
        <Link href="/es/guide/quelle-semaine-skier-albiez">
          qué semana elegir para esquiar en Albiez
        </Link>
        , <Link href="/es/verano">la página de verano</Link> y{" "}
        <Link href="/es/esqui">la página de invierno del alojamiento</Link>.
      </p>
    </>
  );
}
