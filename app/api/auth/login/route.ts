import { NextResponse } from "next/server";
import { createToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const attendu = process.env.DASHBOARD_PASSWORD;
  if (!attendu) {
    return NextResponse.json({ erreur: "DASHBOARD_PASSWORD n'est pas configuré" }, { status: 500 });
  }

  const { motDePasse } = (await request.json().catch(() => ({}))) as { motDePasse?: string };
  if (!motDePasse || motDePasse !== attendu) {
    // Même message et même délai quel que soit le motif : ne pas indiquer si le mot de passe
    // existe, est vide ou est simplement faux.
    return NextResponse.json({ erreur: "Mot de passe incorrect" }, { status: 401 });
  }

  await setAuthCookie(await createToken());
  return NextResponse.json({ ok: true });
}
