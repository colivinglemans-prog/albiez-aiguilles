import type { Beds24Booking, Beds24Message } from "@sejour/socle/lib/beds24-types";
import { messagingChannel, realGuestEmail } from "@sejour/socle/lib/guest-messaging/channel-rules";
import { sendNow, sendPlanned, type DispatchDeps, type DispatchItemResult, type DispatchResult } from "@sejour/socle/lib/guest-messaging/dispatch";
import { pickGuestLocale } from "@sejour/socle/lib/guest-messaging/language";
import { ledgerCode, ledgerFromInfoItems, ledgerFromThread, ledgerText } from "@sejour/socle/lib/guest-messaging/ledger";
import {
  buildGuestMessagesReport,
  buildPreview,
  type GuestMessagePreview,
  type GuestMessagesReport,
  type TemplateMode,
} from "@sejour/socle/lib/guest-messaging/overview";
import type { Vars } from "@sejour/socle/lib/guest-messaging/render";
import { addDays, planMessages } from "@sejour/socle/lib/guest-messaging/schedule";
import { createSmtpTransport, smtpConfigFrom } from "@sejour/socle/lib/guest-messaging/smtp";
import type { MessageTemplate, MessagingBooking } from "@sejour/socle/lib/guest-messaging/types";
import { todayParis } from "@sejour/socle/lib/time";
import {
  creditsBeds24,
  ecrireRegistre,
  envoyerMessagePlateforme,
  filReservation,
  kitLingePris,
  messagesHote,
  reservationMessagerie,
  reservationsMessagerie,
} from "@/lib/beds24";
import { urlGuideArrivee } from "@/lib/partage-voyageur";
import { PROPERTY, SITE_URL } from "@/lib/property";
import { saisonsEntre } from "@/lib/seasons";
import { TEMPLATES } from "./templates";

/**
 * La messagerie voyageur d'Albiez : ce que le moteur du socle (`@sejour/socle/lib/guest-messaging`)
 * ne peut pas savoir seul.
 *
 * - **Réservations** : lues avec le jeton de messagerie (prénom, adresse, langue), fraîches.
 * - **Registre** : les `infoItems` `MSG_*` (jeton d'écriture), plus les messages de l'hôte
 *   reconnus dans les fils — c'est ce qui reprend l'historique des envois faits à la main.
 * - **Variables** : URL des guides dans la langue, contact, code de la boîte à clés (variable
 *   d'environnement, lue à l'envoi), kit linge selon le canal, hiver selon les **dates du séjour**
 *   (jamais `currentSeason()`, faite pour la vitrine).
 * - **Modes** : `MESSAGES_MODES` (`avant-arrivee:live,code-boite:shadow,…`), **ombre par défaut** ;
 *   `MESSAGES_KILL_SWITCH=1` coupe tout envoi.
 *
 * Aucune donnée du voyageur ni aucun texte rendu ne sort de ce module, sauf vers Beds24 ou le
 * serveur SMTP. L'aperçu passe par `buildPreview`, qui masque tout sauf le prénom.
 */

/** Fenêtre lue : les séjours terminés depuis 60 jours (historique) jusqu'aux arrivées à 4 mois. */
const PAST_DAYS = 60;
const AHEAD_DAYS = 120;
/** Plafond d'envois par passage du cron : au-delà, rien ne part (un pic est un bug). */
export const CAP = 5;

const IDS = TEMPLATES.map((t) => t.id);

/** Modes effectifs. L'interrupteur général donne des modes tous `off` — c'est ce que voit le moteur. */
export function modes(): { modes: Record<string, TemplateMode>; display: Record<string, TemplateMode>; killSwitch: boolean } {
  const display: Record<string, TemplateMode> = Object.fromEntries(IDS.map((id) => [id, "shadow" as TemplateMode]));
  for (const part of (process.env.MESSAGES_MODES ?? "").split(",")) {
    const [id, mode] = part.split(":").map((x) => x?.trim());
    if (id && IDS.includes(id) && (mode === "off" || mode === "shadow" || mode === "live")) display[id] = mode;
  }
  const killSwitch = process.env.MESSAGES_KILL_SWITCH?.trim() === "1";
  const effective = killSwitch ? Object.fromEntries(IDS.map((id) => [id, "off" as TemplateMode])) : display;
  return { modes: effective, display, killSwitch };
}

type Row = MessagingBooking & { firstName?: string };

function toMessagingBooking(b: Beds24Booking, thread: readonly Beds24Message[]): Row {
  const { locale, source } = pickGuestLocale({ lang: b.lang, country: b.country });
  return {
    id: b.id,
    status: b.status,
    channel: messagingChannel(b),
    arrival: b.arrival,
    departure: b.departure,
    bookingTime: b.bookingTime,
    locale,
    localeSource: source,
    email: realGuestEmail(b.email),
    infoCodes: (b.infoItems ?? []).map((i) => i.code),
    ledger: [...ledgerFromInfoItems(b.infoItems, IDS), ...ledgerFromThread(thread, TEMPLATES)],
    firstName: b.firstName?.trim() || undefined,
  };
}

const propertyId = () => Number(process.env.BEDS24_PROPERTY_ID);

/** Réservations de la fenêtre, avec leur registre et l'historique des fils. */
async function loadRows(): Promise<Row[]> {
  const today = todayParis();
  const [bookings, host] = await Promise.all([
    reservationsMessagerie({ departDu: addDays(today, -PAST_DAYS), arriveeAu: addDays(today, AHEAD_DAYS) }),
    messagesHote(PAST_DAYS + AHEAD_DAYS),
  ]);
  const byBooking = new Map<number, Beds24Message[]>();
  for (const m of host) byBooking.set(m.bookingId, [...(byBooking.get(m.bookingId) ?? []), m]);
  return bookings
    .filter((b) => !propertyId() || b.propertyId === propertyId())
    .map((b) => toMessagingBooking(b, byBooking.get(b.id) ?? []));
}

async function reload(id: number): Promise<Row | null> {
  const [b, thread] = await Promise.all([reservationMessagerie(id), filReservation(id)]);
  if (!b || (propertyId() && b.propertyId !== propertyId())) return null;
  return toMessagingBooking(b, thread);
}

/** Valeurs des variables, en clair. Ne sortent que vers Beds24, le SMTP, ou `buildPreview` (masquées). */
async function variables(b: Row, t: MessageTemplate): Promise<Vars> {
  const vars: Record<string, string | undefined> = {
    prenom: b.firstName,
    guideArrivee: urlGuideArrivee(b.locale),
    guide: `${SITE_URL}/${b.locale}/guide`,
    telephone: formatPhone(PROPERTY.contact.phone),
    whatsapp: PROPERTY.contact.whatsapp,
  };
  if (t.variables.includes("code")) vars.code = process.env.ALBIEZ_CODE_BOITE_A_CLES?.trim() || undefined;
  if (t.optionalVariables?.includes("kitInclus")) {
    const kit = await linenOf(b);
    if (kit === "included") vars.kitInclus = "1";
    if (kit === "absent") vars.kitAbsent = "1";
  }
  if (t.optionalVariables?.includes("hiver") && saisonsEntre(b.arrival, b.departure).some((s) => s.saison === "hiver")) {
    vars.hiver = "1";
  }
  return vars;
}

/**
 * Le kit linge selon le canal (`docs/auto-actions-beds24.md`) : obligatoire et inclus chez
 * Booking.com, non inclus chez Airbnb (il se règle par le centre de résolution), option payante
 * en direct — lue dans la facture. Inconnu ailleurs : le message n'en parle pas.
 */
async function linenOf(b: Row): Promise<"included" | "absent" | null> {
  if (b.channel === "Booking.com") return "included";
  if (b.channel === "Airbnb") return "absent";
  if (b.channel === "Direct") return (await kitLingePris(b.id)) ? "included" : "absent";
  return null;
}

/** « +33620921005 » → « +33 6 20 92 10 05 ». */
function formatPhone(e164: string): string {
  const m = /^\+33(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/.exec(e164);
  return m ? `+33 ${m.slice(1).join(" ")}` : e164;
}

function deps(): DispatchDeps {
  const smtp = smtpConfigFrom(process.env);
  return {
    reload,
    variables: (b, t) => variables(b as Row, t),
    async ready(_b, t) {
      if (t.variables.includes("code") && !process.env.ALBIEZ_CODE_BOITE_A_CLES?.trim()) return { ok: false, reason: "no-access-code" };
      return { ok: true };
    },
    reserve: (b, t, e) => ecrireRegistre(b.id, ledgerCode(t.id, "pending"), ledgerText({ ...e, version: t.version })),
    confirm: (b, t, e) => ecrireRegistre(b.id, ledgerCode(t.id, "sent"), ledgerText({ ...e, version: t.version })),
    platform: envoyerMessagePlateforme,
    email: smtp ? createSmtpTransport({ ...smtp, fromName: smtp.fromName ?? "Albiez — Isabelle et Alexandre" }) : null,
  };
}

/** Écran de suivi : toutes les réservations de la fenêtre, ou une seule. */
export async function report(bookingId?: number): Promise<GuestMessagesReport> {
  const rows = await loadRows();
  const { display, killSwitch } = modes();
  return buildGuestMessagesReport({
    bookings: bookingId === undefined ? rows : rows.filter((r) => r.id === bookingId),
    templates: TEMPLATES,
    modes: display,
    killSwitch,
    now: new Date(),
    quotaRemaining: creditsBeds24(),
  });
}

/** Aperçu d'un message pour une réservation — variables masquées sauf le prénom. */
export async function preview(bookingId: number, templateId: string): Promise<GuestMessagePreview | null> {
  const t = TEMPLATES.find((x) => x.id === templateId);
  const b = await reload(bookingId);
  if (!t || !b) return null;
  return buildPreview(t, b, await variables(b, t));
}

/** Passage du cron. */
export async function runCron(now = new Date()): Promise<DispatchResult & { planned: number }> {
  const rows = await loadRows();
  const { modes: m } = modes();
  const plan = planMessages(rows, TEMPLATES, now);
  const result = await sendPlanned(plan, TEMPLATES, deps(), { now, cap: CAP, modes: m });
  return { ...result, planned: plan.filter((p) => p.state.kind === "due").length };
}

/** Envoi manuel depuis le dashboard. */
export async function sendOne(bookingId: number, templateId: string): Promise<DispatchItemResult | null> {
  const t = TEMPLATES.find((x) => x.id === templateId);
  if (!t) return null;
  return sendNow(bookingId, t, deps(), { now: new Date(), modes: modes().modes });
}

export const TEMPLATE_IDS = IDS;
