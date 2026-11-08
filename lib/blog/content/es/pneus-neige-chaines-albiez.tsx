import Link from "next/link";

/*
 * Normativa tomada el 8 de noviembre de 2026 (savoie.gouv.fr y service-public.gouv.fr):
 * fuentes y nota de actualización anual en la versión francesa.
 */
export default function Article() {
  return (
    <>
      <p className="lead">
        Albiez-Montrond está a 1 600 m, y en Saboya el equipamiento de invierno es
        obligatorio en todas las carreteras del <strong>1 de noviembre al 31 de marzo</strong>.
        Neumáticos de invierno, cadenas o fundas de nieve: esto es lo que dice la norma, lo
        que hay que llevar en el maletero y cómo es la subida desde
        Saint-Jean-de-Maurienne.
      </p>

      <h2>Lo que dice la loi Montagne en Saboya</h2>
      <p>
        Del 1 de noviembre al 31 de marzo, todo coche que circule por Saboya debe llevar, a
        elegir:
      </p>
      <ul>
        <li>
          <strong>cuatro neumáticos de invierno con el marcado 3PMSF</strong> (el símbolo de
          la montaña de tres picos con un copo de nieve);
        </li>
        <li>
          o, en el maletero, <strong>cadenas metálicas o fundas de nieve</strong> para al
          menos dos ruedas motrices.
        </li>
      </ul>
      <p>
        La obligación cubre todo el departamento, no solo las estaciones. Desde el 1 de
        noviembre de 2024, solo los neumáticos 3PMSF eximen de las cadenas: unos neumáticos
        marcados únicamente M+S, o unos neumáticos «4 estaciones» sin el símbolo, ya no son
        suficientes. Con ellos, hay que llevar cadenas o fundas a bordo. Los vehículos con
        neumáticos de clavos están exentos.
      </p>
      <p>
        Antes de comprar, compruebe que las cadenas o las fundas corresponden a la medida de
        sus neumáticos y que queda espacio suficiente entre la rueda y la carrocería.
      </p>

      <h3>Las señales que hay que conocer</h3>
      <ul>
        <li>
          <strong>La señal de entrada de zona (B58)</strong>: marca el inicio de una zona
          donde el equipamiento de invierno es obligatorio, con un panel complementario que
          recuerda el periodo (1 de noviembre - 31 de marzo). La señal B59 marca el final.
          Es el equipamiento que hay que <em>llevar</em>: neumáticos 3PMSF montados, o
          cadenas en el maletero.
        </li>
        <li>
          <strong>La señal B26</strong> (redonda, azul, con una rueda con cadenas): obliga a
          circular <em>con</em> las cadenas puestas en una carretera nevada, incluso fuera
          del periodo invernal. Un coche con neumáticos 3PMSF se considera en regla, salvo
          si un panel complementario indica «cadenas para nieve obligatorias»: en ese caso,
          hay que poner cadenas sean cuales sean los neumáticos.
        </li>
      </ul>

      <h2>La nieve no espera al 1 de noviembre</h2>
      <p>
        La fecha legal no dice nada del tiempo. En Albiez, ya ha ocurrido que la primera
        nieve caiga <strong>a mediados de octubre</strong>, sobre coches todavía con
        neumáticos de verano. Si viene en otoño, consulte el tiempo de la estación unos días
        antes y lleve un par de fundas en el maletero: abultan poco y evitan quedarse
        bloqueado abajo.
      </p>

      <h2>¿Cadenas o fundas?</h2>
      <h3>Las fundas de nieve</h3>
      <ul>
        <li>Fáciles y rápidas de poner, incluso la primera vez.</li>
        <li>Ligeras, caben en un rincón del maletero.</li>
        <li>
          Pensadas para un uso <strong>ocasional</strong>: se desgastan rápido en una
          carretera despejada o en distancias largas. Se quitan en cuanto vuelve a aparecer
          el asfalto.
        </li>
      </ul>
      <h3>Las cadenas metálicas</h3>
      <ul>
        <li>Más adherencia en nieve espesa y sobre hielo.</li>
        <li>Más resistentes: es la opción aconsejada para un uso frecuente.</li>
        <li>
          Más largas de poner, sobre todo las primeras veces, y velocidad limitada una vez
          montadas (el límite figura en las instrucciones).
        </li>
      </ul>
      <p>
        Para una semana de esquí con buenos neumáticos de invierno, unas fundas suelen
        bastar como solución de emergencia. Si sube con neumáticos de verano o si vuelve a
        menudo a la montaña, los neumáticos 3PMSF siguen siendo la solución más sencilla.
      </p>

      <h3>Practicar antes de salir</h3>
      <p>
        Ponga sus cadenas o sus fundas <strong>una vez en casa</strong>, en seco, antes de
        salir. Al borde de una carretera nevada, de noche, con niños en el coche, no es el
        momento de descubrir las instrucciones. Lleve en el maletero guantes, una linterna
        frontal y un chaleco reflectante, colocados encima del equipaje.
      </p>

      <h3>Dónde comprarlas</h3>
      <p>
        Lo más seguro es comprarlas antes de salir, en un centro del automóvil o en línea,
        con la medida exacta de sus neumáticos (está inscrita en el flanco). Como último
        recurso, los centros del automóvil y las grandes superficies de
        Saint-Jean-de-Maurienne, a 18 km del apartamento, son la última parada antes de la
        subida: llame antes para comprobar que tienen su medida en stock, sobre todo un
        sábado de vacaciones.
      </p>

      <h2>La carretera hasta el apartamento</h2>
      <ul>
        <li>
          <strong>Autopista A43</strong>, salida <strong>Saint-Jean-de-Maurienne</strong>.
        </li>
        <li>
          Después, la <strong>carretera de Albiez</strong>: 18 km, unos 20 a 25 minutos sin
          atascos. Se limpia de nieve durante todo el invierno.
        </li>
        <li>
          Si la carretera está blanca, ponga las cadenas <strong>antes de la subida</strong>,
          y no en mitad de las curvas: en una zona de colocación de cadenas señalizada o en
          un lugar llano, despejado y fuera de la calzada. Un coche que patina en plena
          cuesta bloquea a todos los que vienen detrás.
        </li>
      </ul>

      <h3>El aparcamiento y los últimos metros</h3>
      <p>
        El apartamento está en el Mollard, chemin du Châtel. Se aparca en el{" "}
        <strong>aparcamiento exterior gratuito</strong>, a 50 m, y luego quedan{" "}
        <strong>unos cincuenta escalones</strong> hasta la residencia. Con equipaje pesado o
        un cochecito, cuente con dos viajes. El chemin du Châtel y los escalones se{" "}
        <strong>limpian de nieve</strong>; con una nevada fuerte, puede quedar algo hasta
        que pase la limpieza: un calzado que agarre no está de más.
      </p>

      <h2>Salir temprano el sábado</h2>
      <p>
        En temporada, la mayoría de las estancias empiezan y terminan en sábado: es el día
        de los cambios en las estaciones, y los sábados de invierno alargan mucho los tiempos
        de carretera. La llegada al apartamento es a partir de las 16 h: salga temprano,
        haga una pausa en el valle si va adelantado, y evitará lo peor del tráfico.
      </p>
      <p>
        El día de la salida, consulte el estado de las carreteras en{" "}
        <a href="https://www.savoie-route.fr" target="_blank" rel="noopener noreferrer">
          savoie-route.fr
        </a>
        ; en la autopista, Autoroute Info emite la información de tráfico en el 107.7.
      </p>

      <div className="facts">
        <p>
          <strong>Obligación</strong>: del 1 de noviembre al 31 de marzo, en toda Saboya
          <br />
          <strong>Equipamiento</strong>: 4 neumáticos de invierno 3PMSF, o cadenas / fundas
          en el maletero
          <br />
          <strong>Itinerario</strong>: A43, salida Saint-Jean-de-Maurienne, después 18 km de
          carretera de Albiez, limpia de nieve todo el invierno
          <br />
          <strong>En el lugar</strong>: aparcamiento gratuito a 50 m, después unos cincuenta
          escalones
          <br />
          <strong>La norma oficial</strong>:{" "}
          <a
            href="https://www.savoie.gouv.fr/Actions-de-l-Etat/Transports-deplacements-et-securite-routiere/Securite-routiere/Equipements-obligatoires-en-periode-hivernale-soyez-prets"
            target="_blank"
            rel="noopener noreferrer"
          >
            prefectura de Saboya
          </a>
        </p>
      </div>

      <p>
        Vea también:{" "}
        <Link href="/es/guide/faire-ses-courses-a-albiez">hacer la compra en Albiez</Link>{" "}
        (el último aprovisionamiento suele hacerse en Saint-Jean-de-Maurienne),{" "}
        <Link href="/es/guide/quelle-semaine-skier-albiez">qué semana elegir para esquiar</Link>,{" "}
        <Link href="/es/guide/albiez-hors-saison">Albiez fuera de temporada</Link> y{" "}
        <Link href="/es/esqui">la página de invierno del alojamiento</Link>.
      </p>
    </>
  );
}
