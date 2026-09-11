/**
 * Partage du guide d'arrivée avec un voyageur, depuis le dashboard.
 *
 * Ce module ne sert qu'au dashboard : il fabrique l'URL du guide et le message à coller dans
 * la messagerie du canal (Airbnb, Booking, e-mail). Il ne connaît aucune réservation, et
 * c'est volontaire — voir ci-dessous.
 *
 * ⚠️ **Aucune donnée personnelle n'entre ici, parce que le site n'en lit aucune.** Les jetons
 * Beds24 d'Albiez ne portent pas `read:bookings-personal` : ni prénom, ni e-mail, ni pays.
 * Le message n'est donc pas nominatif et la langue n'est pas devinée — c'est l'administrateur
 * qui choisit, les cinq étant proposées à égalité. Ajouter le scope pour personnaliser une
 * formule de politesse échangerait une donnée de voyageur contre trois mots.
 */

import { LOCALES, type Locale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/property";

/**
 * Les langues proposées au partage sont exactement celles du site : le guide d'arrivée est
 * servi dans les cinq, sous le même slug (le slug n'est localisé que pour les pages de
 * saison). Passer par `LOCALES` fait suivre le jour où une sixième langue arrive.
 */
export const LANGUES_PARTAGE = LOCALES;

export function urlGuideArrivee(locale: Locale): string {
  return `${SITE_URL}/${locale}/guide-arrivee`;
}

/**
 * Les cinq versions du message.
 *
 * Le vouvoiement est celui des dictionnaires du guide, qui vouvoient dans les cinq langues
 * (`guide.codeNote`) : un message tutoyant introduirait la page qu'il annonce sur un autre
 * ton. Le col du Mollard garde son nom français partout — c'est ce qui est écrit sur les
 * panneaux que le voyageur va chercher des yeux.
 *
 * Le code est optionnel : la ligne disparaît plutôt que d'annoncer un code vide si la
 * variable d'environnement manque.
 */
const MESSAGES: Record<Locale, (p: { url: string; code?: string }) => string[]> = {
  fr: ({ url, code }) => [
    "Bonjour,",
    "",
    "Voici le guide d'arrivée : l'itinéraire en photos depuis le col du Mollard, et tout le pratique de l'appartement (parking, escalier, tableau électrique, café).",
    url,
    ...(code ? ["", `Le code de la boîte à clés : ${code}`] : []),
    "",
    "Bon séjour !",
    "Alexandre",
  ],
  en: ({ url, code }) => [
    "Hello,",
    "",
    "Here is the arrival guide: the route in photos from the col du Mollard, and everything practical about the apartment (parking, stairs, fuse box, coffee).",
    url,
    ...(code ? ["", `The key box code: ${code}`] : []),
    "",
    "Enjoy your stay!",
    "Alexandre",
  ],
  de: ({ url, code }) => [
    "Guten Tag,",
    "",
    "hier ist der Ankunftsguide: der Weg in Bildern ab dem col du Mollard und alles Praktische zur Wohnung (Parken, Treppe, Sicherungskasten, Kaffee).",
    url,
    ...(code ? ["", `Der Code der Schlüsselbox: ${code}`] : []),
    "",
    "Einen schönen Aufenthalt!",
    "Alexandre",
  ],
  es: ({ url, code }) => [
    "Buenos días:",
    "",
    "Aquí tiene la guía de llegada: el itinerario en fotos desde el col du Mollard y todo lo práctico del apartamento (aparcamiento, escalera, cuadro eléctrico, café).",
    url,
    ...(code ? ["", `El código de la caja de llaves: ${code}`] : []),
    "",
    "¡Feliz estancia!",
    "Alexandre",
  ],
  it: ({ url, code }) => [
    "Buongiorno,",
    "",
    "ecco la guida all'arrivo: l'itinerario in foto dal col du Mollard e tutto il pratico dell'appartamento (parcheggio, scale, quadro elettrico, caffè).",
    url,
    ...(code ? ["", `Il codice della cassetta portachiavi: ${code}`] : []),
    "",
    "Buon soggiorno!",
    "Alexandre",
  ],
};

export function messageVoyageur(
  locale: Locale,
  { url, code }: { url: string; code?: string },
): string {
  return MESSAGES[locale]({ url, code }).join("\n");
}
