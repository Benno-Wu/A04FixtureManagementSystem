import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { getUuid, picsPath } from 'src/utils';

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: '.' + picsPath,
      filename: (request, file, callback) => {
        const uuid = getUuid()
        callback(null, `${uuid}.${file.mimetype.split('/')[1]}`)
      }
    })
  })],
  controllers: [FileController],
})
export class FileModule { }
