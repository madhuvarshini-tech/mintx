"use client";

import { useActionState } from "react";
import { submitApplication } from "@/lib/actions";
import type { FormState } from "@/lib/types";

const initial: FormState = { ok: false, message: "" };

export function CareerForm({ roles }: { roles: string[] }) {
  const [state, action, pending] = useActionState(submitApplication, initial);
  return (
    <form action={action} className="grid gap-5" noValidate>
      <input type="text" name="fax_number" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {state.message ? <p role="status" className={state.ok ? "text-[#0f172a]" : "text-[#dc2626]"}>{state.message}</p> : null}
      <label className="field">
        <span>Full name</span>
        <input name="name" required autoComplete="name" />
        {state.fieldErrors?.name ? <span className="error">{state.fieldErrors.name}</span> : null}
      </label>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" required autoComplete="email" />
        {state.fieldErrors?.email ? <span className="error">{state.fieldErrors.email}</span> : null}
      </label>
      <label className="field">
        <span>Phone, optional</span>
        <input name="phone" type="tel" />
      </label>
      <label className="field">
        <span>Position</span>
        <select name="role" defaultValue="General application">
          <option>General application</option>
          {roles.map((role) => (
            <option key={role}>{role}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Short note</span>
        <textarea name="note" rows={5} required />
        {state.fieldErrors?.note ? <span className="error">{state.fieldErrors.note}</span> : null}
      </label>
      <label className="field">
        <span>Resume, PDF or Word, 5 MB max</span>
        <input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf" required />
        {state.fieldErrors?.resume ? <span className="error">{state.fieldErrors.resume}</span> : null}
      </label>
      <button className="btn btn-primary w-fit" disabled={pending}>
        {pending ? "Sending" : "Submit application"}
      </button>
    </form>
  );
}
