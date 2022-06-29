import { JwtStrategy } from './jwt.strategy';
import { constants } from './constants';
import { UserModule } from './../user/user.module';

import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { RoleModule } from 'src/role/role.module';
import { UploadModule } from 'src/upload/upload.module';
import { AttachmentModule } from 'src/attachment/attachment.module';
import { MajorModule } from 'src/major/major.module';
import { LecturerModule } from 'src/lecturer/lecturer.module';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UserModule,
    LecturerModule,
    PassportModule,
    JwtModule.register({
      secret: constants.jwtSecret,
      signOptions: { expiresIn: '300m' },
    }),
    // RoleModule,
    UploadModule,
    AttachmentModule,
    MajorModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
