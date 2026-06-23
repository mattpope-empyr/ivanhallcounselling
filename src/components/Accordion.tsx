"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { question: string; answer: string };

export function Accordion({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-sand-deep/70 overflow-hidden rounded-2xl border border-sand-deep/70 bg-white-warm">
      {items.map((item, i) => {
        const isOpen = open === i;
        const headerId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={headerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-sand/40 sm:px-6"
              >
                <span className="font-serif text-lg text-ink">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sand text-sage-deep transition-transform duration-300 ease-[var(--ease-gentle)]",
                    isOpen && "rotate-45 bg-sage-deep text-white-warm"
                  )}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={cn(
                "grid transition-all duration-300 ease-[var(--ease-gentle)]",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-stone sm:px-6">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
