import { NextResponse } from "next/server";
import { setAuthCookie } from "@sejour/socle/lib/auth-cookie";
import { auth } from "@/lib/auth";

/**
 * Un mot de passe par rôle. `DASHBOARD_PASSWORD` ouvre tout ; n'importe quelle variable
 * commençant par `DASHBOARD_PASSWORD_MENAGE` — ou `DASHBOARD_PASSWORD_VIEWER`, son futur nom —
 * ouvre le calendrier seul, ce qui permet d'en donner un différent à chaque personne
 * (`DASHBOARD_PASSWORD_MENAGE_Sylvie`) et d'en révoquer un sans changer celui des autres.
 * La résolution est dans le socle.
 */
export async function POST(request: Request) {
  const { motDePasse } = (await request.json().catch(() => ({}))) as { motDePasse?: string };

  const role = auth.roleForPassword(motDePasse);
  if (!role) {
    // Même message quel que soit le motif : ne pas indiquer si le mot de passe est vide,
    // inexistant ou simplement faux.
    return NextResponse.json({ erreur: "Mot de passe incorrect" }, { status: 401 });
  }

  await setAuthCookie(await auth.createToken(role));
  return NextResponse.json({ ok: true, role });
}
