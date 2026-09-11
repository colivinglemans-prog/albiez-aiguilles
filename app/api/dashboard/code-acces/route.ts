import { NextResponse, type NextRequest } from "next/server";
import { guard } from "@/lib/auth";

/**
 * Code de la boîte à clés.
 *
 * **Admin uniquement**, comme l'écriture des consignes : le rôle `viewer` n'a aucune raison
 * d'ouvrir la porte à distance, et le contrôle est ici plutôt que dans l'interface — un bloc
 * masqué côté client n'empêche personne d'appeler la route à la main.
 *
 * **Le code est unique et statique** : Albiez a une boîte à clés mécanique, pas une serrure
 * connectée. Il n'y a donc rien à demander par réservation, et cette route ne prend aucun
 * identifiant de séjour — contrairement à Barbusse, dont le PIN Nuki est propre à chaque
 * séjour et n'existe qu'à J-6.
 *
 * ⚠️ **Le dépôt est public.** La valeur ne vit que dans `ALBIEZ_CODE_BOITE_A_CLES`, jamais
 * dans le code, jamais dans un commentaire, jamais dans un test — et jamais dans un log :
 * les journaux de production se lisent depuis plus d'endroits que cette réponse.
 */
export async function GET(request: NextRequest) {
  const refus = await guard.denyNonAdmin(request);
  if (refus) return refus;

  const code = process.env.ALBIEZ_CODE_BOITE_A_CLES?.trim();

  // `null` et non une erreur quand la variable manque : l'interface le dit, et le reste du
  // bloc de partage (les liens du guide) continue de servir.
  return NextResponse.json({ code: code || null });
}
