import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ForbiddenException,
  NotFoundException,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CommentSender } from 'enums/CommentSender.enum';
import { Gender } from 'enums/Gender.enum';
import { Role } from 'enums/Role.enum';
import { Attachment } from 'src/attachment/attachment.entity';
import { AttachmentService } from 'src/attachment/attachment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Exception } from 'src/base/base.exception';
import { LecturerService } from 'src/lecturer/lecturer.service';
import { UserService } from 'src/user/user.service';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
const fs = require('fs');
@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly lecturerService: LecturerService,
    private readonly attachmentService: AttachmentService
  ) {}

  @Post('to-thesis-advisor')
  async create(@Body() body, @Req() req) {
    const user = await this.userService.findById(req.user.user_id);

    if (user.role !== Role.STUDENT) {
      throw new ForbiddenException('Only Student can access this API endpoint');
    }

    const lecturer = await this.lecturerService.findById(user.thesis_advisor_id.id);

    let newComment = new Comment();

    let createdNewAttachment;

    if (body.file_name) {
      let path = `./uploads/images/${body.file_name}`;

      let pathExists = fs.existsSync(path);

      if (pathExists) {
        let oldPath = path;
        let newPath = `./uploads/documents/${body.file_name}`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw new Exception('Internal server error');
          }
        });

        let newAttachment = new Attachment();

        newAttachment.file_name = body.file_name;

        createdNewAttachment = await this.attachmentService.create(newAttachment);

        newComment.attachment = createdNewAttachment;
      } else {
        throw new NotFoundException('File_name not found');
      }
    }

    newComment.user = user;
    newComment.lecturer = lecturer;
    newComment.sender = CommentSender.Student;
    newComment.note = body.note;

    await this.commentService.create(newComment);

    return {
      message: 'Successfully created comment',
    };
  }

  @Post('to-student/:studentId')
  async createCommentToStudent(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Req() req,
    @Body() body
  ) {
    const user = await this.lecturerService.findOne({
      registration_number: req.user.username,
    });

    if (!user) {
      throw new Exception('Login User not found');
    }

    if (user.role !== Role.LECTURER) {
      throw new ForbiddenException('Only Lecturer can access this API endpoint');
    }

    const student = await this.userService.findById(studentId);
    const lecturer = await student.thesis_advisor_id;

    if (user.registration_number !== lecturer.registration_number) {
      throw new ForbiddenException(
        "You arenot the provided Student's Thesis Advisor. You arenot allowed to create this comment"
      );
    }

    let newComment = new Comment();

    let createdNewAttachment;

    if (body.file_name) {
      let path = `./uploads/images/${body.file_name}`;

      let pathExists = fs.existsSync(path);

      if (pathExists) {
        let oldPath = path;
        let newPath = `./uploads/documents/${body.file_name}`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw new Exception('Internal server error');
          }
        });

        let newAttachment = new Attachment();

        newAttachment.file_name = body.file_name;

        createdNewAttachment = await this.attachmentService.create(newAttachment);

        newComment.attachment = createdNewAttachment;
      } else {
        throw new NotFoundException('File_name not found');
      }
    }

    newComment.user = student;
    newComment.lecturer = user;
    newComment.note = body.note;
    newComment.sender = CommentSender.Lecturer;

    await this.commentService.create(newComment);

    return {
      message: 'Successfully created comment',
    };
  }


  @Get('history')
  async getHistorComment(@Query() query, @Req() req){
    const {  user_id, lecturer_id } = query;

    let params = {
      user_id,
      lecturer_id,
    };

    let [data] =  await this.commentService.getHistoryComment(params);
    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/documents/`;

   let result = data.map((x) => {
      const { attachment, user, lecturer } = x;

      let newAttachment = attachment
        ? {
            id: attachment.id,
            file_name: attachmentPath + attachment.file_name,
          }
        : null;

      return {
        ...x,
        attachment: newAttachment,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          registration_number: user.registration_number,
          gender: user.gender,
          gender_in_string: Gender[user.gender],
        },
        lecturer: {
          id: lecturer.id,
          first_name: lecturer.first_name,
          last_name: lecturer.last_name,
          email: lecturer.email,
          registration_number: lecturer.registration_number,
          gender: lecturer.gender,
          gender_in_string: Gender[lecturer.gender],
        },
      };
    });

    return result
  }

  @Get()
  async getComments(@Query() query, @Req() req) {
    const { page, limit, user_id, lecturer_id } = query;

    let params = {
      page,
      limit,
      user_id,
      lecturer_id,
    };

    let [data, count] = await this.commentService.getComments(params);

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/documents/`;

    let result = data.map((x) => {
      const { attachment, user, lecturer } = x;

      let newAttachment = attachment
        ? {
            id: attachment.id,
            file_name: attachmentPath + attachment.file_name,
          }
        : null;

      return {
        ...x,
        attachment: newAttachment,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          registration_number: user.registration_number,
          gender: user.gender,
          gender_in_string: Gender[user.gender],
        },
        lecturer: {
          id: lecturer.id,
          first_name: lecturer.first_name,
          last_name: lecturer.last_name,
          email: lecturer.email,
          registration_number: lecturer.registration_number,
          gender: lecturer.gender,
          gender_in_string: Gender[lecturer.gender],
        },
      };
    });

    return {
      data: result,
      count,
    };
  }

  @Delete(':commentId')
  async delete(@Param('commentId', ParseIntPipe) commentId: number) {
    await this.commentService.delete(commentId);

    return {
      message: 'Successfully deleted comment',
    };
  }
}
