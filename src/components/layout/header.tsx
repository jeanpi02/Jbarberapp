"use client";

import { useState, useEffect } from "react";
import { Scissors, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#professionals", label: "Professionals" },
  { href: "/#services", label: "Services" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#review", label: "Review" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 w-full bg-surface transition-shadow duration-300",
        scrolled && "shadow-md"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-4 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary">
            <Scissors className="h-5 w-5" />
          </div>
          <span className="font-headline-md text-lg font-bold text-primary">
            Elite Bookings
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label-md text-sm font-medium text-on-surface-variant transition-opacity hover:opacity-80 first:text-primary first:font-bold"
            >
              {link.label}
            </Link>
          ))}
          <button
            className="text-primary transition-opacity hover:opacity-80"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>

        <button
          className="text-primary md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-outline-variant/20 bg-surface px-4 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 font-label-md text-sm text-on-surface-variant transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
