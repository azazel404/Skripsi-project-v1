import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Gender } from 'enums/Gender.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsValidLecturerGuard } from 'src/is-valid-lecturer.guard';
import { IsValidUserGuard } from 'src/is-valid-user.guard';
import { UserAbstractApprover } from './user-abstract-approver.entity';
import { UserAbstractApproverService } from './user-abstract-approver.service';

@UseGuards(JwtAuthGuard)
@Controller('user-abstract-approver')
export class UserAbstractApproverController {
  constructor(private readonly userAbstractApproverService: UserAbstractApproverService) {}

  @UseGuards(IsValidUserGuard('body'), IsValidLecturerGuard('body'))
  @Post()
  async create(@Req() req) {
    let newUserAbstractApprover = new UserAbstractApprover();
    newUserAbstractApprover.user = req.user;
    newUserAbstractApprover.lecturer = req.lecturer;
    newUserAbstractApprover.level = null;

    await this.userAbstractApproverService.create(newUserAbstractApprover);

    return {
      message: 'Successfully created User Abstract Approver data',
    };
  }

  @Delete(':userAbstractApproverId')
  async delete(@Param('userAbstractApproverId', ParseIntPipe) userAbstractApproverId: number) {
    let userAbstractApprover = await this.userAbstractApproverService.getById(
      userAbstractApproverId
    );

    await this.userAbstractApproverService.delete(userAbstractApprover.id);

    return {
      message: 'Successfully deleted User Abstract Approver data',
    };
  }

  @Get()
  async getAll(@Req() req) {
    let result = await this.userAbstractApproverService.getAll();

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/images/`;

    let data = result.map((x) => {
      const { lecturer, user } = x;

      let lecturer_profile_picture;
      let user_profile_picture;

      if (lecturer.profile_picture) {
        lecturer_profile_picture = {
          id: lecturer.profile_picture.id,
          file_name: attachmentPath + lecturer.profile_picture.file_name,
        };
      }

      if (user.profile_picture) {
        user_profile_picture = {
          id: user.profile_picture.id,
          file_name: attachmentPath + user.profile_picture.file_name,
        };
      }

      return {
        ...x,
        lecturer: {
          id: lecturer.id,
          first_name: lecturer.first_name,
          last_name: lecturer.last_name,
          email: lecturer.email,
          registration_number: lecturer.registration_number,
          gender: lecturer.gender,
          gender_in_string: Gender[lecturer.gender],
          profile_picture: lecturer_profile_picture,
        },
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          registration_number: user.registration_number,
          gender: user.gender,
          gender_in_string: Gender[user.gender],
          profile_picture: user_profile_picture,
        },
      };
    });

    return data;
  }
}
