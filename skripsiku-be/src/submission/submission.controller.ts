import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Put,
  Query,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateSubmissionDTO } from './dto/submission.dto';
import { Submission } from './submission.entity';
import { SubmissionService } from './submission.service';
import { SubmissionStatus } from './../../enums/SubmissionStatus.enum';
import { Gender } from 'enums/Gender.enum';
import { Stage } from 'enums/Stage.enum';
import { SubmissionStage } from 'enums/SubmissionStage.enum';
import { SubmissionAttachmentService } from 'src/submission-attachment/submission-attachment.service';
import { SubmissionAttachment } from 'src/submission-attachment/submission-attachment.entity';
import { SubmissionAttachmentStatus } from 'enums/SubmissionAttachmentStatus.enum';
import { SubmissionAttachmentStage } from 'enums/SubmissionAttachmentStage.enum';

@Controller('submission')
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly userService: UserService,
    private readonly submissionAttachmentService: SubmissionAttachmentService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSubmission(@Body() body: CreateSubmissionDTO) {
    const { title, user_id } = body;

    let user = await this.userService.findById(user_id);

    if (!user.thesis_advisor_id) {
      throw new ForbiddenException('Akun ini belum memiliki dosen pembimbing');
    }

    let newSubmission = new Submission();
    newSubmission.title = title;
    newSubmission.user = user;
    newSubmission.stage = SubmissionStage.ENTRY;
    newSubmission.status = SubmissionStatus.SUBMITTED;

    let createdSubmission = await this.submissionService.create(newSubmission);

    let newSubmissionAttachment = new SubmissionAttachment();
    newSubmissionAttachment.status = SubmissionAttachmentStatus.SUBMITTED;
    newSubmissionAttachment.stage = SubmissionAttachmentStage.ENTRY;
    newSubmissionAttachment.date = null;
    newSubmissionAttachment.start_time = null;
    newSubmissionAttachment.location = null;
    newSubmissionAttachment.attachment = null;
    newSubmissionAttachment.submission = createdSubmission;

    await this.submissionAttachmentService.create(newSubmissionAttachment);

    return {
      message: 'Successfully created submission',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':submissionId')
  async updateSubmission(@Param('submissionId', ParseIntPipe) submissionId: number, @Body() body) {
    const { title, stage, status, user_id } = body;

    let submission = await this.submissionService.getById(submissionId);

    if (title) {
      submission.title = title;
    }

    if (stage >= 0) {
      submission.stage = stage;
    }

    if (status) {
      submission.status = status;
    }

    if (user_id) {
      let user = await this.userService.findById(user_id);

      submission.user = user;
    }

    await this.submissionService.update(submission);

    return {
      message: 'Successfully updated submission',
    };
  }

  @Get(':submissionId')
  async getSubmissionById(@Param('submissionId', ParseIntPipe) submissionId: number, @Req() req) {
    let submission = await this.submissionService.getById(submissionId);

    const { stage, user } = submission;

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/images/`;

    let profile_picture = null;

    if (user.profile_picture) {
      profile_picture = {
        id: user.profile_picture.id,
        file_name: attachmentPath + user.profile_picture.file_name,
      };
    }

    let latest_stage = await this.submissionAttachmentService.getLatestStageBySubmissionId(
      submissionId
    );

    let result = {
      ...submission,
      status_in_string: SubmissionStatus[submission.status],
      stage_in_string: Stage[stage],
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        registration_number: user.registration_number,
        major: {
          id: user.major?.id,
          code: user.major?.code,
          name: user.major?.name,
        },
        profile_picture,
        thesis_advisor_id: user.thesis_advisor_id?.id,
        thesis_advisor: {
          id: user.thesis_advisor_id?.id,
          first_name: user.thesis_advisor_id?.first_name,
          last_name: user.thesis_advisor_id?.last_name,
        },
      },
      latest_stage,
    };

    return result;
  }

  @Get()
  async getSubmissions(@Query() query) {
    const { page, limit, registration_number, first_name } = query;

    let params = {
      page,
      limit,
      registration_number,
      first_name,
    };

    let [data, count] = await this.submissionService.getSubmissions(params);

    let result = data.map((x) => {
      const { user } = x;

      return {
        ...x,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          registration_number: user.registration_number,
          class_of: user.class_of,
          gender: user.gender,
          gender_in_string: Gender[user.gender],
          phone_number: user.phone_number,
        },
        stage_in_string: SubmissionStage[x.stage],
        status_in_string: SubmissionStatus[x.status],
      };
    });

    return {
      data: result,
      count,
    };
  }

  @Get('user/:userId')
  async getSubmissionsByUserId(
    @Query() query,
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req
  ) {
    const { page, limit } = query;

    let params = {
      page,
      limit,
      userId,
    };

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/images/`;

    let [data, count] = await this.submissionService.getSubmissionsByUserId(params);

    let result = data.map((x) => {
      const { user } = x;

      let profile_picture = null;

      if (user.profile_picture) {
        profile_picture = {
          id: user.profile_picture.id,
          file_name: attachmentPath + user.profile_picture.file_name,
        };
      }

      return {
        ...x,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          registration_number: user.registration_number,
          class_of: user.class_of,
          gender: user.gender,
          gender_in_string: Gender[user.gender],
          phone_number: user.phone_number,
          profile_picture,
        },
        stage_in_string: SubmissionStage[x.stage],
        status_in_string: SubmissionStatus[x.status],
      };
    });

    return {
      data: result,
      count,
    };
  }
}
