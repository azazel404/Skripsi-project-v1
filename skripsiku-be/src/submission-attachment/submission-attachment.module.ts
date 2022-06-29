import { forwardRef, Module } from '@nestjs/common';
import { SubmissionAttachmentService } from './submission-attachment.service';
import { SubmissionAttachmentController } from './submission-attachment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionAttachment } from './submission-attachment.entity';
import { AttachmentModule } from 'src/attachment/attachment.module';
import { LecturerModule } from 'src/lecturer/lecturer.module';
import { SubmissionAttachmentApproverModule } from 'src/submission-attachment-approver/submission-attachment-approver.module';
import { SubmissionApprovalModule } from 'src/submission-approval/submission-approval.module';
import { SubmissionApprovalDetailModule } from 'src/submission-approval-detail/submission-approval-detail.module';
import { SubmissionModule } from 'src/submission/submission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubmissionAttachment]),
    AttachmentModule,
    LecturerModule,
    SubmissionAttachmentApproverModule,
    forwardRef(() => SubmissionModule),
    SubmissionApprovalModule,
    SubmissionApprovalDetailModule,
  ],
  providers: [SubmissionAttachmentService],
  controllers: [SubmissionAttachmentController],
  exports: [TypeOrmModule, SubmissionAttachmentService],
})
export class SubmissionAttachmentModule {}
