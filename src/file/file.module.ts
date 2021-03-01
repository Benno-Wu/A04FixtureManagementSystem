import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { picsPath } from 'src/utils';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: picsPath,
    })
  })],
  controllers: [FileController],
})
export class FileModule { }
