"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

const SCRIPT_ID = "calendly-widget-js";
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

// Brand the Calendly UI to match the site palette.
const THEME = {
  background_color: "fbf8f2",
  text_color: "29332d",
  primary_color: "4f6e60",
};

function withTheme(url: string): string {
  const sep = url.includes("?") ? "&" : "?";
  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    ...THEME,
  });
  return `${url}${sep}${params.toString()}`;
}

/**
 * Live Calendly scheduling calendar, embedded inline and themed to the site.
 * Initialises via Calendly's JS API so it also works after client-side navigation.
 */
export function CalendlyInline({ url, height = 720 }: { url: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const themedUrl = withTheme(url);

    const init = () => {
      if (cancelled || !ref.current || !window.Calendly) return;
      ref.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url: themedUrl, parentElement: ref.current });
    };

    // Stylesheet (id-guarded so we don't add it twice).
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (window.Calendly) {
      init();
    } else if (existing) {
      existing.addEventListener("load", init, { once: true });
      existing.addEventListener("error", () => setFailed(true), { once: true });
    } else {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.addEventListener("load", init, { once: true });
      script.addEventListener("error", () => setFailed(true), { once: true });
      document.body.appendChild(script);
    }

    // Safety net: if the script is blocked/slow, show a fallback link.
    const t = window.setTimeout(() => {
      if (!window.Calendly) setFailed(true);
    }, 8000);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [url]);

  if (failed) {
    return (
      <div className="rounded-3xl border border-sand-deep/60 bg-white-warm p-8 text-center shadow-soft">
        <p className="text-stone">
          The live calendar couldn&apos;t load just now.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-full bg-sage-deep px-6 py-3 font-semibold text-white-warm"
        >
          Open the booking calendar
        </a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-3xl border border-sand-deep/60 bg-white-warm shadow-soft"
      style={{ minWidth: 320, height }}
      aria-label="Live booking calendar"
    />
  );
}
