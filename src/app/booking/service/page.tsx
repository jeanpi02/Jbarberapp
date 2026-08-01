"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookingStepper } from "@/components/common/booking-stepper";
import type { Service } from "@/types";
import { ServiceSelectCard } from "@/features/services/components/service-select-card";
import { useServices } from "@/hooks/use-services";
import { useBooking } from "@/providers/booking-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ServicePage() {
  const { data: services, isLoading } = useServices();
  const { state, setService } = useBooking();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(
    state.service?.id ?? null
  );

  const handleSelect = (service: Service) => {
    setSelectedId(service.id);
    setService(service);
  };

  const handleContinue = () => {
    if (selectedId) {
      router.push("/booking/schedule");
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto min-h-screen max-w-[800px] px-4 pb-32 pt-24 md:px-10">
        <BookingStepper currentStep={2} />

        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-primary md:text-3xl">
            Select Service
          </h2>
          <p className="text-sm text-on-surface-variant">
            Choose the perfect treatment for your grooming session with{" "}
            {state.professional?.name || "your professional"}.
          </p>
        </div>

        {state.professional && (
          <div className="mb-10 flex items-center gap-4 rounded-[24px] border border-outline-variant/30 bg-surface-container-low p-4">
            <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
              <AvatarImage src={state.professional.avatar} />
              <AvatarFallback>
                {state.professional.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-bold">
                {state.professional.name} &apos;{state.professional.nickname}
                &apos;
              </h3>
              <p className="text-xs text-on-surface-variant">
                {state.professional.role} &bull; {state.professional.rating}{" "}
                &#9733; ({state.professional.reviewCount} reviews)
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-sm font-bold text-secondary hover:underline"
              onClick={() => router.push("/booking/professional")}
            >
              Change
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-40 w-full rounded-[24px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {services?.map((service) => (
              <ServiceSelectCard
                key={service.id}
                service={service}
                selected={selectedId === service.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-col items-center gap-4 md:flex-row">
          <Button
            className="w-full rounded-full bg-primary px-10 py-4 text-sm font-bold text-on-primary shadow-lg transition-all hover:scale-[1.02] active:scale-95 md:w-auto"
            onClick={handleContinue}
            disabled={!selectedId}
          >
            Continue to Scheduling
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full border-outline px-10 py-4 text-sm font-bold text-primary hover:bg-surface-container md:w-auto"
            onClick={() => router.push("/booking/professional")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Professionals
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
