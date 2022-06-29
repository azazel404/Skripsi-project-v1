import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionApproval } from './submission-approval.entity';

@Injectable()
export class SubmissionApprovalService {
  constructor(
    @InjectRepository(SubmissionApproval)
    private submissionApprovalRepository: Repository<SubmissionApproval>
  ) {}

  async create(body) {
    return await this.submissionApprovalRepository.save(body);
  }

  async update(body) {
    return await this.submissionApprovalRepository.save(body);
  }

  async getAll(params) {
    const { page, limit, submission_attachment_id, status, stage } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    let query = await this.submissionApprovalRepository
      .createQueryBuilder('submissionApproval')
      .leftJoinAndSelect('submissionApproval.submission_attachment', 'submissionAttachment');

    if (page && limit) {
      query = query.take(take).skip(skip);
    }

    if (submission_attachment_id) {
      query = query.andWhere('submissionAttachment.id = :submission_attachment_id', {
        submission_attachment_id,
      });
    }

    if (status) {
      query = query.andWhere('submissionApproval.status = :status', { status });
    }

    if (stage) {
      query = query.andWhere('submissionApproval.stage = :stage', { stage });
    }

    return await query.getManyAndCount();
  }

  async getById(submissionApprovalId) {
    return await this.submissionApprovalRepository.findOne(submissionApprovalId);
  }
}
