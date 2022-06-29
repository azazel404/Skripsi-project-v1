import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception } from 'src/base/base.exception';
import { Repository } from 'typeorm';
import { Upload } from './upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>
  ) {}

  async create(body): Promise<Upload> {
    return await this.uploadRepository.save(body);
  }

  async findOne(temporaryAttachmentId: number) {
    let temporaryAttachment = await this.uploadRepository.findOne(temporaryAttachmentId);

    if (!temporaryAttachment) {
      throw new Exception(`Data is not valid`);
    }

    return temporaryAttachment;
  }

  async findOneWithException(temporaryAttachmentId: number, attachmentType: string) {
    let temporaryAttachment = await this.uploadRepository.findOne(temporaryAttachmentId);

    if (!temporaryAttachment) {
      throw new Exception(`${attachmentType} ID is not valid`);
    }

    return temporaryAttachment;
  }

  async delete(temporaryAttachmentId: number) {
    return await this.uploadRepository.delete(temporaryAttachmentId);
  }
}
