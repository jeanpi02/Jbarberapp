import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { BarbersService } from '../barbers/barbers.service';
import { ServicesService } from '../services/services.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private barbersService: BarbersService,
    private servicesService: ServicesService,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({
      relations: { barber: true, service: true },
      order: { bookingDate: 'DESC', startTime: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: { barber: true, service: true },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async findByBarber(barberId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { barberId },
      relations: { service: true },
      order: { bookingDate: 'DESC', startTime: 'DESC' },
    });
  }

  async findByDate(barberId: string, date: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        barberId,
        bookingDate: date,
        status: BookingStatus.CONFIRMED,
      },
      relations: { service: true },
    });
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { barberId, serviceId, bookingDate, startTime, endTime } =
      createBookingDto;

    await this.barbersService.findOne(barberId);
    const service = await this.servicesService.findOne(serviceId);

    const isAvailable = await this.checkAvailability(
      barberId,
      bookingDate,
      startTime,
      endTime,
    );

    if (!isAvailable) {
      throw new ConflictException(
        'This time slot is not available for the selected barber',
      );
    }

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      totalPrice: service.price,
      status: BookingStatus.CONFIRMED,
    });

    return this.bookingRepository.save(booking);
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id);
    Object.assign(booking, updateBookingDto);
    return this.bookingRepository.save(booking);
  }

  async cancel(id: string): Promise<Booking> {
    const booking = await this.findOne(id);

    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking is already cancelled');
    }

    booking.status = BookingStatus.CANCELLED;
    return this.bookingRepository.save(booking);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.bookingRepository.delete(id);
  }

  private async checkAvailability(
    barberId: string,
    date: string,
    startTime: string,
    endTime: string,
  ): Promise<boolean> {
    const existingBookings = await this.bookingRepository.find({
      where: {
        barberId,
        bookingDate: date,
        status: BookingStatus.CONFIRMED,
        startTime: Between(startTime, endTime),
      },
    });

    return existingBookings.length === 0;
  }
}
