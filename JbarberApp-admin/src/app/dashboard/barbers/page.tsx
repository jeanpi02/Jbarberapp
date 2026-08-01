"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBarbers, updateBarber } from "@/services/barber.service";
import { createBarberUser } from "@/services/auth.service";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import type { Barber } from "@/types";

const createBarberSchema = z.object({
  firstName: z.string().min(2, "Nombre muy corto"),
  lastName: z.string().min(2, "Apellido muy corto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  phone: z.string().optional(),
});

type CreateBarberFormData = z.infer<typeof createBarberSchema>;

const editBarberSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  nickname: z.string().optional(),
  phone: z.string().optional(),
  isActive: z.boolean(),
});

type EditBarberFormData = z.infer<typeof editBarberSchema>;

export default function BarbersPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editBarber, setEditBarber] = useState<Barber | null>(null);

  const isSuperAdmin = user?.role === 'super_admin';

  const { data: barbers, isLoading } = useQuery({
    queryKey: ["barbers", user?.barbershopId],
    queryFn: () => getBarbers(isSuperAdmin ? undefined : user?.barbershopId),
  });

  const createMutation = useMutation({
    mutationFn: createBarberUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
      setIsCreateOpen(false);
      toast.success("Barbero creado exitosamente");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Error al crear barbero");
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Barber> }) =>
      updateBarber(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
      setEditBarber(null);
      toast.success("Barbero actualizado");
    },
    onError: () => {
      toast.error("Error al actualizar barbero");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBarberFormData>({
    resolver: zodResolver(createBarberSchema),
  });

  const editForm = useForm<EditBarberFormData>({
    resolver: zodResolver(editBarberSchema),
    values: editBarber
      ? {
          name: editBarber.name,
          nickname: editBarber.nickname || "",
          phone: editBarber.user?.phone || "",
          isActive: editBarber.isActive,
        }
      : undefined,
  });

  const onSubmitCreate = (data: CreateBarberFormData) => {
    createMutation.mutate({
      ...data,
      barbershopId: user?.barbershopId || "",
    });
    reset();
  };

  const onSubmitEdit = (data: EditBarberFormData) => {
    if (editBarber) {
      editMutation.mutate({ id: editBarber.id, data });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Barberos</h1>
            <p className="text-on-surface-variant">
              Gestiona los barberos de tu barbería
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger className="inline-flex items-center justify-center rounded-lg bg-secondary-fixed px-4 py-2 text-sm font-medium text-on-secondary-fixed transition-colors hover:bg-secondary-fixed-dim">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Barbero
            </DialogTrigger>
            <DialogContent className="bg-white border-2 border-outline-variant shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Crear Nuevo Barbero</DialogTitle>
                <DialogDescription>
                  Crea una cuenta para un nuevo barbero. El barbero podrá
                  completar su información después.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmitCreate)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" placeholder="Marco" {...register("firstName")} />
                    {errors.firstName && <p className="text-sm text-error">{errors.firstName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nickname">Apodo</Label>
                    <Input id="nickname" placeholder="The King" {...register("lastName")} />
                    {errors.lastName && <p className="text-sm text-error">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="marco@barberking.com" {...register("email")} />
                  {errors.email && <p className="text-sm text-error">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña Temporal</Label>
                  <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
                  {errors.password && <p className="text-sm text-error">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono (Opcional)</Label>
                  <Input id="phone" placeholder="+34 912 345 678" {...register("phone")} />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim" disabled={createMutation.isPending}>
                    {createMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creando...</> : "Crear Barbero"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editBarber} onOpenChange={(open) => !open && setEditBarber(null)}>
          <DialogContent className="bg-white border-2 border-outline-variant shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Editar Barbero</DialogTitle>
              <DialogDescription>
                Modifica la información básica del barbero. El barbero podrá completar el resto de su perfil desde su cuenta.
              </DialogDescription>
            </DialogHeader>
            {editBarber && (
              <form onSubmit={editForm.handleSubmit(onSubmitEdit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nombre</Label>
                    <Input id="edit-name" placeholder="Marco" {...editForm.register("name")} />
                    {editForm.formState.errors.name && <p className="text-sm text-error">{editForm.formState.errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-nickname">Apodo</Label>
                    <Input id="edit-nickname" placeholder="The King" {...editForm.register("nickname")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Teléfono (Opcional)</Label>
                  <Input id="edit-phone" placeholder="+34 912 345 678" {...editForm.register("phone")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-status">Estado</Label>
                  <select
                    id="edit-status"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    defaultValue={editBarber.isActive ? "true" : "false"}
                    onChange={(e) => editForm.setValue("isActive", e.target.value === "true")}
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setEditBarber(null)}>Cancelar</Button>
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
              <Users className="h-5 w-5" />
              Lista de Barberos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
              </div>
            ) : barbers && barbers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Barbero</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Experiencia</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barbers.map((barber: Barber) => (
                    <TableRow key={barber.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={barber.avatar} />
                            <AvatarFallback>{barber.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {barber.name} {barber.nickname && `'${barber.nickname}'`}
                            </p>
                            <p className="text-sm text-on-surface-variant">
                              {barber.user?.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{barber.role}</TableCell>
                      <TableCell>{barber.experience} años</TableCell>
                      <TableCell>
                        <Badge
                          variant={barber.isActive ? "default" : "secondary"}
                          className={barber.isActive ? "bg-tertiary-fixed-dim text-on-tertiary-fixed" : ""}
                        >
                          {barber.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditBarber(barber)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center text-on-surface-variant">
                No hay barberos registrados
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
