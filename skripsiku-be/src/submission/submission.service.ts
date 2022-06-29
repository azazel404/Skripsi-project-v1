import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './submission.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>
  ) {}

  async create(body) {
    return await this.submissionRepository.save(body);
  }

  async update(body) {
    return await this.submissionRepository.save(body);
  }

  async getById(submissionId) {
    let submission = await this.submissionRepository.findOne(submissionId);

    if (!submission) {
      throw new NotFoundException('Submission ID is not valid');
    }

    return submission;
  }

  async getSubmissions(params) {
    const { page, limit, registration_number, first_name } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    let query = await this.submissionRepository
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.user', 'user')
      .take(take)
      .skip(skip);

    if (registration_number) {
      query = query.andWhere('user.registration_number like :registration_number', {
        registration_number: '%' + registration_number + '%',
      });
    }

    if (first_name) {
      query = query.andWhere('user.first_name like :first_name', {
        first_name: '%' + first_name + '%',
      });
    }

    return await query.getManyAndCount();
  }

  async getSubmissionsByUserId(params) {
    const { page, limit, userId } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    if (page && limit) {
      return await this.submissionRepository
        .createQueryBuilder('submission')
        .leftJoinAndSelect('submission.user', 'user')
        .leftJoinAndSelect('user.profile_picture', 'profile_picture')
        .where('user.id = :userId', { userId })
        .take(take)
        .skip(skip)
        .getManyAndCount();
    } else {
      return await this.submissionRepository.findAndCount({
        where: {
          user: userId,
        },
      });
    }
  }
}
