"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";

/** Sticky call-to-action bar shown on small screens only. */
export function MobileBookingBar() {
  const pathname = usePathname();
  // Avoid covering the booking form itself.
  if (pathname.startsWith("/booking") || pathname.startsWith("/free-consultation")) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-2xl border border-sand-deep/70 bg-white-warm/95 p-2 shadow-lift backdrop-blur">
        <a
          href={`tel:${site.phoneHref}`}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sand text-sage-deep"
          aria-label={`Call ${site.name}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 4h3l1.6 4-2 1.4a12 12 0 0 0 5 5l1.4-2 4 1.6V18a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <Link
          href="/free-consultation"
          className="flex-1 rounded-xl bg-sage-deep px-4 py-3.5 text-center text-sm font-semibold text-white-warm"
        >
          Book a free consultation
        </Link>
      </div>
    </div>
  );
}
