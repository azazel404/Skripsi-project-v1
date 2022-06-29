import { LecturerModule } from './../lecturer/lecturer.module';
import { forwardRef, Module } from '@nestjs/common';
import { UserApproverService } from './user-approver.service';
import { UserApproverController } from './user-approver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserApprover } from './user-approver.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserApprover]), forwardRef(() => UserModule), LecturerModule],
  providers: [UserApproverService],
  controllers: [UserApproverController],
  exports: [TypeOrmModule, UserApproverService],
})
export class UserApproverModule {}
