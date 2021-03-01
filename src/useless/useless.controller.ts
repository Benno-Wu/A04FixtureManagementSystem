import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UselessService } from './useless.service';
import { CreateUselessDto, UpdateUselessDto } from './entities/useless.dto';
import { Paged } from 'src/utils';

@Controller('useless')
export class UselessController {
  constructor(private readonly uselessService: UselessService) { }

  @Post('paged')
  async paged(@Body() paged: Paged) {
    return await this.uselessService.paged(paged)
  }

  @Post('request')
  async request(@Body() dto) {
    if (dto.state.length != 1) {
      throw new Error('state-100');
    }
    return await this.uselessService.request(dto, dto.token);
  }

  @Put('first')
  first(@Body() dto: UpdateUselessDto) {
    if (dto.state.length !== 2) {
      throw new Error('state-100')
    }
    return this.uselessService.update(dto.id, dto);
  }

  @Put('final')
  final(@Body() dto: UpdateUselessDto) {
    if (dto.state.length !== 3) {
      throw new Error('state-100')
    }
    return this.uselessService.update(dto.id, dto);
  }
}
