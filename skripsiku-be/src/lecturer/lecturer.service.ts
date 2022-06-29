import { Lecturer } from './lecturer.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindLecturerDTO } from './dto/lecturer.dto';
import { Role } from 'enums/Role.enum';

@Injectable()
export class LecturerService {
  constructor(
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>
  ) {}

  async getLectures(params) {
    const { page, limit, first_name, major_id, registration_number } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    let query = await this.lecturerRepository
      .createQueryBuilder('lecturer')
      .leftJoinAndSelect('lecturer.major', 'major')
      .take(take)
      .skip(skip);

    if (major_id) {
      query = query.andWhere('lecturer.major = :major_id', { major_id });
    }

    if (first_name) {
      query = query.andWhere('lecturer.first_name like :first_name', {
        first_name: '%' + first_name + '%',
      });
    }

    if (registration_number) {
      query = query.andWhere('lecturer.registration_number like :registration_number ', {
        registration_number: '%' + registration_number + '%',
      });
    }

    return await query.getManyAndCount();
  }

  async dataSourceLectures(): Promise<Lecturer[]> {
    return this.lecturerRepository.find();
  }

  async create(lecturer: Lecturer): Promise<Lecturer> {
    return await this.lecturerRepository.save(lecturer);
  }

  async update(lecturer): Promise<Lecturer> {
    return await this.lecturerRepository.save(lecturer);
  }

  async findOne(lecturer: FindLecturerDTO): Promise<Lecturer> {
    return this.lecturerRepository.findOne({
      where: lecturer,
    });
  }

  async findByIdWithExceptionMessage(id: number, exceptionMessage: string): Promise<Lecturer> {
    let lecturer = await this.lecturerRepository.findOne(id);

    if (!lecturer) {
      throw new NotFoundException(exceptionMessage);
    }

    return lecturer;
  }

  async findById(lecture_id: number): Promise<Lecturer> {
    let lecturer = await this.lecturerRepository.findOne(lecture_id);

    if (!lecturer) {
      throw new NotFoundException('Lecturer ID is not valid');
    }

    return lecturer;
  }

  async countByMajor(majorCode: string): Promise<number> {
    return await this.lecturerRepository
      .createQueryBuilder('lecturer')
      .leftJoinAndSelect('lecturer.major', 'major')
      .where('major.code = :majorCode', { majorCode })
      .getCount();
  }

  async delete(lecturerId) {
    return await this.lecturerRepository.delete(lecturerId);
  }

  async findKetuaProdiByMajorId(majorId: number) {
    return await this.lecturerRepository.findOne({
      where: {
        major: majorId,
        role: Role.KETUA_PRODI,
      },
    });
  }
}
