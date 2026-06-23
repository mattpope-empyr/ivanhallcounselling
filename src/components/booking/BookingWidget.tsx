"use client";

import { useId, useMemo, useState } from "react";
import { consultationModes, site, type ConsultationMode } from "@/lib/site";
import { formatTime, formatLongDate } from "@/lib/availability";
import { Button } from "@/components/ui/Button";
import { useLocalDraft } from "@/lib/useLocalDraft";
import { sendEnquiry, type SendResult } from "@/lib/sendEnquiry";
import { cn } from "@/lib/utils";

export type SlotDay = {
  date: string; // YYYY-MM-DD
  weekday: string;
  weekdayShort: string;
  day: number;
  month: string;
  times: string[];
};

type Kind = "consultation" | "session";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "slot" | "form", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[\d\s()+-]{7,}$/;

export function BookingWidget({
  days,
  kind = "consultation",
}: {
  days: SlotDay[];
  kind?: Kind;
}) {
  // The free 20-minute consultation is phone/video only; sessions also offer in person.
  const modes =
    kind === "consultation"
      ? consultationModes.filter((m) => m.id !== "in-person")
      : consultationModes;
  const [mode, setMode] = useState<ConsultationMode>(
    kind === "consultation" ? "phone" : "in-person"
  );
  const [activeDate, setActiveDate] = useState<string>(days[0]?.date ?? "");
  const [time, setTime] = useState<string>("");
  const [fields, setFields] = useState({ name: "", email: "", phone: "", reason: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [reference, setReference] = useState<string>("");
  const [via, setVia] = useState<SendResult>("sent");

  // Unique per-instance ids so labels/focus stay correct even with two widgets.
  const uid = useId();
  const ids = {
    top: `${uid}-top`,
    slot: `${uid}-slot`,
    slotError: `${uid}-slot-error`,
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    email: `${uid}-email`,
    reason: `${uid}-reason`,
  };

  // Remember non-sensitive details only (never the free-text reason).
  const { clear: clearDraft } = useLocalDraft(`ihc-${kind}`, fields, setFields, {
    exclude: ["reason"],
  });
  const hasSavedDetails = !!(fields.name || fields.email || fields.phone);

  const activeDay = useMemo(
    () => days.find((d) => d.date === activeDate),
    [days, activeDate]
  );

  function clearSavedDetails() {
    clearDraft();
    setFields((f) => ({ ...f, name: "", email: "", phone: "" }));
  }

  function update(field: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  function computeErrors(): FormErrors {
    const next: FormErrors = {};
    if (!fields.name.trim()) next.name = "Please let me know your name.";
    if (!emailRe.test(fields.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!phoneRe.test(fields.phone.trim()))
      next.phone = "Please enter a contact phone number.";
    if (!activeDate || !time)
      next.slot = "Please choose a date and time that suits you.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = computeErrors();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // Move focus/scroll to the first thing that needs attention.
      const firstField = (["name", "email", "phone"] as const).find((f) => errs[f]);
      if (firstField) {
        document.getElementById(ids[firstField])?.focus();
      } else if (errs.slot) {
        document.getElementById(ids.slot)?.scrollIntoView({ behavior: "smooth", block: "center" });
        // The error region renders this tick; focus it once it exists.
        requestAnimationFrame(() => document.getElementById(ids.slotError)?.focus());
      }
      return;
    }
    setStatus("submitting");
    setErrors({});

    const modeLabel = consultationModes.find((m) => m.id === mode)?.label ?? mode;
    const ref = `IH-${activeDate.replace(/-/g, "").slice(2)}-${time.replace(":", "")}`;

    try {
      const result = await sendEnquiry({
        subject: `${kind === "consultation" ? "Free consultation" : "Session"} request — ${fields.name}`,
        fields: {
          Type: kind === "consultation" ? "Free 20-minute consultation" : "Counselling session",
          Name: fields.name,
          Email: fields.email,
          Phone: fields.phone,
          Format: modeLabel,
          Date: formatLongDate(activeDate),
          Time: formatTime(time),
          "What's bringing you here": fields.reason,
          Reference: ref,
        },
      });
      setVia(result);
      setReference(ref);
      clearDraft(); // request sent — no need to keep the local draft
      setStatus("done");
      window.scrollTo({
        top: document.getElementById("booking-top")?.offsetTop ?? 0,
        behavior: "smooth",
      });
    } catch {
      setStatus("idle");
      setErrors({
        form:
          "Something went wrong sending your request. Please try again, or email " +
          site.email +
          ".",
      });
    }
  }

  if (status === "done") {
    return (
      <Confirmation
        kind={kind}
        mode={mode}
        date={activeDate}
        time={time}
        name={fields.name}
        reference={reference}
        via={via}
      />
    );
  }

  const noSlots = days.length === 0;

  return (
    <form
      id="booking-top"
      onSubmit={handleSubmit}
      noValidate
      className="w-full min-w-0 max-w-full overflow-hidden rounded-3xl border border-sand-deep/60 bg-white-warm shadow-soft"
    >
      {/* Step 1 — mode */}
      <fieldset className="border-b border-sand-deep/60 p-6 sm:p-8">
        <legend className="sr-only">How would you like to meet?</legend>
        <Step n={1} title="How would you like to meet?" />
        <div
          className={cn(
            "mt-4 grid gap-3",
            modes.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
          )}
        >
          {modes.map((m) => (
            <label
              key={m.id}
              className={cn(
                "cursor-pointer rounded-2xl border p-4 transition-all duration-200",
                mode === m.id
                  ? "border-sage-deep bg-sand/60 ring-1 ring-sage-deep"
                  : "border-sand-deep/60 hover:border-sage/60"
              )}
            >
              <input
                type="radio"
                name="mode"
                value={m.id}
                checked={mode === m.id}
                onChange={() => setMode(m.id)}
                className="sr-only"
              />
              <span className="block font-serif text-lg text-ink">{m.label}</span>
              <span className="mt-1 block text-sm text-stone">{m.description}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Step 2 — date & time */}
      <fieldset id={ids.slot} className="border-b border-sand-deep/60 p-6 sm:p-8">
        <legend className="sr-only">Choose a date and time</legend>
        <Step n={2} title="Choose a date and time" />

        {noSlots ? (
          <p className="mt-4 rounded-2xl bg-sand/60 p-4 text-stone">
            There are no online slots showing right now. Please call{" "}
            <a className="font-semibold text-sage-deep" href={`tel:${site.phoneHref}`}>
              {site.phone}
            </a>{" "}
            or email and we&apos;ll find a time together.
          </p>
        ) : (
          <>
            {/* Day strip (horizontally scrollable, snaps, selected scrolls into view) */}
            <div className="relative mt-4">
              <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-2 px-1 pb-2">
                {days.map((d) => {
                  const active = d.date === activeDate;
                  return (
                    <button
                      key={d.date}
                      type="button"
                      onClick={(e) => {
                        setActiveDate(d.date);
                        setTime("");
                        e.currentTarget.scrollIntoView({ inline: "center", block: "nearest" });
                      }}
                      aria-pressed={active}
                      aria-label={`${d.weekday} ${d.day} ${d.month}`}
                      className={cn(
                        "flex min-h-[4.5rem] min-w-[4.6rem] shrink-0 snap-start flex-col items-center justify-center rounded-2xl border px-3 py-3 transition-all duration-200",
                        active
                          ? "border-sage-deep bg-sage-deep text-white-warm"
                          : "border-sand-deep/60 bg-cream text-ink hover:border-sage/60"
                      )}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                        {d.weekdayShort}
                      </span>
                      <span className="font-serif text-2xl leading-tight">{d.day}</span>
                      <span className="text-xs opacity-80">{d.month.slice(0, 3)}</span>
                    </button>
                  );
                })}
              </div>
              {/* soft fade hint that the row scrolls */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white-warm to-transparent"
              />
            </div>

            {/* Times */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-stone">
                {activeDay ? `Available on ${activeDay.weekday} ${activeDay.day} ${activeDay.month}` : ""}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeDay?.times.map((t) => {
                  const active = t === time;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setTime(t);
                        setErrors((e) => ({ ...e, slot: undefined }));
                      }}
                      aria-pressed={active}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                        active
                          ? "border-sage-deep bg-sage-deep text-white-warm"
                          : "border-sand-deep/60 bg-cream text-ink hover:border-sage-deep"
                      )}
                    >
                      {formatTime(t)}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {errors.slot && (
          <p
            id={ids.slotError}
            tabIndex={-1}
            role="alert"
            className="mt-4 rounded-xl bg-clay-soft/40 px-4 py-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
          >
            {errors.slot}
          </p>
        )}
        {time && activeDay && (
          <p className="mt-4 rounded-xl bg-sand/60 px-4 py-3 text-sm text-ink">
            <span className="font-semibold">Selected:</span>{" "}
            {activeDay.weekday} {activeDay.day} {activeDay.month} at {formatTime(time)} ·{" "}
            {consultationModes.find((m) => m.id === mode)?.label}
          </p>
        )}
      </fieldset>

      {/* Step 3 — details */}
      <fieldset className="p-6 sm:p-8">
        <legend className="sr-only">Your details</legend>
        <Step n={3} title="Your details" />
        <p className="mt-2 text-sm text-stone">
          Just the essentials so I can get back to you. You only need to share as
          much as you feel comfortable with.
        </p>

        {hasSavedDetails && (
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-sand/50 px-3 py-2 text-xs text-stone">
            <span>
              Your name, email and phone are saved on this device so you don&apos;t
              lose them.
            </span>
            <button
              type="button"
              onClick={clearSavedDetails}
              className="inline-flex min-h-11 items-center font-semibold text-sage-deep underline-offset-2 hover:underline"
            >
              Clear saved details
            </button>
          </p>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Your name"
            id={ids.name}
            value={fields.name}
            onChange={(v) => update("name", v)}
            error={errors.name}
            autoComplete="name"
            required
          />
          <Field
            label="Phone"
            id={ids.phone}
            type="tel"
            value={fields.phone}
            onChange={(v) => update("phone", v)}
            error={errors.phone}
            autoComplete="tel"
            required
          />
          <div className="sm:col-span-2">
            <Field
              label="Email"
              id={ids.email}
              type="email"
              value={fields.email}
              onChange={(v) => update("email", v)}
              error={errors.email}
              autoComplete="email"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={ids.reason} className="block text-sm font-semibold text-ink">
              What&apos;s bringing you here?{" "}
              <span className="font-normal text-stone-soft">(optional)</span>
            </label>
            <textarea
              id={ids.reason}
              rows={4}
              value={fields.reason}
              onChange={(e) => update("reason", e.target.value)}
              placeholder="A few words is plenty — there's no need to explain everything."
              className="mt-2 w-full rounded-2xl border border-sand-deep/70 bg-cream px-4 py-3 text-ink placeholder:text-stone-soft focus:border-sage-deep focus:bg-white-warm focus:outline-none"
            />
          </div>
        </div>

        {errors.form && <FieldError>{errors.form}</FieldError>}

        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting"
              ? "Sending…"
              : kind === "consultation"
                ? "Request my free consultation"
                : "Request this session"}
          </Button>
          <p className="text-sm text-stone-soft">
            No payment now. I&apos;ll confirm by email or phone, usually within one
            working day.
          </p>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-stone-soft">
          By sending this you agree for {site.counsellor} to contact you about your
          enquiry. Your details are kept confidential and never shared.
        </p>
      </fieldset>
    </form>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-sage-deep text-sm font-bold text-white-warm">
        {n}
      </span>
      <h3 className="font-serif text-xl text-ink">{title}</h3>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-clay"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "mt-2 w-full rounded-2xl border bg-cream px-4 py-3 text-ink placeholder:text-stone-soft focus:bg-white-warm focus:outline-none",
          error
            ? "border-clay focus:border-clay"
            : "border-sand-deep/70 focus:border-sage-deep"
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-clay">
          {error}
        </p>
      )}
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-4 rounded-xl bg-clay-soft/40 px-4 py-3 text-sm text-ink">
      {children}
    </p>
  );
}

function Confirmation({
  kind,
  mode,
  date,
  time,
  name,
  reference,
  via,
}: {
  kind: Kind;
  mode: ConsultationMode;
  date: string;
  time: string;
  name: string;
  reference: string;
  via: SendResult;
}) {
  const modeLabel = consultationModes.find((m) => m.id === mode)?.label;
  return (
    <div
      id="booking-top"
      className="overflow-hidden rounded-3xl border border-sand-deep/60 bg-white-warm p-8 text-center shadow-soft sm:p-12"
    >
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-deep text-white-warm">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M20 6 9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="mt-6 text-3xl">Thank you{name ? `, ${name.split(" ")[0]}` : ""}.</h3>
      <p className="mx-auto mt-3 max-w-md text-lg text-stone">
        {via === "mailto" ? (
          <>
            Your email app should have opened with your{" "}
            {kind === "consultation" ? "free consultation" : "session"} request —
            just press send and I&apos;ll personally get back to you, usually within
            one working day.
          </>
        ) : (
          <>
            Your {kind === "consultation" ? "free consultation" : "session"} request
            has been sent. I&apos;ll personally get back to you to confirm — usually
            within one working day.
          </>
        )}
      </p>

      <dl className="mx-auto mt-7 max-w-sm space-y-2 rounded-2xl bg-sand/50 p-5 text-left text-sm">
        <Row label="When" value={`${formatLongDate(date)} at ${formatTime(time)}`} />
        <Row label="Format" value={modeLabel ?? ""} />
        {reference && <Row label="Reference" value={reference} />}
      </dl>

      <p className="mx-auto mt-6 max-w-md text-sm text-stone-soft">
        Nothing is confirmed until you hear back from me, so this time isn&apos;t
        locked in yet. If anything changes meanwhile, call {site.phone}.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="font-semibold text-stone">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  );
}
