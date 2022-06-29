import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractSubmissionApproval } from './abstract-submission-approval.entity';

@Injectable()
export class AbstractSubmissionApprovalService {
  constructor(
    @InjectRepository(AbstractSubmissionApproval)
    private abstractSubmissionApprovalRepository: Repository<AbstractSubmissionApproval>
  ) {}

  async create(body) {
    return await this.abstractSubmissionApprovalRepository.save(body);
  }

  async findById(abstractSubmissionApprovalId: number): Promise<AbstractSubmissionApproval> {
    let abstractSubmissionApproval = await this.abstractSubmissionApprovalRepository.findOne(
      abstractSubmissionApprovalId
    );

    if (!abstractSubmissionApproval) {
      throw new NotFoundException('Abstract Submission Approval ID is not valid');
    }

    return abstractSubmissionApproval;
  }

  async getAll(params) {
    const { abstractSubmissionId } = params;

    let query = await this.abstractSubmissionApprovalRepository
      .createQueryBuilder('abstractSubmissionApproval')
      .leftJoinAndSelect('abstractSubmissionApproval.abstract_submission', 'abstract_submission');

    if (abstractSubmissionId) {
      query = query.andWhere(
        'abstractSubmissionApproval.abstract_submission_id = :abstract_submission_id',
        {
          abstract_submission_id: abstractSubmissionId,
        }
      );
    }

    return await query.getMany();
  }

  async update(body) {
    return await this.abstractSubmissionApprovalRepository.save(body);
  }
}
