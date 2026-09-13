/**
 * Les langues du site — **monté au socle**, `@sejour/socle/lib/locales`.
 *
 * Ce fichier ne garde qu'un ré-export, pour deux raisons : les quarante appelants du site
 * continuent d'écrire `@/lib/i18n`, et le point d'entrée reste lisible pour qui cherche
 * « où sont déclarées les langues ». La définition, elle, n'existe plus qu'à un endroit.
 *
 * Le ré-export conserve la propriété qui a fait naître ce fichier : **aucune dépendance**.
 * Le module du socle n'importe rien non plus, ce qui le laisse chargeable par le proxy
 * (runtime edge) comme par un composant client. Ne pas ajouter d'import ici.
 */
export * from "@sejour/socle/lib/locales";
