import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { Scheduling } from './entities/scheduling.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Scheduling])],
  controllers: [SchedulingController],
  providers: [SchedulingService]
})
export class SchedulingModule { }
