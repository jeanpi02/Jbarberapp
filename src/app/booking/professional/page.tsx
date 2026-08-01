"use client";

import { BookingStepper } from "@/components/common/booking-stepper";
import { ProfessionalList } from "@/features/professionals/components/professional-list";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ProfessionalPage() {
  return (
    <>
      <Header />
      <main className="flex-grow px-4 pb-32 pt-24 md:px-10">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-10 text-center md:text-left">
            <h1 className="mb-2 text-2xl font-semibold text-primary md:text-3xl">
              Select your Professional
            </h1>
            <p className="text-sm text-on-surface-variant">
              Choose the expert that best fits your style and schedule.
            </p>
          </div>

          <BookingStepper currentStep={1} />
          <ProfessionalList />
        </div>
      </main>
      <Footer />
    </>
  );
}
