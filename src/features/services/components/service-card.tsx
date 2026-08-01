import Link from "next/link";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group overflow-hidden rounded-[24px] border border-outline-variant/30 bg-surface-container-lowest p-2 transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 h-48 overflow-hidden rounded-xl">
        <img
          src={service.image || "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=400&fit=crop"}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="px-1 pb-2">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-xl font-semibold">{service.name}</h3>
          <span className="text-xl font-bold text-secondary">
            &euro;{service.price}
          </span>
        </div>
        <p className="mb-6 text-sm text-on-surface-variant">
          {service.description}
        </p>
        <Link href="/booking/professional">
          <span className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-surface-container-high py-3 text-sm font-medium transition-colors hover:bg-primary hover:text-on-primary">
            Quick Book
          </span>
        </Link>
      </div>
    </div>
  );
}
