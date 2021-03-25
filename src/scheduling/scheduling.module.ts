import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { Scheduling } from './entities/scheduling.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Fixture } from 'src/fixture/entities/fixture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scheduling, User, Fixture])],
  controllers: [SchedulingController],
  providers: [SchedulingService]
})
export class SchedulingModule { }
