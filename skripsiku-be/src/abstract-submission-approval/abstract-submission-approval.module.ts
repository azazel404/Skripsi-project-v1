import { forwardRef, Module } from '@nestjs/common';
import { AbstractSubmissionApprovalService } from './abstract-submission-approval.service';
import { AbstractSubmissionApprovalController } from './abstract-submission-approval.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractSubmissionApproval } from './abstract-submission-approval.entity';
import { AbstractSubmissionApprovalDetailModule } from 'src/abstract-submission-approval-detail/abstract-submission-approval-detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AbstractSubmissionApproval]),
    forwardRef(() => AbstractSubmissionApprovalDetailModule),
  ],
  providers: [AbstractSubmissionApprovalService],
  controllers: [AbstractSubmissionApprovalController],
  exports: [AbstractSubmissionApprovalService],
})
export class AbstractSubmissionApprovalModule {}
