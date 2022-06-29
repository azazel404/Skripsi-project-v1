import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AbstractSubmissionApprovalStatus } from 'enums/AbstractSubmissionApproval.enum';
import { AbstractSubmissionApprovalDetailStatus } from 'enums/AbstractSubmissionApprovalDetailStatus.enum';
import { Gender } from 'enums/Gender.enum';
import { AbstractSubmissionApprovalService } from 'src/abstract-submission-approval/abstract-submission-approval.service';
import { AbstractSubmissionService } from 'src/abstract-submission/abstract-submission.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Exception } from 'src/base/base.exception';
import { IsValidAbstractSubmissionApprovalGuard } from 'src/is-valid-abstract-submission-approval.guard';
import { IsValidLecturerGuard } from 'src/is-valid-lecturer.guard';
import { LecturerService } from 'src/lecturer/lecturer.service';
import { UpdateAbstractSubmissionApprovalDetailDTO } from './abstract-submission-approval-detail.dto';
import { AbstractSubmissionApprovalDetailService } from './abstract-submission-approval-detail.service';

@UseGuards(JwtAuthGuard)
@Controller('abstract-submission-approval-detail')
export class AbstractSubmissionApprovalDetailController {
  constructor(
    private readonly abstractSubmissionService: AbstractSubmissionService,
    private readonly abstractSubmissionApprovalDetailService: AbstractSubmissionApprovalDetailService,
    private readonly abstractSubmissionApprovalService: AbstractSubmissionApprovalService,
    private readonly lecturerService: LecturerService
  ) {}

  @UseGuards(IsValidLecturerGuard('body'), IsValidAbstractSubmissionApprovalGuard('body'))
  @Post()
  async create(@Req() req, @Body() body) {
    const { status, remarks } = body;

    let requestBody = {
      lecturer: req.lecturer,
      abstract_submission_approval: req.abstractSubmissionApproval,
      status,
      remarks,
    };

    await this.abstractSubmissionApprovalDetailService.create(requestBody);

    return {
      message: 'Successfully created Abstract Submission Approval Detail data',
    };
  }

  @Get()
  async getAll(@Query() query, @Req() req) {
    const { isActionTaken } = query;

    let params = {
      isActionTaken,
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

  @UseGuards(IsValidAbstractSubmissionApprovalGuard('body'))
  @Put()
  async update(@Body() body: UpdateAbstractSubmissionApprovalDetailDTO, @Req() req) {
    let message = 'Successfully updated Abstract Submission Approval Detail data';

    let lecturer = await this.lecturerService.findById(req.user.user_id);

    let abstractSubmissionApprovalDetail =
      await this.abstractSubmissionApprovalDetailService.findOne({
        where: {
          lecturer,
          abstract_submission_approval: req.abstractSubmissionApproval,
        },
      });

    if (!abstractSubmissionApprovalDetail) {
      throw new NotFoundException('Abstract Submission Approval Detail data is not found');
    }

    if (abstractSubmissionApprovalDetail.status !== 0) {
      throw new Exception(
        'Tindakan telah dilakukan sebelumnya untuk persetujuan penilaian proposal TA'
      );
    }

    abstractSubmissionApprovalDetail.status = body.status;
    abstractSubmissionApprovalDetail.remarks = body.remarks;

    await this.abstractSubmissionApprovalDetailService.update(abstractSubmissionApprovalDetail);

    // check if all Abstract Submission Approval Detail has been taken action, if yes, proceed to update parent data Status
    let allData =
      await this.abstractSubmissionApprovalDetailService.getByAbstractSubmissionApproval(
        req.abstractSubmissionApproval
      );

    let allDataStatus = allData.map((x) => x.status);

    let submitted_count = allDataStatus.filter((x) => x === 0).length;
    // if there is still data with status "Submitted", we want to stop the checking process
    if (submitted_count > 0) {
      return {
        message,
      };
    } else if (submitted_count === 0) {
      let approved_count = allDataStatus.filter((x) => x === 1).length;
      let rejected_count = allDataStatus.filter((x) => x === 2).length;

      let resultOfApproval = approved_count > rejected_count ? 'APPROVED' : 'REJECTED';

      // update Abstract Submission Approval
      req.abstractSubmissionApproval.status = AbstractSubmissionApprovalStatus[resultOfApproval];
      await this.abstractSubmissionApprovalService.update(req.abstractSubmissionApproval);

      // update Abstract Submission
      let abstractSubmissionId = req.abstractSubmissionApproval.abstract_submission.id;
      let abstractSubmission = await this.abstractSubmissionService.findById(abstractSubmissionId);
      abstractSubmission.status = AbstractSubmissionApprovalStatus[resultOfApproval];

      await this.abstractSubmissionService.update(abstractSubmission);

      return {
        message,
      };
    }
  }
}
