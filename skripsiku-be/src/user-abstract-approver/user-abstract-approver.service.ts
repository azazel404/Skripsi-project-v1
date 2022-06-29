import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAbstractApprover } from './user-abstract-approver.entity';

@Injectable()
export class UserAbstractApproverService {
  constructor(
    @InjectRepository(UserAbstractApprover)
    private userAbstractApproverRepository: Repository<UserAbstractApprover>
  ) {}

  async create(body) {
    return await this.userAbstractApproverRepository.save(body);
  }

  async getById(id) {
    let userAbstractApprover = await this.userAbstractApproverRepository.findOne(id);

    if (!userAbstractApprover) {
      throw new NotFoundException('User Abstract Approver data not found');
    }

    return userAbstractApprover;
  }

  async delete(id) {
    return await this.userAbstractApproverRepository.delete(id);
  }

  async getAllAbstractApproversByUser(user) {
    let abstractApprovers = await this.userAbstractApproverRepository.find({
      where: {
        user,
      },
    });

    return abstractApprovers;
  }

  async getAll() {
    return await this.userAbstractApproverRepository.find();
  }
}
