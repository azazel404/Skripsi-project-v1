import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  InternalServerErrorException,
  NotFoundException,
  Query,
  Delete,
} from '@nestjs/common';
import { AbstractSubmissionApprovalStatus } from 'enums/AbstractSubmissionApproval.enum';
import { AbstractSubmissionStatus } from 'enums/AbstractSubmissionStatus.enum';
import { Gender } from 'enums/Gender.enum';
import { AbstractSubmissionApprovalDetailService } from 'src/abstract-submission-approval-detail/abstract-submission-approval-detail.service';
import { AbstractSubmissionApproval } from 'src/abstract-submission-approval/abstract-submission-approval.entity';
import { AbstractSubmissionApprovalService } from 'src/abstract-submission-approval/abstract-submission-approval.service';
import { Attachment } from 'src/attachment/attachment.entity';
import { AttachmentService } from 'src/attachment/attachment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Exception } from 'src/base/base.exception';
import { ErepositoryService } from 'src/erepository/erepository.service';
import { IsValidAbstractSubmissionGuard } from 'src/is-valid-abstract-submission.guard';
import { IsValidSubmissionPeriodGuard } from 'src/is-valid-submission-period.guard';
import { UserAbstractApproverService } from 'src/user-abstract-approver/user-abstract-approver.service';
import { UserService } from 'src/user/user.service';
import { AbstractSubmission } from './abstract-submission.entity';
import { AbstractSubmissionService } from './abstract-submission.service';
const fs = require('fs');

@UseGuards(JwtAuthGuard)
@Controller('abstract-submission')
export class AbstractSubmissionController {
  constructor(
    private readonly abstractSubmissionService: AbstractSubmissionService,
    private readonly userService: UserService,
    private readonly attachmentService: AttachmentService,
    private readonly abstractSubmissionApprovalService: AbstractSubmissionApprovalService,
    private readonly abstractSubmissionApprovalDetailService: AbstractSubmissionApprovalDetailService,
    private readonly userAbstractApproverService: UserAbstractApproverService,
    private readonly erepositoryService: ErepositoryService
  ) {}

  @UseGuards(IsValidSubmissionPeriodGuard('body'))
  @Post()
  async createAbstractSubmission(@Body() body, @Req() req) {
    const { title, sequence, file_name } = body;

    let erepositoryExist = await this.erepositoryService.findOneByName(title);

    if (erepositoryExist) {
      throw new Exception('An Erepository data with this name has already existed.');
    }

    let user = await this.userService.findById(req.user.user_id);

    let createdNewAttachment;

    if (file_name) {
      let path = `./uploads/documents/${file_name}`;

      let pathExists = fs.existsSync(path);

      if (pathExists) {
        let oldPath = path;
        let newPath = `./uploads/documents/${file_name}`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw new InternalServerErrorException();
          }
        });

        let newAttachment = new Attachment();

        newAttachment.file_name = file_name;
        createdNewAttachment = await this.attachmentService.create(newAttachment);
      } else {
        throw new NotFoundException('File_name not found');
      }
    }

    let newAbstractSubmission = new AbstractSubmission();

    newAbstractSubmission.title = title;
    newAbstractSubmission.sequence = sequence;
    newAbstractSubmission.status = AbstractSubmissionStatus.SUBMITTED;
    newAbstractSubmission.user = user;
    newAbstractSubmission.attachment = createdNewAttachment;
    newAbstractSubmission.submission_period = req.submissionPeriod;

    let createdAbstractSubmission = await this.abstractSubmissionService.create(
      newAbstractSubmission
    );

    let newAbstractSubmissionApproval = new AbstractSubmissionApproval();
    newAbstractSubmissionApproval.status = AbstractSubmissionApprovalStatus.SUBMITTED;
    newAbstractSubmissionApproval.abstract_submission = createdAbstractSubmission;

    let createdAbstractSubmissionApproval = await this.abstractSubmissionApprovalService.create(
      newAbstractSubmissionApproval
    );

    let abstractApprovers = await this.userAbstractApproverService.getAllAbstractApproversByUser(
      user
    );

    let params = {
      abstractApprovers,
      createdAbstractSubmissionApproval,
    };

    await this.abstractSubmissionApprovalDetailService.bulkCreate(params);

    return {
      message: 'Successfully created Abstract Submission data',
    };
  }

  @Get()
  async getAllAbstractSubmission(@Query() query, @Req() req) {
    const {
      page,
      limit,
      submission_period_id,
      user_id,
      major_id,
      name,
      registration_number,
      transaction_date,
    } = query;

    const params = {
      page,
      limit,
      submission_period_id,
      user_id,
      major_id,
      name,
      registration_number,
      transaction_date,
    };

    let [result, count] = await this.abstractSubmissionService.getAll(params);

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/documents/`;

    let data = result.map((x) => {
      const { user, submission_period } = x;

      return {
        ...x,
        status_in_string: AbstractSubmissionStatus[x.status],
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          registration_number: user.registration_number,
          gender: user.gender,
          gender_in_string: Gender[user.gender],
        },
        submission_period: {
          id: submission_period.id,
          start_date: submission_period.start_date,
          end_date: submission_period.end_date,
          class_of: submission_period.class_of,
        },
        attachment: {
          id: x.attachment?.id,
          file_name: attachmentPath + x.attachment?.file_name,
        },
      };
    });

    return {
      data,
      count,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('rate')
  async getSubmissionRate(@Query() query) {
    const { majorId, submissionPeriodId } = query;

    let params = {
      majorId,
      submissionPeriodId,
    };

    let result = await this.abstractSubmissionService.getSubmissionRate(params);

    return {
      rate: result,
    };
  }

  @UseGuards(IsValidAbstractSubmissionGuard('params'))
  @Get(':abstractSubmissionId')
  async getAbstractSubmissionByID(@Req() req) {
    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/documents/`;

    let abstractSubmission = req.abstractSubmission;

    const {
      id,
      created_at,
      updated_at,
      title,
      status,
      sequence,
      user,
      attachment,
      submission_period,
    } = abstractSubmission;

    let profile_picture = null;
    let attachmentData = null;

    if (user && user.profile_picture) {
      profile_picture = {
        id: user.profile_picture.id,
        file_name: attachmentPath + user.profile_picture.file_name,
      };
    }

    if (attachment) {
      attachmentData = {
        id: attachment.id,
        file_name: attachmentPath + attachment.file_name,
      };
    }

    let result = {
      id,
      created_at,
      updated_at,
      title,
      status,
      status_in_string: AbstractSubmissionStatus[status],
      sequence,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        registration_number: user.registration_number,
        class_of: user.class_of,
        gender: user.gender,
        gender_in_string: Gender[user.gender],
        profile_picture,
        major: {
          id: user.major?.id,
          code: user.major?.code,
          name: user.major?.name,
        },
      },
      attachment: attachmentData,
      submission_period: {
        id: submission_period.id,
        start_date: submission_period.start_date,
        end_date: submission_period.end_date,
        class_of: submission_period.class_of,
      },
    };

    return result;
  }

  @UseGuards(IsValidAbstractSubmissionGuard('params'))
  @Delete(':abstractSubmissionId')
  async deleteAbstractSubmission(@Req() req) {
    try {
      await this.abstractSubmissionService.delete(req.abstractSubmission);
    } catch (err) {
      if (err.errno === 1451) {
        throw new Exception('Cannot delete this data as it is being used in other transaction');
      }
    }

    return {
      message: 'Successfully deleted Abstract Submission data',
    };
  }
}
