import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { CreateSchedulingDto, UpdateSchedulingDto } from './entities/scheduling.dto';
import { Paged } from 'src/utils';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) { }

  @Post('paged')
  async paged(@Body() paged: Paged) {
    return await this.schedulingService.paged(paged)
  }

  @Post('add')
  async add(@Body() dto: CreateSchedulingDto) {
    return this.schedulingService.add(dto, (<any>dto).token);
  }
}
