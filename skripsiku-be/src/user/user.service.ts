import { User } from './user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindUserDTO } from './dto/user.dto';
import { Exception } from 'src/base/base.exception';
import { Role } from 'enums/Role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getUsers(params) {
    const {
      page,
      limit,
      role,
      first_name,
      major_id,
      registration_number,
      thesis_advisor_id,
      class_of,
    } = params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    let query = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.major', 'major')
      .leftJoinAndSelect('user.thesis_advisor_id', 'thesis_advisor')
      .take(take)
      .skip(skip);

    if (major_id) {
      query = query.andWhere('user.major = :major_id', { major_id });
    }

    if (first_name) {
      query = query.andWhere('user.first_name like :first_name', {
        first_name: '%' + first_name + '%',
      });
    }

    if (class_of) {
      query = query.andWhere('user.class_of like :class_of', {
        class_of: '%' + class_of + '%',
      });
    }

    if (registration_number) {
      query = query.andWhere('user.registration_number like :registration_number ', {
        registration_number: '%' + registration_number + '%',
      });
    }

    if (role) {
      query = query.andWhere('user.role like :role ', {
        role: '%' + role + '%',
      });
    }

    if (thesis_advisor_id) {
      query = query.andWhere('user.thesis_advisor_id_id = :thesis_advisor_id', {
        thesis_advisor_id,
      });
    }

    return await query.getManyAndCount();
  }

  async getUsersRoleAdminAndDekan(params) {
    const { page, limit, role, first_name, major_id, registration_number, thesis_advisor_id } =
      params;

    const take = limit || 10;
    const skip = (page > 0 && (page - 1) * limit) || 0;

    let query = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.major', 'major')
      .leftJoinAndSelect('user.thesis_advisor_id', 'thesis_advisor')
      .where('user.role = 10')
      .orWhere('user.role = 40')

      .take(take)
      .skip(skip);

    if (major_id) {
      query = query.andWhere('user.major = :major_id', { major_id });
    }

    if (first_name) {
      query = query.andWhere('user.first_name like :first_name', {
        first_name: '%' + first_name + '%',
      });
    }

    if (registration_number) {
      query = query.andWhere('user.registration_number like :registration_number ', {
        registration_number: '%' + registration_number + '%',
      });
    }

    // if (role) {
    //   query = query.andWhere('user.role like :role ', {
    //     role: '%' + role + '%',
    //   });
    // }

    if (thesis_advisor_id) {
      query = query.andWhere('user.thesis_advisor_id_id = :thesis_advisor_id', {
        thesis_advisor_id,
      });
    }

    return await query.getManyAndCount();
  }

  async findOne(user: FindUserDTO): Promise<User> {
    return this.userRepository.findOne({
      where: user,
    });
  }

  async findById(user_id: number): Promise<User> {
    let user = await this.userRepository.findOne(user_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByIdWithExceptionMessage(id: number, exceptionMessage: string): Promise<User> {
    let user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Exception(exceptionMessage);
    }

    return user;
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(user): Promise<User> {
    return await this.userRepository.save(user);
  }

  async delete(userId) {
    return await this.userRepository.delete(userId);
  }

  async getUserCountByMajorId(majorId: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.major', 'major')
      .where('major.id = :majorId', { majorId })
      .andWhere('user.role = role', { role: Role.STUDENT })
      .getCount();
  }
}
