export function ScienceDiagram() {
  return (
    <svg
      viewBox="0 0 600 220"
      className="w-full max-w-2xl text-[color:var(--foreground)]"
      fill="none"
      aria-label="Activated carbon adsorbs tar and particulate as smoke passes through"
    >
      {/* tube outline (hairline) */}
      <rect x="80" y="80" width="440" height="60" rx="30" stroke="currentColor" strokeWidth="1" />
      {/* carbon granules */}
      {Array.from({ length: 36 }).map((_, i) => (
        <circle
          key={i}
          cx={100 + i * 11}
          cy={110}
          r={2 + (i % 3)}
          fill="currentColor"
          fillOpacity={0.25 + (i % 4) * 0.1}
        />
      ))}
      {/* arrow in */}
      <line x1="20" y1="110" x2="78" y2="110" stroke="currentColor" strokeWidth="1" markerEnd="url(#arr)" />
      <text
        x="20"
        y="80"
        fill="currentColor"
        fontFamily="var(--font-serif), Georgia, serif"
        fontStyle="italic"
        fontSize="14"
      >
        smoke in
      </text>
      {/* arrow out */}
      <line x1="522" y1="110" x2="580" y2="110" stroke="currentColor" strokeWidth="1" markerEnd="url(#arr)" />
      <text
        x="510"
        y="160"
        fill="currentColor"
        fontFamily="var(--font-serif), Georgia, serif"
        fontStyle="italic"
        fontSize="14"
        textAnchor="end"
      >
        cleaner draw
      </text>
      {/* tick labels under tube */}
      <text x="80" y="180" fill="currentColor" fontSize="10" letterSpacing="0.18em">
        IN
      </text>
      <text x="520" y="180" fill="currentColor" fontSize="10" letterSpacing="0.18em" textAnchor="end">
        OUT
      </text>
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
        </marker>
      </defs>
    </svg>
  );
}
