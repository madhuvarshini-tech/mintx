<<<<<<< HEAD
import type { Metadata } from "next";
import { saveService } from "@/lib/actions";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Services", robots: { index: false, follow: false } };

export default function ServicesAdminPage() {
  const services = getContent().services;
  return (
    <div>
      <h1 className="display text-5xl">Services</h1>
      <div className="mt-8 grid gap-6">
        {services.map((service) => (
          <form key={service.slug} action={saveService} className="grid gap-3 rounded-2xl border border-slate-900/10 p-5">
            <input type="hidden" name="slug" value={service.slug} />
            <label className="field">
              <span>Title</span>
              <input name="title" defaultValue={service.title} />
            </label>
            <label className="field">
              <span>Summary</span>
              <textarea name="summary" defaultValue={service.summary} rows={3} />
            </label>
            <label className="field">
              <span>Body, blank line between paragraphs</span>
              <textarea name="body" defaultValue={service.body.join("\n\n")} rows={6} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" value="yes" defaultChecked={service.published} /> Published
            </label>
            <button className="btn btn-primary w-fit">Save service</button>
          </form>
        ))}
      </div>
    </div>
  );
}
=======
import type { Metadata } from "next";
import { saveService } from "@/lib/actions";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Services", robots: { index: false, follow: false } };

export default function ServicesAdminPage() {
  const services = getContent().services;
  return (
    <div>
      <h1 className="display text-5xl">Services</h1>
      <div className="mt-8 grid gap-6">
        {services.map((service) => (
          <form key={service.slug} action={saveService} className="grid gap-3 rounded-2xl border border-slate-900/10 p-5">
            <input type="hidden" name="slug" value={service.slug} />
            <label className="field">
              <span>Title</span>
              <input name="title" defaultValue={service.title} />
            </label>
            <label className="field">
              <span>Summary</span>
              <textarea name="summary" defaultValue={service.summary} rows={3} />
            </label>
            <label className="field">
              <span>Body, blank line between paragraphs</span>
              <textarea name="body" defaultValue={service.body.join("\n\n")} rows={6} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" value="yes" defaultChecked={service.published} /> Published
            </label>
            <button className="btn btn-primary w-fit">Save service</button>
          </form>
        ))}
      </div>
    </div>
  );
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
