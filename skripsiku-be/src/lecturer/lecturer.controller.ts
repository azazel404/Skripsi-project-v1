import { Lecturer } from './lecturer.entity';
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
import { LecturerService } from './lecturer.service';
import { MajorService } from 'src/major/major.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Exception } from 'src/base/base.exception';
import * as bcrypt from 'bcrypt';
import { Gender } from 'enums/Gender.enum';
import { Role } from 'enums/Role.enum';
import { Attachment } from 'src/attachment/attachment.entity';
import { AttachmentService } from 'src/attachment/attachment.service';
import { UserService } from 'src/user/user.service';
import { IsValidLecturerGuard } from 'src/is-valid-lecturer.guard';
const fs = require('fs');

@UseGuards(JwtAuthGuard)
@Controller('lecturer')
export class LecturerController {
  constructor(
    private readonly lecturerService: LecturerService,
    private readonly majorService: MajorService,
    private readonly attachmentService: AttachmentService,
    private readonly userService: UserService
  ) {}

  @Get('count')
  async getLecturerCount(@Query() query) {
    const { majorCode } = query;

    let count = await this.lecturerService.countByMajor(majorCode);

    return {
      count,
    };
  }

  @Get()
  async getAllLecturer(@Request() req, @Query() query) {
    const { page, limit, role, first_name, major_id, registration_number } = query;

    let params = {
      page,
      limit,
      role,
      first_name,
      major_id,
      registration_number,
    };

    let [data, count] = await this.lecturerService.getLectures(params);

    let result = data.map((item) => {
      delete item.password;
      return {
        ...item,
        major: {
          id: item.major?.id,
          code: item.major?.code,
          name: item.major?.name,
        },
        gender_in_string: Gender[item.gender],
        role_in_string: Role[item.role],
      };
    });
    return {
      data: result,
      count,
    };
  }

  @Post()
  async create(@Body() body, @Request() req) {
    let isEmailExist = await this.lecturerService.findOne({
      email: body.email,
    });

    if (isEmailExist) {
      throw new Exception('Email has already been taken.');
    }

    const {
      email,
      password,
      birthdate,
      gender,
      first_name,
      last_name,
      registration_number,
      phone_number,
      major_id,
      profile_picture,
      role,
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

    let newUser = new Lecturer();

    newUser.email = email;
    newUser.password = password;
    newUser.birthdate = birthdate;
    newUser.gender = gender;
    newUser.role = role;
    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.registration_number = registration_number;
    newUser.phone_number = phone_number;
    newUser.profile_picture = createdNewAttachment;

    let isRegistrationNumberExists = await this.lecturerService.findOne({
      registration_number,
    });

    if (isRegistrationNumberExists) {
      throw new Exception('registration_number has already existed');
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

    let isKetuaProdiExists = await this.lecturerService.findKetuaProdiByMajorId(major.id);

    if (isKetuaProdiExists && role === Role.KETUA_PRODI) {
      throw new Exception('Koordinator program studi untuk jurusan ini telah terdaftar');
    }

    newUser.major = major;

    await this.lecturerService.create(newUser);

    return {
      message: 'Successfully created lecturer',
    };
  }

  @Put(':lecturerId')
  async updateLecturerByAdmin(
    @Body() body,
    @Request() req,
    @Param('lecturerId', ParseIntPipe) lecturerId: number
  ) {
    // let requestUser = await this.lecturerService.findOne({
    //   id: req.user.user_id,
    // });

    let user = await this.lecturerService.findOne({
      id: lecturerId,
    });

    let oldUserProfilePictureId = user.profile_picture?.id;
    let oldUserProfilePictureFileName = user.profile_picture?.file_name;

    if (!user) {
      throw new Exception('User ID is not valid');
    }

    // if (Number(req.user.user_id) === Number(lecturerId)) {
    //   throw new Exception("You can only update other User's profile");
    // }

    const {
      password,
      birthdate,
      email,
      gender,
      first_name,
      last_name,
      registration_number,
      phone_number,
      major_id,
      profile_picture,
      role,
    } = body;

    let userRequest = {
      ...user,
      ...(password && { password: await bcrypt.hash(password, Number(10)) }),
      ...(email && { email }),
      ...(birthdate && { birthdate }),
      ...(gender && { gender }),
      ...(first_name && { first_name }),
      ...(last_name && { last_name }),
      ...(registration_number && { registration_number }),
      ...(phone_number && { phone_number }),
    };

    let newMajor;

    if (major_id) {
      newMajor = await this.majorService.findOne({
        id: major_id,
      });

      if (!newMajor) {
        throw new Exception('Major ID is not valid');
      }
    }

    if (role && newMajor) {
      let isKetuaProdiExists = await this.lecturerService.findKetuaProdiByMajorId(newMajor.id);

      if (isKetuaProdiExists && role === Role.KETUA_PRODI) {
        throw new Exception('Koordinator program studi untuk jurusan ini telah terdaftar');
      }
    } else if (role && !newMajor) {
      let isKetuaProdiExists = await this.lecturerService.findKetuaProdiByMajorId(user.major.id);

      if (isKetuaProdiExists && role === Role.KETUA_PRODI) {
        throw new Exception('Koordinator program studi untuk jurusan ini telah terdaftar');
      }
    }

    userRequest.major = newMajor ? newMajor : user.major;
    userRequest.role = role;

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

        await this.lecturerService.update(userRequest);

        // delete old "attachment" record from Attachment table
        await this.attachmentService.delete(oldUserProfilePictureId);

        // remove "attachment" file from "/uploads/documents"
        let oldFilePath = `./uploads/documents/${oldUserProfilePictureFileName}`;
        fs.unlinkSync(oldFilePath);

        return {
          message: 'Successfully updated lecturer',
        };
      } else {
        throw new NotFoundException('Profile_picture not found');
      }
    }

    await this.lecturerService.update(userRequest);

    return {
      message: 'Successfully updated lecture',
    };
  }

  @Get(':lecturerId')
  async getLecturerById(@Param('lecturerId', ParseIntPipe) lecturerId: number) {
    let lecturer = await this.lecturerService.findByIdWithExceptionMessage(
      lecturerId,
      'lecturer_id is not valid'
    );

    const {
      id,
      created_at,
      updated_at,
      first_name,
      last_name,
      email,
      registration_number,
      gender,
      birthdate,
      phone_number,
      role,
      major,
    } = lecturer;

    let result = {
      id,
      created_at,
      updated_at,
      first_name,
      last_name,
      email,
      registration_number,
      gender,
      gender_in_string: Gender[gender],
      birthdate,
      phone_number,
      role,
      role_in_string: Role[role],

      major: {
        id: major?.id,
        code: major?.code,
        name: major?.name,
      },
    };

    return result;
  }

  @Get(':lecturerId/thesis-advisor-students')
  async getStudentsByLecturerId(
    @Param('lecturerId', ParseIntPipe) lecturerId: number,
    @Query() query
  ) {
    const { page, limit } = query;

    await this.lecturerService.findById(lecturerId);

    let params = {
      page,
      limit,
      thesis_advisor_id: lecturerId,
    };

    let [students, count] = await this.userService.getUsers(params);

    let result = students.map((x) => {
      delete x.password;

      return {
        ...x,
        gender_in_string: Gender[x.gender],
      };
    });

    return {
      data: result,
      count,
    };
  }

  @UseGuards(IsValidLecturerGuard('params'))
  @Delete(':lecturerId')
  async deleteLecturer(@Req() req) {
    try {
      await this.lecturerService.delete(req.lecturer.id);

      return {
        message: 'Successfully deleted Lecturer data',
      };
    } catch (err) {
      if (err.errno === 1451 || err.errno === 1217) {
        throw new Exception('Cannot delete this data as it is being used in other transaction');
      }

      throw new Exception(err.sqlMessage);
    }
  }
}
