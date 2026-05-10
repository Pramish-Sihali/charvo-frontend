export function ScienceDiagram() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full max-w-xl text-[color:var(--accent)]"
      fill="none"
      aria-label="Activated carbon adsorbs tar and particulate as smoke passes through"
    >
      {/* tube */}
      <rect x="40" y="80" width="320" height="40" rx="20" stroke="currentColor" strokeWidth="2" fill="var(--surface-2)" />
      {/* carbon granules */}
      {Array.from({ length: 30 }).map((_, i) => (
        <circle
          key={i}
          cx={60 + (i * 9)}
          cy={100}
          r={3 + (i % 3)}
          fill="currentColor"
          fillOpacity={0.4 + (i % 4) * 0.15}
        />
      ))}
      {/* arrow in */}
      <path d="M 10 100 L 40 100" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="10" y="80" fill="var(--muted)" fontSize="11">smoke in</text>
      {/* arrow out */}
      <path d="M 360 100 L 390 100" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="340" y="140" fill="var(--muted)" fontSize="11">cleaner draw</text>
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
        </marker>
      </defs>
    </svg>
  );
}
