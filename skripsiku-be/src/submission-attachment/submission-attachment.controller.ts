import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'enums/Role.enum';
import { SubmissionApprovalDetailStatus } from 'enums/SubmissionApprovalDetailStatus.enum';
import { SubmissionApprovalStage } from 'enums/SubmissionApprovalStage.enum';
import { SubmissionApprovalStatus } from 'enums/SubmissionApprovalStatus.enum';
import { SubmissionAttachmentStage } from 'enums/SubmissionAttachmentStage.enum';
import { SubmissionAttachmentStatus } from 'enums/SubmissionAttachmentStatus.enum';
import { Attachment } from 'src/attachment/attachment.entity';
import { AttachmentService } from 'src/attachment/attachment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Exception } from 'src/base/base.exception';
import { IsValidSubmissionAttachmentApproverIdsGuard } from 'src/is-valid-submission-attachment-approver-ids.guard';
import { IsValidSubmissionAttachmentGuard } from 'src/is-valid-submission-attachment.guard';
import { LecturerService } from 'src/lecturer/lecturer.service';
import { SubmissionApprovalDetailService } from 'src/submission-approval-detail/submission-approval-detail.service';
import { SubmissionApproval } from 'src/submission-approval/submission-approval.entity';
import { SubmissionApprovalService } from 'src/submission-approval/submission-approval.service';
import { SubmissionAttachmentApproverService } from 'src/submission-attachment-approver/submission-attachment-approver.service';
import { SubmissionService } from 'src/submission/submission.service';
import { SubmissionAttachment } from './submission-attachment.entity';
import { SubmissionAttachmentService } from './submission-attachment.service';
const fs = require('fs');

@UseGuards(JwtAuthGuard)
@Controller('submission-attachment')
export class SubmissionAttachmentController {
  constructor(
    private readonly submissionAttachmentService: SubmissionAttachmentService,
    private readonly attachmentService: AttachmentService,
    private readonly lecturerService: LecturerService,
    private readonly submissionAttachmentApproverService: SubmissionAttachmentApproverService,
    private readonly submissionApprovalService: SubmissionApprovalService,
    private readonly submissionApprovalDetailService: SubmissionApprovalDetailService,
    private readonly submissionService: SubmissionService
  ) {}

  @UseGuards(IsValidSubmissionAttachmentApproverIdsGuard('body'))
  @Post('create-seminar')
  async createSeminar(@Req() req, @Body() body) {
    const {
      date,
      start_time,
      end_time,
      location,
      file_name,
      submission_id,
      submission_attachment_approver_ids,
    } = body;

    let submission = await this.submissionService.getById(submission_id);

    if (req.user.user_id === submission.user.thesis_advisor_id.id) {
      let newSubmissionAttachment = new SubmissionAttachment();
      newSubmissionAttachment.status = SubmissionAttachmentStatus.SUBMITTED;
      newSubmissionAttachment.stage = SubmissionAttachmentStage.SEMINAR;
      newSubmissionAttachment.submission = submission;
      newSubmissionAttachment.date = date;
      newSubmissionAttachment.start_time = start_time;
      newSubmissionAttachment.end_time = end_time;
      newSubmissionAttachment.location = location;

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

          newSubmissionAttachment.attachment = createdNewAttachment;
        } else {
          throw new NotFoundException('File_name not found');
        }
      }

      let createdSubmissionAttachment = await this.submissionAttachmentService.create(
        newSubmissionAttachment
      );

      let newSubmissionApproval = new SubmissionApproval();
      newSubmissionApproval.status = SubmissionApprovalStatus.SUBMITTED;
      newSubmissionApproval.stage = SubmissionApprovalStage.SEMINAR;
      newSubmissionApproval.average_score = 0;
      newSubmissionApproval.submission_attachment = createdSubmissionAttachment;

      let createdSubmissionApproval = await this.submissionApprovalService.create(
        newSubmissionApproval
      );

      if (submission_attachment_approver_ids.length) {
        for (let i = 0; i < submission_attachment_approver_ids.length; i++) {
          let lecturer = await this.lecturerService.findOne({
            id: submission_attachment_approver_ids[i],
          });

          if (lecturer) {
            await this.submissionAttachmentApproverService.create({
              level: null,
              lecturer,
              user: submission.user,
              submission_attachment: createdSubmissionAttachment,
            });

            await this.submissionApprovalDetailService.create({
              lecturer,
              submission_approval: createdSubmissionApproval,
              status: SubmissionApprovalDetailStatus.SUBMITTED,
              remarks: null,
              score_content: 0,
              score_content_delivery: 0,
              score_content_master: 0,
              score_average: 0,
            });
          }
        }
      }

      return {
        message: 'Successfully updated Submission Attachment data',
      };
    } else {
      throw new ForbiddenException('You arenot authorized to access this resource');
    }
  }

  @UseGuards(IsValidSubmissionAttachmentApproverIdsGuard('body'))
  @Post('create-final')
  async createFinal(@Req() req, @Body() body) {
    const {
      date,
      start_time,
      end_time,
      location,
      file_name,
      submission_id,
      submission_attachment_approver_ids,
    } = body;

    let submission = await this.submissionService.getById(submission_id);

    if (req.user.user_id === submission.user.thesis_advisor_id.id) {
      let newSubmissionAttachment = new SubmissionAttachment();
      newSubmissionAttachment.status = SubmissionAttachmentStatus.SUBMITTED;
      newSubmissionAttachment.stage = SubmissionAttachmentStage.FINAL;
      newSubmissionAttachment.submission = submission;
      newSubmissionAttachment.date = date;
      newSubmissionAttachment.start_time = start_time;
      newSubmissionAttachment.end_time = end_time;
      newSubmissionAttachment.location = location;

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

          newSubmissionAttachment.attachment = createdNewAttachment;
        } else {
          throw new NotFoundException('File_name not found');
        }
      }

      let createdSubmissionAttachment = await this.submissionAttachmentService.create(
        newSubmissionAttachment
      );

      let newSubmissionApproval = new SubmissionApproval();
      newSubmissionApproval.status = SubmissionApprovalStatus.SUBMITTED;
      newSubmissionApproval.stage = SubmissionApprovalStage.FINAL;
      newSubmissionApproval.average_score = 0;
      newSubmissionApproval.submission_attachment = createdSubmissionAttachment;

      let createdSubmissionApproval = await this.submissionApprovalService.create(
        newSubmissionApproval
      );

      if (submission_attachment_approver_ids.length) {
        for (let i = 0; i < submission_attachment_approver_ids.length; i++) {
          let lecturer = await this.lecturerService.findOne({
            id: submission_attachment_approver_ids[i],
          });

          if (lecturer) {
            await this.submissionAttachmentApproverService.create({
              level: null,
              lecturer,
              user: submission.user,
              submission_attachment: createdSubmissionAttachment,
            });

            await this.submissionApprovalDetailService.create({
              lecturer,
              submission_approval: createdSubmissionApproval,
              status: SubmissionApprovalDetailStatus.SUBMITTED,
              remarks: null,
              score_content: 0,
              score_content_delivery: 0,
              score_content_master: 0,
              score_average: 0,
            });
          }
        }
      }

      return {
        message: 'Successfully updated Submission Attachment data',
      };
    } else {
      throw new ForbiddenException('You arenot authorized to access this resource');
    }
  }

  @Post('create-graduation')
  async createGraduation(@Req() req, @Body() body) {
    const { date, submission_id } = body;

    let submission = await this.submissionService.getById(submission_id);

    if (req.user.user_id === submission.user.thesis_advisor_id.id) {
      let newSubmissionAttachment = new SubmissionAttachment();
      newSubmissionAttachment.date = date;
      newSubmissionAttachment.submission = submission;
      newSubmissionAttachment.status = SubmissionAttachmentStatus.APPROVED;
      newSubmissionAttachment.stage = SubmissionAttachmentStage.GRADUATED;

      await this.submissionAttachmentService.create(newSubmissionAttachment);

      return {
        message: 'Successfully updated Submission Attachment data',
      };
    } else {
      throw new ForbiddenException('You arenot authorized to access this resource');
    }
  }

  @UseGuards(IsValidSubmissionAttachmentGuard('params'))
  @Put(':submissionAttachmentId/update-seminar-by-lecturer')
  async updateSeminar(
    @Req() req,
    @Body() body,
    @Param('submissionAttachmentId', ParseIntPipe) submissionAttachmentId: number
  ) {
    if (req.submissionAttachment.stage !== SubmissionAttachmentStage.SEMINAR) {
      throw new Exception('Submission Attachment data must be in Seminar stage');
    }

    let thesisAdvisor =
      await this.submissionAttachmentService.getThesisAdvisorBySubmissionAttachmentId(
        submissionAttachmentId
      );

    if (req.user.user_id === thesisAdvisor.id) {
      const { date, start_time, end_time, location, file_name } = body;

      req.submissionAttachment.date = date;
      req.submissionAttachment.start_time = start_time;
      req.submissionAttachment.end_time = end_time;
      req.submissionAttachment.location = location;

      let oldAttachmentId = req.submissionAttachment.attachment?.id;
      let oldAttachmentFileName = req.submissionAttachment.attachment?.file_name;

      let createdNewAttachment;

      if (file_name) {
        let path = `./uploads/documents/${file_name}`;
        let pathExists = fs.existsSync(path);
        if (pathExists) {
          let oldPath = path;
          let newPath = `./uploads/documents/${file_name}`;
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              throw new Exception('Internal server error');
            }
          });
          let newAttachment = new Attachment();
          newAttachment.file_name = file_name;
          createdNewAttachment = await this.attachmentService.create(newAttachment);
          req.submissionAttachment.attachment = createdNewAttachment;

          await this.submissionAttachmentService.update(req.submissionAttachment);

          if (oldAttachmentId) {
            // delete old "attachment" record from Attachment table
            await this.attachmentService.delete(oldAttachmentId);
            // remove "attachment" file from "/uploads/documents"
            let oldFilePath = `./uploads/documents/${oldAttachmentFileName}`;
            fs.unlinkSync(oldFilePath);
          }
          return {
            message: 'Successfully updated Seminar',
          };
        } else {
          throw new NotFoundException('File_name not found');
        }
      }

      await this.submissionAttachmentService.update(req.submissionAttachment);

      return {
        message: 'Successfully updated seminar',
      };
    } else {
      throw new ForbiddenException('You arenot authorized to access this resource');
    }
  }

  @UseGuards(IsValidSubmissionAttachmentGuard('params'))
  @Put(':submissionAttachmentId/update-final-by-lecturer')
  async updateFinal(
    @Req() req,
    @Body() body,
    @Param('submissionAttachmentId', ParseIntPipe) submissionAttachmentId: number
  ) {
    if (req.submissionAttachment.stage !== SubmissionAttachmentStage.FINAL) {
      throw new Exception('Submission Attachment data must be in Final stage');
    }

    let thesisAdvisor =
      await this.submissionAttachmentService.getThesisAdvisorBySubmissionAttachmentId(
        submissionAttachmentId
      );

    if (req.user.user_id === thesisAdvisor.id) {
      const { date, start_time, end_time, location, file_name } = body;

      req.submissionAttachment.date = date;
      req.submissionAttachment.start_time = start_time;
      req.submissionAttachment.end_time = end_time;
      req.submissionAttachment.location = location;

      let oldAttachmentId = req.submissionAttachment.attachment?.id;
      let oldAttachmentFileName = req.submissionAttachment.attachment?.file_name;

      let createdNewAttachment;

      if (file_name) {
        let path = `./uploads/documents/${file_name}`;
        let pathExists = fs.existsSync(path);
        if (pathExists) {
          let oldPath = path;
          let newPath = `./uploads/documents/${file_name}`;
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              throw new Exception('Internal server error');
            }
          });
          let newAttachment = new Attachment();
          newAttachment.file_name = file_name;
          createdNewAttachment = await this.attachmentService.create(newAttachment);
          req.submissionAttachment.attachment = createdNewAttachment;

          await this.submissionAttachmentService.update(req.submissionAttachment);

          if (oldAttachmentId) {
            // delete old "attachment" record from Attachment table
            await this.attachmentService.delete(oldAttachmentId);
            // remove "attachment" file from "/uploads/documents"
            let oldFilePath = `./uploads/documents/${oldAttachmentFileName}`;
            fs.unlinkSync(oldFilePath);
          }
          return {
            message: 'Successfully updated Seminar',
          };
        } else {
          throw new NotFoundException('File_name not found');
        }
      }

      await this.submissionAttachmentService.update(req.submissionAttachment);

      return {
        message: 'Successfully updated final',
      };
    } else {
      throw new ForbiddenException('You arenot authorized to access this resource');
    }
  }

  @UseGuards(IsValidSubmissionAttachmentGuard('params'))
  @Put(':submissionAttachmentId/update-seminar-by-student')
  async updateSeminarByStudent(@Req() req, @Body() body) {
    if (req.submissionAttachment.stage !== SubmissionAttachmentStage.SEMINAR) {
      throw new Exception('Submission Attachment data must be in Seminar stage');
    }

    let userId = req.submissionAttachment.submission.user.id;

    if (req.user.user_id === userId) {
      const { file_name } = body;

      let oldAttachmentId = req.submissionAttachment.attachment?.id;
      let oldAttachmentFileName = req.submissionAttachment.attachment?.file_name;

      let createdNewAttachment;

      if (file_name) {
        let path = `./uploads/documents/${file_name}`;
        let pathExists = fs.existsSync(path);
        if (pathExists) {
          let oldPath = path;
          let newPath = `./uploads/documents/${file_name}`;
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              throw new Exception('Internal server error');
            }
          });
          let newAttachment = new Attachment();
          newAttachment.file_name = file_name;
          createdNewAttachment = await this.attachmentService.create(newAttachment);
          req.submissionAttachment.attachment = createdNewAttachment;

          await this.submissionAttachmentService.update(req.submissionAttachment);

          if (oldAttachmentId) {
            // delete old "attachment" record from Attachment table
            await this.attachmentService.delete(oldAttachmentId);
            // remove "attachment" file from "/uploads/documents"
            let oldFilePath = `./uploads/documents/${oldAttachmentFileName}`;
            fs.unlinkSync(oldFilePath);
          }
          return {
            message: 'Successfully updated Seminar',
          };
        } else {
          throw new NotFoundException('File_name not found');
        }
      }

      await this.submissionAttachmentService.update(req.submissionAttachment);

      return {
        message: 'Successfully updated seminar',
      };
    } else {
      throw new ForbiddenException('You arenot authorized to access this resource');
    }
  }

  @UseGuards(IsValidSubmissionAttachmentGuard('params'))
  @Put(':submissionAttachmentId/update-final-by-student')
  async updateFinalByStudent(@Req() req, @Body() body) {
    if (req.submissionAttachment.stage !== SubmissionAttachmentStage.FINAL) {
      throw new Exception('Submission Attachment data must be in Final stage');
    }

    let userId = req.submissionAttachment.submission.user.id;

    if (req.user.user_id === userId) {
      const { file_name } = body;

      let oldAttachmentId = req.submissionAttachment.attachment?.id;
      let oldAttachmentFileName = req.submissionAttachment.attachment?.file_name;

      let createdNewAttachment;

      if (file_name) {
        let path = `./uploads/documents/${file_name}`;
        let pathExists = fs.existsSync(path);
        if (pathExists) {
          let oldPath = path;
          let newPath = `./uploads/documents/${file_name}`;
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              throw new Exception('Internal server error');
            }
          });
          let newAttachment = new Attachment();
          newAttachment.file_name = file_name;
          createdNewAttachment = await this.attachmentService.create(newAttachment);
          req.submissionAttachment.attachment = createdNewAttachment;

          await this.submissionAttachmentService.update(req.submissionAttachment);

          if (oldAttachmentId) {
            // delete old "attachment" record from Attachment table
            await this.attachmentService.delete(oldAttachmentId);
            // remove "attachment" file from "/uploads/documents"
            let oldFilePath = `./uploads/documents/${oldAttachmentFileName}`;
            fs.unlinkSync(oldFilePath);
          }
          return {
            message: 'Successfully updated Final',
          };
        } else {
          throw new NotFoundException('File_name not found');
        }
      }

      await this.submissionAttachmentService.update(req.submissionAttachment);

      return {
        message: 'Successfully updated final',
      };
    } else {
      throw new ForbiddenException('You arenot authorized to access this resource');
    }
  }

  @UseGuards(IsValidSubmissionAttachmentGuard('params'))
  @Put(':submissionAttachmentId/update-graduation-by-student')
  async updateGraduationByStudent(@Req() req, @Body() body) {
    if (req.submissionAttachment.stage !== SubmissionAttachmentStage.GRADUATED) {
      throw new Exception('Submission Attachment data must be in Graduated stage');
    }

    let userId = req.submissionAttachment.submission.user.id;

    if (req.user.user_id === userId) {
      const { file_name } = body;

      let oldAttachmentId = req.submissionAttachment.attachment?.id;
      let oldAttachmentFileName = req.submissionAttachment.attachment?.file_name;

      let createdNewAttachment;

      if (file_name) {
        let path = `./uploads/documents/${file_name}`;
        let pathExists = fs.existsSync(path);
        if (pathExists) {
          let oldPath = path;
          let newPath = `./uploads/documents/${file_name}`;
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              throw new Exception('Internal server error');
            }
          });
          let newAttachment = new Attachment();
          newAttachment.file_name = file_name;
          createdNewAttachment = await this.attachmentService.create(newAttachment);
          req.submissionAttachment.attachment = createdNewAttachment;

          await this.submissionAttachmentService.update(req.submissionAttachment);

          if (oldAttachmentId) {
            // delete old "attachment" record from Attachment table
            await this.attachmentService.delete(oldAttachmentId);
            // remove "attachment" file from "/uploads/documents"
            let oldFilePath = `./uploads/documents/${oldAttachmentFileName}`;
            fs.unlinkSync(oldFilePath);
          }
          return {
            message: 'Successfully updated Graduation data',
          };
        } else {
          throw new NotFoundException('File_name not found');
        }
      }

      await this.submissionAttachmentService.update(req.submissionAttachment);

      return {
        message: 'Successfully updated final',
      };
    } else {
      throw new ForbiddenException('You arenot authorized to access this resource');
    }
  }

  @Get()
  async getAllSubmissionAttachment(@Query() query, @Req() req) {
    const { page, limit, stage, submission_id, user_id } = query;

    let params = {
      page,
      limit,
      stage,
      submission_id,
      user_id,
    };

    let [result, count] = await this.submissionAttachmentService.getList(params);

    let attachmentPath = `${req.protocol}://${req.headers.host}/uploads/documents/`;

    let data = result.map((x) => {
      let attachment = null;

      if (x.attachment) {
        attachment = {
          id: x.attachment.id,
          file_name: attachmentPath + x.attachment.file_name,
        };
      }

      return {
        ...x,
        stage_in_string: SubmissionAttachmentStage[x.stage],
        status_in_string: SubmissionAttachmentStatus[x.status],
        attachment,
        submission: {
          id: x.submission.id,
          title: x.submission.title,
        },
      };
    });

    return {
      data,
      count,
    };
  }
}
