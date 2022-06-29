import { forwardRef, Module } from '@nestjs/common';
import { UserAbstractApproverService } from './user-abstract-approver.service';
import { UserAbstractApproverController } from './user-abstract-approver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAbstractApprover } from './user-abstract-approver.entity';
import { UserModule } from 'src/user/user.module';
import { LecturerModule } from 'src/lecturer/lecturer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAbstractApprover]),
    forwardRef(() => UserModule),
    LecturerModule,
  ],
  providers: [UserAbstractApproverService],
  controllers: [UserAbstractApproverController],
  exports: [TypeOrmModule, UserAbstractApproverService],
})
export class UserAbstractApproverModule {}
