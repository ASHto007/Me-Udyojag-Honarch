/** Decorative section name, kept out of the reading and interaction order. */
export function SectionBackdrop({ label }: { label: string }) {
  return (
    <div className="section-backdrop" aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
