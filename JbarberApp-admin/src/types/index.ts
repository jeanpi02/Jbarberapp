export interface Barbershop {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  users?: User[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'admin' | 'barber';
  phone?: string;
  barbershopId?: string;
  barbershop?: Barbershop;
}

export interface Barber {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  experience: number;
  avatar?: string;
  bio?: string;
  isActive: boolean;
  user?: User;
  barbershopId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface CreateBarberUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  barbershopId: string;
}

export interface CreateBarbershopDto {
  name: string;
  address?: string;
  phone?: string;
}
