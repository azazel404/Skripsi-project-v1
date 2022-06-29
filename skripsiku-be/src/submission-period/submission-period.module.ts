import { Module } from '@nestjs/common';
import { SubmissionPeriodService } from './submission-period.service';
import { SubmissionPeriodController } from './submission-period.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionPeriod } from './submission-period.entity';
import { MajorModule } from 'src/major/major.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionPeriod]), MajorModule],
  providers: [SubmissionPeriodService],
  controllers: [SubmissionPeriodController],
  exports: [SubmissionPeriodService],
})
export class SubmissionPeriodModule {}
