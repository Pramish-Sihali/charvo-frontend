"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Cell = {
  src: string;
  gridClass: string;
  drift: { x: number; y: number; rotate: number };
};

// Bento layout: 4 cols × 3 rows. Tailwind class strings are written literally
// so the JIT can pick them up at build time.
const CELLS: Cell[] = [
  // Tall left — hero box
  {
    src: "/images/image (7).png",
    gridClass: "col-start-1 row-start-1 row-span-2",
    drift: { x: -260, y: -120, rotate: -8 },
  },
  // Top center-left — trio
  {
    src: "/images/image (8).png",
    gridClass: "col-start-2 row-start-1",
    drift: { x: -120, y: -240, rotate: -4 },
  },
  // Top center-right — papers
  {
    src: "/images/image (5).png",
    gridClass: "col-start-3 row-start-1",
    drift: { x: 120, y: -240, rotate: 5 },
  },
  // Tall right — complete kit
  {
    src: "/images/image (4).png",
    gridClass: "col-start-4 row-start-1 row-span-3",
    drift: { x: 280, y: -80, rotate: 7 },
  },
  // Middle wide — both boxes
  {
    src: "/images/image (3).png",
    gridClass: "col-start-2 col-span-2 row-start-2",
    drift: { x: 0, y: 40, rotate: 2 },
  },
  // Bottom-left — lifestyle smoke
  {
    src: "/images/image (5).png",
    gridClass: "col-start-1 row-start-3",
    drift: { x: -220, y: 220, rotate: -6 },
  },
  // Bottom wide — rolling action
  {
    src: "/images/image (3).png",
    gridClass: "col-start-2 col-span-2 row-start-3",
    drift: { x: 80, y: 280, rotate: 4 },
  },
];

const BASE_OPACITY = 0.4;

export function HeroCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // 0 when hero top is at viewport top, 1 when scrolled one full height past.
      const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
      setProgress(p);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Reveal: cells start at BASE_OPACITY and grow more prominent as the user
  // scrolls through the hero, settling at near-full opacity.
  const opacity = Math.min(0.95, BASE_OPACITY + progress * 0.6);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none select-none"
      aria-hidden
    >
      <div className="grid grid-cols-4 grid-rows-3 gap-3 h-full w-full p-4 md:p-6">
        {CELLS.map(({ src, gridClass, drift }) => (
          <div
            key={src}
            className={`${gridClass} relative overflow-hidden bg-[color:var(--surface-2)]`}
            style={{
              opacity,
              willChange: "transform, opacity",
              transform: `translate3d(${drift.x * progress}px, ${drift.y * progress}px, 0) rotate(${drift.rotate * progress}deg)`,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
