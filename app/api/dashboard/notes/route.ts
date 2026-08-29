import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, roleDuToken } from "@/lib/auth";
import { ecrireNotes } from "@/lib/beds24";

/**
 * Écriture d'une note interne sur une réservation.
 *
 * **Admin uniquement.** Le rôle `menage` lit les notes — elles sont écrites pour lui — mais
 * ne les modifie pas. Le contrôle est ici et pas seulement dans l'interface : un bouton
 * masqué n'empêche personne d'appeler la route à la main.
 *
 * Seules les réservations **vivantes** sont annotables : une note se range dans le champ
 * `notes` de Beds24, et un séjour archivé n'y existe plus.
 */
export async function POST(request: NextRequest) {
  if ((await roleDuToken(request.cookies.get(COOKIE_NAME)?.value ?? "")) !== "admin") {
    return NextResponse.json({ erreur: "Réservé à l'administrateur" }, { status: 403 });
  }

  const { id, notes } = (await request.json().catch(() => ({}))) as {
    id?: number;
    notes?: string;
  };

  if (typeof id !== "number" || !Number.isFinite(id)) {
    return NextResponse.json(
      { erreur: "Identifiant Beds24 manquant : ce séjour vient de l'archive et n'est pas annotable" },
      { status: 400 },
    );
  }

  try {
    await ecrireNotes(id, typeof notes === "string" ? notes : "");
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("Écriture des notes refusée :", message);
    return NextResponse.json({ erreur: message }, { status: 502 });
  }
}
