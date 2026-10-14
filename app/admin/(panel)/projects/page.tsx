import type { Metadata } from "next";
import { saveProject } from "@/lib/actions";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Projects", robots: { index: false, follow: false } };

export default function ProjectsAdminPage() {
  const projects = getContent().projects;
  return (
    <div>
      <h1 className="display text-5xl">Projects</h1>
      <form action={saveProject} className="mt-8 grid gap-3 rounded-2xl border border-slate-900/10 p-5">
        <h2 className="text-xl">Add a project</h2>
        <label className="field">
          <span>Name</span>
          <input name="name" required />
        </label>
        <label className="field">
          <span>Live URL, leave blank if it does not respond</span>
          <input name="url" type="url" />
        </label>
        <label className="field">
          <span>Category</span>
          <input name="category" defaultValue="Business website" />
        </label>
        <label className="field">
          <span>Summary</span>
          <textarea name="summary" defaultValue="Website developed by MintX Solutions." rows={3} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" value="yes" defaultChecked /> Published
        </label>
        <button className="btn btn-primary w-fit">Add project</button>
      </form>
      <div className="mt-8 grid gap-6">
        {projects.map((project) => (
          <form key={project.slug} action={saveProject} className="grid gap-3 rounded-2xl border border-slate-900/10 p-5">
            <input type="hidden" name="slug" value={project.slug} />
            <label className="field">
              <span>Name</span>
              <input name="name" defaultValue={project.name} />
            </label>
            <label className="field">
              <span>URL</span>
              <input name="url" defaultValue={project.url || ""} />
            </label>
            <label className="field">
              <span>Category</span>
              <input name="category" defaultValue={project.category} />
            </label>
            <label className="field">
              <span>Summary</span>
              <textarea name="summary" defaultValue={project.summary} rows={3} />
            </label>
            <label className="field">
              <span>Link note</span>
              <input name="linkNote" defaultValue={project.linkNote || ""} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" value="yes" defaultChecked={project.published} /> Published
            </label>
            <button className="btn btn-primary w-fit">Save project</button>
          </form>
        ))}
      </div>
    </div>
  );
}
