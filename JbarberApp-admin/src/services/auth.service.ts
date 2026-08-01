import { apiClient } from '@/lib/api-client';
import type { LoginCredentials, LoginResponse, User } from '@/types';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
  localStorage.setItem('token', data.access_token);
  return data;
}

export async function getProfile(): Promise<User> {
  const { data } = await apiClient.get<User>('/auth/profile');
  return data;
}

export async function createBarberUser(dto: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  barbershopId: string;
}): Promise<User> {
  const { data } = await apiClient.post<User>('/auth/barbers', dto);
  return data;
}

export function logout(): void {
  localStorage.removeItem('token');
  window.location.href = '/auth/login';
}
