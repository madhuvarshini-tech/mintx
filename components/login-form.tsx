<<<<<<< HEAD
"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions";
import type { FormState } from "@/lib/types";

const initial: FormState = { ok: false, message: "" };

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);
  return (
    <form action={action} className="grid w-full max-w-md gap-4">
      {state.message ? <p className="text-[#dc2626]">{state.message}</p> : null}
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label className="field">
        <span>Password</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <button className="btn btn-primary w-fit" disabled={pending}>
        {pending ? "Checking" : "Sign in"}
      </button>
    </form>
  );
}
=======
"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions";
import type { FormState } from "@/lib/types";

const initial: FormState = { ok: false, message: "" };

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);
  return (
    <form action={action} className="grid w-full max-w-md gap-4">
      {state.message ? <p className="text-[#dc2626]">{state.message}</p> : null}
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label className="field">
        <span>Password</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <button className="btn btn-primary w-fit" disabled={pending}>
        {pending ? "Checking" : "Sign in"}
      </button>
    </form>
  );
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
