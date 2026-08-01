"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Scissors,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useBooking } from "@/providers/booking-provider";
import { useCreateBooking } from "@/hooks/use-booking";
import { format } from "date-fns";
import { toast } from "sonner";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().min(6, "Phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function DetailsPage() {
  const router = useRouter();
  const { state, setCustomerInfo } = useBooking();
  const { mutate: createBooking, isPending } = useCreateBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: state.customerName,
      phone: state.customerPhone,
      email: state.customerEmail,
      notes: state.notes,
    },
  });

  const onSubmit = (data: BookingFormData) => {
    setCustomerInfo({
      name: data.fullName,
      phone: data.phone,
      email: data.email || "",
      notes: data.notes || "",
    });

    if (!state.professional || !state.service || !state.date || !state.timeSlot) {
      toast.error("Missing booking information");
      return;
    }

    createBooking(
      {
        professionalId: state.professional.id,
        serviceId: state.service.id,
        date: state.date.toISOString(),
        timeSlotId: state.timeSlot.id,
        customerName: data.fullName,
        customerPhone: data.phone,
        customerEmail: data.email,
        notes: data.notes,
      },
      {
        onSuccess: (result) => {
          toast.success("Reservation confirmed!");
          router.push(
            `/booking/confirmation?id=${result.id}`
          );
        },
        onError: () => {
          toast.error("Failed to create booking. Please try again.");
        },
      }
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-surface shadow-sm">
        <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary-container">
              <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                BK
              </div>
            </div>
            <span className="text-lg font-bold text-primary">
              Elite Bookings
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow px-4 pb-24 pt-8 md:px-10">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-8 flex items-center gap-2">
            <Button
              variant="ghost"
              className="group flex items-center py-2 text-sm text-on-surface-variant hover:text-primary"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Schedule
            </Button>
          </div>

          <h1 className="mb-8 text-2xl font-semibold text-primary md:text-3xl">
            Confirm your details
          </h1>

          <section className="mb-10 rounded-[24px] border border-outline-variant/30 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] md:p-8">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Reservation Summary
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-surface-container p-3">
                  <CalendarDays className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">Date & Time</p>
                  <p className="text-lg font-bold">
                    {state.date && state.timeSlot
                      ? `${format(state.date, "EEEE, MMM d")} \u2022 ${state.timeSlot.time}`
                      : "Not selected"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-surface-container p-3">
                  <Scissors className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">Service</p>
                  <p className="text-lg font-bold">
                    {state.service?.name || "Not selected"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="overflow-hidden rounded-xl bg-surface-container p-1">
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage src={state.professional?.avatar} />
                    <AvatarFallback>
                      {state.professional?.name?.[0] ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">
                    Professional
                  </p>
                  <p className="text-lg font-bold">
                    {state.professional
                      ? `${state.professional.name} '${state.professional.nickname}'`
                      : "Not selected"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-surface-container p-3">
                  <DollarSign className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">Total Price</p>
                  <p className="text-lg font-bold">
                    ${state.service?.price.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="block px-1 text-sm font-medium"
                >
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  className="h-12 rounded-xl border-transparent bg-[#F4F4F5] text-sm transition-all focus:border-secondary-fixed-dim focus:ring-1 focus:ring-secondary-fixed-dim"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="px-1 text-xs text-error">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="block px-1 text-sm font-medium"
                >
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="h-12 rounded-xl border-transparent bg-[#F4F4F5] text-sm transition-all focus:border-secondary-fixed-dim focus:ring-1 focus:ring-secondary-fixed-dim"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="px-1 text-xs text-error">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="email"
                  className="block px-1 text-sm font-medium"
                >
                  Email Address (Optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="h-12 rounded-xl border-transparent bg-[#F4F4F5] text-sm transition-all focus:border-secondary-fixed-dim focus:ring-1 focus:ring-secondary-fixed-dim"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="px-1 text-xs text-error">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="notes"
                  className="block px-1 text-sm font-medium"
                >
                  Notes/Observations (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or details we should know?"
                  rows={4}
                  className="rounded-xl border-transparent bg-[#F4F4F5] text-sm transition-all focus:border-secondary-fixed-dim focus:ring-1 focus:ring-secondary-fixed-dim"
                  {...register("notes")}
                />
              </div>
            </div>

            <p className="mx-auto max-w-md text-center text-xs text-on-surface-variant">
              By clicking &quot;Confirm Reservation&quot;, you agree to our{" "}
              <a href="#" className="text-secondary underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-secondary underline">
                Privacy Policy
              </a>
              .
            </p>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary-fixed-dim py-4 text-lg font-bold text-on-secondary-fixed shadow-lg transition-all hover:bg-secondary-fixed active:scale-[0.98]"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Reservation
                    <CheckCircle2 className="h-5 w-5 fill-current" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <footer className="w-full bg-primary-container px-4 py-10 md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-2xl font-semibold text-white">
              Elite Bookings
            </span>
            <p className="text-sm opacity-60">
              &copy; 2024 Elite Bookings. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
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
          </div>
        </div>
      </footer>
    </>
  );
}
