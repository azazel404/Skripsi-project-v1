import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Body,
  Put,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDTO, UpdatePasswordDTO } from './dto/auth.dto';
import { UserService } from './../user/user.service';
import { LecturerService } from 'src/lecturer/lecturer.service';
import { Exception } from 'src/base/base.exception';
import { Role } from 'enums/Role.enum';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
const fs = require('fs');
import { Attachment } from 'src/attachment/attachment.entity';
import { AttachmentService } from 'src/attachment/attachment.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly lecturerService: LecturerService,
    private readonly attachmentService: AttachmentService
  ) {}

  //   @ApiOkResponse({ description: 'Lecturer Login' })
  //   @ApiUnauthorizedResponse({ description: 'Unauthorized credentials' })
  // //   @UseGuards(LocalAuthGuard)
  //   @Post('login-lecturer')
  //   async loginLecture(@Request() req) {
  //     return this.authService.login(req.user);
  //   }

  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized credentials' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.authService.getProfile(req.user, req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Request() req, @Body() body: UpdateUserDTO) {
    let userProfile = await this.authService.getProfile(req.user);

    if (
      userProfile.role === Role.ADMIN ||
      userProfile.role === Role.STUDENT ||
      userProfile.role === Role.DEKAN
    ) {
      let user = await this.userService.findOne({
        registration_number: userProfile.registration_number,
      });

      const { first_name, last_name, birthdate, phone_number, gender, file_name } = body;

      let requestPayload = {
        ...user,
        ...(birthdate && { birthdate }),
        ...(first_name && { first_name }),
        ...(last_name && { last_name }),
        ...(Number(gender) >= 0 && { gender }),
        ...(phone_number && { phone_number }),
      };

      let createdNewAttachment;

      if (file_name) {
        let path = `./uploads/images/${file_name}`;

        let pathExists = fs.existsSync(path);

        if (pathExists) {
          let oldPath = path;
          let newPath = `./uploads/images/${file_name}`;

          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              throw new InternalServerErrorException();
            }
          });

          let newAttachment = new Attachment();

          newAttachment.file_name = file_name;
          createdNewAttachment = await this.attachmentService.create(newAttachment);

          requestPayload.profile_picture = createdNewAttachment;
        } else {
          throw new NotFoundException('File_name not found');
        }
      }

      await this.userService.update(requestPayload);

      return {
        message: 'Successfully updated profile',
      };
    } else if (userProfile.role === Role.LECTURER || userProfile.role === Role.KETUA_PRODI) {
      let lecturer = await this.lecturerService.findOne({
        registration_number: userProfile.registration_number,
      });

      const { first_name, last_name, birthdate, phone_number, gender, file_name } = body;

      let requestPayload = {
        ...lecturer,
        ...(birthdate && { birthdate }),
        ...(first_name && { first_name }),
        ...(last_name && { last_name }),
        ...(Number(gender) >= 0 && { gender }),
        ...(phone_number && { phone_number }),
      };

      let createdNewAttachment;

      if (file_name) {
        let path = `./uploads/images/${file_name}`;

        let pathExists = fs.existsSync(path);

        if (pathExists) {
          let oldPath = path;
          let newPath = `./uploads/images/${file_name}`;

          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              throw new InternalServerErrorException();
            }
          });

          let newAttachment = new Attachment();

          newAttachment.file_name = file_name;
          createdNewAttachment = await this.attachmentService.create(newAttachment);

          requestPayload.profile_picture = createdNewAttachment;
        } else {
          throw new NotFoundException('File_name not found');
        }
      }

      await this.lecturerService.update(requestPayload);

      return {
        message: 'Successfully updated profile',
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile/update-password')
  async updatePassword(@Request() req, @Body() body: UpdatePasswordDTO) {
    let accountUserAdminAndDekan = await this.userService.findOne({
      id: req.user.user_id,
      //   role: Role.STUDENT,
    });

    // let admin = await this.userService.findOne({
    //   id: req.user.user_id,
    // //   role: Role.ADMIN,
    // });

    //  let dekan = await this.userService.findOne({
    //   id: req.user.user_id,
    // //   role: Role.DEKAN,
    // });

    let lecture = await this.lecturerService.findOne({
      id: req.user.user_id,
      role: Role.LECTURER,
    });

    let ketuaProdi = await this.lecturerService.findOne({
      id: req.user.user_id,
      role: Role.KETUA_PRODI,
    });

    if (accountUserAdminAndDekan) {
      accountUserAdminAndDekan.password = await bcrypt.hash(body.password, Number(10));
      await this.userService.update(accountUserAdminAndDekan);
      return {
        message: 'Successfully updated password',
      };
    } else if (lecture) {
      lecture.password = await bcrypt.hash(body.password, Number(10));
      await this.lecturerService.update(lecture);
      return {
        message: 'Successfully updated password',
      };
    } else if (ketuaProdi) {
      ketuaProdi.password = await bcrypt.hash(body.password, Number(10));
      await this.lecturerService.update(lecture);
      return {
        message: 'Successfully updated password',
      };
    } else {
      throw new Exception('failed updated this profile');
    }
  }
}
