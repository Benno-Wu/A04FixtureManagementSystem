import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto, UpdatePurchaseDto } from './entities/purchase.dto';
import { Paged } from 'src/utils';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post('paged')
  async paged(@Body() paged: Paged) {
    return await this.purchaseService.paged(paged)
  }

  @Post('request')
  async request(@Body() dto) {
    if (dto.state.length !== 1) {
      throw new Error('state-100')
    }
    return await this.purchaseService.request(dto, dto.token);
  }

  @Put('first')
  first(@Body() dto: UpdatePurchaseDto) {
    if (dto.state.length !== 2) {
      throw new Error('state-100')
    }
    return this.purchaseService.update(dto.id, dto);
  }

  @Put('final')
  final(@Body() dto: UpdatePurchaseDto) {
    if (dto.state.length !== 3) {
      throw new Error('state-100')
    }
    return this.purchaseService.update(dto.id, dto);
  }
}
