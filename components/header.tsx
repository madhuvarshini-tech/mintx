"use client";

import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Our Products" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/careers", label: "Career" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Safe helper to reliably close the menu and reset body scroll
  const closeMenu = useCallback(() => {
    setOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu]);

  // Detect scroll for subtle shadow elevation
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open, and ensure cleanup
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Auto-close menu if screen resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeMenu]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 md:h-20 transition-all duration-200 bg-white/95 backdrop-blur-md ${
        scrolled
          ? "border-b border-slate-200/80 shadow-xs"
          : "border-b border-slate-100"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-6 px-5 md:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-[#14b8a6] rounded-lg"
          aria-label="MintX Solutions - Home"
          onClick={closeMenu}
        >
          <Image
            src="/brand/logo-mark.png"
            alt="MintX Solutions"
            width={180}
            height={44}
            priority
            unoptimized
            className="h-9 md:h-10 w-auto object-contain block"
          />
        </Link>

        {/* Desktop Navigation - Exact matching order and clean styling */}
        <nav
          className="hidden items-center gap-6 xl:gap-8 lg:flex"
          aria-label="Primary"
        >
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#14b8a6] ${
                  active
                    ? "font-semibold text-[#14b8a6]"
                    : "font-medium text-[#1E293B] hover:text-[#14b8a6]"
                }`}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:border-[#14b8a6]/40 hover:text-[#14b8a6] focus-visible:outline-2 focus-visible:outline-[#14b8a6]"
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => {
              if (open) {
                closeMenu();
              } else {
                setOpen(true);
              }
            }}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {open && (
        <div
          className="fixed inset-0 top-16 md:top-20 z-40 bg-slate-900/20 backdrop-blur-xs lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      {open && (
        <div
          className="fixed inset-x-0 top-16 md:top-20 z-50 flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto border-b border-slate-200 bg-white px-6 py-6 shadow-2xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-200"
          aria-label="Mobile Navigation Drawer"
        >
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#14b8a6] px-2 pb-1">
              Menu Navigation
            </span>
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    active
                      ? "bg-[#14b8a6]/10 text-[#0d9488] font-semibold"
                      : "text-slate-800 hover:bg-slate-50 hover:text-[#14b8a6]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-[#14b8a6]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="w-full text-center py-3 rounded-xl bg-[#14b8a6] text-white font-semibold shadow-sm hover:bg-[#0d9488] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
