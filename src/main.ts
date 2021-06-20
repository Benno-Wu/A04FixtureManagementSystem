import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { ExceptionFilter } from './onion/exception.filter';
import { ResponseInterceptor } from './onion/response.interceptor';
import { picsPath } from './utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // const app = await NestFactory.create<NestExpressApplication>(AppModule,
  //   { cors: true, })
  // const app = await NestFactory.create<NestExpressApplication>(AppModule,
  //   { cors: { origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', preflightContinue: false, optionsSuccessStatus: 204 }, })
  // const app = await NestFactory.create<NestExpressApplication>(AppModule,
  //   { cors: { origin: 'http://192.168.1.199:3000' } })
  app.useStaticAssets(`${picsPath.slice(1)}`, { prefix: `${picsPath}/` })
  app.useGlobalFilters(new ExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())

  const options = new DocumentBuilder()
    .setTitle('Nest-Server')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.enableCors()
  await app.listen(3001);
}
bootstrap();
