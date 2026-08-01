import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Barber } from '../barbers/barber.entity';

export enum BarbershopStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity('barbershops')
export class Barbershop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  logo: string;

  @Column({
    type: 'enum',
    enum: BarbershopStatus,
    default: BarbershopStatus.ACTIVE,
  })
  status: BarbershopStatus;

  @OneToMany(() => User, (user) => user.barbershop)
  users: User[];

  @OneToMany(() => Barber, (barber) => barber.barbershop)
  barbers: Barber[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
