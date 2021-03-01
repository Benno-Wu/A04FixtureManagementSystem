import { Module } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureController } from './fixture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fixture } from './entities/fixture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fixture])],
  controllers: [FixtureController],
  providers: [FixtureService]
})
export class FixtureModule { }
