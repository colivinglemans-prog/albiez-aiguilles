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
 * « Alexandre » (décision de l'hôte du 2026-11-08 : c'est lui qui gère), au nom de la SCI
 * JUARISAL — jamais au nom de Coliving Barbusse.
 *
 * Dernière minute (même décision) : une réservation prise moins de `LATE_BOOKING_HOURS` avant le
 * jour d'arrivée ne reçoit pas l'avant-arrivée ; l'essentiel (linge, pneus) passe dans le message
 * du code (`tardif`). Les messages de confort (lendemain de l'arrivée, départ) sautent si un autre
 * message vient de partir (`quietHours`).
 * Les consignes de départ reprennent celles du guide (`guide.checkoutItems`) : un message qui
 * contredirait la page qu'il annonce sèmerait le doute. On écrit « la résidence » ou
 * « l'appartement », jamais « le chalet » (voir `SITE_NAME` dans `lib/property.ts`).
 *
 * Variables (fournies par `lib/messages/engine.ts`) :
 * - `prenom` (facultative) — prénom du voyageur ;
 * - `guideArrivee`, `guide` — URL du guide d'arrivée et du guide d'activités, dans la langue ;
 * - `telephone`, `whatsapp` — contact de l'hôte (`PROPERTY.contact`) ;
 * - `code` — code de la boîte à clés, lu dans `ALBIEZ_CODE_BOITE_A_CLES` au moment de l'envoi ;
 * - `kitInclus` / `kitAbsent` (facultatives, l'une ou l'autre) — kit linge selon le canal et la facture ;
 * - `prixKit` (facultative, avec `kitAbsent`) — prix du kit par personne (`PROPERTY.linen`) ;
 * - `viaAirbnb` (facultative) — le kit s'ajoute alors par le centre de résolution Airbnb ;
 * - `pneus` (facultative) — le séjour recoupe la période d'équipement obligatoire (1er novembre – 31 mars) ;
 * - `ski` (facultative) — le séjour recoupe une ouverture du domaine skiable (`HIVERS`) ;
 * - `tardif` (facultative) — réservation de dernière minute (`LATE_BOOKING_HOURS`).
 */

/** Une réservation prise moins de 48 h avant le jour d'arrivée est « de dernière minute ». */
export const LATE_BOOKING_HOURS = 48;

const preArrivee: MessageTemplate = {
  id: "avant-arrivee",
  label: "Avant l'arrivée (guide, heure, linge)",
  version: 4,
  trigger: { anchor: "arrival", offsetDays: -7, at: "10:00" },
  // Rattrapé pour une réservation prise entre J-7 et 48 h avant l'arrivée ; en deçà, `minLeadHours`
  // l'écarte et le bloc `tardif` du code prend le relais.
  late: { mode: "send", until: { anchor: "arrival", offsetDays: 0, at: "07:00" } },
  // Dernière minute : pas d'avant-arrivée, l'essentiel part avec le code.
  conditions: { minLeadHours: LATE_BOOKING_HOURS },
  onAnchorChange: "ignore",
  variables: ["guideArrivee", "guide", "telephone", "whatsapp"],
  optionalVariables: ["prenom", "kitInclus", "kitAbsent", "prixKit", "viaAirbnb", "pneus", "ski"],
  previewVisible: ["prenom", "guideArrivee", "guide", "telephone", "whatsapp", "prixKit"],
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
Le linge n'est pas inclus dans votre réservation : pensez à apporter draps, taies et serviettes de bain (1 lit double de 160 × 190 et 4 lits simples de 80 × 190). Couettes et oreillers sont sur place.{{#prixKit}} Vous préférez voyager léger ? Dites-le nous et nous ajoutons le kit linge, {{prixKit}} par personne{{#viaAirbnb}}, réglé par le centre de résolution Airbnb{{/viaAirbnb}}.{{/prixKit}}
{{/kitAbsent}}
À PRÉVOIR
Pour la durée du séjour, pensez à apporter des tablettes lave-vaisselle, des sacs poubelle de 50 L, du papier toilette et des dosettes Nespresso.
{{#pneus}}
EN HIVER
Les pneus neige ou les chaînes sont obligatoires pour monter à Albiez.{{#ski}} Si ce n'est pas fait, réservez vite vos skis et vos cours à l'ESF.{{/ski}}
{{/pneus}}
NOTRE GUIDE
Activités, commerces et bonnes adresses autour de la résidence :
{{guide}}

Une question ? Répondez à ce message, ou écrivez-nous sur WhatsApp : {{telephone}} — {{whatsapp}}

À très bientôt,
Alexandre`,
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
Linen is not included in your booking: please bring sheets, pillowcases and bath towels (1 double bed 160 × 190 and 4 single beds 80 × 190). Duvets and pillows are provided.{{#prixKit}} Rather travel light? Let us know and we will add the linen kit, {{prixKit}} per person{{#viaAirbnb}}, paid through the Airbnb Resolution Centre{{/viaAirbnb}}.{{/prixKit}}
{{/kitAbsent}}
TO BRING
For your stay, please bring dishwasher tablets, 50 L bin bags, toilet paper and Nespresso pods.
{{#pneus}}
IN WINTER
Snow tyres or chains are compulsory to drive up to Albiez.{{#ski}} If you have not done so yet, book your skis and ESF ski lessons soon.{{/ski}}
{{/pneus}}
OUR GUIDE
Activities, shops and good addresses around the residence:
{{guide}}

Any question? Reply to this message, or message us on WhatsApp: {{telephone}} — {{whatsapp}}

See you soon,
Alexandre`,
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
BETT- UND BADEWÄSCHE
Bett- und Badewäsche sind in Ihrer Buchung nicht enthalten: Bitte bringen Sie Bettlaken, Kissenbezüge und Badetücher mit (1 Doppelbett 160 × 190 und 4 Einzelbetten 80 × 190). Bettdecken und Kissen sind vorhanden.{{#prixKit}} Sie reisen lieber mit leichtem Gepäck? Sagen Sie uns Bescheid, und wir fügen das Wäschepaket hinzu, {{prixKit}} pro Person{{#viaAirbnb}}, bezahlt über das Airbnb-Resolution-Center{{/viaAirbnb}}.{{/prixKit}}
{{/kitAbsent}}
MITZUBRINGEN
Bitte bringen Sie für Ihren Aufenthalt Spülmaschinentabs, Müllbeutel (50 L), Toilettenpapier und Nespresso-Kapseln mit.
{{#pneus}}
IM WINTER
Winterreifen oder Schneeketten sind für die Auffahrt nach Albiez Pflicht.{{#ski}} Falls noch nicht geschehen, reservieren Sie bald Ihre Ski und Ihren Skiunterricht bei der ESF.{{/ski}}
{{/pneus}}
UNSER REISEFÜHRER
Aktivitäten, Geschäfte und gute Adressen rund um die Residenz:
{{guide}}

Eine Frage? Antworten Sie auf diese Nachricht oder schreiben Sie uns auf WhatsApp: {{telephone}} — {{whatsapp}}

Bis bald,
Alexandre`,
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
ROPA DE CAMA Y TOALLAS
La ropa de cama no está incluida en su reserva: traiga sábanas, fundas de almohada y toallas de baño (1 cama doble de 160 × 190 y 4 camas individuales de 80 × 190). Hay edredones y almohadas.{{#prixKit}} ¿Prefiere viajar ligero? Díganoslo y añadimos el kit de ropa de cama, {{prixKit}} por persona{{#viaAirbnb}}, pagado a través del Centro de resoluciones de Airbnb{{/viaAirbnb}}.{{/prixKit}}
{{/kitAbsent}}
QUÉ TRAER
Para su estancia, traiga pastillas para el lavavajillas, bolsas de basura de 50 L, papel higiénico y cápsulas Nespresso.
{{#pneus}}
EN INVIERNO
Los neumáticos de invierno o las cadenas son obligatorios para subir a Albiez.{{#ski}} Si aún no lo ha hecho, reserve pronto sus esquís y sus clases en la ESF.{{/ski}}
{{/pneus}}
NUESTRA GUÍA
Actividades, comercios y buenas direcciones alrededor de la residencia:
{{guide}}

¿Alguna pregunta? Responda a este mensaje o escríbanos por WhatsApp: {{telephone}} — {{whatsapp}}

Hasta muy pronto,
Alexandre`,
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
La biancheria non è inclusa nella prenotazione: portate lenzuola, federe e teli da bagno (1 letto matrimoniale 160 × 190 e 4 letti singoli 80 × 190). Piumoni e cuscini sono sul posto.{{#prixKit}} Preferite viaggiare leggeri? Ditecelo e aggiungiamo il kit biancheria, {{prixKit}} a persona{{#viaAirbnb}}, pagato tramite il Centro risoluzioni di Airbnb{{/viaAirbnb}}.{{/prixKit}}
{{/kitAbsent}}
DA PORTARE
Per il soggiorno, portate pastiglie per lavastoviglie, sacchi della spazzatura da 50 L, carta igienica e capsule Nespresso.
{{#pneus}}
IN INVERNO
Pneumatici invernali o catene sono obbligatori per salire ad Albiez.{{#ski}} Se non l'avete già fatto, prenotate presto sci e lezioni all'ESF.{{/ski}}
{{/pneus}}
LA NOSTRA GUIDA
Attività, negozi e buoni indirizzi intorno alla residenza:
{{guide}}

Una domanda? Rispondete a questo messaggio o scriveteci su WhatsApp: {{telephone}} — {{whatsapp}}

A presto,
Alexandre`,
  },
  fingerprints: ["le code de la boite a cles vous sera envoye le matin", "the key box code will be sent to you on the morning"],
};

const codeBoite: MessageTemplate = {
  id: "code-boite",
  label: "Code de la boîte à clés (jour d'arrivée)",
  version: 5,
  trigger: { anchor: "arrival", offsetDays: 0, at: "08:00" },
  // Une réservation prise tard le jour même reçoit le code aussitôt, jusqu'au lendemain matin.
  late: { mode: "send", until: { anchor: "arrival", offsetDays: 1, at: "10:00" } },
  onAnchorChange: "resend",
  variables: ["code", "guideArrivee", "telephone"],
  optionalVariables: ["prenom", "tardif", "kitInclus", "kitAbsent", "prixKit", "viaAirbnb", "pneus", "uneNuit"],
  // Le code reste masqué dans l'aperçu : il n'est en clair qu'au moment de l'envoi.
  previewVisible: ["prenom", "guideArrivee", "telephone", "tardif", "kitInclus", "kitAbsent", "prixKit", "viaAirbnb", "pneus", "uneNuit"],
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
{{#tardif}}
Votre réservation est toute récente, voici aussi l'essentiel :{{#kitInclus}}
- votre kit linge vous attend dans l'appartement (draps, taies, une serviette de bain par personne) ; les lits ne sont pas faits.{{/kitInclus}}{{#kitAbsent}}
- le linge n'est pas inclus : apportez draps, taies et serviettes (1 lit double 160 × 190, 4 lits simples 80 × 190){{#prixKit}}, ou demandez-nous le kit linge, {{prixKit}} par personne{{#viaAirbnb}}, réglé par le centre de résolution Airbnb{{/viaAirbnb}}{{/prixKit}}.{{/kitAbsent}}
- à prévoir : tablettes lave-vaisselle, sacs poubelle de 50 L, papier toilette, dosettes Nespresso.{{#pneus}}
- pneus neige ou chaînes obligatoires pour monter à Albiez.{{/pneus}}
{{/tardif}}
L'arrivée est possible dès 16h. Le guide d'arrivée vous mène jusqu'à l'appartement :
{{guideArrivee}}

{{#uneNuit}}Pour votre départ, demain avant 10h : remettez un trousseau dans la boîte à clés en brouillant le code, et laissez le second bien en évidence sur la table.

{{/uneNuit}}N'hésitez pas à nous appeler au {{telephone}} si besoin.

Bon séjour,
Alexandre`,
    en: `Hello{{#prenom}} {{prenom}}{{/prenom}},

Here is the key box code: {{code}}
{{#tardif}}
As you booked very recently, here are the essentials too:{{#kitInclus}}
- your linen kit is waiting in the apartment (sheets, pillowcases, one bath towel per person); the beds are not made.{{/kitInclus}}{{#kitAbsent}}
- linen is not included: please bring sheets, pillowcases and towels (1 double bed 160 × 190, 4 single beds 80 × 190){{#prixKit}}, or ask us for the linen kit, {{prixKit}} per person{{#viaAirbnb}}, paid through the Airbnb Resolution Centre{{/viaAirbnb}}{{/prixKit}}.{{/kitAbsent}}
- to bring: dishwasher tablets, 50 L bin bags, toilet paper, Nespresso pods.{{#pneus}}
- snow tyres or chains are compulsory to drive up to Albiez.{{/pneus}}
{{/tardif}}
Check-in is possible from 4 pm. The arrival guide takes you to the apartment:
{{guideArrivee}}

{{#uneNuit}}For your departure, tomorrow before 10 am: put one set of keys back in the key box, scrambling the code, and leave the other clearly visible on the table.

{{/uneNuit}}Feel free to call us on {{telephone}} if needed.

Enjoy your stay,
Alexandre`,
    de: `Guten Tag{{#prenom}} {{prenom}}{{/prenom}},

Hier ist der Code des Schlüsselkastens: {{code}}
{{#tardif}}
Da Sie sehr kurzfristig gebucht haben, hier auch das Wichtigste:{{#kitInclus}}
- Ihr Wäschepaket liegt in der Wohnung bereit (Bettwäsche, Kissenbezüge, ein Badetuch pro Person); die Betten sind nicht bezogen.{{/kitInclus}}{{#kitAbsent}}
- Bettwäsche ist nicht inbegriffen: Bitte bringen Sie Laken, Kissenbezüge und Handtücher mit (1 Doppelbett 160 × 190, 4 Einzelbetten 80 × 190){{#prixKit}}, oder fragen Sie uns nach dem Wäschepaket, {{prixKit}} pro Person{{#viaAirbnb}}, bezahlt über das Airbnb-Lösungscenter{{/viaAirbnb}}{{/prixKit}}.{{/kitAbsent}}
- mitzubringen: Spülmaschinentabs, Müllbeutel (50 L), Toilettenpapier, Nespresso-Kapseln.{{#pneus}}
- Winterreifen oder Schneeketten sind für die Auffahrt nach Albiez Pflicht.{{/pneus}}
{{/tardif}}
Die Anreise ist ab 16 Uhr möglich. Der Anreiseführer bringt Sie bis zur Wohnung:
{{guideArrivee}}

{{#uneNuit}}Für Ihre Abreise morgen vor 10 Uhr: Legen Sie einen Schlüsselbund in den Schlüsselkasten zurück, verstellen Sie den Code, und lassen Sie den zweiten gut sichtbar auf dem Tisch.

{{/uneNuit}}Rufen Sie uns bei Bedarf gerne unter {{telephone}} an.

Einen schönen Aufenthalt,
Alexandre`,
    es: `Hola{{#prenom}} {{prenom}}{{/prenom}}:

Este es el código de la caja de llaves: {{code}}
{{#tardif}}
Como ha reservado hace muy poco, aquí tiene también lo esencial:{{#kitInclus}}
- su kit de ropa de cama le espera en el apartamento (sábanas, fundas de almohada y una toalla de baño por persona); las camas no están hechas.{{/kitInclus}}{{#kitAbsent}}
- la ropa de cama no está incluida: traiga sábanas, fundas y toallas (1 cama doble de 160 × 190, 4 camas individuales de 80 × 190){{#prixKit}}, o pídanos el kit de ropa de cama, {{prixKit}} por persona{{#viaAirbnb}}, pagado a través del Centro de resoluciones de Airbnb{{/viaAirbnb}}{{/prixKit}}.{{/kitAbsent}}
- qué traer: pastillas para el lavavajillas, bolsas de basura de 50 L, papel higiénico, cápsulas Nespresso.{{#pneus}}
- los neumáticos de invierno o las cadenas son obligatorios para subir a Albiez.{{/pneus}}
{{/tardif}}
La llegada es posible a partir de las 16:00. La guía de llegada le lleva hasta el apartamento:
{{guideArrivee}}

{{#uneNuit}}Para su salida, mañana antes de las 10:00: deje un juego de llaves en la caja de llaves, cambiando el código, y el otro bien visible sobre la mesa.

{{/uneNuit}}No dude en llamarnos al {{telephone}} si lo necesita.

Buena estancia,
Alexandre`,
    it: `Buongiorno{{#prenom}} {{prenom}}{{/prenom}},

Ecco il codice della cassetta delle chiavi: {{code}}
{{#tardif}}
Avendo prenotato da pochissimo, ecco anche l'essenziale:{{#kitInclus}}
- il vostro kit biancheria vi aspetta nell'appartamento (lenzuola, federe e un telo bagno a persona); i letti non sono fatti.{{/kitInclus}}{{#kitAbsent}}
- la biancheria non è inclusa: portate lenzuola, federe e asciugamani (1 letto matrimoniale 160 × 190, 4 letti singoli 80 × 190){{#prixKit}}, oppure chiedeteci il kit biancheria, {{prixKit}} a persona{{#viaAirbnb}}, pagato tramite il Centro risoluzioni Airbnb{{/viaAirbnb}}{{/prixKit}}.{{/kitAbsent}}
- da portare: pastiglie per lavastoviglie, sacchi della spazzatura da 50 L, carta igienica, capsule Nespresso.{{#pneus}}
- pneumatici da neve o catene sono obbligatori per salire ad Albiez.{{/pneus}}
{{/tardif}}
L'arrivo è possibile dalle 16:00. La guida all'arrivo vi accompagna fino all'appartamento:
{{guideArrivee}}

{{#uneNuit}}Per la partenza, domani entro le 10:00: rimettete un mazzo di chiavi nella cassetta cambiando il codice, e lasciate l'altro ben in vista sul tavolo.

{{/uneNuit}}Non esitate a chiamarci al {{telephone}} in caso di bisogno.

Buon soggiorno,
Alexandre`,
  },
  // Les messages envoyés à la main avant l'outil (2026) disaient « un petit message pour vous
  // donner le code de la boite à clef ». ⚠️ Pas « code de la boite a clef » seul : il reconnaissait
  // aussi « je vous transmettrai le code de la boite à clef plus tard » (relevé le 2026-11-08 sur
  // une réservation de février), et le code ne serait jamais parti.
  fingerprints: ["pour vous donner le code de la boite a clef", "voici le code de la boite a cles", "here is the key box code"],
};

/**
 * Lendemain de l'arrivée — jusqu'ici un **message programmé dans Airbnb** (invisible de Beds24 :
 * aucune trace dans les fils, relevé le 2026-11-08), le même qu'à Barbusse, très apprécié des
 * voyageurs. ⚠️ Au passage en `live`, couper le message programmé dans Airbnb : le moteur ne le
 * voit pas, les voyageurs Airbnb le recevraient deux fois.
 */
const installe: MessageTemplate = {
  id: "bien-installe",
  label: "Lendemain de l'arrivée",
  version: 1,
  trigger: { anchor: "arrival", offsetDays: 1, at: "09:00" },
  late: { mode: "skip", graceHours: 6 },
  // Sur deux nuits, le lendemain de l'arrivée est aussi la veille du départ.
  conditions: { minNights: 3, quietHours: 12 },
  onAnchorChange: "ignore",
  variables: [],
  optionalVariables: ["prenom"],
  previewVisible: ["prenom"],
  subject: {
    fr: "Bien installés ?",
    en: "All settled in?",
    de: "Gut angekommen?",
    es: "¿Bien instalados?",
    it: "Vi siete sistemati bene?",
  },
  body: {
    fr: `Bonjour{{#prenom}} {{prenom}}{{/prenom}},

J'espère que vous êtes bien installés et que vous avez trouvé vos marques. S'il vous manque quoi que ce soit, répondez simplement à ce message.

Alexandre`,
    en: `Hello{{#prenom}} {{prenom}}{{/prenom}},

I hope you are all settled in and finding your way around the apartment. If you need anything at all, just reply to this message.

Alexandre`,
    de: `Guten Tag{{#prenom}} {{prenom}}{{/prenom}},

ich hoffe, Sie haben sich gut eingelebt und finden sich in der Wohnung zurecht. Wenn Ihnen etwas fehlt, antworten Sie einfach auf diese Nachricht.

Alexandre`,
    es: `Hola{{#prenom}} {{prenom}}{{/prenom}}:

Espero que estén bien instalados y que ya se sientan como en casa. Si les falta cualquier cosa, respondan simplemente a este mensaje.

Alexandre`,
    it: `Buongiorno{{#prenom}} {{prenom}}{{/prenom}},

spero che vi siate sistemati bene e che vi troviate a vostro agio. Se vi manca qualcosa, rispondete semplicemente a questo messaggio.

Alexandre`,
  },
  fingerprints: ["que vous etes bien installe", "you are all settled in"],
};

const depart: MessageTemplate = {
  id: "depart",
  label: "Veille du départ (consignes et avis)",
  version: 3,
  trigger: { anchor: "departure", offsetDays: -1, at: "09:00" },
  late: { mode: "skip", graceHours: 8 },
  // Sur une nuit, la veille du départ est le jour d'arrivée : le code vient de partir, on n'ajoute rien.
  conditions: { quietHours: 12 },
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

Voici quelques indications pour votre départ, demain avant 10h. Le ménage de fin de séjour est inclus, mais la cuisine et la vaisselle restent à votre charge.

Avant de refermer la porte :
- laisser la cuisine propre et rangée, vaisselle faite et remise en place
- descendre les poubelles jusqu'aux conteneurs, devant lesquels vous vous êtes garé en arrivant
- couper le chauffage
- fermer les volets
- éteindre les lumières et les appareils
- verrouiller la porte et le casier à skis

Remettez un trousseau dans la boîte à clés en brouillant le code, et laissez le second bien en évidence sur la table.

Nous espérons que votre séjour s'est bien passé. Votre avis sur la plateforme où vous avez réservé nous aide beaucoup, et vos idées d'amélioration sont les bienvenues.

Encore merci, et à bientôt peut-être,
Alexandre`,
    en: `Hello{{#prenom}} {{prenom}}{{/prenom}},

Here are a few notes for your departure, tomorrow before 10 am. End-of-stay cleaning is included, but the kitchen and the dishes are up to you.

Before you close the door:
- leave the kitchen clean and tidy, dishes washed and put away
- take the rubbish down to the bins, the ones you parked in front of when you arrived
- turn off the heating
- close the shutters
- switch off the lights and appliances
- lock the door and the ski locker

Put one set of keys back in the key box, scrambling the code, and leave the other clearly visible on the table.

We hope you enjoyed your stay. A review on the platform where you booked helps us a lot, and your ideas for improvement are welcome.

Thank you again, and perhaps see you soon,
Alexandre`,
    de: `Guten Tag{{#prenom}} {{prenom}}{{/prenom}},

hier einige Hinweise für Ihre Abreise morgen vor 10 Uhr. Die Endreinigung ist inbegriffen, Küche und Geschirr bleiben jedoch Ihre Sache.

Bevor Sie die Tür schließen:
- die Küche sauber und aufgeräumt hinterlassen, Geschirr gespült und eingeräumt
- den Müll zu den Containern bringen, vor denen Sie bei der Ankunft geparkt haben
- die Heizung ausschalten
- die Fensterläden schließen
- Licht und Geräte ausschalten
- die Tür und den Skischrank abschließen

Legen Sie einen Schlüsselbund in den Schlüsselkasten zurück, verstellen Sie den Code, und lassen Sie den zweiten gut sichtbar auf dem Tisch.

Wir hoffen, Sie hatten einen schönen Aufenthalt. Eine Bewertung auf der Plattform, auf der Sie gebucht haben, hilft uns sehr, und Ihre Verbesserungsvorschläge sind willkommen.

Nochmals vielen Dank, und vielleicht bis bald,
Alexandre`,
    es: `Hola{{#prenom}} {{prenom}}{{/prenom}}:

Aquí tiene algunas indicaciones para su salida, mañana antes de las 10:00. La limpieza final está incluida, pero la cocina y los platos corren de su cuenta.

Antes de cerrar la puerta:
- dejar la cocina limpia y ordenada, con los platos fregados y guardados
- bajar la basura a los contenedores, aquellos delante de los que aparcó al llegar
- apagar la calefacción
- cerrar las contraventanas
- apagar las luces y los aparatos
- cerrar con llave la puerta y el guardaesquís

Deje un juego de llaves en la caja de llaves, cambiando el código, y el otro bien visible sobre la mesa.

Esperamos que haya disfrutado de su estancia. Su opinión en la plataforma donde reservó nos ayuda mucho, y sus ideas de mejora son bienvenidas.

Muchas gracias de nuevo, y quizá hasta pronto,
Alexandre`,
    it: `Buongiorno{{#prenom}} {{prenom}}{{/prenom}},

ecco alcune indicazioni per la vostra partenza, domani entro le 10:00. Le pulizie finali sono incluse, ma la cucina e le stoviglie restano a vostro carico.

Prima di chiudere la porta:
- lasciare la cucina pulita e in ordine, stoviglie lavate e riposte
- portare la spazzatura ai cassonetti, quelli davanti ai quali avete parcheggiato all'arrivo
- spegnere il riscaldamento
- chiudere le persiane
- spegnere luci e apparecchi
- chiudere a chiave la porta e il deposito sci

Rimettete un mazzo di chiavi nella cassetta cambiando il codice, e lasciate l'altro ben in vista sul tavolo.

Speriamo che il soggiorno vi sia piaciuto. Una recensione sulla piattaforma dove avete prenotato ci aiuta molto, e le vostre idee di miglioramento sono benvenute.

Grazie ancora, e forse a presto,
Alexandre`,
  },
  // « indications pour votre depart » : les messages envoyés à la main avant l'outil (2026).
  fingerprints: ["indications pour votre depart", "a few notes for your departure"],
};

export const TEMPLATES: readonly MessageTemplate[] = [preArrivee, codeBoite, installe, depart];
