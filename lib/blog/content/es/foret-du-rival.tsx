import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        El bosque de Le Rival sube de los 1300 metros al col du Mollard, a 2000 metros. Setecientos metros
        de desnivel de coníferas, cascadas y torrentes, atravesados por senderos y recorridos de BTT — y
        habitados por una fauna con la que uno se cruza de verdad.
      </p>

      <h2>Dónde está</h2>
      <p>
        El bosque se extiende por varias aldeas del municipio de Albiez-Montrond. Empieza en el{" "}
        <strong>Collet d'en Haut</strong> y sube hasta el{" "}
        <Link href="/es/guide/col-du-mollard-velo">col du Mollard</Link>, pasando por La Colonne, Le Fregny,
        La Villette y el centro del pueblo.
      </p>
      <p>
        En la práctica, es el bosque que se atraviesa al subir a la estación: se recorre sin mirarlo
        necesariamente, cuando merece una salida por sí solo.
      </p>

      <h2>Lo que se ve</h2>
      <p>
        Está compuesto principalmente de <strong>coníferas</strong>, pero también hay algunas{" "}
        <strong>cascadas</strong>, y lo atraviesan varios torrentes a la altura de La Colonne y de La
        Villette.
      </p>
      <p>En cuanto a la fauna, la lista es larga y los encuentros reales:</p>
      <ul>
        <li>Ciervos y ciervas</li>
        <li>Corzos</li>
        <li>Ardillas</li>
        <li>Zorros</li>
      </ul>
      <p>
        Abunda también en <strong>setas</strong>: llegada la temporada, uno se cruza sobre todo con
        habitantes del lugar, cesta al brazo y discreción obligada sobre los sitios.
      </p>
      <p>
        En verano, <strong>rebaños de vacas</strong> pastan en sus claros. Es también lo que da al fondo
        sonoro del valle sus cencerros de alta montaña.
      </p>

      <h2>Recorrerlo</h2>
      <p>
        Varios <strong>senderos de excursión</strong> y <strong>recorridos de BTT</strong> lo atraviesan. Se
        puede pasear por él en todas las estaciones.
      </p>
      <p>
        <strong>Una precaución</strong>: estar atento a posibles caídas de árboles, sobre todo después de una
        racha de viento o de una nevada fuerte. Es un bosque de montaña, no un parque cuidado.
      </p>

      <h2>Cuándo ir</h2>
      <ul>
        <li>
          <strong>Primavera</strong>: los torrentes van llenos, las cascadas al máximo.
        </li>
        <li>
          <strong>Verano</strong>: la sombra de las coníferas es valiosa cuando la meseta aprieta, y los
          claros acogen a los rebaños.
        </li>
        <li>
          <strong>Otoño</strong>: las setas, los colores y la berrea del ciervo.
        </li>
        <li>
          <strong>Invierno</strong>: con raquetas, sin salirse de los itinerarios señalizados.
        </li>
      </ul>

      <h2>Ir acompañado</h2>
      <p>
        Yves Vionnet, guía de montaña establecido en Albiez, propone salidas guiadas sobre la fauna, la flora
        y el patrimonio local — y trabaja{" "}
        <strong>todo el año, temporada baja incluida</strong>. Es lo que transforma un bosque en una lectura
        del paisaje.
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
        Vea también{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">
          las seis rutas señalizadas de Albiez-Montrond
        </Link>{" "}
        y <Link href="/es/verano">la página de verano del alojamiento</Link>.
      </p>
    </>
  );
}
