import { MapPin, ExternalLink } from "lucide-react";
import { BUSINESS_INFO } from "@/constants";

export function LocationSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-1 flex flex-col items-center gap-8 rounded-[24px] border border-outline-variant/30 bg-surface-container-low p-8 md:col-span-2 md:flex-row">
          <div className="w-full md:w-1/2">
            <h3 className="mb-2 text-xl font-semibold">Visit Us</h3>
            <p className="mb-6 flex items-center gap-2 text-sm text-on-surface-variant">
              <MapPin className="h-5 w-5 text-secondary" />
              {BUSINESS_INFO.address}
            </p>
            <a
              href="#"
              className="flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
            >
              Get Directions
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="h-48 w-full overflow-hidden rounded-2xl bg-outline-variant/20 shadow-inner md:w-1/2">
            <div className="flex h-full w-full items-center justify-center bg-surface-container text-on-surface-variant">
              <MapPin className="h-12 w-12 text-secondary" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[24px] bg-primary-container p-8 text-on-primary-container">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Opening Hours
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 py-2">
                <span className="text-sm font-medium">Mon - Sat</span>
                <span className="text-sm font-medium text-secondary-fixed">
                  {BUSINESS_INFO.hours.weekdays}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Sunday</span>
                <span className="text-sm font-medium text-on-primary-container/60">
                  {BUSINESS_INFO.hours.sunday}
                </span>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/70">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href={BUSINESS_INFO.social.chat}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-secondary-fixed hover:text-on-secondary-fixed"
                aria-label="Chat"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </a>
              <a
                href={BUSINESS_INFO.social.instagram}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-secondary-fixed hover:text-on-secondary-fixed"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
