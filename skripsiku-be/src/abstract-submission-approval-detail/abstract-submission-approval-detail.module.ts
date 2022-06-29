import { forwardRef, Module } from '@nestjs/common';
import { AbstractSubmissionApprovalDetailService } from './abstract-submission-approval-detail.service';
import { AbstractSubmissionApprovalDetailController } from './abstract-submission-approval-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractSubmissionApprovalDetail } from './abstract-submission-approval-detail.entity';
import { LecturerModule } from 'src/lecturer/lecturer.module';
import { AbstractSubmissionApprovalModule } from 'src/abstract-submission-approval/abstract-submission-approval.module';
import { AbstractSubmissionModule } from 'src/abstract-submission/abstract-submission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AbstractSubmissionApprovalDetail]),
    LecturerModule,
    AbstractSubmissionApprovalModule,
    forwardRef(() => AbstractSubmissionModule),
  ],
  controllers: [AbstractSubmissionApprovalDetailController],
  providers: [AbstractSubmissionApprovalDetailService],
  exports: [AbstractSubmissionApprovalDetailService],
})
export class AbstractSubmissionApprovalDetailModule {}
