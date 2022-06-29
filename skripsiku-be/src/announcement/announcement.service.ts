import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './announcement.entity';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>
  ) {}

  async create(body) {
    return await this.announcementRepository.save(body);
  }

  async update(body) {
    return await this.announcementRepository.save(body);
  }

  async findById(id: number) {
    let announcement = await this.announcementRepository.findOne(id);

    if (!announcement) {
      throw new NotFoundException('Announcement data not found');
    }

    return announcement;
  }

  async getAll(params) {
    const { page, limit } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    let query = await this.announcementRepository
      .createQueryBuilder('announcement')
      .leftJoinAndSelect('announcement.attachment', 'attachment')
      .take(take)
      .skip(skip);

    return await query.getManyAndCount();
  }

  async delete(id: number) {
    return await this.announcementRepository.delete(id);
  }
}
