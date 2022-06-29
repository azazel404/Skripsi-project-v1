import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from './stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stage])],
  providers: [StageService],
  controllers: [StageController],
  exports: [TypeOrmModule, StageService],
})
export class StageModule {}
