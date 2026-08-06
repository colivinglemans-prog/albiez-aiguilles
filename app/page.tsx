import { redirect } from "next/navigation";
import { headers } from "next/headers";

/** `/` n'est pas une page indexable : on oriente vers la langue du visiteur. */
export default async function RootPage() {
  const h = await headers();
  const first = (h.get("accept-language") || "").toLowerCase().split(",")[0]?.trim();
  redirect(first?.startsWith("en") ? "/en" : "/fr");
}
