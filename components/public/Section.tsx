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
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-secondary">{subtitle}</p>}
    </div>
  );
}
