import { Module } from '@nestjs/common';
import { UselessService } from './useless.service';
import { UselessController } from './useless.controller';
import { Useless } from './entities/useless.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Fixture } from 'src/fixture/entities/fixture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Useless, User, Fixture]),],
  controllers: [UselessController],
  providers: [UselessService]
})
export class UselessModule { }
