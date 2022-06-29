import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './submission.entity';
import { StageModule } from 'src/stage/stage.module';
import { UserModule } from 'src/user/user.module';
import { SubmissionPeriodModule } from 'src/submission-period/submission-period.module';
import { SubmissionAttachmentModule } from 'src/submission-attachment/submission-attachment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    StageModule,
    UserModule,
    SubmissionPeriodModule,
    SubmissionAttachmentModule,
  ],
  providers: [SubmissionService],
  controllers: [SubmissionController],
  exports: [TypeOrmModule, SubmissionService],
})
export class SubmissionModule {}
