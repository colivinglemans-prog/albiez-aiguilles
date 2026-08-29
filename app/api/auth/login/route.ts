import { NextResponse } from "next/server";
import { createToken, setAuthCookie, type Role } from "@/lib/auth";

/**
 * Un mot de passe par rôle. `DASHBOARD_PASSWORD` ouvre tout ; n'importe quelle variable
 * commençant par `DASHBOARD_PASSWORD_MENAGE` ouvre le calendrier seul — ce qui permet d'en
 * donner un différent à chaque personne (`DASHBOARD_PASSWORD_MENAGE_Sylvie`) et d'en révoquer
 * un sans changer celui des autres.
 */
export async function POST(request: Request) {
  const { motDePasse } = (await request.json().catch(() => ({}))) as { motDePasse?: string };

  let role: Role | null = null;
  if (motDePasse && process.env.DASHBOARD_PASSWORD && motDePasse === process.env.DASHBOARD_PASSWORD) {
    role = "admin";
  } else if (
    motDePasse &&
    Object.entries(process.env).some(
      ([cle, valeur]) =>
        cle.startsWith("DASHBOARD_PASSWORD_MENAGE") && !!valeur && valeur === motDePasse,
    )
  ) {
    role = "menage";
  }

  if (!role) {
    // Même message quel que soit le motif : ne pas indiquer si le mot de passe est vide,
    // inexistant ou simplement faux.
    return NextResponse.json({ erreur: "Mot de passe incorrect" }, { status: 401 });
  }

  await setAuthCookie(await createToken(role));
  return NextResponse.json({ ok: true, role });
}
