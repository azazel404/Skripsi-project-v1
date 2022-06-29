import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractSubmissionApprovalStatus } from 'enums/AbstractSubmissionApproval.enum';
import { Repository } from 'typeorm';
import { AbstractSubmissionApprovalDetail } from './abstract-submission-approval-detail.entity';

@Injectable()
export class AbstractSubmissionApprovalDetailService {
  constructor(
    @InjectRepository(AbstractSubmissionApprovalDetail)
    private abstractSubmissionApprovalDetailRepository: Repository<AbstractSubmissionApprovalDetail>
  ) {}

  async create(body) {
    let isExist = await this.abstractSubmissionApprovalDetailRepository.findOne({
      lecturer: body.lecturer,
      abstract_submission_approval: body.abstract_submission_approval,
    });

    if (isExist) {
      throw new ForbiddenException(
        'Lecturer has already taken action on this Abstract Submission Approval'
      );
    }

    return await this.abstractSubmissionApprovalDetailRepository.save(body);
  }

  async getAll(params) {
    const { isActionTaken, abstractSubmissionApprovalId } = params;

    let query = await this.abstractSubmissionApprovalDetailRepository
      .createQueryBuilder('abstractSubmissionApprovalDetail')
      .leftJoinAndSelect('abstractSubmissionApprovalDetail.lecturer', 'lecturer')
      .leftJoinAndSelect('lecturer.major', 'major')
      .leftJoinAndSelect('lecturer.profile_picture', 'profile_picture')
      .leftJoinAndSelect(
        'abstractSubmissionApprovalDetail.abstract_submission_approval',
        'abstract_submission_approval'
      );

    if (abstractSubmissionApprovalId) {
      query = query.andWhere(
        'abstractSubmissionApprovalDetail.abstract_submission_approval = :abstractSubmissionApprovalId',
        {
          abstractSubmissionApprovalId,
        }
      );
    }

    if (isActionTaken === 'true') {
      query = query.andWhere('abstractSubmissionApprovalDetail.status != 0');
    } else if (isActionTaken === 'false') {
      query = query.andWhere('abstractSubmissionApprovalDetail.status = 0');
    }

    return await query.getMany();
  }

  async findOne(body) {
    return await this.abstractSubmissionApprovalDetailRepository.findOne(body);
  }

  async getByAbstractSubmissionApproval(abstractSubmissionApproval) {
    return await this.abstractSubmissionApprovalDetailRepository.find({
      where: {
        abstract_submission_approval: abstractSubmissionApproval,
      },
    });
  }

  async bulkCreate(body) {
    const { abstractApprovers, createdAbstractSubmissionApproval } = body;

    await Promise.all(
      abstractApprovers.map(async (abstractApprover) => {
        let newAbstractSubmissionApprovalDetail = new AbstractSubmissionApprovalDetail();
        newAbstractSubmissionApprovalDetail.status = AbstractSubmissionApprovalStatus.SUBMITTED;
        newAbstractSubmissionApprovalDetail.remarks = null;
        newAbstractSubmissionApprovalDetail.lecturer = abstractApprover.lecturer;
        newAbstractSubmissionApprovalDetail.abstract_submission_approval =
          createdAbstractSubmissionApproval;

        return await this.create(newAbstractSubmissionApprovalDetail);
      })
    );
  }

  async update(body) {
    return await this.abstractSubmissionApprovalDetailRepository.save(body);
  }
}
