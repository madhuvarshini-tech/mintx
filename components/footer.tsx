import { InstagramLogo, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { Settings } from "@/lib/types";

export function Footer({ settings }: { settings: Settings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#0B1220] text-[#F5F6F2]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-5">
          <Link href="/" className="flex items-center gap-2.5" aria-label="MintX Solutions Home">
            <Image src="/brand/logo-mark.png" alt="MintX Solutions" width={140} height={38} unoptimized className="h-8 md:h-9 w-auto object-contain brightness-110" />
            <span className="display text-xl font-bold tracking-tight text-[#F5F6F2]">
              Mint<span className="text-[#45E6BB]">X</span> Solutions
            </span>
          </Link>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-[#9AA8BA]">
            Next-generation digital atelier in Salem, Tamil Nadu. Engineering high-performance web platforms, custom applications, and bespoke digital experiences across India.
          </p>
          <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#45E6BB]/25 bg-[#45E6BB]/10 px-3.5 py-1.5 text-xs font-semibold text-[#45E6BB]">
            <span className="h-2 w-2 rounded-full bg-[#45E6BB] shadow-[0_0_8px_#45E6BB] animate-pulse" />
            <span>Available for select client projects in 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-4">
          <div className="flex flex-col gap-3.5 text-sm font-medium text-[#9AA8BA]">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5F6F2]">Capabilities</span>
            <Link href="/services" className="hover:text-[#45E6BB] transition-colors">Services</Link>
            <Link href="/products" className="hover:text-[#45E6BB] transition-colors">MintxQR Product</Link>
            <Link href="/work" className="hover:text-[#45E6BB] transition-colors">Selected Work</Link>
            <Link href="/about" className="hover:text-[#45E6BB] transition-colors">About Studio</Link>
            <Link href="/blog" className="hover:text-[#45E6BB] transition-colors">Insights & Blog</Link>
            <Link href="/careers" className="hover:text-[#45E6BB] transition-colors">Careers</Link>
          </div>
          <div className="flex flex-col gap-3.5 text-sm font-medium text-[#9AA8BA]">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5F6F2]">Connect & Legal</span>
            <Link href="/contact" className="hover:text-[#45E6BB] transition-colors">Contact Us</Link>
            <Link href="/privacy" className="hover:text-[#45E6BB] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#45E6BB] transition-colors">Terms of Service</Link>
            <a href={settings.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[#45E6BB] transition-colors">
              Instagram <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 text-sm font-medium text-[#9AA8BA] md:col-span-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5F6F2]">Headquarters</span>
          <p className="text-[#F5F6F2] font-semibold">{settings.location}</p>
          <a href={`mailto:${settings.email}`} className="text-[#45E6BB] hover:underline break-all">{settings.email}</a>
          <a href={`tel:${settings.phoneTel}`} className="hover:text-[#F5F6F2] transition-colors">{settings.phoneDisplay}</a>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <a
              href={settings.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              <WhatsappLogo size={16} weight="fill" className="text-emerald-400" /> WhatsApp Direct
            </a>
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
            >
              <InstagramLogo size={16} weight="fill" className="text-rose-400" /> @{settings.instagramHandle}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 bg-[#070D18] py-6">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-5 text-xs text-[#9AA8BA] sm:flex-row md:px-8">
          <p>© {year} MintX Solutions. Crafted with precision for high-performance businesses.</p>
          <p className="flex items-center gap-2">
            <span className="text-[#45E6BB]">Fast</span> • <span>Accessible</span> • <span>Bespoke</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
