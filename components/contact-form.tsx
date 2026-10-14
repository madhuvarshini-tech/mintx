"use client";

import { useActionState } from "react";
import { submitInquiry } from "@/lib/actions";
import { budgetOptions } from "@/lib/content";
import type { FormState } from "@/lib/types";

const initial: FormState = { ok: false, message: "" };

export function ContactForm({ preset, services }: { preset?: string; services: string[] }) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  return (
    <form action={action} className="grid gap-5" noValidate>
      <input type="text" name="fax_number" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {state.message ? (
        <p role="status" className={state.ok ? "text-[#0f172a]" : "text-[#dc2626]"}>
          {state.message}
        </p>
      ) : null}
      <label className="field">
        <span>Full name</span>
        <input name="name" autoComplete="name" required aria-invalid={Boolean(state.fieldErrors?.name)} />
        {state.fieldErrors?.name ? <span className="error">{state.fieldErrors.name}</span> : null}
      </label>
      <label className="field">
        <span>Business email</span>
        <input name="email" type="email" autoComplete="email" required aria-invalid={Boolean(state.fieldErrors?.email)} />
        {state.fieldErrors?.email ? <span className="error">{state.fieldErrors.email}</span> : null}
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="field">
          <span>Phone, optional</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="field">
          <span>Company, optional</span>
          <input name="company" autoComplete="organization" />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="field">
          <span>Service</span>
          <select name="service" defaultValue={preset || ""} required aria-invalid={Boolean(state.fieldErrors?.service)}>
            <option value="" disabled>
              Choose one
            </option>
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
            <option>Not sure yet</option>
          </select>
          {state.fieldErrors?.service ? <span className="error">{state.fieldErrors.service}</span> : null}
        </label>
        <label className="field">
          <span>Budget range, optional</span>
          <select name="budget" defaultValue="">
            <option value="">Not specified</option>
            {budgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="field">
        <span>Project details</span>
        <textarea name="details" rows={6} required aria-invalid={Boolean(state.fieldErrors?.details)} />
        {state.fieldErrors?.details ? <span className="error">{state.fieldErrors.details}</span> : null}
      </label>
      <label className="flex items-start gap-3 text-sm text-[#475569]">
        <input name="consent" value="yes" type="checkbox" className="mt-1" required />
        <span>I agree that MintX Solutions can store these details to reply to this inquiry.</span>
      </label>
      {state.fieldErrors?.consent ? <p className="text-sm text-[#dc2626]">{state.fieldErrors.consent}</p> : null}
      <button className="btn btn-primary w-fit" type="submit" disabled={pending}>
        {pending ? "Sending..." : "Discuss Your Project"}
      </button>
    </form>
  );
}
