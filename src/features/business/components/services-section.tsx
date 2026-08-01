import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/features/services/components/service-card";
import { FEATURED_SERVICES } from "@/constants";

export function ServicesSection() {
  return (
    <section id="services" className="bg-surface py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-semibold md:text-3xl">
              Featured Services
            </h2>
            <p className="text-sm text-on-surface-variant">
              Meticulously crafted services for your distinct look.
            </p>
          </div>
          <Button
            variant="ghost"
            className="hidden items-center gap-2 font-bold text-primary hover:opacity-70 md:flex"
          >
            View Menu
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURED_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
