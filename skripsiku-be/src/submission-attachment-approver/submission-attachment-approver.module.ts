import { Module } from '@nestjs/common';
import { SubmissionAttachmentApproverService } from './submission-attachment-approver.service';
import { SubmissionAttachmentApproverController } from './submission-attachment-approver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionAttachmentApprover } from './submission-attachment-approver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionAttachmentApprover])],
  controllers: [SubmissionAttachmentApproverController],
  providers: [SubmissionAttachmentApproverService],
  exports: [TypeOrmModule, SubmissionAttachmentApproverService],
})
export class SubmissionAttachmentApproverModule {}
