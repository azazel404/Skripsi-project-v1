import { Controller } from '@nestjs/common';
import { SubmissionAttachmentApproverService } from './submission-attachment-approver.service';

@Controller('submission-attachment-approver')
export class SubmissionAttachmentApproverController {
  constructor(private readonly submissionAttachmentApproverService: SubmissionAttachmentApproverService) {}
}
