export type CatalogCategory = "filters" | "papers" | "kits";

export type CatalogProduct = {
  slug: string;
  name: string;
  category: CatalogCategory;
  tagline: string;
  description: string;
  price_cents: number;
  image: string;
  specs: Array<[string, string]>;
};

export const CATEGORIES: Record<
  CatalogCategory,
  { label: string; blurb: string; heroImage: string }
> = {
  filters: {
    label: "Filters",
    blurb: "Activated charcoal tips that adsorb tar and particulate for a cleaner draw.",
    heroImage: "/images/image (7).png",
  },
  papers: {
    label: "Papers",
    blurb: "Slow-burning unbleached hemp rolling papers paired with the Charvo tip.",
    heroImage: "/images/image (5).png",
  },
  kits: {
    label: "Kits & Bundles",
    blurb: "Everything you need, bundled and ready to carry.",
    heroImage: "/images/image (4).png",
  },
};

export const CATEGORY_ORDER: CatalogCategory[] = ["filters", "papers", "kits"];

export const CATALOG: CatalogProduct[] = [
  {
    slug: "classic-black",
    name: "Classic Black",
    category: "filters",
    tagline: "20-pack — the original",
    description:
      "Matte black activated charcoal tips, 20 per pack. Fits American Spirit and hand-rolled tobacco. The filter that started it all.",
    price_cents: 1299,
    image: "/images/image (7).png",
    specs: [
      ["Diameter", "6 mm"],
      ["Length", "27 mm"],
      ["Count", "20 per pack"],
      ["Carbon", "Coconut-shell, food-grade"],
      ["Activation", "Steam"],
      ["Finish", "Matte black wrap"],
      ["Use", "Single — one per cigarette"],
    ],
  },
  {
    slug: "natural",
    name: "Natural",
    category: "filters",
    tagline: "20-pack — unbleached",
    description:
      "Same activated carbon core, unbleached rice paper exterior. Cream finish for those who prefer a lighter aesthetic alongside their rolling papers.",
    price_cents: 1299,
    image: "/images/image (3).png",
    specs: [
      ["Diameter", "6 mm"],
      ["Length", "27 mm"],
      ["Count", "20 per pack"],
      ["Carbon", "Coconut-shell, food-grade"],
      ["Activation", "Steam"],
      ["Finish", "Unbleached rice paper"],
      ["Use", "Single — one per cigarette"],
    ],
  },
  {
    slug: "trio-sample",
    name: "Trio Sample",
    category: "filters",
    tagline: "3-pack — try first",
    description:
      "Three filters before you commit to a full pack. Keep two, give one away. Comes in both Classic Black and Natural variants.",
    price_cents: 299,
    image: "/images/image (8).png",
    specs: [
      ["Diameter", "6 mm"],
      ["Length", "27 mm"],
      ["Count", "3 per pack"],
      ["Carbon", "Coconut-shell, food-grade"],
      ["Variants", "Classic Black or Natural"],
      ["Use", "Single — one per cigarette"],
    ],
  },
  {
    slug: "hemp-papers",
    name: "Hemp Rolling Papers",
    category: "papers",
    tagline: "King size — 50 leaves",
    description:
      "Slow-burning, unbleached hemp. 50 leaves per booklet, king size. No chalk, no additives. Pairs with any Charvo filter for a complete roll.",
    price_cents: 499,
    image: "/images/image (5).png",
    specs: [
      ["Size", "King (110 × 44 mm)"],
      ["Count", "50 leaves per booklet"],
      ["Material", "Unbleached hemp"],
      ["Gum", "Natural acacia"],
      ["Additives", "None"],
      ["Pairs with", "Classic Black or Natural filter"],
    ],
  },
  {
    slug: "complete-kit",
    name: "Complete Rolling Kit",
    category: "kits",
    tagline: "Waxed canvas carry pouch",
    description:
      "Filters, hemp papers, herb grinder, rolling tray, and a storage vial — everything in a waxed canvas carry pouch. One purchase, nothing left to buy.",
    price_cents: 3499,
    image: "/images/image (4).png",
    specs: [
      ["Includes", "20-pack Classic Black filters"],
      ["Includes", "Hemp Rolling Papers (50 leaves)"],
      ["Includes", "Two-piece herb grinder"],
      ["Includes", "Fold-flat rolling tray"],
      ["Includes", "Borosilicate storage vial"],
      ["Carry", "Waxed canvas zip pouch"],
    ],
  },
];

export function getCatalogProduct(slug: string): CatalogProduct | undefined {
  return CATALOG.find((p) => p.slug === slug);
}
