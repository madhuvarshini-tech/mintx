<<<<<<< HEAD
import type { Metadata } from "next";
import { savePost } from "@/lib/actions";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Notes", robots: { index: false, follow: false } };

export default function PostsAdminPage() {
  const posts = getContent().posts;
  return (
    <div>
      <h1 className="display text-5xl">Notes</h1>
      <form action={savePost} className="mt-8 grid gap-3 rounded-2xl border border-slate-900/10 p-5">
        <h2 className="text-xl">New note</h2>
        <label className="field">
          <span>Title</span>
          <input name="title" required />
        </label>
        <label className="field">
          <span>Date</span>
          <input name="date" type="date" />
        </label>
        <label className="field">
          <span>Body</span>
          <textarea name="body" rows={6} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" value="yes" /> Published
        </label>
        <button className="btn btn-primary w-fit">Save note</button>
      </form>
      <div className="mt-8 grid gap-6">
        {posts.map((post) => (
          <form key={post.slug} action={savePost} className="grid gap-3 rounded-2xl border border-slate-900/10 p-5">
            <input type="hidden" name="slug" value={post.slug} />
            <label className="field">
              <span>Title</span>
              <input name="title" defaultValue={post.title} />
            </label>
            <label className="field">
              <span>Date</span>
              <input name="date" defaultValue={post.date} />
            </label>
            <label className="field">
              <span>Body</span>
              <textarea name="body" defaultValue={post.paragraphs.join("\n\n")} rows={8} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" value="yes" defaultChecked={post.published} /> Published
            </label>
            <button className="btn btn-primary w-fit">Save note</button>
          </form>
        ))}
      </div>
    </div>
  );
}
=======
import type { Metadata } from "next";
import { savePost } from "@/lib/actions";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Notes", robots: { index: false, follow: false } };

export default function PostsAdminPage() {
  const posts = getContent().posts;
  return (
    <div>
      <h1 className="display text-5xl">Notes</h1>
      <form action={savePost} className="mt-8 grid gap-3 rounded-2xl border border-slate-900/10 p-5">
        <h2 className="text-xl">New note</h2>
        <label className="field">
          <span>Title</span>
          <input name="title" required />
        </label>
        <label className="field">
          <span>Date</span>
          <input name="date" type="date" />
        </label>
        <label className="field">
          <span>Body</span>
          <textarea name="body" rows={6} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" value="yes" /> Published
        </label>
        <button className="btn btn-primary w-fit">Save note</button>
      </form>
      <div className="mt-8 grid gap-6">
        {posts.map((post) => (
          <form key={post.slug} action={savePost} className="grid gap-3 rounded-2xl border border-slate-900/10 p-5">
            <input type="hidden" name="slug" value={post.slug} />
            <label className="field">
              <span>Title</span>
              <input name="title" defaultValue={post.title} />
            </label>
            <label className="field">
              <span>Date</span>
              <input name="date" defaultValue={post.date} />
            </label>
            <label className="field">
              <span>Body</span>
              <textarea name="body" defaultValue={post.paragraphs.join("\n\n")} rows={8} />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" value="yes" defaultChecked={post.published} /> Published
            </label>
            <button className="btn btn-primary w-fit">Save note</button>
          </form>
        ))}
      </div>
    </div>
  );
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
