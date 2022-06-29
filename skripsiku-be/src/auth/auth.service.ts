import { User } from '../user/user.entity';
import { Lecturer } from 'src/lecturer/lecturer.entity';
import { LecturerService } from 'src/lecturer/lecturer.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GetProfileRequestModel } from './model/auth.model';
import { Gender } from 'enums/Gender.enum';
import { Role } from 'enums/Role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private lecturerService: LecturerService,
    private jwtService: JwtService
  ) {}

  // async register();

  async validateUser(username: string, password: string): Promise<any> {
    let checkAdmin = await this.userService.findOne({ registration_number: username, role: 10 });
    let checkStudent = await this.userService.findOne({ registration_number: username, role: 20 });
    let checkDekan = await this.userService.findOne({ registration_number: username, role: 40 });
    let checkLecturer = await this.lecturerService.findOne({
      registration_number: username,
      role: 30,
    });
    let checkKetuaProdi = await this.lecturerService.findOne({
      registration_number: username,
      role: 50,
    });

    if (checkAdmin) {
      const isMatch = await bcrypt.compare(password, checkAdmin.password);
      if (isMatch) {
        const { password, ...rest } = checkAdmin;
        return rest;
      }
    } else if (checkStudent) {
      //  console.log("checkStudent",checkStudent)
      const isMatch = await bcrypt.compare(password, checkStudent.password);
      if (isMatch) {
        const { password, ...rest } = checkStudent;

        return rest;
      }
    } else if (checkDekan) {
      //  console.log("checkDekan",checkDekan)
      const isMatch = await bcrypt.compare(password, checkDekan.password);
      if (isMatch) {
        const { password, ...rest } = checkDekan;

        return rest;
      }
    } else if (checkKetuaProdi) {
      //  console.log("checkKetuaProdi",checkKetuaProdi)
      const isMatch = await bcrypt.compare(password, checkKetuaProdi.password);
      if (isMatch) {
        const { password, ...rest } = checkKetuaProdi;

        return rest;
      }
    } else if (checkLecturer) {
      //  console.log("checkLecturer",checkLecturer)
      const isMatch = await bcrypt.compare(password, checkLecturer.password);
      if (isMatch) {
        const { password, ...rest } = checkLecturer;

        return rest;
      }
    } else {
      return null;
    }
  }

  async login(user: any) {
    let getProfilePayload = new GetProfileRequestModel();
    getProfilePayload.user_id = user.id;
    getProfilePayload.username = user.registration_number;

    const profile = await this.getProfile(getProfilePayload);

    const payload = {
      username: user.registration_number,
      sub: user.id,
      role: profile.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      data: profile,
    };
  }

  //   async loginLecture(user: any) {
  //    console.log("user",user)
  //     let getProfilePayload = new GetProfileRequestModel();
  //     // // getProfilePayload.user_id = user.id;
  //     // // getProfilePayload.username = user.registration_number;

  //     // const profile = await this.getProfile(getProfilePayload);

  //     // const payload = {
  //     //   username: user.registration_number,
  //     //   sub: user.id,
  //     // };

  //     // return {
  //     //   access_token: this.jwtService.sign(payload),
  //     //   data : profile
  //     // };
  //   }

  async getProfile(user: GetProfileRequestModel, requestObject = null) {
    let currentUser;

    let checkAdmin = await this.userService.findOne({
      registration_number: user.username,
      role: 10,
    });

    let checkDekan = await this.userService.findOne({
      registration_number: user.username,
      role: 40,
    });

    let checkStudent = await this.userService.findOne({
      registration_number: user.username,
      role: 20,
    });

    let checkLecturer = await this.lecturerService.findOne({
      registration_number: user.username,
      role: 30,
    });

    let checkKetuaProdi = await this.lecturerService.findOne({
      registration_number: user.username,
      role: 50,
    });

    if (checkAdmin) {
      currentUser = checkAdmin;
    } else if (checkDekan) {
      currentUser = checkDekan;
    } else if (checkStudent) {
      currentUser = checkStudent;
    } else if (checkKetuaProdi) {
      currentUser = checkKetuaProdi;
    } else if (checkLecturer) {
      currentUser = checkLecturer;
    }

    let attachmentPath = null;

    if (requestObject) {
      attachmentPath = `${requestObject.protocol}://${requestObject.headers.host}/uploads/images/`;
    }

    let profile_picture;

    if (currentUser && currentUser.profile_picture) {
      profile_picture = {
        id: currentUser.profile_picture.id,
        file_name: attachmentPath + currentUser.profile_picture.file_name,
      };
    }

    let profile = {
      id: currentUser?.id,
      email: currentUser?.email,
      first_name: currentUser?.first_name,
      last_name: currentUser?.last_name,
      registration_number: currentUser?.registration_number,
      class_of: currentUser?.class_of,
      gender: currentUser?.gender,
      genderInString: Gender[currentUser?.gender],
      birthdate: currentUser?.birthdate,
      phone_number: currentUser?.phone_number,
      major_id: currentUser?.major?.id,
      major: {
        id: currentUser?.major?.id,
        code: currentUser?.major?.code,
        name: currentUser?.major?.name,
      },
      role: currentUser.role,
      roleInString: Role[currentUser?.role],
      thesis_advisor: {
        id: currentUser?.thesis_advisor_id?.id,
        created_at: currentUser?.thesis_advisor_id?.created_at,
        updated_at: currentUser?.thesis_advisor_id?.updated_at,
        first_name: currentUser?.thesis_advisor_id?.first_name,
        last_name: currentUser?.thesis_advisor_id?.last_name,
        email: currentUser?.thesis_advisor_id?.email,
        registration_number: currentUser?.thesis_advisor_id?.registration_number,
        gender: currentUser?.thesis_advisor_id?.gender,
        birthdate: currentUser?.thesis_advisor_id?.birthdate,
        phone_number: currentUser?.thesis_advisor_id?.phone_number,
        role: currentUser?.thesis_advisor_id?.role,
        role_in_string: Role[currentUser?.thesis_advisor_id?.role],
      },
      profile_picture,
    };

    return profile;
  }
}
