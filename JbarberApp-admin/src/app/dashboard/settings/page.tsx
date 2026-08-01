"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Configuración</h1>
          <p className="text-on-surface-variant">
            Configura los ajustes de tu barbería
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Ajustes Generales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-on-surface-variant">
              Próximamente: aquí podrás configurar los ajustes de tu barbería.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
