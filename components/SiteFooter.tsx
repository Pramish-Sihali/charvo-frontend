export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-[color:var(--muted)]">
        <p className="mb-2">© {new Date().getFullYear()} CharcoalX. All rights reserved.</p>
        <p className="text-xs leading-relaxed">
          Smoking is harmful to your health. CharcoalX activated charcoal filters are a
          harm-reduction product that adsorbs particulate and tar for a cleaner draw —
          they do not make smoking safe. 18+ only. Not a medical device.
        </p>
      </div>
    </footer>
  );
}
