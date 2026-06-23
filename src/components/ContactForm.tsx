"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { sendEnquiry, type SendResult } from "@/lib/sendEnquiry";
import { cn } from "@/lib/utils";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"name" | "email" | "message" | "form", string>>;

export function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [via, setVia] = useState<SendResult>("sent");

  function update(k: keyof typeof fields, v: string) {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k as keyof Errors]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "Please tell me your name.";
    if (!emailRe.test(fields.email.trim())) next.email = "Please enter a valid email.";
    if (!fields.message.trim()) next.message = "Please add a short message.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    try {
      const result = await sendEnquiry({
        subject: `Website enquiry — ${fields.name}`,
        fields: {
          Name: fields.name,
          Email: fields.email,
          Phone: fields.phone,
          Message: fields.message,
        },
      });
      setVia(result);
      setStatus("done");
    } catch {
      setStatus("idle");
      setErrors({ form: `Couldn't send just now — please email ${site.email}.` });
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-sand-deep/60 bg-white-warm p-8 text-center shadow-soft">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage-deep text-white-warm">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl">
          {via === "mailto" ? "Almost there" : "Message sent"}
        </h3>
        <p className="mt-2 text-stone">
          {via === "mailto"
            ? "Your email app should have opened with your message — just press send and I'll reply personally, usually within one working day."
            : "Thank you for reaching out. I'll reply personally, usually within one working day."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-sand-deep/60 bg-white-warm p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="c-name" label="Your name" required value={fields.name} onChange={(v) => update("name", v)} error={errors.name} autoComplete="name" />
        <Input id="c-phone" label="Phone (optional)" type="tel" value={fields.phone} onChange={(v) => update("phone", v)} autoComplete="tel" />
        <div className="sm:col-span-2">
          <Input id="c-email" label="Email" type="email" required value={fields.email} onChange={(v) => update("email", v)} error={errors.email} autoComplete="email" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="block text-sm font-semibold text-ink">
            Message<span className="text-clay"> *</span>
          </label>
          <textarea
            id="c-message"
            rows={5}
            value={fields.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            placeholder="Whatever feels comfortable to share — even just a sentence is fine."
            className={cn(
              "mt-2 w-full rounded-2xl border bg-cream px-4 py-3 text-ink placeholder:text-stone-soft focus:bg-white-warm focus:outline-none",
              errors.message ? "border-clay" : "border-sand-deep/70 focus:border-sage-deep"
            )}
          />
          {errors.message && <p className="mt-1.5 text-sm text-clay">{errors.message}</p>}
        </div>
      </div>

      {errors.form && (
        <p role="alert" className="mt-4 rounded-xl bg-clay-soft/40 px-4 py-3 text-sm text-ink">
          {errors.form}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <p className="text-sm text-stone-soft">Confidential. I&apos;ll never share your details.</p>
      </div>
    </form>
  );
}

function Input({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
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
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "mt-2 w-full rounded-2xl border bg-cream px-4 py-3 text-ink placeholder:text-stone-soft focus:bg-white-warm focus:outline-none",
          error ? "border-clay" : "border-sand-deep/70 focus:border-sage-deep"
        )}
      />
      {error && <p className="mt-1.5 text-sm text-clay">{error}</p>}
    </div>
  );
}
