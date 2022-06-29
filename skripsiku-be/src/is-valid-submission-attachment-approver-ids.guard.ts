import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export const IsValidSubmissionAttachmentApproverIdsGuard: any = (source: 'params' | 'body') => {
  @Injectable()
  class IsValidSubmissionAttachmentApproverIdsGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return this.checkIsValidSubmissionAttachmentApproverIdsGuard(context);
    }

    async checkIsValidSubmissionAttachmentApproverIdsGuard(
      context: ExecutionContext
    ): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      let submissionAttachmentApproverIds;

      if (source === 'body') {
        submissionAttachmentApproverIds = request.body.submission_attachment_approver_ids;
      }

      if (!submissionAttachmentApproverIds || submissionAttachmentApproverIds.length < 1) {
        throw new BadRequestException('You must provide at least 1 approver');
      } else if (submissionAttachmentApproverIds.length > 3) {
        throw new BadRequestException('Approver Ids cannot be more than 3');
      }

      let uniqueApproverIds = [...new Set(submissionAttachmentApproverIds)];

      if (uniqueApproverIds.length < submissionAttachmentApproverIds.length) {
        throw new BadRequestException('Duplicated value of Approver Ids found');
      }

      return true;
    }
  }

  return mixin(IsValidSubmissionAttachmentApproverIdsGuardMixin);
};
