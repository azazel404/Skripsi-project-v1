import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { majors, users, stages } from './base/seed';
import { MajorService } from './major/major.service';
import { Major } from './major/major.entity';
import { StageService } from './stage/stage.service';
import { Stage } from './stage/stage.entity';
import { Role } from './../enums/Role.enum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private majorService: MajorService,
    private stageService: StageService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('seed')
  async seed(@Res() response): Promise<any> {
    // Major - Major - Major
    majors.forEach(async (major) => {
      let result = await this.majorService.findOne(major);

      if (!result) {
        const newMajor = new Major();
        newMajor.code = major.code;
        newMajor.name = major.name;

        await this.majorService.create(newMajor);
      }
    });

    // User - User - User
    users.forEach(async (user) => {
      let result = await this.userService.findOne({
        email: user.email,
      });

      if (!result) {
        let newUser = new User();
        newUser.email = user.email;
        newUser.password = user.password;
        newUser.birthdate = user.birthdate;
        newUser.gender = user.gender;
        newUser.first_name = user.first_name;
        newUser.last_name = user.last_name;
        newUser.registration_number = user.registration_number;
        newUser.class_of = user.class_of;
        newUser.phone_number = user.phone_number;

        let major = await this.majorService.findOne({ code: user.major });
        newUser.major = major;
        newUser.role = Role.ADMIN;

        await this.userService.create(newUser);
      }
    });

    // Stage - Stage - Stage
    stages.forEach(async (stage) => {
      let result = await this.stageService.findOne({
        code: stage.code,
      });

      if (!result) {
        let newStage = new Stage();
        newStage.code = stage.code;
        newStage.name = stage.name;

        await this.stageService.create(newStage);
      }
    });

    return response.status(HttpStatus.OK).send({
      message: 'Seed Successfully',
    });
  }
}
