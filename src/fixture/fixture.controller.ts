import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { CreateFixtureDto, SearchFixtureDto, UpdateFixtureDto } from './entities/fixture.dto';
import { Paged } from 'src/utils';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('fixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) { }

  @Get('exist/:fixture')
  async exist(@Param('fixture') fixture: string) {
    return await this.fixtureService.isExist(fixture)
  }

  @Post('paged')
  async paged(@Body() paged: Paged) {
    return await this.fixtureService.paged(paged)
  }

  @Post('update')
  async update(@Body() dto: UpdateFixtureDto) {
    return await this.fixtureService.update(dto.id, dto)
  }

  @Post('search')
  async search(@Body() dto: SearchFixtureDto) {
    return await this.fixtureService.search(dto)
  }
}
