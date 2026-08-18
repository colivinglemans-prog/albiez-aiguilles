import Link from "next/link";
import { PROPERTY } from "@/lib/property";
import ArticleImage from "@/lib/blog/ArticleImage";

export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond tiene con qué vivir sin bajar al valle: un supermercado en el acceso a pistas, una tienda de
        alimentación y una panadería en el centro del pueblo. Pero para llegar a Albiez se pasa necesariamente por
        Saint-Jean-de-Maurienne, y es allí donde hay que hacer la compra grande.
      </p>

      <h2>El buen método: lo grueso en Saint-Jean, el resto en el pueblo</h2>
      <p>
        Saint-Jean-de-Maurienne está de camino, a unos <strong>30 km</strong> y{" "}
        <strong>20 minutos</strong> de Albiez. Allí hay un <strong>Carrefour Market</strong> (con servicio de
        recogida, lo que permite pedir desde casa y cargar en diez minutos) y un <strong>Lidl</strong>.
      </p>
      <p>
        Conviene saberlo: <strong>gasolinera y lavandería</strong> en el Carrefour Market. En una estancia de una
        semana con ropa de esquí, la lavandería no es un detalle.
      </p>
      <p>
        Una vez arriba, los comercios del pueblo cubren todo lo demás: el pan, los olvidos, el queso, el aperitivo.
      </p>

      <h2>En el acceso a pistas del Mollard — el Sherpa</h2>
      <p>
        Es <strong>la tienda más cercana al alojamiento</strong>, a 250 m, y está{" "}
        <strong>directamente en el acceso a pistas</strong>. Eso cambia por completo su uso: no es una compra que se
        planifica, es una parada de dos minutos{" "}
        <strong>de vuelta de esquiar</strong>, con los esquís en la mano, para el pan del día siguiente o lo que falta
        para la cena.
      </p>
      <p>
        Alimentación y droguería, con <strong>posibilidad de entrega</strong>. En el local: venta de pan, carnicería y
        embutidos, queso al corte, productos regionales.
      </p>
      <ArticleImage
        src="blog/sherpa-albiez-montrond-interieur.jpg"
        alt="Interior del Sherpa de Albiez-Montrond: la sección de carnicería y embutidos y los pasillos de la tienda"
        caption="La sección de frescos del Sherpa de Albiez-Montrond, en el acceso a pistas del Mollard."
      />
      <div className="facts">
        <p>
          <strong>Horarios</strong> — varían según la temporada y se mantienen actualizados en la ficha de la tienda:{" "}
          <a href={PROPERTY.links.sherpa} target="_blank" rel="noopener noreferrer">
            sherpa.net — Albiez-Montrond
          </a>
        </p>
      </div>
      <p>
        Es también la mejor dirección para llevarse algo que no se encuentra en una gran superficie:
      </p>
      <ul>
        <li>
          <strong>Las salchichas de vacuno secas caseras</strong> de Sandrine, elaboradas allí mismo: la especialidad
          de la tienda, temible en el aperitivo.
        </li>
        <li>El alforfón de Saint-Jean.</li>
        <li>La miel de un apicultor de Albiez.</li>
        <li>Las cervezas de Modane y de Valloire.</li>
        <li>El génépi de una pequeña destilería.</li>
      </ul>

      <h2>En el centro del pueblo — la tienda Sambuis Dufreney</h2>
      <p>
        Un pequeño supermercado en el corazón del pueblo, instalado en lo que antaño fue una granja, rehabilitada como
        tienda de alimentación tradicional. Este comercio familiar está{" "}
        <strong>abierto todos los días del año</strong>, una frase que en la montaña tiene sentido.
      </p>
      <p>
        Se encuentra alimentación general, embutidos y queso al corte, ultramarinos, productos regionales, gas,
        ferretería y primeros auxilios. El pan fresco del{" "}
        <Link href="/es/guide/boulangerie-moulin-valentin-albiez">Moulin Valentin</Link> se entrega allí todos los
        días.
      </p>
      <div className="facts">
        <p>
          <strong>Horarios</strong> (pueden cambiar): todos los días de 7.30 a 12.30 h, y después de 17 a 19 h — y de
          16 a 19 h del 3 de julio al 3 de septiembre.
        </p>
      </div>

      <h2>En el centro del pueblo — la panadería</h2>
      <p>
        Le Moulin Valentin ofrece panes, bollería, tartas dulces, bebidas calientes y frías, tostas, quiches y
        bocadillos.{" "}
        <Link href="/es/guide/boulangerie-moulin-valentin-albiez">
          Su historia merece un artículo propio.
        </Link>
      </p>

      <h2>Llevarse queso: la cooperativa</h2>
      <p>
        Para volver con algo que prolongue las vacaciones, la parada es la{" "}
        <Link href="/es/guide/fromagerie-cooperative-beaufort-des-arves">
          Quesería Cooperativa del valle de los Arves
        </Link>
        , que tiene una tienda en Albiez-Montrond. Su <strong>Beaufort AOP</strong> es excelente, y la elección va
        mucho más allá: quesos, embutidos, mermeladas, miel.
      </p>

      <h2>Lo que hay que traer</h2>
      <p>
        Algunos consumibles no están incluidos en el apartamento y se encuentran mucho más baratos en el valle:
        pastillas de lavavajillas, bolsas de basura de 50 L, papel higiénico y cápsulas Nespresso. Para meter en el
        maletero antes de subir: el detalle está en{" "}
        <Link href="/es#appartement">la página del alojamiento</Link>.
      </p>
    </>
  );
}
