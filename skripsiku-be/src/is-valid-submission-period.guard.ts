import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SubmissionPeriodService } from './submission-period/submission-period.service';

export const IsValidSubmissionPeriodGuard: any = (source: 'params' | 'body') => {
  @Injectable()
  class IsValidSubmissionPeriodGuardMixin implements CanActivate {
    constructor(
      @Inject(SubmissionPeriodService) private submissionPeriodService: SubmissionPeriodService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return this.checkIsValidSubmissionPeriod(context);
    }

    async checkIsValidSubmissionPeriod(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      let submissionPeriodId;

      if (source === 'params') {
        submissionPeriodId = request.params.submissionPeriodId;
      } else if (source === 'body') {
        submissionPeriodId = request.body.submission_period_id;
      }

      if (!submissionPeriodId) {
        throw new BadRequestException(['submissionPeriodId should not be empty']);
      }

      let submissionPeriod = await this.submissionPeriodService.findById(submissionPeriodId);

      request.submissionPeriod = submissionPeriod;

      return true;
    }
  }

  return mixin(IsValidSubmissionPeriodGuardMixin);
};
