import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception } from 'src/base/base.exception';
import { LecturerService } from 'src/lecturer/lecturer.service';
import { Repository } from 'typeorm';
import { UserApprover } from './user-approver.entity';

@Injectable()
export class UserApproverService {
  constructor(
    @InjectRepository(UserApprover)
    private userApproverRepository: Repository<UserApprover>,
    private lecturerService: LecturerService
  ) {}

  async bulkCreate(params) {
    const { user, approver_ids, level } = params;

    let result = await Promise.all(
      approver_ids.map(async (x) => {
        let approver = await this.lecturerService.findById(x);
        return {
          user,
          approver,
          level,
        };
      })
    );

    let query = await this.userApproverRepository
      .createQueryBuilder('userApprover')
      .insert()
      .into(UserApprover)
      .values(result)
      .execute();

    return query;
  }

  async findOne(params) {
    const { user, approver } = params;

    return await this.userApproverRepository.findOne({
      user,
      approver,
    });
  }

  async findById(userApproverId: number) {
    let userApprover = await this.userApproverRepository.findOne(userApproverId);

    if (!userApprover) {
      throw new Exception('userApproverId is not valid');
    }

    return userApprover;
  }

  async create(params) {
    return await this.userApproverRepository.save(params);
  }

  async delete(userApproverId) {
    return await this.userApproverRepository.delete(userApproverId);
  }

  async getUserApproverByUserId(userId: number) {
    let userApprovers = await this.userApproverRepository.find({
      where: {
        user: userId,
      },
    });

    return userApprovers;
  }
}
