import { Module } from '@nestjs/common';
import { AbstractSubmissionService } from './abstract-submission.service';
import { AbstractSubmissionController } from './abstract-submission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractSubmission } from './abstract-submission.entity';
import { SubmissionPeriodModule } from 'src/submission-period/submission-period.module';
import { UserModule } from 'src/user/user.module';
import { AttachmentModule } from 'src/attachment/attachment.module';
import { AbstractSubmissionApprovalDetailModule } from 'src/abstract-submission-approval-detail/abstract-submission-approval-detail.module';
import { AbstractSubmissionApprovalModule } from 'src/abstract-submission-approval/abstract-submission-approval.module';
import { MajorModule } from 'src/major/major.module';
import { UserAbstractApproverModule } from 'src/user-abstract-approver/user-abstract-approver.module';
import { ErepositoryModule } from 'src/erepository/erepository.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AbstractSubmission]),
    SubmissionPeriodModule,
    UserModule,
    AttachmentModule,
    AbstractSubmissionApprovalModule,
    AbstractSubmissionApprovalDetailModule,
    MajorModule,
    UserAbstractApproverModule,
    ErepositoryModule,
  ],
  controllers: [AbstractSubmissionController],
  providers: [AbstractSubmissionService],
  exports: [AbstractSubmissionService],
})
export class AbstractSubmissionModule {}
