import { Star, CalendarDays, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@/constants";

export function HeroSection() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden md:h-[80vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1585747860019-8e8ef35af9da?w=1600&h=900&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-[1280px] flex-col items-start justify-end px-4 pb-16 md:px-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-fixed px-3 py-1 font-label-md text-sm shadow-sm text-on-secondary-fixed">
          <Star className="h-4 w-4 fill-current" />
          <span>{BUSINESS_INFO.rating} Rating</span>
        </div>

        <h1 className="mb-2 font-display-lg text-[40px] leading-tight text-white md:text-6xl">
          {BUSINESS_INFO.name}
        </h1>

        <p className="mb-8 max-w-xl text-lg text-white/90 font-body-lg">
          The ultimate grooming experience for the modern gentleman. Precision
          cuts, artisanal shaves, and premium care.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="/booking/professional"
            className="inline-flex items-center rounded-xl bg-secondary-fixed px-8 py-6 text-base font-bold text-on-secondary-fixed shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Book Appointment
            <CalendarDays className="ml-2 h-5 w-5" />
          </a>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-xl bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            aria-label="Share"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
