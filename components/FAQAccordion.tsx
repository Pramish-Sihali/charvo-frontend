"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export type FAQ = { q: string; a: string };

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <Accordion className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={i} className="border-[color:var(--border)]">
          <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-[color:var(--muted)] leading-relaxed">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
