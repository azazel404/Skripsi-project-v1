import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AbstractSubmissionApprovalService } from './abstract-submission-approval/abstract-submission-approval.service';

export const IsValidAbstractSubmissionApprovalGuard: any = (source: 'params' | 'body') => {
  @Injectable()
  class IsValidAbstractSubmissionApprovalGuardMixin implements CanActivate {
    constructor(
      @Inject(AbstractSubmissionApprovalService)
      private abstractSubmissionApprovalService: AbstractSubmissionApprovalService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return this.checkIsValidAbstractSubmissionApprovalGuard(context);
    }

    async checkIsValidAbstractSubmissionApprovalGuard(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      let abstractSubmissionApprovalId;

      if (source === 'params') {
        abstractSubmissionApprovalId = request.params.abstractSubmissionApprovalId;
      } else if (source === 'body') {
        abstractSubmissionApprovalId = request.body.abstract_submission_approval_id;
      }

      if (!abstractSubmissionApprovalId) {
        throw new BadRequestException(['abstractSubmissionApprovalId should not be empty']);
      }

      let abstractSubmissionApproval = await this.abstractSubmissionApprovalService.findById(
        abstractSubmissionApprovalId
      );

      request.abstractSubmissionApproval = abstractSubmissionApproval;

      return true;
    }
  }

  return mixin(IsValidAbstractSubmissionApprovalGuardMixin);
};
