import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionPeriod } from './submission-period.entity';

@Injectable()
export class SubmissionPeriodService {
  constructor(
    @InjectRepository(SubmissionPeriod)
    private submissionPeriodRepository: Repository<SubmissionPeriod>
  ) {}

  async createSubmissionPeriod(submissionPeriod: SubmissionPeriod) {
    return await this.submissionPeriodRepository.save(submissionPeriod);
  }

  async update(submissionPeriod: SubmissionPeriod) {
    return await this.submissionPeriodRepository.save(submissionPeriod);
  }

  async findById(submissionPeriodId: number) {
    let submissionPeriod = await this.submissionPeriodRepository.findOne(submissionPeriodId);

    if (!submissionPeriod) {
      throw new NotFoundException('Submission Period data not found');
    }

    return submissionPeriod;
  }

  async delete(submissionPeriodId: number) {
    return await this.submissionPeriodRepository.delete(submissionPeriodId);
  }

  async getAll(params) {
    const { page, limit, major_id, startDate, endDate, classOf, status } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    let query = await this.submissionPeriodRepository
      .createQueryBuilder('submissionPeriod')
      .leftJoinAndSelect('submissionPeriod.major', 'major')
      .take(take)
      .skip(skip);

    if (major_id) {
      query = query.andWhere('submissionPeriod.major = :major_id', { major_id });
    }

    if (startDate) {
      query = query.andWhere('submissionPeriod.start_date >= :startDate', {
        startDate: `${startDate} 00:00:00`,
      });
    }

    if (endDate) {
      query = query.andWhere('submissionPeriod.end_date <= :endDate', {
        endDate: `${endDate} 23:59:59`,
      });
    }

    if (classOf) {
      query = query.andWhere('submissionPeriod.class_of like :classOf', {
        classOf: '%' + classOf + '%',
      });
    }

    if (status) {
      query = query.andWhere('submissionPeriod.status = :status', { status });
    }

    return await query.getManyAndCount();
  }
}
