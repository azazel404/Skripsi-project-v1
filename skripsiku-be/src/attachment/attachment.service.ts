import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './attachment.entity';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
    private readonly uploadService: UploadService
  ) {}

  async create(newAttachment) {
    return await this.attachmentRepository.save(newAttachment);
  }

  async findOne(attachmentId) {
    return await this.attachmentRepository.findOne(attachmentId);
  }

  async delete(attachmentId: number) {
    return await this.attachmentRepository.delete(attachmentId);
  }
}
