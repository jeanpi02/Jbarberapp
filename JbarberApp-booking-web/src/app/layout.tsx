import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { BookingProvider } from "@/providers/booking-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elite Bookings | Premium Barber Experience",
  description:
    "The ultimate grooming experience for the modern gentleman. Book your appointment with Madrid's finest barbers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <QueryProvider>
          <TooltipProvider>
            <BookingProvider>
              {children}
              <ToastProvider />
            </BookingProvider>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
