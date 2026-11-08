export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-14 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({
  title,
  subtitle,
  as: Heading = "h2",
}: {
  title: string;
  subtitle?: string;
  /**
   * `h1` quand le titre est celui de la page : les conditions n'avaient aucun `<h1>` dans les
   * cinq langues (audit du 2026-11-08), leur seul titre passant par ce composant.
   */
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <Heading className="text-2xl font-bold sm:text-3xl">{title}</Heading>
      {subtitle && <p className="mt-3 text-secondary">{subtitle}</p>}
    </div>
  );
}
