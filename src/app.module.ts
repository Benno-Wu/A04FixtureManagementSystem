import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UselessModule } from './useless/useless.module';
import { UserModule } from './user/user.module';
import { FixModule } from './fix/fix.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { PurchaseModule } from './purchase/purchase.module';
import { FixtureModule } from './fixture/fixture.module';
import { RedisModule } from 'nestjs-redis'
import { FileModule } from './file/file.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './onion/auth.guard';

@Module({
  // other modules, like one Entity with its service & controller
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'a04',
    // entities: ["dist/**/*.entity{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
    logging: 'all',
  }), RedisModule.register({
    url: `redis://123456@127.0.0.1:6379`
  }),
    UselessModule, UserModule, FixModule, SchedulingModule, PurchaseModule, FixtureModule, FileModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
