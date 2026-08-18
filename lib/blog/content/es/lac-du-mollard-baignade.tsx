import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        A 350 metros del alojamiento, el lago del Mollard lleva una doble vida: reserva de agua
        para la nieve artificial en invierno, base de ocio y de baño en verano. Es el punto de
        encuentro del sector entre julio y agosto.
      </p>

      <h2>El baño</h2>
      <p>
        El lago está abierto al baño en verano y{" "}
        <strong>vigilado del 1 de julio al 31 de agosto, todos los días de 12 a 18 h</strong>.
        Fuera de ese horario, el baño no está vigilado.
      </p>
      <p>
        Es agua de montaña a 1630 metros: hay que merecerla a principio de temporada, y se vuelve
        francamente agradable en pleno verano.
      </p>

      <h2>Lo que hay alrededor</h2>
      <ul>
        <li>
          <strong>Una estructura hinchable</strong> sobre el agua: es lo que ocupa a los niños
          toda una tarde.
        </li>
        <li>
          <strong>Una piscina infantil</strong> para los más pequeños.
        </li>
        <li>
          <strong>Mesas de picnic.</strong>
        </li>
        <li>
          <strong>Una cancha de petanca</strong> y un <strong>campo de voleibol</strong>.
        </li>
        <li>
          <strong>Aseos públicos.</strong>
        </li>
      </ul>
      <p>
        Existe una segunda zona de ocio al otro lado de la carretera, en el{" "}
        <Link href="/es/guide/col-du-mollard-velo">col du Mollard</Link>, con lámina de agua y
        piscina infantil vigiladas, sanitarios, petanca, zona de juegos y área de picnic.
      </p>

      <h2>La vuelta a pie: 30 minutos</h2>
      <p>
        La vuelta al lago es un circuito familiar que sale directamente del alojamiento, muy bien
        orientado, con <strong>poco desnivel y 30 minutos de marcha</strong>. La vista alcanza las{" "}
        <Link href="/es/guide/aiguilles-arves">Aiguilles d'Arves</Link>, el glaciar de l'Étendard
        y el valle del Arvan.
      </p>
      <p>
        Es el paseo de final de jornada por excelencia, y el mejor lugar del sector para
        fotografiar las Aiguilles al atardecer: el lago las refleja.
      </p>
      <p>
        Los otros cinco itinerarios señalizados del municipio están detallados en nuestro artículo{" "}
        <Link href="/es/guide/randonnees-balisees-albiez">
          las seis rutas señalizadas de Albiez-Montrond
        </Link>
        .
      </p>

      <h2>En invierno, el mismo lago</h2>
      <p>
        De diciembre a marzo, la lámina de agua sirve de{" "}
        <strong>reserva para los 50 cañones de nieve</strong> del dominio. Es ella la que garantiza
        parte de la nieve de las pistas. El paseo alrededor sigue siendo posible, en un decorado
        completamente distinto.
      </p>

      <div className="facts">
        <p>
          <strong>Distancia desde el alojamiento</strong>: 350 m
          <br />
          <strong>Baño vigilado</strong>: del 01/07 al 31/08, todos los días de 12 a 18 h
          <br />
          <strong>Vuelta al lago</strong>: 30 min, poco desnivel
        </p>
      </div>

      <p>
        Las otras actividades de verano —{" "}
        <Link href="/es/guide/equitation-le-kavalkada">ponis</Link>,{" "}
        <Link href="/es/guide/bmx-vtt-trottinette-albiez">BMX y BTT</Link> — están a unos cientos
        de metros. El programa completo está en{" "}
        <Link href="/es/verano">la página de verano del alojamiento</Link>.
      </p>
    </>
  );
}
