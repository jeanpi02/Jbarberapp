import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { BarberSchedule } from './barber-schedule.entity';
import { Booking } from '../bookings/booking.entity';
import { Barbershop } from '../barbershops/barbershop.entity';

@Entity('barbers')
export class Barber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  nickname: string;

  @Column()
  role: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => User, (user) => user.barber)
  @JoinColumn()
  user: User;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @ManyToOne(() => Barbershop, (barbershop) => barbershop.barbers, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'barbershop_id' })
  barbershop: Barbershop;

  @Column({ name: 'barbershop_id', nullable: true })
  barbershopId: string;

  @OneToMany(() => BarberSchedule, (schedule) => schedule.barber, {
    cascade: true,
  })
  schedules: BarberSchedule[];

  @OneToMany(() => Booking, (booking) => booking.barber)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
