import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception } from 'src/base/base.exception';
import { Repository } from 'typeorm';
import { Stage } from './stage.entity';

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(Stage)
    private stageRepository: Repository<Stage>
  ) {}

  findOne(stage): Promise<Stage> {
    return this.stageRepository.findOne({
      where: stage,
    });
  }

  async getById(stageId): Promise<Stage> {
    let stage = await this.stageRepository.findOne(stageId);

    if (!stage) {
      throw new Exception('Stage ID not found');
    }

    return stage;
  }

  async create(stage: Stage): Promise<Stage> {
    return await this.stageRepository.save(stage);
  }

  findAll() {
    return `This action returns all stage`;
  }

  update(id: number, updateStageDto) {
    return `This action updates a #${id} stage`;
  }

  remove(id: number) {
    return `This action removes a #${id} stage`;
  }
}
