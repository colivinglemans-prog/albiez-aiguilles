import type { HeartbeatStore } from "@sejour/socle/lib/heartbeat";

/**
 * Magasin clé → chaîne sur l'API REST d'Upstash (Vercel Marketplace → Upstash for Redis), sans
 * dépendance : deux appels `fetch`. Albiez n'avait aucun stockage jusqu'ici ; il sert à l'état de
 * l'indexation automatique (`/api/cron/indexing`, socle v3.24.0).
 *
 * Variables posées par l'intégration Vercel : `KV_REST_API_URL` et `KV_REST_API_TOKEN` (les
 * mêmes noms que chez Barbusse). Le jeton ne sort jamais : aucune URL ni réponse brute dans un
 * message d'erreur.
 */
export function hasKv(): boolean {
  return Boolean(process.env.KV_REST_API_URL?.trim() && process.env.KV_REST_API_TOKEN?.trim());
}

export function kvStore(): HeartbeatStore {
  const url = process.env.KV_REST_API_URL!.trim().replace(/\/+$/, "");
  const headers = { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN!.trim()}` };
  const call = async (path: string, init: RequestInit = {}) => {
    const res = await fetch(`${url}${path}`, { ...init, headers: { ...headers, ...init.headers }, cache: "no-store" });
    if (!res.ok) throw new Error(`Upstash a répondu ${res.status}.`);
    return (await res.json()) as { result?: unknown };
  };
  return {
    async get(key) {
      const { result } = await call(`/get/${encodeURIComponent(key)}`);
      return typeof result === "string" ? result : result == null ? null : JSON.stringify(result);
    },
    async set(key, value) {
      await call(`/set/${encodeURIComponent(key)}`, { method: "POST", body: value });
    },
  };
}

/** Magasin en mémoire, vide : sert au `?dry=1` tant qu'Upstash n'est pas branché (amorçage seul). */
export function emptyStore(): HeartbeatStore {
  const data = new Map<string, string>();
  return {
    async get(key) {
      return data.get(key) ?? null;
    },
    async set(key, value) {
      data.set(key, value);
    },
  };
}
