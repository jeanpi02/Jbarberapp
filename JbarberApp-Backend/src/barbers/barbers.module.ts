import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarbersService } from './barbers.service';
import { BarbersController } from './barbers.controller';
import { Barber } from './barber.entity';
import { BarberSchedule } from './barber-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barber, BarberSchedule])],
  controllers: [BarbersController],
  providers: [BarbersService],
  exports: [BarbersService],
})
export class BarbersModule {}
