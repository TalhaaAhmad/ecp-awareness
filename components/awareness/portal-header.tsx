"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { DesignArtwork } from "./design-artwork";

const navItems = [
  { href: "/", label: "Learn" },
  { href: "/quiz", label: "Quiz" },
  { href: "/journey", label: "Voting game" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <header className="site-header" aria-label="Main navigation">
      <div className="header-inner">
        {/* Brand */}
        <Link href="/" className="header-brand" aria-label="Election Commission of Pakistan home" onClick={() => setMobileOpen(false)}>
          <DesignArtwork source="quiz" crop={[40, 12, 114, 112]} className="header-seal" priority />
          <div className="header-brand-text">
            <strong>ELECTION COMMISSION</strong>
            <strong>OF PAKISTAN</strong>
            <span>Free, Fair, Transparent Elections</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`header-nav-link${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link href="/#resources" className="header-cta">
          Explore resources
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          ref={toggleRef}
          className="header-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav id="mobile-navigation" className="header-mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`header-mobile-link${isActive ? " active" : ""}`}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/#resources"
            className="header-mobile-link cta"
            onClick={() => setMobileOpen(false)}
          >
            Explore resources
          </Link>
        </nav>
      )}
    </header>
  );
}
