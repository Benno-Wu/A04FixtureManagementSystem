import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ExceptionFilter } from './onion/exception.filter';
import { ResponseInterceptor } from './onion/response.interceptor';
import { picsPath } from './utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: { origin: /localhost$/ } })
  app.useStaticAssets(join(__dirname, `..${picsPath}`))
  app.useGlobalFilters(new ExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(3000);
}
bootstrap();
