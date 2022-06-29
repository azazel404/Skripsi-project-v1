import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'enums/Role.enum';
import { SubmissionApprovalDetailStatus } from 'enums/SubmissionApprovalDetailStatus.enum';
import { SubmissionApprovalStage } from 'enums/SubmissionApprovalStage.enum';
import { SubmissionApprovalStatus } from 'enums/SubmissionApprovalStatus.enum';
import { SubmissionAttachmentStatus } from 'enums/SubmissionAttachmentStatus.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Exception } from 'src/base/base.exception';
import { SubmissionApprovalService } from 'src/submission-approval/submission-approval.service';
import { SubmissionAttachmentService } from 'src/submission-attachment/submission-attachment.service';
import { SubmissionApprovalDetailService } from './submission-approval-detail.service';

@UseGuards(JwtAuthGuard)
@Controller('submission-approval-detail')
export class SubmissionApprovalDetailController {
  constructor(
    private readonly submissionApprovalDetailService: SubmissionApprovalDetailService,
    private readonly submissionApprovalService: SubmissionApprovalService,
    private readonly submissionAttachmentService: SubmissionAttachmentService
  ) {}

  @Get()
  async getAll(@Query() query, @Req() req) {
    const { isActionTaken, submission_approval_id } = query;

    let params = {
      isActionTaken,
      submission_approval_id,
    };

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/images/`;

    let [result, count] = await this.submissionApprovalDetailService.getAll(params);

    let data = result.map((x) => {
      const { lecturer, submission_approval } = x;

      let lecturerProfilePicture = null;

      if (lecturer.profile_picture) {
        lecturerProfilePicture = {
          id: lecturer.profile_picture.id,
          file_name: attachmentPath + lecturer.profile_picture.file_name,
        };
      }

      return {
        ...x,
        lecturer: {
          id: lecturer.id,
          first_name: lecturer.first_name,
          last_name: lecturer.last_name,
          email: lecturer.email,
          registration_number: lecturer.registration_number,
          profile_picture: lecturerProfilePicture,
          major: {
            id: lecturer.major.id,
            code: lecturer.major.code,
            name: lecturer.major.name,
          },
        },
        submission_approval: {
          id: submission_approval.id,
          status: submission_approval.status,
          status_in_string: SubmissionApprovalStatus[submission_approval.status],
          stage: submission_approval.stage,
          stage_in_string: SubmissionApprovalStage[submission_approval.stage],
          average_score: submission_approval.average_score,
        },
      };
    });

    return {
      data,
      count,
    };
  }

  @Put(':submissionApprovalDetailId')
  async updateSubmissionApprovalDetail(
    @Body() body,
    @Req() req,
    @Param('submissionApprovalDetailId', ParseIntPipe) submissionApprovalDetailId: number
  ) {
    let submissionApprovalDetail = await this.submissionApprovalDetailService.findById(
      submissionApprovalDetailId
    );

    let submissionApproval = submissionApprovalDetail.submission_approval;

    if (
      [Role.DEKAN, Role.KETUA_PRODI, Role.LECTURER].includes(req.user.role) &&
      req.user.user_id === submissionApprovalDetail.lecturer.id
    ) {
      if (submissionApprovalDetail.status !== SubmissionApprovalDetailStatus.SUBMITTED) {
        throw new Exception(
          'Tidak dapat memberikan penilaian jika sudah memberikan penilaian sebelumnya'
        );
      }

      const { remarks, score_content, score_content_delivery, score_content_mastery, status } =
        body;

      submissionApprovalDetail.remarks = remarks;
      submissionApprovalDetail.score_content = Number(score_content);
      submissionApprovalDetail.score_content_delivery = Number(score_content_delivery);
      submissionApprovalDetail.score_content_mastery = Number(score_content_mastery);
      submissionApprovalDetail.status = status;

      submissionApprovalDetail.score_average =
        (Number(score_content) + Number(score_content_delivery) + Number(score_content_mastery)) /
        3;

      await this.submissionApprovalDetailService.update(submissionApprovalDetail);

      let message = 'Successfully updated Submission Approval Detail data';

      let isAllSubmissionApprovalDetailTakenAction = false;

      let data =
        await this.submissionApprovalDetailService.findNotTakenActionSubmissionApprovalDetailBySubmissionApproval(
          submissionApproval
        );

      if (data.length === 0) {
        isAllSubmissionApprovalDetailTakenAction = true;
      }

      // if there is still data that has not been taken action, we want to stop the checking process
      if (isAllSubmissionApprovalDetailTakenAction === false) {
        return {
          message,
        };
      } else if (isAllSubmissionApprovalDetailTakenAction === true) {
        let allData = await this.submissionApprovalDetailService.findBySubmissionApproval(
          submissionApproval
        );

        let totalScore = 0;

        allData.forEach((x) => {
          totalScore += x.score_average;
        });

        submissionApproval.average_score = totalScore / allData.length;

        await this.submissionApprovalService.update(submissionApproval);

        return {
          message,
        };
      }
    } else {
      throw new ForbiddenException('You arenot authorized to access this resource');
    }
  }
}
