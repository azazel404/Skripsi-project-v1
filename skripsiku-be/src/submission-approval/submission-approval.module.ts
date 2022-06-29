import { forwardRef, Module } from '@nestjs/common';
import { SubmissionApprovalService } from './submission-approval.service';
import { SubmissionApprovalController } from './submission-approval.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionApproval } from './submission-approval.entity';
import { SubmissionAttachmentModule } from 'src/submission-attachment/submission-attachment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubmissionApproval]),
    forwardRef(() => SubmissionAttachmentModule),
  ],
  controllers: [SubmissionApprovalController],
  providers: [SubmissionApprovalService],
  exports: [TypeOrmModule, SubmissionApprovalService],
})
export class SubmissionApprovalModule {}
