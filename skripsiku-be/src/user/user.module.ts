import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { forwardRef, Module } from '@nestjs/common';
import { MajorModule } from 'src/major/major.module';
import { AuthModule } from 'src/auth/auth.module';
import { LecturerModule } from 'src/lecturer/lecturer.module';
import { UserApproverModule } from 'src/user-approver/user-approver.module';
import { AttachmentModule } from 'src/attachment/attachment.module';
import { UserAbstractApproverModule } from 'src/user-abstract-approver/user-abstract-approver.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MajorModule,
    forwardRef(() => AuthModule),
    LecturerModule,
    UserApproverModule,
    AttachmentModule,
    UserAbstractApproverModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
