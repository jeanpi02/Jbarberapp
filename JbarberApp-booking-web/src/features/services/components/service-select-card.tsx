"use client";

import { Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceSelectCardProps {
  service: Service;
  selected: boolean;
  onSelect: (service: Service) => void;
}

export function ServiceSelectCard({
  service,
  selected,
  onSelect,
}: ServiceSelectCardProps) {
  return (
    <label className="group relative cursor-pointer">
      <input
        type="radio"
        name="service"
        className="sr-only peer"
        checked={selected}
        onChange={() => onSelect(service)}
      />
      <div
        className={cn(
          "rounded-[24px] border border-outline-variant/30 bg-surface-container-lowest/80 p-6 backdrop-blur-sm transition-all duration-300 peer-checked:ring-2 peer-checked:ring-secondary peer-checked:bg-secondary-container/10 group-hover:shadow-lg",
          service.isPremium &&
            "border-secondary/20 bg-secondary-container/5"
        )}
      >
        {service.isPremium && (
          <div className="absolute right-0 top-0 rounded-bl-[16px] bg-secondary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-on-secondary">
            Premium Choice
          </div>
        )}

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h4 className="text-xl font-semibold">{service.name}</h4>
              {service.isPopular && (
                <span className="rounded-full bg-surface-variant px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  Popular
                </span>
              )}
            </div>
            <p className="mb-4 text-sm text-on-surface-variant">
              {service.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <Clock className="h-[18px] w-[18px]" />
                <span>{service.duration} min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-[18px] w-[18px]" />
                <span className="font-bold text-primary">
                  ${service.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-outline-variant transition-colors peer-checked:border-secondary mt-8">
            <div className="h-3 w-3 rounded-full bg-secondary opacity-0 transition-opacity peer-checked:opacity-100" />
          </div>
        </div>
      </div>
    </label>
  );
}
