"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TimeSlot } from "@/types";
import {
  Clock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunset,
  Moon,
  CheckCircle2,
  Ban,
  Verified,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTimeSlots } from "@/hooks/use-services";
import { useBooking } from "@/providers/booking-provider";
import { cn } from "@/lib/utils";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isPast, startOfDay } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function SchedulePage() {
  const router = useRouter();
  const { state, setDate, setTimeSlot } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(state.date);
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(
    state.timeSlot?.id ?? null
  );

  const { data: timeSlots, isLoading: slotsLoading } = useTimeSlots(
    state.professional?.id || null,
    selectedDate
  );

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const firstDayOfWeek = monthStart.getDay();
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const handleDateSelect = (day: Date) => {
    if (isPast(startOfDay(day))) return;
    setSelectedDate(day);
    setDate(day);
    setSelectedTimeId(null);
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    if (!slot.available) return;
    setSelectedTimeId(slot.id);
    setTimeSlot(slot);
  };

  const handleNext = () => {
    if (selectedDate && selectedTimeId) {
      router.push("/booking/details");
    }
  };

  const getPeriodIcon = (period: string) => {
    switch (period) {
      case "morning":
        return <Sun className="h-[18px] w-[18px]" />;
      case "afternoon":
        return <Sunset className="h-[18px] w-[18px]" />;
      default:
        return <Moon className="h-[18px] w-[18px]" />;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-surface shadow-sm">
        <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-outline-variant">
              <div className="flex h-full w-full items-center justify-center bg-primary text-xs font-bold text-white">
                BK
              </div>
            </div>
            <h1 className="text-lg font-bold text-primary">Elite Bookings</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[800px] space-y-8 px-4 py-8 md:px-0">
        <section className="flex flex-col items-center gap-6 rounded-[24px] border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-sm md:flex-row">
          <div className="relative h-24 w-24 shrink-0">
            <Avatar className="h-full w-full border-2 border-secondary-fixed">
              <AvatarImage src={state.professional?.avatar} />
              <AvatarFallback>
                {state.professional?.name?.[0] ?? "?"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 rounded-full border-2 border-surface bg-secondary p-1">
              <Verified className="h-3 w-3 text-white" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-primary">
              {state.professional?.name || "Professional"}
            </h2>
            <p className="mb-2 text-sm text-on-surface-variant">
              {state.service?.name || "Select a service"}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <span className="flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1 text-xs text-on-surface-variant">
                <Clock className="h-[18px] w-[18px]" />
                {state.service?.duration || 0} Minutes
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1 text-xs text-on-surface-variant">
                <DollarSign className="h-[18px] w-[18px]" />
                ${state.service?.price.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-outline-variant/20 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-primary">
              {format(currentMonth, "MMMM yyyy")}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
                  )
                }
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
                  )
                }
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-7">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-medium text-on-surface-variant"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {blanks.map((i) => (
              <div key={`blank-${i}`} />
            ))}
            {days.map((day) => {
              const isPastDay = isPast(startOfDay(day));
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isTodayDay = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  disabled={isPastDay}
                  onClick={() => handleDateSelect(day)}
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-xl border border-outline-variant/10 text-sm transition-all",
                    isPastDay &&
                      "cursor-not-allowed bg-surface-container-low text-outline-variant",
                    !isPastDay &&
                      !isSelected &&
                      "hover:border-secondary",
                    isSelected &&
                      "border-2 border-secondary bg-primary font-bold text-on-primary shadow-lg ring-4 ring-primary/10",
                    isTodayDay &&
                      !isSelected &&
                      "bg-secondary-container font-bold text-on-secondary-container shadow-md"
                  )}
                >
                  <span>{format(day, "d")}</span>
                  {isTodayDay && !isSelected && (
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-widest">
                      Today
                    </span>
                  )}
                  {isSelected && (
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-widest">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border border-outline-variant/30" />
              <span className="text-on-surface-variant">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-on-surface-variant">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-surface-container-low" />
              <span className="text-on-surface-variant">Unavailable</span>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
          <h3 className="mb-6 text-xl font-semibold text-primary">
            Available Time Slots
          </h3>

          {slotsLoading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {timeSlots?.map((slot) => {
                const isSelected = selectedTimeId === slot.id;
                return (
                  <button
                    key={slot.id}
                    disabled={!slot.available}
                    onClick={() => handleTimeSelect(slot)}
                    className={cn(
                      "flex h-14 items-center justify-center gap-2 rounded-full border text-sm font-bold transition-all",
                      !slot.available &&
                        "cursor-not-allowed border-outline-variant bg-surface-container text-outline-variant opacity-50",
                      slot.available &&
                        !isSelected &&
                        "border-outline-variant hover:border-secondary hover:bg-secondary/5",
                      isSelected &&
                        "border-2 border-secondary bg-secondary-container font-extrabold text-on-secondary-container shadow-md"
                    )}
                  >
                    {!slot.available ? (
                      <Ban className="h-[18px] w-[18px]" />
                    ) : isSelected ? (
                      <CheckCircle2 className="h-[18px] w-[18px] fill-current" />
                    ) : (
                      getPeriodIcon(slot.period)
                    )}
                    {slot.time}
                  </button>
                );
              })}
            </div>
          )}

          <p className="mt-6 text-center text-xs italic text-on-surface-variant">
            All times are shown in your local timezone
          </p>
        </section>
      </main>

      <footer className="mt-auto w-full bg-primary-container px-4 py-10 md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <span className="mb-2 text-2xl font-semibold text-white">
              Elite Bookings
            </span>
            <p className="text-center text-sm text-on-primary-container md:text-left">
              &copy; 2024 Elite Bookings. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <nav className="flex gap-4">
              <a
                href="#"
                className="text-sm text-on-primary-container hover:text-secondary-fixed-dim"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-on-primary-container hover:text-secondary-fixed-dim"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-on-primary-container hover:text-secondary-fixed-dim"
              >
                Contact Support
              </a>
            </nav>
            <Button
              className="flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-lg font-bold text-on-primary shadow-xl transition-all hover:bg-secondary-fixed-dim active:scale-95"
              onClick={handleNext}
              disabled={!selectedDate || !selectedTimeId}
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}
