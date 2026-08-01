import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './users/user.entity';
import { Barber } from './barbers/barber.entity';
import { BarberSchedule, DayOfWeek } from './barbers/barber-schedule.entity';
import { Service } from './services/service.entity';
import { Barbershop, BarbershopStatus } from './barbershops/barbershop.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  console.log('Starting database seed...');

  // Limpiar tablas en orden
  await dataSource.query('DELETE FROM bookings');
  await dataSource.query('DELETE FROM barber_schedules');
  await dataSource.query('DELETE FROM services');
  await dataSource.query('DELETE FROM barbers');
  await dataSource.query('DELETE FROM users');
  await dataSource.query('DELETE FROM barbershops');

  const userRepository = dataSource.getRepository(User);
  const barberRepository = dataSource.getRepository(Barber);
  const scheduleRepository = dataSource.getRepository(BarberSchedule);
  const serviceRepository = dataSource.getRepository(Service);
  const barbershopRepository = dataSource.getRepository(Barbershop);

  // Crear super admin (usuario del dueño de la plataforma)
  const superAdmin = userRepository.create({
    email: 'admin@jbarberapp.com',
    password: await bcrypt.hash('admin123', 10),
    firstName: 'Super',
    lastName: 'Admin',
    role: UserRole.SUPER_ADMIN,
  });
  await userRepository.save(superAdmin);

  // Crear barbería con su admin
  const barbershop = barbershopRepository.create({
    name: 'Barber King',
    address: 'Calle Real 123, Madrid',
    phone: '+34 912 345 678',
    status: BarbershopStatus.ACTIVE,
  });
  const savedBarbershop = await barbershopRepository.save(barbershop);

  // Crear admin de la barbería
  const adminUser = userRepository.create({
    email: 'admin@barberking.com',
    password: await bcrypt.hash('admin123', 10),
    firstName: 'Admin',
    lastName: 'BarberKing',
    role: UserRole.ADMIN,
    barbershopId: savedBarbershop.id,
  });
  await userRepository.save(adminUser);

  // Crear barbero 1: Marco
  const user1 = userRepository.create({
    email: 'marco@barberking.com',
    password: await bcrypt.hash('password123', 10),
    firstName: 'Marco',
    lastName: 'The King',
    phone: '+34 912 345 678',
    role: UserRole.BARBER,
    barbershopId: savedBarbershop.id,
  });
  await userRepository.save(user1);

  const barber1 = barberRepository.create({
    name: 'Marco',
    nickname: 'The King',
    role: 'Master Barber',
    rating: 5.0,
    reviewCount: 128,
    experience: 10,
    avatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop&crop=face',
    bio: 'Master barber with 10 years of experience.',
    userId: user1.id,
    barbershopId: savedBarbershop.id,
  });
  await barberRepository.save(barber1);

  const weekdays = [
    DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY,
  ];
  for (const day of weekdays) {
    await scheduleRepository.save(scheduleRepository.create({
      barberId: barber1.id,
      dayOfWeek: day,
      startTime: '10:00',
      endTime: '20:00',
      isActive: true,
    }));
  }

  // Crear barbero 2: Alex
  const user2 = userRepository.create({
    email: 'alex@barberking.com',
    password: await bcrypt.hash('password123', 10),
    firstName: 'Alex',
    lastName: 'Sharp',
    phone: '+34 912 345 679',
    role: UserRole.BARBER,
    barbershopId: savedBarbershop.id,
  });
  await userRepository.save(user2);

  const barber2 = barberRepository.create({
    name: 'Alex',
    nickname: 'Sharp',
    role: 'Stylist Expert',
    rating: 4.8,
    reviewCount: 95,
    experience: 5,
    avatar: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop&crop=face',
    bio: 'Creative stylist specializing in modern cuts.',
    userId: user2.id,
    barbershopId: savedBarbershop.id,
  });
  await barberRepository.save(barber2);

  const alexDays = [
    DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY, DayOfWeek.SATURDAY,
  ];
  for (const day of alexDays) {
    await scheduleRepository.save(scheduleRepository.create({
      barberId: barber2.id,
      dayOfWeek: day,
      startTime: '11:00',
      endTime: '19:00',
      isActive: true,
    }));
  }

  // Crear barbero 3: Sofia
  const user3 = userRepository.create({
    email: 'sofia@barberking.com',
    password: await bcrypt.hash('password123', 10),
    firstName: 'Sofia',
    lastName: 'Fade',
    phone: '+34 912 345 680',
    role: UserRole.BARBER,
    barbershopId: savedBarbershop.id,
  });
  await userRepository.save(user3);

  const barber3 = barberRepository.create({
    name: 'Sofia',
    nickname: 'Fade',
    role: 'Creative Cuts',
    rating: 4.9,
    reviewCount: 112,
    experience: 7,
    avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop&crop=face',
    bio: 'Expert in creative cuts and fade techniques.',
    userId: user3.id,
    barbershopId: savedBarbershop.id,
  });
  await barberRepository.save(barber3);

  const sofiaDays = [
    DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY, DayOfWeek.FRIDAY,
  ];
  for (const day of sofiaDays) {
    await scheduleRepository.save(scheduleRepository.create({
      barberId: barber3.id,
      dayOfWeek: day,
      startTime: '09:00',
      endTime: '18:00',
      isActive: true,
    }));
  }

  // Crear servicios
  const servicesData = [
    { name: 'Classic Haircut', description: 'Precision cut tailored to your face shape.', duration: 45, price: 25.00, isPopular: true },
    { name: 'Beard Trim & Shape', description: 'Meticulous shaping with straight razor.', duration: 30, price: 15.00 },
    { name: 'The Royal Treatment', description: 'Full haircut, beard sculpting, hot towel treatment.', duration: 75, price: 45.00, isPremium: true },
    { name: 'Hair Coloring', description: 'Full coverage or highlights with organic dyes.', duration: 60, price: 40.00 },
  ];
  for (const s of servicesData) {
    await serviceRepository.save(serviceRepository.create(s));
  }

  console.log('Database seed completed!');
  console.log('');
  console.log('SUPER ADMIN: admin@jbarberapp.com / admin123');
  console.log('BARBERSHOP ADMIN: admin@barberking.com / admin123');
  console.log('BARBERS:');
  console.log('  marco@barberking.com / password123');
  console.log('  alex@barberking.com / password123');
  console.log('  sofia@barberking.com / password123');

  await app.close();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
