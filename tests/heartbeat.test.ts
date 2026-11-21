import { describe, expect, it, vi } from "vitest";
import { recordHeartbeat, type HeartbeatStore } from "@sejour/socle/lib/heartbeat";
import { checkHeartbeat, EXPECTED_CRONS, HEARTBEAT_PREFIX } from "@/lib/heartbeat";

function memory(): HeartbeatStore & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return { data, get: async (k) => data.get(k) ?? null, set: async (k, v) => void data.set(k, v) };
}
const T = new Date("2026-11-21T10:00:00Z");
const plus = (min: number) => new Date(T.getTime() + min * 60_000);

async function allBeat(s: HeartbeatStore, at: Date) {
  for (const { name } of EXPECTED_CRONS) await recordHeartbeat(s, HEARTBEAT_PREFIX, name, "ok", at);
}

describe("checkHeartbeat (Albiez)", () => {
  it("premier appel : délai de grâce, 200, aucune alerte", async () => {
    const s = memory();
    const send = vi.fn(async () => {});
    expect(await checkHeartbeat(s, T, send)).toEqual({ status: 200, body: { ok: true, overdue: 0 } });
    expect(send).not.toHaveBeenCalled();
  });

  it("cron en retard : 503 avec un compte seulement, une alerte, puis plus rien", async () => {
    const s = memory();
    await allBeat(s, T);
    await recordHeartbeat(s, HEARTBEAT_PREFIX, "messages-voyageurs", "ok", plus(-60));
    const send = vi.fn(async () => {});
    const r = await checkHeartbeat(s, plus(1), send);
    expect(r).toEqual({ status: 503, body: { ok: false, overdue: 1 } });
    expect(JSON.stringify(r)).not.toContain("messages");
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]).toEqual([expect.stringContaining("1 cron(s) en retard"), expect.stringContaining("messages-voyageurs"), 4]);
    await checkHeartbeat(s, plus(2), send);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("rétablissement : un message en priorité 1", async () => {
    const s = memory();
    await allBeat(s, T);
    await recordHeartbeat(s, HEARTBEAT_PREFIX, "messages-voyageurs", "ok", plus(-60));
    const send = vi.fn(async () => {});
    await checkHeartbeat(s, plus(1), send);
    await recordHeartbeat(s, HEARTBEAT_PREFIX, "messages-voyageurs", "ok", plus(2));
    expect((await checkHeartbeat(s, plus(3), send)).status).toBe(200);
    expect(send).toHaveBeenLastCalledWith("Albiez — crons rétablis", expect.any(String), 1);
  });

  it("ntfy en panne : l'état n'est pas écrit, l'alerte repart à l'appel suivant", async () => {
    const s = memory();
    await allBeat(s, T);
    await recordHeartbeat(s, HEARTBEAT_PREFIX, "price-grid", "ok", plus(-120));
    const failing = vi.fn(async () => {
      throw new Error("ntfy 500");
    });
    expect((await checkHeartbeat(s, plus(1), failing)).status).toBe(503);
    expect(s.data.has("albiez:alert:heartbeat")).toBe(false);
    const send = vi.fn(async () => {});
    await checkHeartbeat(s, plus(2), send);
    expect(send).toHaveBeenCalledTimes(1);
  });
});
