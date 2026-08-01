"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBarbershops,
  createBarbershop,
  updateBarbershop,
} from "@/services/barbershop.service";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Building2, Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import type { Barbershop } from "@/types";

const barbershopSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  address: z.string().optional(),
  phone: z.string().optional(),
  adminFirstName: z.string().min(2, "Nombre del admin requerido"),
  adminLastName: z.string().min(2, "Apellido del admin requerido"),
  adminEmail: z.string().email("Email inválido"),
  adminPassword: z.string().min(6, "Mínimo 6 caracteres"),
});

type BarbershopFormData = z.infer<typeof barbershopSchema>;

export default function BarbershopsPage() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editShop, setEditShop] = useState<Barbershop | null>(null);
  const [editStatus, setEditStatus] = useState<string>("active");

  const { data: barbershops, isLoading } = useQuery({
    queryKey: ["barbershops"],
    queryFn: getBarbershops,
  });

  const createMutation = useMutation({
    mutationFn: createBarbershop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbershops"] });
      setIsCreateOpen(false);
      toast.success("Barbería y usuario admin creados");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Error al crear barbería");
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Barbershop> }) =>
      updateBarbershop(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbershops"] });
      setEditShop(null);
      toast.success("Barbería actualizada");
    },
    onError: () => toast.error("Error al actualizar"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BarbershopFormData>({
    resolver: zodResolver(barbershopSchema),
  });

  const editForm = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    },
  });

  const onSubmitCreate = (data: BarbershopFormData) => {
    createMutation.mutate(data);
    reset();
  };

  const onSubmitEdit = (data: any) => {
    if (editShop) {
      editMutation.mutate({ id: editShop.id, data: { ...data, status: editStatus as any } });
    }
  };

  const statusColors: Record<string, string> = {
    active: "bg-tertiary-fixed-dim text-on-tertiary-fixed",
    inactive: "bg-surface-container text-on-surface-variant",
    suspended: "bg-error-container text-on-error-container",
  };

  const statusLabels: Record<string, string> = {
    active: "Activa",
    inactive: "Inactiva",
    suspended: "Suspendida",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Barberías</h1>
            <p className="text-on-surface-variant">Gestiona las barberías de la plataforma</p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger className="inline-flex items-center justify-center rounded-lg bg-secondary-fixed px-4 py-2 text-sm font-medium text-on-secondary-fixed transition-colors hover:bg-secondary-fixed-dim">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Barbería
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white border-2 border-outline-variant shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Crear Barbería</DialogTitle>
                <DialogDescription>
                  Registra una nueva barbería y crea el usuario administrador.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmitCreate)} className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-primary">Información de la Barbería</h3>
                  <div className="space-y-2">
                    <Label>Nombre</Label>
                    <Input placeholder="Barber King" {...register("name")} />
                    {errors.name && <p className="text-sm text-error">{errors.name.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Dirección</Label>
                      <Input placeholder="Calle Real 123" {...register("address")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Teléfono</Label>
                      <Input placeholder="+34 912 345 678" {...register("phone")} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-primary">Usuario Administrador</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nombre</Label>
                      <Input placeholder="Admin" {...register("adminFirstName")} />
                      {errors.adminFirstName && <p className="text-sm text-error">{errors.adminFirstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Apellido</Label>
                      <Input placeholder="BarberKing" {...register("adminLastName")} />
                      {errors.adminLastName && <p className="text-sm text-error">{errors.adminLastName.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="admin@barberking.com" {...register("adminEmail")} />
                    {errors.adminEmail && <p className="text-sm text-error">{errors.adminEmail.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Contraseña</Label>
                    <Input type="password" placeholder="••••••••" {...register("adminPassword")} />
                    {errors.adminPassword && <p className="text-sm text-error">{errors.adminPassword.message}</p>}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando...
                      </>
                    ) : (
                      "Crear Barbería"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={!!editShop} onOpenChange={(open) => { if (!open) setEditShop(null); }}>
          <DialogContent className="bg-white border-2 border-outline-variant shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Editar Barbería</DialogTitle>
            </DialogHeader>
            {editShop && (
              <form onSubmit={editForm.handleSubmit(onSubmitEdit)} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input {...editForm.register("name")} />
                </div>
                <div className="space-y-2">
                  <Label>Dirección</Label>
                  <Input {...editForm.register("address")} />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input {...editForm.register("phone")} />
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <select
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="active">Activa</option>
                    <option value="inactive">Inactiva</option>
                    <option value="suspended">Suspendida</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setEditShop(null)}>Cancelar</Button>
                  <Button type="submit" className="bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim" disabled={editMutation.isPending}>
                    {editMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Guardando...</> : "Guardar"}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Lista de Barberías
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
              </div>
            ) : barbershops && barbershops.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barbershops.map((shop: Barbershop) => (
                    <TableRow key={shop.id}>
                      <TableCell className="font-medium">{shop.name}</TableCell>
                      <TableCell>{shop.address || "-"}</TableCell>
                      <TableCell>{shop.phone || "-"}</TableCell>
                      <TableCell>
                        {shop.users?.[0]?.email || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[shop.status] || ""}>
                          {statusLabels[shop.status] || shop.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { setEditShop(shop); setEditStatus(shop.status); }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center text-on-surface-variant">No hay barberías registradas</div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
