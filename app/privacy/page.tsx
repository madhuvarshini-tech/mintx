import type { Metadata } from "next";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How MintX Solutions stores contact and career inquiries.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const { settings } = getContent();
  return (
    <article className="mx-auto max-w-[840px] px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <h1 className="display text-4xl sm:text-5xl md:text-6xl text-[#0b1320]">Privacy Policy</h1>
      <div className="mt-8 space-y-4 leading-relaxed text-[#334155]">
        <p>MintX Solutions, based in Salem, Tamil Nadu, uses this site to describe its work and to receive project and career inquiries.</p>
        <p>
          The project form stores your name, email, optional phone and company, the service you choose, an optional budget range, and your message. The career form stores the same contact fields, the role, your note, and the resume file you upload.
        </p>
        <p>We keep those records so the studio can reply. We do not sell them. Resume files stay off the public site.</p>
        <p>The site may set a cookie only after an administrator signs in. That cookie is httpOnly and is used to keep the admin session.</p>
        <p>
          To ask about a record, email <a href={`mailto:${settings.email}`}>{settings.email}</a> or call {settings.phoneDisplay}.
        </p>
      </div>
    </article>
  );
}
