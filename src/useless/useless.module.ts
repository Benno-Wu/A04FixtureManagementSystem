import { Module } from '@nestjs/common';
import { UselessService } from './useless.service';
import { UselessController } from './useless.controller';
import { Useless } from './entities/useless.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Useless])],
  controllers: [UselessController],
  providers: [UselessService]
})
export class UselessModule { }
