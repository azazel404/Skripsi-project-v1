import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AbstractSubmissionService } from './abstract-submission/abstract-submission.service';

export const IsValidAbstractSubmissionGuard: any = (source: 'params' | 'body') => {
  @Injectable()
  class IsValidAbstractSubmissionGuardMixin implements CanActivate {
    constructor(
      @Inject(AbstractSubmissionService)
      private abstractSubmissionService: AbstractSubmissionService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return this.checkIsValidAbstractSubmissionGuard(context);
    }

    async checkIsValidAbstractSubmissionGuard(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      let abstractSubmissionId;

      if (source === 'params') {
        abstractSubmissionId = request.params.abstractSubmissionId;
      } else if (source === 'body') {
        abstractSubmissionId = request.body.abstract_submission_id;
      }

      if (!abstractSubmissionId) {
        throw new BadRequestException(['abstractSubmissionId should not be empty']);
      }

      let abstractSubmission = await this.abstractSubmissionService.findById(abstractSubmissionId);

      request.abstractSubmission = abstractSubmission;

      return true;
    }
  }

  return mixin(IsValidAbstractSubmissionGuardMixin);
};
