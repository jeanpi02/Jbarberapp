import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barber } from './barber.entity';
import { BarberSchedule, DayOfWeek } from './barber-schedule.entity';
import { CreateBarberDto, UpdateBarberDto } from './dto/barber.dto';

@Injectable()
export class BarbersService {
  constructor(
    @InjectRepository(Barber)
    private barberRepository: Repository<Barber>,
    @InjectRepository(BarberSchedule)
    private scheduleRepository: Repository<BarberSchedule>,
  ) {}

  async findAll(barbershopId?: string): Promise<Barber[]> {
    const where: any = { isActive: true };
    if (barbershopId) {
      where.barbershopId = barbershopId;
    }
    return this.barberRepository.find({
      where,
      relations: { schedules: true, user: true },
    });
  }

  async findOne(id: string): Promise<Barber> {
    const barber = await this.barberRepository.findOne({
      where: { id, isActive: true },
      relations: { schedules: true, user: true },
    });

    if (!barber) {
      throw new NotFoundException(`Barber with ID ${id} not found`);
    }

    return barber;
  }

  async create(createBarberDto: CreateBarberDto): Promise<Barber> {
    const barber = this.barberRepository.create(createBarberDto);
    return this.barberRepository.save(barber);
  }

  async update(id: string, updateBarberDto: UpdateBarberDto): Promise<Barber> {
    const barber = await this.findOne(id);
    Object.assign(barber, updateBarberDto);
    return this.barberRepository.save(barber);
  }

  async remove(id: string): Promise<void> {
    const barber = await this.findOne(id);
    barber.isActive = false;
    await this.barberRepository.save(barber);
  }

  async getSchedules(barberId: string): Promise<BarberSchedule[]> {
    await this.findOne(barberId);
    return this.scheduleRepository.find({
      where: { barberId, isActive: true },
    });
  }

  async createSchedule(
    barberId: string,
    createScheduleDto: CreateScheduleDto,
  ): Promise<BarberSchedule> {
    await this.findOne(barberId);
    const schedule = this.scheduleRepository.create({
      ...createScheduleDto,
      barberId,
    });
    return this.scheduleRepository.save(schedule);
  }

  async updateSchedule(
    barberId: string,
    scheduleId: string,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<BarberSchedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId, barberId },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${scheduleId} not found`);
    }

    Object.assign(schedule, updateScheduleDto);
    return this.scheduleRepository.save(schedule);
  }

  async removeSchedule(barberId: string, scheduleId: string): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId, barberId },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${scheduleId} not found`);
    }

    schedule.isActive = false;
    await this.scheduleRepository.save(schedule);
  }

  async getAvailability(
    barberId: string,
    date: string,
  ): Promise<{ time: string; available: boolean }[]> {
    const barber = await this.findOne(barberId);
    const dateObj = new Date(date);
    const dayOfWeek = this.getDayOfWeek(dateObj);

    const schedule = barber.schedules.find(
      (s) => s.dayOfWeek === dayOfWeek && s.isActive,
    );

    if (!schedule) {
      return [];
    }

    const slots = this.generateTimeSlots(schedule.startTime, schedule.endTime, 30);
    return slots.map((time) => ({ time, available: true }));
  }

  private getDayOfWeek(date: Date): DayOfWeek {
    const days = [
      DayOfWeek.SUNDAY, DayOfWeek.MONDAY, DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY,
      DayOfWeek.SATURDAY,
    ];
    return days[date.getDay()];
  }

  private generateTimeSlots(
    startTime: string,
    endTime: string,
    intervalMinutes: number,
  ): string[] {
    const slots: string[] = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    let current = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    while (current < end) {
      const hour = Math.floor(current / 60);
      const minute = current % 60;
      slots.push(
        `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      );
      current += intervalMinutes;
    }

    return slots;
  }
}

interface CreateScheduleDto {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isActive?: boolean;
}

interface UpdateScheduleDto {
  dayOfWeek?: DayOfWeek;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
}
