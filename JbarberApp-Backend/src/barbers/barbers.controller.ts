import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BarbersService } from './barbers.service';
import { CreateBarberDto, UpdateBarberDto } from './dto/barber.dto';
import { CreateScheduleDto, UpdateScheduleDto } from './dto/schedule.dto';

@ApiTags('barbers')
@Controller('barbers')
export class BarbersController {
  constructor(private readonly barbersService: BarbersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active barbers' })
  @ApiResponse({ status: 200, description: 'List of barbers' })
  findAll(@Query('barbershopId') barbershopId?: string) {
    return this.barbersService.findAll(barbershopId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get barber by ID' })
  @ApiResponse({ status: 200, description: 'Barber details' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.barbersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new barber' })
  @ApiResponse({ status: 201, description: 'Barber created' })
  create(@Body() createBarberDto: CreateBarberDto) {
    return this.barbersService.create(createBarberDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update barber' })
  @ApiResponse({ status: 200, description: 'Barber updated' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBarberDto: UpdateBarberDto,
  ) {
    return this.barbersService.update(id, updateBarberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete barber (soft delete)' })
  @ApiResponse({ status: 200, description: 'Barber deleted' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.barbersService.remove(id);
  }

  @Get(':id/schedules')
  @ApiOperation({ summary: 'Get barber schedules' })
  getSchedules(@Param('id', ParseUUIDPipe) id: string) {
    return this.barbersService.getSchedules(id);
  }

  @Post(':id/schedules')
  @ApiOperation({ summary: 'Create schedule for barber' })
  createSchedule(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createScheduleDto: CreateScheduleDto,
  ) {
    return this.barbersService.createSchedule(id, createScheduleDto);
  }

  @Put(':id/schedules/:scheduleId')
  @ApiOperation({ summary: 'Update barber schedule' })
  updateSchedule(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('scheduleId', ParseUUIDPipe) scheduleId: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.barbersService.updateSchedule(id, scheduleId, updateScheduleDto);
  }

  @Delete(':id/schedules/:scheduleId')
  @ApiOperation({ summary: 'Delete barber schedule' })
  removeSchedule(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('scheduleId', ParseUUIDPipe) scheduleId: string,
  ) {
    return this.barbersService.removeSchedule(id, scheduleId);
  }

  @Get(':id/availability')
  @ApiOperation({ summary: 'Get barber availability for a date' })
  getAvailability(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('date') date: string,
  ) {
    return this.barbersService.getAvailability(id, date);
  }
}
