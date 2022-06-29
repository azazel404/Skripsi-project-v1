import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Major } from './major.entity';
import { FindMajorDTO, MajorDTO } from './dto/major.dto';
import { Exception } from 'src/base/base.exception';

@Injectable()
export class MajorService {
  constructor(
    @InjectRepository(Major)
    private majorRepository: Repository<Major>
  ) {}

  async getMajors(params) {
    const { page, limit, search } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;
    const keyword = search || '';

    let query = this.majorRepository
      .createQueryBuilder('major')
      .where('major.name like :keyword', { keyword: '%' + keyword + '%' })
      .take(take)
      .skip(skip);

    return await query.getManyAndCount();
  }

  async findAll(): Promise<Major[]> {
    return this.majorRepository.find();
  }

  async findOne(major: FindMajorDTO): Promise<Major> {
    return this.majorRepository.findOne({
      where: major,
    });
  }

  async findById(id: number): Promise<Major> {
    let major = await this.majorRepository.findOne(id);

    if (!major) {
      throw new NotFoundException('Major data not found');
    }

    return major;
  }

  async findByIdWithExceptionMessage(id: number, exceptionMessage: string): Promise<Major> {
    let major = await this.majorRepository.findOne(id);

    if (!major) {
      throw new Exception(exceptionMessage);
    }

    return major;
  }

  async create(major: Major): Promise<Major> {
    return await this.majorRepository.save(major);
  }

  async update(major: Major): Promise<Major> {
    return await this.majorRepository.save(major);
  }

  async destroy(id: number) {
    return await this.majorRepository.delete({ id });
  }
}
