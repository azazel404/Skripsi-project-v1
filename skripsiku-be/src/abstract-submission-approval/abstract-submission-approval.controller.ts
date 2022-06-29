import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AbstractSubmissionApprovalStatus } from 'enums/AbstractSubmissionApproval.enum';
import { AbstractSubmissionApprovalDetailStatus } from 'enums/AbstractSubmissionApprovalDetailStatus.enum';
import { AbstractSubmissionStatus } from 'enums/AbstractSubmissionStatus.enum';
import { Gender } from 'enums/Gender.enum';
import { query } from 'express';
import { AbstractSubmissionApprovalDetailService } from 'src/abstract-submission-approval-detail/abstract-submission-approval-detail.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsValidAbstractSubmissionApprovalGuard } from 'src/is-valid-abstract-submission-approval.guard';
import { UpdateAbstractSubmissionApprovalDTO } from './abstract-submission-approval.dto';
import { AbstractSubmissionApprovalService } from './abstract-submission-approval.service';

@UseGuards(JwtAuthGuard)
@Controller('abstract-submission-approval')
export class AbstractSubmissionApprovalController {
  constructor(
    private readonly abstractSubmissionApprovalService: AbstractSubmissionApprovalService,
    private readonly abstractSubmissionApprovalDetailService: AbstractSubmissionApprovalDetailService
  ) {}

  @Get()
  async getAll(@Query() query) {
    let params = {
      abstractSubmissionId: query.abstractSubmissionId,
    };

    let result = await this.abstractSubmissionApprovalService.getAll(params);

    let data = result.map((x) => {
      const { status, abstract_submission } = x;

      return {
        ...x,
        status_in_string: AbstractSubmissionApprovalStatus[status],
        abstract_submission: {
          id: abstract_submission.id,
          title: abstract_submission.title,
          status: abstract_submission.status,
          status_in_string: AbstractSubmissionStatus[abstract_submission.status],
          sequence: abstract_submission.sequence,
        },
      };
    });

    return {
      data,
    };
  }

  @UseGuards(IsValidAbstractSubmissionApprovalGuard('params'))
  @Put(':abstractSubmissionApprovalId')
  async update(@Req() req, @Body() body: UpdateAbstractSubmissionApprovalDTO) {
    let abstractSubmissionApproval = req.abstractSubmissionApproval;
    abstractSubmissionApproval.status = body.status;

    await this.abstractSubmissionApprovalService.update(abstractSubmissionApproval);

    return {
      message: 'Successfully updated Abstract Submission Approval data',
    };
  }

  @Get(':abstractSubmissionApprovalId/abstract-submission-approval-detail')
  async getAbstractSubmissionApprovalDetailByAbstractSubmissionApprovalId(
    @Query() query,
    @Req() req,
    @Param('abstractSubmissionApprovalId', ParseIntPipe) abstractSubmissionApprovalId: number
  ) {
    const { isActionTaken } = query;

    let params = {
      isActionTaken,
      abstractSubmissionApprovalId,
    };

    let result = await this.abstractSubmissionApprovalDetailService.getAll(params);

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/images/`;

    let data = result.map((x) => {
      const { status, lecturer, abstract_submission_approval } = x;

      let profile_picture = null;

      if (lecturer.profile_picture) {
        profile_picture = {
          id: lecturer.profile_picture.id,
          file_name: attachmentPath + lecturer.profile_picture.file_name,
        };
      }

      return {
        ...x,
        status_in_string: AbstractSubmissionApprovalDetailStatus[status],
        lecturer_id: lecturer.id,
        lecturer: {
          id: lecturer.id,
          first_name: lecturer.first_name,
          last_name: lecturer.last_name,
          email: lecturer.email,
          registration_number: lecturer.registration_number,
          gender: lecturer.gender,
          gender_in_string: Gender[lecturer.gender],
          major: {
            id: lecturer.major?.id,
            code: lecturer.major?.code,
            name: lecturer.major?.name,
          },
          profile_picture,
        },
        abstract_submission_approval: {
          id: abstract_submission_approval.id,
          status: abstract_submission_approval.status,
          status_in_string: AbstractSubmissionApprovalStatus[abstract_submission_approval.status],
        },
      };
    });

    return data;
  }
}
