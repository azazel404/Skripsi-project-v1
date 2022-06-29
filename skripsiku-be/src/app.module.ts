import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import { DatasourceModule } from './datasource/datasource.module';
import { UploadModule } from './upload/upload.module';
import { AttachmentModule } from './attachment/attachment.module';
import { ConfigModule } from '@nestjs/config';
import { MajorModule } from './major/major.module';
import { AdminModule } from './admin/admin.module';
import { StageModule } from './stage/stage.module';
import { UserApproverModule } from './user-approver/user-approver.module';
import { SubmissionModule } from './submission/submission.module';
import { SubmissionAttachmentModule } from './submission-attachment/submission-attachment.module';
import { SubmissionApprovalModule } from './submission-approval/submission-approval.module';
import { LecturerModule } from './lecturer/lecturer.module';
import { ErepositoryModule } from './erepository/erepository.module';
import { CommentModule } from './comment/comment.module';
import { SubmissionPeriodModule } from './submission-period/submission-period.module';
import { SubmissionApprovalDetailModule } from './submission-approval-detail/submission-approval-detail.module';
import { join } from 'path';
import { AbstractSubmissionModule } from './abstract-submission/abstract-submission.module';
import { AbstractSubmissionApprovalDetailModule } from './abstract-submission-approval-detail/abstract-submission-approval-detail.module';
import { AbstractSubmissionApprovalModule } from './abstract-submission-approval/abstract-submission-approval.module';
import { ClassOfModule } from './class-of/class-of.module';
import { UserAbstractApproverModule } from './user-abstract-approver/user-abstract-approver.module';
import { SubmissionAttachmentApproverModule } from './submission-attachment-approver/submission-attachment-approver.module';
import { AnnouncementModule } from './announcement/announcement.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'), // added ../ to get one folder back
      serveRoot: '/uploads/' //last slash was important
    }),
    TypeOrmModule.forRoot({}),
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 50,
    }),
    ConfigModule.forRoot(),
    UserModule,
    DatasourceModule,
    UploadModule,
    AttachmentModule,
    MajorModule,
    AdminModule,
    StageModule,
    UserApproverModule,
    SubmissionModule,
    SubmissionAttachmentModule,
    SubmissionApprovalModule,
    LecturerModule,
    ErepositoryModule,
    CommentModule,
    SubmissionPeriodModule,
    SubmissionApprovalDetailModule,
    AbstractSubmissionModule,
    AbstractSubmissionApprovalDetailModule,
    AbstractSubmissionApprovalModule,
    ClassOfModule,
    UserAbstractApproverModule,
    SubmissionAttachmentApproverModule,
    AnnouncementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
