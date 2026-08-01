import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BarbershopsService } from './barbershops.service';
import type { CreateBarbershopDto, UpdateBarbershopDto } from './barbershops.service';
import { BarbershopStatus } from './barbershop.entity';

@ApiTags('barbershops')
@Controller('barbershops')
export class BarbershopsController {
  constructor(private readonly barbershopsService: BarbershopsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all barbershops' })
  findAll() {
    return this.barbershopsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get barbershop by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.barbershopsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new barbershop with admin user' })
  create(@Body() dto: CreateBarbershopDto) {
    return this.barbershopsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update barbershop' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBarbershopDto,
  ) {
    return this.barbershopsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete barbershop' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.barbershopsService.remove(id);
  }
}
