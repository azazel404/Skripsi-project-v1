import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from 'enums/Role.enum';
import { Observable } from 'rxjs';

@Injectable()
export class IsAdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === Role.ADMIN) {
      return true;
    } else {
      throw new ForbiddenException('User must be an Admin to access this resource');
    }
  }
}
