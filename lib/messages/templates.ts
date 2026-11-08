import type { MessageTemplate } from "@sejour/socle/lib/guest-messaging/types";

/**
 * Messages automatiques d'Albiez — **la source**, versionnée.
 *
 * Ils remplacent ce que l'hôte envoyait à la main (le code de la boîte à clés le matin de
 * l'arrivée, les indications de départ la veille) et le J-7 jamais écrit dans Beds24. La
 * **confirmation de réservation reste dans Beds24** (actions 617008 et 625162 : tableau de
 * facture et lien de paiement), décision de l'hôte du 2026-11-08.
 *
 * Pour faire évoluer un message : modifier le français, reporter dans les quatre autres
 * langues, **incrémenter `version`**. Le test `tests/messages.test.ts` refuse une langue
 * manquante, une variable oubliée, un reste de syntaxe Beds24, un numéro ou un code écrit en
 * dur (le dépôt est public : ils passent par des variables).
 *
 * Ton : vouvoiement dans les cinq langues, comme le guide d'arrivée (`guide.codeNote`). Signature
 * « Isabelle et Alexandre », au nom de la SCI JUARISAL — jamais au nom de Coliving Barbusse.
 *
 * Variables (fournies par `lib/messages/engine.ts`) :
 * - `prenom` (facultative) — prénom du voyageur ;
 * - `guideArrivee`, `guide` — URL du guide d'arrivée et du guide d'activités, dans la langue ;
 * - `telephone`, `whatsapp` — contact de l'hôte (`PROPERTY.contact`) ;
 * - `code` — code de la boîte à clés, lu dans `ALBIEZ_CODE_BOITE_A_CLES` au moment de l'envoi ;
 * - `kitInclus` / `kitAbsent` (facultatives, l'une ou l'autre) — kit linge selon le canal et la facture ;
 * - `hiver` (facultative) — présente quand le séjour recoupe une ouverture du domaine skiable.
 */

const preArrivee: MessageTemplate = {
  id: "avant-arrivee",
  label: "Avant l'arrivée (guide, heure, linge)",
  version: 1,
  trigger: { anchor: "arrival", offsetDays: -7, at: "10:00" },
  // Utile même pour une réservation de dernière minute : rattrapé jusqu'au matin de l'arrivée.
  late: { mode: "send", until: { anchor: "arrival", offsetDays: 0, at: "07:00" } },
  onAnchorChange: "ignore",
  variables: ["guideArrivee", "guide", "telephone", "whatsapp"],
  previewVisible: ["prenom", "guideArrivee", "guide", "telephone", "whatsapp"],
  optionalVariables: ["prenom", "kitInclus", "kitAbsent", "hiver"],
  subject: {
    fr: "Votre séjour à Albiez approche",
    en: "Your stay in Albiez is coming up",
    de: "Ihr Aufenthalt in Albiez rückt näher",
    es: "Su estancia en Albiez se acerca",
    it: "Il vostro soggiorno ad Albiez si avvicina",
  },
  body: {
    fr: `Bonjour{{#prenom}} {{prenom}}{{/prenom}},

Votre séjour à Albiez approche, nous avons hâte de vous accueillir.

VOTRE ARRIVÉE
L'arrivée est autonome, à partir de 16h. Le guide d'arrivée vous mène jusqu'à la porte, photos à l'appui :
{{guideArrivee}}

Le code de la boîte à clés vous sera envoyé le matin de votre arrivée.

Une chose à nous dire : votre heure d'arrivée approximative, en répondant simplement à ce message.
{{#kitInclus}}
VOTRE KIT LINGE
Il vous attend dans l'appartement : draps, taies et une serviette de bain par personne. Les lits ne sont pas faits, le linge est mis à disposition. Si ce n'est pas déjà fait, dites-nous la répartition des couchages souhaitée (par exemple « 1 double + 2 simples »).
{{/kitInclus}}{{#kitAbsent}}
LE LINGE
Le linge n'est pas inclus dans votre réservation : pensez à apporter draps, taies et serviettes de bain (1 lit double de 160 × 190 et 4 lits simples de 80 × 190). Couettes et oreillers sont sur place.
{{/kitAbsent}}{{#hiver}}
EN HIVER
Les pneus neige ou les chaînes sont obligatoires pour monter à Albiez. Si ce n'est pas fait, réservez vite vos skis et vos cours à l'ESF.
{{/hiver}}
NOTRE GUIDE
Activités, commerces et bonnes adresses autour du chalet :
{{guide}}

Une question ? Répondez à ce message, ou écrivez-nous sur WhatsApp : {{telephone}} — {{whatsapp}}

À très bientôt,
Isabelle et Alexandre`,
    en: `Hello{{#prenom}} {{prenom}}{{/prenom}},

Your stay in Albiez is coming up, and we look forward to welcoming you.

YOUR ARRIVAL
Check-in is self-service, from 4 pm. The arrival guide takes you to the door, with photos:
{{guideArrivee}}

The key box code will be sent to you on the morning of your arrival.

One thing to tell us: your approximate arrival time — just reply to this message.
{{#kitInclus}}
YOUR LINEN KIT
It is waiting for you in the apartment: sheets, pillowcases and one bath towel per person. The beds are not made; the linen is provided for you to put on. If you have not done so yet, let us know how you would like the beds arranged (for example "1 double + 2 singles").
{{/kitInclus}}{{#kitAbsent}}
LINEN
Linen is not included in your booking: please bring sheets, pillowcases and bath towels (1 double bed 160 × 190 and 4 single beds 80 × 190). Duvets and pillows are provided.
{{/kitAbsent}}{{#hiver}}
IN WINTER
Snow tyres or chains are compulsory to drive up to Albiez. If you have not done so yet, book your skis and ESF ski lessons soon.
{{/hiver}}
OUR GUIDE
Activities, shops and good addresses around the chalet:
{{guide}}

Any question? Reply to this message, or message us on WhatsApp: {{telephone}} — {{whatsapp}}

See you soon,
Isabelle and Alexandre`,
    de: `Guten Tag{{#prenom}} {{prenom}}{{/prenom}},

Ihr Aufenthalt in Albiez rückt näher, wir freuen uns auf Sie.

IHRE ANKUNFT
Die Anreise erfolgt selbstständig, ab 16 Uhr. Der Anreiseführer bringt Sie mit Fotos bis zur Tür:
{{guideArrivee}}

Den Code des Schlüsselkastens erhalten Sie am Morgen Ihrer Ankunft.

Eine Bitte: Teilen Sie uns Ihre ungefähre Ankunftszeit mit, einfach als Antwort auf diese Nachricht.
{{#kitInclus}}
IHR WÄSCHEPAKET
Es liegt in der Wohnung für Sie bereit: Bettlaken, Kissenbezüge und ein Badetuch pro Person. Die Betten sind nicht bezogen, die Wäsche liegt bereit. Falls noch nicht geschehen, nennen Sie uns bitte die gewünschte Bettenaufteilung (zum Beispiel „1 Doppelbett + 2 Einzelbetten“).
{{/kitInclus}}{{#kitAbsent}}
BETTWÄSCHE
Bettwäsche ist in Ihrer Buchung nicht enthalten: Bitte bringen Sie Bettlaken, Kissenbezüge und Badetücher mit (1 Doppelbett 160 × 190 und 4 Einzelbetten 80 × 190). Bettdecken und Kissen sind vorhanden.
{{/kitAbsent}}{{#hiver}}
IM WINTER
Winterreifen oder Schneeketten sind für die Auffahrt nach Albiez Pflicht. Falls noch nicht geschehen, reservieren Sie bald Ihre Ski und Ihren Skiunterricht bei der ESF.
{{/hiver}}
UNSER REISEFÜHRER
Aktivitäten, Geschäfte und gute Adressen rund um das Chalet:
{{guide}}

Eine Frage? Antworten Sie auf diese Nachricht oder schreiben Sie uns auf WhatsApp: {{telephone}} — {{whatsapp}}

Bis bald,
Isabelle und Alexandre`,
    es: `Hola{{#prenom}} {{prenom}}{{/prenom}}:

Su estancia en Albiez se acerca y estamos deseando recibirle.

SU LLEGADA
La llegada es autónoma, a partir de las 16:00. La guía de llegada le lleva hasta la puerta, con fotos:
{{guideArrivee}}

El código de la caja de llaves se le enviará la mañana de su llegada.

Una cosa que pedirle: su hora aproximada de llegada, simplemente respondiendo a este mensaje.
{{#kitInclus}}
SU KIT DE ROPA DE CAMA
Le espera en el apartamento: sábanas, fundas de almohada y una toalla de baño por persona. Las camas no están hechas, la ropa está a su disposición. Si aún no lo ha hecho, indíquenos el reparto de camas que desea (por ejemplo «1 doble + 2 individuales»).
{{/kitInclus}}{{#kitAbsent}}
ROPA DE CAMA
La ropa de cama no está incluida en su reserva: traiga sábanas, fundas de almohada y toallas de baño (1 cama doble de 160 × 190 y 4 camas individuales de 80 × 190). Hay edredones y almohadas.
{{/kitAbsent}}{{#hiver}}
EN INVIERNO
Los neumáticos de invierno o las cadenas son obligatorios para subir a Albiez. Si aún no lo ha hecho, reserve pronto sus esquís y sus clases en la ESF.
{{/hiver}}
NUESTRA GUÍA
Actividades, comercios y buenas direcciones alrededor del chalet:
{{guide}}

¿Alguna pregunta? Responda a este mensaje o escríbanos por WhatsApp: {{telephone}} — {{whatsapp}}

Hasta muy pronto,
Isabelle y Alexandre`,
    it: `Buongiorno{{#prenom}} {{prenom}}{{/prenom}},

Il vostro soggiorno ad Albiez si avvicina e non vediamo l'ora di accogliervi.

IL VOSTRO ARRIVO
L'arrivo è autonomo, dalle 16:00. La guida all'arrivo vi accompagna fino alla porta, con foto:
{{guideArrivee}}

Il codice della cassetta delle chiavi vi sarà inviato la mattina del vostro arrivo.

Una cosa da comunicarci: l'orario di arrivo approssimativo, rispondendo semplicemente a questo messaggio.
{{#kitInclus}}
IL VOSTRO KIT BIANCHERIA
Vi aspetta nell'appartamento: lenzuola, federe e un telo da bagno a persona. I letti non sono fatti, la biancheria è a vostra disposizione. Se non l'avete già fatto, indicateci la disposizione dei letti che desiderate (per esempio «1 matrimoniale + 2 singoli»).
{{/kitInclus}}{{#kitAbsent}}
LA BIANCHERIA
La biancheria non è inclusa nella prenotazione: portate lenzuola, federe e teli da bagno (1 letto matrimoniale 160 × 190 e 4 letti singoli 80 × 190). Piumoni e cuscini sono sul posto.
{{/kitAbsent}}{{#hiver}}
IN INVERNO
Pneumatici invernali o catene sono obbligatori per salire ad Albiez. Se non l'avete già fatto, prenotate presto sci e lezioni all'ESF.
{{/hiver}}
LA NOSTRA GUIDA
Attività, negozi e buoni indirizzi intorno allo chalet:
{{guide}}

Una domanda? Rispondete a questo messaggio o scriveteci su WhatsApp: {{telephone}} — {{whatsapp}}

A presto,
Isabelle e Alexandre`,
  },
  fingerprints: ["le code de la boite a cles vous sera envoye le matin", "the key box code will be sent to you on the morning"],
};

const codeBoite: MessageTemplate = {
  id: "code-boite",
  label: "Code de la boîte à clés (jour d'arrivée)",
  version: 1,
  trigger: { anchor: "arrival", offsetDays: 0, at: "08:00" },
  // Une réservation prise le jour même reçoit le code aussitôt, jusqu'au soir.
  late: { mode: "send", until: { anchor: "arrival", offsetDays: 0, at: "23:00" } },
  onAnchorChange: "resend",
  variables: ["code", "guideArrivee", "telephone"],
  // Le code reste masqué dans l'aperçu : il n'est en clair qu'au moment de l'envoi.
  previewVisible: ["prenom", "guideArrivee", "telephone"],
  optionalVariables: ["prenom"],
  subject: {
    fr: "Le code de la boîte à clés",
    en: "Your key box code",
    de: "Der Code des Schlüsselkastens",
    es: "El código de la caja de llaves",
    it: "Il codice della cassetta delle chiavi",
  },
  body: {
    fr: `Bonjour{{#prenom}} {{prenom}}{{/prenom}},

Voici le code de la boîte à clés : {{code}}

Le guide d'arrivée vous mène jusqu'à l'appartement :
{{guideArrivee}}

N'hésitez pas à nous appeler au {{telephone}} si besoin.

Bon séjour,
Isabelle et Alexandre`,
    en: `Hello{{#prenom}} {{prenom}}{{/prenom}},

Here is the key box code: {{code}}

The arrival guide takes you to the apartment:
{{guideArrivee}}

Feel free to call us on {{telephone}} if needed.

Enjoy your stay,
Isabelle and Alexandre`,
    de: `Guten Tag{{#prenom}} {{prenom}}{{/prenom}},

Hier ist der Code des Schlüsselkastens: {{code}}

Der Anreiseführer bringt Sie bis zur Wohnung:
{{guideArrivee}}

Rufen Sie uns bei Bedarf gerne unter {{telephone}} an.

Einen schönen Aufenthalt,
Isabelle und Alexandre`,
    es: `Hola{{#prenom}} {{prenom}}{{/prenom}}:

Este es el código de la caja de llaves: {{code}}

La guía de llegada le lleva hasta el apartamento:
{{guideArrivee}}

No dude en llamarnos al {{telephone}} si lo necesita.

Buena estancia,
Isabelle y Alexandre`,
    it: `Buongiorno{{#prenom}} {{prenom}}{{/prenom}},

Ecco il codice della cassetta delle chiavi: {{code}}

La guida all'arrivo vi accompagna fino all'appartamento:
{{guideArrivee}}

Non esitate a chiamarci al {{telephone}} in caso di bisogno.

Buon soggiorno,
Isabelle e Alexandre`,
  },
  // Les messages envoyés à la main avant l'outil (2026) disaient « un petit message pour vous
  // donner le code de la boite à clef ». ⚠️ Pas « code de la boite a clef » seul : il reconnaissait
  // aussi « je vous transmettrai le code de la boite à clef plus tard » (relevé le 2026-11-08 sur
  // une réservation de février), et le code ne serait jamais parti.
  fingerprints: ["pour vous donner le code de la boite a clef", "voici le code de la boite a cles", "here is the key box code"],
};

const depart: MessageTemplate = {
  id: "depart",
  label: "Veille du départ (consignes et avis)",
  version: 1,
  trigger: { anchor: "departure", offsetDays: -1, at: "09:00" },
  late: { mode: "skip", graceHours: 8 },
  onAnchorChange: "ignore",
  variables: [],
  optionalVariables: ["prenom"],
  previewVisible: ["prenom"],
  subject: {
    fr: "Quelques indications pour votre départ",
    en: "A few notes for your departure",
    de: "Einige Hinweise für Ihre Abreise",
    es: "Algunas indicaciones para su salida",
    it: "Alcune indicazioni per la vostra partenza",
  },
  body: {
    fr: `Bonjour{{#prenom}} {{prenom}}{{/prenom}},

Voici quelques indications pour votre départ, demain avant 10h.

Le ménage est compris, sauf la cuisine : merci de laver votre vaisselle et de vider le lave-vaisselle avant de partir. Descendez les poubelles et rangez les couettes et les oreillers.

Pensez à :
- arrêter les radiateurs
- fermer les volets
- remettre une paire de clés dans la boîte à clés (en brouillant le code) et laisser l'autre sur la table

Nous espérons que votre séjour s'est bien passé. Votre avis sur la plateforme où vous avez réservé nous aide beaucoup, et vos idées d'amélioration sont les bienvenues.

Encore merci, et à bientôt peut-être,
Isabelle et Alexandre`,
    en: `Hello{{#prenom}} {{prenom}}{{/prenom}},

Here are a few notes for your departure, tomorrow before 10 am.

Cleaning is included, except for the kitchen: please wash your dishes and empty the dishwasher before you leave. Take the rubbish down and put away the duvets and pillows.

Please remember to:
- turn off the radiators
- close the shutters
- put one set of keys back in the key box (scrambling the code) and leave the other on the table

We hope you enjoyed your stay. A review on the platform where you booked helps us a lot, and your ideas for improvement are welcome.

Thank you again, and perhaps see you soon,
Isabelle and Alexandre`,
    de: `Guten Tag{{#prenom}} {{prenom}}{{/prenom}},

Hier einige Hinweise für Ihre Abreise morgen vor 10 Uhr.

Die Endreinigung ist inbegriffen, außer der Küche: Bitte spülen Sie Ihr Geschirr und räumen Sie die Spülmaschine aus, bevor Sie abreisen. Bringen Sie den Müll hinunter und räumen Sie Bettdecken und Kissen weg.

Bitte denken Sie daran:
- die Heizkörper auszuschalten
- die Fensterläden zu schließen
- einen Schlüsselbund in den Schlüsselkasten zurückzulegen (Code verstellen) und den anderen auf dem Tisch zu lassen

Wir hoffen, Sie hatten einen schönen Aufenthalt. Eine Bewertung auf der Plattform, auf der Sie gebucht haben, hilft uns sehr, und Ihre Verbesserungsvorschläge sind willkommen.

Nochmals vielen Dank, und vielleicht bis bald,
Isabelle und Alexandre`,
    es: `Hola{{#prenom}} {{prenom}}{{/prenom}}:

Aquí tiene algunas indicaciones para su salida, mañana antes de las 10:00.

La limpieza está incluida, salvo la cocina: le rogamos que lave los platos y vacíe el lavavajillas antes de irse. Baje la basura y guarde los edredones y las almohadas.

Recuerde:
- apagar los radiadores
- cerrar las contraventanas
- dejar un juego de llaves en la caja de llaves (cambiando el código) y el otro sobre la mesa

Esperamos que haya disfrutado de su estancia. Su opinión en la plataforma donde reservó nos ayuda mucho, y sus ideas de mejora son bienvenidas.

Muchas gracias de nuevo, y quizá hasta pronto,
Isabelle y Alexandre`,
    it: `Buongiorno{{#prenom}} {{prenom}}{{/prenom}},

Ecco alcune indicazioni per la vostra partenza, domani entro le 10:00.

Le pulizie sono incluse, tranne la cucina: vi chiediamo di lavare le stoviglie e svuotare la lavastoviglie prima di partire. Portate giù la spazzatura e riponete piumoni e cuscini.

Ricordatevi di:
- spegnere i termosifoni
- chiudere le persiane
- rimettere un mazzo di chiavi nella cassetta (cambiando il codice) e lasciare l'altro sul tavolo

Speriamo che il soggiorno vi sia piaciuto. Una recensione sulla piattaforma dove avete prenotato ci aiuta molto, e le vostre idee di miglioramento sono benvenute.

Grazie ancora, e forse a presto,
Isabelle e Alexandre`,
  },
  // « indications pour votre depart » : les messages envoyés à la main avant l'outil (2026).
  fingerprints: ["indications pour votre depart", "a few notes for your departure"],
};

export const TEMPLATES: readonly MessageTemplate[] = [preArrivee, codeBoite, depart];
