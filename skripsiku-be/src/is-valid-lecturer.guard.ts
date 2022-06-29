import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LecturerService } from './lecturer/lecturer.service';

export const IsValidLecturerGuard: any = (source: 'params' | 'body') => {
  @Injectable()
  class IsValidLecturerGuardMixin implements CanActivate {
    constructor(
      @Inject(LecturerService)
      private lecturerService: LecturerService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return this.checkIsValidLecturerGuard(context);
    }

    async checkIsValidLecturerGuard(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      let lecturerId;

      if (source === 'params') {
        lecturerId = request.params.lecturerId;
      } else if (source === 'body') {
        lecturerId = request.body.lecturer_id;
      }

      if (!lecturerId) {
        throw new BadRequestException(['lecturerId should not be empty']);
      }

      let lecturer = await this.lecturerService.findById(lecturerId);

      request.lecturer = lecturer;

      return true;
    }
  }

  return mixin(IsValidLecturerGuardMixin);
};
