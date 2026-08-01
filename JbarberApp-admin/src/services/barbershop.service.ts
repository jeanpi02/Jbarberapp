import { apiClient } from '@/lib/api-client';
import type { Barbershop } from '@/types';

export interface CreateBarbershopWithAdminDto {
  name: string;
  address?: string;
  phone?: string;
  adminEmail: string;
  adminPassword: string;
  adminFirstName: string;
  adminLastName: string;
}

export async function getBarbershops(): Promise<Barbershop[]> {
  const { data } = await apiClient.get<Barbershop[]>('/barbershops');
  return data;
}

export async function getBarbershopById(id: string): Promise<Barbershop> {
  const { data } = await apiClient.get<Barbershop>(`/barbershops/${id}`);
  return data;
}

export async function createBarbershop(dto: CreateBarbershopWithAdminDto): Promise<Barbershop> {
  const { data } = await apiClient.post<Barbershop>('/barbershops', dto);
  return data;
}

export async function updateBarbershop(id: string, dto: Partial<Barbershop>): Promise<Barbershop> {
  const { data } = await apiClient.put<Barbershop>(`/barbershops/${id}`, dto);
  return data;
}

export async function deleteBarbershop(id: string): Promise<void> {
  await apiClient.delete(`/barbershops/${id}`);
}
