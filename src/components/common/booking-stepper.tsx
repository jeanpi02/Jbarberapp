"use client";

import { cn } from "@/lib/utils";
import {
  Check,
  Scissors,
  CalendarDays,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";

const STEP_ICONS: Record<number, LucideIcon> = {
  1: Check,
  2: Scissors,
  3: CalendarDays,
  4: ClipboardCheck,
};

const STEP_LABELS: Record<number, string> = {
  1: "Expert",
  2: "Service",
  3: "Time",
  4: "Review",
};

interface BookingStepperProps {
  currentStep: number;
}

export function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="mb-12">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-surface-container-highest -z-10" />
        <div
          className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-secondary -z-10 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />

        {[1, 2, 3, 4].map((step) => {
          const Icon = STEP_ICONS[step];
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                  isCompleted && "bg-secondary text-on-secondary shadow-md",
                  isCurrent &&
                    "bg-secondary text-on-secondary shadow-md ring-4 ring-secondary-container",
                  !isCompleted &&
                    !isCurrent &&
                    "bg-surface-container-highest text-on-surface-variant"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  (isCompleted || isCurrent)
                    ? "font-bold text-secondary"
                    : "text-on-surface-variant"
                )}
              >
                {STEP_LABELS[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
