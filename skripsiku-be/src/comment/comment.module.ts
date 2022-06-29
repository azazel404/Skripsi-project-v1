import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { UserModule } from 'src/user/user.module';
import { LecturerModule } from 'src/lecturer/lecturer.module';
import { AttachmentModule } from 'src/attachment/attachment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, LecturerModule, AttachmentModule],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
