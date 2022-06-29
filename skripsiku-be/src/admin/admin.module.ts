import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from 'src/user/user.module';
import { MajorModule } from 'src/major/major.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserApproverModule } from 'src/user-approver/user-approver.module';

@Module({
  imports: [UserModule, MajorModule, AuthModule, UserApproverModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
