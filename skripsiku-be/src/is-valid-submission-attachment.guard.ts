import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SubmissionAttachmentService } from './submission-attachment/submission-attachment.service';

export const IsValidSubmissionAttachmentGuard: any = (source: 'params' | 'body') => {
  @Injectable()
  class IsValidSubmissionAttachmentGuardMixin implements CanActivate {
    constructor(
      @Inject(SubmissionAttachmentService)
      private submissionAttachmentService: SubmissionAttachmentService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return this.checkIsValidSubmissionAttachment(context);
    }

    async checkIsValidSubmissionAttachment(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      let submissionAttachmentId;

      if (source === 'params') {
        submissionAttachmentId = request.params.submissionAttachmentId;
      } else if (source === 'body') {
        submissionAttachmentId = request.body.submission_attachment_id;
      }

      if (!submissionAttachmentId) {
        throw new BadRequestException(['submissionAttachmentId should not be empty']);
      }

      let submissionAttachment = await this.submissionAttachmentService.findById(
        submissionAttachmentId
      );

      request.submissionAttachment = submissionAttachment;

      return true;
    }
  }

  return mixin(IsValidSubmissionAttachmentGuardMixin);
};
