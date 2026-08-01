import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Barbershop, BarbershopStatus } from './barbershop.entity';
import { User, UserRole } from '../users/user.entity';

export interface CreateBarbershopDto {
  name: string;
  address?: string;
  phone?: string;
  adminEmail: string;
  adminPassword: string;
  adminFirstName: string;
  adminLastName: string;
}

export interface UpdateBarbershopDto {
  name?: string;
  address?: string;
  phone?: string;
  status?: BarbershopStatus;
}

@Injectable()
export class BarbershopsService {
  constructor(
    @InjectRepository(Barbershop)
    private barbershopRepository: Repository<Barbershop>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Barbershop[]> {
    return this.barbershopRepository.find({
      relations: { users: true, barbers: true },
    });
  }

  async findOne(id: string): Promise<Barbershop> {
    const barbershop = await this.barbershopRepository.findOne({
      where: { id },
      relations: { users: true, barbers: true },
    });

    if (!barbershop) {
      throw new NotFoundException(`Barbershop with ID ${id} not found`);
    }

    return barbershop;
  }

  async create(dto: CreateBarbershopDto): Promise<Barbershop> {
    // Verificar que el email no esté en uso
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.adminEmail },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Crear la barbería
    const barbershop = this.barbershopRepository.create({
      name: dto.name,
      address: dto.address,
      phone: dto.phone,
    });

    const savedBarbershop = await this.barbershopRepository.save(barbershop);

    // Crear el usuario admin de la barbería
    const hashedPassword = await bcrypt.hash(dto.adminPassword, 10);

    const adminUser = this.userRepository.create({
      email: dto.adminEmail,
      password: hashedPassword,
      firstName: dto.adminFirstName,
      lastName: dto.adminLastName,
      role: UserRole.ADMIN,
      barbershopId: savedBarbershop.id,
    });

    await this.userRepository.save(adminUser);

    return savedBarbershop;
  }

  async update(id: string, dto: UpdateBarbershopDto): Promise<Barbershop> {
    const barbershop = await this.findOne(id);
    Object.assign(barbershop, dto);
    return this.barbershopRepository.save(barbershop);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.barbershopRepository.delete(id);
  }
}
