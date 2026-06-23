"use client";

import { useEffect, useRef } from "react";

type StrMap = Record<string, string>;

/**
 * Persist non-sensitive form fields to localStorage so an anxious visitor who
 * navigates away doesn't lose their progress.
 *
 * Ethical guardrails:
 *   - Pass `exclude` for any free-text that could contain sensitive/clinical detail
 *     (e.g. the "reason"/"message" fields). We intentionally do NOT persist those.
 *   - Stored only in the visitor's own browser, with an expiry (default 24h).
 */
export function useLocalDraft<T extends StrMap>(
  key: string,
  values: T,
  setValues: (updater: (prev: T) => T) => void,
  options?: { exclude?: (keyof T)[]; ttlHours?: number }
) {
  const exclude = options?.exclude ?? [];
  const ttl = (options?.ttlHours ?? 6) * 3_600_000;
  const loaded = useRef(false);
  // Snapshot the allowed field names once so the load path only restores keys
  // that actually belong to this form (guards against unexpected/injected keys).
  const allowedKeys = useRef(Object.keys(values));

  // Load once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as { t?: number; v?: Record<string, unknown> };
        if (parsed?.v && typeof parsed.t === "number" && Date.now() - parsed.t < ttl) {
          const clean: StrMap = {};
          for (const k of allowedKeys.current) {
            if (exclude.includes(k as keyof T)) continue;
            const val = parsed.v[k];
            if (typeof val === "string") clean[k] = val;
          }
          if (Object.keys(clean).length) {
            setValues((prev) => ({ ...prev, ...(clean as Partial<T>) }));
          }
        } else {
          localStorage.removeItem(key);
        }
      }
    } catch {
      /* ignore corrupt/unavailable storage */
    }
    loaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save on change (after the initial load).
  useEffect(() => {
    if (!loaded.current) return;
    try {
      const toSave: StrMap = {};
      let has = false;
      for (const k of Object.keys(values)) {
        if (exclude.includes(k as keyof T)) continue;
        const v = values[k];
        if (v) {
          toSave[k] = v;
          has = true;
        }
      }
      if (has) localStorage.setItem(key, JSON.stringify({ t: Date.now(), v: toSave }));
      else localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const clear = () => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  };

  return { clear };
}
