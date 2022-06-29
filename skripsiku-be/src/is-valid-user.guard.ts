import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';

export const IsValidUserGuard: any = (source: 'params' | 'body') => {
  @Injectable()
  class IsValidUserGuardMixin implements CanActivate {
    constructor(
      @Inject(UserService)
      private userService: UserService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return this.checkIsValidUserGuard(context);
    }

    async checkIsValidUserGuard(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      let userId;

      if (source === 'params') {
        userId = request.params.userId;
      } else if (source === 'body') {
        userId = request.body.user_id;
      }

      if (!userId) {
        throw new BadRequestException(['userId should not be empty']);
      }

      let user = await this.userService.findById(userId);

      request.user = user;

      return true;
    }
  }

  return mixin(IsValidUserGuardMixin);
};
