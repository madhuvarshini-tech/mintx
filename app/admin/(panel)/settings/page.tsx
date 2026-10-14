import type { Metadata } from "next";
import { saveSettings } from "@/lib/actions";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Settings", robots: { index: false, follow: false } };

export default function SettingsPage() {
  const { settings } = getContent();
  const fields = [
    ["email", "Email", settings.email],
    ["phoneDisplay", "Phone display", settings.phoneDisplay],
    ["phoneTel", "Phone tel link", settings.phoneTel],
    ["whatsapp", "WhatsApp URL", settings.whatsapp],
    ["instagram", "Instagram URL", settings.instagram],
    ["instagramHandle", "Instagram handle", settings.instagramHandle],
    ["location", "Location", settings.location],
  ] as const;
  return (
    <form action={saveSettings} className="grid max-w-xl gap-4">
      <h1 className="display text-5xl">Settings</h1>
      <p className="text-[#475569]">These values appear in the footer, contact page, and structured data.</p>
      {fields.map(([name, label, value]) => (
        <label key={name} className="field">
          <span>{label}</span>
          <input name={name} defaultValue={value} />
        </label>
      ))}
      <button className="btn btn-primary w-fit">Save settings</button>
    </form>
  );
}
