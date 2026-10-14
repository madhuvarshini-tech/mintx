import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-5 pb-20 pt-32 md:px-8">
      <p className="text-[#475569]">404</p>
      <h1 className="display mt-4 max-w-[12ch] text-6xl md:text-8xl">This page is not on the site.</h1>
      <p className="mt-6 max-w-[46ch] text-[#475569]">The address may be old, or the page was never published.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Start a project
        </Link>
      </div>
    </section>
  );
}
