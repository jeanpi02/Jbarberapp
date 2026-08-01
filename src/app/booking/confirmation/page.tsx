"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  CalendarDays,
  Clock,
  User,
  Scissors,
  MapPin,
  CalendarPlus,
  Home,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/providers/booking-provider";
import { format } from "date-fns";

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#fed488", "#e9c176", "#775a19", "#000000", "#ffffff"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 5 + 3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate((this.rotation * Math.PI) / 180);
        ctx!.fillStyle = this.color;
        ctx!.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx!.restore();
      }
    }

    const particles: Particle[] = [];

    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        particles.push(new Particle());
      }, i * 20);
    }

    let animId: number;
    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.y > canvas.height) particles.splice(i, 1);
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
    />
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id") || "#BK-0000";
  const { state } = useBooking();

  return (
    <>
      <ConfettiCanvas />

      <header className="fixed left-0 right-0 top-0 z-40 h-16 w-full bg-surface shadow-sm">
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-[10px] font-bold text-white">BK</span>
            </div>
            <h1 className="text-lg font-bold text-primary">Elite Bookings</h1>
          </div>
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-center justify-center px-4 pb-32 pt-24">
        <div className="flex w-full max-w-[800px] flex-col items-center">
          <div className="mb-8 animate-[scaleIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary-container md:h-32 md:w-32">
              <CheckCircle2 className="h-16 w-16 text-on-secondary-container md:h-20 md:w-20" />
            </div>
          </div>

          <div className="mb-10 animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] text-center opacity-0">
            <h2 className="mb-2 text-2xl font-semibold text-primary md:text-3xl">
              Booking Confirmed!
            </h2>
            <p className="text-sm text-on-surface-variant">
              Your appointment has been successfully scheduled. See you soon!
            </p>
          </div>

          <div className="animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] grid w-full grid-cols-1 gap-6 opacity-0 md:grid-cols-12">
            <div className="col-span-12 flex flex-col items-start justify-between gap-4 rounded-[24px] border border-outline-variant/5 bg-surface-container-lowest/80 p-8 shadow-sm backdrop-blur-sm md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-xl shadow-sm">
                  <div className="flex h-full w-full items-center justify-center bg-surface-container text-secondary">
                    <Scissors className="h-8 w-8" />
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-secondary-fixed-dim">
                    Business
                  </p>
                  <h3 className="text-xl font-semibold">Barber King</h3>
                </div>
              </div>
              <div className="rounded-lg bg-surface-container px-4 py-2">
                <p className="mb-1 text-xs text-on-surface-variant">
                  Reservation ID
                </p>
                <p className="font-bold text-primary">{bookingId}</p>
              </div>
            </div>

            <div className="col-span-12 space-y-8 rounded-[24px] border border-outline-variant/5 bg-surface-container-lowest/80 p-8 shadow-sm backdrop-blur-sm md:col-span-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-container">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-on-surface-variant">
                    Professional
                  </p>
                  <p className="text-xl font-semibold">
                    {state.professional
                      ? `${state.professional.name} '${state.professional.nickname}'`
                      : "Not specified"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-container">
                  <Scissors className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-on-surface-variant">
                    Service
                  </p>
                  <p className="text-xl font-semibold">
                    {state.service?.name || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-12 flex flex-col justify-center gap-8 rounded-[24px] border border-secondary-fixed/30 bg-secondary-container/10 p-8 shadow-sm md:col-span-5">
              <div className="flex items-center gap-4">
                <CalendarDays className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-xs text-on-surface-variant">Date</p>
                  <p className="text-lg font-bold text-primary">
                    {state.date
                      ? format(state.date, "MMM d, yyyy")
                      : "Not specified"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-xs text-on-surface-variant">Time</p>
                  <p className="text-lg font-bold text-primary">
                    {state.timeSlot?.time || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.6s_forwards] col-span-12 relative h-48 overflow-hidden rounded-[24px] shadow-sm opacity-0">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="flex h-full w-full items-center justify-center bg-surface-container">
                <MapPin className="h-12 w-12 text-secondary" />
              </div>
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white">
                <MapPin className="h-4 w-4" />
                <p className="text-sm font-medium">Calle Real 123, Madrid</p>
              </div>
            </div>
          </div>

          <div className="animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.8s_forwards] mt-10 flex w-full flex-col gap-2 opacity-0 md:flex-row">
            <Button className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-secondary-container font-bold text-on-secondary-container shadow-md transition-all hover:scale-[1.02] active:scale-95">
              <CalendarPlus className="h-5 w-5" />
              Add to Calendar
            </Button>
            <Link
              href="/"
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-primary font-bold text-on-primary shadow-md transition-all hover:scale-[1.02] active:scale-95"
            >
              <Home className="h-5 w-5" />
              Return to Home
            </Link>
          </div>

          <Button
            variant="ghost"
            className="animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)_1s_forwards] mt-8 text-sm text-on-surface-variant underline opacity-0 hover:text-primary"
          >
            View Details or Cancel
          </Button>
        </div>
      </main>

      <footer className="w-full bg-primary-container px-4 py-10 md:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-on-primary-container">
            &copy; 2024 Elite Bookings. All rights reserved.
          </p>
          <div className="flex gap-6">
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

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-transparent" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
