import Link from "next/link";
import { PROPERTY } from "@/lib/property";

/*
 * Precios 2026-2027, tomados el 8 de noviembre de 2026 en station-albiez.com (portada y
 * /fr/tarifs2). Nota de actualización anual: ver la versión francesa.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Hasta el <strong>2 de diciembre de 2026 a las 23:59</strong>, la estación de Albiez
        vende su forfait de temporada a mitad de precio: 249 € para un adulto en lugar de
        497 €. El dominio abre del sábado 19 de diciembre de 2026 al domingo 21 de marzo de
        2027. Queda por saber a partir de cuántos días sale a cuenta — los precios por día y
        por semana responden.
      </p>

      <h2>Precios del forfait de temporada 2026-2027</h2>
      <ul>
        <li>
          <strong>Adulto</strong> (12 a 64 años): <strong>249 €</strong> en lugar de 497 €
        </li>
        <li>
          <strong>Niño</strong> (5 a 11 años): <strong>178 €</strong> en lugar de 355 €
        </li>
        <li>
          <strong>Sénior</strong> (65 a 74 años): <strong>228 €</strong> en lugar de 457 €
        </li>
        <li>
          <strong>Menores de 5 años y mayores de 75</strong>: forfait gratuito, que se
          recoge en taquilla con un justificante de edad
        </li>
      </ul>
      <p>
        Atención: un chico de 12 años ya paga la tarifa de adulto. El descuento se aplica
        automáticamente en la cesta en línea hasta la fecha límite.
      </p>

      <h2>Con qué compararlo</h2>
      <p>Los forfaits de referencia, en tarifa adulto / niño / sénior:</p>
      <ul>
        <li>
          <strong>Día</strong>: 32,50 € / 27,50 € / 30 €
        </li>
        <li>
          <strong>6 días</strong>: 177 € / 140 € / 158 €
        </li>
        <li>
          <strong>8 días</strong>: 215 € / 168 € / 192 €
        </li>
        <li>
          <strong>Fin de semana</strong> (sábado y domingo): 40,50 € / 36,50 € / 38,50 €
        </li>
        <li>
          <strong>Sábado</strong>: 14 € para todos comprándolo en línea antes del miércoles
          a las 0:00 (es decir, el martes por la noche como tarde), 16 € si no
        </li>
      </ul>

      <h2>A partir de cuándo sale a cuenta</h2>

      <h3>Al precio de oferta: bastan dos semanas</h3>
      <p>
        A 249 €, el forfait de adulto equivale a algo menos de <strong>ocho días</strong> a
        tarifa completa. En la práctica:
      </p>
      <ul>
        <li>
          <strong>Una semana</strong> (6 días, 177 €): el forfait de temporada no compensa.
        </li>
        <li>
          <strong>Una semana y un fin de semana</strong> (177 + 40,50 = 217,50 €):
          tampoco.
        </li>
        <li>
          <strong>Dos semanas</strong> (2 × 177 = 354 €): el forfait de temporada ahorra
          105 € por adulto.
        </li>
        <li>
          <strong>Siete fines de semana</strong> (7 × 40,50 = 283,50 €): sale a cuenta a
          partir del séptimo — seis fines de semana cuestan 243 €.
        </li>
      </ul>
      <p>
        La misma lógica vale para un niño: 178 € frente a 140 € la semana, así que compensa
        desde la segunda semana (280 €). Para un sénior, 228 € frente a 158 €: misma
        conclusión.
      </p>

      <h3>A precio completo: hacen falta tres semanas</h3>
      <p>
        A 497 €, dos semanas (354 €) ya no bastan; hacen falta tres (531 €). El forfait de
        temporada a precio completo es para quien vive allí o casi. La fecha del 2 de
        diciembre no es un detalle: divide por dos el umbral de rentabilidad.
      </p>

      <h3>Cuándo no sirve: una sola estancia de una semana</h3>
      <p>
        Para <strong>una sola estancia</strong> de una semana, o algo más, el forfait de
        temporada no compensa: ocho días seguidos cuestan 215 € con el forfait de 8 días,
        nueve días 247,50 € (8 días + un día), menos que los 249 € del de temporada. Más
        allá, o en cuanto los días se reparten en varias estancias, vuelve a ganar. Y para algunos sábados
        sueltos, el sábado a 14 € en línea gana a todo lo demás.
      </p>

      <h2>Para una familia</h2>
      <p>
        La estación ofrece un <strong>Pack Familia 6 días</strong> (dos adultos y dos
        jóvenes de 5 a 17 años) a 604 € en línea — comprándolo como mínimo tres días antes
        del primer día de esquí — y 619 € en taquilla. Es con él con lo que hay que comparar
        el forfait de temporada:
      </p>
      <ul>
        <li>
          Dos adultos y dos niños de 5 a 11 años con forfait de temporada en oferta: 2 × 249
          + 2 × 178 = <strong>854 €</strong>.
        </li>
        <li>
          La misma familia con el Pack Familia: 604 € por una semana,{" "}
          <strong>1208 € por dos</strong>.
        </li>
      </ul>
      <p>
        Una semana: el pack. Dos semanas o más: el forfait de temporada, con algo más de 350 € de
        diferencia. Con dos adolescentes de 12 a 17 años, que cuentan como adultos en el
        forfait de temporada (4 × 249 = 996 €), la conclusión no cambia.
      </p>

      <h2>Antes de pedirlo</h2>
      <ul>
        <li>
          Se piden una <strong>foto de carné reciente</strong> (sin gorro ni gafas de sol) y
          un <strong>justificante de edad</strong>, en línea y en taquilla.
        </li>
        <li>
          El forfait va en una tarjeta manos libres recargable en línea. Se recoge en las
          taquillas del <strong>Chef-lieu</strong> o de <strong>Le Mollard</strong> — la de
          Le Mollard está en el acceso a pistas, a 250 m del apartamento.
        </li>
        <li>El seguro Carré Neige es opcional, en la cesta.</li>
        <li>
          La página de la estación pone un asterisco en «dominio esquiable» sin decir qué
          abarca. El forfait de temporada vale para el dominio de Albiez; para un día en{" "}
          <a href={PROPERTY.links.sybelles} target="_blank" rel="noopener noreferrer">
            Les Sybelles
          </a>
          , la estación vende aparte un forfait «5 días Albiez + 1 día Sybelles» (200 € adulto, 166 € niño), con acceso por Saint-Jean-d'Arves.
        </li>
      </ul>
      <div className="facts">
        <p>
          <strong>Comprar en línea</strong> —{" "}
          <a href={PROPERTY.links.resort} target="_blank" rel="noopener noreferrer">
            station-albiez.com
          </a>
          <br />
          Los precios de arriba son los que mostraba la estación el 8 de noviembre de 2026:
          el importe que cuenta es el de la cesta.
        </p>
      </div>

      <p>
        Ver también:{" "}
        <Link href="/es/guide/domaine-skiable-albiez-secteur-mollard">
          esquiar en Albiez desde el sector Le Mollard
        </Link>
        , <Link href="/es/guide/louer-ses-skis-a-albiez">alquilar esquís en Albiez</Link>,{" "}
        <Link href="/es/guide/cours-de-ski-esf-albiez">las clases de la ESF</Link> y{" "}
        <Link href="/es/esqui">la página de invierno del alojamiento</Link>.
      </p>
    </>
  );
}
