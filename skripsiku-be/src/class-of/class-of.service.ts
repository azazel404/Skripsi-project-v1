import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassOf } from './class-of.entity';

@Injectable()
export class ClassOfService {
  constructor(
    @InjectRepository(ClassOf)
    private classOfRepository: Repository<ClassOf>
  ) {}

  async create(body) {
    return await this.classOfRepository.save(body);
  }

  async getAll(params) {
    const { page, limit } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    let query = await this.classOfRepository.createQueryBuilder('classOf').take(take).skip(skip);

    return await query.getManyAndCount();
  }

  async getById(classOfId) {
    let classOf = await this.classOfRepository.findOne(classOfId);

    if (!classOf) {
      throw new NotFoundException('Class Of not found');
    }

    return classOf;
  }

  async update(body) {
    return await this.classOfRepository.save(body);
  }

  async remove(classOfId: number) {
    return await this.classOfRepository.delete(classOfId);
  }
}
