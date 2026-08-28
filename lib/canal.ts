import type { Canal } from "@/lib/dashboard-types";

export const CANAUX: Canal[] = ["Airbnb", "Booking.com", "Abritel", "Direct"];

/**
 * Couleurs des canaux, partagées par le graphe, le camembert et le calendrier.
 * Reprises de l'identité de chaque plateforme pour que la lecture soit immédiate.
 */
export const COULEUR_CANAL: Record<Canal, string> = {
  Airbnb: "#FF385C",
  "Booking.com": "#003580",
  Abritel: "#1668E3",
  Direct: "#0E9F6E",
};

/**
 * Ramène les libellés hétéroclites de Beds24 à nos quatre canaux.
 *
 * Beds24 remplit `referer` et `channel` de façon inconstante selon la connexion : d'où le
 * test sur les deux. Tout ce qui n'est identifié à aucune plateforme est du direct — c'est
 * le bon défaut, une réservation prise à la main n'ayant pas de canal.
 */
export function normaliserCanal(referer?: string, channel?: string): Canal {
  const c = (channel ?? "").toLowerCase();
  const r = (referer ?? "").toLowerCase();
  if (c === "airbnb" || r.includes("airbnb")) return "Airbnb";
  if (c.includes("booking") || r.includes("booking")) return "Booking.com";
  if (c === "vrbo" || r.includes("abritel") || r.includes("homeaway") || r.includes("vrbo")) {
    return "Abritel";
  }
  return "Direct";
}
