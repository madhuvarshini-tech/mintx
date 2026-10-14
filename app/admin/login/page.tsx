<<<<<<< HEAD
import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center px-5 py-28">
      <h1 className="display text-5xl">Studio desk</h1>
      <p className="mt-4 max-w-[46ch] text-[#475569]">Sign in to read inquiries, applications, and published content.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </section>
  );
}
=======
import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center px-5 py-28">
      <h1 className="display text-5xl">Studio desk</h1>
      <p className="mt-4 max-w-[46ch] text-[#475569]">Sign in to read inquiries, applications, and published content.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </section>
  );
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
