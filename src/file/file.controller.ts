import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { getUuid } from 'src/utils';
import { picsPath } from 'src/utils';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file) {
    const uuid = getUuid()
    return { url: `${picsPath}/${uuid + file.mimetype.split('/')[1]}` }
  }
}
