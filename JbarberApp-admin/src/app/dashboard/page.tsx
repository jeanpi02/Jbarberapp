"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays, TrendingUp, DollarSign } from "lucide-react";

const STATS = [
  {
    label: "Total Barberos",
    value: "3",
    icon: Users,
    color: "text-secondary",
  },
  {
    label: "Reservas Hoy",
    value: "12",
    icon: CalendarDays,
    color: "text-secondary",
  },
  {
    label: "Ingresos del Mes",
    value: "$2,450",
    icon: DollarSign,
    color: "text-secondary",
  },
  {
    label: "Crecimiento",
    value: "+15%",
    icon: TrendingUp,
    color: "text-tertiary-container",
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-on-surface-variant">
            Bienvenido al panel de administración
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-on-surface-variant">
                    {stat.label}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-on-surface-variant">
                No hay actividad reciente para mostrar.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-on-surface-variant">
                No hay reservas próximas para mostrar.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
