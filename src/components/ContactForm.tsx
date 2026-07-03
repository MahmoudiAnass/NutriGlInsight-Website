"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";

type ContactFormDict = Dictionary["contact"]["form"];

export function ContactForm({ form }: { form: ContactFormDict }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:contact@nutriglinsight.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-5">
      <h2 className="font-display text-xl font-semibold">{form.title}</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-name" className="text-sm font-medium">
          {form.nameLabel}
        </label>
        <input
          id="c-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder={form.namePlaceholder}
          className="rounded-xl border border-[rgb(var(--border))] bg-transparent px-4 py-3 outline-none focus:border-brand-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-email" className="text-sm font-medium">
          {form.emailLabel}
        </label>
        <input
          id="c-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder={form.emailPlaceholder}
          className="keep-ltr rounded-xl border border-[rgb(var(--border))] bg-transparent px-4 py-3 outline-none focus:border-brand-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-message" className="text-sm font-medium">
          {form.messageLabel}
        </label>
        <textarea
          id="c-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder={form.messagePlaceholder}
          className="rounded-xl border border-[rgb(var(--border))] bg-transparent px-4 py-3 outline-none focus:border-brand-400"
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        {form.submit}
      </button>
      <p className="text-xs text-muted">{form.note}</p>
    </form>
  );
}
