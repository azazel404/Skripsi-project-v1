import { Controller, Post, Req } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { uploadFile } from './../../helpers/uploadFile-helper';
import { Exception } from 'src/base/base.exception';

const imagesMimeRegex = new RegExp('image/(.*)');

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('images')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: uploadFile.customFileName,
        destination: uploadFile.imagesFilePath,
      }),
    })
  )
  uploadImage(@UploadedFile() file, @Req() req) {
    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/images/`;

    if (imagesMimeRegex.test(file.mimetype)) {
      return {
        file_name: file.filename,
        file_path: attachmentPath + file.filename,
      };
    } else {
      throw new Exception('Uploaded attachment is not an Image');
    }
  }

  @Post('documents')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: uploadFile.customFileName,
        destination: uploadFile.documentsFilePath,
      }),
    })
  )
  uploadDocument(@UploadedFile() file, @Req() req) {
    let documentMimeType = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
    ];

    if (documentMimeType.includes(file.mimetype)) {
      let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/documents/`;

      return {
        file_name: file.filename,
        file_path: attachmentPath + file.filename,
      };
    } else {
      throw new Exception('Uploaded attachment is not a valid Document/ PDF File');
    }
  }
}
