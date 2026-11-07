/**
 * Contrôles propres à Albiez, écrits sur le contrat `Check` du socle et branchés par
 * `site.ts` dans `extraChecks`.
 *
 * Mêmes règles que le moteur : un résultat ne porte que des compteurs, des booléens et une
 * phrase écrite ici. Jamais une date (elle dirait dans un log public quand le logement est
 * occupé), jamais un extrait de page.
 */
import { readFileSync } from "node:fs";
import { PERIODES, type Periode } from "@sejour/socle/lib/periodes";
import { addDays, addMonths } from "@sejour/socle/lib/dates";
import { runPool } from "@sejour/socle/testing/deploy/http";
import { fetchSiteWindow, parisToday, windowAt } from "@sejour/socle/testing/deploy/checks/calendar";
import { containsNormalized, matchesAny } from "@sejour/socle/testing/deploy/normalize";
import type { Check, CheckOutcome } from "@sejour/socle/testing/deploy/types";
import type { BandeauSaison } from "@/lib/seasons";

// ─── Rotation du samedi ─────────────────────────────────────────────────────

/** Une plage de vacances d'hiver à contrôler, bornes incluses. */
export interface HolidayBlock {
  from: string;
  to: string;
}

/** Périodes de forte demande d'hiver : Noël, Jour de l'An, vacances d'Hiver (toutes zones). */
function isWinterHoliday(p: Periode): boolean {
  return p.type === "fete" || p.nom.startsWith("Vacances de Noël") || p.nom.startsWith("Vacances d'Hiver");
}

/** Moins d'une semaine restante : il peut ne rester que des samedis, la liste vide est normale. */
const MIN_REMAINING_DAYS = 7;

/**
 * Les plages de vacances d'hiver **à venir** pendant une ouverture déclarée du domaine
 * (`HIVERS`), zones fusionnées, rognées au lendemain de `today`.
 *
 * Ce calcul ne dit **pas** quels jours sont fermés : Beds24 seul en décide (voir CLAUDE.md,
 * « Rotation du samedi »). Il dit seulement où la liste `sansArrivee` ne peut pas être vide.
 */
export function upcomingWinterHolidayBlocks(
  today: string,
  hivers: readonly BandeauSaison[],
  periodes: readonly Periode[] = PERIODES,
): HolidayBlock[] {
  const tomorrow = addDays(today, 1);
  const winters = hivers.filter((h) => h.saison === "hiver" && h.fin >= tomorrow);
  const ranges = periodes
    .filter(isWinterHoliday)
    .filter((p) => p.fin >= tomorrow && winters.some((h) => p.debut <= h.fin && p.fin >= h.debut))
    .map((p) => ({ from: p.debut < tomorrow ? tomorrow : p.debut, to: p.fin }))
    .sort((a, b) => a.from.localeCompare(b.from));

  const blocks: HolidayBlock[] = [];
  for (const r of ranges) {
    const last = blocks[blocks.length - 1];
    if (last && r.from <= addDays(last.to, 1)) {
      if (r.to > last.to) last.to = r.to;
    } else {
      blocks.push({ ...r });
    }
  }
  return blocks.filter((b) => {
    let n = 0;
    for (let d = b.from; d <= b.to && n < MIN_REMAINING_DAYS; d = addDays(d, 1)) n++;
    return n >= MIN_REMAINING_DAYS;
  });
}

export function rotationCheck(hivers: readonly BandeauSaison[]): Check {
  return {
    id: "albiez.saturdayRotation",
    title: "La rotation du samedi est publiée pendant les vacances d'hiver à venir",
    level: "full",
    severity: "blocking",
    async run(ctx): Promise<CheckOutcome> {
      if (!ctx.site.availability.closedArrivalKey) {
        return { status: "error", detail: "closedArrivalKey n'est pas déclaré dans site.ts" };
      }
      const blocks = upcomingWinterHolidayBlocks(parisToday(ctx.now), hivers);
      if (blocks.length === 0) {
        return { status: "skip", detail: "Aucunes vacances d'hiver à venir dans une saison déclarée (HIVERS)" };
      }

      let unreadable = 0;
      const perBlock = await runPool(blocks, 2, async (b) => {
        // Fenêtres de deux mois alignées sur le mois, comme le composant, jusqu'à couvrir la plage.
        const closed = new Set<string>();
        let y = Number(b.from.slice(0, 4));
        let m = Number(b.from.slice(5, 7)) - 1;
        for (;;) {
          const w = await fetchSiteWindow(ctx, windowAt(y, m));
          if (w.status !== 200 || !w.dates) unreadable++;
          w.sansArrivee.forEach((d) => closed.add(d));
          if (w.to >= b.to) break;
          ({ year: y, month: m } = addMonths(y, m, 2));
        }
        let n = 0;
        for (const d of closed) if (d >= b.from && d <= b.to) n++;
        return n;
      });

      const without = perBlock.filter((n) => n === 0).length;
      const metrics = {
        blocks: blocks.length,
        blocksWithoutRotation: without,
        closedArrivalDays: perBlock.reduce((s, n) => s + n, 0),
        unreadableWindows: unreadable,
      };
      if (unreadable) {
        return { status: "error", metrics, detail: "Une fenêtre du calendrier public n'a pas pu être lue" };
      }
      return without
        ? {
            status: "fail",
            metrics,
            detail:
              "Aucun jour fermé à l'arrivée sur des vacances d'hiver à venir : la rotation du samedi n'est plus servie (override Beds24 retiré, ou `sansArrivee` perdu en route)",
          }
        : { status: "pass", metrics };
    },
  };
}

// ─── Mentions légales ───────────────────────────────────────────────────────

export function legalNoticeCheck(opts: {
  path: string;
  legalName: string;
  siren: string;
  /** Identifiants d'une autre entité, qui ne doivent jamais y figurer. */
  foreign: readonly (string | RegExp)[];
}): Check {
  return {
    id: "albiez.legalNotice",
    title: "Les mentions légales nomment la SCI JUARISAL et jamais l'autre entité",
    level: "full",
    severity: "blocking",
    async run(ctx): Promise<CheckOutcome> {
      const pages = ctx.site.locales.map((l) => `/${l}${opts.path}`);
      const counts = { pages: pages.length, unreadable: 0, missingName: 0, missingSiren: 0, foreignEntity: 0 };
      await runPool(pages, 5, async (p) => {
        const res = await ctx.http.get(p);
        if (res.status !== 200) {
          counts.unreadable++;
          return;
        }
        const text = await res.text();
        if (!containsNormalized(text, opts.legalName)) counts.missingName++;
        if (!containsNormalized(text, opts.siren)) counts.missingSiren++;
        counts.foreignEntity += matchesAny(text, opts.foreign);
      });
      if (counts.foreignEntity > 0) {
        return { status: "fail", metrics: counts, detail: "Un identifiant de l'autre entité figure dans les mentions légales" };
      }
      if (counts.missingName || counts.missingSiren) {
        return { status: "fail", metrics: counts, detail: "La raison sociale ou le SIREN de la SCI manque dans une langue" };
      }
      if (counts.unreadable) {
        return { status: "error", metrics: counts, detail: "Une page de mentions légales ne répond pas 200" };
      }
      return { status: "pass", metrics: counts };
    },
  };
}

// ─── Thème bleu alpin ───────────────────────────────────────────────────────

/** Valeur de `--site-primary` dans une feuille de styles, minifiée ou non. */
export function primaryDeclarations(css: string): string[] {
  return [...css.matchAll(/--site-primary\s*:\s*([^;}\s]+)/g)].map((m) => m[1].toLowerCase());
}

/** La couleur primaire que le site déclare, lue dans sa propre source (`app/globals.css`). */
export function declaredPrimary(globalsCssPath: string): string {
  const values = primaryDeclarations(readFileSync(globalsCssPath, "utf8"));
  if (values.length !== 1) throw new Error("app/globals.css doit déclarer --site-primary une seule fois");
  return values[0];
}

/**
 * Vérifiable sans navigateur : la feuille servie déclare `--site-primary` à la valeur de
 * `app/globals.css`, et à aucune autre. Ce contrôle prouve la feuille, pas le rendu : une
 * classe qui n'utiliserait pas le token reste du ressort du lot Playwright.
 */
export function themeCheck(expectedPrimary: string): Check {
  return {
    id: "albiez.theme",
    title: "La feuille de styles servie garde le bleu alpin",
    level: "full",
    severity: "blocking",
    async run(ctx): Promise<CheckOutcome> {
      const home = await ctx.http.get(`/${ctx.site.defaultLocale}`);
      if (home.status !== 200) {
        return { status: "error", metrics: { httpStatus: home.status }, detail: "L'accueil ne répond pas 200" };
      }
      const html = await home.text();
      const sheets = [...new Set([...html.matchAll(/href="(\/_next\/static\/[^"]+?\.css)(?:\?[^"]*)?"/g)].map((m) => m[1]))];
      let unreadable = 0;
      let matching = 0;
      let other = 0;
      await runPool(sheets, 4, async (href) => {
        const res = await ctx.http.get(href);
        if (res.status !== 200) {
          unreadable++;
          return;
        }
        for (const v of primaryDeclarations(await res.text())) {
          if (v === expectedPrimary) matching++;
          else other++;
        }
      });
      const metrics = { stylesheets: sheets.length, unreadable, matching, otherPrimary: other };
      if (other > 0) return { status: "fail", metrics, detail: "La feuille servie déclare une autre couleur primaire que le bleu alpin" };
      if (sheets.length === 0 || unreadable) return { status: "error", metrics, detail: "Feuille de styles introuvable ou illisible" };
      if (matching === 0) return { status: "fail", metrics, detail: "La couleur primaire du site est absente de la feuille servie" };
      return { status: "pass", metrics };
    },
  };
}

// ─── Code de la boîte à clés ────────────────────────────────────────────────

/**
 * Le code de la boîte à clés ne doit figurer dans aucune page publique ni dans `llms.txt`.
 *
 * Il ne vit que dans la variable `ALBIEZ_CODE_BOITE_A_CLES` : **jamais dans GitHub**, donc ce
 * contrôle donne `skip` en CI, et ne s'exécute qu'en local quand la variable est exportée à la
 * main. La valeur ne sort jamais : seul un nombre de pages concernées est rendu.
 */
export function keyBoxCodeCheck(pages: (locale: string) => string[]): Check {
  return {
    id: "albiez.keyBoxCode",
    title: "Le code de la boîte à clés n'apparaît sur aucune page publique",
    level: "full",
    severity: "blocking",
    async run(ctx): Promise<CheckOutcome> {
      const code = process.env.ALBIEZ_CODE_BOITE_A_CLES?.trim();
      if (!code) return { status: "skip", detail: "Code absent de l'environnement (normal en CI)" };
      const escaped = code.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`(?<![\\p{L}\\d])${escaped}(?![\\p{L}\\d])`, "u");
      const paths = [ctx.site.llms.path, ...ctx.site.locales.flatMap((l) => pages(l).map((p) => `/${l}${p}`))];
      let unreadable = 0;
      let found = 0;
      await runPool([...new Set(paths)], 6, async (p) => {
        const res = await ctx.http.get(p, { redirect: "follow" });
        if (res.status !== 200) {
          unreadable++;
          return;
        }
        if (matchesAny(await res.text(), [pattern]) > 0) found++;
      });
      const metrics = { pages: paths.length, unreadable, pagesWithCode: found };
      if (found) return { status: "fail", metrics, detail: "Le code de la boîte à clés figure sur une page publique" };
      if (unreadable) return { status: "error", metrics, detail: "Une page n'a pas répondu 200" };
      return { status: "pass", metrics };
    },
  };
}
