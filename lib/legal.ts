/**
 * Identité de l'éditeur du site.
 *
 * Le bien d'Albiez est détenu par la SCI JUARISAL — entité distincte de l'entreprise
 * individuelle qui exploite la maison du Mans. C'est la SCI qui édite ce site et qui
 * émettra les factures : ne jamais reprendre ici les informations de l'autre structure.
 *
 * Source : annuaire-entreprises.data.gouv.fr (données INPI/INSEE).
 */
export const LEGAL_ENTITY = {
  legalName: "JUARISAL",
  legalForm: "Société civile immobilière (SCI)",
  siren: "877 554 147",
  siret: "877 554 147 00018",
  shareCapital: "1 000 €",
  registeredOffice: "3 rue du Panorama, 92320 Châtillon, France",
  apeCode: "68.20B",
  apeLabel: "Location de terrains et d'autres biens immobiliers",
  createdOn: "2019-09-18",
} as const;

/** Hébergeur du site — à ajuster si le déploiement change de fournisseur. */
export const HOST_PROVIDER = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  website: "https://vercel.com",
} as const;
