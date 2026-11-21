import { NextResponse } from "next/server";
import { checkHeartbeat } from "@/lib/heartbeat";
import { hasKv, kvStore } from "@/lib/kv";

/**
 * Les crons d'Albiez sont-ils passés à temps ? **Publique**, sans authentification : la
 * surveillance GitHub (`surveillance.yml`) et un job cron-job.org l'appellent. Hors du `matcher`
 * de `proxy.ts`.
 *
 * La réponse ne porte **qu'un booléen et un compte** (`heartbeatResponse`) : ni le nom des
 * crons, ni l'heure de leur dernier passage. Les noms partent par ntfy, une fois par changement
 * d'état (`albiez:alert:heartbeat`) : un appel répété ne renvoie rien de plus.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET() {
  if (!hasKv()) return NextResponse.json({ ok: false }, { status: 500, headers: NO_STORE });
  try {
    const { status, body } = await checkHeartbeat(kvStore(), new Date());
    return NextResponse.json(body, { status, headers: NO_STORE });
  } catch (e) {
    console.error("[heartbeat]", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false }, { status: 500, headers: NO_STORE });
  }
}
