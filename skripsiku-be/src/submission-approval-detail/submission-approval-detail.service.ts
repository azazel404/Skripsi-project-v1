import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionApprovalDetail } from './submission-approval-detail.entity';

@Injectable()
export class SubmissionApprovalDetailService {
  constructor(
    @InjectRepository(SubmissionApprovalDetail)
    private submissionApprovalDetailRepository: Repository<SubmissionApprovalDetail>
  ) {}

  async create(body) {
    return await this.submissionApprovalDetailRepository.save(body);
  }

  async update(body) {
    return await this.submissionApprovalDetailRepository.save(body);
  }

  async getAll(params) {
    const { isActionTaken, submission_approval_id } = params;

    let query = await this.submissionApprovalDetailRepository
      .createQueryBuilder('submissionApprovalDetail')
      .leftJoinAndSelect('submissionApprovalDetail.lecturer', 'lecturer')
      .leftJoinAndSelect('lecturer.major', 'major')
      .leftJoinAndSelect('lecturer.profile_picture', 'profile_picture')
      .leftJoinAndSelect('submissionApprovalDetail.submission_approval', 'submission_approval');

    if (isActionTaken === 'true') {
      query = query.andWhere('submissionApprovalDetail.status != 0');
    } else if (isActionTaken === 'false') {
      query = query.andWhere('submissionApprovalDetail.status = 0');
    }

    if (submission_approval_id) {
      query = query.andWhere('submission_approval.id = :submission_approval_id', {
        submission_approval_id,
      });
    }

    return await query.getManyAndCount();
  }

  async findById(id: number) {
    let submissionApprovalDetail = await this.submissionApprovalDetailRepository.findOne(id);

    if (!submissionApprovalDetail) {
      throw new NotFoundException('Submission Approval Detail data not found');
    }

    return submissionApprovalDetail;
  }

  async findBySubmissionApproval(submissionApproval) {
    return await this.submissionApprovalDetailRepository.find({
      where: {
        submission_approval: submissionApproval,
      },
    });
  }

  async findNotTakenActionSubmissionApprovalDetailBySubmissionApproval(submissionApproval) {
    return await this.submissionApprovalDetailRepository.find({
      where: {
        submission_approval: submissionApproval,
        score_content: 0,
        score_content_delivery: 0,
        score_content_mastery: 0,
      },
    });
  }
}
