import { Controller, Get, Param, Res } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { join } from 'path';
import { Observable, of } from 'rxjs';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get(':attachmentId/images')
  getAttachmentById(@Param('attachmentId') attachmentId, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), 'uploads/images/' + attachmentId)));
  }
  @Get(':attachmentId/document')
  getAttachmentDocumentById(@Param('attachmentId') attachmentId, @Res() res): Observable<Object> {
      
    return of(res.sendFile(join(process.cwd(), 'uploads/documents/' + attachmentId)));
  }
}
