import { User } from './user.entity';
import { UserService } from './../user/user.service';
import { LecturerService } from 'src/lecturer/lecturer.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MajorService } from 'src/major/major.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Exception } from 'src/base/base.exception';
import * as bcrypt from 'bcrypt';
import { Gender } from 'enums/Gender.enum';
import { Role } from 'enums/Role.enum';
import { UserApproverService } from 'src/user-approver/user-approver.service';
import { UserApprover } from 'src/user-approver/user-approver.entity';
import { Attachment } from 'src/attachment/attachment.entity';
import { AttachmentService } from 'src/attachment/attachment.service';
import { IsAdminRoleGuard } from 'src/is-admin-role.guard';
import { IsValidUserGuard } from 'src/is-valid-user.guard';
import { UserAbstractApproverService } from 'src/user-abstract-approver/user-abstract-approver.service';
const fs = require('fs');

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly majorService: MajorService,
    private readonly authService: AuthService,
    private readonly lecturerService: LecturerService,
    private readonly userApproverService: UserApproverService,
    private readonly attachmentService: AttachmentService,
    private readonly userAbstractApproverService: UserAbstractApproverService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUser(@Request() req, @Query() query) {
    const { page, limit, role, first_name, major_id, registration_number, class_of } = query;

    let params = {
      page,
      limit,
      role,
      first_name,
      major_id,
      registration_number,
      class_of,
    };

    let [data, count] = await this.userService.getUsers(params);

    let result = data.map((x) => {
      delete x.password;
      delete x.thesis_advisor_id;

      return {
        ...x,
        major: {
          id: x.major?.id,
          code: x.major?.code,
          name: x.major?.name,
        },
        gender_in_string: Gender[x.gender],
        thesis_advisor: {
          id: x.thesis_advisor_id?.id,
          created_at: x.thesis_advisor_id?.created_at,
          updated_at: x.thesis_advisor_id?.updated_at,
          first_name: x.thesis_advisor_id?.first_name,
          last_name: x.thesis_advisor_id?.last_name,
          email: x.thesis_advisor_id?.email,
          registration_number: x.thesis_advisor_id?.registration_number,
          gender: x.thesis_advisor_id?.gender,
          birthdate: x.thesis_advisor_id?.birthdate,
          phone_number: x.thesis_advisor_id?.phone_number,
          role: x.thesis_advisor_id?.role,
          role_in_string: Role[x.thesis_advisor_id?.role],
        },
      };
    });

    return {
      data: result,
      count,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('dekan-and-admin')
  async getAllUserAdminAndDekan(@Request() req, @Query() query) {
    const { page, limit, role, first_name, major_id, registration_number } = query;

    let params = {
      page,
      limit,
      role,
      first_name,
      major_id,
      registration_number,
    };

    let [data, count] = await this.userService.getUsersRoleAdminAndDekan(params);

    let result = data.map((x) => {
      delete x.password;

      return {
        ...x,
        major: {
          id: x.major?.id,
          code: x.major?.code,
          name: x.major?.name,
        },
        gender_in_string: Gender[x.gender],
      };
    });

    return {
      data: result,
      count,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body, @Request() req) {
    let user = await this.authService.getProfile(req.user);

    let isEmailExist = await this.userService.findOne({
      email: body.email,
    });

    if (isEmailExist) {
      throw new Exception('Email has already been taken.');
    }

    let isRegistrationNumberExists = await this.userService.findOne({
      registration_number: body.registration_number,
    });

    if (isRegistrationNumberExists) {
      throw new Exception('registration_number has already existed');
    }

    const {
      email,
      password,
      birthdate,
      gender,
      first_name,
      last_name,
      registration_number,
      class_of,
      phone_number,
      major_id,
      thesis_advisor_id,
      profile_picture,
      abstract_approver_ids,
    } = body;

    let createdNewAttachment;

    if (profile_picture) {
      let path = `./uploads/images/${profile_picture}`;

      let pathExists = fs.existsSync(path);

      if (pathExists) {
        let oldPath = path;
        let newPath = `./uploads/images/${profile_picture}`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw new Exception('Internal server error');
          }
        });

        let newAttachment = new Attachment();

        newAttachment.file_name = profile_picture;

        createdNewAttachment = await this.attachmentService.create(newAttachment);
      } else {
        throw new NotFoundException('Profile_picture not found');
      }
    }

    let newUser = new User();

    newUser.email = email;
    newUser.password = password;
    newUser.birthdate = birthdate;
    newUser.gender = gender;
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.registration_number = registration_number;
    newUser.class_of = class_of;
    newUser.phone_number = phone_number;
    newUser.role = Role.STUDENT;
    newUser.profile_picture = createdNewAttachment;

    if (thesis_advisor_id) {
      let thesisAdvisor = await this.lecturerService.findByIdWithExceptionMessage(
        thesis_advisor_id,
        'thesis_advisor_id is not valid'
      );

      newUser.thesis_advisor_id = thesisAdvisor;
    }

    // major_id - major_id - major_id
    if (!major_id) {
      throw new Exception('major_id is required for creating Mahasiswa data');
    }

    let major = await this.majorService.findOne({
      id: major_id,
    });

    if (!major) {
      throw new Exception('major_id is not valid');
    }

    newUser.major = major;

    let createdUser = await this.userService.create(newUser);

    if (body.abstract_approver_ids.length) {
      for (let i = 0; i < abstract_approver_ids.length; i++) {
        let lecturer = await this.lecturerService.findOne({
          id: abstract_approver_ids[i],
        });

        if (lecturer) {
          await this.userAbstractApproverService.create({
            level: null,
            lecturer,
            user: createdUser,
          });
        }
      }
    }

    return {
      message: 'Successfully created user',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('count')
  async getStudentCount() {
    let majors = await this.majorService.findAll();

    let result = await Promise.all(
      majors.map(async (major) => {
        let student_count = await this.userService.getUserCountByMajorId(major.id);

        return {
          major_id: major.id,
          major_code: major.code,
          major_name: major.name,
          major_student_count: student_count,
        };
      })
    );

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number, @Req() req) {
    let user = await this.userService.findOne({
      id: userId,
    });
    if (!user) {
      throw new Exception('User ID is not valid');
    }

    const {
      id,
      first_name,
      last_name,
      email,
      registration_number,
      class_of,
      gender,
      birthdate,
      phone_number,
      role,
      major,
      thesis_advisor_id,
      profile_picture,
    } = user;

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/images/`;

    let profilePicture = null;

    if (profile_picture) {
      profilePicture = {
        id: profile_picture.id,
        file_name: attachmentPath + profile_picture.file_name,
      };
    }

    let result = {
      id,
      first_name,
      last_name,
      email,
      registration_number,
      class_of,
      gender,
      gender_in_string: Gender[gender],
      birthdate,
      phone_number,
      role,
      major: {
        id: major.id,
        code: major.code,
        name: major.name,
      },
      thesis_advisor: {
        id: thesis_advisor_id?.id,
        first_name: thesis_advisor_id?.first_name,
        last_name: thesis_advisor_id?.last_name,
        email: thesis_advisor_id?.email,
      },
      profile_picture: profilePicture,
    };

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async updateUserByAdmin(
    @Body() body,
    @Request() req,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    let requestUser = await this.userService.findOne({
      id: req.user.user_id,
    });

    // if (Number(requestUser.role.code) !== 10) {
    //   throw new Exception('You arenot authorized to execute this action');
    // }

    let user = await this.userService.findOne({
      id: userId,
    });

    let oldUserProfilePictureId = user.profile_picture?.id;
    let oldUserProfilePictureFileName = user.profile_picture?.file_name;

    if (!user) {
      throw new Exception('User ID is not valid');
    }

    // if (Number(req.user.user_id) === Number(userId)) {
    //   throw new Exception("You can only update other User's profile");
    // }

    const {
      password,
      birthdate,
      gender,
      first_name,
      last_name,
      registration_number,
      class_of,
      phone_number,
      major_id,
      thesis_advisor_id,
      profile_picture,
    } = body;

    let userRequest = {
      ...user,
      ...(password && { password: await bcrypt.hash(password, Number(10)) }),
      ...(birthdate && { birthdate }),
      ...(gender && { gender }),
      ...(first_name && { first_name }),
      ...(last_name && { last_name }),
      ...(registration_number && { registration_number }),
      ...(class_of && { class_of }),
      ...(phone_number && { phone_number }),
      //   ...(thesis_advisor_id && { thesis_advisor_id }),
    };

    if (major_id) {
      let major = await this.majorService.findOne({
        id: major_id,
      });

      if (!major) {
        throw new Exception('Major ID is not valid');
      }

      userRequest.major = major;
    }

    if (thesis_advisor_id) {
      let thesisAdvisor = await this.lecturerService.findByIdWithExceptionMessage(
        thesis_advisor_id,
        'thesis_advisor_id is not valid'
      );

      userRequest.thesis_advisor_id = thesisAdvisor;
    }

    let createdNewAttachment;

    if (profile_picture) {
      let path = `./uploads/images/${profile_picture}`;

      let pathExists = fs.existsSync(path);

      if (pathExists) {
        let oldPath = path;
        let newPath = `./uploads/documents/${profile_picture}`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw new Exception('Internal server error');
          }
        });

        let newAttachment = new Attachment();

        newAttachment.file_name = profile_picture;

        createdNewAttachment = await this.attachmentService.create(newAttachment);

        userRequest.profile_picture = createdNewAttachment.id;

        await this.userService.update(userRequest);

        // delete old "attachment" record from Attachment table
        await this.attachmentService.delete(oldUserProfilePictureId);

        // remove "attachment" file from "/uploads/documents"
        let oldFilePath = `./uploads/documents/${oldUserProfilePictureFileName}`;
        fs.unlinkSync(oldFilePath);

        return {
          message: 'Successfully updated user',
        };
      } else {
        throw new NotFoundException('Profile_picture not found');
      }
    }

    await this.userService.update(userRequest);

    return {
      message: 'Successfully updated user',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-admin-and-dekan')
  async createAdminAndDekanByAdmin(@Body() body, @Request() req) {
    let user = await this.authService.getProfile(req.user);

    let isEmailExist = await this.userService.findOne({
      email: body.email,
    });

    if (isEmailExist) {
      throw new Exception('Email has already been taken.');
    }

    let isRegistrationNumberExists = await this.userService.findOne({
      registration_number: body.registration_number,
    });

    if (isRegistrationNumberExists) {
      throw new Exception('registration_number has already existed');
    }

    const {
      email,
      password,
      birthdate,
      gender,
      first_name,
      last_name,
      registration_number,
      class_of,
      phone_number,
      role,
      profile_picture,
    } = body;

    let createdNewAttachment;

    if (profile_picture) {
      let path = `./uploads/images/${profile_picture}`;

      let pathExists = fs.existsSync(path);

      if (pathExists) {
        let oldPath = path;
        let newPath = `./uploads/documents/${profile_picture}`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw new Exception('Internal server error');
          }
        });

        let newAttachment = new Attachment();

        newAttachment.file_name = profile_picture;

        createdNewAttachment = await this.attachmentService.create(newAttachment);
      } else {
        throw new NotFoundException('Profile_picture not found');
      }
    }

    let newUser = new User();

    newUser.email = email;
    newUser.password = password;
    newUser.birthdate = birthdate;
    newUser.gender = gender;
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.registration_number = registration_number;
    newUser.class_of = class_of;
    newUser.phone_number = phone_number;
    newUser.role = role;
    newUser.profile_picture = createdNewAttachment;

    await this.userService.create(newUser);

    return {
      message: 'Successfully created user',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId/update-admin-and-dekan')
  async updateUserAdminAndDekanByAdmin(
    @Body() body,
    @Request() req,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    let requestUser = await this.userService.findOne({
      id: req.user.user_id,
    });

    let user = await this.userService.findOne({
      id: userId,
    });

    let oldUserProfilePictureId = user.profile_picture?.id;
    let oldUserProfilePictureFileName = user.profile_picture?.file_name;

    if (!user) {
      throw new Exception('User ID is not valid');
    }

    // if (Number(req.user.user_id) === Number(userId)) {
    //   throw new Exception("You can only update other User's profile");
    // }

    const {
      password,
      birthdate,
      gender,
      first_name,
      last_name,
      registration_number,
      class_of,
      phone_number,
      profile_picture,
      role,
    } = body;

    let userRequest = {
      ...user,
      ...(password && { password: await bcrypt.hash(password, Number(10)) }),
      ...(birthdate && { birthdate }),
      ...(gender && { gender }),
      ...(first_name && { first_name }),
      ...(last_name && { last_name }),
      ...(registration_number && { registration_number }),
      ...(class_of && { class_of }),
      ...(phone_number && { phone_number }),
      ...(role && { role }),
    };

    let createdNewAttachment;

    if (profile_picture) {
      let path = `./uploads/images/${profile_picture}`;

      let pathExists = fs.existsSync(path);

      if (pathExists) {
        let oldPath = path;
        let newPath = `./uploads/documents/${profile_picture}`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw new Exception('Internal server error');
          }
        });

        let newAttachment = new Attachment();

        newAttachment.file_name = profile_picture;

        createdNewAttachment = await this.attachmentService.create(newAttachment);

        userRequest.profile_picture = createdNewAttachment.id;

        await this.userService.update(userRequest);

        // delete old "attachment" record from Attachment table
        await this.attachmentService.delete(oldUserProfilePictureId);

        // remove "attachment" file from "/uploads/documents"
        let oldFilePath = `./uploads/documents/${oldUserProfilePictureFileName}`;
        fs.unlinkSync(oldFilePath);

        return {
          message: 'Successfully updated user',
        };
      } else {
        throw new NotFoundException('Profile_picture not found');
      }
    }

    await this.userService.update(userRequest);

    return {
      message: 'Successfully updated user',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/user-approver')
  async getAllUserApproverByUserId(@Request() req, @Param('userId', ParseIntPipe) userId: number) {
    let requestUser = await this.authService.getProfile(req.user);

    await this.userService.findById(userId);

    let userApprovers = await this.userApproverService.getUserApproverByUserId(userId);

    let result = userApprovers.map((x) => {
      delete x.user;

      return {
        ...x,
        approver: {
          id: x.approver.id,
          first_name: x.approver.first_name,
          last_name: x.approver.last_name,
          email: x.approver.email,
          registration_number: x.approver.registration_number,
          gender: x.approver.gender,
          gender_in_string: Gender[x.approver.gender],
        },
      };
    });

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/user-abstract-approver')
  async getAllUserAbstractApproverByUserId(
    @Req() req,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    let user = await this.userService.findById(userId);

    let userAbstractApprovers =
      await this.userAbstractApproverService.getAllAbstractApproversByUser(user);

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/images/`;

    let result = userAbstractApprovers.map((x) => {
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
          major: {
            id: lecturer.major?.id,
            code: lecturer.major?.code,
            name: lecturer.major?.name,
          },
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

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/user-approver')
  async addUserApprover(
    @Request() req,
    @Body() body,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    let requestUser = await this.authService.getProfile(req.user);

    if (requestUser.role !== 10 || requestUser.roleInString !== 'ADMIN') {
      throw new Exception('You arenot authorized to execute this action');
    }

    let user = await this.userService.findById(userId);

    if (!body.approver_id) {
      throw new Exception('approver_id is required');
    }

    let approver = await this.lecturerService.findByIdWithExceptionMessage(
      body.approver_id,
      'approver_id not found'
    );

    let userApproverData = await this.userApproverService.findOne({
      user,
      approver,
    });

    if (userApproverData) {
      throw new Exception('Data already exists');
    }

    let newUserApprover = new UserApprover();

    newUserApprover.user = user;
    newUserApprover.approver = approver;
    newUserApprover.level = body.level;

    await this.userApproverService.create(newUserApprover);

    return {
      message: 'Successfully created user approver data',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/user-approver/:userApproverId')
  async deleteUserApprover(
    @Request() req,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('userApproverId', ParseIntPipe) userApproverId: number
  ) {
    let requestUser = await this.authService.getProfile(req.user);

    if (requestUser.role !== 10 || requestUser.roleInString !== 'ADMIN') {
      throw new Exception('You arenot authorized to execute this action');
    }

    await this.userService.findById(userId);

    let userApproverData = await this.userApproverService.findById(userApproverId);

    await this.userApproverService.delete(userApproverData.id);

    return {
      message: 'Successfully deleted user approver data',
    };
  }

  @UseGuards(JwtAuthGuard, IsAdminRoleGuard, IsValidUserGuard('params'))
  @Delete(':userId')
  async deleteStudent(@Req() req, @Param('userId', ParseIntPipe) userId: number) {
    try {
      await this.userService.delete(req.user.id);

      return {
        message: 'Successfully deleted User data',
      };
    } catch (err) {
      if (err.errno === 1451 || err.errno === 1217) {
        throw new Exception('Cannot delete this data as it is being used in other transaction');
      }

      throw new Exception(err.sqlMessage);
    }
  }
}
