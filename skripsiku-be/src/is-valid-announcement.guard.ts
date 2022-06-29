import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AnnouncementService } from './announcement/announcement.service';

export const IsValidAnnouncementGuard: any = (source: 'params' | 'body') => {
  @Injectable()
  class IsValidAnnouncementGuardMixin implements CanActivate {
    constructor(
      @Inject(AnnouncementService)
      private announcementService: AnnouncementService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return this.checkIsValidAnnouncement(context);
    }

    async checkIsValidAnnouncement(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      let announcementId;

      if (source === 'params') {
        announcementId = request.params.announcementId;
      } else if (source === 'body') {
        announcementId = request.body.announcement_id;
      }

      if (!announcementId) {
        throw new BadRequestException(['announcementId should not be empty']);
      }

      let announcement = await this.announcementService.findById(announcementId);

      request.announcement = announcement;

      return true;
    }
  }

  return mixin(IsValidAnnouncementGuardMixin);
};
