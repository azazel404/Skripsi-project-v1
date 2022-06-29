import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionAttachmentApprover } from './submission-attachment-approver.entity';

@Injectable()
export class SubmissionAttachmentApproverService {
  constructor(
    @InjectRepository(SubmissionAttachmentApprover)
    private submissionAttachmentApproverRepository: Repository<SubmissionAttachmentApprover>
  ) {}

  async create(params) {
    return await this.submissionAttachmentApproverRepository.save(params);
  }
}
