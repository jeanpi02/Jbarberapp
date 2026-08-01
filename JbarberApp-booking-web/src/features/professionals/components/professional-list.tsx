"use client";

import { Star, Clock, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Professional } from "@/types";
import { useProfessionals } from "@/hooks/use-professionals";
import { useBooking } from "@/providers/booking-provider";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfessionalList() {
  const { data: professionals, isLoading } = useProfessionals();
  const { setProfessional } = useBooking();
  const router = useRouter();

  const handleSelect = (professional: Professional) => {
    setProfessional(professional);
    router.push("/booking/service");
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-6 rounded-[24px] border border-outline-variant p-6 md:flex-row"
          >
            <Skeleton className="h-64 w-full rounded-2xl md:w-48" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-48" />
              <div className="flex justify-end">
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {professionals?.map((professional) => (
        <div
          key={professional.id}
          className="group relative flex flex-col overflow-hidden rounded-[24px] border border-outline-variant bg-surface-container-lowest/80 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md md:flex-row md:gap-6"
        >
          <div className="h-64 w-full shrink-0 overflow-hidden rounded-2xl md:h-auto md:w-48">
            <img
              src={professional.avatar}
              alt={professional.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="flex flex-grow flex-col justify-between">
            <div>
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {professional.name} &apos;{professional.nickname}&apos;
                  </h2>
                  <p className="text-xs font-medium uppercase tracking-wider text-secondary">
                    {professional.role}
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1">
                  <Star className="h-[18px] w-[18px] fill-current text-on-secondary-container" />
                  <span className="text-sm font-medium text-on-secondary-container">
                    {professional.rating}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <Clock className="h-5 w-5" />
                  <span>{professional.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <CalendarCheck className="h-5 w-5" />
                  <span>
                    Next available:{" "}
                    <span className="font-bold text-primary">
                      {professional.nextAvailable}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                className={
                  professional.isFeatured
                    ? "rounded-full bg-secondary-fixed px-8 py-3 font-medium text-on-secondary-fixed hover:opacity-90 active:scale-95"
                    : "rounded-full bg-primary px-8 py-3 font-medium text-on-primary hover:opacity-90 active:scale-95"
                }
                onClick={() => handleSelect(professional)}
              >
                Select Professional
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
