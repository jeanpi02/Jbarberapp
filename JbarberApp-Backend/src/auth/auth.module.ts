import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { Barber } from '../barbers/barber.entity';
import { jwtConfig } from '../config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Barber]),
    JwtModule.register({
      global: true,
      secret: jwtConfig().secret,
      signOptions: { expiresIn: '7d' as const },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
