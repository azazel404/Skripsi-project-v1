import { forwardRef, Module } from '@nestjs/common';
import { SubmissionApprovalDetailService } from './submission-approval-detail.service';
import { SubmissionApprovalDetailController } from './submission-approval-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionApprovalDetail } from './submission-approval-detail.entity';
import { SubmissionApprovalModule } from 'src/submission-approval/submission-approval.module';
import { SubmissionAttachmentModule } from 'src/submission-attachment/submission-attachment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubmissionApprovalDetail]),
    SubmissionApprovalModule,
    forwardRef(() => SubmissionAttachmentModule),
  ],
  providers: [SubmissionApprovalDetailService],
  controllers: [SubmissionApprovalDetailController],
  exports: [SubmissionApprovalDetailService],
})
export class SubmissionApprovalDetailModule {}
