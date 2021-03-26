import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FixService } from './fix.service';
import { CreateFixDto, UpdateFixDto } from './entities/fix.dto'
import { Paged } from 'src/utils';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('fix')
export class FixController {
  constructor(private readonly fixService: FixService) { }

  @Post('paged')
  async paged(@Body() paged: Paged) {
    return await this.fixService.paged(paged)
  }

  @Post('request')
  async request(@Body() dto: CreateFixDto) {
    if (dto.state.length !== 1) {
      throw new Error('state-100')
    }
    return await this.fixService.request(dto, (<any>dto).token);
  }

  @Put('final')
  // bug?
  final(@Body() dto: UpdateFixDto) {
    if (dto.state.length !== 2) {
      throw new Error('state-100')
    }
    return this.fixService.update(dto.id, dto);
  }
}
