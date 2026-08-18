import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        En el centro de Albiez-Montrond, Le Moulin Valentin lo prepara todo en el local:
        panes, bollería, tartas, quiches, bocadillos. Y detrás del escaparate, una historia
        que empieza en 1694 — quizá antes.
      </p>

      <h2>Una historia que empieza en 1694</h2>
      <p>
        Le Moulin Valentin no es de ayer. La historia del lugar se remonta a{" "}
        <strong>1694</strong> en Albiez-Montrond, y probablemente más atrás. El resto se
        cuenta empujando la puerta: es el tipo de comercio del que se sale con más
        información que pan.
      </p>

      <h2>Lo que se encuentra</h2>
      <p>Todas las recetas son artesanales y se preparan en el local:</p>
      <ul>
        <li>
          <strong>Panes</strong> artesanales y panes especiales
        </li>
        <li>
          <strong>Bollería</strong> y pasteles
        </li>
        <li>
          <strong>Tartas dulces</strong> y postres
        </li>
        <li>
          <strong>Tostas, quiches y bocadillos</strong>
        </li>
        <li>
          <strong>Bebidas calientes y frías</strong> (sin alcohol)
        </li>
      </ul>

      <h2>Las especialidades para el picnic y el aperitivo</h2>
      <p>
        Aquí es donde la panadería resulta útil más allá del desayuno. Tres cosas que
        conviene saber:
      </p>
      <ul>
        <li>
          <strong>El pâté en croûte</strong> — la comida de una{" "}
          <Link href="/es/guide/randonnees-balisees-albiez">ruta</Link> resuelta en una sola
          compra.
        </li>
        <li>
          <strong>El pain yéti</strong>: una baguette con panceta y queso. No necesita
          comentarios.
        </li>
        <li>
          <strong>Las tartaletas de almendra y de manzana</strong>, para la vuelta.
        </li>
      </ul>

      <div className="facts">
        <p>
          <strong>Panadería Moulin Valentin</strong>
          <br />
          50 route du Mollard, Chef-lieu, 73300 Albiez-Montrond
          <br />
          <a href="tel:+33479593397">04 79 59 33 97</a>
        </p>
        <p>
          <strong>Horarios</strong> (pueden cambiar): del 17/12 al 19/03 y del 01/07 al
          21/08, todos los días de 7 a 19 h. Del 25/03 al 25/06, sábados y domingos.
        </p>
      </div>

      <h2>¿No le apetece bajar al pueblo?</h2>
      <p>
        El pan fresco del Moulin Valentin se entrega todos los días en la{" "}
        <Link href="/es/guide/faire-ses-courses-a-albiez">
          tienda Sambuis Dufreney
        </Link>
        , y el Sherpa del acceso a pistas — a 250 m del alojamiento — también vende pan. Se
        puede pasar perfectamente una semana sin coger el coche.
      </p>
    </>
  );
}
