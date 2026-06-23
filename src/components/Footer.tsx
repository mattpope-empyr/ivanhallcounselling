import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-sand-deep/60 bg-sand/40">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-stone">
              Warm, confidential counselling in {site.location.area}. A calm space
              to feel heard, understand yourself a little better, and move forward
              at your own pace.
            </p>
            <p className="mt-4 text-sm font-semibold text-sage-deep">
              {site.accreditation}
            </p>
            <p className="mt-2 text-sm text-stone-soft">
              Serving Winchester, Sparsholt &amp; across Hampshire · in person,
              by phone or video.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-serif text-lg text-ink">Explore</h2>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-stone transition-colors hover:text-sage-deep"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-serif text-lg text-ink">Get in touch</h2>
            <ul className="mt-3 space-y-2 text-stone">
              <li>
                <a
                  className="transition-colors hover:text-sage-deep"
                  href={`tel:${site.phoneHref}`}
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  className="break-words transition-colors hover:text-sage-deep"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </li>
              <li>{site.location.full}</li>
              <li className="text-sm text-stone-soft">{site.location.note}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-sand-deep/60 pt-6 text-sm text-stone-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            If you are in crisis, please call the Samaritans on{" "}
            <a className="font-semibold text-sage-deep" href="tel:116123">
              116 123
            </a>{" "}
            (free, 24/7).
          </p>
        </div>
      </div>
    </footer>
  );
}
