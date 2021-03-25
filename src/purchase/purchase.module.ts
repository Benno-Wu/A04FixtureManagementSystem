import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, User, Fixture])],
  controllers: [PurchaseController],
  providers: [PurchaseService]
})
export class PurchaseModule { }
