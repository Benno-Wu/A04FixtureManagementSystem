import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { getUuid } from 'src/utils';
import { picsPath } from 'src/utils';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any
}

@ApiBearerAuth()
@Controller('file')
export class FileController {

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file) {
    return { url: `${picsPath}/${file.filename}` }
  }
}
