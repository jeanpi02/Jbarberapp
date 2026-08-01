"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export default function BookingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Reservas</h1>
          <p className="text-on-surface-variant">
            Gestiona las reservas de tu barbería
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Lista de Reservas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-on-surface-variant">
              Próximamente: aquí se mostrarán todas las reservas.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
