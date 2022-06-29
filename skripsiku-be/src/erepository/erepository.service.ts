import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Erepository } from './erepository.entity';

@Injectable()
export class ErepositoryService {
  constructor(
    @InjectRepository(Erepository)
    private eRepositoryRepository: Repository<Erepository>
  ) {}

  async create(eRepository): Promise<Erepository> {
    return await this.eRepositoryRepository.save(eRepository);
  }

  async getById(eRepositoryId: number): Promise<Erepository> {
    let eRepository = await this.eRepositoryRepository.findOne(eRepositoryId);

    if (!eRepository) {
      throw new NotFoundException('ERepository data not found');
    }

    return eRepository;
  }

  async update(eRepository): Promise<Erepository> {
    return await this.eRepositoryRepository.save(eRepository);
  }

  async delete(eRepositoryId: number) {
    return await this.eRepositoryRepository.delete(eRepositoryId);
  }

  async getAll(params) {
    let { page, limit, name, year, status, major_id, order = 'ASC' } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;
    const keyword = name || '';

    let upperCasedOrder = order.toUpperCase();

    if (upperCasedOrder === 'DESC') {
      upperCasedOrder = 'DESC';
    } else {
      upperCasedOrder = 'ASC';
    }

    let query = await this.eRepositoryRepository
      .createQueryBuilder('erepository')
      .leftJoinAndSelect('erepository.attachment', 'attachment')
      .leftJoinAndSelect('erepository.major', 'major')
      .where('erepository.name like :name', { name: '%' + keyword + '%' })
      .orderBy('erepository.created_at', upperCasedOrder)
      .take(take)
      .skip(skip);

    if (year) {
      query = query.andWhere('erepository.year = :year', { year });
    }

    if (status) {
      query = query.andWhere('erepository.status = :status', { status });
    }

    if (major_id) {
      query = query.andWhere('major.id = :major_id', { major_id });
    }

    return await query.getManyAndCount();
  }

  async findOneByName(name) {
    return await this.eRepositoryRepository.findOne({
      where: {
        name,
      },
    });
  }
}
