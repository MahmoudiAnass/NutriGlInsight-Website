"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { CheckIcon } from "@/components/icons";

type FormDict = Dictionary["deleteData"]["form"];

type FieldErrors = {
  email?: string;
  confirm?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function DeleteDataForm({ form, lang }: { form: FormDict; lang: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const data = new FormData(formEl);

    const email = String(data.get("email") ?? "").trim();
    const confirm = data.get("confirm") === "on";
    const honeypot = String(data.get("company") ?? "");

    const nextErrors: FieldErrors = {};
    if (!email) nextErrors.email = form.requiredError;
    else if (!isValidEmail(email)) nextErrors.email = form.emailError;
    if (!confirm) nextErrors.confirm = form.confirmError;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/delete-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email,
          supportId: String(data.get("supportId") ?? "").trim(),
          reason: String(data.get("reason") ?? "").trim(),
          confirm,
          company: honeypot,
          locale: lang,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center gap-4 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-500/15 text-brand-500">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="font-display text-xl font-semibold">{form.successTitle}</h3>
        <p className="text-muted">{form.successBody}</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-2">
          {form.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card flex flex-col gap-5">
      <h3 className="font-display text-xl font-semibold">{form.title}</h3>

      {/* Honeypot — hidden from users, catches bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" autoComplete="off" tabIndex={-1} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          {form.nameLabel} <span className="text-muted">({form.nameOptional})</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={form.namePlaceholder}
          className="rounded-xl border border-[rgb(var(--border))] bg-transparent px-4 py-3 outline-none focus:border-brand-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          {form.emailLabel} <span className="text-accent-deep dark:text-accent">({form.emailRequired})</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={form.emailPlaceholder}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="email-help email-error"
          className="keep-ltr rounded-xl border border-[rgb(var(--border))] bg-transparent px-4 py-3 outline-none focus:border-brand-400"
        />
        <p id="email-help" className="text-xs text-muted">
          {form.emailHelp}
        </p>
        {errors.email ? (
          <p id="email-error" className="text-xs font-medium text-gl-high">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="supportId" className="text-sm font-medium">
          {form.supportIdLabel} <span className="text-muted">({form.supportIdOptional})</span>
        </label>
        <input
          id="supportId"
          name="supportId"
          type="text"
          placeholder={form.supportIdPlaceholder}
          aria-describedby="support-help"
          className="keep-ltr rounded-xl border border-[rgb(var(--border))] bg-transparent px-4 py-3 outline-none focus:border-brand-400"
        />
        <p id="support-help" className="text-xs text-muted">
          {form.supportIdHelp}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="reason" className="text-sm font-medium">
          {form.reasonLabel} <span className="text-muted">({form.reasonOptional})</span>
        </label>
        <select
          id="reason"
          name="reason"
          defaultValue=""
          className="rounded-xl border border-[rgb(var(--border))] bg-transparent px-4 py-3 outline-none focus:border-brand-400"
        >
          {form.reasonOptions.map((opt, i) => (
            <option key={i} value={i === 0 ? "" : opt} disabled={i === 0}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[rgb(var(--border))] p-4">
        <input
          id="confirm"
          name="confirm"
          type="checkbox"
          required
          aria-invalid={Boolean(errors.confirm)}
          aria-describedby="confirm-error"
          className="mt-1 h-5 w-5 shrink-0 accent-brand-500"
        />
        <label htmlFor="confirm" className="text-sm">
          {form.confirmLabel}
        </label>
      </div>
      {errors.confirm ? (
        <p id="confirm-error" className="-mt-3 text-xs font-medium text-gl-high">
          {errors.confirm}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="rounded-xl border border-gl-high/40 bg-gl-high/5 px-4 py-3 text-sm text-gl-high">
          {form.genericError}
        </p>
      ) : null}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full">
        {status === "submitting" ? form.submitting : form.submit}
      </button>
    </form>
  );
}
