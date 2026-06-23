import { site } from "@/lib/site";

const points = [
  "You can ask anything — about how I work, fees, or what happens next.",
  "There's nothing to prepare. Come exactly as you are.",
  "You're free to decide after we talk. There's no pressure to continue.",
  "A few words about what's bringing you here is plenty.",
];

/**
 * Calm reassurance shown alongside the booking forms, with a clear crisis signpost.
 * Ethical: counselling isn't a crisis service, so we say so kindly and point to help.
 */
export function BeforeYouBook() {
  return (
    <div className="rounded-3xl border border-sand-deep/60 bg-white-warm p-6 shadow-soft sm:p-7">
      <h2 className="font-serif text-xl text-ink">Before you book</h2>
      <ul className="mt-4 space-y-3">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-stone">
            <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sand text-sage-deep">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M20 6 9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-2xl border border-clay-soft/70 bg-clay-soft/20 p-4 text-sm leading-relaxed text-ink">
        <p className="font-semibold">If you need urgent help</p>
        <p className="mt-1 text-stone">
          Counselling isn&apos;t a crisis service. If you&apos;re in immediate danger,
          call <span className="font-semibold text-ink">999</span>. For urgent
          health concerns, call{" "}
          <a className="font-semibold text-sage-deep" href="tel:111">
            NHS&nbsp;111
          </a>
          . To talk any time, the Samaritans are on{" "}
          <a className="font-semibold text-sage-deep" href="tel:116123">
            116&nbsp;123
          </a>{" "}
          (free, 24/7).
        </p>
      </div>

      <p className="mt-4 text-sm text-stone-soft">
        Prefer to talk first? Call{" "}
        <a className="font-semibold text-sage-deep" href={`tel:${site.phoneHref}`}>
          {site.phone}
        </a>
        .
      </p>
    </div>
  );
}
