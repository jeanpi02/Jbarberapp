import { apiClient } from '@/lib/api-client';
import type { Barber } from '@/types';

export async function getBarbers(barbershopId?: string): Promise<Barber[]> {
  const params = barbershopId ? { barbershopId } : {};
  const { data } = await apiClient.get<Barber[]>('/barbers', { params });
  return data;
}

export async function getBarberById(id: string): Promise<Barber> {
  const { data } = await apiClient.get<Barber>(`/barbers/${id}`);
  return data;
}

export async function updateBarber(id: string, dto: Partial<Barber>): Promise<Barber> {
  const { data } = await apiClient.put<Barber>(`/barbers/${id}`, dto);
  return data;
}

export async function deleteBarber(id: string): Promise<void> {
  await apiClient.delete(`/barbers/${id}`);
}
