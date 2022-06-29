import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MajorService } from './major/major.service';

@Injectable()
export class IsValidMajorGuard implements CanActivate {
  constructor(@Inject(MajorService) private majorService: MajorService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return this.checkIsValidMajor(context);
  }

  async checkIsValidMajor(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { major_id } = request.body;

    if (!major_id) {
      throw new BadRequestException(['major_id should not be empty']);
    }

    let major = await this.majorService.findById(major_id);

    request.body.major = major;

    return true;
  }
}
