<<<<<<< HEAD
import type { Metadata } from "next";
import { saveProduct } from "@/lib/actions";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Product", robots: { index: false, follow: false } };

export default function ProductAdminPage() {
  const { product } = getContent();
  return (
    <form action={saveProduct} className="grid max-w-3xl gap-4">
      <h1 className="display text-5xl">{product.name}</h1>
      <label className="field">
        <span>Product URL</span>
        <input name="url" defaultValue={product.url} />
      </label>
      <label className="field">
        <span>Summary</span>
        <textarea name="summary" defaultValue={product.summary} rows={3} />
      </label>
      <label className="field">
        <span>Problem</span>
        <textarea name="problem" defaultValue={product.problem} rows={3} />
      </label>
      <label className="field">
        <span>Solution</span>
        <textarea name="solution" defaultValue={product.solution} rows={3} />
      </label>
      {product.features.map((feature, index) => (
        <div key={feature.title} className="grid gap-3 border-t border-slate-900/10 pt-4">
          <label className="field">
            <span>Feature title</span>
            <input name={`feature_title_${index}`} defaultValue={feature.title} />
          </label>
          <label className="field">
            <span>Feature text</span>
            <textarea name={`feature_text_${index}`} defaultValue={feature.text} rows={2} />
          </label>
        </div>
      ))}
      <button className="btn btn-primary w-fit">Save product</button>
    </form>
  );
}
=======
import type { Metadata } from "next";
import { saveProduct } from "@/lib/actions";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Product", robots: { index: false, follow: false } };

export default function ProductAdminPage() {
  const { product } = getContent();
  return (
    <form action={saveProduct} className="grid max-w-3xl gap-4">
      <h1 className="display text-5xl">{product.name}</h1>
      <label className="field">
        <span>Product URL</span>
        <input name="url" defaultValue={product.url} />
      </label>
      <label className="field">
        <span>Summary</span>
        <textarea name="summary" defaultValue={product.summary} rows={3} />
      </label>
      <label className="field">
        <span>Problem</span>
        <textarea name="problem" defaultValue={product.problem} rows={3} />
      </label>
      <label className="field">
        <span>Solution</span>
        <textarea name="solution" defaultValue={product.solution} rows={3} />
      </label>
      {product.features.map((feature, index) => (
        <div key={feature.title} className="grid gap-3 border-t border-slate-900/10 pt-4">
          <label className="field">
            <span>Feature title</span>
            <input name={`feature_title_${index}`} defaultValue={feature.title} />
          </label>
          <label className="field">
            <span>Feature text</span>
            <textarea name={`feature_text_${index}`} defaultValue={feature.text} rows={2} />
          </label>
        </div>
      ))}
      <button className="btn btn-primary w-fit">Save product</button>
    </form>
  );
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
