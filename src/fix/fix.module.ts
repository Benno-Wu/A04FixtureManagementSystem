import { Module } from '@nestjs/common';
import { FixService } from './fix.service';
import { FixController } from './fix.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fix } from './entities/fix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fix])],
  controllers: [FixController],
  providers: [FixService]
})
export class FixModule { }
