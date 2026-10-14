import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProgressBar } from "@/components/progress-bar";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { getContent } from "@/lib/store";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

const url = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "MintX Solutions | Web development and digital marketing in Salem",
    template: "%s · MintX Solutions",
  },
  description:
    "MintX Solutions builds websites, online stores, mobile apps, and digital marketing for businesses in Salem, Tamil Nadu.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MintX Solutions",
    images: [{ url: "/visuals/hero.jpg", width: 1200, height: 675, alt: "MintX Solutions" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/brand/logo.png" },
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { settings } = getContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "MintX Solutions",
    url,
    image: `${url}/brand/logo.png`,
    email: settings.email,
    telephone: settings.phoneTel,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salem",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: ["Salem", "Coimbatore", "Pollachi", "Dharapuram", "India"],
    sameAs: [settings.instagram],
  };

  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ProgressBar />
        <Header />
        <main id="main">{children}</main>
        <Footer settings={settings} />
        <a
          href={settings.whatsapp}
          className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg"
          aria-label="Chat with MintX Solutions on WhatsApp"
        >
          <WhatsappLogo size={26} weight="fill" />
        </a>
      </body>
    </html>
  );
}
