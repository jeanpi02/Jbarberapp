"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { logout } from "@/services/auth.service";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Settings,
  LogOut,
  Scissors,
  Building2,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isSuperAdmin = user?.role === 'super_admin';

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ...(isSuperAdmin
      ? [{ href: "/dashboard/barbershops", label: "Barberías", icon: Building2 }]
      : []),
    { href: "/dashboard/barbers", label: "Barberos", icon: Users },
    { href: "/dashboard/bookings", label: "Reservas", icon: CalendarDays },
    { href: "/dashboard/settings", label: "Configuración", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-outline-variant/20 bg-surface-container-lowest">
      <div className="flex h-16 items-center gap-3 border-b border-outline-variant/20 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary">
          <Scissors className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-headline-md text-lg font-bold text-primary">
            JBarberApp
          </h1>
          <p className="text-xs text-on-surface-variant">
            {isSuperAdmin ? 'Super Admin' : user?.barbershop?.name || 'Admin Panel'}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-outline-variant/20 px-3 py-4">
        <div className="mb-3 px-4">
          <p className="text-sm font-medium text-on-surface">{user?.firstName} {user?.lastName}</p>
          <p className="text-xs text-on-surface-variant">{user?.email}</p>
          <span className="mt-1 inline-block rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-bold uppercase text-on-secondary-container">
            {user?.role === 'super_admin' ? 'Super Admin' : user?.role}
          </span>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
        >
          <LogOut className="h-5 w-5" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
