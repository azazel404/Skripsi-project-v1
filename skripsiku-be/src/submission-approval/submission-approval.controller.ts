import { Body, Controller, Get, Param, ParseIntPipe, Put, Query, UseGuards } from '@nestjs/common';
import { SubmissionApprovalStage } from 'enums/SubmissionApprovalStage.enum';
import { SubmissionApprovalStatus } from 'enums/SubmissionApprovalStatus.enum';
import { SubmissionAttachmentStatus } from 'enums/SubmissionAttachmentStatus.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SubmissionAttachmentService } from 'src/submission-attachment/submission-attachment.service';
import { SubmissionApprovalService } from './submission-approval.service';

@UseGuards(JwtAuthGuard)
@Controller('submission-approval')
export class SubmissionApprovalController {
  constructor(
    private readonly submissionApprovalService: SubmissionApprovalService,
    private readonly submissionAttachmentService: SubmissionAttachmentService
  ) {}

  @Get()
  async getSubmissionApproval(@Query() query) {
    const { page, limit, submission_attachment_id, status, stage } = query;

    let params = {
      page,
      limit,
      submission_attachment_id,
      status,
      stage,
    };

    let [result, count] = await this.submissionApprovalService.getAll(params);

    let data = result.map((x) => {
      const { submission_attachment } = x;

      return {
        ...x,
        submission_attachment: {
          id: submission_attachment.id,
          date: submission_attachment.date,
          start_time: submission_attachment.start_time,
          location: submission_attachment.location,
        },
        status_in_string: SubmissionApprovalStatus[x.status],
        stage_in_string: SubmissionApprovalStage[x.stage],
      };
    });

    return {
      data,
      count,
    };
  }

  @Put(':submissionApprovalId')
  async updateSubmissionApprovalStatus(
    @Body() body,
    @Param('submissionApprovalId', ParseIntPipe) submissionApprovalId: number
  ) {
    let submissionApproval = await this.submissionApprovalService.getById(submissionApprovalId);

    submissionApproval.status = body.status;

    await this.submissionApprovalService.update(submissionApproval);

    let statusString = SubmissionApprovalStatus[body.status];

    submissionApproval.submission_attachment.status = SubmissionAttachmentStatus[statusString];

    await this.submissionAttachmentService.update(submissionApproval.submission_attachment);

    return {
      message: 'Submission Approval data successfully updated',
    };
  }
}
