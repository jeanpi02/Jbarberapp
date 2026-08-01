import { IsString, IsEmail, MinLength, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'barber@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'barber@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Marco' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'The King' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: '+34 912 345 678' })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class CreateBarberUserDto {
  @ApiProperty({ example: 'barber@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Marco' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'The King' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: '+34 912 345 678' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsUUID()
  barbershopId: string;
}
