import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AbstractSubmission } from './abstract-submission.entity';

@Injectable()
export class AbstractSubmissionService {
  constructor(
    @InjectRepository(AbstractSubmission)
    private abstractSubmissionRepository: Repository<AbstractSubmission>,
    private readonly userService: UserService
  ) {}

  async create(body) {
    return await this.abstractSubmissionRepository.save(body);
  }

  async update(body) {
    return await this.abstractSubmissionRepository.save(body);
  }

  async getAll(params) {
    const {
      page,
      limit,
      submission_period_id,
      user_id,
      major_id,
      name,
      registration_number,
      transaction_date,
    } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    let query = await this.abstractSubmissionRepository
      .createQueryBuilder('abstractSubmission')
      .leftJoinAndSelect('abstractSubmission.submission_period', 'submission_period')
      .leftJoinAndSelect('abstractSubmission.user', 'user')
      .leftJoinAndSelect('abstractSubmission.attachment', 'attachment')
      .take(take)
      .skip(skip);

    if (submission_period_id) {
      query = query.andWhere('submission_period.id = :submission_period_id', {
        submission_period_id,
      });
    }

    if (user_id) {
      query = query.andWhere('user.id = :user_id', { user_id });
    }

    if (name) {
      query = query.andWhere('user.first_name like :name', { name: '%' + name + '%' });
    }

    if (major_id) {
      query = query.andWhere('submission_period.major.id = :major_id', { major_id });
    }

    if (registration_number) {
      query = query.andWhere('user.registration_number = :registration_number', {
        registration_number,
      });
    }

    if (transaction_date) {
      query = query.andWhere(
        'abstractSubmission.created_at >= :startDate AND abstractSubmission.created_at <= :endDate',
        {
          startDate: `${transaction_date} 00:00:00`,
          endDate: `${transaction_date} 23:59:59`,
        }
      );
    }

    return await query.getManyAndCount();
  }

  async delete(abtractSubmission) {
    return await this.abstractSubmissionRepository.remove(abtractSubmission);
  }

  async findById(abstractSubmissionId: number): Promise<AbstractSubmission> {
    let abstractSubmission = await this.abstractSubmissionRepository.findOne(abstractSubmissionId);

    if (!abstractSubmission) {
      throw new NotFoundException('Abstract submission ID is not valid');
    }

    return abstractSubmission;
  }

  async getSubmissionRate(params) {
    const { majorId, submissionPeriodId } = params;

    let query = await this.abstractSubmissionRepository
      .createQueryBuilder('abstractSubmission')
      .select('abstractSubmission.user_id')
      .distinct(true)
      .leftJoinAndSelect('abstractSubmission.submission_period', 'submissionPeriod')
      .where('submissionPeriod.major.id = :majorId', { majorId });

    if (submissionPeriodId) {
      query = query.andWhere('submissionPeriod.id = :submissionPeriodId', { submissionPeriodId });
    }

    let count = await query.getRawMany();

    let student_count = await this.userService.getUserCountByMajorId(majorId);

    let rate = (count.length / student_count) * 100;

    return Number.isNaN(rate) ? '0.00' : rate.toFixed(2);
  }
}
