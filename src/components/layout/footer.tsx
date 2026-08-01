import Link from "next/link";

const FOOTER_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Contact Support" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-primary-container px-4 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <div className="mb-2 text-2xl font-semibold text-white">
            Elite Bookings
          </div>
          <p className="max-w-xs text-sm text-on-primary-container/60">
            Premium booking engine for industry-leading service providers.
          </p>
        </div>
        <div className="flex flex-wrap gap-8">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-on-primary-container transition-colors hover:text-secondary-fixed"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[1280px] border-t border-white/5 pt-6 text-center text-sm text-on-primary-container/40 md:text-left">
        &copy; 2024 Elite Bookings. All rights reserved.
      </div>
    </footer>
  );
}
