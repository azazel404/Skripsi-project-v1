import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './attachment.entity';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment]), UploadModule],
  providers: [AttachmentService],
  controllers: [AttachmentController],
  exports: [TypeOrmModule, AttachmentService],
})
export class AttachmentModule {}
