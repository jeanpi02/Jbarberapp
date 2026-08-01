import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JBarberApp Admin | Panel de Administración",
  description: "Panel de administración para gestión de barberías y barberos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <QueryProvider>
          <TooltipProvider>
            <AuthProvider>
              {children}
              <ToastProvider />
            </AuthProvider>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
