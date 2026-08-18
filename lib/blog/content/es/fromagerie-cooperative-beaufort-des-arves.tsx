import Link from "next/link";
import { PROPERTY } from "@/lib/property";

export default function Article() {
  return (
    <>
      <p className="lead">
        Es la parada imprescindible para quien quiera llevarse algo de la Maurienne — o simplemente comer bien allí. La
        Quesería Cooperativa del valle de los Arves produce un Beaufort AOP francamente bueno, y tiene una tienda en
        Albiez-Montrond.
      </p>

      <h2>Quién produce este queso</h2>
      <p>
        La cooperativa está instalada en el lugar llamado Belluard, en{" "}
        <strong>Saint-Sorlin-d'Arves</strong>, al otro lado del macizo. Recoge la leche de las explotaciones del valle
        de los Arves y la transforma allí mismo.
      </p>
      <p>
        El <strong>Beaufort AOP</strong> se elabora con <strong>leche cruda y entera</strong>, recogida en pastos que
        suben hasta los <strong>2500 metros</strong>, y después se cura de <strong>6 a 12 meses</strong> en bodega
        fresca y húmeda. La denominación tiene cincuenta años, y la casa está medalla de oro en el Concours Général
        Agricole de París.
      </p>

      <h2>Beaufort de verano o de invierno: no es el mismo queso</h2>
      <p>
        Es lo que hay que saber antes de llegar al mostrador. El Beaufort existe en{" "}
        <strong>dos versiones estacionales</strong>, según el periodo en que se recogió la leche:
      </p>
      <ul>
        <li>
          <strong>El Beaufort de verano</strong> viene de la leche de los pastos de altura, cuando las vacas pastan en
          altitud sobre una flora muy variada. Es más coloreado, más aromático, más complejo.
        </li>
        <li>
          <strong>El Beaufort de invierno</strong> viene de la leche producida en el valle. Es más suave, más regular.
        </li>
      </ul>
      <p>
        Ninguno de los dos es «mejor» en términos absolutos: el primero se degusta tal cual, el segundo funciona muy
        bien en la cocina. Pida los dos en el mostrador: se los harán probar.
      </p>

      <h2>Lo que hay además</h2>
      <p>La tienda no se detiene en el Beaufort. En la sección de quesos:</p>
      <ul>
        <li>
          <strong>Raclette de Savoie IGP</strong>, con una versión ahumada («Brezain») y otra con ajo de oso
        </li>
        <li>
          <strong>Fondue rallada 100 % Beaufort AOP</strong> — la mezcla ya preparada, que evita tener que dosificar
          tres quesos
        </li>
        <li>
          <strong>Tome des Bauges AOP</strong> y <strong>Reblochon laitier AOP</strong>
        </li>
        <li>
          <strong>Mantequilla de los Arves</strong>
        </li>
      </ul>
      <p>
        A eso se añaden embutidos, mermeladas y miel: lo suficiente para componer una tabla completa sin pasar por
        ningún otro sitio.
      </p>

      <h2>El interés cuando uno se aloja en Albiez</h2>
      <p>
        El apartamento está equipado con <strong>raclette, caquelon de fondue, piedra de asar y crepera</strong>. Es
        decir, todo lo necesario para transformar una compra en la cooperativa en la cena de esa misma noche — y es
        claramente mejor que una bolsa de supermercado.
      </p>
      <p>
        La lógica de la estancia se vuelve simple: la{" "}
        <Link href="/es/guide/faire-ses-courses-a-albiez">compra del día a día</Link> en el Sherpa del acceso a pistas
        o en el Carrefour Market de Saint-Jean, y el queso en la cooperativa.
      </p>

      <h2>Dónde comprarlo</h2>
      <p>
        La cooperativa mantiene <strong>ocho tiendas</strong> en la región, dos de ellas directamente útiles desde
        Albiez:
      </p>
      <ul>
        <li>
          <strong>Albiez-Montrond</strong> — la más cercana, sin salir del municipio.
        </li>
        <li>
          <strong>Saint-Jean-de-Maurienne</strong> — de camino, para combinar con la compra grande al subir o al bajar.
        </li>
      </ul>
      <p>
        Las otras seis están en Saint-Sorlin-d'Arves (en la propia quesería), en Le Corbier, La Toussuire,
        Saint-Michel-de-Maurienne, Valloire y el col du Galibier — práctico si pasa por allí durante una{" "}
        <Link href="/es/guide/col-du-mollard-velo">salida en bicicleta</Link>.
      </p>

      <h2>Pedir a domicilio después de la estancia</h2>
      <p>
        La cooperativa envía a la Francia metropolitana (Córcega excluida). Los pedidos se tratan el{" "}
        <strong>lunes</strong> y los envíos salen en Chronofresh a partir del <strong>martes</strong>. Los gastos de
        envío son gratuitos por encima de <strong>100 €</strong>.
      </p>
      <p>
        Es la solución para prolongar las vacaciones sin sobrecargar el maletero — o para reponer existencias en
        diciembre.
      </p>

      <div className="facts">
        <p>
          <strong>Fromagerie Coopérative de la vallée des Arves</strong>
          <br />
          Belluard, 73530 Saint-Sorlin-d'Arves
          <br />
          <a href="tel:+33479597016">04 79 59 70 16</a> · boutique@beaufortdesarves.com
          <br />
          <a href={PROPERTY.links.cheeseCoop} target="_blank" rel="noopener noreferrer">
            beaufortdesarves.com
          </a>{" "}
          — direcciones y horarios de las ocho tiendas, y tienda en línea
        </p>
      </div>
    </>
  );
}
