import { Module } from '@nestjs/common';
import { FixService } from './fix.service';
import { FixController } from './fix.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fix } from './entities/fix.entity';
import { User } from 'src/user/entities/user.entity';
import { Fixture } from 'src/fixture/entities/fixture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fix, User, Fixture])],
  controllers: [FixController],
  providers: [FixService]
})
export class FixModule { }
